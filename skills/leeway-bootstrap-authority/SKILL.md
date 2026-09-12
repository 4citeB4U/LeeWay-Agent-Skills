---
name: leeway-bootstrap-authority
description: Root startup authority for LeeWay-governed agents. On the first substantive interaction of a session/runtime, verifies the canonical LeeWay skill authority, establishes a session receipt, fails closed when live authority is unavailable, and hands verified state to Continuity Authority. This skill does not pretend a host can auto-run it unless the host actually loads the LeeWay contract.
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

Before substantive LeeWay work, establish whether the current runtime has a valid live LeeWay skill authority. Do not confuse remembered knowledge about LeeWay with a verified read of the current canonical skill package.

Canonical authority:

`4citeB4U/LeeWay-Agent-Skills`

## Startup contract

On first substantive interaction in a session/runtime:

1. Identify whether this runtime has already established a current `LEEWAY_SKILL_SESSION_RECEIPT`.
2. If no current receipt exists, retrieve or otherwise verify the canonical LeeWay package when the host provides authorized access.
3. Verify at minimum the root `AGENTS.md` and the always-on core skills named there.
4. Preserve repository identity, branch/ref when relevant, commit/version/hash evidence when available, verification time, and core-skill availability.
5. Hand the verified authority state to `leeway-continuity-authority`.
6. Only after bootstrap/continuity should substantive Context Engineering and Formula Governance begin.

## Session receipt

A valid receipt should preserve when available:

- `repository`: canonical repository identity;
- `authorityRef`: branch/tag/commit;
- `authorityCommit`: current commit when retrievable;
- `rootContractHash`: hash or immutable object identity when available;
- `coreSkills`: verified availability states;
- `verifiedAt`: runtime timestamp when available;
- `runtimeIdentity`: host/runtime/session identity when exposed;
- `continuityState`: pending/recovered/partial/blocked;
- `formulaAuthorityState`: available/not-checked/blocked;
- `status`: READY/PARTIAL/BLOCKED.

Do not fabricate missing commit IDs, hashes, timestamps, runtime IDs or availability states.

## Host boundary

This repository can govern a runtime only when that runtime actually loads or can access the LeeWay contract. A `SKILL.md` cannot force an unrelated host to execute code before the host reads the skill.

Therefore:

- when the host supports persistent/project/repository instructions, this skill is the required first-stage contract;
- when the host exposes connected repository/tool access, use it when the session receipt requires refresh;
- when the host cannot access the canonical authority, set `LEEWAY_SKILL_AUTHORITY = BLOCKED` rather than claiming a successful bootstrap.

## Handoff

Successful bootstrap order:

`Bootstrap Authority → Continuity Authority → Message Ingress Authority → Context Engineering / Phi-C64 → Formula Governance / Phi-D → task capabilities → runtime → Veritas → receipt → LeeWay delivery`

Bootstrap proves the governing package is present. It does not prove the Formula executed, a task skill executed, or runtime work occurred.
