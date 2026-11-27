---

name: leeway-3d-engineering-blueprint

description: Engineering-grade 3D geometry and blueprint capability hub for coordinate systems, units, dimensions, constraints, tolerances, parametric solids, assemblies, mesh/topology requirements, manufacturing/visualization intent, validation, and provider-neutral execution through Blender/CAD/geometry tools.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards

  mode: engineering-geometry-blueprint

  stage: domain-capability-hub

  blender-provider: skills/leeway-blender-mcp/SKILL.md

---

# LeeWay 3D Engineering & Blueprint

## Purpose

Translate Creator intent into measurable 2D/3D engineering geometry before selecting Blender, CAD, WebGPU, image generation, or another provider.

## Model contract

Every consequential model should define as applicable: units, origin, coordinate frame/handedness, reference planes, bounding dimensions, constraints, tolerances, materials, part/assembly identity, interfaces, clearances, symmetry, parametric variables, topology/mesh requirements, physical assumptions, target output and acceptance measurements.

## Geometry

Support analytic/parametric primitives, transforms, vectors/matrices, curves/surfaces, Bézier/NURBS concepts where required, constructive solid geometry, assemblies and spatial relationships. Use exact constraints for engineering intent; use artistic approximation only when the deliverable permits it.

## Blueprint views

Generate/validate orthographic front/top/side, section/detail/exploded/isometric views as required. Dimensions must bind to the model/reference geometry and declared units rather than decorative annotations.

## Provider neutrality

Blender is one execution provider. CAD kernels, OpenSCAD-like deterministic geometry, WebGPU/Three.js, SVG/vector tools, or future LeeWay geometry engines may satisfy different deliverables. Capability Resilience selects an authorized provider.

## Blender composition

For Blender execution: 3D Blueprint owns engineering intent/constraints → leeway-blender-mcp owns governed Blender tool sequencing/worker evidence → render/scene inspection verifies visual geometry → Veritas checks dimensions/acceptance evidence.

## Mathematical composition

Use centered metrics/Mathematical Sun only for measured deviations. Geometry acceptance may include dimensional error, angular error, continuity, intersection/clearance, topology validity, polygon/resource budget, render/frame budget and physical/material constraints.

## Parallel lanes

A substantial 3D program may run independent lanes: requirements/dimensions; geometry/parametrics; materials/rendering; hardware/performance; blueprint/documentation; simulation/validation; security/provenance. Serialize mutations to the same canonical scene/model unless merge strategy is explicit.

## Truth

rendered != dimensionally correct; dimensionally correct != manufacturable; manufacturable != physically validated; Blender tool success != blueprint verification.

## Reconstruction composition

Use `leeway-triposr` when a reference image should rapidly seed geometry. Use deterministic/parametric geometry when dimensions and constraints dominate and image inference adds little value. For hybrid work: TripoSR seeds form → Blueprint establishes coordinate/scale/constraints → Blender refines/visualizes → Veritas measures the result. Never derive hidden dimensions from a single image without explicit reference scale/evidence.

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
