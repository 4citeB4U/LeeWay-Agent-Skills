---

name: leeway-skill-orchestrator

description: Graph-based orchestration layer that composes LeeWay skills and tool capabilities into an Ambient Capability Field, Task Capability Weave, and bounded Focal Execution Set. Connects skills by primitives, requirements, support, verification, fallback, conflict, transfer, and tool ownership without making MCPs the center of the architecture.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards

  mode: graph-skill-orchestration

  stage: post-resilience-pre-focal-execution

  kernel: skills/leeway-universal-capability-kernel/SKILL.md

  resilience: skills/leeway-capability-resilience/SKILL.md

  gateway: skills/leeway-tool-gateway/SKILL.md

  lifecycle: skills/leeway-skill-lifecycle-governance/SKILL.md

---

# LeeWay Skill Orchestrator

## Purpose

Turn the governed skill/tool universe into one coordinated capability organism. The Universal Capability Kernel defines the capability-manifold model; this skill operationalizes graph construction, composition, ownership, prerequisites, verification, and focal execution selection.

## Skill/tool graph

Every governed node should declare or derive when evidence permits: PROVIDES, REQUIRES, SUPPORTS, USES_TOOL, TOOL_OWNED_BY, VERIFIES, FALLBACK_FOR, CONFLICTS_WITH, SUPERSEDES, SHARES_PRIMITIVE_WITH, TRANSFERS_PATTERN_TO, OUTPUTS_TO, INPUTS_FROM.

MCP is only one possible provider type. Prefer abstract capability identity over provider identity.

## Orchestration levels

1. CONSTITUTIONAL_CORE — always-on identity/governance.

2. AMBIENT_CAPABILITY_FIELD — lightweight metadata/primitives for every verified skill/tool.

3. TASK_CAPABILITY_WEAVE — all materially useful skills/primitives for the current objective.

4. FOCAL_EXECUTION_SET — only skills/tools requiring full instructions or execution.

5. VERIFICATION_SET — independent skills/tools required to test/criticize/verify.

6. RECOVERY_SET — fallbacks/rollback/repair capabilities if focal execution fails.

A substantive plan is incomplete if it identifies execution but no applicable verification/recovery path.

## Formula/context probes

For each task weave and each material node ask:

1. What are we not discovering?

2. What needs enhancement?

3. What skill is missing?

4. What tool is missing?

5. What orchestration level is missing?

6. What execution level is missing?

7. What other skills can compose with this skill?

8. How does this skill connect upstream/downstream?

9. Which tools does it own/use, and which skill governs each tool?

10. Which verifier and recovery capability closes the loop?

Feed discoveries back through Capability Resilience / Skill Factory rather than silently leaving graph holes.

## Composition procedure

intent → acceptance gate → context/formula → capability demand → graph query → task weave → resolve dependencies/conflicts → focal execution set → verification set → recovery set → execute → verify → evidence → learn

When multiple skills share a primitive, compose at the primitive level where possible rather than loading redundant full instructions.

When a tool lacks a governing skill owner, classify it ORPHAN_TOOL until assigned, wrapped, deprecated, or quarantined.

When a registry skill path has no canonical artifact, classify it REGISTRY_DRIFT; do not count it as a verified live skill.

## Execution truth

listed != governed; governed != executable; executable != executed; executed != verified.

Tool presence in source is not proof of runtime availability.

## Output

For audits, produce a graph/matrix with canonical skills, tools/resources, ownership, relationships, gaps, duplicates/conflicts, missing skills/tools, missing orchestration/execution/verification/recovery levels, proposed compositions, and evidence state. For ordinary tasks, use the graph silently and expose only the materially useful weave.

## Verification and recovery closure

Build VERIFICATION_SET using `leeway-veritas` and domain-specific verifiers. After verification route evidence through `leeway-receipt-authority`, then admit only verified learning through `leeway-learning-ledger`. Build RECOVERY_SET using `leeway-capability-resilience`, `leeway-host-commander`, device/platform fallbacks, rollback skills, or domain recovery capabilities as applicable.


## Parallel execution handoff

When the TASK_CAPABILITY_WEAVE contains independent work units, hand bounded jobs to `leeway-parallel-workplane`. The parent retains conversation, authority, acceptance gate and merge responsibility. Serialize conflicting canonical mutations.
