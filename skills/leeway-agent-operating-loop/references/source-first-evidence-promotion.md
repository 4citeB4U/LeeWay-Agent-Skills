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

## Immediate evidence capture and canonical custody handoff (Creator amendment, 2026-11-11)

**A passing test is not disposable scratch output.** At the moment a test returns, preserve its authentic source-scope outcome before starting an unrelated repair, merging, or reporting completion. This is the existing evidence-promotion law made operational; it does not create a new verifier, receipt ledger, Runtime, or private evidence store.

For **every executed test** (positive, negative, skipped, timed-out or blocked):

1. Capture the original immutable source head SHA and actual tested checkout SHA (for GitHub `pull_request`, a generated merge SHA may differ), test command, original job/run ID, time, OS/runner class, executed/passed/failed/skipped counts, exit status, observable assertions, and real logs/artifacts. Include **evidence FOR and AGAINST** and the last accepted checkpoint. Never infer results from commit messages, workflow titles, fixtures, or assistant claims.
2. Calculate SHA-256 over actual test result bytes; record which encoding/container was hashed. Generate a bounded machine-readable candidate packet and preserve the original log/artifact under the governing repo's qualified CI or host evidence route. Validate the persisted bytes via independent readback where possible, not merely upload acknowledgment. Do **not** include secrets, raw personal data, device file contents, or private host telemetry in public GitHub evidence.
3. On each CI test execution, run artifact capture automatically using `if: always()` or equivalent so **failures also survive**. Treat artifact omission, expiration, denied GitHub-token writes, corrupted hashes, or missing readback as `EVIDENCE_CUSTODY_INCOMPLETE`; repair and retest the custody adapter at the original gate without discarding the already proven source test.
4. Register **sanitized references** to the source commit, job/run ID, evidence artifact SHA-256, and current scope in the owning mission PR/issue and the existing Receipt Authority source/evidence inventory through an authorized route. Such a source reference is not private Receipt Authority custody, and an ordinary artifact retention period is not perpetual storage.
5. Prepare the existing independent **LEEWAY-VERITAS** review handoff using the original test evidence, exact source pins, and the owning mission. Real review-intake acceptance requires authenticated submit and readback through the authorized independent provider. **Independent signed evaluation is separate from intake and from a passing CI job.**
6. Only an independently eligible, owner-scoped result can pass through the **existing Receipt Authority runtime append/readback** and subsequently the Learning Ledger eligible delivery/readback. Preserve original tenant isolation, independent PRE/POST for real native execution, replay protection, and rollback. A GitHub comment, JSON file, unsigned hash, or successful test run must **never** be labeled a production receipt, Veritas verdict, or learning admission.
7. If historical tests still have reliable original logs/artifacts, recover and hash those first instead of reflexively rerunning completed work. A recovered historical result retains its original source scope. If artifacts have expired, preserve the remaining GitHub run/job references and explicitly record the loss; a future fresh test is **new evidence**, not a retroactive original receipt.

**Promotion state ledger:** `TEST_EXECUTED -> SOURCE_EVIDENCE_CAPTURED -> ARTIFACT_HASH_VERIFIED -> SANITIZED_CUSTODY_INDEXED -> VERITAS_INTAKE_READBACK -> INDEPENDENT_VERITAS_DECISION -> CANONICAL_RECEIPT_APPEND_READBACK -> LEARNING_ADMISSION_READBACK`. Every state is independently gated, may remain `NOT_EXECUTED / BLOCKED`, and cannot be inferred from the previous one. A worker may move to another authorized independent task but must leave the unfinished gate and original work ID discoverable.

**Demonstrated regression reference:** The [Digital Brain evidence-capture repair](https://github.com/4citeB4U/Leeway-Digital-Brain-Diagnostincs-pkg/pull/1) preserved six historical 14/14 source tests per job, detected a hidden-folder artifact upload omission and denied issue-write token (403), then passed three-OS source CI with independently hashed ZIP and internal manifest readbacks. The [Receipt Authority source-index proposal](https://github.com/4citeB4U/Receipt-Authority/pull/5) contains sanitized original references; it is expressly **not** a canonical Receipt append. The installed Veritas/Receipt/Production acceptance still must be evidenced by their actual owners.

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
