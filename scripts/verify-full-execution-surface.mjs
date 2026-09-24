#!/usr/bin/env node
/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.VERIFICATION
TAG: LEEWAY.SKILLS.VERIFICATION.FULL_EXECUTION_SURFACE

5WH:
WHAT = Invoke every tool exposed by the canonical LeeWay Skills MCP server.
WHY = Prove all 238 portable skills are inside the execution fabric and all bounded game/Blender handlers are callable.
WHO = Leeway Industries / Creator Authority.
WHERE = scripts/verify-full-execution-surface.mjs
WHEN = 2026
HOW = MCP stdio list/call sweep using non-destructive skill probes and schema-derived bounded tool arguments.
LICENSE: MIT
*/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { gameDevelopmentToolDefinitions } from "../mcp-server/dist/game-development-tools.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evidenceDir = path.join(root, ".leeway", "capability-evidence");
await fs.mkdir(evidenceDir, { recursive: true });

const launcher = path.join(root, "bin", "leeway-skills-mcp.js");
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [launcher],
  cwd: root,
  stderr: "pipe",
});

let stderr = "";
transport.stderr?.on("data", (chunk) => {
  stderr += chunk.toString();
  if (stderr.length > 20000) stderr = stderr.slice(-20000);
});

const client = new Client(
  { name: "leeway-full-execution-surface-verifier", version: "1.0.0" },
  { capabilities: {} },
);

const gameNames = new Set(gameDevelopmentToolDefinitions.map((tool) => tool.name));

function minimalValue(schema = {}) {
  if (Array.isArray(schema.enum) && schema.enum.length) return schema.enum[0];
  if (schema.type === "string") return "LEEWAY_PROBE";
  if (schema.type === "number" || schema.type === "integer") return 1;
  if (schema.type === "boolean") return false;
  if (schema.type === "array") return [minimalValue(schema.items || { type: "string" })];
  if (schema.type === "object") return {};
  return "LEEWAY_PROBE";
}

function textOf(result) {
  return (result.content || [])
    .filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n");
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

const results = [];

try {
  await client.connect(transport);
  const listed = await client.listTools();

  for (const tool of listed.tools) {
    const started = Date.now();
    const isGame = gameNames.has(tool.name);
    let args;

    if (isGame) {
      args = {};
      for (const key of tool.inputSchema?.required || []) {
        args[key] = minimalValue(tool.inputSchema?.properties?.[key] || {});
      }
    } else {
      args = {
        instruction:
          "LeeWay execution-fabric verification probe only. Resolve the canonical skill contract without external mutation.",
        context: {
          requirements:
            "Verify execution binding only. Do not perform downstream external actions.",
        },
        options: { verification_probe: true },
      };
    }

    try {
      const call = await client.callTool({ name: tool.name, arguments: args });
      const text = textOf(call);
      const payload = parseJson(text);
      let state = "UNKNOWN";

      if (isGame) {
        if (payload?.state === "EXECUTED_LOCAL" && payload?.executed === true) {
          state = "GAME_EXECUTED_LOCAL";
        } else if (payload?.state === "BLOCKED_ADAPTER_UNCONFIGURED") {
          state = "GAME_HANDLER_EXECUTABLE_GATEWAY_UNCONFIGURED";
        } else if (payload?.state === "EXECUTED_UNVERIFIED") {
          state = "GAME_GATEWAY_EXECUTED_UNVERIFIED";
        } else if (payload?.state === "ADAPTER_RESPONDED") {
          state = "GAME_GATEWAY_RESPONDED";
        } else if (call.isError) {
          state = "GAME_HANDLER_ERROR";
        } else {
          state = "GAME_HANDLER_RESPONDED";
        }
      } else if (
        payload?.schema === "leeway.skill-execution.v1" &&
        payload?.state === "SKILL_CONTRACT_EXECUTED" &&
        payload?.executed === true
      ) {
        state = "SKILL_CONTRACT_EXECUTED";
      } else {
        state = call.isError ? "SKILL_CALL_ERROR" : "SKILL_CONTRACT_INVALID";
      }

      results.push({
        name: tool.name,
        family: isGame ? "game-development" : "skill",
        state,
        route: !isGame ? payload?.route ?? null : null,
        external_action_executed:
          !isGame ? Boolean(payload?.external_action_executed) : null,
        is_error: Boolean(call.isError),
        duration_ms: Date.now() - started,
      });
    } catch (error) {
      results.push({
        name: tool.name,
        family: isGame ? "game-development" : "skill",
        state: "INVOCATION_EXCEPTION",
        error: error instanceof Error ? error.message : String(error),
        duration_ms: Date.now() - started,
      });
    }
  }

  const skillResults = results.filter((entry) => entry.family === "skill");
  const gameResults = results.filter(
    (entry) => entry.family === "game-development",
  );
  const routeCounts = Object.fromEntries(
    [...new Set(skillResults.map((entry) => entry.route || "UNKNOWN"))]
      .sort()
      .map((route) => [
        route,
        skillResults.filter((entry) => (entry.route || "UNKNOWN") === route)
          .length,
      ]),
  );

  const summary = {
    schema: "leeway.full-execution-surface.verification.v1",
    verified_at: new Date().toISOString(),
    listed_tools: listed.tools.length,
    invoked_tools: results.length,
    skill_tools: skillResults.length,
    skill_contract_executed: skillResults.filter(
      (entry) => entry.state === "SKILL_CONTRACT_EXECUTED",
    ).length,
    game_tools: gameResults.length,
    game_executed_local: gameResults.filter(
      (entry) => entry.state === "GAME_EXECUTED_LOCAL",
    ).length,
    game_gateway_unconfigured: gameResults.filter(
      (entry) =>
        entry.state === "GAME_HANDLER_EXECUTABLE_GATEWAY_UNCONFIGURED",
    ).length,
    invocation_exceptions: results.filter(
      (entry) => entry.state === "INVOCATION_EXCEPTION",
    ).length,
    invalid_skill_contracts: skillResults.filter(
      (entry) => entry.state !== "SKILL_CONTRACT_EXECUTED",
    ).length,
    tool_errors: results.filter((entry) =>
      ["SKILL_CALL_ERROR", "GAME_HANDLER_ERROR"].includes(entry.state),
    ).length,
    route_counts: routeCounts,
    stderr_tail: stderr.slice(-4000),
    results,
  };

  const evidencePath = path.join(
    evidenceDir,
    "full-execution-surface-verification.json",
  );
  await fs.writeFile(
    evidencePath,
    JSON.stringify(summary, null, 2) + "\n",
    "utf8",
  );

  const pass =
    summary.listed_tools === summary.invoked_tools &&
    summary.skill_tools === summary.skill_contract_executed &&
    summary.invocation_exceptions === 0 &&
    summary.invalid_skill_contracts === 0 &&
    summary.tool_errors === 0;

  console.log(
    JSON.stringify(
      {
        state: pass ? "FULL_EXECUTION_FABRIC_VERIFIED" : "FAILED",
        listed_tools: summary.listed_tools,
        invoked_tools: summary.invoked_tools,
        skill_tools: summary.skill_tools,
        skill_contract_executed: summary.skill_contract_executed,
        game_tools: summary.game_tools,
        game_executed_local: summary.game_executed_local,
        game_gateway_unconfigured: summary.game_gateway_unconfigured,
        route_counts: summary.route_counts,
        evidence: path
          .relative(root, evidencePath)
          .replaceAll("\\", "/"),
      },
      null,
      2,
    ),
  );

  if (!pass) process.exitCode = 1;
} finally {
  try {
    await client.close();
  } catch {
    try {
      await transport.close();
    } catch {}
  }
}
