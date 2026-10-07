# LeeWay Blender MCP v0.1.0

Status: CANDIDATE — source committed; live Blender execution not yet proven.

## Purpose
This adapter exposes bounded Blender operations from the existing LeeWay Agent Skills MCP package while keeping Blender as an execution worker rather than an authority layer.

## Build
```powershell
Set-Location <LEEWAY_AGENT_SKILLS_ROOT>\mcp-server
npm ci
npm run build
```

## Required runtime configuration
```powershell
$env:LEEWAY_BLENDER_WORKER_URL = 'https://<authorized-worker>/execute'
$env:LEEWAY_BLENDER_WORKER_TOKEN = '<secret-from-secure-runtime>'
$env:LEEWAY_BLENDER_WORKER_TIMEOUT_MS = '120000'
npm run blender:start
```

Do not commit the worker token.

## Bounded tools
The MCP exposes scene inspection, object creation/transforms/deletion, material creation/assignment, camera/light configuration, preview rendering, project saving, and GLB/glTF export. Arbitrary bpy/Python execution is intentionally absent in v0.1.0.

## Acceptance gate
1. Build succeeds.
2. MCP lists the bounded Blender tools.
3. With a real authorized worker configured, create `LEEWAY_MCP_PROOF_CUBE`.
4. Inspect scene and prove the cube exists.
5. Render a preview.
6. Export a non-empty GLB.
7. Preserve worker evidence for Veritas/receipt processing.

Until steps 1-7 are executed and evidenced, classification remains UNVERIFIED for live Blender operation. Source presence is not runtime proof.
