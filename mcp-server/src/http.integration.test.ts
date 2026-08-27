/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.REMOTE.TEST
TAG: LEEWAY.SKILLS.MCP.REMOTE.INTEGRATION_TEST

5WH:
WHAT = End-to-end MCP v2 HTTP integration test for the LeeWay context gateway
WHY = Prove a real MCP client can connect, negotiate the modern protocol and call the deterministic context tool
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/http.integration.test.ts
WHEN = 2026
HOW = Spawn the built HTTP server, connect with the official MCP v2 client, list primitives and invoke context routing

AGENTS:
TEST
VERIFY

LICENSE:
MIT
*/

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 18788;
const BASE = `http://127.0.0.1:${PORT}`;

async function waitForHealth(timeoutMs = 15000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  let lastError: unknown;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${BASE}/healthz`);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Gateway did not become healthy: ${String(lastError)}`);
}

async function main(): Promise<void> {
  const child = spawn(process.execPath, [path.join(__dirname, "http.js")], {
    env: {
      ...process.env,
      PORT: String(PORT),
      NODE_ENV: "production",
      LEEWAY_ALLOWED_HOSTS: "127.0.0.1,localhost",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stderr = "";
  child.stderr?.on("data", (chunk) => {
    stderr += String(chunk);
  });

  try {
    await waitForHealth();

    const portal = await fetch(`${BASE}/`);
    assert.equal(portal.status, 200);
    assert.match(await portal.text(), /Zero Search Debt/);

    const client = new Client(
      { name: "leeway-ci-client", version: "1.0.0" },
      { versionNegotiation: { mode: "auto" } },
    );
    const transport = new StreamableHTTPClientTransport(new URL(`${BASE}/mcp`), {
      requestInit: {
        headers: {
          "x-leeway-client-id": "github-actions-verifier",
          "x-leeway-model": "deterministic-test-client",
        },
      },
    });

    await client.connect(transport);
    assert.equal(client.getProtocolEra(), "modern");

    const tools = await client.listTools();
    assert.ok(tools.tools.some((tool) => tool.name === "leeway_context_route"));
    assert.ok(tools.tools.some((tool) => tool.name === "leeway_gateway_status"));

    const resources = await client.listResources();
    assert.ok(resources.resources.some((resource) => resource.uri === "leeway://context/set-a"));
    assert.ok(resources.resources.some((resource) => resource.uri === "leeway://context/set-d"));

    const result = await client.callTool({
      name: "leeway_context_route",
      arguments: { intent: "check Docker runtime health and Veritas receipt" },
    });
    const text = result.content.find((item) => item.type === "text");
    assert.ok(text && text.type === "text");
    const parsed = JSON.parse(text.text) as { leeway_session: { route: string[]; route_method: string } };
    assert.deepEqual(parsed.leeway_session.route, ["B"]);
    assert.equal(parsed.leeway_session.route_method, "DETERMINISTIC_RULES");

    const telemetry = (await fetch(`${BASE}/api/telemetry`).then((response) => response.json())) as {
      activeObservedClients: number;
      contentCapture: boolean;
    };
    assert.ok(telemetry.activeObservedClients >= 1);
    assert.equal(telemetry.contentCapture, false);

    await client.close();
    console.log("LEEWAY_MCP_HTTP_INTEGRATION_TEST=PASS");
  } finally {
    child.kill("SIGTERM");
    await new Promise<void>((resolve) => {
      if (child.exitCode !== null) return resolve();
      child.once("exit", () => resolve());
      setTimeout(() => resolve(), 3000).unref();
    });
    if (child.exitCode && child.exitCode !== 0) {
      console.error(stderr);
    }
  }
}

main().catch((error) => {
  console.error("LEEWAY_MCP_HTTP_INTEGRATION_TEST=FAIL", error);
  process.exitCode = 1;
});
