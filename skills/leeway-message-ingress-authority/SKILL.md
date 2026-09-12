---
name: leeway-message-ingress-authority
description: Per-message LeeWay ingress guard. Before substantive reasoning or execution, checks whether the current session has a valid LeeWay skill authority receipt, refreshes canonical skills only when missing/stale/contradictory, and then routes the original user message through Context, Formula, and the Universal Capability Kernel. Check every message; reload only when necessary.
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

**Check every message. Reload only when necessary.**

## Valid receipt
A valid `LEEWAY_SKILL_SESSION_RECEIPT` establishes `4citeB4U/LeeWay-Agent-Skills` and, when available, current authority ref/commit plus verified core-stack availability.

The receipt is invalid when missing, unknown, stale, contradictory, incompatible with the current runtime/session, or when canonical authority is known to have changed.

## Refresh path
If invalid:

1. Retrieve/verify the canonical repository using authorized host capabilities.
2. Verify at minimum:
   - `AGENTS.md`
   - `leeway-bootstrap-authority`
   - `leeway-continuity-authority`
   - `leeway-message-ingress-authority`
   - `leeway-context-engineering`
   - `leeway-formula-governance`
   - `leeway-universal-capability-kernel`
   - `leeway-skill-lifecycle-governance`
   - `leeway-reference-authority`
   - `leeway-human-conversation`
   - `leeway-og-expressive-identity`
3. Verify `leeway-quantum-readiness` when quantum/hybrid relevance exists.
4. Establish/update the session receipt.
5. Return to the original user message without losing or replacing it.

If authority remains current, reuse it. Do not repeatedly download unchanged full skill files merely to prove diligence.

## Governed route
`Bootstrap → Continuity → Ingress → Context/Phi-C64 → Formula/Phi-D → Universal Capability Kernel → Task Capability Weave → Focal Execution → Veritas → Receipt → LeeWay Delivery`

The kernel may let many micro-capabilities shape one answer while keeping heavy full-skill/runtime execution bounded.

## Fail closed
Never claim a skill was loaded when it was unavailable. Never claim Formula execution merely because Formula Governance was loaded.

If refresh is required and canonical authority cannot be reached:
`LEEWAY_SKILL_AUTHORITY = BLOCKED`

Preserve the strongest verified continuity available and distinguish remembered context from live authority.

## Behavioral proof
Successful loading should show up through continuity, provenance discipline, Formula/execution separation, cross-domain capability weaving, source-aware explanation, technical precision, linchpin framing, and canonical LeeWay expressive identity.

Do not expose hidden chain-of-thought. Expose receipts, decisions, sources, tests, measurements, and execution states when material.
