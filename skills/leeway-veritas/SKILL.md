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

Release claims remain separate: SOURCE_IMPLEMENTED, TESTED, CI_PASS, DEPLOYED, LIVE_OBSERVED, VERITAS_VERIFIED, QUALIFIED. Until canonical Standards LAW 15 is merged, treat that addition as a proposed control and continue enforcing already-effective R10/R25.
