---
name: skillui
description: Governed LeeWay adapter for SkillUI, a CLI that statically extracts design systems from websites, repositories, or local codebases and can generate Agent Skill artifacts.
metadata:
  source-type: tool-adapter
  canonical: amaancoderx/npxskillui
---
# SkillUI Adapter
Canonical source: `amaancoderx/npxskillui` on `main`.

SkillUI is an execution tool, not a canonical upstream `SKILL.md` pack. Use it when a task requires extracting colors, typography, spacing, components, animation patterns, or a reusable design-system skill from an existing site or codebase.

Execution contract:
1. Prefer an already-installed `skillui` executable; do not install packages without authorization.
2. Verify Node.js/runtime prerequisites before execution.
3. Default to static analysis. Use its Playwright-backed ultra mode only when browser execution is authorized and available.
4. Treat generated `SKILL.md`, screenshots, and design tokens as generated evidence, not proof of visual equivalence.
5. Validate the generated artifact against the source before promotion.

State: `REFERENCE_ADAPTER` until the tool is actually available and executed.

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
