/*
LEEWAY HEADER — DO NOT REMOVE

REGION: AI.AGENT.ORCHESTRATION
TAG: AI.AGENT.ORCHESTRATION.LEEWAY_CONTEXT_GATEWAY

COLOR_ONION_HEX:
NEON=#39FF14
FLUO=#0DFF94
PASTEL=#C7FFD8

ICON_ASCII:
family=lucide
glyph=network

5WH:
WHAT = Governed deterministic context-routing skill for remote MCP hosts and LeeWay clients
WHY = Reduce redundant search, retrieval and reasoning by supplying the minimum relevant evidence set before model work
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = skills/agent-orchestration/leeway-context-gateway/SKILL.md
WHEN = 2026
HOW = Intent classification to Set A/B/C/D, evidence-status preservation, SHA-256 payload identity and MCP resources/prompts/tools

AGENTS:
ROUTE
AUDIT
VERIFY

LICENSE:
MIT
*/

# LeeWay Context Gateway

**Expert in**: deterministic pre-routing of verified system context so an AI host can receive a compact, purpose-specific evidence payload instead of repeatedly searching the full estate.

## Capabilities

- Map intent to LeeWay Context Set A, B, C, D, or an allowed combination
- Assemble compact context payloads before downstream model reasoning
- Preserve `VERIFIED`, `OBSERVED`, `INFERRED`, `PROPOSED`, `UNVERIFIED`, `FAILED`, and `BLOCKED` evidence states
- Refuse to manufacture runtime health, Veritas receipts, hashes, model identities, user activity, or domain state
- Expose context through MCP tools, resources, and prompts plus a direct HTTP context API
- Keep data sources refreshable behind a stable remote MCP endpoint
- Surface privacy-minimal connection telemetry for administration
- Compute SHA-256 identities for assembled payloads without falsely treating those hashes as proof of the underlying source

## Context Sets

- **Set A — Codebase AST & Git Diffs:** code, file, AST, Git and engineering state.
- **Set B — Runtime Health & Veritas Evidence:** runtime, containers, workers, receipts and operational evidence.
- **Set C — Domain / Universe State:** Roblox, creator, asset, world and application-specific metadata.
- **Set D — MCP Skills & Capability Registry:** active skills, MCP capability and gateway administration state.

Additional sets may be introduced only through the canonical gateway registry and must retain the same evidence contract.

## Use this skill when

- An LLM or agent would otherwise perform repeated repository, RAG, vector or documentation searches just to establish known system state
- A task can be routed to a deterministic context set before model generation
- Multiple model vendors need the same governed context boundary
- Runtime and domain telemetry must remain outside model-specific logic
- An operator needs to inspect which declared clients/models are using the MCP gateway

## Mandatory procedure

1. Identify the user intent without inventing missing state.
2. Route using deterministic rules before optional semantic retrieval.
3. Load only the minimum required context set(s).
4. Preserve source and evidence status for every set.
5. Hash the assembled payload for identity/integrity comparison.
6. Deliver the payload through the MCP primitive or direct gateway API appropriate to the host.
7. Perform model reasoning only after the context boundary is established.
8. Record telemetry without capturing prompt content by default.

## Failure conditions

- A required source is absent: return `UNVERIFIED` or `BLOCKED`; do not substitute guessed data.
- A configured evidence export cannot be read or parsed: return `FAILED` for that set.
- A client requests administrative detail without authorization: return `BLOCKED`.
- A host does not automatically reload changed MCP tool schemas: keep the endpoint live and require that host's catalog refresh mechanism; never claim universal hot schema propagation.
- A host does not guarantee pre-model MCP invocation: Zero-Inference Search Debt is not proven for that host. Use a LeeWay-controlled pre-model gateway when compulsory routing is required.

## Acceptance criteria

- Deterministic routing returns the same set selection for the same normalized intent and rule version.
- Missing data is visibly marked and never replaced by sample state.
- MCP `/mcp` remains stable while source data changes.
- System A/B/C/D detail is inspectable through the administration portal.
- Connection telemetry identifies only what the caller declares and labels undeclared model identity as such.
- CI proves TypeScript build, deterministic routing tests, HTTP health, and Docker build before merge/deployment.

## Tags

`mcp` `context-routing` `zero-search-debt` `agent-orchestration` `veritas` `telemetry` `governance` `multi-model`
