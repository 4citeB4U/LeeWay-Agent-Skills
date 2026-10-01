/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP
TAG: LEEWAY.SKILLS.MCP.COMMUNICATIONS

5WH:
WHAT = Portable MCP contracts for preparing and executing approved email, phone, SMS, and calendar actions
WHY = Recover Agent Lee communication abilities without treating historical work-order shells as live providers
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/communications-tools.ts
WHEN = 2026
HOW = Content-addressed work orders plus a separately authorized provider gateway

LICENSE:
MIT
*/

import { createHash } from "node:crypto";
import { Tool } from "@modelcontextprotocol/sdk/types.js";

type JsonObject = Record<string, unknown>;
type CommunicationAction = "email" | "phone_call" | "sms" | "calendar_event";

export interface CommunicationsExecutionResult {
  text: string;
  isError: boolean;
}

interface CommunicationsSpec {
  name: string;
  description: string;
  required: string[];
  properties: Record<string, JsonObject>;
}

const stringField = (description: string): JsonObject => ({ type: "string", minLength: 1, description });
const objectField = (description: string): JsonObject => ({
  type: "object",
  minProperties: 1,
  description,
  additionalProperties: true,
});

const actionField: JsonObject = {
  type: "string",
  enum: ["email", "phone_call", "sms", "calendar_event"],
  description: "Requested communication action.",
};

const specs: CommunicationsSpec[] = [
  {
    name: "communications_prepare_action",
    description: "Create a content-addressed communication work order without sending, dialing, texting, or changing a calendar.",
    required: ["action", "recipient", "content"],
    properties: {
      action: actionField,
      recipient: stringField("Recipient identity or provider-resolvable address/number."),
      content: objectField("Message, subject, script, event, timing, and attachment references as applicable."),
      purpose: stringField("Why the action is requested."),
    },
  },
  {
    name: "communications_execute_approved",
    description: "Execute one explicitly approved, content-addressed communication work order through a configured provider gateway.",
    required: ["action", "recipient", "content", "work_order_id", "work_order_sha256", "approval_id", "idempotency_key"],
    properties: {
      action: actionField,
      recipient: stringField("Recipient identity or provider-resolvable address/number."),
      content: objectField("Approved message, script, or event payload."),
      purpose: stringField("Purpose recorded in the prepared work order."),
      work_order_id: stringField("Content-addressed ID returned by communications_prepare_action."),
      work_order_sha256: stringField("SHA-256 returned by communications_prepare_action."),
      approval_id: stringField("Approval reference the configured gateway must verify against this exact work-order hash."),
      idempotency_key: stringField("Stable required retry key used by the gateway to prevent duplicate external actions."),
    },
  },
];

const specsByName = new Map(specs.map((spec) => [spec.name, spec]));

export const communicationsToolDefinitions: Tool[] = specs.map((spec) => ({
  name: spec.name,
  description: spec.description,
  inputSchema: {
    type: "object",
    properties: spec.properties,
    required: spec.required,
    additionalProperties: false,
  },
}));

export function isCommunicationsTool(name: string): boolean {
  return specsByName.has(name);
}

function isJsonObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function valueMatchesSchema(value: unknown, schema: JsonObject): boolean {
  if (schema.enum && Array.isArray(schema.enum) && !schema.enum.includes(value)) return false;
  if (schema.type === "string") return typeof value === "string" && value.trim().length > 0;
  if (schema.type === "object") return isJsonObject(value) && Object.keys(value).length > 0;
  return false;
}

function validateArguments(spec: CommunicationsSpec, args: JsonObject): void {
  const missing = spec.required.filter((key) => args[key] === undefined || args[key] === null || args[key] === "");
  if (missing.length > 0) throw new Error(`Missing required arguments: ${missing.join(", ")}`);
  const unknown = Object.keys(args).filter((key) => !(key in spec.properties));
  if (unknown.length > 0) throw new Error(`Unexpected arguments: ${unknown.join(", ")}`);
  const invalid = Object.entries(args)
    .filter(([, value]) => value !== undefined)
    .filter(([key, value]) => !valueMatchesSchema(value, spec.properties[key]))
    .map(([key]) => key);
  if (invalid.length > 0) throw new Error(`Invalid arguments: ${invalid.join(", ")}`);
}

function canonicalize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  if (isJsonObject(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function workOrderIdentity(args: JsonObject): { workOrderId: string; workOrderSha256: string; material: JsonObject } {
  const material: JsonObject = {
    action: args.action,
    recipient: args.recipient,
    content: args.content,
    purpose: args.purpose ?? null,
  };
  const workOrderSha256 = createHash("sha256").update(canonicalize(material), "utf8").digest("hex");
  return { workOrderId: `leeway-comm-${workOrderSha256.slice(0, 24)}`, workOrderSha256, material };
}

function result(payload: JsonObject, isError = false): CommunicationsExecutionResult {
  return { text: JSON.stringify(payload, null, 2), isError };
}

function prepareAction(args: JsonObject): CommunicationsExecutionResult {
  const identity = workOrderIdentity(args);
  return result({
    tool: "communications_prepare_action",
    state: "EXECUTED_LOCAL",
    executed: true,
    external_action_executed: false,
    work_order: {
      ...identity.material,
      work_order_id: identity.workOrderId,
      work_order_sha256: identity.workOrderSha256,
      approval_state: "REQUIRED_BEFORE_EXTERNAL_EXECUTION",
    },
    claim_boundary: "A content-addressed work order was prepared. No email, call, SMS, or calendar mutation occurred.",
  });
}

function timeoutMs(): number {
  const parsed = Number.parseInt(process.env.LEEWAY_COMMUNICATIONS_TIMEOUT_MS || "30000", 10);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1000), 120000) : 30000;
}

export async function executeCommunicationsTool(name: string, args: JsonObject = {}): Promise<CommunicationsExecutionResult> {
  const spec = specsByName.get(name);
  if (!spec) throw new Error(`Unknown communications tool: ${name}`);
  validateArguments(spec, args);
  if (name === "communications_prepare_action") return prepareAction(args);

  const identity = workOrderIdentity(args);
  if (args.work_order_id !== identity.workOrderId || args.work_order_sha256 !== identity.workOrderSha256) {
    throw new Error("The work-order ID/hash does not match the approved action, recipient, content, and purpose.");
  }

  const gatewayUrl = process.env.LEEWAY_COMMUNICATIONS_GATEWAY_URL;
  const token = process.env.LEEWAY_COMMUNICATIONS_GATEWAY_BEARER_TOKEN;
  if (!gatewayUrl || !token) {
    return result({
      tool: name,
      state: "BLOCKED_ADAPTER_UNCONFIGURED",
      executed: false,
      required_environment: ["LEEWAY_COMMUNICATIONS_GATEWAY_URL", "LEEWAY_COMMUNICATIONS_GATEWAY_BEARER_TOKEN"],
      work_order_id: identity.workOrderId,
      work_order_sha256: identity.workOrderSha256,
      claim_boundary: "The MCP contract is installed, but no authorized communications executor is configured. No external communication occurred.",
    }, true);
  }

  const base = new URL(gatewayUrl.endsWith("/") ? gatewayUrl : `${gatewayUrl}/`);
  if (base.protocol !== "https:" && !["127.0.0.1", "localhost", "::1", "[::1]"].includes(base.hostname)) {
    return result({
      tool: name,
      state: "BLOCKED_ADAPTER_CONFIGURATION_INVALID",
      executed: false,
      error: "A non-loopback communications gateway must use https.",
      claim_boundary: "No provider request was sent.",
    }, true);
  }
  const action = args.action as CommunicationAction;
  const endpoint = new URL(`tools/${encodeURIComponent(action)}`, base);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs());
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        "idempotency-key": String(args.idempotency_key),
      },
      body: JSON.stringify({
        tool: name,
        arguments: args,
        approval_binding: {
          approval_id: args.approval_id,
          work_order_id: identity.workOrderId,
          work_order_sha256: identity.workOrderSha256,
        },
      }),
      signal: controller.signal,
    });
    const raw = await response.text();
    let payload: unknown = raw;
    try { payload = JSON.parse(raw); } catch { /* preserve text response as evidence */ }
    const upstreamExecuted = response.ok
      && isJsonObject(payload)
      && payload.executed === true
      && (typeof payload.provider_receipt_id === "string" || isJsonObject(payload.provider_receipt));
    return result({
      tool: name,
      state: response.ok ? (upstreamExecuted ? "EXECUTED_UNVERIFIED" : "ADAPTER_RESPONDED_WITHOUT_RECEIPT") : "ADAPTER_FAILED",
      executed: upstreamExecuted,
      upstream_http_status: response.status,
      work_order_id: identity.workOrderId,
      work_order_sha256: identity.workOrderSha256,
      upstream: payload,
      claim_boundary: upstreamExecuted
        ? "The gateway verified the bound approval and returned a provider receipt. Post-verification is still required."
        : "The gateway did not return execution evidence bound to this work order; no execution claim is admitted.",
    }, !upstreamExecuted);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return result({
        tool: name,
        state: "INDETERMINATE_RECONCILIATION_REQUIRED",
        executed: false,
        idempotency_key: args.idempotency_key,
        work_order_id: identity.workOrderId,
        work_order_sha256: identity.workOrderSha256,
        claim_boundary: "The gateway timed out after dispatch. The idempotency key must be reconciled before retrying because provider commit state is unknown.",
      }, true);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
