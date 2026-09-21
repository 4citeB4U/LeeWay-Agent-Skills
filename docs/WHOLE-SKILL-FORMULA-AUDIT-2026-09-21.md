# LeeWay Whole Skill + Tool Formula Tunnel Audit — 2026-09-21

## Evidence state

OBSERVED repository tree after audit repairs:
- 688 blob files before final audit-report commit;
- 246 skills/**/SKILL.md artifacts;
- 28 top-level/core-style skills;
- 218 nested domain/external/workforce skills;
- 149 skills under skills/external/**;
- 237 broad tool/script-like artifacts by path/extension classification.
These are artifact counts, not runtime execution proof.

The legacy scripts/skills-registry.json declares 44 internal domain skills. All 44 referenced artifacts were observed present. It is a partial registry, not the complete skill universe.

## Formula/context probes applied

1. What are we not discovering?
2. What needs enhancement?
3. What skill is missing?
4. What tool is missing?
5. What orchestration level is missing?
6. What execution level is missing?
7. What other skills can compose with this skill?
8. How does this skill connect upstream/downstream?
9. Which tools does it own/use, and which skill governs each tool?
10. Which verifier and recovery capability closes the loop?

## Missing architecture discovered and repaired

- Completion persistence → leeway-agent-operating-loop.
- Provider/fallback/capability debt → leeway-capability-resilience.
- Whole-skill graph composition → leeway-skill-orchestrator.
- Independent verification authority → leeway-veritas.
- Evidence/receipt authority → leeway-receipt-authority.
- Verified learning closure → leeway-learning-ledger.
- Device Bridge Agent Skills contract → leeway-device-bridge.
- Native host fallback capability contract → leeway-host-commander.
- Whole-repo skill/tool graph auditor → scripts/audit-skill-tool-graph.mjs.
- Recursive capability-universe generator → scripts/generate-capability-universe-observation.mjs.
- Machine-readable relationship contract → config/skill-tool-relationship.schema.json.
- Tool ownership state → ORPHAN_TOOL law in leeway-tool-gateway.

## Orchestration stack

Creator Intent
→ Bootstrap / Continuity / Message Ingress
→ Context Engineering
→ Formula Governance
→ Agent Operating Loop
→ Capability Resilience
→ Universal Capability Kernel
→ Skill Orchestrator
→ TASK_CAPABILITY_WEAVE
→ FOCAL_EXECUTION_SET
→ Tool Gateway / native capability / skill workflow
→ VERIFICATION_SET / leeway-veritas
→ Receipt Authority
→ Learning Ledger
→ Context/capability update
→ Human Conversation
→ OG Expressive Identity

RECOVERY_SET remains available across focal execution and verification.

## Skill combination model

Skills combine by relationships rather than by domain label:
PROVIDES, REQUIRES, SUPPORTS, USES_TOOL, TOOL_OWNED_BY, VERIFIES, FALLBACK_FOR, CONFLICTS_WITH, SUPERSEDES, SHARES_PRIMITIVE_WITH, TRANSFERS_PATTERN_TO, INPUTS_FROM, OUTPUTS_TO.

Examples:

### Application delivery weave
creator-intent + context-engineering + formula-governance
→ full-stack-application + system-design + api-design + database-design
→ react/css/frontend patterns
→ authentication/security
→ unit/integration/advanced testing
→ CI/CD + deployment readiness
→ observability/reliability
→ Veritas + receipt + learning.

### Host repair weave
agent-operating-loop + capability-resilience
→ host-commander + debugging + observability + security
→ Tool Gateway/native PowerShell provider
→ Veritas
→ receipt
→ learning.

### Device assistance weave
device-bridge + security/auth + accessibility/testing as relevant
→ native platform adapter
→ files/diagnostics/screen/control capability
→ Veritas
→ receipt
→ learning.

### Creative/UI weave
design-suite + external design skills + frontend skills + accessibility
→ implementation tool/provider
→ visual/functional verification
→ receipt/learning.

### Research/explanation weave
research + reference-authority + context-engineering
→ data analysis/fact-checking/domain skills
→ human-conversation + OG expressive identity.

## Remaining evidence boundaries

- Artifact presence does not prove every tool is live.
- Tool ownership is now required but the full 237-artifact ownership graph has not yet been manually/semantically assigned; the auditor exists to surface gaps.
- External skills remain subordinate capability material, not constitutional authority.
- Canonical Formula numeric/state outputs were not invented during this qualitative Formula/context audit.
- Host D: synchronization/runtime reload is a separate deployment proof.
- MCPs may remain providers where useful but are not the center of this architecture.

## Acceptance

SOURCE ARCHITECTURE: PASS after repairs.
FULL TOOL RUNTIME QUALIFICATION: NOT CLAIMED.
FULL 237-ARTIFACT SEMANTIC OWNERSHIP MAPPING: NEXT CAPABILITY-GRAPH EXPANSION GATE.
