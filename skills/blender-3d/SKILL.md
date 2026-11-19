---
name: blender-3d
version: 0.1.0
description: Governed LeeWay skill for bounded Blender 3D scene construction, inspection, rendering, saving, and web export through an authorized Blender worker.
tags: [blender, 3d, mcp, glb, gltf, rendering, leeway]
---

# LeeWay Blender 3D Skill

LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.CREATIVE_3D
TAG: LEEWAY.SKILLS.BLENDER_3D

5WH:
WHAT = Governed procedure for using Blender as an external LeeWay 3D execution worker.
WHY = Gives Agent Lee a bounded path to construct, inspect, render, validate, and export real 3D artifacts without making Blender an authority layer.
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = skills/blender-3d/
WHEN = 2026
HOW = Agent/skill intent -> LeeWay authorization -> Blender worker contract -> artifact evidence -> Veritas/receipt.

AGENTS:
DISCOVER
PLAN
EXECUTE_WHEN_AUTHORIZED
INSPECT
VERIFY

LICENSE:
MIT

## Authority
Creator/Human Authority > LeeWay Standards > Root of Trust > Runtime Fabric > Agent Lee/Harness > Formula when mapped and authorized > models/skills/MCPs/tools > execution > Veritas > receipt > Learning Ledger.

This skill is procedural knowledge, not proof that Blender executed. Never report CREATED, RENDERED, EXPORTED, PASS, or VERIFIED without runtime evidence.

## Required capability boundary
Use only capabilities explicitly exposed by the Blender worker contract. Version 0.1.0 permits:
- scene.inspect
- object.create
- object.transform
- object.delete
- material.create
- material.assign
- camera.configure
- light.configure
- render.preview
- project.save
- export.glb
- export.gltf

Arbitrary Python/bpy execution is NOT authorized by this skill version.

## Workflow
1. Recover project and target scene state.
2. Classify requested operation against the allowed capability list.
3. Reject or BLOCK operations outside the contract rather than inventing execution.
4. Produce the smallest Blender worker request satisfying the task.
5. Require worker evidence containing operation, status, Blender version, scene path or artifact path when applicable, and errors/warnings.
6. Inspect the resulting scene/artifact when an inspection capability is available.
7. Run the requested acceptance test.
8. Only after evidence supports success may Veritas/receipt layers classify the execution as proven.

## First governed acceptance test
The first live proof for this skill is deliberately small:
- create one cube named LEEWAY_MCP_PROOF_CUBE at origin;
- inspect scene and prove the object exists;
- configure one camera and one light if absent;
- render one preview;
- export a GLB;
- verify the exported artifact exists and is non-empty;
- preserve runtime evidence for Veritas/receipt processing.

Do not begin a production 3D environment until this path passes.

## Blender worker request contract
See `contracts/blender-worker-v1.schema.json`. The transport may be local, container, VM, VPS, or another authorized host. GitHub stores/version-controls code and artifacts; GitHub itself is not the Blender compute runtime.

## Output discipline
Return claim state using VERIFIED, OBSERVED, INFERRED, PROPOSED, UNVERIFIED, FAILED, or BLOCKED. If no Blender worker executed, say so explicitly and do not create an execution receipt.