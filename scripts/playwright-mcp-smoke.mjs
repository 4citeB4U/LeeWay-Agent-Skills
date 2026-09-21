/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.PLAYWRIGHT
TAG: LEEWAY.SKILLS.PLAYWRIGHT.MCP.SMOKE

5WH:
WHAT = End-to-end smoke proof for the governed Playwright MCP runtime
WHY = Proves real MCP discovery, browser navigation, semantic element discovery, interaction, post-state assertion, and evidence creation
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/playwright-mcp-smoke.mjs
WHEN = 2026
HOW = Starts a controlled local web target, connects to the pinned Playwright MCP over stdio, performs a semantic interaction, and writes evidence

LICENSE:
MIT
*/

import { createServer } from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const config = JSON.parse(
  await fs.readFile(path.join(root, "config", "leeway-playwright-runtime.json"), "utf8"),
);
const evidenceDir = process.env.LEEWAY_PLAYWRIGHT_OUTPUT_DIR
  ? path.resolve(process.env.LEEWAY_PLAYWRIGHT_OUTPUT_DIR)
  : path.resolve(root, config.evidence.defaultRelativeDirectory);
await fs.mkdir(evidenceDir, { recursive: true });

const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>LeeWay Playwright Runtime Proof</title></head>
<body>
<main>
  <h1>LeeWay Playwright Runtime Proof</h1>
  <button id="run" type="button">Run diagnostic</button>
  <output id="status" aria-live="polite">READY</output>
</main>
<script>
document.getElementById('run').addEventListener('click', () => {
  document.getElementById('status').textContent = 'PASS';
  document.body.dataset.leewayProof = 'executed';
});
</script>
</body>
</html>`;

const server = createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(html);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
if (!address || typeof address === "string") throw new Error("Failed to allocate smoke-test port.");
const targetUrl = `http://127.0.0.1:${address.port}/`;

const launcher = path.join(root, "bin", "leeway-playwright-mcp.js");
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [launcher],
  env: { ...process.env, LEEWAY_PLAYWRIGHT_OUTPUT_DIR: evidenceDir },
  stderr: "pipe",
});
const client = new Client(
  { name: "leeway-playwright-veritas", version: "1.0.0" },
  { capabilities: {} },
);

const result = {
  schema: "leeway.playwright.mcp-smoke.v1",
  startedAt: new Date().toISOString(),
  targetUrl,
  mcpToolsList: false,
  navigation: false,
  semanticElementDiscovered: false,
  interaction: false,
  postInteractionAssertion: false,
  screenshotRequested: false,
  toolNames: [],
  status: "FAILED",
};

function textFrom(response) {
  return (response?.content ?? [])
    .filter((item) => item?.type === "text")
    .map((item) => item.text ?? "")
    .join("\n");
}

try {
  await client.connect(transport);
  const listed = await client.listTools();
  const tools = listed.tools ?? [];
  result.toolNames = tools.map((tool) => tool.name).sort();
  result.mcpToolsList = tools.length > 0;

  const required = ["browser_navigate", "browser_snapshot", "browser_click"];
  for (const name of required) {
    if (!result.toolNames.includes(name)) throw new Error(`Required MCP tool missing: ${name}`);
  }

  const navigation = await client.callTool({
    name: "browser_navigate",
    arguments: { url: targetUrl },
  });
  result.navigation = true;

  let snapshotText = textFrom(navigation);
  if (!snapshotText.includes("Run diagnostic")) {
    snapshotText = textFrom(
      await client.callTool({ name: "browser_snapshot", arguments: {} }),
    );
  }

  const refMatch =
    snapshotText.match(/button\s+"Run diagnostic"[^\n]*\[ref=(e\d+)\]/i) ||
    snapshotText.match(/\[ref=(e\d+)\][^\n]*Run diagnostic/i);
  if (!refMatch) throw new Error("Semantic button reference was not found in MCP accessibility snapshot.");
  result.semanticElementDiscovered = true;

  const click = await client.callTool({
    name: "browser_click",
    arguments: { element: "Run diagnostic button", target: refMatch[1] },
  });
  if (click?.isError) throw new Error(`browser_click failed: ${textFrom(click)}`);
  result.interaction = true;

  if (result.toolNames.includes("browser_wait_for")) {
    const waited = await client.callTool({
      name: "browser_wait_for",
      arguments: { text: "PASS" },
    });
    if (waited?.isError) throw new Error(`browser_wait_for failed: ${textFrom(waited)}`);
  }

  const afterResponse = await client.callTool({ name: "browser_snapshot", arguments: {} });
  if (afterResponse?.isError) throw new Error(`browser_snapshot failed: ${textFrom(afterResponse)}`);
  const after = textFrom(afterResponse);
  if (!/PASS/.test(after)) throw new Error("Post-interaction state PASS was not observed.");
  result.postInteractionAssertion = true;

  if (result.toolNames.includes("browser_take_screenshot")) {
    const screenshot = await client.callTool({
      name: "browser_take_screenshot",
      arguments: { type: "png", fullPage: true, scale: "css" },
    });
    if (screenshot?.isError) throw new Error(`browser_take_screenshot failed: ${textFrom(screenshot)}`);
    result.screenshotRequested = true;
  }

  if (result.toolNames.includes("browser_close")) {
    await client.callTool({ name: "browser_close", arguments: {} });
  }

  result.status = "PASS";
} finally {
  result.finishedAt = new Date().toISOString();
  const evidencePath = path.join(evidenceDir, "playwright-mcp-smoke-result.json");
  await fs.writeFile(evidencePath, JSON.stringify(result, null, 2) + "\n", "utf8");
  try { await client.close(); } catch {}
  await new Promise((resolve) => server.close(resolve));
}

console.log(JSON.stringify({
  status: result.status,
  evidencePath: path.join(evidenceDir, "playwright-mcp-smoke-result.json"),
  toolCount: result.toolNames.length,
  interaction: result.interaction,
  postInteractionAssertion: result.postInteractionAssertion,
  screenshotRequested: result.screenshotRequested,
}));
if (result.status !== "PASS") process.exit(1);
