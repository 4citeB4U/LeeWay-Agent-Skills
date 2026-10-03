# Machine Consciousness → Existing LeeWay Capability Handoff v0

Status: CANONICAL-INTEGRATION-MAP / SOURCE DOCUMENTATION

## Purpose

Define the minimum handoff from LeeWay Machine Consciousness into the capability system that already exists in LeeWay Agent Skills. This document does not create a new registry, dispatcher, orchestrator, Tool Gateway, runtime, Veritas authority or receipt authority.

## Existing ownership

- Machine Consciousness owns cognition state, policy selection and M07 action intent.
- `leeway-universal-capability-kernel` owns the capability manifold model.
- `leeway-skill-orchestrator` owns TASK_CAPABILITY_WEAVE, FOCAL_EXECUTION_SET, VERIFICATION_SET and RECOVERY_SET composition.
- `leeway-tool-gateway` owns the governed tool/runtime boundary.
- domain skills own capability-specific constraints and provider ownership.
- Veritas owns outcome acceptance.
- Receipt Authority owns receipt qualification.
- Learning Ledger receives only verified reusable learning.

## Handoff packet

Machine Consciousness should hand the existing Skill Orchestrator a bounded packet containing:

```json
{
  "source": "leeway-machine-consciousness",
  "cognition_cycle_id": "<id>",
  "cognition_state_hash": "<sha256>",
  "selected_policy": "<policy-id>",
  "action_intent": {},
  "authority_context": {},
  "required_outcome": {},
  "evidence_requirements": [],
  "llm_boundary": {
    "cognition_kernel_llm_required": false,
    "policy_selection_llm_used": false,
    "capability_selection_llm_used": false
  }
}
```

The exact runtime/provider request remains the responsibility of the existing capability owner and Tool Gateway.

## Required route

`Machine Consciousness M07 → Universal Capability Kernel → Skill Orchestrator → FOCAL_EXECUTION_SET → Tool Gateway → existing provider/runtime → Veritas → receipt → governed learning`

## Reuse law

Before adding any new provider or adapter:

1. query the capability manifold;
2. inspect canonical skill/tool ownership;
3. use `leeway-legacy-capability-recovery` when a prior LeeWay product contains a candidate implementation;
4. choose REUSE_CANONICAL or EXTEND_CANONICAL when possible;
5. create new glue only when no governed handoff already exists;
6. never duplicate Voice Fabric, Device Bridge, Formula, Runtime Fabric, Veritas, Receipt Authority or governance.

## MC-G11 proof

The scientific acceptance protocol is owned by:
`4citeB4U/Leeway-formula-live/docs/machine-consciousness/11-ECOSYSTEM-CAPABILITY-INTEGRATION-PROOF-v0.md`

The first preferred real capability is the existing Device Bridge calculator-control path because prior qualified evidence exists and the observable result is deterministic.

## Evidence state

This document proves only the intended handoff and authority ownership. It does not prove the end-to-end runtime executed.
