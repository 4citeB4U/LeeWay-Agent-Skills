#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.GOVERNANCE
TAG: LEEWAY.SKILLS.GOVERNANCE.NORMALIZE_LEGACY_FRONTMATTER

5WH:
WHAT = Deterministically add valid Agent Skills frontmatter to legacy LeeWay SKILL.md files that have none
WHY = Preserve LeeWay headers while making every canonical skill discoverable and validator-compatible
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/normalize-legacy-skill-frontmatter.mjs
WHEN = 2026
HOW = Read-only by default; --apply writes only files whose first non-BOM characters are not YAML frontmatter

AGENTS:
AUDIT
REPAIR
VERIFY

LICENSE:
MIT
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const skillsRoot = path.join(repoRoot, "skills");
const apply = process.argv.includes("--apply");
const check = process.argv.includes("--check");

function findSkillFiles(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...findSkillFiles(fullPath));
    if (entry.isFile() && entry.name === "SKILL.md") files.push(fullPath);
  }
  return files;
}

function yamlQuote(value) {
  return JSON.stringify(value.replace(/\s+/g, " ").trim());
}

const changes = [];
for (const skillFile of findSkillFiles(skillsRoot).sort()) {
  const original = fs.readFileSync(skillFile, "utf8");
  const withoutBom = original.replace(/^\uFEFF/, "");
  if (withoutBom.startsWith("---\n") || withoutBom.startsWith("---\r\n")) continue;

  const name = path.basename(path.dirname(skillFile)).toLowerCase();
  const heading = withoutBom.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? name.replaceAll("-", " ");
  const relativePath = path.relative(repoRoot, skillFile).replaceAll(path.sep, "/");
  const description = `LeeWay-governed ${heading} workflow. Use when a task requires ${name.replaceAll("-", " ")} procedures, validation, and evidence.`;
  const frontmatter = [
    "---",
    `name: ${name}`,
    `description: ${yamlQuote(description)}`,
    "license: MIT",
    "metadata:",
    "  authority: Creator/Human Authority > LeeWay Standards",
    "  source-class: legacy-native-normalized",
    `  canonical-path: ${relativePath}`,
    "---",
    "",
  ].join("\n");

  changes.push(relativePath);
  if (apply) fs.writeFileSync(skillFile, frontmatter + withoutBom, "utf8");
}

console.log(JSON.stringify({ mode: apply ? "APPLY" : "DRY_RUN", changed: changes.length, files: changes }, null, 2));
if (check && changes.length > 0) process.exitCode = 1;
