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

## Creator clarification: device-specific Digital Brain owns physical bindings

<!--
REGION: LEEWAY.PORTABILITY.DIGITAL_BRAIN_BINDING
TAG: BRAIN_OWNED_BINDINGS_ZERO_LLM
WHO: Creator/Human Authority; Agent Lee implementation and qualification agents.
WHAT: Refine the existing ecosystem portability law; do not introduce another resolver, registry or runtime.
WHEN: Explicit Creator clarification during unified Agent Lee APK completion, 2026-10-05.
WHERE: Existing Agent Skills portability contract, consumed by all LeeWay products and adapters.
WHY: Prevent one workstation's paths, OS, body identity or chosen model from becoming universal requirements.
HOW: Device-local binding data; reusable core contracts; optional model capabilities; execution-based acceptance.
LICENSE: MIT
-->

The only LeeWay component that owns persistent, installation-specific physical resource mappings is that installation's Digital Brain. This is a data-ownership boundary, not permission to hard-code a particular machine into Digital Brain source.

The Digital Brain implementation, schemas and recursive viewer remain reusable. Each installed Digital Brain discovers and records its own authorized filesystem roots, storage resource URIs, applications, hardware, provider endpoints and device identity. Its local resource map is not copied as another device's map.

Other LeeWay components consume logical identities and authorized resolved handles through the existing body/provider resolver. They do not keep competing authoritative physical-root maps. Use the established route:

`logical object/capability identity -> canonical registry -> device Digital Brain binding -> body/provider adapter -> authorized resource`

Paths may occur as runtime observations, transport arguments, temporary caches and historical receipts. Such occurrences are not independent authority and must never silently become startup defaults. Package-relative imports and asset names are not fixed-host dependencies. Credentials remain in platform secure storage; the Brain holds references and permission metadata, not embedded secret material.

Cold start cannot depend on a Digital Brain that has not yet been opened. The platform bootstrap obtains its application-private storage location or authorized service handle from the platform or explicit owner grant, verifies or creates the device identity, and opens/reuses the Brain. It then registers the discovered mapping with the Brain. That temporary bootstrap step must not create another persistent path authority or require a universal drive, username, hostname or fixed phone ID.

Physical relocation or a changed authorized mount updates the device binding and invalidates stale resolved handles. It does not change Agent Lee's identity, the logical object identity, or reusable source. An unavailable resource is a scoped blocked capability, not permission to guess another path.

## Portable contracts, platform adapters and packaging

All LeeWay reusable components inherit this law: Agent Lee, Runtime Fabric, Harness, Formula, Veritas, Skills, Workstation/VT, Continuum, LDWMD, Voice, Devices/Desktop Commander, automation, conversation, deployment and updates.

Platform-specific implementation belongs behind a capability adapter. Windows APIs belong to the Windows adapter; Android APIs belong to the Android adapter. Neither becomes a dependency of the shared core or another platform's build. Product packaging is platform-specific: a single Android APK does not claim to be a Windows, Linux or macOS executable.

Each device retains its own Digital Brain, Continuum instance and LDWMD working state. Continuum may federate authorized durable records without importing another device's physical-root authority. LDWMD stays device-local; hardware allocation handles and active working state are not synchronized as shared memory. Shared Agent Lee identity, conversation identity, skills, governance and the selected acoustic voice binding remain logically consistent across devices.

Desktop Commander is owned by LeeWay Devices/Device Bridge and must be internal to the complete Agent Lee APK where that product requires it. Remote execution requires the target's owner-approved endpoint, grants and fresh verification. Installing the controller never grants authority over arbitrary computers.

## Zero LLMs is the required baseline; models remain attachable

The core must boot and perform its specified deterministic duties with zero LLMs installed, configured or reachable, and with no hosted LLM credentials. Model discovery, downloads, health probes or retries must not block that boot path.

Required zero-LLM duties include identity and permission handling, Digital Brain navigation and authorized observation, Continuum persistence and governed federation, device-local LDWMD control, executable skill discovery/dispatch, deterministic workflows and automation, available device commands, receipts, session bookkeeping and evidence-backed factual retrieval. Formula execution still requires the real canonical implementation, authorized input mapping and calibration; absence of an LLM does not justify invented Formula results.

One or two optional LLMs may be attached through the existing model/provider registry and dispatcher. Do not create another Agent Lee, memory authority or model registry. Models contribute bounded capabilities and receive only authorized task context. They do not own identity, persona, durable memory, tool authority or the selected voice. Directly importing a named LLM into the core boot path violates this contract.

Test zero, one and two active-model configurations. A model may be detached, fail or be replaced without losing Agent Lee identity, already committed state or unrelated capabilities. Core health and optional-model health are separate. Only tasks that actually require the unavailable model report that capability blocked; they must not fabricate an answer or execution.

Zero-LLM operation is not a claim of arbitrary general-language competence. Such requests need a qualified deterministic skill, another approved capability or an optional model. Speech recognition, speech synthesis and embeddings are distinct model classes: the no-LLM requirement must not be silently changed into a ban on the approved TTS engine. Continuum's core separately remains independent of optional semantic/embedding services.

## Mandatory acceptance additions

Before promoting the unified package, retain evidence for all applicable cases:

1. Relocate the package and the same device's Brain resources to two different authorized locations, including spaces/non-ASCII names; restore the binding without editing reusable source.
2. Present an obsolete global root override and prove it cannot redirect an already authorized resource binding. Missing or ambiguous current bindings fail closed.
3. Create or reuse independent device identities and Brain maps. A second installation does not inherit the first device's physical paths, local memory allocation handles or credentials.
4. Exercise supported platform adapters separately. Windows success does not establish Android, Linux or macOS execution; a mocked platform label is not platform testing.
5. Boot with zero LLMs, no LLM keys and unavailable model services; execute the required deterministic workflows and prove zero LLM calls.
6. Attach one optional LLM and then two; verify bounded task dispatch, identity/session preservation and unchanged shared voice selection. Detach/fail each model and verify the core remains usable.
7. Keep the same selected voice package across bodies; unavailable rendering blocks speech rather than substituting another speaker. Record actual acoustic/runtime qualification separately from binding validation.
8. Repeat restart, permission-denial, missing-resource, stale-handle and rollback cases. Preserve version/hash, actual platform, runtime result and receipt scope.

These are acceptance requirements, not a report that the current estate has passed them. No source-string scan, empty database, menu item, health label or model-free fixture alone closes this gate.
