/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.TEST
TAG: LEEWAY.SKILLS.MCP.GAME_DEVELOPMENT.TEST

5WH:
WHAT = Contract tests for the reusable game-development MCP tools
WHY = Prevent missing tools, false execution claims, and unvalidated inputs
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/game-development-tools.test.ts
WHEN = 2026
HOW = Node test assertions over the compiled MCP contract and execution boundary

LICENSE:
MIT
*/

import assert from "node:assert/strict";
import test from "node:test";
import {
  executeGameDevelopmentTool,
  gameDevelopmentToolDefinitions,
  isGameDevelopmentTool,
} from "./game-development-tools.js";

test("publishes the complete bounded game-development tool surface", () => {
  const expected = [
    "game_plan_slice",
    "game_create_project",
    "game_write_gameplay_code",
    "game_edit_scene",
    "game_create_content_data",
    "game_generate_visual_source",
    "game_process_3d_asset",
    "game_configure_rendering",
    "game_run_build",
    "game_play",
    "game_inspect_state",
    "game_inspect_visuals",
    "game_run_tests",
    "game_profile_performance",
    "game_diagnose_bug",
    "game_patch_and_verify",
    "game_commit_and_release",
    "game_read_build_log",
    "game_create_scene",
    "game_add_entity",
    "game_modify_component",
    "game_connect_event",
    "game_inspect_scene",
    "game_play_script",
    "game_assert_runtime_condition",
    "game_capture_screenshot",
    "game_record_gameplay",
    "game_extract_video_frames",
    "game_compare_images",
    "game_evaluate_frame",
    "blender_import_model",
    "blender_validate_mesh",
    "blender_generate_collision",
    "blender_generate_lods",
    "blender_apply_material",
    "blender_export_asset",
  ].sort();
  const names = gameDevelopmentToolDefinitions.map((tool) => tool.name);
  assert.equal(names.length, 36);
  assert.equal(new Set(names).size, names.length);
  assert.deepEqual([...names].sort(), expected);
  assert.equal(isGameDevelopmentTool("game_plan_slice"), true);
  assert.equal(isGameDevelopmentTool("blender_validate_mesh"), true);
});

test("normalizes a vertical slice without claiming a build", async () => {
  const result = JSON.parse(await executeGameDevelopmentTool("game_plan_slice", {
    concept: "A small third-person traversal prototype",
    engine: "godot",
    target_platforms: ["windows"],
    acceptance_criteria: ["player_can_complete_primary_loop"],
  })) as Record<string, unknown>;
  assert.equal(result.state, "EXECUTED_LOCAL");
  assert.equal(result.executed, true);
  assert.match(String(result.claim_boundary), /does not create, build, play, or verify/i);
});

test("execution tools block honestly when no gateway is configured", async () => {
  const priorUrl = process.env.LEEWAY_GAME_MCP_GATEWAY_URL;
  const priorToken = process.env.LEEWAY_GAME_MCP_BEARER_TOKEN;
  delete process.env.LEEWAY_GAME_MCP_GATEWAY_URL;
  delete process.env.LEEWAY_GAME_MCP_BEARER_TOKEN;
  try {
    const result = JSON.parse(await executeGameDevelopmentTool("game_run_build", {
      project_root: "/approved/project",
      target: "windows",
      configuration: "release",
    })) as Record<string, unknown>;
    assert.equal(result.state, "BLOCKED_ADAPTER_UNCONFIGURED");
    assert.equal(result.executed, false);
  } finally {
    if (priorUrl === undefined) delete process.env.LEEWAY_GAME_MCP_GATEWAY_URL;
    else process.env.LEEWAY_GAME_MCP_GATEWAY_URL = priorUrl;
    if (priorToken === undefined) delete process.env.LEEWAY_GAME_MCP_BEARER_TOKEN;
    else process.env.LEEWAY_GAME_MCP_BEARER_TOKEN = priorToken;
  }
});

test("rejects missing required arguments", async () => {
  await assert.rejects(
    executeGameDevelopmentTool("blender_validate_mesh", { asset_path: "asset.glb" }),
    /Missing required arguments/,
  );
});
