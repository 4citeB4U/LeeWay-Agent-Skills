#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.VERIFICATION
TAG: LEEWAY.SKILLS.VERIFICATION.PLAYWRIGHT_MCP

5WH:
WHAT = Live Playwright MCP protocol and browser execution verifier
WHY = Proves the pinned MCP runtime is executable before LeeWay promotion
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/verify-playwright-mcp.mjs
WHEN = 2026
HOW = Connects over MCP stdio, launches Edge, navigates a local proof page, snapshots, screenshots, and writes evidence

AGENTS:
AUDIT
VERIFY
EXECUTE

LICENSE:
MIT
*/

import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), "..");
const evidenceDir = path.join(root, ".leeway", "playwright-evidence");
const receiptPath = path.join(evidenceDir, "playwright-mcp-verification.json");
const launcherPath = path.join(root, "bin", "leeway-playwright-mcp.js");

await fs.mkdir(evidenceDir, { recursive: true });

const proofText = "LEEWAY_PLAYWRIGHT_MCP_PROOF";
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${proofText}</title></head>
<body><main><h1>${proofText}</h1><button id="proof-button">Playwright MCP Ready</button></main></body></html>`;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  response.end(html);
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const address = server.address();
if (!address || typeof address === "string") throw new Error("Local proof server did not expose a TCP port");
const url = `http://127.0.0.1:${address.port}/`;

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [
    launcherPath,
    "--output-dir", evidenceDir,
  ],
  cwd: root,
  stderr: "pipe",
});

let stderr = "";
transport.stderr?.on("data", (chunk) => {
  stderr += chunk.toString();
  if (stderr.length > 20000) stderr = stderr.slice(-20000);
});

const client = new Client(
  { name: "leeway-playwright-mcp-verifier", version: "1.0.0" },
  { capabilities: {} },
);

const textOf = (result) =>
  (result.content || [])
    .filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n");
let receipt;
try {
  await client.connect(transport);

  const serverVersion = client.getServerVersion();
  const listed = await client.listTools();
  const toolNames = listed.tools.map((tool) => tool.name).sort();

  for (const required of ["browser_navigate", "browser_snapshot", "browser_take_screenshot"]) {
    if (!toolNames.includes(required)) {
      throw new Error(`Required Playwright MCP tool missing: ${required}`);
    }
  }

  const navigation = await client.callTool({
    name: "browser_navigate",
    arguments: { url },
  });

  const snapshot = await client.callTool({
    name: "browser_snapshot",
    arguments: {},
  });

  const screenshot = await client.callTool({
    name: "browser_take_screenshot",
    arguments: { filename: ".leeway/playwright-evidence/playwright-mcp-proof.png", fullPage: true },
  });

  const navigationText = textOf(navigation);
  const snapshotText = textOf(snapshot);
  const screenshotText = textOf(screenshot);
  if (!snapshotText.includes(proofText)) {
    throw new Error("Browser snapshot did not contain the local proof marker");
  }

  const screenshotPath = path.join(evidenceDir, "playwright-mcp-proof.png");
  const screenshotBytes = await fs.readFile(screenshotPath);

  receipt = {
    schema: "leeway.playwright-mcp.verification.v1",
    status: "VERIFIED",
    verified_at: new Date().toISOString(),
    package: "@playwright/mcp@0.0.82",
    mcp_sdk: "@modelcontextprotocol/sdk@1.30.0",
    transport: "stdio",
    browser: "msedge",
    mode: ["headless", "isolated", "workspace-bounded"],
    server_version: serverVersion,
    tool_count: toolNames.length,
    tools: toolNames,
    proof_url: url,
    proof_marker: proofText,
    snapshot_contains_proof: true,
    navigation_sha256: crypto.createHash("sha256").update(navigationText).digest("hex"),
    snapshot_sha256: crypto.createHash("sha256").update(snapshotText).digest("hex"),
    screenshot_sha256: crypto.createHash("sha256").update(screenshotBytes).digest("hex"),
    screenshot_path: path.relative(root, screenshotPath).replaceAll("\\", "/"),
    screenshot_result: screenshotText.slice(0, 2000),
    stderr_tail: stderr.slice(-4000),
  };

  await fs.writeFile(receiptPath, JSON.stringify(receipt, null, 2) + "\n", "utf8");
  console.log(JSON.stringify(receipt, null, 2));
} finally {
  try {
    await client.close();
  } catch {
    try {
      await transport.close();
    } catch {
      // Best-effort shutdown only.
    }
  }
  await new Promise((resolve) => server.close(resolve));
}

if (!receipt || receipt.status !== "VERIFIED") {
  process.exitCode = 1;
}
