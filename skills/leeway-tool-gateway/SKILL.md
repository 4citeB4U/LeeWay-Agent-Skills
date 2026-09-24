---
name: leeway-tool-gateway
description: Governed operational bridge between LeeWay agents and authorized host capabilities such as filesystem, Docker, Forgejo, Runtime Fabric, databases, logs, and remote MCP adapters. Requires capability scoping, Formula decision separation, execution identity, Veritas, and receipts.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards > Root of Trust > Runtime Fabric
  mode: governed-operational-gateway
  stage: post-formula-pre-runtime
  compatibility: Agent Skills / GitHub Copilot / Codex / MCP / OpenCode / Hermes
---

# LeeWay Tool Gateway

## Core law

Agents do not receive raw machine authority merely because they loaded LeeWay skills.

The Tool Gateway converts host integrations into governed LeeWay capabilities.

`skills tell the agent how to behave`
`Formula decides what should happen`
`Tool Gateway exposes what may be touched`
`runtime proves what actually happened`
`Veritas measures whether it worked`
`receipt binds the chain`

## Capability classes

Normalize host-specific tools into LeeWay verbs:

- `leeway.files.*`
- `leeway.docker.*`
- `leeway.forgejo.*`
- `leeway.runtime.*`
- `leeway.database.*`
- `leeway.logs.*`
- `leeway.receipts.*`

Host adapters may include Remote Desktop Commander, MCP servers, native APIs, local services, or deterministic scripts.

## Full skill execution fabric

All 238 canonical portable `SKILL.md` capabilities enter through the same governed execution fabric.

A skill call first executes its local skill contract and receives one deterministic route:

- `BLENDER_GATEWAY`
- `GAME_GATEWAY`
- `PLAYWRIGHT_MCP`
- `GITHUB_MCP`
- `FILESYSTEM_MCP`
- `INSFORGE_MCP`
- `MARKETING_CLI`
- `TOOL_GATEWAY`
- `LOCAL_SKILL_RUNTIME`

The route is an execution binding, not proof that a downstream application ran.

`SKILL_CONTRACT_EXECUTED` proves the skill contract resolved and executed locally.
`external_action_executed=true` is separately required before claiming a browser, repository, provider, game engine, Blender worker, database, or host mutation actually executed.

The video-game-development and Blender skills use the same fabric rather than operating as isolated side channels. Bounded game/Blender tools remain independently schema-validated and may only cross to a configured authorized gateway.

## Authority tiers

Use the narrowest sufficient tier:

- `READ` — inspect/list/search/read/health/logs.
- `OPERATE` — start/stop/restart/exec/branch/write when explicitly authorized.
- `MUTATE` — rebuild/recreate/delete/deploy/merge/schema change.
- `ADMIN` — credential, policy, authority, destructive infrastructure changes.

Never infer a stronger tier from the existence of a connection.

## Root law

Prefer `<LEEWAY_ROOT>` over host-specific drive identity.

A local adapter may resolve `<LEEWAY_ROOT>` to the current physical root, but user-facing governance must remain device-agnostic.

Do not expose unrelated filesystem roots by default.

## Runtime discovery

Before first operational use, discover and preserve when available:

- host/runtime identity;
- allowed filesystem scope;
- Docker availability and version;
- relevant containers and health;
- Forgejo/API availability;
- Runtime Fabric endpoints;
- database adapters;
- Formula authority availability;
- Veritas/receipt destinations.

## Execution contract

For consequential operations preserve:

`capability`
`authorityTier`
`formulaDecision`
`runtimeTarget`
`executionIdentity`
`preState`
`postState`
`veritasMeasurements`
`receiptId`

If the host adapter cannot prove execution, do not promote the claim beyond `ADAPTER_EXECUTED`.

## Security boundary

Credentials remain behind the adapter or secret store. Agents receive capabilities, not plaintext secrets.

Do not move, delete, rebuild, or rebind live infrastructure merely because a duplicate exists elsewhere. Use staged migration:

`copy → verify → rebind → health-check → retire old path`

## Handoff

Default route:

`Bootstrap → Continuity → Ingress → Context/Phi-C64 → Formula/Phi-D → Universal Capability Kernel → Skill Orchestrator → Tool Gateway → runtime → Veritas → receipt → LeeWay delivery`


## Tool ownership law

A promoted tool must resolve to a governing skill/capability owner in `leeway-skill-orchestrator`, or be explicitly classified EXTERNAL, REFERENCE_ONLY, GENERATED, DEPRECATED, or QUARANTINED. `tool present != tool governed` and `tool governed != runtime verified`. Classify an unowned promoted tool as `ORPHAN_TOOL`. ORPHAN_TOOL entries are capability-graph gaps and must not silently enter the focal execution set.
