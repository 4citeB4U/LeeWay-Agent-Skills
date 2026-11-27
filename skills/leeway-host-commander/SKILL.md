---

name: leeway-host-commander

description: Governed native-host fallback capability contract for filesystem, terminal, process, service, diagnostics, hashing, and host inspection when external commander providers are unavailable. Defines authority and qualification; does not claim an executor exists.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards > Root of Trust

  mode: host-capability-fallback-contract

  stage: capability-resilience-provider

---

# LeeWay Host Commander

## Purpose

Provide a canonical LeeWay capability contract for host operations so Desktop Commander or another external provider is not the capability identity.

## Abstract capabilities

files.list/read/write/search/hash; terminal.execute; process.inspect; service.inspect/operate; diagnostics; logs. Exact availability is adapter/runtime dependent.

## Provider preference

Use the safest proven authorized provider: deterministic native OS capability (PowerShell preferred for Windows host engineering), LeeWay native adapter, or authorized external provider. Provider selection belongs to Capability Resilience/Skill Orchestrator.

## Truth boundary

This skill does not prove a live host executor. CONFIGURED/PRESENT capability contracts remain unexecuted until an adapter/runtime returns evidence.

## Completion

If a provider fails, isolate the lost abstract capability, choose/qualify fallback, execute, Veritas-check, receipt, and resume the parent mission.

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
