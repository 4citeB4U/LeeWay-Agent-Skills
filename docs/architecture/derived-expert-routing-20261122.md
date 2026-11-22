<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.DERIVED_EXPERT_ROUTING
TAG: LEEWAY.AGENT_SKILLS.DERIVED_EXPERT_ROUTING.ARCHITECTURE.20261122
5WH:
WHAT = Compile the original LeeWay Agent Skills into a small source-derived expert routing projection.
WHY = Let deterministic Machine Consciousness ask for a few relevant skills without copying all skill text or granting model authority.
WHO = Creator and existing Agent Skills authority; GPT-6 outside support, not Agent Lee.
WHERE = docs/architecture/derived-expert-routing-20261122.md.
WHEN = 2026-11-22.
HOW = Reuse existing Kernel, Orchestrator, Skill Factory, Runtime Workplane, Tool Gateway, Formula, independent Veritas and Continuum.
LICENSE = Existing repository terms unchanged.
-->
# Derived expert routing — source adapter, not a new brain or skill registry

## What this is

The existing `skills/leeway-universal-capability-kernel/SKILL.md` already defines the always-on **Ambient Capability Field**, broader **Task Capability Weave**, and minimal **Focal Execution Set**. The existing `skills/leeway-skill-orchestrator/SKILL.md` owns actual selection and skill/tool graph composition. Original `mcp-server/src/index.ts` already discovers portable `skills/**/SKILL.md` recursively and combines older `scripts/skills-registry.json` entries for MCP discovery. The older registry reports 44 entries from an earlier point in time and does **not** authoritatively represent current runtime deployments. The historical `config/leeway-capability-universe.json` explicitly says `HISTORICAL_INVENTORY_NOT_RUNTIME_BINDING`.

New `sdk/derived-skill-expert-routing.js` provides an **optional disposable metadata-only projection** from existing local `SKILL.md` files. Nothing is copied into a new canonical authority, no duplicate skill/agent/provider registry is introduced, and no runtime MCP endpoint or worker is created. A generated JSON cache is ephemeral, source-hash pinned, and can be rebuilt from the original source files at any authorized time.

**It is not a neural Mixture-of-Experts router.** The 'experts' are skills and procedures, not parameter tensors. A metadata match is a recommendation, not a model confidence, safety approval, working provider, or skill grant.

## Compilation and scoring

Original `SKILL.md` frontmatter fields:
- Already common: `name`, `description`, `license`, and `metadata`.
- Supported *optional source-authored additions*: `domain`, `tags`, `triggers`, `intents`, `requires`/`dependencies`, `conflicts`/`conflicts_with`, and integer `priority` 0–5.
- Missing optional metadata stays missing or defaults to zero; a keyword inferred from a description is a **lexical index signal**, never a claimed trained expert, certification or execution permission.
- Canonical skill ID is its portable path under `skills/`; a sha256 of the exact `SKILL.md` binds the source file. A deliberately bounded recursive scan skips symbolic links and binary/non-skill files.
- Candidate scores are deterministic bounded keyword/trigger overlap, not fabricated probability. Exact paths, explicit conflicts, stable ID sorting, and hard `topK <= 8` prevent route churn. Existing Skill Orchestrator must still resolve dependencies, lifecycle status, actual provider and grants. A conflict/tie requires that existing owner, never the model, to make the consequential choice.
- Hydration plans contain only pinned `SKILL.md` relative paths, source hashes and byte budgets. The module **does not read selected source again into an active LLM context** and does not inject instructions or execute. Original Runtime + Skill Orchestrator must check owner-scoped authorization and reverify the selected file hash before actual hydration.

## Correct consciousness-first execution path

`Creator → Agent Lee → single Machine Consciousness → Formula → Original Skill Orchestrator [compiled metadata Top-K] → Original Runtime/Tool Gateway authorized instruction hydrate → existing worker/Device Bridge → physical post-state → independent Veritas → Receipt Authority → Continuum readback → eligible Learning Ledger`.

Model Hub's three compact Qwen candidates cooperate as **optional** signal/critique/teaching providers to Machine Consciousness:
- 0.6B suggests normalized intent and skill IDs with source references;
- 1.7B evaluates worker/tool plan completeness and report clarity;
- 0.8B inspects **actually authorized and delivered** visual context when its image backend is qualified.

They do not own the loop, decide permissions, actuate tools, verify themselves, create independent employees, or silently become the Machine Consciousness substrate. A deterministic native task should still execute when no LLM is loaded, provided a qualified worker and original policy allow it.

## Sample source-only commands

```bash
node --test tests/derived-skill-expert-routing.test.mjs
node scripts/compile-derived-skill-experts.mjs --query "source infographic validation" --top-k 3
node scripts/compile-derived-skill-experts.mjs --output .ci/experts-map.generated.json --query "skill governance verification" --top-k 3
```

The optional output path is explicit, relative to the checked-out source, not a hardcoded host/drive identity. The CLI will not overwrite an existing map automatically. The checked-out source SHA and actual skill hashes are readback evidence for index freshness only. For a larger production index, incremental compilation/caching can be built into the **original** Skill Orchestrator after source-owner review, rather than making this source utility a new runtime process.

## Continuous improvement with evidence and context limits

The Creator's three-hour ecosystem inspection objective must be scheduled by the **existing Runtime persistent workplane**, not by this CLI or a model. Every inspection can compare actual native worker failures/coverage, source revisions and approved skill outcomes, run deterministic held-out routing evaluations, and ask the Qwen support group to critique **only the affected cases**. Machine Consciousness chooses whether to route to an existing worker, request fallback via Capability Resilience, or propose a qualified new skill via Skill Factory. Independent Veritas alone determines physical correctness; Receipt Authority, Continuum and Learning Ledger govern long-term eligibility.

Benchmark retrieval precision@K/recall@K against hand-labeled Creator tasks, conflict resolution, coverage, context bytes, blocked private skills, task success after real execution, latency, memory use and negative-case safety. Do not equate 238 skill files with 238 authorized workers, and do not claim skills add 16B worth of neural parameters. The 16B-like operational performance target is a **measured functional comparison**, not a numerical identity.

## Current stage and safety

This source-only PR contains the compiler, a deterministic metadata ranker, source-hash/budget constrained hydration *plan*, CLI, synthetic plus canonical source tests and CI. It has NO live runtime binding, actual authorized hydration, model inference, persistent scheduler, independent Veritas event or canonical production receipt. `SKILL.md` files, old registry, upstream MCP, Kernel and Orchestrator are **untouched**. Rebuild the derived map on source change; reject stale hashes and keep out-of-band review decisions in the actual original owner. Rollback: close isolated draft PR. No additional paid infrastructure required.
