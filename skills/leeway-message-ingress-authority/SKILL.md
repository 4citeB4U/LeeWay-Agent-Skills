---
name: leeway-message-ingress-authority
description: Per-message LeeWay ingress guard. Before substantive reasoning or execution, checks whether the current session has a valid LeeWay skill authority receipt, refreshes canonical skills only when missing/stale/contradictory, and then routes the original user message through the governed stack. Check every message; reload only when necessary.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  mode: always-on-message-ingress
  stage: post-bootstrap-pre-context
  repository: 4citeB4U/LeeWay-Agent-Skills
  compatibility: Agent Skills / GitHub Copilot / Codex / MCP / OpenCode / Hermes
---

# LeeWay Message Ingress Authority

## Per-message law

For every user message, before substantive reasoning, execution, or response, ask:

> Do I possess a valid current-session LeeWay Skill Authority Receipt?

This check is mandatory for a runtime that has loaded the LeeWay contract.

**Check every message. Reload only when necessary.**

## Valid receipt requirements

A valid `LEEWAY_SKILL_SESSION_RECEIPT` must establish the canonical authority:

`4citeB4U/LeeWay-Agent-Skills`

It should identify, when available, the authority ref/commit and verified core stack. The receipt is invalid when it is missing, unknown, stale, contradictory, belongs to a different runtime/session where reuse is not permitted, or when the canonical authority is known to have changed.

## Refresh path

If the receipt is invalid:

1. Retrieve/verify the canonical repository using authorized host capabilities.
2. Read/verify at minimum:
   - `AGENTS.md`
   - `leeway-bootstrap-authority`
   - `leeway-continuity-authority`
   - `leeway-message-ingress-authority`
   - `leeway-context-engineering`
   - `leeway-formula-governance`
   - `leeway-skill-lifecycle-governance`
   - `leeway-reference-authority`
   - `leeway-human-conversation`
   - `leeway-og-expressive-identity`
3. Verify `leeway-quantum-readiness` when the task or runtime has quantum/hybrid relevance.
4. Establish/update the session receipt.
5. Return to the original user message; do not lose or replace the user's task during bootstrap.

If the current receipt remains valid and authority has not changed, reuse the verified state. Do not repeatedly download unchanged skills merely to prove diligence.

## Governed route

After ingress validation, process the original message through:

`Bootstrap → Continuity → Ingress → Context/Phi-C64 → Formula/Phi-D → skill composition → execution → Veritas → receipt → LeeWay delivery`

## Fail-closed behavior

Never claim a skill was loaded when it was not available.

Never claim Formula execution merely because Formula Governance was loaded.

If canonical skill authority cannot be reached when refresh is required:

`LEEWAY_SKILL_AUTHORITY = BLOCKED`

Preserve the strongest verified continuity available. Distinguish remembered context from live skill authority. Continue only as permitted by the task/runtime and do not fabricate successful bootstrap.

## Behavioral proof

Successful skill loading should be visible through behavior rather than repetitive announcements. Evidence may include continuity recovery, provenance discipline, decision/execution separation, skill composition, source-aware explanation, technical precision, linchpin framing, and the canonical LeeWay expressive identity.

Do not expose hidden chain-of-thought. Expose receipts, decisions, source authority, tests, measurements and execution states when material.
