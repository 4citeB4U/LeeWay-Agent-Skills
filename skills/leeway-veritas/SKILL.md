---

name: leeway-veritas

description: Independent LeeWay verification authority that defines pre-gate, post-gate, acceptance-test, negative-test, recovery-test, and evidence-state requirements without treating model output or execution claims as proof.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards > Root of Trust

  mode: verification-authority

  stage: pre-execution-and-post-execution

---

# LeeWay Veritas

## Law

Execution is not verification. A PASS requires inspectable evidence against an explicit acceptance criterion.

## Pre-gate

Verify authority, target identity, expected state, dependencies, mutation scope, rollback/recovery, and acceptance test before consequential execution.

## Post-gate

Measure actual post-state, compare to expected state, run required negative/sibling/recovery checks, classify VERIFIED / OBSERVED / INFERRED / PROPOSED / UNVERIFIED / FAILED / BLOCKED, and reject unsupported promotion.

## Composition

Consumes desired result/acceptance gate from Agent Operating Loop; receives focal execution evidence from Skill Orchestrator/Tool Gateway; hands verified evidence to Receipt Authority and Learning Ledger. Veritas must remain independent enough to fail an execution path.

## GitHub canonical provenance and engineering-loop admission

This skill consumes **existing** LeeWay Standards R10/R25 and the proposed LAW 15 when admitted by the canonical Standards branch. It creates no new verifier root, deployment owner or control plane.

For every consequential production or learning qualification:

1. Recover the owning GitHub repository, immutable commit/release ID, artifact SHA-256, source contract and authorized owner. A branch name, local checkout, drive letter, hostname, cached receipt or remote mirror is never the source authority. A missing canonical GitHub source identity blocks only the affected qualification.
2. Distinguish immutable GitHub source from physical runtime evidence. A host path is a qualified deployment binding, and installation bytes must be compared to GitHub-pinned source before executing. Runtime data, keys, receipts and actual native work remain with approved secure services; never upload protected custody to GitHub or pretend GitHub serves as an operating-system filesystem.
3. Require traceable evidence of Investigate → Diagnose → Plan → Implement → Test → Validate → Repair → Retest → Verify → Evidence. Include checkpoint, scope, approval, rollback, test acceptance/negative cases, source SHAs, observed physical effect, independent Veritas PRE/POST, canonical Receipt Ledger and eligible Learning Ledger readback as applicable. If a stage is not applicable, identify the authorized reason. Do not call a completed source scan, passing CI or self-declared JSON field a Veritas PASS.
4. Classify executable hardcoded drive/root imports or fixed hostname-based signer eligibility as actionable portability defects. Distinguish historical forensic paths and test fixtures. Preserve real data and audit records, repair only the canonical owning component and retest without global shutdown.
5. On incomplete evidence, return a scoped BLOCKED decision containing exact missing gate, owner, smallest bounded investigation/repair, acceptance criterion and automatic-recheck trigger where a registered durable workplane supports it. Never silently waive policy, substitute a synthetic provider or claim a production pass.
6. Verify signed result independently with qualified source identity, valid role/key separation, revocation/replay and same-operation evidence. The task executor may not certify itself; mere evidence manifest presence is not a credential.

## Mandatory continuous evidence journal and completion preflight

For each consequential engineering mission, use the **existing owning GitHub issue/PR** as the running evidence/handoff thread from BEGIN to END (or a protected receipt authority for private payloads). Do not reconstruct an undocumented ten-stage completion from an LLM summary at the end.

Use the proposed `LeeWay-Standards/Docs/governance/ENGINEERING-LOOP-EVIDENCE-ADMISSION-V1.md` source contract in Standards PR #54 when accepted by its owner. Its read-only `scripts/check-engineering-loop-evidence.mjs` preflight checks the record schema `leeway.engineering.loop-evidence.v1` for:

- Exact work ID, last checkpoint, owning role, GitHub repository/commit and source artifact hash
- Original acceptance criteria, human authorization evidence, rollback instructions
- Each of Investigate / Diagnose / Plan / Implement / Test / Validate / Repair / Retest / Verify / Evidence with an observed result, reason, immutable source/receipt link and a precise blocker where applicable
- Formula evaluator identity and actual execution state; actual test and negative-case results
- Clear original-task outcome and subsequent independent Veritas/Receipt/Learning states

Do not mark a phase executed when it was only planned. Repair/Retest can be documented `NOT_APPLICABLE` only with a specific authorized exception, never silently omitted. A complete journal of a **BLOCKED** or failed attempt is valid diagnostic work for separate independent review, but it must not be promoted as a PASS, production authority or Learning Ledger admission. A structurally complete journal of a claimed PASS is only `SOURCE_EVIDENCE_READY_FOR_INDEPENDENT_REVIEW`: the actual independent Veritas provider must authenticate every relevant original observation and receipt.

If missing documentation is the only proven blocker, report the **exact missing stage and source reference** and repair the same existing mission record. Do not restart the task, repeat proven experiments, reject an unrelated qualified action, or waive the original acceptance gate.

## Veritas submission and review-delivery authority (C3 source correction)

A proposed review in a GitHub PR, issue, workflow artifact, checklist or model-generated message is **not delivered to Veritas**. A source green check is evidence to be reviewed, not the reviewer. In the existing Runtime Fabric workplane, Veritas must distinguish the following non-interchangeable lifecycle states:

1. `REVIEW_PACKET_PREPARED`: original workId/checkpoint, source SHA, Formula execution state, scoped acceptance and ten-stage positive/negative evidence recorded.
2. `PROVIDER_BOUND_AND_AUTHENTICATED`: host-side approved source, reachable independently governed role/service, correct permission scope, revocation and replay conditions inspected. A plugin or source path does **not** itself establish this state.
3. `SUBMITTED_TO_VERITAS`: actual provider submission attempted, with idempotent request identity; keep original workplane job until durable admission.
4. `REVIEW_INTAKE_READBACK_CONFIRMED`: actual provider acknowledges same review ID, candidate ID, workId, evidence digest and acceptance scope. Submission/readback proves only intake, not the independent verdict.
5. `INDEPENDENT_VERITAS_DECISION`: separate appropriately enrolled reviewer authenticates **original source and physical observations where applicable**, verifies the full engineering loop and issues its own scope-bound, independently readable signed decision. Classify source review separately from production PRE/POST.
6. `RECEIPT_AND_ELIGIBLE_LEARNING`: only genuinely qualified action outcomes advance through canonical Receipt Authority and eligible Learning Ledger readback; verified failures remain useful diagnostic candidates, never false task PASS.

**Mandatory repair behavior:** When a workplane exposes a review callback, the supervisor must actually supply a qualified review transport instead of merely attaching a GitHub review request. If absent, report exact `REVIEW_PROVIDER_UNBOUND`, owning provider, missing capability, last verified checkpoint and a scoped next binding action. Do not repeatedly request a PR review as a substitute for provider enrollment. A source-pinned adapter loading, `ACCEPTED_FOR_REVIEW` or `HOLD_APPROVAL` can never self-promote to independently verified status. Retain existing `ownerClose` and `receiptReadback` gates for real mission closure and keep unrelated qualified work running.

Cross-reference original Runtime Fabric mission [C3 #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21), [Formula candidate PR #96](https://github.com/4citeB4U/Leeway-Runtime-Fabric/pull/96), [mission PR #93](https://github.com/4citeB4U/Leeway-Runtime-Fabric/pull/93), and [ten-stage PR #98](https://github.com/4citeB4U/Leeway-Runtime-Fabric/pull/98). These are separate producer stages using the same existing independent Veritas authority and must not spawn duplicate reviewer control planes.

Release claims remain separate: SOURCE_IMPLEMENTED, TESTED, CI_PASS, DEPLOYED, LIVE_OBSERVED, VERITAS_VERIFIED, QUALIFIED. Until canonical Standards LAW 15 is merged, treat that addition as a proposed control and continue enforcing already-effective R10/R25.
