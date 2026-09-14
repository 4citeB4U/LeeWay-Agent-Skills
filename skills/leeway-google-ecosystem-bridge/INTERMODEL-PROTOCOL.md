# LeeWay Intermodel Protocol v1

## Purpose

Provide a stable, inspectable message contract for ChatGPT/Agent Lee, Gemini, Google AI Studio agents, Gemini Notebook production workers and future LeeWay agents.

The protocol moves **task state and evidence**, not hidden chain-of-thought.

## Request envelope

```json
{
  "protocol_version": "LEEWAY-INTERMODEL-v1",
  "task_id": "LW-YYYYMMDD-UNIQUE",
  "creator_instruction": "literal user objective",
  "authority_chain": "Creator > LeeWay Standards > ...",
  "goal": "what must be accomplished",
  "audience": "target audience",
  "source_manifest": [
    {"id": "source-id", "type": "LEEWAY_NATIVE|PRIMARY|SECONDARY|OTHER", "location": "uri/path", "purpose": "why included"}
  ],
  "hard_constraints": ["must/must-not constraints"],
  "claim_classes": ["CANONICAL", "PROVEN", "CANDIDATE", "EXTERNAL", "HISTORICAL", "OPEN_GAP"],
  "requested_capability": "research|analysis|code|notebook-production|opal-miniapp|stitch-ui|workspace-artifact",
  "requested_output_schema": "plain text or structured schema name",
  "formula_evaluator_state": "UNEXPOSED|DISCOVERED|AVAILABLE|AUTHORIZED|EXECUTED|VERIFIED|BLOCKED|FAILED",
  "formula_execution_state": "NOT_EXECUTED|EXECUTED|BLOCKED|FAILED",
  "verification_requirements": ["source URLs", "tests", "claim ledger", "etc"],
  "return_channel": "drive|github|api|browser|conversation",
  "timestamp": "ISO-8601"
}
```

## Response envelope

```json
{
  "protocol_version": "LEEWAY-INTERMODEL-v1",
  "task_id": "same task id",
  "worker": "gemini|chatgpt|notebook|opal|stitch|other",
  "execution_mode": "DIRECT_API|SHARED_ARTIFACT|BROWSER_ADAPTER|REFERENCE_ONLY",
  "answer_or_artifact": "result or artifact reference",
  "sources": [
    {"location": "uri/path", "supports": "claim/result supported"}
  ],
  "claims": [
    {"claim": "statement", "status": "PROVEN|CANDIDATE|EXTERNAL|HISTORICAL|OPEN_GAP", "source": "source-id"}
  ],
  "uncertainties": ["what remains uncertain"],
  "blocked_items": ["what could not be completed and why"],
  "recommended_next_action": "smallest valid next step",
  "runtime_evidence": ["API response id, file hash, test output, artifact id, etc"]
}
```

## Rules

1. `task_id` must survive every handoff.
2. Preserve the Creator's literal instruction separately from summaries.
3. Never upgrade `CANDIDATE` to `PROVEN` merely because another model agrees.
4. Never upgrade `REFERENCE_ONLY` to executed integration.
5. When a worker cannot access a requested source, mark it blocked rather than guessing.
6. Consequential outputs require source/evidence references.
7. External model output enters LeeWay as evidence pending validation.
8. Formula evaluator/execution state must remain explicit when Formula claims matter.
9. No API keys, OAuth tokens, passwords or secrets inside an envelope stored in GitHub/Drive.
10. Do not transmit private chain-of-thought. Transmit conclusions, evidence, uncertainty, tool results and decision records.

## Shared artifact state machine

`INBOX → CLAIMED → WORKING → OUTBOX → VERIFYING → ACCEPTED | REPAIR | BLOCKED → ARCHIVE`

A worker should not modify an accepted artifact silently. New work creates a new version or task-linked revision.

## Research worker contract

Gemini or another research worker should return:

- strongest primary sources first;
- facts separated from interpretation;
- publication/update dates when material;
- conflicts between sources;
- missing evidence;
- concise synthesis;
- no fabricated citations.

## Production worker contract

Gemini Notebook, Opal, Stitch or another production surface receives only approved sources/constraints relevant to the artifact. Production does not change claim authority.

## Verification contract

Before promotion:

`CLAIM == SOURCE == ARTIFACT == TEST/RUNTIME (when applicable) == VERITAS == RECEIPT`

Material mismatch means `NOT_CONVERGED` and routes to repair.
