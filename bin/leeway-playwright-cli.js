#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.PLAYWRIGHT
TAG: LEEWAY.SKILLS.PLAYWRIGHT.CLI.LAUNCHER
WHAT = Governed launcher for the pinned Microsoft Playwright CLI runtime
WHY = Gives coding agents a concise browser execution path through the LeeWay Agent Skills package
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = bin/leeway-playwright-cli.js
WHEN = 2026
HOW = Executes the repository-pinned playwright-cli binary and passes through explicit caller arguments
LICENSE: MIT
*/

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const runtimeEntry = path.join(root, "node_modules", "@playwright", "cli", "playwright-cli.js");

if (!fs.existsSync(runtimeEntry)) {
  console.error("[LeeWay Playwright] BLOCKED: pinned @playwright/cli runtime is not installed.");
  console.error("[LeeWay Playwright] Run: npm run playwright:gate");
  process.exit(3);
}

const child = spawn(process.execPath, [runtimeEntry, ...process.argv.slice(2)], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
  shell: false,
  windowsHide: true,
});

child.on("error", (error) => {
  console.error(`[LeeWay Playwright] FAILED to launch CLI runtime: ${error.message}`);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  if (signal) console.error(`[LeeWay Playwright] CLI exited by signal ${signal}`);
  process.exit(code ?? 1);
});
