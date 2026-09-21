#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.AUDIT
TAG: LEEWAY.SKILLS.AUDIT.TOOL_INVENTORY

5WH:
WHAT = Deterministic inventory audit for promoted skills and tools
WHY = Prevent silent omissions, duplicate skill names, and registry/file drift
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/audit-tool-inventory.mjs
WHEN = 2026
HOW = Compare tracked snapshot counts, registry links, skill folders, and MCP contract names

LICENSE:
MIT
*/

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const marketingRoot = path.join(repoRoot, "tools", "external", "marketingskills");

async function filesUnder(root) {
  const files = [];
  async function walk(current) {
    for (const entry of await fs.readdir(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile()) files.push(full);
    }
  }
  await walk(root);
  return files.sort();
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const marketingFiles = await filesUnder(marketingRoot);
const marketingOverlayFiles = marketingFiles.filter(file => path.relative(marketingRoot, file).split(path.sep)[0] === "tests");
const marketingPayloadFiles = marketingFiles.filter(file => !marketingOverlayFiles.includes(file));
const cliFiles = marketingFiles.filter(file => file.endsWith(".js") && path.dirname(file).endsWith(`${path.sep}clis`));
const integrationFiles = marketingFiles.filter(file => file.endsWith(".md") && path.dirname(file).endsWith(`${path.sep}integrations`));

assert(marketingPayloadFiles.length === 137, `Expected 137 marketing payload files, found ${marketingPayloadFiles.length}`);
assert(marketingOverlayFiles.length === 1, `Expected 1 LeeWay marketing hardening test, found ${marketingOverlayFiles.length}`);
assert(cliFiles.length === 61, `Expected 61 marketing CLI files, found ${cliFiles.length}`);
assert(integrationFiles.length === 72, `Expected 72 marketing integration guides, found ${integrationFiles.length}`);

const registry = await fs.readFile(path.join(marketingRoot, "REGISTRY.md"), "utf8");
const linkedPaths = [...registry.matchAll(/\((clis|integrations)\/[^)]+\)/g)].map(match => match[0].slice(1, -1));
const missingLinks = [];
for (const relative of new Set(linkedPaths)) {
  try { await fs.access(path.join(marketingRoot, relative)); }
  catch { missingLinks.push(relative); }
}
assert(missingLinks.length === 0, `Missing registry-linked tool files: ${missingLinks.join(", ")}`);

const expectedGameTools = [
  "game_plan_slice", "game_create_project", "game_write_gameplay_code", "game_edit_scene",
  "game_create_content_data", "game_generate_visual_source", "game_process_3d_asset",
  "game_configure_rendering", "game_run_build", "game_play", "game_inspect_state",
  "game_inspect_visuals", "game_run_tests", "game_profile_performance", "game_diagnose_bug",
  "game_patch_and_verify", "game_commit_and_release", "game_read_build_log", "game_create_scene",
  "game_add_entity", "game_modify_component", "game_connect_event", "game_inspect_scene",
  "game_play_script", "game_assert_runtime_condition", "game_capture_screenshot",
  "game_record_gameplay", "game_extract_video_frames", "game_compare_images", "game_evaluate_frame",
  "blender_import_model", "blender_validate_mesh", "blender_generate_collision",
  "blender_generate_lods", "blender_apply_material", "blender_export_asset",
].sort();
const gameSource = await fs.readFile(path.join(repoRoot, "mcp-server", "src", "game-development-tools.ts"), "utf8");
const observedGameTools = [...gameSource.matchAll(/name:\s*"((?:game|blender)_[a-z0-9_]+)"/g)].map(match => match[1]);
const uniqueGameTools = [...new Set(observedGameTools)].sort();
assert(JSON.stringify(uniqueGameTools) === JSON.stringify(expectedGameTools), "Game-development MCP contract inventory does not match the governed 36-tool set");

const skillFiles = (await filesUnder(path.join(repoRoot, "skills"))).filter(file => path.basename(file) === "SKILL.md");
const leafNames = skillFiles.map(file => path.basename(path.dirname(file)));
const duplicates = [...new Set(leafNames.filter((name, index) => leafNames.indexOf(name) !== index))].sort();
assert(skillFiles.length === 238, `Expected 238 SKILL.md files, found ${skillFiles.length}`);
assert(duplicates.length === 0, `Duplicate skill leaf names: ${duplicates.join(", ")}`);

console.log(JSON.stringify({
  state: "PASS",
  skill_files: skillFiles.length,
  duplicate_skill_leaf_names: duplicates.length,
  marketing_tool_payload_files: marketingPayloadFiles.length,
  leeway_marketing_hardening_tests: marketingOverlayFiles.length,
  marketing_cli_files: cliFiles.length,
  marketing_integration_guides: integrationFiles.length,
  registry_links_checked: new Set(linkedPaths).size,
  game_development_mcp_tools: uniqueGameTools.length,
}, null, 2));
