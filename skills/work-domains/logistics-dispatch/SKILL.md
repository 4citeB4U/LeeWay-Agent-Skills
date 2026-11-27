---
name: logistics-dispatch
description: Plans governed truck-load chains and dispatch options using supplied or authorized load-board data, equipment, driver location, cost-per-mile, deadhead, appointment, Hours-of-Service, and risk constraints. Use for dispatcher work, lane planning, load comparison, or multi-load route proposals.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  source: LeeWay DISPATCH_LOGISTICS_PACK.md normalized from E-drive capability inventory
  source-skill: logistics.dispatch.triangulate_loads
---

# Logistics Dispatch

## Contract

Never claim live load availability, guaranteed profit, legal HOS compliance, broker acceptance, or booked freight unless the authorized systems returned current evidence and the responsible human approved the action.

Collect truck/equipment, current location and time, driver clocks, operating authority, target region, appointments, rate, loaded and deadhead miles, tolls, fuel, accessorials, probability of reload, and cost-per-mile assumptions. Mark missing fields.

## Workflow

1. Retrieve candidate loads only through an authorized load-board or broker adapter.
2. Normalize origin/destination, pickup/delivery windows, equipment, weight, rate, miles, commodity, and constraints.
3. Reject infeasible equipment, appointment, HOS, authority, or safety combinations.
4. Build candidate chains and calculate loaded miles, deadhead, gross, estimated variable cost, estimated margin, revenue per total mile, and revenue per planned hour.
5. Stress-test delay, detention, cancellation, and reload uncertainty.
6. Present ranked options with assumptions and callouts for human dispatch approval.

Use `deadhead / total miles` for the deadhead ratio. Treat the source pack's 15% target as a preference, not a universal law.

## Evidence

For every proposal preserve quote/load identifiers, observation time, source, calculation inputs, exclusions, HOS data age, adapter state, and whether any booking actually executed.

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
