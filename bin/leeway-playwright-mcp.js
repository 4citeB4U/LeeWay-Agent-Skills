#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP
TAG: LEEWAY.SKILLS.MCP.PLAYWRIGHT_LAUNCHER

5WH:
WHAT = Governed launcher for the pinned Playwright MCP runtime
WHY = Makes browser automation an executable LeeWay Agent Skills capability
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = bin/leeway-playwright-mcp.js
WHEN = 2026
HOW = Launches the pinned @playwright/mcp CLI with safe workspace-bounded defaults

AGENTS:
SERVE
EXECUTE
VERIFY

LICENSE:
MIT
*/

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const cliPath = path.join(packageRoot, "node_modules", "@playwright", "mcp", "cli.js");

const userArgs = process.argv.slice(2);
const has = (flag) => userArgs.includes(flag);

const defaults = [];
if (!has("--browser") && !has("--executable-path") && !has("--cdp-endpoint")) {
  defaults.push("--browser", "msedge");
}
if (!has("--headless") && !has("--extension") && !has("--cdp-endpoint")) {
  defaults.push("--headless");
}
if (!has("--isolated") && !has("--user-data-dir") && !has("--extension")) {
  defaults.push("--isolated");
}
if (!has("--no-webmcp")) {
  defaults.push("--no-webmcp");
}

const child = spawn(process.execPath, [cliPath, ...defaults, ...userArgs], {
  cwd: process.cwd(),
  stdio: "inherit",
  windowsHide: true,
});
child.on("exit", (code, signal) => {
  if (signal) {
    console.error("[LeeWay Playwright MCP] terminated by signal:", signal);
    process.exit(1);
  }
  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error("[LeeWay Playwright MCP] unable to start pinned runtime:", error);
  process.exit(1);
});
