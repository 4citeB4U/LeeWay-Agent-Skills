# Game Development MCP Tool Contracts

The canonical stdio MCP exposes these bounded tool families from `mcp-server/src/game-development-tools.ts`.

## Production orchestration

`game_plan_slice`, `game_create_project`, `game_write_gameplay_code`, `game_edit_scene`, `game_create_content_data`, `game_generate_visual_source`, `game_process_3d_asset`, `game_configure_rendering`, `game_run_build`, `game_play`, `game_inspect_state`, `game_inspect_visuals`, `game_run_tests`, `game_profile_performance`, `game_diagnose_bug`, `game_patch_and_verify`, `game_commit_and_release`

## Engine and playtest primitives

`game_read_build_log`, `game_create_scene`, `game_add_entity`, `game_modify_component`, `game_connect_event`, `game_inspect_scene`, `game_play_script`, `game_assert_runtime_condition`, `game_capture_screenshot`, `game_record_gameplay`, `game_extract_video_frames`, `game_compare_images`, `game_evaluate_frame`

## Blender asset primitives

`blender_import_model`, `blender_validate_mesh`, `blender_generate_collision`, `blender_generate_lods`, `blender_apply_material`, `blender_export_asset`

## Adapter contract

`game_plan_slice` executes locally and only normalizes the supplied concept, targets, budgets, and acceptance criteria.

All other tools dispatch to an authorized gateway:

- game/engine/QA tools: `LEEWAY_GAME_MCP_GATEWAY_URL` plus `LEEWAY_GAME_MCP_BEARER_TOKEN`;
- Blender tools: `LEEWAY_BLENDER_MCP_URL` plus `LEEWAY_BLENDER_MCP_BEARER_TOKEN`, with the general game gateway allowed as a fallback;
- optional timeout: `LEEWAY_GAME_MCP_TIMEOUT_MS`, clamped to 1–120 seconds.

The configured gateway receives `POST /tools/<tool-name>` with a JSON body containing `tool` and `arguments`. A successful HTTP response is not automatically an execution claim. The upstream payload must explicitly return `executed: true`; Veritas remains separate.

When no authorized adapter exists, the tool returns `BLOCKED_ADAPTER_UNCONFIGURED` and `executed: false`.
