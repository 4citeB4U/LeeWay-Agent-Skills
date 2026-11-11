---
name: leeway-native-computer-use
description: Mandatory governed native computer-use skill for any LeeWay agent asked to visually observe or control a desktop, monitor, application, pointer, or keyboard through Device Bridge. Routes local and online agents through the canonical Runtime/Bridge task-scoped consent and evidence gates; instruction presence never grants control.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  canonical-path: skills/leeway-native-computer-use/SKILL.md
  class: mandatory-conditional-operational-skill
  execution-owner: LeeWay Runtime Fabric + LeeWay Device Bridge
  lifecycle: SOURCE_CANDIDATE_NOT_RUNTIME_QUALIFIED
  portability: CONTRACT_PORTABLE_ADAPTER_DEPENDENT
  dependencies: leeway-bootstrap-authority; leeway-continuity-authority; leeway-agent-operating-loop; leeway-tool-gateway; leeway-veritas; leeway-receipt-authority
---

<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.NATIVE_COMPUTER_USE
TAG: AI.SKILL.DEVICE_BRIDGE.NATIVE_COMPUTER_USE
5WH:
WHAT = Govern visual computer observation and interactive desktop control as one mandatory LeeWay skill.
WHY = Enable authorized online and local agents to operate computers through the canonical Device Bridge without duplicate control planes.
WHO = Creator-authorized LeeWay Agent Skills contributors and qualified host adapters.
WHERE = skills/leeway-native-computer-use/SKILL.md
WHEN = 2026-11-11.
HOW = Discover and reuse existing native capabilities, bind revocable task consent, execute observe-act-verify, independently qualify evidence.
LICENSE = MIT (Agent Skills repository).
-->

# LeeWay Native Computer Use — mandatory conditional skill

## Trigger and authority

Every LeeWay worker that has actually loaded the canonical Agent Skills entrypoint MUST load and apply this skill whenever a request requires screen observation, desktop/application navigation, multi-monitor inspection, keyboard or pointer input, or a GUI post-state verification. Core discovery of this skill is mandatory at bootstrap; **computer access or continuous screen capture is not**. A user request is not a perpetual grant. Explicit task authorization, owner identity, device binding, action scope and expiration MUST be verified by the existing Runtime/Device Bridge before every privileged action. Permission may be revoked at any moment.

LeeWay's first-read triad, R01–R25, original owning mission and 12-stage engineering loop remain governing. This is an operational skill, NOT a new authority, control plane, independent verifier, receipt writer, Formula, task queue or model provider. It does not impersonate Agent Lee. A skill file does not install an operating-system driver.

## Preflight and capability discovery

1. Recover current canonical checkpoint and mission; read Standards, Engineering, Receipt Authority, root AGENTS.md, owning repo notes, PRs, source lock, claims, and security boundaries. Preserve concurrent work.
2. Discover authenticated device and exact adapter version/host identity/permission state. Read capability registry and actual executable schemas. Inspect existing `device.windows.window.list`, `device.windows.window.observe`, `device.windows.window.invoke`, `device.windows.window.input`, `device.screen.capture` where present, and qualified session operations before proposing any new tool.
3. Classify each operation ALREADY_BUILT / PARTIALLY_BUILT / MISSING_GLUE / TRULY_MISSING and record SUPPORTED, GRANTED, VERIFIED independently. Discovery alone cannot establish reachability, execution admission, display geometry or working controls.
4. Determine display enumeration, per-monitor capture, virtual desktop origin (including negative coordinates), resolution, DPI awareness/scaling, rotation, window bounds and accessibility availability. Never guess coordinates from a stale screenshot.
5. Prefer accessibility selectors for stable target identity when available; confirm geometry and visible state before using visual coordinate targeting. The executor must bind screenshot frame identity to action coordinates.

## Logical capability contract — reuse before extension

These are **proposed logical operations**, not an assertion that endpoints already exist. Map to existing canonical Bridge names where equivalent; add only missing glue in the owning Device Bridge repository:

- Discovery/observation: `computer.displays.list`, `computer.screenshot`, `computer.window.list`, `computer.window.observe`, `computer.accessibility.inspect`.
- Interaction: `computer.click`, `computer.double_click`, `computer.move`, `computer.drag`, `computer.scroll`, `computer.type`, `computer.keypress`.
- Authority/lifecycle: `computer.control.request`, `computer.control.status`, `computer.control.release`, `computer.control.revoke`.

Every request requires correlation/work ID, authenticated agent and owner subject, device identity, task/session lease, action/scope, target display/window and fresh observation/frame ID where applicable. The executor returns action result, observable post-state reference, failure class and audit correlation. Avoid leaking raw screenshot content, secrets and private device details into public repositories or broad logs.

## Execution loop

1. Request an explicitly bounded session from the existing authority. Display owner-visible agent name, task, permissions, device, expiration and an immediate Stop control. No silently persistent or background desktop control.
2. Enforce one exclusive foreground input owner per interactive desktop; distinguish shared read-only observation from input ownership. Fail closed on lock/revocation, expired lease, wrong device, lost identity, secure desktop/elevation boundary, remote disconnect or unsupported platform.
3. Observe authorized displays/windows; reason from fresh visual and accessibility data; plan the smallest applicable action.
4. Act through the native, qualified Device Bridge adapter ONLY. Observe again and verify post-state; retry cautiously with bounded budgets and idempotency checks. For consequential/destructive actions, permissions changes, payments, secrets or irreversible operations, require distinct human approval before acting.
5. On stop, timeout, exception, cancellation or completion, release keyboard/pointer ownership and end capture; make visible indicator accurately track live control. An emergency stop must work without model cooperation.
6. Record both positive and negative observations; route execution evidence through existing independently qualified Veritas PRE/POST, canonical Receipt Authority custody/readback, Learning admission and Production handoff gates when required. No self-certified Veritas or invented receipts.

## Adapter matrix

- Windows: evaluate Windows Graphics Capture or DXGI for screen imagery, display enumeration and DPI mapping, Microsoft UI Automation for semantics, and native authorized input APIs such as SendInput. These are candidate technologies, not claims about OpenAI's private implementation. Verify interactive-user-session privileges and overlay isolation.
- macOS: use available ScreenCaptureKit/Accessibility/CGEvent adapters only under platform TCC approval; qualify individually.
- Linux: distinguish X11 and Wayland compositor permissions, screen-capture portal and input pathways; do not assume uniform support.
- Android: use the qualified Android device adapter and platform permission boundaries; do not equate ADB testing privileges with consumer app grants.
- iOS: use permitted Apple automation/test/managed-device mechanisms only where genuinely supported; ordinary third-party apps cannot assume arbitrary OS-wide control.
- Local and online models receive the same logical tool contract; local clients route to qualified local Bridge and online clients use authenticated Runtime-to-Bridge, never raw unaudited host access.

## Deterministic acceptance and regression

Positive cases: two-monitor layout with mixed scale and negative origin; identify and click a small visible control; right/double click; scroll, drag across displays, keyboard shortcuts, input and edit; observe expected post-state. Verify no unrequested action occurs before approval and no capture continues after release.

Negative cases: identity mismatch, forged/stale screenshot, expired/revoked scope, locked desktop, conflicting simultaneous agents, monitor topology changes, inaccessible secure desktop, user emergency stop, denied elevation, unsupported iOS action, network loss and replayed task; require fail-closed behavior and release of active input. Test denial without executing unsafe actions.

For each test report actual device/adapter/commit, command, correlation, observed before/after, negative behavior, limitation and independent verdict. Preserve `CONTRACT_PORTABLE`, `ADAPTER_IMPLEMENTED`, `PLATFORM_TESTED`, `LIVE_EXECUTION_OBSERVED`, `VERITAS_VERIFIED`, `RECEIPT_WRITTEN_AND_READ_BACK` as separate predicates.

## Current qualification boundary

As of 2026-11-11 read-only Runtime discovery of `pc-primary` advertised 43 capabilities, 20 granted, 0 verified; reachability NOT_PROBED, and execution admission NOT_CONFERRED_BY_DISCOVERY. The four existing Windows `window.list/observe/invoke/input` operations were advertised and granted but not execution-qualified. This source skill is NOT a Device Bridge installation, active desktop grant, driver, verified multi-monitor controller, Veritas outcome or production handoff.

## Handoff

Use the existing owning mission and Contributor Hub #22. Attach precise source SHA, diff, test output, runtime PRE/POST correlations, genuine receipt/readback references and rollback. Continue the original mission rather than closing at skill publication.