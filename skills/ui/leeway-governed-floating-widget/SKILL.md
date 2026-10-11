---
name: leeway-governed-floating-widget
description: "Creator-approved LeeWay Governed Floating Widget Contract (LFW-v1.0). Use for any Agent Lee floating widget, including Agent VT, Continuum, Vision, Agent Skills, and Digital Brain; distinguishes widgets, edge tags, pop-ups and capability panels."
license: MIT
metadata:
  authority: "Creator/Human Authority > LeeWay Standards > Root of Trust > Runtime Fabric"
  canonical-path: "skills/ui/leeway-governed-floating-widget/SKILL.md"
  contract: "LFW-v1.0"
  approval: "CREATOR_APPROVED_ARCHITECTURE"
  implementation-state: "PLATFORM_QUALIFICATION_REQUIRED"
---

<!--
REGION: AI.SKILL.UI.FLOATING_WIDGET
TAG: LEEWAY.LFW.V1
5WH:
WHAT = Shared terminology, geometry, lifecycle and host/capability contract for all LeeWay Floating Widgets
WHY = Reuse one governed widget architecture; prevent iframe substitutes, duplicate backends and inconsistent sizing
WHO = LeeWay Industries / Creator authority; Agent Lee and scoped UI contributors
WHERE = skills/ui/leeway-governed-floating-widget/SKILL.md
WHEN = 2026-10-10
HOW = Discover canonical capability and native host; compose, qualify, verify and preserve evidence
AUTHORIZED ROLES = OWNER_UI, HOST_ADAPTER, CAPABILITY_OWNER, INDEPENDENT_VERITAS
LICENSE = MIT
-->

# LeeWay Governed Floating Widget Contract — LFW-v1.0

**Architectural approval: Creator-approved.** This contract is a design authority for LeeWay-created widget work; it does not claim cross-platform implementation, release qualification, or deployment without runtime evidence.

## Precise terminology

- **LeeWay Governed Floating Surface Architecture (LGFSA)**: the shared architecture governing widget hosting, identity, geometry, interaction, lifecycle and capability connection.
- **LeeWay Floating Widget (LFW)**: an independently movable, resizable, controllable surface owned by the *existing* Agent Lee host, presenting a real governed capability through its approved original UI/3D content.
- **Widget Host**: the existing PC native window or Android activity/overlay/window authority; do not create another Golden Package or runtime to host a widget.
- **Widget Controller**: independent `widgetId`, placement, focus, mouse/touch input isolation, movement, proportional scale, tilt, docking, collapse, restore, close and session/lifecycle management.
- **Widget Form**: shape and presentation profile, independent of the capability: `TABLET`, `SPATIAL`, `INSTRUMENT`, `WORKSPACE`. Extend the existing form registry rather than inventing engines.
- **Capability View**: the original working application and its state, tools and content, mounted within the widget body; no screenshot/mock replacement or nested iframe masquerading as a native widget.
- **Control Rail**: slender strip attached to the floating widget, dedicated to widget controls rather than the application's own toolbar.
- **Menu Pop-up**: temporary, anchored hamburger-menu control/navigation panel; **not** a widget.
- **Edge Tag**: fixed left-edge access handle for a collapsed widget or menu panel. It may reposition vertically, but does not travel freely off screen; **not** itself a widget.
- **Capability Panel**: internal content panel, not an independent floating widget unless separately registered as one.

## One five-layer architecture

1. Existing **Agent Lee Golden Package widget host** (Windows and Android native adapters, independently qualified).
2. **Widget controller** (identity, input, geometry, placement and lifecycle).
3. **Widget form** (approved 3D shell, curvature/bezel, perspective and control rail).
4. **Original capability content** (Agent VT workstation, Continuum, Vision, Skills, Digital Brain).
5. **Existing governed backend** (Runtime Fabric, Formula when applicable, authorized dispatcher/capability, Veritas pre/post-gates, receipt and Learning Ledger).

One capability + one canonical source + multiple host-specific native floating surfaces. No redundant native app identity, new backend, duplicated orchestration or unverified state synchronization.

## Universal control contract

| Operation | Observable rule |
| --- | --- |
| Launch | Agent Lee hamburger/authorized command resolves a stable registered `widgetId`. |
| Focus | Existing open widget comes forward instead of spawning an uncontrolled duplicate. |
| Move | Rail/body-designated handle drags only its widget, not another application. |
| Wheel Scale | **Scroll down shrinks the whole surface; scroll up enlarges** the entire body, contents, attached rail and all visible borders. Keep aspect ratio, content positions and minimum/maximum bounds. |
| Pinch Scale | Touch pinch performs the same bounded whole-widget scaling on eligible devices. |
| Tilt | Bounded perspective sway in X/Y with gradual settle to neutral; never change capability data. |
| Dock | Attach to authorized screen edges without hiding the widget or covering unrelated controls unnecessarily. |
| Collapse | Reduce to reachable edge tag/compact handle, without destroying capability state. |
| Restore | Recover prior geometry and capability session state where authorized. |
| Close | Release the surface and its handlers, without arbitrarily killing shared backend services. |
| Input isolation | Rail/scale operations consume only their intended events; application clicks/touch/scroll continue to work in the intended internal interaction mode. |

**Wheel conflict policy:** define the scale-active hit surface and a clear, discoverable way for long internal notebook/web content to scroll without resizing; no global wheel interception over unrelated applications.

**Geometry invariant:** `outerBorder:screen:rail:content` scale coherently as one object. Do not merely shrink a bounding box and clip the full-size content. The curved/depth perimeter must remain visible at all supported sizes. Edge/bounds clamping, aspect constraints, readable minimum size, window resize and multi-monitor behavior must be checked independently per host. A native floating widget is not proven by displaying the webpage in a fullscreen WebView/browser.

## Form profiles

- **TABLET — Agent VT:** complete workstation; curved 3D tablet border, screen, rail and buttons remain scaled together.
- **SPATIAL — Continuum:** preserve the existing spatial asset and real data read path; widget geometry is separate from database authority.
- **INSTRUMENT — Vision:** preserve the approved eye/camera 3D assets and camera permissions/stream boundaries.
- **WORKSPACE — Agent Skills:** preserve the real skills application and registry; no pretend replacement or iframe shell.
- **Other eligible forms:** reuse controller and host contracts, register only genuinely new form geometry after approval.

## Mandatory factory procedure

1. **Recover authority**: read Creator/LeeWay Standards, contributor checkpoint, canonical source and exact revision, active ownership, expected state, blockers and constraints.
2. **Discover and classify**: ALREADY BUILT / PARTIALLY BUILT / MISSING GLUE / TRULY MISSING; identify the canonical existing Windows/Android hosts and backend adapters.
3. **Define scope and rollback**: hash baseline; preserve installed Golden Package, capability data, other contributors' work and original 3D assets.
4. **Stage architecture**: register `widgetId`, `formProfile`, `capabilityRef`, allowed input modes, native host adapters, event contract, permissions and lifecycle.
5. **Smallest implementation**: attach shared widget controller to the existing original capability view; avoid parallel engines, duplicate app packages and backend rewrites.
6. **Test geometry**: wheel shrink/upsize, mouse/touch movement, bounded tilt, aspect ratio, visible full border, content alignment, min/max bounds, rail and input noninterference, collapsed edge tag and restore.
7. **Test capability**: all original functions and backend actions remain routed through the authorized LeeWay runtime; fail closed when unbound. Frontend visibility and HTTP 200 are not proof of runtime health.
8. **Validate platforms independently**: PC native floating surface, Android host activity/overlay, hamburger entry point, authorized Agent Lee command, release source/hash, signed build and on-device operation.
9. **Veritas/evidence**: record build/test observations and independently verified outcomes, precise SHA-256 and implementation revision; create a receipt/Learning Ledger entry only for real authorized execution and verified outcomes.
10. **Freeze/publish only on gate**: CI, owner review, canonical checkout, platform-specific acceptance and rollback evidence before Golden Package rollout.

## Qualification matrix / required gates

`SOURCE_VERIFIED` → `GEOMETRY_VERIFIED` → `CAPABILITY_VERIFIED` → `PC_HOST_VERIFIED` and `ANDROID_HOST_VERIFIED` → `GOLDEN_LAUNCH_VERIFIED` → `GOVERNED_EXECUTION_VERIFIED` → `RELEASE_VERIFIED`.

Label each gate VERIFIED, OBSERVED, INFERRED, PROPOSED, UNVERIFIED, FAILED or BLOCKED. A PASS in one platform is not a PASS in the other.

## Approved reference implementation, not universal release proof

Agent VT canonical source: `4citeB4U/LeeWay-Agent-Workstation-Open-Notebook`, approved 3D widget commit `de8525e5209a10df10438b6a40c6a910b6172874`. The browser wheel shrink/enlarge path was verified locally; Windows native overlay, Fold6 packaged widget parity, actual Agent Lee voice-command registration and end-to-end Veritas path require separate evidence.

## Standard request

"Convert this canonical capability into a LeeWay Floating Widget under LFW-v1.0, using its approved form profile, existing native Agent Lee host, attached control rail, proportional wheel/pinch scaling, and original governed backend; qualify both requested platforms and provide evidence."


## Creator ruling 2026-10-11 — Pocket Golden Widget implementation reference

**Creator decision:** The existing Pocket Agent Lee floating-button → floating-sphere → Digital Brain → return interaction is the **official reference design** for LeeWay Floating Widgets under this same LFW-v1.0 contract. This is an amendment to this canonical skill, **not a new widget subsystem or a competing standard**. Preserve the concrete design and interaction behavior; do not replace it with a generic Android home-screen widget, iframe, static picture, new Golden Package, or rectangular opaque WebView shell.

### Concrete reference source (proven code existence; NOT device deployment proof)

Source repository: \`4citeB4U/LeeWay-Pocket-Agent\`. The reference is assembled from the **existing components** below, not from a newly written replica. Because source references were recovered across different historical commits/PRs, they are individually pinned evidence, **not a claim that the set formed one tested release**:

- \`app/src/main/java/industries/leeway/pocket/PocketOverlayService.kt\` — native owner-enabled floating button, \`TYPE_APPLICATION_OVERLAY\`, \`PixelFormat.TRANSLUCENT\`, placement, click/drag distinction and toggle. Reference PR #6 head \`c088f8d68c0cbc32546add23786774b37407d4b2\`; observed blob SHA \`3c913ad28a4e864edb2a6d9366704b1120f160fe\`.
- \`app/src/main/java/industries/leeway/pocket/ElementalEmblemView.kt\` — original button/emblem presentation (artwork is **not** the reusable framework), state animation; PR #6 head; blob SHA \`710cac4e432c8407efe82b7fbdf8b07b4ff648e9\`.
- \`app/src/main/java/industries/leeway/pocket/FloatingSphereWindow.kt\` — transparent native overlay-hosted \`WebView\`, move, pinch-scale, expanded geometry, restore, panel state, native bridge and launch; PR #6 head; blob SHA \`f15e97cbf6209456b3c15b0c71369fd7058ecd2c\`.
- \`app/src/main/assets/agent_lee_sphere_transparent.html\` — original transparent 3D sphere/controls, hamburger and drawer; PR #6 head; blob SHA \`89a60256f5e922753f2cbf708a4f9dfbc1244538\`.
- \`app/src/main/java/industries/leeway/pocket/DigitalBrainActivity.kt\` — original packaged Digital Brain \`WebView\`, read-only bridge and \`LeeWayBrainView.close()\` → activity \`finish()\`; inspected historical base commit \`64cf4be8daf85284d6a81bb38fb40534c1072597\`, blob SHA \`721c1c5c816492745bc7eda526ff61e4401b44bb\`.
- \`app/src/main/assets/digital-brain/brain.html\` — original Brain content; same historical base, blob SHA \`612e6c0114734d5bb4c271bbc90dae045cabcf1e\`.
- \`app/src/main/assets/digital-brain/brain-live-return.js\` — return-to-Agent-Lee UI calls the native bridge; PR #6 head, blob SHA \`7d17161014c822dfba65f05e951fb4636a571865\`.
- \`app/src/main/assets/digital-brain/brain-live-overrides.css\` — mobile Brain presentation and return-control styling; PR #6 head, blob SHA \`ecdf5e023d90fbebff9d214b6b5529fcfbd504e5\`.

**Critical distinction:** The floating sphere expands/restores via \`FloatingSphereWindow.Bridge.geometry("expand",...)\`, whereas the Digital Brain is launched as a **separate Android Activity** and its return control calls \`finish()\`. Do **not** represent this as one native window continuously morphing into the Brain. Preserve the user's visual open/return experience, but qualify exact focus, retention, appearance and geometry on-device. The earlier \`PocketOverlayService.kt\` from default-branch historical source was a different voice-side-tab implementation; do not misidentify it as the complete Golden Widget.

### Mandatory reusable implementation rules

1. **Exact host technique on Android:** Existing owner-enabled Pocket overlay service + one \`TYPE_APPLICATION_OVERLAY\` window with \`PixelFormat.TRANSLUCENT\`; transparent original-content \`WebView\` when required; \`WindowManager.addView/updateViewLayout/removeView\` and permission gate \`Settings.canDrawOverlays\`. Never treat a foreground notification or an HTML \`position:fixed\` element as attachment proof.
2. **Button behavior:** Reuse existing native button placement, tap-versus-drag distinction, persisted geometry and approved presentation. Swap only the capability-specific approved image/visual asset; preserve host styling and interactions. A small edge tab is a launcher, not itself proof that the capability window is floating.
3. **Floating widget behavior:** Reuse the existing \`FloatingSphereWindow\` class/lifecycle patterns: transparent content, isolated native bridge, bounded geometry, drag, touch pinch, proportional scale, expand and restore the **saved** rectangle, and manage input ownership when a panel is open. The widget must not be imprisoned inside an opaque or fixed fullscreen rectangle.
4. **Launch and return:** Route from one authorized launcher/capability registry; focus existing widget instead of making duplicates; on collapse/return recover reachable launcher and appropriate prior geometry/session. Use actual native close/restore handlers, never an inert web button. Note that individual capability activities may have distinct lifecycle requirements.
5. **Original capability preserved:** Vision uses its approved existing eye/camera viewer; Continuum its original spatial 3D asset; Agent VT its existing workstation; Digital Brain its existing \`brain.html\`. Replace neither image nor backend. Do not use mock data or clone the Digital Brain artwork into other widgets.
6. **Platform parity by contract, not code copy:** Windows must implement matching externally observable behavior through its already authorized native host (not Android Kotlin), with independent tests for multiple monitors and all-screen movement; Android must test drag, pinch, in-app scroll, fold/unfold, proper phone back/return and overlay permission.
7. **Acceptance before "officially implemented":** Compile/check complete source, confirm permissions and no second app/service identity, run host tests, verify actual button → widget open → move/resize → capability usage → collapse/return → reopen on each requested device, validate noninterference, obtain Veritas review, preserve revision/hash/build/device receipts. **Do not mark a device, release, or cross-platform rollout VERIFIED on source inspection alone.**

This ruling upgrades the **design-reference authority** of the Pocket implementation. It does **not** retroactively qualify unmerged Pocket PRs, merge source, install APKs, or prove Windows parity. All earlier LFW-v1.0 geometry, native host, safety, permission and Veritas gates remain binding.
