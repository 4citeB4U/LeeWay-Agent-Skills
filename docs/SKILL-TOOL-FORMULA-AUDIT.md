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

Repository tree inspection observed 679 tracked blob files, 22 canonical top-level skills/<name>/SKILL.md artifacts, and 235 tool/script-like files by broad classification. The legacy scripts/skills-registry.json declares 44 skills and must not be treated as canonical count without reconciliation. These counts describe artifacts, not live execution.

## Required architecture

CONSTITUTIONAL_CORE → AMBIENT_CAPABILITY_FIELD → TASK_CAPABILITY_WEAVE → FOCAL_EXECUTION_SET → VERIFICATION_SET → RECOVERY_SET → EVIDENCE/LEARNING

The Universal Capability Kernel owns the manifold model. Skill Orchestrator owns graph composition. Capability Resilience owns provider failure/debt/fallback. Skill Factory owns intake/promotion. Tool Gateway owns host/tool authority. Lifecycle Governance owns promotion/cooling/retirement. MCPs are optional providers, not the center.