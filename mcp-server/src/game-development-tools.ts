/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP
TAG: LEEWAY.SKILLS.MCP.GAME_DEVELOPMENT

5WH:
WHAT = Bounded MCP contracts for reusable video-game engineering
WHY = Give agents an inspectable build/play/inspect/fix surface without project-specific game logic
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/game-development-tools.ts
WHEN = 2026
HOW = One deterministic planning tool plus authorized gateway adapters for engine, QA, and Blender execution

LICENSE:
MIT
*/

import { Tool } from "@modelcontextprotocol/sdk/types.js";

type JsonObject = Record<string, unknown>;
type ToolFamily = "game" | "blender";

interface GameToolSpec {
  name: string;
  description: string;
  family: ToolFamily;
  required: string[];
  properties: Record<string, JsonObject>;
}

const stringField = (description: string): JsonObject => ({ type: "string", description });
const objectField = (description: string): JsonObject => ({
  type: "object",
  description,
  additionalProperties: true,
});
const arrayField = (description: string, itemType = "string"): JsonObject => ({
  type: "array",
  description,
  items: { type: itemType },
});
const numberField = (description: string): JsonObject => ({ type: "number", description });
const booleanField = (description: string): JsonObject => ({ type: "boolean", description });

const projectRoot = stringField("Authorized project root resolved by the execution gateway.");
const sessionId = stringField("Existing governed run or playtest session identifier.");

const specs: GameToolSpec[] = [
  {
    name: "game_plan_slice",
    description: "Normalize a game idea into a small vertical-slice contract with explicit acceptance criteria. This tool runs locally and does not build the game.",
    family: "game",
    required: ["concept", "engine", "target_platforms", "acceptance_criteria"],
    properties: {
      concept: stringField("Concise game concept and primary player loop."),
      engine: { type: "string", enum: ["godot", "unreal"], description: "Selected game engine." },
      target_platforms: arrayField("Target platforms."),
      acceptance_criteria: arrayField("Observable vertical-slice acceptance criteria."),
      quality_budgets: objectField("Optional performance and asset budgets."),
    },
  },
  { name: "game_create_project", description: "Create a version-pinned game-engine project and baseline build.", family: "game", required: ["engine", "template", "project_name", "target_platforms"], properties: { engine: stringField("Engine name and version family."), template: stringField("Approved project template."), project_name: stringField("Project name."), target_platforms: arrayField("Target platforms.") } },
  { name: "game_write_gameplay_code", description: "Apply a bounded gameplay-code change and return code diff plus test evidence.", family: "game", required: ["project_root", "task", "acceptance_tests"], properties: { project_root: projectRoot, task: stringField("Gameplay behavior to implement."), acceptance_tests: arrayField("Tests that prove the behavior."), language: stringField("Engine scripting language.") } },
  { name: "game_edit_scene", description: "Create or modify a scene, map, prefab, entity, camera, light, or collider with engine validation.", family: "game", required: ["project_root", "scene", "changes"], properties: { project_root: projectRoot, scene: stringField("Scene identifier or path."), changes: arrayField("Structured scene changes.", "object"), checks: arrayField("Required engine validation checks.") } },
  { name: "game_create_content_data", description: "Create validated items, enemies, abilities, quests, dialogue, or tuning data.", family: "game", required: ["project_root", "content_type", "records", "schema"], properties: { project_root: projectRoot, content_type: stringField("Content collection type."), records: arrayField("Structured content records.", "object"), schema: objectField("Validation schema.") } },
  { name: "game_generate_visual_source", description: "Request concept, UI, texture, decal, or style-reference source art with provenance fields.", family: "game", required: ["project_root", "asset_type", "brief"], properties: { project_root: projectRoot, asset_type: stringField("Visual source type."), brief: objectField("Structured visual brief."), provider: stringField("Authorized image-generation provider or workflow."), approval_id: stringField("Approval reference when paid or external generation is used.") } },
  { name: "game_process_3d_asset", description: "Process a 3D asset through import, cleanup, optimization, rig, LOD, collision, and validation stages.", family: "blender", required: ["project_root", "source_path", "asset_manifest"], properties: { project_root: projectRoot, source_path: stringField("Allowlisted source asset path."), asset_manifest: objectField("Technical targets, provenance, and engine destination."), operations: arrayField("Requested bounded processing operations.") } },
  { name: "game_configure_rendering", description: "Configure materials, lighting, post-processing, and quality tiers, then capture comparison evidence.", family: "game", required: ["project_root", "scene", "render_spec"], properties: { project_root: projectRoot, scene: stringField("Scene identifier."), render_spec: objectField("Rendering and quality-tier configuration."), baseline_path: stringField("Optional approved comparison image.") } },
  { name: "game_run_build", description: "Build or export a target package and return the artifact reference and machine-readable build log.", family: "game", required: ["project_root", "target", "configuration"], properties: { project_root: projectRoot, target: stringField("Build/export target."), configuration: stringField("Build configuration."), clean: booleanField("Request a clean build.") } },
  { name: "game_play", description: "Launch a governed game build with a deterministic seed and return a run session.", family: "game", required: ["build_path", "seed", "launch_args"], properties: { build_path: stringField("Allowlisted build artifact path."), headless: booleanField("Whether to run without a display."), seed: numberField("Deterministic random seed."), launch_args: arrayField("Approved launch arguments.") } },
  { name: "game_inspect_state", description: "Read authoritative engine/runtime state rather than inferring behavior from pixels.", family: "game", required: ["session_id", "query"], properties: { session_id: sessionId, query: objectField("Structured state query.") } },
  { name: "game_inspect_visuals", description: "Evaluate screenshots or video using pixel/perceptual comparison and semantic visual QA.", family: "game", required: ["artifact_paths", "rubric"], properties: { artifact_paths: arrayField("Screenshot or video artifact references."), rubric: objectField("Visual QA rubric."), baseline_paths: arrayField("Optional approved baselines.") } },
  { name: "game_run_tests", description: "Run gameplay, scene, UI, save, regression, or performance test suites.", family: "game", required: ["project_root", "suite"], properties: { project_root: projectRoot, suite: stringField("Test suite name."), filter: stringField("Optional test filter."), seed: numberField("Optional deterministic seed.") } },
  { name: "game_profile_performance", description: "Capture FPS, frame time, CPU/GPU, VRAM, draw-call, and loading evidence against budgets.", family: "game", required: ["session_id", "budgets"], properties: { session_id: sessionId, budgets: objectField("Performance budgets."), duration_seconds: numberField("Capture duration.") } },
  { name: "game_diagnose_bug", description: "Create a ranked root-cause diagnosis from supplied logs, state, tests, screenshots, and reproduction evidence.", family: "game", required: ["project_root", "bug_record", "evidence"], properties: { project_root: projectRoot, bug_record: objectField("Bug description and reproduction steps."), evidence: objectField("Inspectible failure evidence.") } },
  { name: "game_patch_and_verify", description: "Apply the smallest repair and rerun the failing test plus bounded regression tests.", family: "game", required: ["project_root", "diagnosis", "verification_tests"], properties: { project_root: projectRoot, diagnosis: objectField("Evidence-backed diagnosis."), verification_tests: arrayField("Failing and regression tests."), rollback_ref: stringField("Known rollback reference.") } },
  { name: "game_commit_and_release", description: "Create a reviewable commit or approved release with changelog, test bundle, and provenance metadata.", family: "game", required: ["project_root", "release_spec", "approval_id"], properties: { project_root: projectRoot, release_spec: objectField("Commit/tag/release metadata and artifact set."), approval_id: stringField("Explicit human approval reference for publishing."), publish: booleanField("Whether to publish rather than prepare only.") } },
  { name: "game_read_build_log", description: "Read and normalize a machine-readable build log.", family: "game", required: ["build_id"], properties: { build_id: stringField("Build identifier.") } },
  { name: "game_create_scene", description: "Create a named scene from an approved template.", family: "game", required: ["project_root", "scene_name", "template"], properties: { project_root: projectRoot, scene_name: stringField("Scene name."), template: stringField("Approved scene template.") } },
  { name: "game_add_entity", description: "Add an entity with transform and component data to a scene.", family: "game", required: ["project_root", "scene", "entity_type", "name", "transform", "components"], properties: { project_root: projectRoot, scene: stringField("Scene identifier."), entity_type: stringField("Engine entity/node type."), name: stringField("Stable entity name."), transform: objectField("Position, rotation, and scale."), components: objectField("Component configuration.") } },
  { name: "game_modify_component", description: "Patch one component on an existing entity.", family: "game", required: ["project_root", "entity_id", "component", "patch"], properties: { project_root: projectRoot, entity_id: stringField("Entity identifier."), component: stringField("Component name."), patch: objectField("Bounded component patch.") } },
  { name: "game_connect_event", description: "Connect a source event to an approved target handler.", family: "game", required: ["project_root", "source_entity", "event", "target_entity", "handler"], properties: { project_root: projectRoot, source_entity: stringField("Source entity."), event: stringField("Event or signal."), target_entity: stringField("Target entity."), handler: stringField("Existing approved handler.") } },
  { name: "game_inspect_scene", description: "Validate a scene for missing references, cameras, lights, collisions, navigation, bounds, and budgets.", family: "game", required: ["project_root", "scene", "checks"], properties: { project_root: projectRoot, scene: stringField("Scene identifier."), checks: arrayField("Validation checks.") } },
  { name: "game_play_script", description: "Send deterministic input steps to a governed run session and preserve input/state traces.", family: "game", required: ["session_id", "steps"], properties: { session_id: sessionId, steps: arrayField("Timed input and assertion steps.", "object") } },
  { name: "game_assert_runtime_condition", description: "Evaluate one structured condition against authoritative runtime state.", family: "game", required: ["session_id", "assertion"], properties: { session_id: sessionId, assertion: objectField("Path/operator/expected-value assertion.") } },
  { name: "game_capture_screenshot", description: "Capture a labeled screenshot from a governed run session.", family: "game", required: ["session_id", "label", "resolution"], properties: { session_id: sessionId, label: stringField("Artifact label."), resolution: arrayField("Width and height.", "number") } },
  { name: "game_record_gameplay", description: "Record a bounded gameplay clip from a governed run session.", family: "game", required: ["session_id", "duration_seconds", "label"], properties: { session_id: sessionId, duration_seconds: numberField("Recording duration."), label: stringField("Artifact label.") } },
  { name: "game_extract_video_frames", description: "Extract frame artifacts from an allowlisted gameplay video.", family: "game", required: ["video_path", "fps"], properties: { video_path: stringField("Video artifact path."), fps: numberField("Extraction frames per second.") } },
  { name: "game_compare_images", description: "Compare an approved baseline and candidate using a named visual metric.", family: "game", required: ["baseline_path", "candidate_path", "metric"], properties: { baseline_path: stringField("Baseline image."), candidate_path: stringField("Candidate image."), metric: { type: "string", enum: ["pixel", "ssim", "perceptual"], description: "Comparison metric." } } },
  { name: "game_evaluate_frame", description: "Evaluate a frame with an authorized vision model and explicit rubric.", family: "game", required: ["image_path", "rubric"], properties: { image_path: stringField("Image artifact path."), rubric: objectField("Semantic art/UI rubric."), model: stringField("Authorized vision model identifier.") } },
  { name: "blender_import_model", description: "Import an allowlisted model into an approved Blender working file.", family: "blender", required: ["source_path", "destination_path", "format"], properties: { source_path: stringField("Source model path."), destination_path: stringField("Approved destination path."), format: stringField("Model format.") } },
  { name: "blender_validate_mesh", description: "Validate scale, transforms, normals, UVs, triangle budget, LOD, collision, rig names, and export readiness.", family: "blender", required: ["asset_path", "max_triangles", "required_uv_channels", "require_normals", "require_lods"], properties: { asset_path: stringField("Asset path."), max_triangles: numberField("Maximum triangle count."), required_uv_channels: numberField("Required UV channel count."), require_normals: booleanField("Require valid normals."), require_lods: booleanField("Require LODs.") } },
  { name: "blender_generate_collision", description: "Generate a bounded collision representation for a Blender asset.", family: "blender", required: ["asset_path", "collision_type"], properties: { asset_path: stringField("Asset path."), collision_type: stringField("Collision strategy.") } },
  { name: "blender_generate_lods", description: "Generate requested LOD ratios for a Blender asset.", family: "blender", required: ["asset_path", "ratios"], properties: { asset_path: stringField("Asset path."), ratios: arrayField("LOD triangle ratios.", "number") } },
  { name: "blender_apply_material", description: "Apply a structured material specification to a Blender asset.", family: "blender", required: ["asset_path", "material_spec"], properties: { asset_path: stringField("Asset path."), material_spec: objectField("Material and texture bindings.") } },
  { name: "blender_export_asset", description: "Export a Blender working file to an approved game-engine asset format.", family: "blender", required: ["blend_path", "output_path", "format"], properties: { blend_path: stringField("Source .blend path."), output_path: stringField("Approved export path."), format: { type: "string", enum: ["glb", "gltf", "fbx"], description: "Export format." } } },
];

const specsByName = new Map(specs.map((spec) => [spec.name, spec]));

export const gameDevelopmentToolDefinitions: Tool[] = specs.map((spec) => ({
  name: spec.name,
  description: `${spec.description} Execution is delegated only through a configured LeeWay gateway unless the tool explicitly states that it runs locally.`,
  inputSchema: {
    type: "object",
    properties: spec.properties,
    required: spec.required,
    additionalProperties: false,
  },
}));

export function isGameDevelopmentTool(name: string): boolean {
  return specsByName.has(name);
}

function requireArguments(spec: GameToolSpec, args: JsonObject): void {
  const missing = spec.required.filter((key) => args[key] === undefined || args[key] === null || args[key] === "");
  if (missing.length > 0) throw new Error(`Missing required arguments: ${missing.join(", ")}`);
}

function planSlice(args: JsonObject): string {
  const acceptance = Array.isArray(args.acceptance_criteria) ? args.acceptance_criteria : [];
  const targets = Array.isArray(args.target_platforms) ? args.target_platforms : [];
  return JSON.stringify({
    tool: "game_plan_slice",
    state: "EXECUTED_LOCAL",
    executed: true,
    artifacts: {
      game_spec: {
        concept: args.concept,
        engine: args.engine,
        target_platforms: targets,
        quality_budgets: args.quality_budgets ?? {},
        acceptance_criteria: acceptance,
      },
      backlog: acceptance.map((criterion, index) => ({
        id: `slice-${String(index + 1).padStart(3, "0")}`,
        acceptance_criterion: criterion,
        state: "PLANNED_NOT_EXECUTED",
      })),
    },
    claim_boundary: "This normalizes a vertical-slice contract. It does not create, build, play, or verify a game.",
  }, null, 2);
}

function gatewayFor(family: ToolFamily): { url?: string; token?: string; requiredEnv: string[] } {
  if (family === "blender") {
    const url = process.env.LEEWAY_BLENDER_MCP_URL || process.env.LEEWAY_GAME_MCP_GATEWAY_URL;
    const token = process.env.LEEWAY_BLENDER_MCP_BEARER_TOKEN || process.env.LEEWAY_GAME_MCP_BEARER_TOKEN;
    return {
      url,
      token,
      requiredEnv: ["LEEWAY_BLENDER_MCP_URL or LEEWAY_GAME_MCP_GATEWAY_URL", "LEEWAY_BLENDER_MCP_BEARER_TOKEN or LEEWAY_GAME_MCP_BEARER_TOKEN"],
    };
  }
  return {
    url: process.env.LEEWAY_GAME_MCP_GATEWAY_URL,
    token: process.env.LEEWAY_GAME_MCP_BEARER_TOKEN,
    requiredEnv: ["LEEWAY_GAME_MCP_GATEWAY_URL", "LEEWAY_GAME_MCP_BEARER_TOKEN"],
  };
}

export async function executeGameDevelopmentTool(name: string, args: JsonObject = {}): Promise<string> {
  const spec = specsByName.get(name);
  if (!spec) throw new Error(`Unknown game-development tool: ${name}`);
  requireArguments(spec, args);

  if (name === "game_plan_slice") return planSlice(args);

  const gateway = gatewayFor(spec.family);
  if (!gateway.url || !gateway.token) {
    return JSON.stringify({
      tool: name,
      state: "BLOCKED_ADAPTER_UNCONFIGURED",
      executed: false,
      required_environment: gateway.requiredEnv,
      normalized_arguments: args,
      claim_boundary: "The MCP contract is installed, but no authorized execution gateway was configured. No engine, Blender, build, playtest, visual, Git, or release action occurred.",
    }, null, 2);
  }

  const base = gateway.url.endsWith("/") ? gateway.url : `${gateway.url}/`;
  const endpoint = new URL(`tools/${encodeURIComponent(name)}`, base);
  const timeoutValue = Number.parseInt(process.env.LEEWAY_GAME_MCP_TIMEOUT_MS || "30000", 10);
  const timeoutMs = Number.isFinite(timeoutValue) ? Math.min(Math.max(timeoutValue, 1000), 120000) : 30000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${gateway.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ tool: name, arguments: args }),
      signal: controller.signal,
    });
    const raw = await response.text();
    let payload: unknown = raw;
    try { payload = JSON.parse(raw); } catch { /* preserve non-JSON upstream evidence as text */ }
    const upstreamExecuted = Boolean(payload && typeof payload === "object" && (payload as JsonObject).executed === true);

    return JSON.stringify({
      tool: name,
      state: response.ok ? (upstreamExecuted ? "EXECUTED_UNVERIFIED" : "ADAPTER_RESPONDED") : "ADAPTER_FAILED",
      executed: response.ok && upstreamExecuted,
      upstream_http_status: response.status,
      upstream: payload,
      claim_boundary: "Gateway response is execution evidence only when the upstream payload explicitly reports executed=true. Veritas acceptance requires separate evidence.",
    }, null, 2);
  } finally {
    clearTimeout(timeout);
  }
}
