#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.PLAYWRIGHT
TAG: LEEWAY.SKILLS.PLAYWRIGHT.MCP.LAUNCHER

5WH:
WHAT = Governed launcher for the pinned Microsoft Playwright MCP runtime
WHY = Converts the Playwright Agent Skill from reference-only documentation into an executable browser capability
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = bin/leeway-playwright-mcp.js
WHEN = 2026
HOW = Resolves the repository-pinned playwright-mcp binary, applies governed defaults, and preserves stdio for MCP clients

AGENTS:
EXECUTE
VERIFY
EVIDENCE

LICENSE:
MIT
*/

import { spawn } from "node:child_process";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const configPath = path.join(root, "config", "leeway-playwright-runtime.json");
const config = JSON.parse(await fsp.readFile(configPath, "utf8"));

const runtimeEntry = path.join(root, "node_modules", "@playwright", "mcp", "cli.js");

if (!fs.existsSync(runtimeEntry)) {
  console.error("[LeeWay Playwright] BLOCKED: pinned @playwright/mcp runtime is not installed.");
  console.error("[LeeWay Playwright] Run: npm run playwright:gate");
  process.exit(3);
}

const outputDir = process.env.LEEWAY_PLAYWRIGHT_OUTPUT_DIR
  ? path.resolve(process.env.LEEWAY_PLAYWRIGHT_OUTPUT_DIR)
  : path.resolve(root, config.evidence.defaultRelativeDirectory);

await fsp.mkdir(outputDir, { recursive: true });

const configuredArgs = Array.isArray(config.mcp?.args) ? config.mcp.args : [];
const passthrough = process.argv.slice(2);
const hasOutput = passthrough.some((arg) => arg === "--output-dir" || arg.startsWith("--output-dir="));
const args = [...configuredArgs];
if (!hasOutput) args.push(`--output-dir=${outputDir}`);
args.push(...passthrough);

const child = spawn(process.execPath, [runtimeEntry, ...args], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
  shell: false,
  windowsHide: true,
});

child.on("error", (error) => {
  console.error(`[LeeWay Playwright] FAILED to launch MCP runtime: ${error.message}`);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`[LeeWay Playwright] MCP runtime exited by signal ${signal}`);
  }
  process.exit(code ?? 1);
});
