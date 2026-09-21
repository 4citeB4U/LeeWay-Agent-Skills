import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { gameDevelopmentToolDefinitions } from "../dist/game-development-tools.js";

const requiredTools = gameDevelopmentToolDefinitions.map((tool) => tool.name);

const client = new Client(
  { name: "leeway-game-development-protocol-smoke", version: "1.0.0" },
  { capabilities: {} },
);
const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["dist/index.js"],
});

try {
  await client.connect(transport);
  const listed = await client.listTools();
  const names = listed.tools.map((tool) => tool.name);
  for (const name of requiredTools) {
    if (!names.includes(name)) throw new Error(`MCP tool list is missing ${name}`);
  }

  const planned = await client.callTool({
    name: "game_plan_slice",
    arguments: {
      concept: "A small traversal prototype",
      engine: "godot",
      target_platforms: ["windows"],
      acceptance_criteria: ["player_can_complete_primary_loop"],
    },
  });
  const planText = planned.content?.[0]?.text;
  if (typeof planText !== "string") throw new Error("Planning tool returned no text payload");
  const plan = JSON.parse(planText);
  if (plan.state !== "EXECUTED_LOCAL" || plan.executed !== true) {
    throw new Error(`Unexpected planning result: ${planText}`);
  }

  const blockedCall = await client.callTool({
    name: "game_run_build",
    arguments: { project_root: "/approved/project", target: "windows", configuration: "release" },
  });
  const blockedText = blockedCall.content?.[0]?.text;
  if (typeof blockedText !== "string") throw new Error("Build tool returned no text payload");
  const blocked = JSON.parse(blockedText);
  if (blocked.state !== "BLOCKED_ADAPTER_UNCONFIGURED" || blocked.executed !== false) {
    throw new Error(`Build tool did not preserve the adapter boundary: ${blockedText}`);
  }

  console.log(
    JSON.stringify({
      state: "PROTOCOL_VERIFIED",
      tool_count: names.length,
      game_development_tools: requiredTools.length,
      planning_state: plan.state,
      unconfigured_execution_state: blocked.state,
    }),
  );
} finally {
  await client.close();
}
