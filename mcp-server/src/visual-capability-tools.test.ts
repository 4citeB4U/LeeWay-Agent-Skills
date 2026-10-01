/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.TEST
TAG: LEEWAY.SKILLS.MCP.VISUAL_CAPABILITIES.TEST

5WH:
WHAT = Contract tests for portable visual MCP tools
WHY = Prevent missing tools, unsafe provider binding, and false image-generation claims
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/visual-capability-tools.test.ts
WHEN = 2026
HOW = Node tests over schemas, adapter gates, and a loopback provider response

LICENSE:
MIT
*/

import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";
import {
  executeVisualCapabilityTool,
  isVisualCapabilityTool,
  visualCapabilityToolDefinitions,
} from "./visual-capability-tools.js";

test("publishes the recovered visual capability surface", () => {
  const names = visualCapabilityToolDefinitions.map((tool) => tool.name).sort();
  assert.deepEqual(names, [
    "visual_convert_image_to_3d",
    "visual_generate_image",
    "visual_inspect_image",
    "visual_provider_status",
  ]);
  assert.equal(isVisualCapabilityTool("visual_generate_image"), true);
});

test("blocks honestly when no image provider is configured", async () => {
  const prior = process.env.LEEWAY_IMAGE_GENERATION_URL;
  delete process.env.LEEWAY_IMAGE_GENERATION_URL;
  try {
    const execution = await executeVisualCapabilityTool("visual_generate_image", { prompt: "blueprint" });
    const result = JSON.parse(execution.text);
    assert.equal(result.state, "BLOCKED_ADAPTER_UNCONFIGURED");
    assert.equal(result.executed, false);
    assert.equal(execution.isError, true);
  } finally {
    if (prior === undefined) delete process.env.LEEWAY_IMAGE_GENERATION_URL;
    else process.env.LEEWAY_IMAGE_GENERATION_URL = prior;
  }
});

test("rejects malformed image-generation arguments", async () => {
  await assert.rejects(
    executeVisualCapabilityTool("visual_generate_image", { prompt: "", width: "512" }),
    /Missing required arguments|Invalid arguments/,
  );
});

test("does not send credentials-free requests to remote providers", async () => {
  const priorUrl = process.env.LEEWAY_IMAGE_GENERATION_URL;
  const priorToken = process.env.LEEWAY_IMAGE_GENERATION_BEARER_TOKEN;
  process.env.LEEWAY_IMAGE_GENERATION_URL = "http://example.invalid";
  delete process.env.LEEWAY_IMAGE_GENERATION_BEARER_TOKEN;
  try {
    const result = JSON.parse((await executeVisualCapabilityTool("visual_generate_image", { prompt: "blueprint" })).text);
    assert.equal(result.state, "BLOCKED_ADAPTER_CONFIGURATION_INVALID");
    assert.equal(result.executed, false);
  } finally {
    if (priorUrl === undefined) delete process.env.LEEWAY_IMAGE_GENERATION_URL;
    else process.env.LEEWAY_IMAGE_GENERATION_URL = priorUrl;
    if (priorToken === undefined) delete process.env.LEEWAY_IMAGE_GENERATION_BEARER_TOKEN;
    else process.env.LEEWAY_IMAGE_GENERATION_BEARER_TOKEN = priorToken;
  }
});

test("records a loopback provider artifact as unverified execution evidence", async () => {
  const server = http.createServer((request, response) => {
    if (request.method === "POST" && request.url === "/image/generate") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ status: "READY", path: "/artifacts/test.png", truth: "test provider pixels" }));
      return;
    }
    response.writeHead(404).end();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const prior = process.env.LEEWAY_IMAGE_GENERATION_URL;
  process.env.LEEWAY_IMAGE_GENERATION_URL = `http://127.0.0.1:${address.port}`;
  try {
    const execution = await executeVisualCapabilityTool("visual_generate_image", {
      prompt: "portable blueprint",
      width: 512,
      height: 512,
    });
    const result = JSON.parse(execution.text);
    assert.equal(result.state, "ADAPTER_EXECUTED_UNVERIFIED");
    assert.equal(result.executed, true);
    assert.equal(execution.isError, false);
    assert.equal(result.provider.path, "/artifacts/test.png");
  } finally {
    if (prior === undefined) delete process.env.LEEWAY_IMAGE_GENERATION_URL;
    else process.env.LEEWAY_IMAGE_GENERATION_URL = prior;
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("does not admit a generic executed flag without artifact evidence", async () => {
  const server = http.createServer((_request, response) => {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ executed: true }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const prior = process.env.LEEWAY_IMAGE_GENERATION_URL;
  process.env.LEEWAY_IMAGE_GENERATION_URL = `http://127.0.0.1:${address.port}`;
  try {
    const execution = await executeVisualCapabilityTool("visual_generate_image", { prompt: "missing artifact" });
    const result = JSON.parse(execution.text);
    assert.equal(result.state, "ADAPTER_RESPONDED_WITHOUT_ARTIFACT_EVIDENCE");
    assert.equal(result.executed, false);
    assert.equal(execution.isError, true);
  } finally {
    if (prior === undefined) delete process.env.LEEWAY_IMAGE_GENERATION_URL;
    else process.env.LEEWAY_IMAGE_GENERATION_URL = prior;
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("requires a provider family for status", async () => {
  await assert.rejects(
    executeVisualCapabilityTool("visual_provider_status", {}),
    /Missing required arguments: provider/,
  );
});
