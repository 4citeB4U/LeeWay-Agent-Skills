---
name: leeway-conversation-vault
description: Governed durable conversation capture and retrieval for LeeWay agents. When a runtime exposes an authorized LeeWay Tool Gateway or equivalent local adapter, append currently available user/assistant turns with provenance, Formula state, Veritas state, hashes, and receipt state so future Context Engineering can retrieve verified conversation evidence without fabricating missing history.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  mode: always-on-when-vault-available
  stage: post-response-evidence
  compatibility: Agent Skills / GitHub Copilot / Codex / MCP / OpenCode / Hermes
---

# LeeWay Conversation Vault

## Core law

A conversation that is actually available to the current runtime may be preserved as governed LeeWay evidence when an authorized vault is available.

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
- Formula execution state;
- Veritas state;
- receipt state;
- immutable record hash;
- source/provenance metadata.

The vault is append-only by default. Historical records are not silently rewritten.

## Formula boundary

Conversation storage does not prove Formula execution.

If the canonical Formula did not actually execute, store:

`FORMULA_EXECUTION_STATE = NOT_EXECUTED`

If Formula did execute, preserve implementation/version/hash and decision evidence when available.

## Retrieval contract

Future Context Engineering may retrieve prior conversation evidence for continuity, style, project state, decisions, terminology, and unresolved work.

Retrieved conversation text is context, not supreme authority. Current Creator instruction and higher LeeWay authority still govern.

## Historical ingestion

For older chats, ingest only when the host exposes them, the user reopens them, or the user provides an authorized export/archive.

Never invent missing chats, turns, dates, titles, or assistant responses.

## Privacy and scope

Store conversations only in the authorized LeeWay vault. Do not copy unrelated personal data simply because filesystem access exists.

The preferred local location is:

`<LEEWAY_ROOT>/ToolGateway/runtime/conversation-vault`

## Runtime path

When available:

`message ingress → governed response → conversation append → hash → index → receipt → future Context Engineering retrieval`

The Conversation Vault complements Memory/Continuity. It does not replace Formula Governance, Veritas, or receipt authority.
