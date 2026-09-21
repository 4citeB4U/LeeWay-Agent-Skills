#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.VERIFICATION
TAG: LEEWAY.SKILLS.VERIFICATION.PLAYWRIGHT_BINDING
5WH:
WHAT = Verify Playwright skill discovery through the LeeWay Skills MCP server
WHY = Prove Agent Skills exposes the governed Playwright skill after runtime integration
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/verify-playwright-agent-skills-binding.mjs
WHEN = 2026
HOW = MCP stdio initialization and tools/list assertion
LICENSE: MIT
*/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), "..");
const launcher = path.join(root, "bin", "leeway-skills-mcp.js");
const evidenceDir = path.join(root, ".leeway", "playwright-evidence");
const evidencePath = path.join(evidenceDir, "playwright-agent-skills-binding.json");

await fs.mkdir(evidenceDir, { recursive: true });
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [launcher],
  cwd: root,
  stderr: "pipe",
});

let stderr = "";
transport.stderr?.on("data", (chunk) => {
  stderr += chunk.toString();
});

const client = new Client(
  { name: "leeway-playwright-binding-verifier", version: "1.0.0" },
  { capabilities: {} },
);

try {
  await client.connect(transport);
  const listed = await client.listTools();
  const toolNames = listed.tools.map((tool) => tool.name).sort();
  const playwrightTool = listed.tools.find((tool) => tool.name === "playwright");

  if (!playwrightTool) {
    throw new Error("LeeWay Skills MCP did not expose the playwright skill tool");
  }
  const result = {
    schema: "leeway.playwright-agent-skills-binding.v1",
    status: "VERIFIED",
    verified_at: new Date().toISOString(),
    leeway_skills_tool_count: toolNames.length,
    playwright_tool_present: true,
    playwright_tool_name: playwrightTool.name,
    playwright_tool_description: playwrightTool.description,
    stderr_tail: stderr.slice(-2000),
  };

  await fs.writeFile(evidencePath, JSON.stringify(result, null, 2) + "\n", "utf8");
  console.log(JSON.stringify(result, null, 2));
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
}
