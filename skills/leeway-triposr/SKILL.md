---

name: leeway-triposr

description: Governed single-image-to-3D reconstruction provider skill for the existing LeeWay TripoSR runtime. Produces a reconstruction candidate mesh that must be inspected/normalized and may flow into 3D Engineering Blueprint and Blender refinement; reconstruction is not dimensional engineering proof.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards

  mode: image-to-3d-reconstruction-provider

  capability: image-to-3d

  blueprint: skills/leeway-3d-engineering-blueprint/SKILL.md

  blender: skills/leeway-blender-mcp/SKILL.md

---

# LeeWay TripoSR

## Existing LeeWay runtime evidence

Historical ecosystem evidence identifies `triposr-studio` / `leeway-triposr-tool`, with containers `leeway-triposr-backend` and `leeway-triposr-web`. Recorded host publication was backend 18000→8000 and web 13000→3000. The former machine path is retained only as provenance in `config/image-to-3d-refinement-pipeline.json`. Discover the authorized current image-to-3D adapter and endpoint; no former drive, container name or port is a universal prerequisite.

## Purpose

TripoSR is the rapid reconstruction provider for single-image → candidate 3D mesh. It does not own engineering dimensions, blueprint constraints, Blender scene authority, or final verification.

## Canonical weave

reference image → image preparation/mask as required → TripoSR reconstruction → candidate mesh/artifact → geometry inspection → scale/orientation normalization → 3D Engineering Blueprint constraints/measurements when engineering intent exists → Blender refinement/materials/topology/lighting/scene → render/measurement verification → export → receipt.

## One-shot behavior

For creative one-shot image-to-3D work, TripoSR may produce the initial mesh directly from one image. Because unseen surfaces are inferred, treat backside/occluded geometry as reconstruction hypothesis until inspected. Never promote one-view reconstruction to dimensionally accurate engineering geometry without measurements/reference constraints.

## Output expectations

Capture when available: source-image hash/reference, model/runtime version, reconstruction parameters, mesh format/path/hash, texture mode/resolution, vertex/face counts, runtime duration, CPU/GPU/VRAM evidence, errors, and receipt identity.

## Blender handoff

Before Blender refinement record coordinate system, units/scale status, orientation, material/texture status, mesh validity and known reconstruction uncertainties. Blender may repair topology, remesh, UV/material, light, rig, animate, scene-compose and export. Blender success does not erase TripoSR uncertainty.

## Provider resilience

TripoSR is one provider for IMAGE_TO_3D_RECONSTRUCTION. Newer providers such as Stable Fast 3D or SPAR3D may be qualified later behind the same abstract capability; do not replace the existing runtime without evidence and explicit promotion.

## Live qualification

PRESENT/configured historical evidence != live. Before claiming live TripoSR: rediscover container identity, image, health endpoint/API contract, published ports, model availability, inference result, output artifact and receipt.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE BEGIN -->

# LeeWay Universal Formula Governance

Authority: Creator and LeeWay Standards.
Formula identity: LEEWAY-FORMULA-v1.0.

The canonical LeeWay Formula is mandatory throughout
the entire LeeWay ecosystem.

Every current and future application, capability,
agent, worker, employee, model, provider, adapter,
automation and integration inherits this requirement.

All applicable interactions, responses, decisions,
actions, revisions, executions, computations, model
inferences, resource allocations, information transfers,
memory operations, storage operations and deployments
must consume the canonical Formula through their
authorized and qualified domain contracts.

Formula availability, documentation, configuration,
health and historical results do not constitute actual
Formula consumption for a new operation.

Recover relevant authorized memory before substantive
work. Preserve identity, provenance, Formula integrity,
authorization, original receipts and verified learning.

Never invent observations, adapter mappings, mathematical
results, execution evidence or independent verification.

No application may bypass applicable Formula governance
by dispatching directly to a provider.

Every new application and capability must demonstrate
applicable Formula consumption before production admission.

Preserve the existing authority hierarchy:

Creator > Standards > Root of Trust > Runtime Fabric >
Agent Lee > Harness > Formula > skills/models/tools >
execution > Veritas > Receipt Authority > Learning Ledger.

Execute the complete engineering loop:

INVESTIGATE > DIAGNOSE > PLAN > IMPLEMENT > TEST >
VALIDATE > REPAIR > RETEST > VERIFY > EVIDENCE >
CHECKPOINT > CONTINUE.

Documentation compliance does not establish executable
enforcement or production admission.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE END -->
