<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.OPERATING_LOOP.REFERENCES
TAG: LEEWAY.OPERATING_LOOP.SOURCE_FIRST_EVIDENCE_PROMOTION
5WH:
WHAT = Define the source-first onboarding, repeatable-action, evidence-promotion, and non-overwrite protocol used by the existing Agent Operating Loop.
WHY = Prevent workers from bypassing governing sources, rediscovering solved defects, erasing accepted evidence, or stopping after an intermediate success.
WHO = Creator-authorized LeeWay workers operating under LeeWay Standards and the existing Agent Operating Loop.
WHERE = references/source-first-evidence-promotion.md within the leeway-agent-operating-loop skill.
WHEN = 2026-11-10 America/Chicago Creator clarification.
HOW = Require source acknowledgments, reproducible action records, scoped test promotion, defect classification, checkpoint readback, and continuation.
LICENSE = MIT, matching the owning skill.
-->

# Source-First Onboarding, Repeatability, and Evidence Promotion

This is an operational reference for the existing Agent Operating Loop. It creates no new verifier, ledger, receipt writer, runtime, queue, control plane, or deployment authority.

## Required source order

Before substantive work, read the current accessible canonical revisions in this order:

1. LeeWay Standards.
2. LeeWay Engineering.
3. Receipt Authority qualification and evidence contract.
4. LeeWay Learning Ledger admission boundary.
5. LeeWay Agent Skills and the active operating skills.
6. LEEWAY-VERITAS independent evidence contract.
7. LeeWay Production Final Execution Layer handoff contract.
8. Owning repository `AGENTS.md`, contributor notes, current issues/PRs, source SHA, latest clean checkpoint, and accepted evidence.

If a required source is inaccessible or stale, record `SOURCE_NOT_READ` or `SOURCE_STALE` for that scope. Do not imply compliance from memory. Continue independent authorized work only where the missing source does not control the action.

## `SOURCE_FIRST_ACK`

Each worker's first mission response must include:

```text
SOURCE_FIRST_ACK
MISSION_ID:
WORK_ID:
AGENT_ID:
SOURCES_READ: repository | ref/SHA | path | timestamp
RULES_APPLIED:
CONFLICTS_OR_STALE_SOURCES:
REUSABLE_ACCEPTED_WORK:
ACTIVE_GATE:
FIRST_UNFINISHED_ASSERTION:
```

No source acknowledgment means no mutation, execution, verification claim, or production recommendation.

## Repeatable action record

For every material step preserve:

```text
ACTION_ID:
ENGINEERING_STAGE:
OWNER_AND_SOURCE:
TARGET_AND_ENVIRONMENT:
PRECONDITION:
EXPECTED_RESULT:
PROCEDURE_OR_COMMAND:
OBSERVED_RESULT:
EXIT_OR_RESULT_STATE:
TIMESTAMP_AND_TIMEZONE:
ARTIFACTS_AND_HASHES:
ASSERTIONS_EXERCISED:
EVIDENCE_SCOPE:
ROLLBACK_OR_RECOVERY:
NEXT_GATE_OR_BLOCKER:
```

The procedure must be safe to reproduce by another authorized worker. A consequential external action must use an idempotent, dry-run, readback, or recovery-safe method rather than blind repetition.

## Test evidence promotion

Use this path:

`TEST PASS → VALIDATE TEST SCOPE → VERIFY RESULT INTEGRITY → EVIDENCE ACCEPTED → CHECKPOINT PRESERVED → NEXT GATE`

Record exact counts: `EXECUTED`, `PASSED`, `FAILED`, `SKIPPED`, and `NOT_RUN`. Also record source/artifact identity, environment, commands, exit codes, assertions, logs, exclusions, contrary evidence, independent reproduction state, and next gate.

Evidence levels are scoped, not interchangeable:

- Level A: source/static/unit assertion evidence.
- Level B: integrated service or seam evidence.
- Level C: live target/device/runtime observation.
- Level D: independently verified, canonical Receipt/readback, Learning admission/readback, and qualified production handoff evidence as applicable.

A lower-level pass remains accepted for its scope while higher gates remain open. It must not be mislabeled as a higher-level pass.

## Preserve, classify, and reuse

Classify each discovered defect as one of:

`NEW | PREVIOUSLY_SOLVED | REGRESSED | SOURCE_RUNTIME_DRIFT | INTEGRATION_MISSING | EVIDENCE_GAP | AUTHORITY_BLOCKED`

Before repairing, search accepted artifacts, receipts, contributor notes, issue/PR history, and checkpoints for the same behavioral signature. If previously solved, reproduce the accepted procedure against current source/runtime before designing a replacement.

Evidence survives. Conclusions may evolve. Preserve the original pass/fail and append the new observation. Freeze accepted artifact bytes and scope when later work risks overwriting them. Add new functionality beside the frozen path; reopen it only when a reproduced regression or changed dependency touches its assertions.

## Mandatory worker report header

```text
REGION | TAG | WHO | WHAT | WHEN | WHERE | WHY | HOW
MISSION_ID | WORK_ID | AGENT_ID | SOURCE_FIRST_ACK
ENGINEERING_STAGE | SOURCE_REFS | TEST_RESULTS | EVIDENCE_STATE
CHECKPOINT | NEXT_GATE
```

At every material stop: write the checkpoint, read it back, and continue from the first unfinished assertion unless a genuine authority or physical boundary blocks that exact scope.
