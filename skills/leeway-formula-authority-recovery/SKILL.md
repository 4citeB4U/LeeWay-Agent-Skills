---
name: leeway-formula-authority-recovery
description: "Recover, verify, preserve, and reuse proven LeeWay Formula authority before creating replacement contracts. Searches known host authority locations, reconciles hashes and receipts, distinguishes canonical executable Formula v1 from diagnostic Formula v2 candidates, and binds recovered authority into WD8TB/D-drive development without breaking live C:/E: sources."
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards > Root of Trust > Runtime Fabric > Formula > Veritas > receipt
  mode: conditional-core-formula-recovery
  stage: authority-recovery
  compatibility: Agent Skills / GitHub Copilot / Codex / MCP / OpenCode / Hermes
  host-rule: drive letters are deployment locations, not canonical identity
---

# LeeWay Formula Authority Recovery

## Core law
Before inventing, rewriting, or replacing a Formula contract, evaluator, adapter, storage-control policy, runtime binding, or proof gate, first search for previously proven LeeWay authority.

Permanent law:

`recover proven authority → verify identity/hash → reuse/adapt → only create new authority when no sufficient prior authority exists`

A missing D: copy does not prove the authority is absent.

## Host recovery order
On the current LeeWay workstation, search all known authority locations before declaring Formula authority missing:

1. `D:\Leeway-Ecosystem v2.1.4` — WD8TB target ecosystem and current consolidation root.
2. `C:\LeeWay-Storage-Science` and other proven C: LeeWay authority locations — historical executable Formula/storage-science evidence.
3. `E:\Leeway-Ecosystem v2.1.4` — original/legacy ecosystem, recovery trees, Runtime Fabric lineage, and Formula-v2 candidate evidence.
4. Other provenance-bound LeeWay locations discovered from receipts, manifests, container mounts, Forgejo, or Runtime Fabric.

Do not treat C:, D:, or E: as identity. Preserve device/root identity, source path, hashes, timestamps, receipt lineage, and runtime-consumed path.

If one drive lacks a required artifact, search the others before generating a replacement.

## Recovered canonical evaluator authority
Current recovered executable authority:

- Formula ID: `LEEWAY-FORMULA-v1.0`
- Runtime base: `http://127.0.0.1:4001`
- Health: `/runtime/formula/v1/health`
- Evaluate: `/runtime/formula/v1/evaluate`
- Adapter: `raw-base64-v1`
- Runtime container: `leeway_runtime_fabric`

Pinned executable hashes recovered from S4R/X5 authority:

- Engine `leeway-formula-v1.mjs`: `6502791BBA909D7481DB3A204F3CBF67B1DC06A4B76A73C797D709408341D63E`
- Canonical input `canonical-input.mjs`: `4087FC14A9F1F44EB46D9D6417156176794E2ACC72EE9BF481F21A5D0ABE5236`
- Raw adapter `raw-base64-v1.mjs`: `2C8B477ABAD73A0B8519127B20E500BC857F6D26A2722634F23637D4EEAC6215`
- Formula service `formula-service.mjs`: `59C74A850CFBACAB4408D73538C824D25687AE0FBD12F07AB5D3622661B7B1EC`

Primary historical authority:
`C:\LeeWay-Storage-Science\S4R-20260907-131056\S4R-runtime-formula-authority.json`

S4R verdict:
`S4R_RUNTIME_FORMULA_EXECUTABLE_AUTHORITY_VERIFIED`

Do not downgrade this authority to `UNEXPOSED` when the live runtime and pinned hashes reconverge.

## Formula value contract
The canonical evaluator accepts a verified adapter/input mapping. The recovered X5 path uses:

`POST /runtime/formula/v1/evaluate`

with `adapterId = raw-base64-v1` and a 16x6 matrix input.

Verified response fields include:
- `formulaId`
- `decimalState`
- `base64State`
- `top10`
- `inputHash`
- `resultHash`
- `receiptPath`
- `evaluatedAt`

Do not fabricate Formula values. Use only live evaluator output or previously verified receipts whose provenance still applies.

## Decision adapter authority
Recovered X5 decision controller:
`C:\LeeWay-Storage-Science\X5-Formula-MultiVariable-Controller-v1.5.0.ps1`

The first canonical decimal state is used as `qControl` for the verified storage-policy adapter:

- `0..22 → CAPACITY_SAFE`
- `23..45 → BALANCED`
- `46..69 → PERFORMANCE`

Formula proposes; LeeWay governance may constrain the proposal through backpressure guardrails before runtime actuation.

## Formula-v2 boundary
E: contains Formula-v2 candidate lineage including `LW-F1-H`, `LW-F1-R`, `Q69Quantizer`, and `Q69Domain`, with runtime binding to `candidate-v2/qualification-harness.mjs`.

That lineage is valuable evidence, but current metadata states:
`DIAGNOSTIC_ONLY_NOT_OFFICIAL`

Do not silently replace canonical Formula v1 executable authority with Formula-v2 candidate artifacts. Promote v2 only through its explicit Creator/promotion gate and fresh Veritas evidence.

## WD8TB / D-drive reconstruction law
For WD8TB development, D: is the consolidation and target appliance, not permission to recreate already-proven contracts.

Use this order:

`inventory existing authority → recover from C:/E:/D: → hash/provenance reconcile → stage on D: → bind existing runtime contracts → test → Veritas → receipt → only then create missing authority`

Before opening a new WD8TB gate, ask:
1. Does equivalent authority already exist on C:, E:, D:, Forgejo, a live container, or a prior receipt?
2. Is the old authority still valid for this device/task?
3. Can it be reused directly or through an adapter without changing canonical Formula behavior?
4. What is actually missing after reconciliation?

Only the residual missing dependency deserves a new gate.

## Preservation law
When consolidating authority onto D:, do not delete or move live C:/E: sources first.

Use:
`copy → hash verify → manifest → bind/repoint → health-check → Veritas → retire old payload only when explicitly authorized`

Preserve:
- original source path
- destination path
- source and destination SHA-256
- runtime-consumed artifact hash
- receipt/manifest lineage
- timestamps and version identity
- whether the artifact is canonical, candidate, historical, diagnostic, or runtime-live

The current D-side recovery manifest is:
`<LEEWAY_ROOT>\Authority\Formula-Recovery\20260912\FORMULA-AUTHORITY-RECOVERY-MANIFEST.json`

Known manifest SHA-256 at creation:
`C578A6B9123A4A79F491C32DDCB86F3BCA25323D7D623B4E36837FB3784887EE`

## Evidence law
For Formula recovery claims converge:
`historical receipt == live artifact hash == live endpoint identity == execution output == Veritas == new recovery receipt`

A filename match is not enough. A copied artifact is not authority until provenance and hashes converge.

## Historical capacity-claim boundary
The Creator recalls a prior E: 1 TB recovery in which approximately 780 GB became available again through the LeeWay storage/formula work.

Preserve that as an important recovery target and continuity signal, but do not promote the exact capacity number to verified fact until the original measurement/receipt is recovered.

Known baseline protocol evidence identifies the historical physical device as approximately 931.51 GB capacity with approximately 782.79 MB free at baseline. This baseline is not the later recovery result.

Required closure for the historical capacity claim:
`baseline device identity → pre-state free/used bytes → Formula/storage action → post-state free/used bytes → delta → Veritas → receipt`

When the exact receipt is found, add it to the D-side Formula Recovery manifest and bind it into WD8TB capacity/reclamation planning.

## Interaction proof
When this skill is active, the agent must:
- search C:/E:/D: and live runtime before declaring Formula authority missing;
- prefer proven existing contracts over freshly authored replacements;
- distinguish canonical v1 authority from diagnostic v2 lineage;
- preserve hashes and source lineage during consolidation;
- identify obsolete/redundant WD8TB gates created before recovered authority was known;
- rebuild the WD8TB roadmap around the recovered Formula evidence chain.

No claims without receipts. No reinvention before recovery.
