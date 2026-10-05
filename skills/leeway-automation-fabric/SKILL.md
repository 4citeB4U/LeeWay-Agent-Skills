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

## External developer boundary

Automation Fabric may be consumed independently through its contracts. Consumers do not need Agent Lee or the full Sensory Harness.
