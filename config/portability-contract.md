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
