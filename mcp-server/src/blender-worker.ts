/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.MCP
TAG: LEEWAY.SKILLS.MCP.BLENDER_WORKER
5WH:
WHAT = Bounded Blender worker client for LeeWay Skills MCP.
WHY = Separates skill discovery from real Blender execution and prevents arbitrary bpy execution.
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/blender-worker.ts
WHEN = 2026
HOW = Validated JSON request -> configured HTTP worker -> structured result.
AGENTS:
EXECUTE
VERIFY
LICENSE:
MIT
*/

export const BLENDER_OPERATIONS = [
  "scene.inspect", "object.create", "object.transform", "object.delete",
  "material.create", "material.assign", "camera.configure", "light.configure",
  "render.preview", "project.save", "export.glb", "export.gltf",
] as const;

export type BlenderOperation = (typeof BLENDER_OPERATIONS)[number];

export interface BlenderWorkerRequest {
  protocol_version: "LEEWAY-BLENDER-WORKER-v1";
  task_id: string;
  operation: BlenderOperation;
  parameters: Record<string, unknown>;
  project?: string;
  expected_artifacts?: string[];
  acceptance_tests?: string[];
}

export interface BlenderWorkerResult {
  protocol_version: "LEEWAY-BLENDER-WORKER-v1";
  task_id: string;
  operation: string;
  status: "SUCCEEDED" | "FAILED" | "BLOCKED";
  blender_version?: string;
  evidence: string[];
  artifacts?: string[];
  warnings?: string[];
  error?: string | null;
}

export function isBlenderOperation(value: unknown): value is BlenderOperation {
  return typeof value === "string" && (BLENDER_OPERATIONS as readonly string[]).includes(value);
}

export async function callBlenderWorker(request: BlenderWorkerRequest): Promise<BlenderWorkerResult> {
  const endpoint = (process.env.LEEWAY_BLENDER_WORKER_URL || "").trim();
  const token = (process.env.LEEWAY_BLENDER_WORKER_TOKEN || "").trim();
  if (!endpoint) throw new Error("BLOCKED: LEEWAY_BLENDER_WORKER_URL is not configured");
  if (!isBlenderOperation(request.operation)) throw new Error(`BLOCKED: Blender operation not authorized: ${String(request.operation)}`);

  const controller = new AbortController();
  const timeoutMs = Number(process.env.LEEWAY_BLENDER_WORKER_TIMEOUT_MS || "120000");
  const timer = setTimeout(() => controller.abort(), Number.isFinite(timeoutMs) ? timeoutMs : 120000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    const text = await response.text();
    if (!response.ok) throw new Error(`Blender worker HTTP ${response.status}: ${text.slice(0, 1000)}`);
    const result = JSON.parse(text) as BlenderWorkerResult;
    if (result.protocol_version !== "LEEWAY-BLENDER-WORKER-v1") throw new Error("Invalid Blender worker protocol version");
    if (result.task_id !== request.task_id) throw new Error("Blender worker task_id mismatch");
    if (!Array.isArray(result.evidence)) throw new Error("Blender worker result missing evidence array");
    return result;
  } finally {
    clearTimeout(timer);
  }
}
