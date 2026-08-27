/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.CONTEXT.TEST
TAG: LEEWAY.SKILLS.MCP.CONTEXT.HARNESS_TEST

5WH:
WHAT = Deterministic tests for LeeWay MCP context routing and fail-closed evidence behavior
WHY = Prove routing stability and prevent sample or missing data from being promoted to verified state
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/context-harness.test.ts
WHEN = 2026
HOW = Node assertions against deterministic classifier, unconfigured adapters and SHA-256 stability

AGENTS:
TEST
VERIFY

LICENSE:
MIT
*/

import assert from "node:assert/strict";
import { classifyIntent, getContextSet, routeContext, sha256 } from "./context-harness.js";

async function main(): Promise<void> {
  assert.deepEqual(classifyIntent("edit the TypeScript frontend component"), ["A"]);
  assert.deepEqual(classifyIntent("check Docker runtime health and Veritas receipt"), ["B"]);
  assert.deepEqual(classifyIntent("update the Roblox universe difficulty and Luau wave code"), ["C", "A"]);
  assert.deepEqual(classifyIntent("show MCP gateway registry and models"), ["D"]);
  assert.deepEqual(classifyIntent("unclassified general question"), ["D"]);

  assert.equal(sha256({ b: 2, a: 1 }), sha256({ a: 1, b: 2 }));

  const previousA = process.env.LEEWAY_SET_A_FILE;
  delete process.env.LEEWAY_SET_A_FILE;
  const setA = await getContextSet("A");
  assert.equal(setA.status, "UNVERIFIED");
  assert.equal(setA.source, "NOT_CONFIGURED");

  const routed = await routeContext("edit TypeScript code");
  assert.deepEqual(routed.leeway_session.route, ["A"]);
  assert.equal(routed.leeway_session.route_method, "DETERMINISTIC_RULES");
  assert.ok(routed.leeway_session.active_state_hash.length === 64);
  assert.ok(routed.leeway_session.warnings.length >= 1);

  if (previousA !== undefined) process.env.LEEWAY_SET_A_FILE = previousA;

  console.log("LEEWAY_CONTEXT_HARNESS_TEST=PASS");
}

main().catch((error) => {
  console.error("LEEWAY_CONTEXT_HARNESS_TEST=FAIL", error);
  process.exitCode = 1;
});
