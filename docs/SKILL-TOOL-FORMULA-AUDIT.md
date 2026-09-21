# LeeWay Skill + Tool Formula Audit

## Acceptance question

Can the repository truthfully answer what canonical skills exist, what tool surfaces exist, what is missing, how skills combine, how skills/tools connect, what orchestration/execution/verification/recovery levels are missing, and what registry/file drift exists?

## Formula/context probes

1. What are we not discovering?

2. What needs enhancement?

3. What skills are missing?

4. What tools are missing?

5. What orchestration levels are missing?

6. What execution levels are missing?

7. How can each skill compose with multiple other skills?

8. How does each skill connect to other skills/tools?

9. How do tools connect back to governing skills?

10. What verifier/recovery path closes each consequential execution?

## Current observed inventory (2026-09-21)

Repository tree inspection observed 679 tracked blob files were observed before the orchestrator additions. Deeper recursive inspection established 241 actual skills/**/SKILL.md artifacts: 23 top-level/core-style authorities and 218 nested/domain/external/workforce skills. The legacy scripts/skills-registry.json declares 44 internal domain skills; all 44 referenced artifacts are present, so it is a partial registry rather than the complete capability universe. Tool/script-like counts are broad artifact classifications and do not prove live execution. These counts describe artifacts, not live execution.

## Required architecture

CONSTITUTIONAL_CORE → AMBIENT_CAPABILITY_FIELD → TASK_CAPABILITY_WEAVE → FOCAL_EXECUTION_SET → VERIFICATION_SET → RECOVERY_SET → EVIDENCE/LEARNING

The Universal Capability Kernel owns the manifold model. Skill Orchestrator owns graph composition. Capability Resilience owns provider failure/debt/fallback. Skill Factory owns intake/promotion. Tool Gateway owns host/tool authority. Lifecycle Governance owns promotion/cooling/retirement. MCPs are optional providers, not the center.

## Authority partition

Top-level LeeWay constitutional/orchestration skills may carry core authority according to AGENTS.md. Nested internal/domain skills are capability nodes. skills/external/** are imported capability material and remain subordinate evidence/capabilities; presence does not grant constitutional authority. The complete universe must be generated from repository truth, not inferred from the 44-entry legacy registry.
