/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.CONTEXT
TAG: LEEWAY.SKILLS.MCP.CONTEXT.HARNESS

5WH:
WHAT = Deterministic LeeWay context-set router and telemetry store
WHY = Pre-assemble minimum verified context before model work to reduce search and inference debt
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/context-harness.ts
WHEN = 2026
HOW = Rule-based intent routing, file-backed evidence adapters, SHA-256 payload hashes, privacy-minimal telemetry

AGENTS:
ROUTE
OBSERVE
VERIFY

LICENSE:
MIT
*/

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

export type EvidenceStatus =
  | "VERIFIED"
  | "OBSERVED"
  | "INFERRED"
  | "PROPOSED"
  | "UNVERIFIED"
  | "FAILED"
  | "BLOCKED";

export type ContextSetId = "A" | "B" | "C" | "D";

export interface ContextSet {
  id: ContextSetId;
  name: string;
  purpose: string;
  status: EvidenceStatus;
  source: string;
  data: unknown;
  sha256: string;
  observedAt: string;
}

export interface RoutedContext {
  leeway_session: {
    intent: string;
    route: ContextSetId[];
    route_method: "DETERMINISTIC_RULES";
    route_status: EvidenceStatus;
    active_state_hash: string;
    automated_sets: Record<string, ContextSet>;
    warnings: string[];
  };
}

export interface ConnectionObservation {
  id: string;
  client: string;
  model: string;
  userAgent: string;
  method: string;
  name: string;
  lastSeen: string;
  requestCount: number;
}

const MAX_CONNECTIONS = 250;
const connections = new Map<string, ConnectionObservation>();
let totalRequests = 0;
let contextRoutes = 0;

const setDefinitions: Record<ContextSetId, { name: string; purpose: string; env: string }> = {
  A: {
    name: "Codebase AST & Git Diffs",
    purpose: "Code-editing, engineering and front-end state",
    env: "LEEWAY_SET_A_FILE",
  },
  B: {
    name: "Runtime Health & Veritas Evidence",
    purpose: "Operational health, receipts, runtime and maintenance state",
    env: "LEEWAY_SET_B_FILE",
  },
  C: {
    name: "Domain / Universe State",
    purpose: "Roblox, game-world, creator and domain metadata",
    env: "LEEWAY_SET_C_FILE",
  },
  D: {
    name: "MCP Skills & Capability Registry",
    purpose: "Active LeeWay skills, MCP capability and gateway administration state",
    env: "LEEWAY_SET_D_FILE",
  },
};

const keywordRules: Record<ContextSetId, string[]> = {
  A: [
    "code", "coding", "edit", "refactor", "typescript", "javascript", "python", "luau",
    "frontend", "backend", "component", "3d", "ast", "git", "diff", "repository", "file",
    "bug", "build", "compile", "test",
  ],
  B: [
    "runtime", "health", "veritas", "receipt", "incident", "maintenance", "deploy", "deployment",
    "service", "container", "docker", "sre", "ops", "log", "latency", "status", "worker",
  ],
  C: [
    "roblox", "universe", "studio", "game", "world", "creator", "asset", "zombie", "avatar",
    "difficulty", "wave", "player", "experience",
  ],
  D: [
    "mcp", "skill", "capability", "connector", "model", "llm", "registry", "gateway", "admin",
    "system a", "system b", "system c", "system d", "context", "harness",
  ],
};

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => `${JSON.stringify(key)}:${stableJson(val)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value: unknown): string {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

export function classifyIntent(intent: string): ContextSetId[] {
  const normalized = intent.toLowerCase();
  const scored = (Object.keys(keywordRules) as ContextSetId[])
    .map((id) => ({
      id,
      score: keywordRules[id].reduce(
        (sum, keyword) => sum + (normalized.includes(keyword) ? 1 : 0),
        0,
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

  if (scored.length === 0) return ["D"];

  const best = scored[0].score;
  return scored.filter((item) => item.score >= Math.max(1, best - 1)).map((item) => item.id);
}

async function readJsonEvidence(id: ContextSetId): Promise<ContextSet> {
  const definition = setDefinitions[id];
  const configuredPath = process.env[definition.env]?.trim();
  const observedAt = new Date().toISOString();

  if (!configuredPath) {
    const data = {
      state: "NOT_CONFIGURED",
      required_environment_variable: definition.env,
      note: "No state has been invented. Configure a canonical evidence export to activate this set.",
    };
    return {
      id,
      name: definition.name,
      purpose: definition.purpose,
      status: "UNVERIFIED",
      source: "NOT_CONFIGURED",
      data,
      sha256: sha256(data),
      observedAt,
    };
  }

  try {
    const absolutePath = path.resolve(configuredPath);
    const raw = await fs.readFile(absolutePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return {
      id,
      name: definition.name,
      purpose: definition.purpose,
      status: "OBSERVED",
      source: absolutePath,
      data: parsed,
      sha256: sha256(parsed),
      observedAt,
    };
  } catch (error) {
    const data = {
      state: "SOURCE_READ_FAILED",
      error: error instanceof Error ? error.message : String(error),
    };
    return {
      id,
      name: definition.name,
      purpose: definition.purpose,
      status: "FAILED",
      source: configuredPath,
      data,
      sha256: sha256(data),
      observedAt,
    };
  }
}

export async function getContextSet(id: ContextSetId): Promise<ContextSet> {
  if (id === "D" && !process.env.LEEWAY_SET_D_FILE) {
    const registryPath = path.resolve(
      path.dirname(new URL(import.meta.url).pathname),
      "../../scripts/skills-registry.json",
    );
    const observedAt = new Date().toISOString();
    try {
      const raw = await fs.readFile(registryPath, "utf8");
      const registry = JSON.parse(raw) as Record<string, unknown>;
      const data = {
        version: registry.version ?? "UNKNOWN",
        totalSkills: registry.totalSkills ?? "UNKNOWN",
        totalCategories: registry.totalCategories ?? "UNKNOWN",
        lastUpdated: registry.lastUpdated ?? "UNKNOWN",
      };
      return {
        id: "D",
        name: setDefinitions.D.name,
        purpose: setDefinitions.D.purpose,
        status: "OBSERVED",
        source: registryPath,
        data,
        sha256: sha256(data),
        observedAt,
      };
    } catch {
      // Fall through to the standard fail-closed adapter.
    }
  }
  return readJsonEvidence(id);
}

export async function routeContext(
  intent: string,
  requestedSets?: ContextSetId[],
): Promise<RoutedContext> {
  contextRoutes += 1;
  const route = requestedSets?.length ? [...new Set(requestedSets)].sort() : classifyIntent(intent);
  const sets = await Promise.all(route.map(getContextSet));
  const automatedSets: Record<string, ContextSet> = {};
  for (const set of sets) automatedSets[`set_${set.id.toLowerCase()}`] = set;

  const warnings = sets
    .filter((set) => set.status !== "VERIFIED" && set.status !== "OBSERVED")
    .map((set) => `Set ${set.id} is ${set.status}: ${set.source}`);
  const routeStatus: EvidenceStatus = sets.some((set) => set.status === "FAILED")
    ? "FAILED"
    : warnings.length > 0
      ? "UNVERIFIED"
      : "OBSERVED";
  const hashInput = { intent, route, automatedSets };

  return {
    leeway_session: {
      intent,
      route,
      route_method: "DETERMINISTIC_RULES",
      route_status: routeStatus,
      active_state_hash: sha256(hashInput),
      automated_sets: automatedSets,
      warnings,
    },
  };
}

export function observeConnection(input: {
  client?: string;
  model?: string;
  userAgent?: string;
  method?: string;
  name?: string;
}): void {
  totalRequests += 1;
  const client = input.client?.trim() || "anonymous-client";
  const model = input.model?.trim() || "UNDECLARED";
  const userAgent = input.userAgent?.trim() || "UNDECLARED";
  const key = sha256({ client, model, userAgent }).slice(0, 16);
  const previous = connections.get(key);
  connections.set(key, {
    id: key,
    client,
    model,
    userAgent,
    method: input.method?.trim() || "UNDECLARED",
    name: input.name?.trim() || "UNDECLARED",
    lastSeen: new Date().toISOString(),
    requestCount: (previous?.requestCount ?? 0) + 1,
  });

  if (connections.size > MAX_CONNECTIONS) {
    const oldest = [...connections.values()].sort((a, b) => a.lastSeen.localeCompare(b.lastSeen))[0];
    if (oldest) connections.delete(oldest.id);
  }
}

export function getTelemetry(): {
  evidenceStatus: EvidenceStatus;
  totalRequests: number;
  contextRoutes: number;
  activeObservedClients: number;
  connections: ConnectionObservation[];
  contentCapture: false;
} {
  return {
    evidenceStatus: "OBSERVED",
    totalRequests,
    contextRoutes,
    activeObservedClients: connections.size,
    connections: [...connections.values()].sort((a, b) => b.lastSeen.localeCompare(a.lastSeen)),
    contentCapture: false,
  };
}

export function getSystemDefinitions(): typeof setDefinitions {
  return setDefinitions;
}
