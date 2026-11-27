---
name: leeway-conversation-vault
description: Governed durable conversation capture and retrieval for LeeWay agents. When a runtime exposes an authorized LeeWay Tool Gateway or equivalent local adapter, append currently available user/assistant turns with provenance, Formula evaluator/execution state, Veritas state, hashes, and receipt state so future Context Engineering can retrieve verified conversation evidence without fabricating missing history.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  mode: always-on-when-vault-available
  stage: post-response-evidence
  compatibility: Agent Skills / GitHub Copilot / Codex / MCP / OpenCode / Hermes
---

# LeeWay Conversation Vault

## Memory contract binding

Before applying this skill, load the active root `MEMORY.md`
(`LEEWAY.MEMORY.AUTHORITY`, version `1.0.0`) and the applicable root
`AGENTS.md`. `MEMORY.md` is normative; this skill is subordinate guidance. Use
the exact 12-stage sequence:

`INVESTIGATE → DIAGNOSE → PLAN → IMPLEMENT → TEST → VALIDATE → REPAIR → RETEST → VERIFY → EVIDENCE → CHECKPOINT → CONTINUE`

If `MEMORY.md` is missing, altered, unapproved, or not tied to the current
session receipt, set `MEMORY_AUTHORITY = BLOCKED` and perform bounded diagnosis
only. This skill cannot create another LeeWay identity, Formula, Veritas,
Receipt Authority, or memory truth source.

## Core law
A conversation actually available to the current runtime may be preserved as governed LeeWay evidence when an authorized vault is available.

Do not claim to possess conversations the host never exposed.

`available conversation != all account history`

## Capture contract
For every captured turn preserve when available:

- session/conversation identity;
- conversation title;
- timestamp;
- source runtime/provider;
- user message;
- assistant response;
- skill-authority state;
- Formula evaluator state;
- Formula execution state;
- Veritas state;
- receipt state;
- immutable record hash;
- source/provenance metadata.

The vault is append-only by default. Historical records are not silently rewritten.

## Formula boundary
Conversation storage does not prove Formula execution.

When no evaluator or authorized adapter has been proven:

`FORMULA_EVALUATOR_STATE = UNEXPOSED`
`FORMULA_EXECUTION_STATE = NOT_EXECUTED`

If Formula actually executed, preserve evaluator/adapter identity, implementation/version/hash, decision evidence, runtime evidence, Veritas, and receipt state when available.

Never infer execution merely because Formula Governance was loaded or because a conversation was saved.

## Retrieval contract
Future Context Engineering may retrieve prior conversation evidence for continuity, style, project state, decisions, terminology, unresolved work, and capability selection.

Retrieved conversation text is context, not supreme authority. Current Creator instruction and higher LeeWay authority still govern.

## Historical ingestion
For older chats, ingest only when the host exposes them, the user reopens them, or the user provides an authorized export/archive.

Never invent missing chats, turns, dates, titles, or assistant responses.

## Privacy and scope
Store conversations only in the authorized LeeWay vault. Do not copy unrelated personal data simply because filesystem access exists.

Preferred local location:

`<LEEWAY_ROOT>/ToolGateway/runtime/conversation-vault`

## Runtime path
`message ingress → governed response → conversation append → hash → index → receipt → future Context Engineering retrieval`

The Conversation Vault complements Memory/Continuity. It does not replace Formula Governance, Veritas, or receipt authority.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE BEGIN -->

# LeeWay Universal Formula Governance

Authority: Creator and LeeWay Standards.
Formula identity: LEEWAY-FORMULA-v1.0.

The canonical LeeWay Formula is mandatory throughout
the entire LeeWay ecosystem.

Every current and future application, capability,
agent, worker, employee, model, provider, adapter,
automation and integration inherits this requirement.

All applicable interactions, responses, decisions,
actions, revisions, executions, computations, model
inferences, resource allocations, information transfers,
memory operations, storage operations and deployments
must consume the canonical Formula through their
authorized and qualified domain contracts.

Formula availability, documentation, configuration,
health and historical results do not constitute actual
Formula consumption for a new operation.

Recover relevant authorized memory before substantive
work. Preserve identity, provenance, Formula integrity,
authorization, original receipts and verified learning.

Never invent observations, adapter mappings, mathematical
results, execution evidence or independent verification.

No application may bypass applicable Formula governance
by dispatching directly to a provider.

Every new application and capability must demonstrate
applicable Formula consumption before production admission.

Preserve the existing authority hierarchy:

Creator > Standards > Root of Trust > Runtime Fabric >
Agent Lee > Harness > Formula > skills/models/tools >
execution > Veritas > Receipt Authority > Learning Ledger.

Execute the complete engineering loop:

INVESTIGATE > DIAGNOSE > PLAN > IMPLEMENT > TEST >
VALIDATE > REPAIR > RETEST > VERIFY > EVIDENCE >
CHECKPOINT > CONTINUE.

Documentation compliance does not establish executable
enforcement or production admission.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE END -->
