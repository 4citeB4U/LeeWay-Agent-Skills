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
import { executeGameDevelopmentTool, gameDevelopmentToolDefinitions, isGameDevelopmentTool, } from "./game-development-tools.js";
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
    }));
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
        }));
        assert.equal(result.state, "BLOCKED_ADAPTER_UNCONFIGURED");
        assert.equal(result.executed, false);
    }
    finally {
        if (priorUrl === undefined)
            delete process.env.LEEWAY_GAME_MCP_GATEWAY_URL;
        else
            process.env.LEEWAY_GAME_MCP_GATEWAY_URL = priorUrl;
        if (priorToken === undefined)
            delete process.env.LEEWAY_GAME_MCP_BEARER_TOKEN;
        else
            process.env.LEEWAY_GAME_MCP_BEARER_TOKEN = priorToken;
    }
});
test("rejects missing required arguments", async () => {
    await assert.rejects(executeGameDevelopmentTool("blender_validate_mesh", { asset_path: "asset.glb" }), /Missing required arguments/);
});
test("enforces the published input schema before local execution", async () => {
    await assert.rejects(executeGameDevelopmentTool("game_plan_slice", {
        concept: 123,
        engine: "unity",
        target_platforms: "windows",
        acceptance_criteria: [42],
    }), /Invalid arguments: concept, engine, target_platforms, acceptance_criteria/);
    await assert.rejects(executeGameDevelopmentTool("game_plan_slice", {
        concept: "Valid concept",
        engine: "godot",
        target_platforms: ["windows"],
        acceptance_criteria: ["slice_runs"],
        undeclared: true,
    }), /Unexpected arguments: undeclared/);
});
test("blocks partial Blender credentials instead of mixing adapter pairs", async () => {
    const names = [
        "LEEWAY_BLENDER_MCP_URL",
        "LEEWAY_BLENDER_MCP_BEARER_TOKEN",
        "LEEWAY_GAME_MCP_GATEWAY_URL",
        "LEEWAY_GAME_MCP_BEARER_TOKEN",
    ];
    const prior = Object.fromEntries(names.map((name) => [name, process.env[name]]));
    process.env.LEEWAY_BLENDER_MCP_URL = "https://blender.invalid";
    delete process.env.LEEWAY_BLENDER_MCP_BEARER_TOKEN;
    process.env.LEEWAY_GAME_MCP_GATEWAY_URL = "https://game.invalid";
    process.env.LEEWAY_GAME_MCP_BEARER_TOKEN = "must-not-cross-adapters";
    try {
        const result = JSON.parse(await executeGameDevelopmentTool("blender_import_model", {
            source_path: "source.glb",
            destination_path: "working.blend",
            format: "glb",
        }));
        assert.equal(result.state, "BLOCKED_ADAPTER_UNCONFIGURED");
        assert.equal(result.executed, false);
        assert.deepEqual(result.required_environment, [
            "LEEWAY_BLENDER_MCP_URL",
            "LEEWAY_BLENDER_MCP_BEARER_TOKEN",
        ]);
    }
    finally {
        for (const name of names) {
            if (prior[name] === undefined)
                delete process.env[name];
            else
                process.env[name] = prior[name];
        }
    }
});
//# sourceMappingURL=game-development-tools.test.js.map