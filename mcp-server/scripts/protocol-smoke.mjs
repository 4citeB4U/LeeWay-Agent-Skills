import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { gameDevelopmentToolDefinitions } from "../dist/game-development-tools.js";
import { visualCapabilityToolDefinitions } from "../dist/visual-capability-tools.js";
import { communicationsToolDefinitions } from "../dist/communications-tools.js";
import { deviceCapabilityToolDefinitions } from "../dist/device-capability-tools.js";

const requiredTools = [
  ...gameDevelopmentToolDefinitions,
  ...visualCapabilityToolDefinitions,
  ...communicationsToolDefinitions,
  ...deviceCapabilityToolDefinitions,
].map((tool) => tool.name);

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

  const communicationCall = await client.callTool({
    name: "communications_prepare_action",
    arguments: {
      action: "email",
      recipient: "owner@example.invalid",
      content: { subject: "Protocol test", body: "Prepare only" },
    },
  });
  const communicationText = communicationCall.content?.[0]?.text;
  if (typeof communicationText !== "string") throw new Error("Communication preparation returned no text payload");
  const communication = JSON.parse(communicationText);
  if (communication.state !== "EXECUTED_LOCAL" || communication.external_action_executed !== false) {
    throw new Error(`Communication preparation crossed its external-action boundary: ${communicationText}`);
  }

  console.log(
    JSON.stringify({
      state: "PROTOCOL_VERIFIED",
      tool_count: names.length,
      bounded_capability_tools: requiredTools.length,
      game_development_tools: gameDevelopmentToolDefinitions.length,
      visual_capability_tools: visualCapabilityToolDefinitions.length,
      communications_tools: communicationsToolDefinitions.length,
      device_capability_tools: deviceCapabilityToolDefinitions.length,
      planning_state: plan.state,
      unconfigured_execution_state: blocked.state,
      communication_preparation_state: communication.state,
    }),
  );
} finally {
  await client.close();
}
