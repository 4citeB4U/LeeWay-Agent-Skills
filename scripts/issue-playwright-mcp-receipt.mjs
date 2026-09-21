#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.RECEIPTS
TAG: LEEWAY.SKILLS.RECEIPTS.PLAYWRIGHT_MCP
5WH:
WHAT = Issue a deterministic Playwright MCP integration receipt
WHY = Preserve inspectable evidence only after the full Playwright gate passes
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/issue-playwright-mcp-receipt.mjs
WHEN = 2026
HOW = Reads live verifier evidence, audits dependencies, hashes governed files, and writes the receipt
LICENSE: MIT
*/

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), "..");
const evidenceDir = path.join(root, ".leeway", "playwright-evidence");
const receiptPath = path.join(root, "receipts", "playwright-mcp-integration-20260921.json");
const readJson = async (file) => JSON.parse(await fs.readFile(file, "utf8"));
const sha256File = async (file) =>
  crypto.createHash("sha256").update(await fs.readFile(file)).digest("hex");

const run = (command, args, cwd = root) => {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed: ${result.stderr || result.stdout}`);
  }
  return result.stdout.trim();
};

const runNpmAudit = (cwd) => {
  if (process.platform === "win32") {
    const comspec = process.env.ComSpec || "C:\\Windows\\System32\\cmd.exe";
    return run(comspec, ["/d", "/s", "/c", "npm audit --json"], cwd);
  }
  return run("npm", ["audit", "--json"], cwd);
};

const gitCommand = process.platform === "win32" ? "git.exe" : "git";

const browserProof = await readJson(path.join(evidenceDir, "playwright-mcp-verification.json"));
const bindingProof = await readJson(path.join(evidenceDir, "playwright-agent-skills-binding.json"));

if (browserProof.status !== "VERIFIED" || bindingProof.status !== "VERIFIED") {
  throw new Error("Playwright evidence is not VERIFIED; receipt refused");
}

const packageJson = await readJson(path.join(root, "package.json"));
const nestedPackageJson = await readJson(path.join(root, "mcp-server", "package.json"));
const rootAudit = JSON.parse(runNpmAudit(root));
const nestedAudit = JSON.parse(runNpmAudit(path.join(root, "mcp-server")));

if (rootAudit.metadata.vulnerabilities.total !== 0) {
  throw new Error("Root npm audit is not clean; receipt refused");
}
if (nestedAudit.metadata.vulnerabilities.total !== 0) {
  throw new Error("Nested MCP npm audit is not clean; receipt refused");
}

const governedFiles = [
  "agent-config.yaml",
  "config/mcp-runtime-registry.json",
  "skills/external/playwright/SKILL.md",
  "bin/leeway-playwright-mcp.js",
  "scripts/verify-playwright-mcp.mjs",
  "scripts/verify-playwright-agent-skills-binding.mjs",
  "scripts/issue-playwright-mcp-receipt.mjs",
  "package.json",
  "package-lock.json",
  "mcp-server/package.json",
  "mcp-server/package-lock.json",
];

const fileHashes = {};
for (const relative of governedFiles) {
  fileHashes[relative] = await sha256File(path.join(root, relative));
}
const receipt = {
  schema: "leeway.playwright-mcp.integration-receipt.v1",
  receipt_id: "LEEWAY-PLAYWRIGHT-MCP-INTEGRATION-20260921",
  status: "VERIFIED",
  issued_at: new Date().toISOString(),
  authority: "Creator/Human Authority > LeeWay Standards > Agent Skills > Tool Gateway",
  pre_commit_sha: run(gitCommand, ["rev-parse", "HEAD"]),
  runtime: {
    upstream: "microsoft/playwright-mcp",
    package: `@playwright/mcp@${packageJson.dependencies["@playwright/mcp"]}`,
    mcp_sdk_root: `@modelcontextprotocol/sdk@${packageJson.dependencies["@modelcontextprotocol/sdk"]}`,
    mcp_sdk_nested: `@modelcontextprotocol/sdk@${nestedPackageJson.dependencies["@modelcontextprotocol/sdk"]}`,
    transport: browserProof.transport,
    browser: browserProof.browser,
    server_version: browserProof.server_version,
  },
  proof: {
    playwright_mcp_tool_count: browserProof.tool_count,
    leeway_skills_tool_count: bindingProof.leeway_skills_tool_count,
    playwright_skill_present: bindingProof.playwright_tool_present,
    snapshot_contains_proof: browserProof.snapshot_contains_proof,
    screenshot_sha256: browserProof.screenshot_sha256,
    navigation_sha256: browserProof.navigation_sha256,
    snapshot_sha256: browserProof.snapshot_sha256,
  },
  security: {
    root_npm_vulnerabilities: rootAudit.metadata.vulnerabilities,
    nested_mcp_npm_vulnerabilities: nestedAudit.metadata.vulnerabilities,
    unrestricted_file_access_enabled: false,
    webmcp_enabled: false,
    browser_run_code_unsafe_default_authorized: false,
  },
  governed_file_sha256: fileHashes,
  evidence: {
    browser_verification: ".leeway/playwright-evidence/playwright-mcp-verification.json",
    binding_verification: ".leeway/playwright-evidence/playwright-agent-skills-binding.json",
    screenshot: browserProof.screenshot_path,
  },
  learning_ledger_updated: false,
};

await fs.mkdir(path.dirname(receiptPath), { recursive: true });
await fs.writeFile(receiptPath, JSON.stringify(receipt, null, 2) + "\n", "utf8");
console.log(JSON.stringify(receipt, null, 2));
