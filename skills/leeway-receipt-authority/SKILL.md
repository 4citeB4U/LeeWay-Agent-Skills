---
name: leeway-receipt-authority

description: Canonical evidence and receipt authority for LeeWay skill/tool execution, binding what was requested, authorized, executed, measured, verified, failed, or blocked without fabricating events.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards

  mode: evidence-receipt-authority

  stage: post-veritas

---

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

# LeeWay Receipt Authority

## Law

A receipt records only what happened. RECEIPT NOT CREATED is the correct state when no receipt was actually emitted.

## Minimum binding

Preserve task/acceptance gate, authority, capability/skill/tool identity, source/version/hash when material, pre-state, execution identity, result, Veritas state, evidence references, unresolved blockers, and timestamp where available.

## Privacy

Minimize sensitive payloads; prefer hashes/metadata when content itself is not required evidence.

## Composition

Receives Veritas output; provides inspectable evidence to Continuity, Capability Resilience, audits, and Learning Ledger.
