# LeeWay Contributor Handoff Protocol

**Entry point:** [Shared Contributor Coordination Hub, Agent Skills issue #22](https://github.com/4citeB4U/LeeWay-Agent-Skills/issues/22). **Governance:** canonical LeeWay Standards R01–R25. **Mission records live in their owning repository**, not in a new database. For Golden Package C3 use [Runtime Fabric issue #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21) and its [architectural acceptance checklist](https://github.com/4citeB4U/Leeway-Runtime-Fabric/blob/repair/floating-agent-interaction/docs/C3-ARCHITECTURAL-ACCEPTANCE-CHECKLIST.md).

## Mandatory preflight for every contributor and model instance

1. Read the current canonical `AGENTS.md`, Bootstrap Authority, Continuity Authority, and R01–R25 from GitHub. Determine current source branch/commit rather than assume local copies are canonical.
2. Find the owning product/repository, its current Master Checkpoint, mission issue, acceptance checklist, and real Veritas evidence.
3. Search existing source, open PRs, issue comments, CI, branches, release evidence, and contributor handoffs **before researching or building the same capability**.
4. Classify needed functionality: ALREADY BUILT / PARTIALLY BUILT / MISSING GLUE / TRULY MISSING. Note source refs, exact SHAs, verified runtime maturity, and blocked dependencies.
5. Check overlapping changed files, pending claims and current execution owners. If another contributor owns a conflicting mutation, coordinate in the owning issue **before editing**. Reading and independent tests can proceed in parallel.
6. Publish a bounded work-intent comment on the owning mission issue with contributor identification (tool/model only; no credentials), parent objective, task IDs, intended files, baseline SHA, dependencies, verification plan, rollback and human-approval boundary.

## Handoff / reuse record

Every meaningful work product leaves a searchable GitHub record linked to the *owning mission issue*. Use this format in an issue comment or PR description:

```text
HANDOFF: <short capability or repair name>
CONTRIBUTOR: <tool/model or human role; no secrets>
UTC: <actual timestamp>
PARENT OBJECTIVE / ACCEPTANCE CASE: <mission and case ID>
STATUS: ALREADY BUILT | PARTIALLY BUILT | MISSING GLUE | TRULY MISSING
SOURCE: <canonical repo; branch/ref; inspected commit SHA>
CLAIM / FILES: <owned paths and relevant overlapping PRs>
EXECUTED: <actual command/provider + observed result; or NOT EXECUTED>
TESTED: <exact test and CI URL; or NOT TESTED>
VERITAS / RECEIPTS: <real verified IDs/links or NOT CREATED>
ROLLBACK: <approved tested route or NOT QUALIFIED>
REUSABLE FINDINGS: <what later workers may reuse without rediscovery>
UNRESOLVED: <precise missing authority/dependency>
NEXT ACTION: <specific unchanged acceptance gate>
```

## End-of-work reconciliation

- Link any implemented branch, PR, tests, CI, source/hash and *physically tested* outcomes back to the owning mission issue. Update the acceptance checklist only with task-specific proof.
- When a defect interrupts the mission: Investigate → Diagnose → Plan → Implement → Test → Validate → Repair → Retest → Verify → Evidence; then return to the interrupted gate.
- Preserve existing concurrent contributors' branches and uncommitted work; serialize conflicting mutations. Never automatically merge across conflicting authority owners.
- Separate source verified, CI verified, deployed, observed and Veritas-qualified states; never call a queued job an executed job or an inferred model reply a receipt.
- Reuse historical research and verified findings via GitHub references, but revalidate freshness when source or acceptance changes.
- Do not expose API tokens, customer/private data, local filesystem inventory, or secrets in public GitHub records.
- A missing issue or search capability is PARTIAL/BLOCKED and must be disclosed; do not fabricate coordination success.

## Current active mission

Golden Package C3 stays owned by Runtime Fabric [issue #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21). The central Agent Skills [hub #22](https://github.com/4citeB4U/LeeWay-Agent-Skills/issues/22) is the **directory for contributors**, not a new cognitive authority, request queue or Learning Ledger. Other mission/product issues retain their own acceptance gates.

## Architecture acceptance checklist for coordination

- [ ] All substantive LeeWay sessions resolve Hub #22 and the owning product's current mission issue.
- [ ] Each independent contributor can find the previous checkpoint and current claimed files before starting.
- [ ] Each completed scoped task publishes a source- and evidence-linked handoff, no duplicate work.
- [ ] Conflicting contributor work is detected and reconciled without discarding user changes.
- [ ] An independent new model instance reproduces continuity from GitHub alone.
- [ ] CI validates the protocol documents and bootstrap references.
- [ ] Physical execution and learning admission continue to require independent Veritas evidence.

Documentation and CI adoption are **not** proof of all contributor compliance; those cases remain open until separately tested.

## Creator completion mandate — mandatory stop rule

**A contributor's job is to finish the assigned acceptance outcome, not merely report partial edits.** Follow the complete LeeWay factory and engineering loop: IDEA → NEED → AUTHORITY → DISCOVERY → CANONICAL CHECK → FORMULA/DECISION → IMPLEMENTATION → EXECUTION → VERITAS → PASS/FAIL → FREEZE; and Investigate → Diagnose → Plan → Implement → Test → Validate → Repair → Retest → Verify → Evidence. Reuse existing implementations, then complete all connected work within granted authority and time, including integration, GUI interaction, runtime activation, regression tests, independent receipts, and cross-device acceptance where required.

**Do not stop after an isolated source edit, unit test, CI green, service-health check, or diagnostic click when the required real user outcome remains unverified and further authorized actions are available.** Continue through the remaining acceptance gates in the same execution cycle. Repair failures and retest until the outcome is physically verified, or identify a concrete irreducible blocker (missing access, human approval, incompatible source ownership, unavailable device, or safety/tool denial) with exact evidence. Never reframe a partial test as task graduation, or infer observed audio, GUI, cursor, or dual-device acceptance from code or endpoint status.

**End-of-work report contract:** report (1) original owner objective and current acceptance numerator/denominator, (2) exact completed capabilities and independent receipts, (3) affected source SHAs, deployed runtime and device state, (4) remaining blocked gates with their real reasons, (5) rollback state, and (6) contributor handoff. Completion requires the full specified behavior, not a fresh to-do list. When interrupted, preserve a truthful current checkpoint and resume the same incomplete acceptance rather than repeating discovery. Never manufacture progress numbers or claim asynchronous work.

## Existing-capability-only and Creator authorization boundary

**Default rule: operate only the LeeWay capabilities already built and authorized.** Before proposing, downloading, staging, testing, installing, swapping, or activating any additional engine, model, adapter, provider, service, or architecture, first inspect existing canonical components and reuse them. A diagnostic failure never constitutes approval to introduce a substitute. Even isolated experiments require explicit Creator authorization when they would introduce a new component. No contributor may reinterpret a request to repair an existing capability as permission to acquire or build its replacement. If an existing component cannot meet acceptance, report the proven limitation and request authorization for any materially new approach. Unauthorized candidates must be stopped and removed without modifying deployed authority, selections, or source. The Creator's stop/reversal instruction takes precedence over the contributor's previous plans.

## Integrated-system-only testing and change discipline (Creator clarification)

Tests and experiments must exercise the **actual existing LeeWay components, authority path, adapters, and intended integration points** for the capability under repair. An isolated replacement or imitation that succeeds outside the ecosystem is not acceptance: it generates additional rewrites, reconfiguration, duplication and delay. Do not invent a detached experimental system, alternative engine, service or registry to simulate progress.

For every apparent missing component, inspect canonical source, installed state, working branches, handoffs and receipts; classify **ALREADY BUILT / PARTIALLY BUILT / MISSING GLUE / TRULY MISSING**. 'Thought to be missing' is not permission to build: first prove it genuinely absent. Repair the existing component or connect existing glue in place. Configure only the specific missing or defective part, preserving all working paths and downstream compatibility. Truly missing capabilities or changes beyond the authorized existing design require Creator approval **before** development or testing. Verify the entire existing integration path and its actual behavior, then record receipts without assigning acceptance from detached tests.
