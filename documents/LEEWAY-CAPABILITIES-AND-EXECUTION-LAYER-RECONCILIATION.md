# LeeWay Capabilities and Execution Layer — Reconciliation Baseline

LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.CAPABILITIES.DOCUMENTATION
TAG: LEEWAY.CAPABILITIES.CANONICAL_RECONCILIATION_BASELINE
5WH:
WHAT = Document the proposed unified Skills, MCPs, Tools, Adapters and Wrappers execution layer
WHY = Prevent duplicated authorities and false execution claims while consolidating ecosystem capabilities
WHO = Leeway Industries / Creator-directed Agent Lee audit
WHERE = LeeWay-Agent-Skills/documents/LEEWAY-CAPABILITIES-AND-EXECUTION-LAYER-RECONCILIATION.md
WHEN = 2026-10-08
HOW = Source-first inventory, explicit authority resolution, bounded execution tests and Veritas evidence
AGENTS: DISCOVER, AUDIT, DOCUMENT; no deployment authority conveyed
LICENSE: MIT

## Name and scope

Proposed user-approved house name: **LeeWay Capabilities and Execution Layer** (LCEL).
Unifies capability discovery/identities and governed access to Skills, MCP servers, Tools, Universal Adapters and Wrappers. It must REUSE existing canonical authorities rather than create a new Runtime Fabric, Formula, skill registry or dispatcher.

## Source observations (not promotion)

- Skills checkout: `E:/LeeWay-Work/agent-skills-benchmark`, observed HEAD `fe33c00cb2a466728d996fc2a9145107ca308ab5`; local working tree already modified. Git origin: `4citeB4U/LeeWay-Agent-Skills`.
- Skills MCP: `mcp-server/src/index.ts`; its generic `executeSkill` returns an execution prompt, not observed host execution. MCP protocol smoke test reported 592 tools (543 skills, 49 bounded capability tools); that is discovery, not 592 execution passes.
- Remote Gemini Skills MCP: `mcp-remote/`; read-only skill/authority bridge per README; remote HTTPS and authentication not verified.
- Universal Capability Kernel: `skills/leeway-universal-capability-kernel/SKILL.md` defines constitutional, ambient, task-weave and focal execution layers.
- Historical Runtime Fabric capability universe: `E:/Leeway-Ecosystem v2.1.4/Leeway Runtime Fabric/capability-registry/registry/leeway-universe.manifest.json`; prior observed SHA-256 `B2C813621E6EB9B4C91C00378F3FEFCA5360600E533205A0A2C99FEC1A52D5A8`. Contains stale absolute root references; resolve by relative path and source authority before execution.
- Legacy Skills Gateway: `Leeway Runtime Fabric/skills-gateway/gateway.mjs` returns dispatch acceptance without performing dispatch; NOT a verified executor.
- Edge Capability Layer: `Leeway Runtime Fabric/capability-registry/runtime.mjs` has specific browser/device lanes and consent constraints; do not treat its independent lane existence as evidence of universal capability ownership.
- Additional unqualified sources: LeeWay VS Code App Forge, LeeWay IDE, Cerebral recovery/Skills University, LTX, HyperFrames, LeeWay Voice, Continuum, Blender, ComfyUI, Agent VT, legacy tools and other MCPs.

## Required catalog record

Each entry must have: stable capability ID; type (skill/MCP/tool/adapter/wrapper); role/category; canonical owner/source/ref and SHA; discovered aliases/duplicates; runtime entrypoint; transport; input/output schema; dependencies; adapter mapping; permission and risk; Formula adapter/provenance; dispatcher binding; pre/post-Veritas checks; test recipe; independently observed result; evidence pointer; maturity status.

## Rules and gates

1. Discovery is NOT execution. A `SKILL.md` prompt-only return is `DOCUMENTATION_ONLY`, unless its bound executor independently acts.
2. `MCP tools/list` is NOT implementation qualification. Each tool must be individually classified and tested.
3. One canonical owner per capability; many aliases/surfaces may reference it. Never infer duplicate status from names alone. No deletion or moving legacy files before provenance and rollback.
4. Every operational action uses Agent Lee ingress, Runtime Fabric, Veritas pre-gate, verified Formula decision/input where applicable, authorized dispatcher/adapter, real execution, Veritas post-gate, receipt, Learning Ledger. Do not fabricate Formula Q69 or vector mappings.
5. Machine Consciousness may discover eligibility but must not gain authority to execute by discovery alone.
6. Required classifications: VERIFIED_EXECUTABLE, VERIFIED_READ_ONLY, DOCUMENTATION_ONLY, BLOCKED_DEPENDENCY, BLOCKED_AUTHORITY, DISCOVERED_UNTESTED, DUPLICATE_ALIAS, RETIRED.
7. C3 acceptance requires unique inventory reconciliation; a passing runtime/tool call and independent observation for each promoted executor; failure-path and authorization tests; source and receipt traceability.

## State and next gate

STATUS: RECONCILIATION BASELINE ONLY — not a promoted canonical runtime or final inventory.
NEXT: enumerate existing VS Code, Cerebral, ecosystem legacy, current Skills MCP, Formula MCP, and specialized application registrations into per-entry records; resolve the live canonical dispatcher before implementation changes. Preserve local modifications and do not merge or delete without verified authority.
