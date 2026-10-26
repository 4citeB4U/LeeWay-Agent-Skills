---
name: leeway-automation-fabric
description: Govern and integrate LeeWay automation across Runtime Fabric, Formula F8, n8n, Home Assistant, Device Bridge, agents/workers and future robotics without making any provider the authority.
---

# LeeWay Automation Fabric

Use this skill when designing, integrating, executing or verifying LeeWay automation.

## Authority

LeeWay Automation Harness is the domain authority. Runtime Fabric owns execution lifecycle/adapters. Formula governs eligibility/routing/automation state. External engines are replaceable providers.

## Provider roles

- native Runtime Fabric automation: canonical durable jobs/schedules/queues
- n8n: deterministic workflow provider
- Home Assistant: environment/device aggregation provider
- Device Bridge: physical device capability authority
- robotics adapters: future physical actuation/sensing routes

## Default route

1. Normalize intent/event/schedule.
2. Recover current state/context.
3. Resolve authorization.
4. Apply Formula governance/automation gates when materially required.
5. Select the minimum qualified automation adapter.
6. Execute.
7. Observe post-state.
8. Run Veritas.
9. Write receipt.
10. Promote repeated verified procedures into deterministic skills/workflows.

## No-LLM preference

Prefer deterministic rules, Formula, verified skills and workflow engines. Use lightweight ML/LoRA for learned classification/routing when evidence supports it. Escalate to an LLM only for ambiguity, novel planning or semantic synthesis that deterministic capability cannot close.

## Physical actions

For Device Bridge/Home Assistant/robotics, API success is not physical proof. Require fresh device/sensor state where observable. Fail closed when authorization, safe operating bounds or post-state proof is missing.

## Formula boundary

F8 currently has a documented empty-condition policy gap. Never infer zero-condition automation as safe.

Domain Formula adapters must use calibrated measurements and the centralized evaluator. No invented Q69 state.

## Device capability projection

Agent Lee SHALL resolve physical-device intents through the canonical Device Bridge provider registry rather than calling vendor protocols directly.

Current projected families:

- `device.bluetooth.list-bonded` — VERIFIED on the qualified Android phone path; discovery does not imply control.
- `device.network.discover` — VERIFIED phone-local SSDP + DNS-SD/mDNS discovery; observation only until a qualified actuation route exists.
- Home Assistant — contract promoted and source-qualified; live instance remains UNVERIFIED until configured and observed.
- Matter/Thread — wrapper implemented; qualified controller/provider still required.
- MQTT — wrapper implemented; broker/client transport still required.
- Tesla — wrapper implemented; owner-authorized live transport and vehicle qualification still required.
- Drone — wrapper implemented; owner-authorized SDK/bridge and physical flight qualification still required.
- Robot — wrapper implemented; owner-authorized transport and physical actuation qualification still required.
- Appliance — normalized washer/dryer/refrigerator/lawn-equipment wrapper implemented; resolves through Home Assistant, Matter/Thread, MQTT, LAN, Bluetooth or a qualified vendor adapter.

Provider selection law:

1. exact registered device/provider binding;
2. healthy local verified capability;
3. Home Assistant binding;
4. direct qualified protocol adapter;
5. approved deterministic workflow for compound automation;
6. provider-specific remote route;
7. BLOCKED when no authorized verified route exists.

Do not promote `configured`, `supported`, or `API accepted` to physical success. Consequential actuation requires explicit owner authority plus fresh post-state observation where the device exposes it.

## RTC / voice boundary

Realtime communication transport is not voice identity. LeeWay Live owns RTC/session transport; LeeWay Voice Fabric owns Agent Lee speech identity, queueing, interruption and provider routing. Edge RTC is a donor/evidence estate until its transport and voice behaviors are promoted through equivalence tests into those canonical authorities.

## Phase 4 deterministic automation runtime

Canonical durable automation execution lives in `4citeB4U/Leeway-Runtime-Fabric/automation-runtime`.

Promoted frontend identities:

- `scheduler-mcp` -> Runtime Fabric scheduler frontend alias.
- `leeway-scheduling` -> Runtime Fabric scheduler frontend alias.
- `leeway-planner` -> Runtime Fabric deterministic plan normalizer.

These names are discovery/orchestration surfaces, not separate automation authorities.

Canonical execution model:

```text
typed event
→ deterministic ECA guard
→ authority/context gate
→ canonical Formula F8 decision/receipt
→ durable scheduler / persistent workplane
→ registered workflow or task handler
→ execution
→ verification
→ Veritas
→ automation receipt
```

The Runtime Fabric may implement min-heap due ordering, persisted schedule state, deterministic guard predicates, retries, checkpoints and event-source normalization. It SHALL NOT locally invent F8 mathematics or Q69 state.

### Event-source families

Normalized event sources include:

- schedule
- condition
- device
- webhook
- runtime
- provider
- calendar
- filesystem
- git
- telemetry

### Automation knowledge domains

The Automation Fabric SHALL be capable of projecting workflows across:

- communications and calendar dispatch;
- media generation/publishing;
- freight/field operations;
- system health/SRE;
- file/asset distribution and reporting;
- physical-device automation through Device Bridge.

Domain breadth does not grant authority. HIGH/CRITICAL actions remain behind dedicated policies, Formula admission, authorization and post-state verification.

### Formula feedback loop

Measured automation evidence is staged through the candidate Formula mapping `automation-runtime-state-v0` using six ordered dimensions:

1. trigger_integrity
2. guard_determinism
3. authority_integrity
4. schedule_queue_stability
5. execution_verification
6. recovery_provider_health

Numeric Formula evaluation remains blocked until calibrated ranges and the required comparable observation window exist.

### Promotion law

Candidate automation knowledge is promoted only after:

```text
candidate
→ authority mapping
→ source implementation
→ source/runtime test
→ measured calibration where numeric
→ Formula evaluation
→ Veritas
→ receipt
→ deterministic skill/workflow promotion
```

Do not promote fixed timing constants, mock device success, provider ACKs, locally invented F8 equations, or automatic privileged remediation as canonical truth.

## External developer boundary

Automation Fabric may be consumed independently through its contracts. Consumers do not need Agent Lee or the full Sensory Harness.
