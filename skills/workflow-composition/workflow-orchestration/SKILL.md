---
name: workflow-orchestration
description: "LeeWay-governed Complex Workflow Composition workflow. Use when a task requires workflow orchestration procedures, validation, and evidence."
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  source-class: legacy-native-normalized
  canonical-path: skills/workflow-composition/workflow-orchestration/SKILL.md
---
/*
LEEWAY HEADER — DO NOT REMOVE

REGION: AI.WORKFLOW
TAG: AI.WORKFLOW.WORKFLOW_ORCHESTRATION

COLOR_ONION_HEX:
NEON=#FF6347
FLUO=#FF7F50
PASTEL=#E8F5E9

ICON_ASCII:
family=lucide
glyph=zap

5WH:
WHAT = workflow orchestration skill for Leeway-compliant AI systems
WHY = Provides capabilities for workflow-composition within the AIskills ecosystem
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = skills/workflow-composition/workflow-orchestration/SKILL.md
WHEN = 2026
HOW = Leeway-governed skill.md definition with structured capabilities and tags

AGENTS:
ASSESS
AUDIT

LICENSE:
MIT
*/

# Complex Workflow Composition

**Expert in**: Building, orchestrating, and managing complex multi-step workflows with error handling, branching, and dynamic execution.

## Capabilities

- Design conditional and branching workflows
- Implement parallel task execution pipelines
- Create stateful workflow engines
- Handle dynamic workflow generation
- Implement rollback and compensation logic
- Create workflow templates and reusable patterns
- Monitor and debug workflow execution
- Implement workflow versioning and evolution

## Use this skill when:

- Building complex business processes
- Orchestrating dependent tasks with conditions
- Creating data pipelines with branching logic
- Implementing long-running business workflows
- Building ETL/ELT systems
- Creating approval and review workflows
- Handling workflow failures and retries

## Key techniques

- DAG (Directed Acyclic Graph) workflows
- State machines for workflow control
- Temporal patterns for async workflows
- Saga pattern for distributed transactions
- Compensation and rollback patterns
- Workflow scheduling and cron jobs
- Conditional branching and decision points
- Error handling and retry strategies

## Tags

`workflows` `orchestration` `automation` `pipelines` `distributed-systems` `etl`


## LeeWay orchestration boundary

This skill builds task/workflow DAGs, state machines, retries, compensation and long-running business processes. It may be selected inside a TASK_CAPABILITY_WEAVE, but `leeway-skill-orchestrator` owns skill composition and `leeway-parallel-workplane` owns Agent Lee delegated-worker lifecycle. Workflow state must not silently become governance authority.
