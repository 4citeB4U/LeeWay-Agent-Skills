<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.MCP.SH01
TAG: LEEWAY.SKILLS.MCP.SH01.STANDALONE_READINESS
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Define full standalone Agent Skills/MCP acceptance and evidence-backed outstanding work.
WHY = Prevent a 595-tool listing or green isolated protocol CI from being confused with a working governed capability fabric.
WHO = LeeWay Agent Skills source owner; original C3 mission and LeeWay Standards retain their authority.
WHERE = docs/SH01-AGENT-SKILLS-MCP-STANDALONE-READINESS.md
WHEN = 2026-10-28
HOW = Exact GitHub source and CI readback, ten-stage engineering loop, component-only admission matrix.
LICENSE: MIT
AUTHORITY: SOURCE_AUDIT_AND_PLANNING_ONLY; independent Veritas/Receipt/Learning and production release unchanged.
-->

# SH-01: LeeWay Agent Skills and MCP — complete independent component goal, current readiness and remaining work

**Component boundary:** `4citeB4U/LeeWay-Agent-Skills` including Skills registry, Skill Orchestrator contracts, Tool Gateway contracts, stdio MCP, read-only remote HTTP MCP, capability-adapter interfaces, skill Grapevine projections, governed imported skills and packaging. This audit does **not** qualify the entire LeeWay ecosystem and does **not** create a second execution, Formula, Veritas, Receipt or Learning authority.

**Owning evidence:** [SH-01 Skills MCP PR #33](https://github.com/4citeB4U/LeeWay-Agent-Skills/pull/33); [Standards sovereign SH-01 PR #61](https://github.com/4citeB4U/LeeWay-Standards/pull/61); [Agent Skills coordination hub #22](https://github.com/4citeB4U/LeeWay-Agent-Skills/issues/22); [Runtime C3 parent #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21). Main baseline `26bb0e7df29d95008b20f23497d469c0e0ca6eab`; latest protocol proof before this documentation commit `8bbfd93b8ab91943467b09b1c24edce6f2f55782`.

## A. Full goal — what the component alone must accomplish

Deliver ONE **portable, model-agnostic, continuously governed LeeWay skill and MCP capability fabric** that:

1. **Discovers:** inventories canonical skills, external imports, provider-bound operational tools and quarantined/orphan tools; proves exact source, license, owner, namespace, implementation and permission class.
2. **Understands:** parses intended outcome/required capability, binds existing Skill Orchestrator and Formula/Standards decisions as external authorities, preserves task identity/acceptance and produces a deterministic, versioned capability plan.
3. **Serves:** supports real local stdio MCP and explicitly authenticated read-only remote Streamable HTTP MCP; negotiates compatible protocol versions, unique tool names, schemas, quotas, errors, and safe client reconnection.
4. **Executes only authorized routes:** uses approved operational adapters via existing Tool Gateway and Runtime Fabric. A SKILL.md read returns `REFERENCE_ONLY`, not `EXECUTED`. Never execute arbitrary shell, filesystem, repository or device commands from imported skill/model text.
5. **Protects:** fails closed against malicious model/tool descriptions, untrusted upstream skill updates, unsigned/mismatched manifests, tool-output prompt injection, cross-tenant leakage, forged grants/receipts, path traversal, SSRF, replay, wrong OAuth audience/scope and credential forwarding.
6. **Observes and recovers:** binds request/mission/work IDs, action/adapter identity, PRE/POST/actual readback references; records STOP, retry, timeout, cancellation, idempotency, restart and error class without claiming unseen side effects.
7. **Hands off evidence:** emits source/version and requested-vs-actual operational evidence to the existing independent Veritas, canonical Receipt Authority and eligible Learning Ledger interfaces; never signs its own Veritas verdict or appends a counterfeit production receipt.
8. **Survives platform changes:** no required user PC, C:/E: drive, particular OS, Docker, browser, LLM, remote hosting vendor, or local GPU; deployment-specific adapters resolve actual capabilities. Builds/test bundles and source/read-only discovery can run GitHub-only.
9. **Ships:** pinned, auditable, reproducible packages and documented operator setup; release gate rejects incomplete supply chain, broken CI, unapproved imports and lack of rollback. Release of a skill library does not grant executing endpoints.

### Explicit non-goals / authorities that remain elsewhere

- **Standards:** constitutional policy, signatures/trust roots and policy version adoption.
- **Formula:** mathematical gate and deterministic decision authority.
- **Runtime Fabric:** persistent execution workplane, supervisor, job dispatch, native provider actions and actual task state.
- **Device Bridge:** authenticated native device control and platform permissions.
- **Independent Veritas:** authorized real PRE/POST decisions, source/physical authenticity and cryptographic readback.
- **Receipt Authority:** protected canonical immutable receipt, atomic learning obligation, durable outbox.
- **Learning Ledger / Continuum:** authorized institutional learning and owner-controlled durable memory.
- **Production/Final Execution:** final installation/release qualification.

An independently finished Agent Skills/MCP component **may pass all simulated-interface and native local adapter tests while these other services remain unbound**, but it cannot claim physical ecosystem C3 success. Component integration is a **next phase**, not a reason to prematurely label source-only checks production qualified.

## B. Actual status — observed 2026-10-28

| Observation | Exact source/evidence | Truth classification |
| --- | --- | --- |
| Canonical repository contains **501** `skills/**/SKILL.md`, including **149** under `skills/external/**` | GitHub recursive `main` tree at baseline | SOURCE_INVENTORY_OBSERVED |
| MCP stdio lists **595** unique entries: 44 legacy skill + 501 portable skill + 49 bounded tools + 1 composition | [PR #33 push run #40793997096](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40793997096) | ACTUAL_LOCAL_PROTOCOL_OBSERVED; not 595 external executions |
| Bounded source tests **25/25 PASS**; actual stdio and remote HTTP MCP client calls, skill reads, invalid commands, composition traversal and unauthorized HTTP checked | [PR #33 push CI](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40793997096) and [PR CI #40794086714](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40794086714) | CI_SOURCE_PROTOCOL_PASS |
| Core portability CI PASS | [PR CI #40794086774](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40794086774) | SOURCE_PORTABILITY_PASS, not cross-device physical |
| All `SKILL.md` calls on current main primarily return structured skill instructions/prompts via `mcp-server/src/index.ts::executeSkill` | Canonical `mcp-server/src/index.ts` source | REFERENCE_ONLY; no general provider invocation |
| PR #10 proposes a gateway route classifier and special bounded game/Blender tool dispatch; `executed:true` there means *skill-contract* resolved, and downstream action needs separate proof | [Skills draft PR #10](https://github.com/4citeB4U/LeeWay-Agent-Skills/pull/10) | UNMERGED_CANDIDATE; not general executable fleet |
| Current `config/mcp-runtime-registry.json` lists only Playwright MCP verified execution-ready source; it is not proof of every hosted provider | Canonical runtime registry source | PARTIAL_ADAPTER_REGISTRY |
| Independent legacy Skill Fabric workflow failed because **19 declared design-skill import locations** lacked expected usable SKILL.md | [run #40244409471](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40244409471) | FAIL; specific external-source reconciliation required |
| Grapevine generator requires **499** skills despite **501** current files, and its Pages workflow independently hardcodes 499 | [run #40244409493](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40244409493) | FAIL; projection/count drift |
| Remote HTTP MCP is **read-only**, bearer-required by default, with configurable `PUBLIC_READONLY` and bind host default `0.0.0.0` | `mcp-remote/src/index.ts` | SOURCE_SECURITY_POLICY_REVIEW_REQUIRED; no claim of public production deployment |
| ChatGPT-connected LeeWay MCP, signed owner-scoped Runtime/Device Bridge tool dispatch, real external modifications, independent production Veritas/receipt/learning readback | No authenticated end-to-end production result observed in this audit | NOT_VERIFIED |

**No objective overall percent complete is assigned:** a success ratio for enumerated tools or isolated tests is mathematically unrelated to the number of qualified executable skills or production admission. Readiness is judged by mandatory gates below. `595` is a protocol list size, not a deployed worker count.

## C. Ten independent pre-integration admission gates

| Gate | Required standalone acceptance | Current state | Precise missing work |
| --- | --- | --- | --- |
| S01 — Source/identity inventory | Deterministic complete catalog, unique stable IDs, orphan/duplicate resolution, owner/permission/skill-vs-tool classification, current digests | PARTIAL | Normalize 501/44/49/1 categories, preserve provenance and classify unimplemented/orphan tools |
| S02 — Skill supply-chain trust | Allowlisted source SHA/license, reviewed import diff, untrusted instruction isolation, signature/hash and rollback, quarantine of corrupt skills | NOT QUALIFIED | Reconcile 19 external manifests; add hostile-update/tamper tests and quarantine workflow |
| S03 — Real MCP protocols | SDK client/server list/call; stdio, authenticated HTTP; wrong-tool and no-token denial, compatible schema | **SOURCE PROTOCOL PASS** | Add security/transport stress tests, deployable endpoint verification to progress beyond CI |
| S04 — Real capability dispatch | Explicit registry maps skill requirements to qualifying provider/action, otherwise `NOT_EXECUTED` | PARTIAL | Align existing Tool Gateway and pending PR #10 without broad false `executed` claims |
| S05 — Authority and multi-model containment | Owner/tenant/role/scope/target/expiry/revocation/nonce checks, independent source of grants, LLM cannot promote instructions to permission | PARTIAL / NOT E2E | Denial matrix for poisoned model/tool output, scope escalation, same-request identity and replay |
| S06 — Resilience and idempotency | Bounded timeout, cancellation/STOP, duplicate request, crash/restart, uncertain-result reconciliation, safe retry and rollback | NOT QUALIFIED | Native MCP/provider fixture and persistence/recovery negative tests |
| S07 — Evidence truth contract | Same work ID + source pin + adapter PRE/POST + readback, precise claim states, independent Veritas interface simulation | PARTIAL | Schema/fixture to prove unverified result cannot be relabeled PASS and no fake Receipt/Learning |
| S08 — Portability/operability | Package-relative source, configurable bind/auth, start/stop/health, Linux/Windows/macOS runners; no mandatory personal drive or Docker | PARTIAL | Real packaging/OS matrix, deployment recipe, restart/disconnection and root-path variations |
| S09 — Public/remote exposure policy | Authenticated exact endpoint, safe default local bind, bounded requests, CORS/Origin/Host/reverse proxy, no creds in tool outputs | PARTIAL | Harden/test `mcp-remote` deployment defaults without changing its intended read-only scope |
| S10 — Whole-component release gate | All above checks green at exact source SHA; Grapevine + Skill Fabric + inventory + security + MCP native suites; rollback available | **BLOCKED** | Repair the 19 missing imported-source checks and 499-vs-501 Grapevine drift; integrate checks into one exact-head gate |

**Admission assessment:** S03 has direct isolated protocol PASS evidence. No other gate has sufficient independent closure evidence. The component as a whole is **NOT YET READY FOR FULL INTEGRATION**. This does not invalidate useful working MCP discovery today.

## D. Exact work that THIS component must finish first

### P0 — Structural correctness / baseline integrity

**AS-MCP-01 — Repair canonical inventory and Grapevine drift.** Owner: Agent Skills source. Update existing `scripts/audit-tool-inventory.mjs` only after reviewing PR #14; remove stale global assumptions from `grapevine-app/scripts/generate-grapevine-state.mjs` and `.github/workflows/deploy-pages.yml`. Derive current count from enumerated source and validate stable identity/digest, not a frozen historical number. Keep separate historical receipt values unchanged. **PASS:** canonical 501-current snapshot generates, build serves correct count and future approved addition/removal causes correct regeneration; duplicate ID and missing file fail.

**AS-MCP-02 — Reconcile all external skill imports (19 declared locations).** Owner: external skill curator/sync maintainer. Validate upstream repository/ref/path/license/approval/digest for each manifest entry; classify reachable, moved, withdrawn, license-blocked or quarantined. Preserve existing imports and provenance. The current sync script deletes an existing `upstream` subtree during synchronization; **never run destructive sync against owner data without staged diff, pin and rollback**. **PASS:** all active manifest entries resolve, or are explicitly quarantined with governed exceptions; corrupted import and changed upstream ref fail closed; original skills preserved.

**AS-MCP-03 — Single canonical capability inventory.** Join portable skills, legacy entries, bounded tools and provider bindings without claiming that all are operational. Define `REFERENCE_ONLY`, `LOCAL_DETERMINISTIC`, `PROVIDER_BOUND`, `PROVIDER_UNBOUND`, `QUARANTINED`, `DEPRECATED`, `ORPHAN_TOOL` classifications, owner, permissions, input/output schema and verifier requirements. **PASS:** every advertised entry belongs to exactly one class and versioned owner; a false provider report cannot yield `EXECUTION_READY`.

### P1 — Actual secure operation, not just description

**AS-MCP-04 — Governed skill execution router.** Reconcile existing Tool Gateway and PR #10's bounded execution classifier; do **not** merge a classifier that interprets a resolved prompt as an externally executed job. Use existing Runtime Fabric adapter interface for mutations. Require owner request, scope, source/skill digest, selected capability, exact adapter ID, task ID and explicit action approval. **PASS:** reference read returns `REFERENCE_ONLY`; deterministic local read only reports local read; one approved bounded operational test adapter returns actual measured post-state; unknown adapter blocks without side effects.

**AS-MCP-05 — MCP security/permissions test matrix.** Implement tests for missing/expired/wrong-audience tokens, wrong tenant/device, scope escalation, URL redirects, forged origin/host, replayed nonce, tool-name spoofing, payload size/JSON schema violations, malicious SKILL.md text, injected LLM instructions, and unapproved model registration attempts. No model or imported skill may set owner privileges or invent its own `veritasVerified`. **PASS:** every unauthorized path denies before adapter invocation and is auditable without leaking secrets.

**AS-MCP-06 — Remote MCP hardening.** Confirm exact intended public/read-only versus owner-private deployment. Review `0.0.0.0` default, `LEEWAY_MCP_PUBLIC_READONLY` bypass and optional allowed-host list; establish safe production deployment profile without disabling the intended public documentation use case. Require HTTPS termination in an approved host, bounded session/response/resource limits and correct OAuth/bearer contract. **PASS:** publicly reachable production profile is deliberately approved and independently tests denied requests, while local read-only mode works without unintended public exposure.

**AS-MCP-07 — Provider adapter qualification.** For every tool family identify an actual implementing adapter, executable operation, required target, input/output schema, grant type, resource limits, cancellation, version and test harness. Separate operational tools from 501 instruction documents; support `NOT_INSTALLED`/`NOT_PAIRED`/`NOT_AUTHORIZED`/`FAILED`/`VERIFIED` states. **PASS:** at least one representative real bounded read and one authorized bounded write are executed against an isolated test fixture with byte-for-byte readback; missing/unbound providers stay blocked. Full coverage must be tracked for every promised operational family, not inferred from two examples.

### P2 — Reliability, evidence and portability

**AS-MCP-08 — Durable invocation lifecycle.** Define request/work identity, idempotency key, adapter reservation, dispatch, STOP/cancel, timeout, uncertain execution, reconciliation, retry eligibility and recovery. Reuse Runtime Fabric's stateful workplane in production; standalone tests use an injected test adapter rather than creating a second scheduler/ledger. **PASS:** duplicate, crash-before-dispatch, crash-after-side-effect, interrupted connection, retry, STOP and reconciliation tests never issue unauthorized duplicate side effects.

**AS-MCP-09 — True execution and engineering evidence.** Define outcome classes `REFERENCE_ONLY`, `PLAN_CREATED`, `LOCAL_OPERATION_OBSERVED`, `REMOTE_OPERATION_OBSERVED`, `VERIFICATION_PENDING`, `VERIFIED_BY_INDEPENDENT_PROVIDER`. Retain ten engineering stages, source/commit/digest, owner permission, actual PRE/POST and post-state; never promote caller flags into independent authority. **PASS:** test-only verifier/reporter can correlate exact request/adapter/source and reject mismatches, while production signing and ledger fields remain unissued.

**AS-MCP-10 — Multi-platform release and portability.** Build source-pinned npm bundles and platform-neutral startup. Test Linux/Windows/macOS Node runners, unrelated working directories, optional remote transport, clean installation, update, restart, rollback and missing environmental bindings. Android/iOS may consume the remote/native Device Bridge contract but **must not be claimed to run the desktop Node server without qualification**. **PASS:** the exact package starts from an arbitrary install root, fails closed on missing secrets, can be restarted, and has reproducible package checksum/rollback.

**AS-MCP-11 — Full component CI.** Reconcile PR #14, #10, #30, #32 and approved related source without conflicting changes. Require independent lanes for inventory, external supply chain, Grapevine, stdio, HTTP/auth, provider mock/native fixture, adversarial tests, package/portability, restart/replay and evidence contracts. GitHub Actions on the **exact final commit SHA** must all pass. **PASS:** no disabled/ignored failing checks, no stubs masquerading as external physical success, no empty test suite.

**AS-MCP-12 — Owner acceptance / frozen integration handoff.** Publish one versioned `AGENT_SKILLS_MCP_READY_FOR_INTEGRATION` release candidate with source hashes, capability registry, explicit tested operation matrix, denied-case logs, installed package identity, permitted endpoints, configuration and adapter contracts, failures, rollback, ten-step evidence and remaining production dependencies. **PASS:** another authorized contributor can reproduce the standalone tests and install a test-only server without knowledge of developer drive paths or relying on an earlier conversation. No self-issued Veritas PASS.

## E. Handoff boundary — after independent component acceptance

Only after AS-MCP-01–12 pass may the component begin progressive *ecosystem integration*:

| Integration boundary | Agent Skills delivers | Other owner must supply | Result requires separate qualification |
| --- | --- | --- | --- |
| Agent Lee / Machine Consciousness | Scoped skill/tool discovery and plan | Canonical mission identity, intent, approved context and model | Real multi-turn objective retention, skill selection and observed completion |
| Standards + Formula | Digest, request, candidate action, permission class | Actual policy decision and Formula evaluation | Same-request signed/verified authority; no model self-approval |
| Runtime Fabric | Bounded dispatch request, idempotency, cancellation contract | Registered real execution adapter/workplane | Durable queue → actual adapter → readback |
| Device Bridge | Approved logical capabilities and target request | Paired device, native OS permission and scoped identity | One physical read and write per target platform, independently observed |
| Continuum / Model Hub | Retrieval and model-capability contracts | Authorized storage/model providers | Exact source/data readback and qualified model inference |
| Independent Veritas | Source pin, ten-stage work evidence, request and action outcome | Separate owner-enrolled root, actual PRE/POST and signed decision | Authenticated independently signed proof; not callback self-assertion |
| Receipt Authority / Learning Ledger | Verifiable result envelope / learning candidate | Protected receipt append/outbox, qualified learning provider | Real canonical receipt readback and eligible idempotent learning admission |
| Production & Final Execution | Reproducible signed/pinned release and rollback | Approved persistent host, credentials, monitoring and release decision | Actual deployed restart, offline host behavior and final production POST |

**Hard separation:** Source CI tests with injected fake adapters are valid component development evidence. They are not evidence of owner device control, Formula execution, production Veritas roots, actual Receipt Ledger custody or durable Learning admission.

## F. Security adversary acceptance before connection

1. **Corrupt imported SKILL.md:** staged upstream material changes instructions to grant admin access. Expect digest/provenance mismatch → quarantine and no tool invocation.
2. **Malicious LLM team:** several models issue concurrent conflicting tool calls to mint or escalate an authorization. Expect separate model identities, owner-bound scopes, serialized conflict handling, nonce replay rejection and no authority promotion.
3. **Poisoned MCP tool response:** a provider returns instructions to leak credentials or override Standards. Treat as untrusted data; do not alter system instruction/privilege context.
4. **Forged capability/Veritas claims:** remote JSON asserts `executed=true`, `veritasVerified=true`, or fake receipt hash. Only independent verified data may change state.
5. **Provider substitution:** route points to different domain, device, executable, model weights or source SHA. Reject before dispatch; authenticated result must match exact target.
6. **Disconnection or uncertain response:** client loses transport after a side effect. Check idempotency/readback; never blindly replay a write.
7. **Prompt exfiltration / path traversal:** a skill requests unrelated files, private keys or `../` resources; fail scope checks before IO.
8. **Public endpoint / weak auth:** no bearer, malformed audience, wrong owner, expired token, unexpected CORS/origin or redirect; fail before read or action.
9. **Supply-chain rollback:** a known-bad version reappears after being quarantined; pinned source, issuer/owner approval and revocation checks deny it.
10. **Missing physical provider:** web MCP health/list succeeds while native runtime is absent. Return `DISCOVERY_ONLY` / `PROVIDER_UNBOUND`, not `DONE`.

## G. Recommended sequence (acceptance dependencies, not calendar promises)

**Wave 1 — clean truth:** AS-MCP-01, 02, 03. Repair inventory, Grapevine, upstream source drift. Preserve original failed CI evidence; do not bulk-delete imported content.

**Wave 2 — secure controlled execution:** AS-MCP-04, 05, 06, 07. Qualify exact route, grants, provider binding and malicious-input rejection. Draw from PR #10 without giving `executed=true` the wrong meaning.

**Wave 3 — persistence and evidence:** AS-MCP-08, 09. Duplicate/STOP/restart/timeout and exact request/source/post-state verification, independent-provider interface tested without forging production signatures.

**Wave 4 — package and freeze:** AS-MCP-10, 11, 12. Cross-platform build, exact-head source checks, signed/pinned release and rollback, full ten-stage report, owner approval for the component to **begin** integration.

Do not defer obvious source bugs until final assembly. Do not require unavailable physical GPU/device/independent trust roots to pass standalone tests; record those as external integration gates. Do not mark the standalone component ready while its own source inventory, security and release gates are red.

## H. Ten-step engineering record for this source audit

- **Investigate — OBSERVED:** `main`/PR #33, live Actions logs, 501 source SKILL.md, 595 SDK-listed tools, earlier Skill Fabric/Grapevine failures, existing gateway PR #10 and inventory PR #14.
- **Diagnose — OBSERVED:** protocol transport succeeded; full library still fails upstream-source and stale-count CI; most skills remain instructions, provider governance/execution unfinished.
- **Plan — DOCUMENTED:** precise end state, S01–S10 gates and AS-MCP-01–12 bounded work items, in owning PR #33.
- **Implement — SOURCE_DOC_ADDED:** this readiness report is an audit/requirements artifact only; no live runtime behavior is changed.
- **Test — OBSERVED PRIOR SHA:** 25/25 bounded tests and native stdio/authenticated HTTP MCP tests at PR #33 source head `8bbfd93b...`; run exact new head CI after documentation update.
- **Validate — SOURCE_ONLY:** GitHub files, source statuses, CI failure causes and overlap checked. Not a separate Standards/Veritas result.
- **Repair — NOT_PERFORMED:** this audit does not silently repair ongoing owner PR #10/#14 or external sync.
- **Retest — PENDING_NEW_HEAD_CI:** no repair claim; documentation commit requires exact revision checks.
- **Verify — NOT_PRODUCTION_VERIFIED:** independent production Veritas, device execution, actual Formula and canonically admitted receipts are outside this review.
- **Evidence — SOURCE_ONLY:** this document, PR #33, SHA-pinned Actions, existing Standards SH-01/C3 links. **RECEIPT NOT CREATED; LEARNING LEDGER NOT UPDATED.**

**Current verdict:** **AGENT_SKILLS_MCP_PARTIALLY_BUILT / PROTOCOL_SOURCE_TESTED / STANDALONE_INTEGRATION_ADMISSION_BLOCKED**. Move the component through S01–S10 and preserve every failure/repair/test before a production handoff.
