---
name: leeway-skill-lifecycle-governance
description: Governs how LeeWay skills emerge, combine, cool down, remain available, deprecate, retire, and return. Separates activation priority from verified mastery so rare-but-critical skills are never erased merely because they are seldom used. New skills must earn promotion through provenance, evaluation and receipts.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  mode: always-on-capability-governance
  stage: pre-capability-routing
  compatibility: Agent Skills / GitHub Copilot / Codex / MCP / OpenCode / Hermes
---

# LeeWay Skill Lifecycle Governance

## Core law

A living skill system must change without developing amnesia.

Usage frequency is not the same as importance. A rarely used safety, recovery, security, legal, quantum, or disaster capability may remain mission-critical.

Therefore LeeWay separates:

- `MASTERY` — verified capability quality;
- `ACTIVATION_PRIORITY` — how likely the skill should be loaded now;
- `CRITICALITY` — consequence of not having the skill;
- `RECENCY` — how current the underlying technology/source is;
- `EVIDENCE_QUALITY` — how strongly the skill is supported;
- `COMPATIBILITY` — whether the current runtime can execute it.

Do not lower mastery merely because a skill has not been used recently.

## Lifecycle states

Use explicit states:

- `CORE_ALWAYS_ON` — constitutional LeeWay skills; never decay by inactivity.
- `ACTIVE` — currently relevant and recently verified.
- `WARM` — valid and useful, but not currently preferred.
- `DORMANT` — retained but normally not loaded unless triggered.
- `CANDIDATE` — newly discovered capability under evaluation.
- `SANDBOXED` — candidate being tested in controlled conditions.
- `VERIFIED` — evidence supports use; not necessarily default.
- `PROMOTED` — approved into the governed registry.
- `DEPRECATED` — superseded; retained for compatibility/reference.
- `RETIRED` — no longer routable by default; provenance retained.
- `QUARANTINED` — unsafe, unverified, contradictory, compromised or license/provenance blocked.

## Cooling / degradation law

Degradation means reduced activation priority or cache residency, not knowledge deletion.

A skill may move:

`ACTIVE → WARM → DORMANT`

when it has low task relevance, high replacement quality, stale dependencies, or sustained non-use.

Do not decay these solely from non-use:

- constitutional/always-on governance;
- safety/security/recovery;
- critical infrastructure;
- compliance/legal authority skills;
- disaster/failover skills;
- skills explicitly pinned by Creator/Human Authority.

A dormant skill can return immediately when task evidence activates it.

## Emerging-skill pipeline

New technology must not become authority just because it is fashionable.

Use:

`DISCOVER → SOURCE → PROVENANCE → COMPATIBILITY → SANDBOX → BENCHMARK → VERITAS → RECEIPT → PROMOTE`

For each emerging skill preserve when available:

- technology/project identity;
- source repository/spec/publication;
- license;
- version/commit/release;
- maintenance activity/recency;
- security/trust boundary;
- runtime dependencies;
- overlap with existing skills;
- benchmark/acceptance criteria;
- failure modes;
- promotion decision and receipt.

Unverified emerging skills remain `CANDIDATE` or `SANDBOXED`.

## Skill composition law

Complex missions should compose the smallest sufficient skill graph, not activate the entire library.

Composition procedure:

1. Context Engineering defines the task state.
2. Formula Governance constrains policy/action/routing.
3. Build a capability dependency graph.
4. Select the minimum sufficient set of skills.
5. Respect prerequisites and ordering.
6. Prefer proven complementary skills over redundant overlapping skills.
7. Execute with shared provenance and a common receipt/correlation boundary.
8. Evaluate whether the combination outperformed the individual skills.
9. Promote successful combinations as workflow/procedural evidence only after verification.

Possible composition relationships:

- `requires`
- `supports`
- `verifies`
- `criticizes`
- `fallback_for`
- `supersedes`
- `conflicts_with`
- `quantum_accelerable`
- `classical_fallback`

## Anti-bloat law

The skill registry may grow indefinitely, but the active working set should remain compact.

Prefer:

`large persistent library + small evidence-selected active set`

over
`load everything every turn`.

This preserves speed, context quality and authority boundaries.

## Revalidation

Revalidate a skill when material dependencies, standards, APIs, hardware models, security posture, licenses or upstream behavior change.

Staleness should reduce confidence/priority until revalidated; it must not silently rewrite historical receipts.

## Learning boundary

Only verified execution outcomes may change lifecycle state or mastery.

Model confidence, popularity, narrative claims, star counts, download counts or frequency of mention are discovery signals, not proof of capability.
