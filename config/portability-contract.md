<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.PORTABILITY
TAG: LEEWAY.AGENT_SKILLS.PORTABILITY.CORE
5WH:
WHAT = Define existing portable source authoring, runtime bindings and platform qualification rules.
WHY = Prevent repeated use of development drives as permanent LeeWay authority or production defaults.
WHO = LeeWay Agent Skills maintainers under Creator/Human and LeeWay Standards.
WHERE = config/portability-contract.md in 4citeB4U/LeeWay-Agent-Skills.
WHEN = Original law 2026-09-28; 2026-11-07 scoped Gate P code-authoring preflight.
HOW = Preserve original portability text and add explicit compile/qualification conditions.
LICENSE: MIT (repository LICENSE).
-->
# LeeWay ecosystem portability law

Creator requirement, 2026-09-28: LeeWay's core contracts and all skill orchestration are path-agnostic, operating-system-agnostic, device-agnostic and model-agnostic. This applies to the complete skill library, imported skills, Formula consumers, Notebook/Device bridges, speech and future integrations.

Canonical identity is a repository, artifact/version/hash or logical capability ID. A drive letter, home directory, computer name, operating system, browser brand, model provider or model name is never LeeWay identity and must never become a universal prerequisite.

Resolve resources through package-relative paths, explicit deployment configuration, platform storage APIs, approved resource URIs or authorized remote services. Local caches and installed paths are replaceable host bindings. A device with no filesystem must use an authorized resource/service adapter; do not invent a local path. Historical paths in receipts are provenance only, never discovery commands for a different host.

Select adapters by required capability, permissions and verified behavior. Record adapter identity/version, endpoint or resource binding, supported operations, authentication reference and measured verification state. Never copy credentials between hosts or expose a local service publicly to simulate portability.

Skills specify outcomes and capability requirements. OS-specific commands, Chrome extensions, Windows speech/DPAPI, model-specific APIs, GPU tools and Docker are optional implementation adapters. Execute them only on a qualified host. If unavailable, select an authorized equivalent or remote adapter; otherwise report the precise missing capability. Keep portable reasoning and independent work available.

Model selection is based on required modalities, tools, context, latency, cost and task qualification. Preserve a user's approved model choice. No provider or named model owns LeeWay authority. Changing providers must preserve task state, evidence, user preferences and the same validation contract.

Speech uses logical capabilities `speech.output`, `speech.cancel`, `speech.resume` and `speech.voice_inventory`; voice identity, shortcuts and mute state are adapter/user preferences. Browser work uses an authorized `browser` capability; host policy determines the allowed implementation.

Persistent execution uses logical capabilities `workplane.status`, `workplane.jobs.list`, `workplane.job.read`, `workplane.job.enqueue` and `workplane.job.control` through `config/persistent-workplane-runtime-binding-v1.json`. The canonical implementation owner is the existing LeeWay Runtime Fabric; desktop, web, mobile, Codex, ChatGPT/Work or other clients are replaceable adapters. A host must authenticate and observe a real `workId` advancing in runtime state before claiming persistence. Runtime endpoints and credentials are host bindings, never universal skill identity.

On phone, tablet, laptop, desktop or server, select a locally implemented or authorized remote execution route. Do not claim a phone runs Node, Docker, desktop speech or a Chrome extension unless that actual environment supports and verifies it. GitHub distributes versioned source/contracts; execution and storage still require a real authorized host or service.

Track three separate claims: **CONTRACT_PORTABLE**, **ADAPTER_IMPLEMENTED**, **PLATFORM_TESTED**. A policy, source scan, configuration file or desktop test cannot establish universal execution. Report untested platforms and remaining adapters explicitly. Missing capabilities must fail visibly, never produce fabricated connection, execution or verification results.

Before promoting changes, scan shared runtime/configuration for fixed-host assumptions, exercise location-independent startup, and run the available platform matrix. Retain historical evidence and external attribution. No architecture may depend on the destroyed former workstation drive.

## Gate P — fail closed on hardcoded development roots in new governed code

For LeeWay-authored code, generated integrations, MCP adapters, model/Formula loaders, path constructors, bootstraps, startup scripts, and runtime configuration, **do not emit or accept an assumed developer-machine `C:`/`E:` path (or a Linux/macOS user's absolute home) as a default or canonical dependency**. Those paths identify an observed installation *only*, never LeeWay. A fixed path **may** exist in a bounded, approved host-specific adapter when verified from configuration or actual platform state; it must not leak into universal capabilities or source identity.

**Required source-generation/review preflight:** (1) identify the real owning GitHub repository, immutable version/commit and artifact SHA-256 when needed; (2) select a logical resource/capability name and real authorized deployment/manifest/package-relative/platform API/service binding; (3) diff-scan touched *executable/config* paths for fixed-drive/home-root usage and silent historical-host fallbacks; (4) classify every hit as `EXECUTABLE_DEPENDENCY`, `APPROVED_HOST_BINDING`, `HISTORICAL_EVIDENCE`, `FIXTURE_OR_EXAMPLE`, or `UNVERIFIED`; (5) reject unresolved executable hits; (6) test alternate install root, missing drive, no-filesystem/remote route as applicable, and actual requested devices; (7) distinguish `CONTRACT_PORTABLE`, `ADAPTER_IMPLEMENTED`, `PLATFORM_TESTED`; (8) preserve errors/diffs, rollback and existing receipts. Do not replace a guessed `C:` root with a guessed `E:` root, `<LEEWAY_ROOT>` literal, or new magic hardcoded home path.

**Never rewrite historic receipts, sanitized evidence references, user-selected local files, vendor code, negative fixtures, or validated OS-adapter bindings simply to eliminate a string.** Stop only the affected acceptance on a new unapproved executable dependency. A tool cannot prove a host, device or artifact identity from `pc-primary`, a stored folder name, the presence of a file or a green source test. Where real environment discovery is unavailable, mark the binding `UNVERIFIED` instead of silently defaulting to development storage. A platform matrix and authenticated real-device poststate are separately required for production qualification.

