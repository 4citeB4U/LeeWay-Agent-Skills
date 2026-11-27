---
name: leeway-skill-factory
description: Governed intake, normalization, deduplication, validation, promotion, and retirement workflow for skills, MCP tools, and adapters discovered across LeeWay repositories and authorized hosts. Use when bringing drive, repository, plugin, MCP, or tool capabilities into the canonical 4citeB4U/LeeWay-Agent-Skills authority without confusing files with live executors.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  mode: governed-capability-promotion
  repository: 4citeB4U/LeeWay-Agent-Skills
  inventory: config/leeway-capability-universe.json
  lifecycle: skills/leeway-skill-lifecycle-governance/SKILL.md
  kernel: skills/leeway-universal-capability-kernel/SKILL.md
---

# LeeWay Skill Factory

## Purpose

The factory converts discovered capability material into canonical, portable, tested LeeWay assets. It does not bulk-copy directories and it does not call a package, configuration file, prompt, or generated stub a live MCP.

## Intake states

Every candidate occupies exactly one state:

`DISCOVERED → TRIAGED → NORMALIZED → VALIDATED → PROMOTED`

Alternate terminal states are `DUPLICATE`, `CONFLICTING`, `BLOCKED`, `QUARANTINED`, `DEPRECATED`, and `RETIRED`.

Record separately:

- source path or repository and observed revision;
- content identity or hash when available;
- capability class: `SKILL | MCP_SERVER | MCP_TOOL | ADAPTER | CONTRACT | GENERATED_STUB`;
- authority conflicts and hard-coded host assumptions;
- dependency and secret requirements;
- validation command and result;
- runtime health evidence, if any.

## Promotion workflow

1. Verify the canonical repository and current authority before changes.
2. Inventory sources read-only. Never infer live status from a filename or registry entry.
3. Deduplicate by semantics and content identity, not only by folder name.
4. Reject or repair instructions that claim higher authority than Creator/Human Authority or LeeWay Standards.
5. Remove machine-specific paths from portable skills; place host bindings behind the Tool Gateway.
6. Normalize skills to valid `SKILL.md` frontmatter and concise procedural instructions.
7. Give MCP tools deterministic schemas, explicit evidence boundaries, input validation, and tests.
8. Run the smallest relevant build, unit, protocol, and health checks.
9. Commit to a review branch with receipts. Promote to `main` only after required checks are trustworthy.

## Truth law

Use these distinctions:

- `PRESENT` means an artifact exists.
- `CONFIGURED` means a registry or configuration names it.
- `BUILT` means compilation/package construction passed.
- `PROTOCOL_VERIFIED` means an MCP handshake/list/call path passed.
- `LIVE` means a currently reachable executor returned fresh health evidence.
- `VERIFIED` means the requested behavior passed an applicable test with inspectable evidence.

No lower state implies a higher one.

## Capability-universe rule

The capability universe is a governed inventory, not a monolithic runtime. Keep all verified metadata eligible for routing through the Universal Capability Kernel, but activate only the smallest task-relevant execution weave.

Update `config/leeway-capability-universe.json` when a discovery or promotion materially changes the known inventory.

## Receipts

A promotion receipt should bind source, destination, commit, validation commands, outcomes, unresolved risks, and whether the artifact is merely portable or actually live on a host.

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
