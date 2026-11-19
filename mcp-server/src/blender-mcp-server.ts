/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.MCP
TAG: LEEWAY.SKILLS.MCP.BLENDER_SERVER
5WH:
WHAT = Dedicated bounded Blender MCP server inside LeeWay Agent Skills.
WHY = Lets Agent Lee invoke authorized Blender worker operations without arbitrary code execution.
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/blender-mcp-server.ts
WHEN = 2026
HOW = MCP stdio tools -> bounded worker client -> remote/headless Blender worker.
AGENTS:
SERVE
EXECUTE
VERIFY
LICENSE:
MIT
*/

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from "@modelcontextprotocol/sdk/types.js";
import { BLENDER_OPERATIONS, BlenderOperation, BlenderWorkerRequest, callBlenderWorker, isBlenderOperation } from "./blender-worker.js";

const server = new Server(
  { name: "leeway-blender-mcp", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

function toolFor(operation: BlenderOperation): Tool {
  return {
    name: `blender_${operation.replace(/\./g, "_")}`,
    description: `LeeWay governed Blender capability: ${operation}. Requires configured Blender worker; does not authorize arbitrary bpy/Python.`,
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        project: { type: "string" },
        parameters: { type: "object", additionalProperties: true },
        expected_artifacts: { type: "array", items: { type: "string" } },
        acceptance_tests: { type: "array", items: { type: "string" } },
      },
      required: ["task_id", "parameters"],
    },
  };
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: BLENDER_OPERATIONS.map(toolFor),
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const prefix = "blender_";
  const raw = request.params.name.startsWith(prefix)
    ? request.params.name.slice(prefix.length).replace(/_/g, ".")
    : "";
  if (!isBlenderOperation(raw)) {
    return { content: [{ type: "text" as const, text: `BLOCKED: unauthorized Blender tool ${request.params.name}` }], isError: true };
  }

  const args = (request.params.arguments || {}) as Record<string, unknown>;
  const taskId = typeof args.task_id === "string" ? args.task_id.trim() : "";
  const parameters = args.parameters && typeof args.parameters === "object" ? args.parameters as Record<string, unknown> : {};
  if (!taskId) {
    return { content: [{ type: "text" as const, text: "BLOCKED: task_id is required" }], isError: true };
  }

  const workerRequest: BlenderWorkerRequest = {
    protocol_version: "LEEWAY-BLENDER-WORKER-v1",
    task_id: taskId,
    operation: raw,
    parameters,
    ...(typeof args.project === "string" ? { project: args.project } : {}),
    ...(Array.isArray(args.expected_artifacts) ? { expected_artifacts: args.expected_artifacts.filter((x): x is string => typeof x === "string") } : {}),
    ...(Array.isArray(args.acceptance_tests) ? { acceptance_tests: args.acceptance_tests.filter((x): x is string => typeof x === "string") } : {}),
  };

  try {
    const result = await callBlenderWorker(workerRequest);
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      isError: result.status !== "SUCCEEDED",
    };
  } catch (error) {
    return {
      content: [{ type: "text" as const, text: error instanceof Error ? error.message : String(error) }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`[LeeWay Blender MCP] Ready with ${BLENDER_OPERATIONS.length} bounded tools`);
