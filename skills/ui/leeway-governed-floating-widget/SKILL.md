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

"Convert this canonical capability into a LeeWay Floating Widget under LFW-v1.0, using its approved form profile, existing native Agent Lee host, direct bezel interaction without an external control rail, proportional wheel/pinch scaling, and original governed backend; qualify both requested platforms and provide evidence."


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


## Creator ruling 2026-10-11 — exact visible-surface widget law and local build procedure

**Creator-approved design authority for every LeeWay product presented as a widget** (supersedes any older required-external-control-rail language in this file). This is a visual/interaction **standard**, not proof that an implementation has passed. All Agent Lee hamburger capabilities eligible for floating presentation—Digital Brain, Agent VT/Notepad, Vision, Continuum, Skills and later products—MUST reuse the established native host and expose a discoverable **right-edge capability tab**. Do not transform nonvisual background services into decorative widgets.

### Absolute shape and interaction invariants

- **Content is the widget.** The native window bounds MUST match the outside silhouette of the original 3D capability, including its legitimate bezel/shadow; the native host MUST NOT display a larger dark rectangle or boxed margin. Pixels outside its silhouette MUST be alpha-transparent and nonobscuring. The approved capability itself may have an opaque or glass-like body.
- **No separate floating command rail.** Remove prototype +/−/move/reset/collapse sidebar. Capability-specific controls stay in the original capability UI. Window-level motion/scale/return happen through unobtrusive designated bezel/host gestures, respecting accessible alternatives. A minimal transient affordance is allowed only if explicitly approved and does not become a permanent external frame.
- **Native whole-surface transforms.** Mouse/touch drag on the designated *exterior bezel/handle* moves the entire host window among authorized screens. Wheel down shrinks, wheel up enlarges; touch pinch similarly scales the **entire exterior border + content + 3D visual** with one coherent transformation. Aspect ratio, minimum readable size, clipping, shadows and position must be conserved. Wheel over internal scrolling/editing remains available; do not hijack scroll within the app.
- **3D must remain 3D and interactive.** Preserve original asset, material, lighting, tilt/sway, drag-to-rotate, clickable regions, touch gestures, focus, text inputs, navigation, real API bindings and capability operations. Distinguish perspective rotation from operating-system window dragging by interaction region/mode. A screenshot or 2D substitute FAILS.
- **Right-edge tab** is a separate minimal launcher visually descriptive of the capability (not generic), based on the original Agent Lee button: transparent/contoured exterior, animated color cycling, vertically draggable on the right edge, bounded to a reachable location and persistent. Tap once opens/restores/focuses the single widget instance; collapse returns to the same movable tab without killing capability state. No fixed immovable tab and no uncontrolled duplicates.
- **Open/collapse/restore** MUST preserve geometry and session appropriately, honor runtime permissions and host focus, allow return via the button or existing native close bridge, and never interfere with unrelated screens, applications or Agent Lee's native launcher. Multi-monitor host behavior must be qualified separately. Native overlay technique is platform-specific: Windows native transparent floating window; Android owner-enabled `TYPE_APPLICATION_OVERLAY`; do not copy Electron directly to Android.
- **Capability fidelity** is mandatory: Agent VT remains a real working workstation, Vision a real camera viewer, Continuum the real spatial surface, Digital Brain the original renderer. An opening animation with dead controls is a FAIL. Verify the real host/capability binding independently of visual appearance.

### Required construction sequence — derived from actual local Agent VT proof

1. **Discover, pin and read** existing LFW-v1.0 authority, original capability, current native host, renderer, launcher and latest contributor checkpoint; hash relevant source (SHA-256). Classify reuse vs missing glue; preserve rollback. Do NOT build another Golden Package.
2. **Baseline with real content**: point an isolated existing native host at the original authorized content (Agent VT proof uses `https://4citeb4u.github.io/LeeWay-Agent-Workstation-Open-Notebook/`), not an imitation. Verify page load and meaningful internal functions separately.
3. **Create the right-edge capability tab** in the existing authorized host; use an image/shape representing the capability (not copying the Agent Lee emblem), color animation, drag-to-reposition and click-to-restore. Persist right-edge vertical position.
4. **Create one native floating capability surface** using original 3D/UI assets. Tight-crop native bounds to the exterior content outline; set transparent native window/background/outside silhouette. Do not put a functioning visual into an oversized hidden-frame wrapper.
5. **Wire direct interactions**: bezel drag for native movement, wheel/pinch for whole-window proportional scale, internal tilt/rotation and pointer interaction without event conflicts; return/collapse to right-edge tab. No permanent external control rail.
6. **Qualify the exact gesture chain**: right-edge tab visible and movable → click → original capability visible with no background rectangle → drag between monitors → scroll/pinch to scale complete widget → rotate/tilt 3D content → click and use original inner functions → collapse → tab remains reachable → reopen with preserved bounds/session. Independently test multi-window and permission boundaries.
7. **Finish the engineering loop**: test source syntax/build and real native interaction, record failures, smallest justified repair, retest, compare against Creator visual reference, independent Veritas review, release provenance and receipts. Freeze/publish only after all demanded platform gates PASS.

### Local Windows proof and known defect boundary (evidence, not accepted final design)

Creator visually observed a working right-edge launcher that opens interactive Agent VT. Isolated test harness: `E:\LeeWay-Work\agent-vt-golden-widget-proof\main.cjs`; source SHA-256 observed at initial working checkpoint: `BEDB11E84DB0B3498387AC193A411D8652B802D448D372967DF09AF5BE559B36`. The harness uses the installed Electron native host and original Pages workstation. **Observed FAILS:** right tab immovable, oversized black native exterior, separate left rail, unaligned native host and tablet, and unproven whole-window scroll gesture. These failures MUST NOT be propagated as the widget template. The approved target is the exact-silhouette tablet with direct gestures, fully interactive 3D content and movable animated tab. Creator screenshot/observation is visual evidence of opening and defects, not proof of complete acceptance, Android parity, or Veritas PASS.

This law is added to the **existing** LFW-v1.0 skill, not a new engine, registry, service, or conflicting standard. Wherever an earlier paragraph mandates a *separate* attached control rail, interpret that as superseded by this ruling.


## LeeWay Widget Factory — retained implementation skill checkpoint (Creator 2026-10-11)

**Always invoke this existing skill before changing any LeeWay visual capability or Agent Lee hamburger entry.** Human-readable identifiers: **Edge Tab** (edge launcher), **Widget Window** (OS-level host), **Widget Body** (original 3D interactive capability), **Grab Corners** (transparent gesture handles), **Widget Controller** (host-native movement/size/lifecycle). IDs: `leeway.widget.<capability>.edge-tab`, `.window`, `.body`, `.grab-corners`, `.controller`; reserve specific aliases from established canonical components.

**Factory sequence, derived from actual local Windows proof:** inspect canonical 3D source and working Agent Lee overlay; baseline and hash; use one existing Electron Windows host (Android requires the already established Pocket overlay, not Electron); create alpha-transparent native Window that bounds the full original visual; preserve original 3D content; lock Edge Tab to monitor work-area **right X**, permit **only bounded Y**, persist Y; create or reuse four unobtrusive corner native drag regions; whole-window proportional scroll/pinch scale while internal scroll and click operations continue; remove duplicate outer tool rail and title/header; keep original capability operations/asset bindings; collapse/restore to tab without an independent backend; parse/build; run real interaction/regression/multi-monitor tests; read back geometry/render/Veritas; record receipts only for actual evidence.

**Reject**: freely drifting Edge Tab, static tab, faux browser-positioned widget, duplicated activity/app, oversized rectangle, detached 3D content, unresolved CSS nested scaling, fixed sidebar rail, globally intercepted wheel, noninteractive 3D picture, mock backend/health. **Acceptance**: edge tab X invariant (including attempts at horizontal dragging), persisted clamped Y, click→open original capability, 4-corner movement among monitors, whole-widget wheel down/up, bounded 3D tilt/rotate, internal click/scroll, return/restore, native alpha corners, no visible margins. Distinguish live DOM and process observations from physical UI/Creator acceptance.

**Specific source evidence** from first local proof: `E:\LeeWay-Work\agent-vt-golden-widget-proof\main.cjs` native Electron host, `preload.cjs` edge/corner gesture wiring and DOM fixes, `layout-observation.json` inner transform check. The original GitHub Pages tablet was first confirmed functional; successive corrections removed outer rail and internal transform scale, removed redundant header, and constrained edge tab's x to work-area right edge while permitting Y. This is **candidate local proof**, not cross-platform Golden Package qualification. Preserve exact source revision/hash and Creator visual confirmation separately.

For Digital Brain: use the real `digital-brain/brain.html`, `agent_lee_sphere_transparent.html`, native Android `FloatingSphereWindow.kt` / `DigitalBrainActivity.kt` and existing PC host. The Digital Brain is an original distinct capability, not a copy of Agent VT. Never silently change deployed PC/phone packages while the isolated native proof is unqualified.


## Creator update — on-demand Quick Access Edge Tabs and native border gestures

**Mandatory rule:** A secondary capability's Edge Tab MUST NOT be permanently instantiated as a visible launcher at ordinary Agent Lee startup. The user opens Agent Lee's hamburger/Quick Access menu, selects the named capability, and only then that capability's right-edge, vertically movable, X-closable tab appears. One tap on the tab opens or restores the original capability. An X on the tab closes/hides that tab and its owned floating surface, without stopping the existing shared backend; selecting the capability again reopens it. Agent Lee's own launcher may remain available separately and requires a recoverable reopen path if dismissed.

**Naming:** The Edge Tab prominently shows a readable, human name (for example AGENT VT, CONTINUUM), not only a tiny logo. Place its flat silhouette side against the desktop's right edge; mirror the artwork horizontally if necessary while keeping the letters upright. Persist bounded Y; X is invariant for the selected monitor. Color cycling may animate the art without destroying legibility. The ability to close and later reopen is an observable acceptance test.

**Hamburger menu:** The Quick Access menu is a temporary menu popup, not a widget. It may use its own native popup dimensions so all destinations remain readable rather than clipping inside a 3D Brain widget's small bounds. It must preserve actual allowed capability routes, never create replacement backend services, and distinguish original functions that are unbound. The Creator-supplied image is a visual standard; CSS approximations must be labeled as approximations until visually accepted.

**Continuum exact-surface adapter:** Preserve its original honeycomb `#sphere` canvas and governed provider authority. On Windows, an isolated test may reparent the existing canvas into a bounded alpha-transparent native window, hiding the original page shell **except** the dedicated native glow/drag overlay. Do not hide the grab overlay during source extraction; that caused an observed real drag FAIL. Scroll over its perimeter proportionally scales the native window. Never treat a detached image, generic boxed page, or a fake provider as a Continuum widget.

**Evidence at local test checkpoint 2026-10-11:** Original Continuum sphere renderer SHA-256 `17E3A28845A857E70AC2D6BEA68786F885F78CED143D3B8F553EABDBEF21CB4D` unchanged. Quick Access native menu observed 11 entries; Workstation and Continuum DOM-click/IPC launch tests observed edge tabs visible while capabilities stayed collapsed; X-control renderer click closed both Continuum surfaces, and Workstation native tab was observed hidden. Physical Continuum native-wheel shrink (about 440 to 406 pixels) and enlargement (to 474 pixels) were observed; subsequent physically injected native drag moved the window +80 X / +54 Y with unchanged size after restoring the grab overlay. These are **isolated Windows local TEST observations**, not a native PC production deployment, full provider proof, Fold6 parity or end-to-end Veritas/Formula PASS. Evidence note: `E:\LeeWay-Work\AGENT-LEE-FLOATING-WIDGET-TEST\work\quick-access-local-widget-checkpoint-20261011.md`. Keep formal qualification gates open.
