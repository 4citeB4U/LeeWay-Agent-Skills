---
name: leeway-secondary-workstation
description: Build, qualify, recover and route a governed Android secondary workstation for LeeWay or another authorized online LLM/agent using Termux, Desktop Commander Remote MCP, Git/GitHub, Device Bridge and evidence-based failover.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  canonical-device-authority: 4citeB4U/LEEWAY-DEVICE-BRIDGE
  runtime-owner: 4citeB4U/Leeway-Runtime-Fabric
  reference-guide: https://github.com/4citeB4U/LEEWAY-DEVICE-BRIDGE/blob/main/docs/ANDROID-SECONDARY-WORKSTATION.md
  evidence: https://github.com/4citeB4U/LEEWAY-DEVICE-BRIDGE/blob/main/workstation/receipts/latest.json
---

# LeeWay Secondary Workstation

## Purpose

Turn a supported Android phone into a real, independently reachable development/execution node for an authorized online LLM or agent.

The phone does not become Windows and does not gain root by declaration. It becomes a qualified Android/Termux workstation with explicit capabilities, explicit boundaries, boot persistence and receipts.

## Proven reference architecture

Online LLM / Agent -> authenticated Remote MCP -> Desktop Commander Remote device -> Android / Termux app UID -> shell + files + search + Node/npm + Git + HTTPS/OpenSSH -> GitHub / authorized workplane.

Separately, privileged phone capabilities route through LeeWay Device Bridge and its authorized Android-native providers.

Desktop Commander is the workstation execution connection. Device Bridge is the phone/device capability authority. They are complementary and MUST NOT be conflated.

## Canonical reusable assets

- `4citeB4U/LEEWAY-DEVICE-BRIDGE/clients/phone-workstation/bootstrap-desktop-commander.sh`
- `4citeB4U/LEEWAY-DEVICE-BRIDGE/clients/phone-workstation/patch-desktop-commander-android.mjs`
- `4citeB4U/LEEWAY-DEVICE-BRIDGE/docs/ANDROID-SECONDARY-WORKSTATION.md`
- `4citeB4U/LEEWAY-DEVICE-BRIDGE/docs/secondary-workstation-node.json`
- `4citeB4U/LEEWAY-DEVICE-BRIDGE/docs/provider-registry.json`
- `4citeB4U/LEEWAY-DEVICE-BRIDGE/workstation/receipts/latest.json`

## Reference qualification

A physical Samsung Galaxy Z Fold6 running Android 16 / arm64 was qualified with Desktop Commander 0.2.52, Node.js 26.3.1, Git 2.54.0, ripgrep 15.1.0, Termux bash, persistent Remote MCP identity and a Termux boot supervisor.

Observed acceptance included PC-independent execution, USB-independent execution, session self-recovery, full phone power-cycle, automatic reconnect, fresh shell execution and GitHub reachability after cold boot.

That receipt proves the reference phone only. Every other phone must earn its own receipt.

## Build procedure

1. Run the public bootstrap in Termux:

`curl -fsSL https://raw.githubusercontent.com/4citeB4U/LEEWAY-DEVICE-BRIDGE/main/clients/phone-workstation/bootstrap-desktop-commander.sh -o ~/bootstrap-desktop-commander.sh && bash ~/bootstrap-desktop-commander.sh`

2. Run `desktop-commander remote` and complete the provider-owned authentication flow yourself.

Never request, copy into chat, persist in public evidence, or expose passwords, MFA/2FA codes, access tokens, refresh tokens or private pairing secrets.

3. Require a fresh direct ping to the phone node. A stale registry entry is not sufficient.

4. Verify direct execution: Node, Git, ripgrep, architecture, file read/write, content search, local Git commit and outbound repository/network access.

5. Remove the primary PC from the execution path and continue operating the phone node.

6. Physically disconnect USB and run fresh phone-local execution over Remote MCP.

7. Deliberately terminate the phone Remote MCP session. The phone-local supervisor must restore it without PC or USB intervention.

8. Power the phone fully off and back on. Do not manually open Termux or Desktop Commander during the qualification window. Require automatic registration, fresh ping, fresh shell execution and Git/GitHub reachability.

## Acceptance states

- `PRESENT`
- `INSTALLED`
- `PAIRED`
- `REMOTE_REACHABLE`
- `DIRECT_EXECUTION_VERIFIED`
- `USB_INDEPENDENT_VERIFIED`
- `PC_INDEPENDENT_VERIFIED`
- `SESSION_RECOVERY_VERIFIED`
- `COLD_BOOT_VERIFIED`
- `SECONDARY_WORKSTATION_VERIFIED`

No lower state implies a higher state.


## Continuous durability gate

Cold-boot reconnect does not prove indefinite background liveness.

Before claiming ALWAYS_ON or 100-percent durability, additionally require:

- Android/Samsung background restrictions reviewed and the workstation host exempted where appropriate;
- the Remote MCP control plane isolated from heavy media, TTS, model, build or other long-running child workloads;
- no orphaned child processes accumulating in the control-plane runtime;
- a durable foreground-service or equivalent Android-supported keepalive strategy where required;
- a sustained liveness soak test under representative workload;
- recovery verified after process pressure, screen-off/Doze conditions and ordinary app switching.

Voice/media work SHOULD execute in a separate provider/runtime. Do not run experimental TTS engines, PulseAudio stacks, or other heavy audio pipelines inside the same Termux process tree relied upon for Remote MCP availability.

If the node becomes unreachable without an intentional shutdown, classify continuous durability as FAILED/OPEN even when cold-boot reconnect previously passed.

## Control boundary

### Verified workstation control

Within the Termux/Android permission boundary, a qualified Remote MCP client can perform direct ping/health, shell execution, process launch/management supported by the runtime, Termux-accessible file read/write/edit/list, content search, Node.js/npm, Git, HTTPS/curl, OpenSSH tooling, repository operations, local build/test work that fits the phone, session recovery and boot reconnect.

### Not granted by Desktop Commander alone

Do not claim root, protected Android system-service access, another app's private storage, credential/password/MFA extraction, unrestricted notifications, unrestricted camera/microphone, unrestricted Bluetooth/USB/HID, unrestricted screen observation, unrestricted tap/swipe/type, or bypass of Android permissions/user consent.

Those require separately authorized Android-native providers such as LeeWay Device Bridge, and each capability must be qualified independently.

## Device Manager registration

Register the workstation provider as:

- provider: `desktop-commander-android-workstation`
- node: `leeway-phone-workstation`
- boundary: `TERMUX_APP_UID_NON_ROOT`

Logical workstation capabilities:

- `workstation.remote.ping`
- `workstation.shell.execute`
- `workstation.files.read`
- `workstation.files.write`
- `workstation.search`
- `workstation.git.local`
- `workstation.github.network`
- `workstation.session.recover`
- `workstation.boot.reconnect`

Device Manager routes privileged phone operations through Device Bridge, not through an invented expansion of Remote MCP authority.

## Failover rule

A work item requests logical capabilities, never a specific PC. Resolve requirements against the device/node registry, authorization, live health and supported capabilities. Preserve the parent objective/work ID and record failover evidence.

## Developer portability rule

The implementation may be offered to other developers, but verification does not transfer.

`DISCOVER -> INSTALL -> PATCH/COMPATIBILITY -> PAIR -> DIRECT EXECUTION -> REMOVE PC -> REMOVE USB -> SESSION RECOVERY -> COLD BOOT -> VERITAS -> RECEIPT -> VERIFIED`

Android vendor, Android version, Termux distribution and Desktop Commander version may change behavior. Pin qualified versions or re-run the full campaign after upgrades.

## Proof law

`installed != running`
`running != healthy`
`paired != reachable`
`reachable != executable`
`executable != PC-independent`
`PC-independent != USB-independent`
`USB-independent != session-recoverable`
`session-recoverable != cold-boot persistent`
`first success != completion`

## Evidence requirements

A receipt should include phone class/model and Android version without unnecessary unique identifiers, architecture, tool versions, direct ping, shell, filesystem, search, Git/GitHub, PC independence, USB independence, session recovery, cold boot, security boundary, limitations and source artifact revisions.

Never publish Remote MCP auth tokens, refresh tokens, Google account identifiers, private pairing secrets or other credentials.

## Completion rule

The skill is complete for a target phone only when Veritas can support `SECONDARY_WORKSTATION_VERIFIED` and the receipt is inspectable.

First success is not completion.
