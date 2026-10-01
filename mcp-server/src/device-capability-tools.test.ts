/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.TEST
TAG: LEEWAY.SKILLS.MCP.DEVICE_CAPABILITIES.TEST

5WH:
WHAT = Contract tests for device-agnostic MCP tools
WHY = Keep device discovery, observation, and control behind one authenticated gateway
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/device-capability-tools.test.ts
WHEN = 2026
HOW = Node assertions over the published surface and closed adapter boundary

LICENSE:
MIT
*/

import assert from "node:assert/strict";
import test from "node:test";
import {
  deviceCapabilityToolDefinitions,
  executeDeviceCapabilityTool,
  isDeviceCapabilityTool,
} from "./device-capability-tools.js";

test("publishes the portable device MCP surface", () => {
  const names = deviceCapabilityToolDefinitions.map((tool) => tool.name).sort();
  assert.deepEqual(names, [
    "device_capabilities",
    "device_files_read",
    "device_files_write",
    "device_list",
    "device_observe_screen",
    "device_open_app",
    "device_ui_action",
  ]);
  assert.equal(isDeviceCapabilityTool("device_ui_action"), true);
});

test("blocks when an authenticated Device Bridge gateway is absent", async () => {
  const names = ["LEEWAY_DEVICE_MCP_GATEWAY_URL", "LEEWAY_DEVICE_MCP_BEARER_TOKEN"] as const;
  const prior = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  names.forEach((name) => delete process.env[name]);
  try {
    const execution = await executeDeviceCapabilityTool("device_capabilities", { device_id: "fold" });
    const result = JSON.parse(execution.text);
    assert.equal(result.state, "BLOCKED_ADAPTER_UNCONFIGURED");
    assert.equal(result.executed, false);
    assert.equal(execution.isError, true);
  } finally {
    for (const name of names) {
      if (prior[name] === undefined) delete process.env[name];
      else process.env[name] = prior[name];
    }
  }
});

test("rejects unbounded or postcondition-free UI actions", async () => {
  await assert.rejects(
    executeDeviceCapabilityTool("device_ui_action", {
      device_id: "fold",
      action: {},
      expected_postcondition: { visible_text: "Settings" },
    }),
    /Invalid UI action type/,
  );
  await assert.rejects(
    executeDeviceCapabilityTool("device_ui_action", {
      device_id: "fold",
      action: { type: "tap", target: { x: 100, y: 200 } },
    }),
    /Missing required arguments: expected_postcondition/,
  );
});

test("accepts a bounded UI action contract before the adapter gate", async () => {
  const execution = await executeDeviceCapabilityTool("device_ui_action", {
    device_id: "fold",
    action: { type: "tap", target: { accessibility_id: "retry_microphone" } },
    expected_postcondition: { visible_text: "Listening" },
  });
  const result = JSON.parse(execution.text);
  assert.equal(result.state, "BLOCKED_ADAPTER_UNCONFIGURED");
});

test("rejects a device operation without device identity", async () => {
  await assert.rejects(
    executeDeviceCapabilityTool("device_open_app", { app_id: "industries.leeway.pocket" }),
    /Missing required arguments: device_id/,
  );
});
