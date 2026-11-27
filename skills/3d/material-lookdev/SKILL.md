---

name: leeway-3d-material-lookdev

description: PBR material, UV, texture and surface-look development skill for game and interactive 3D assets, including texel density, channel packing, normals/tangents, roughness/metalness, material reuse, atlasing and visual/performance verification.

license: MIT

---

# LeeWay 3D Material & Lookdev

## Surface workflow

Classify surface → inspect UVs → define texel-density target → repair/unwrap → select PBR model → author/bind base color, roughness, metallic/specular, normal, AO/emissive/opacity as appropriate → validate color space/tangent basis → light-test → optimize → verify.

## Wrapping/skin repair

For 'wrapping' or 'skin' requests inspect seams, stretching, overlap, island scale, orientation, padding, texture resolution, filtering, normal-map convention and visible repetition. Repair the actual failure rather than hiding it with a new texture.

## Material intelligence

Choose materials from object semantics and art direction: wood, glass, painted metal, stone, concrete, fabric, foliage, plastic, clay, etc. Preserve physically plausible response where realism is desired; stylization may deliberately alter response but remains internally consistent.

## Performance

Track material slots, shader complexity, texture dimensions/formats/mips, atlas opportunities, draw calls and VRAM. Quality target must match target hardware/platform.

## Verification

Use neutral/material-check lighting plus final scene lighting. Compare before/after and inspect close/mid/far distances.

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
