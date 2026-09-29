---
name: leeway-secondary-workstation
description: Governed failover and secondary-workstation architecture for LeeWay using a phone runtime, cloud development compute, Runtime Fabric, Device Bridge and capability-aware routing when the primary PC is unavailable.
---

# LeeWay Secondary Workstation

## Purpose

Prevent a single offline PC from blocking LeeWay development or execution.

The secondary workstation is a composed execution node, not a claim that Android natively becomes Windows.

## Canonical composition

```
Phone UI / Device Bridge
  + Runtime Fabric workplane
  + Git/GitHub
  + cloud dev compute (for example GitHub Codespaces)
  + browser-based VS Code
  + optional Phone Link when the PC is online
  = LeeWay Secondary Workstation
```

## Node roles

### Primary workstation
Desktop Windows node for:
- Windows-only tools
- local Docker Desktop
- VS Code desktop extensions
- heavy local filesystem work
- desktop GPU/CPU workloads
- USB peripherals physically attached to the PC

### Secondary workstation
Phone-centered node for:
- always-on heartbeat
- Device Bridge execution
- browser/GitHub access
- Git operations through authorized cloud/runtime adapters
- Codespaces/browser IDE development
- lightweight local Android execution
- phone-local models/capabilities
- receiving and returning Runtime Fabric workplane jobs
- receipts/checkpoints

### Cloud compute attachment
A cloud dev environment is a capability provider to the secondary workstation. It does not become LeeWay authority.

## Failover rule

A work item requests logical capabilities, never "the PC".

```
job
→ capability requirements
→ node registry
→ authorization
→ health/load
→ eligible node
→ execute
→ Veritas
```

If the primary node disappears:
- preserve workId
- freeze conflicting primary mutations
- re-resolve required capabilities
- dispatch only capabilities supported by the secondary node
- record failover
- return evidence to the same parent mission

## Conversation continuity

Conversation history and project state MUST be sourced from authorized shared stores/connectors, not copied ad hoc between devices.

ChatGPT conversation access, Codex session access and other provider-native conversation histories require an authorized connector/export/API supported by that provider. Do not claim one client can read another client's private conversation store without a real supported bridge.

Shared LeeWay project continuity should instead persist:
- workId
- parentObjectiveId
- checkpoints
- receipts
- repository commits
- current execution cursor
- context summaries
- artifact references

## Phone Link boundary

Phone Link is an interaction/mirroring/file-transfer convenience when a Windows PC is online. It is not the secondary workstation authority and cannot replace the PC when that PC is powered off.

## Docker/cloud boundary

Android does not need local Docker parity. Desktop/container work may route to cloud dev compute through a qualified adapter. GitHub Codespaces is one candidate because it provides browser-accessible dev containers.

## Verification states

- CONTRACT_PORTABLE
- PHONE_RUNTIME_IMPLEMENTED
- CLOUD_DEV_ATTACHED
- WORKPLANE_CONNECTED
- CROSS_NODE_HANDOFF_TESTED
- FAILOVER_VERIFIED

Do not collapse these states.
