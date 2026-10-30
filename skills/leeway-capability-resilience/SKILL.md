---
name: leeway-capability-resilience
description: Governed capability resilience and sovereignty layer for LeeWay Agent Skills. Tracks required capabilities, providers, external dependencies, fallback routes, capability debt, observed failures, and promotion candidates so loss of an MCP/tool/provider does not automatically terminate the parent mission.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  mode: capability-resilience
  stage: post-operating-loop-pre-capability-dispatch
  capability-kernel: skills/leeway-universal-capability-kernel/SKILL.md
  factory: skills/leeway-skill-factory/SKILL.md
  lifecycle: skills/leeway-skill-lifecycle-governance/SKILL.md
  gateway: skills/leeway-tool-gateway/SKILL.md
---

# LeeWay Capability Resilience

## Purpose

Make capability availability resilient without creating duplicate LeeWay authorities.

A repeatedly required external MCP, tool, runtime, model, API, adapter or service is a dependency. LeeWay must know what capability it provides, what depends on it, what alternatives exist, what fails when it disappears, and when a LeeWay-owned fallback or replacement is justified.

## Capability graph

Track relationships using at least:

- NEEDS
- PROVIDES
- DEPENDS_ON
- FALLBACK_FOR
- REPLACES
- EXTENDS
- COMPOSES_WITH
- GOVERNS
- EXECUTES
- VERIFIES
- LEARNS_FROM

A provider is not the capability itself.

Example:

`filesystem.read ← provided by Desktop Commander / Host Commander / native PowerShell`

Loss of one provider must not be promoted into loss of the abstract capability until alternatives are evaluated.

## Required provider state

For a material capability/provider relationship track:

- capability id;
- provider id and type;
- authority source;
- current availability;
- authorization;
- health;
- last verified execution;
- recurrence/demand;
- criticality;
- failure impact;
- fallback providers;
- coverage gaps;
- portability;
- security boundary;
- ownership state: EXTERNAL | ADAPTED | LEEWAY_NATIVE;
- evidence references.

## Capability debt

Create capability debt when an external dependency is repeatedly necessary and its absence materially threatens LeeWay completion.

A debt record should identify:

`capability → external dependency → recurrence → criticality → failure impact → native coverage → fallback quality → proposed action → evidence state`

Capability debt is evidence for evaluation, not automatic permission to clone an external system.

## Resilience decision

When a provider is unavailable:

`required capability → enumerate providers → verify authority/health → select authorized fallback → execute/qualify → record evidence`

If no sufficient provider exists:

`gap → compose existing primitives? → extend canonical owner? → create adapter? → create skill/MCP/native capability? → qualify → register → resume parent mission`

Use `leeway-skill-factory` and `leeway-skill-lifecycle-governance` for new or sourced skills. After qualification, re-enumerate through `leeway-universal-capability-kernel` and return control to `leeway-agent-operating-loop` so the original acceptance gate resumes. Use the Universal Capability Kernel for cross-capability composition and routing.

## Capability sovereignty law

When recurrence, criticality, failure impact, security, economics, portability or availability justify ownership, evaluate a governed LeeWay-native capability.

Possible decisions:

- USE_EXISTING
- COMPOSE_EXISTING
- EXTEND_CANONICAL
- ADAPT_EXTERNAL
- CREATE_ADAPTER
- CREATE_SKILL
- CREATE_MCP
- CREATE_NATIVE_CAPABILITY
- PROMOTE_NATIVE
- RETAIN_EXTERNAL
- DEPRECATE
- BLOCKED_BY_AUTHORITY

These are governance decision classes, not fabricated outputs from the canonical Formula evaluator. If Formula is actually executed, preserve its real decision/version/hash separately.

## Desktop Commander pattern

Desktop Commander is a provider, not sovereign capability identity.

If unavailable, determine which abstract capabilities are actually needed (filesystem, terminal, process, diagnostics, service management, hashing, etc.), then evaluate authorized alternatives.

A temporary fallback may restore execution. Repeated dependency/failure should raise capability debt and may justify LeeWay Host Commander or another governed native provider.

## Digital Brain / Cognitive Fabric handoff

Publish capability/provider relationships and evidence states so the Cognitive Fabric can show:

- what Agent Lee needs;
- what currently provides it;
- provider health;
- dependencies;
- fallback providers;
- coverage gaps;
- capability debt;
- promotion state.

Do not invent numeric coverage scores without measured evidence.

## Mandatory probes

At provider failure, promotion review, or capability-gap discovery ask:

1. What capability did we actually lose?
2. What are we not discovering about alternate providers or native primitives?
3. What needs to be enhanced so this dependency is not a single point of failure?
4. What authorized route resumes the parent acceptance gate?

## Final law

External dependency failure is a routing event before it is a mission failure.

Preserve the parent objective. Select an authorized fallback when one exists. Build the missing bridge only when governance justifies it. Qualify it. Register it. Resume the mission.


## Creator-directed repair and immediate-learning rule (2026-10-30 candidate)

**Case:** An existing Runtime workplane required `LEEWAY_WORKPLANE_CONTROL_TOKEN`. The historical issuer and credential could not be proven. Repeated recovery/blockage advice omitted the feasible alternative: Creator-authorized enrollment of a compatible replacement using the *existing* manager contract. A second failure followed when the agent drafted a skill and asked the Creator to relay it instead of directly applying the approved change through an available authorized repository tool.

**Mandatory behavior for every worker and PRIME:**

1. **Recover → repair → replace → verify.** When recovery is exhausted, proactively enumerate in-place repair, compatible replacement, rebinding and reconstruction of the *failed dependency*, including the evidence needed for each. Never infer that absence of an old key implies inability to provision a new authorized key.
2. **Respect the actual authority boundary.** Replacing a credential, trust anchor, issuer, or protected binding is consequential. Obtain explicit Creator or delegated approval with exact scope, verify canonical target and rollback, preserve existing security controls and prevent secret disclosure. Permission to replace a scoped credential is not permission to replace the Root of Trust or bypass Veritas.
3. **Act on approved learning immediately.** If the Creator authorizes a correction to a canonical skill and a permitted write adapter exists, inspect the actual owning skill, current claims, source SHA and standards; apply the smallest nonconflicting change on a review branch, inspect readback, run applicable tests and open the existing review/handoff path. Do **not** convert an executable request into a prompt for another worker merely out of habit.
4. **If direct application is blocked**, identify the exact missing permission, adapter, conflicting claim or independent-review requirement. A proposed draft is not installation; a committed branch is not promotion; a merged skill is not proof that all 18 running workers reloaded it.
5. **Escalation contract:** worker → W00/PRIME → Creator when scope exceeds existing grants. Present failure, recoverability, repair/replace option, risks, acceptance tests and rollback in the *same* escalation. Continue other authorized work in parallel.
6. **Verification:** test missing-credential replacement proposals, obsolete endpoint rebinding, unavailable-provider fallback, authorization denial, rollback and direct-application routing. W16 reviews security; W17 independently audits evidence. Record eligible outcomes in the existing Receipt Authority and Learning Ledger only after actual admission.

**Two explicit anti-patterns:** `AUTHORITY_NOT_PROVEN → permanent dead end` and `CREATOR_APPROVED_CHANGE → draft-only prompt handoff`.

**Truth boundary:** This skill text is a source candidate until review, tests and promotion. No token issuance, manager restart, live reload, Veritas PASS, receipt or Learning Ledger admission is implied.
