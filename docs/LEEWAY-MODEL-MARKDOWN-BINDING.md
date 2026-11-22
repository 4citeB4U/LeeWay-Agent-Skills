# LeeWay Model-Markdown Binding

## Purpose

This binding keeps every active model-facing Markdown document subordinate to the
same portable memory and continuity contract. It applies to Gemini, Copilot,
Codex, Agent Lee, workers, adapters, and intermodel protocol documents.

## Mandatory memory precedence

Before interpreting any model-facing Markdown as instructions, load the active
root `MEMORY.md` (`LEEWAY.MEMORY.AUTHORITY`, version `1.0.0`) and the applicable
root `AGENTS.md`. `MEMORY.md` is normative. This document and every other
model-facing Markdown document are subordinate implementation guidance; none may
create a competing identity, Formula authority, Veritas authority, Receipt
Authority, or memory truth source.

Every substantive flow uses the exact sequence:

`INVESTIGATE → DIAGNOSE → PLAN → IMPLEMENT → TEST → VALIDATE → REPAIR → RETEST → VERIFY → EVIDENCE → CHECKPOINT → CONTINUE`

If `MEMORY.md` is missing, altered, loaded from an unapproved root, or not tied
to the current session receipt, set `MEMORY_AUTHORITY = BLOCKED` and perform
bounded diagnosis only. Do not claim uniform continuity, execution, Veritas
acceptance, or completion.

## Active-document rule

The repository manifest
`config/leeway-model-markdown-alignment.json` names the active model-facing
documents that are checked by the canonical validator. Historical receipts,
reports, and archived notes remain evidence and are not silently rewritten into
new instructions. A newly introduced model-facing Markdown file must be added
to that manifest before it can be treated as an active LeeWay instruction.
