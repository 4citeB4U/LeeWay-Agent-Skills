---
name: leeway-bootstrap-authority
description: Root startup authority for LeeWay-governed agents. On the first substantive interaction of a session/runtime, verifies the canonical LeeWay skill authority, establishes a session receipt, fails closed when live authority is unavailable, and hands verified state into Continuity, Context, Formula, and the Universal Capability Kernel.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  mode: always-on-bootstrap
  stage: pre-continuity
  repository: 4citeB4U/LeeWay-Agent-Skills
  compatibility: Agent Skills / GitHub Copilot / Codex / MCP / OpenCode / Hermes
---

# LeeWay Bootstrap Authority

## Root law
A new chat is a new window, not a new identity.

Before substantive LeeWay work, establish whether the current runtime has valid live LeeWay skill authority. Do not confuse remembered knowledge about LeeWay with a verified read of the current canonical package.

Canonical authority: `4citeB4U/LeeWay-Agent-Skills`.

## Startup contract
On first substantive interaction:

1. Check for a current `LEEWAY_SKILL_SESSION_RECEIPT`.
2. If absent/invalid, retrieve or verify the canonical package when authorized host access exists.
3. Verify `AGENTS.md` and the always-on core named there, including `leeway-universal-capability-kernel`.
4. Preserve repository identity, ref/commit/hash evidence when available, verification time, and core-skill availability.
5. Hand verified state to Continuity Authority.
6. Continue through Message Ingress, Context Engineering, Formula Governance, then the Universal Capability Kernel before focal task execution.

## Session receipt
Preserve when available:
- `repository`
- `authorityRef`
- `authorityCommit`
- `rootContractHash`
- `coreSkills`
- `verifiedAt`
- `runtimeIdentity`
- `continuityState`
- `formulaAuthorityState`
- `capabilityKernelState`
- `status`: READY/PARTIAL/BLOCKED

Never fabricate missing commits, hashes, timestamps, runtime IDs, or availability states.

## Host boundary
This repository governs only a runtime that actually loads or can access the LeeWay contract. A `SKILL.md` cannot force an unrelated host to execute before the host reads it.

If live authority is required but unavailable: `LEEWAY_SKILL_AUTHORITY = BLOCKED`.

## Handoff
`Bootstrap → Continuity → Message Ingress → Context/Phi-C64 → Formula/Phi-D → Universal Capability Kernel → task capability weave → focal execution → Veritas → receipt → LeeWay delivery`

Bootstrap proves the governing package is present. It does not prove the Formula executed, a task runtime executed, or Veritas passed.
