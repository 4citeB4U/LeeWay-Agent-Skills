---

name: leeway-parallel-workplane

description: Governed foreground-conversation and delegated-execution orchestration for LeeWay agents. Keeps the parent conversational/control plane responsive while independent workers/subagents execute bounded jobs with interrupt, cancel, retool, checkpoint, evidence, and merge contracts. Never claims background execution unless the active harness actually provides it.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards

  mode: conversational-control-plus-parallel-workplane

  stage: post-skill-orchestrator-pre-focal-execution

  orchestrator: skills/leeway-skill-orchestrator/SKILL.md

  veritas: skills/leeway-veritas/SKILL.md

---

# LeeWay Parallel Workplane

## Core law

The parent Agent Lee control plane remains available to the Creator. Long or parallel work belongs on bounded execution lanes when the harness supports them.

conversation/control plane != execution workplane

Do not fake concurrency. If the current harness cannot sustain background workers across turns, classify that capability UNAVAILABLE and use bounded in-turn parallel tool execution or an authorized external worker/runtime.

## Planes

### Conversation Control Plane

Owns Creator dialogue, intent changes, acceptance gate, priority, authority, worker dispatch, interruption, retooling, evidence review, and final merge.

### Execution Workplane

Owns bounded delegated jobs. A worker receives only the authority/capabilities needed for its assignment and never becomes the parent Agent Lee identity.

## Worker contract

Every delegated job carries: workId, parentObjectiveId, objective, acceptanceCriteria, authorityScope, capabilityWeave, focalExecutionSet, verificationSet, recoverySet, dependencies, mutationScope, checkpointPolicy, interruptPolicy, evidenceDestination, status, and returnContract.

## Worker states

PROPOSED → DISPATCHED → RUNNING → CHECKPOINTED → COMPLETED. Alternate states: PAUSE_REQUESTED, PAUSED, CANCEL_REQUESTED, CANCELLED, RETOOL_REQUIRED, FAILED, BLOCKED, SUPERSEDED.

## Interrupt and retool law

A Creator change must be evaluated against active work. The parent may CONTINUE, PAUSE, CANCEL, SUPERSEDE, or RETOOL a worker. Retooling creates a new explicit work revision; it does not silently rewrite what the worker was previously authorized to do.

## Parallelism law

Parallelize only work units that are independent or whose shared state is read-only/partitioned. Serialize conflicting mutations. Never allow two workers to mutate the same canonical target without an explicit merge/locking strategy.

## Reporting law

Workers report checkpoints/evidence to the parent; they do not directly promote their own result to completion. Parent orchestration + Veritas determines acceptance.

## Capability-gap law

If a worker discovers a missing skill/tool/provider, it reports the exact gap to Capability Resilience. The parent may dispatch a separate capability-development lane while unaffected lanes continue.

## Conversation availability

Do not make the Creator wait for a long explanation before work begins. Dispatch eligible lanes first, then report concise checkpoints while work continues where the harness genuinely supports continued execution.

## Harness boundary

This skill is portable governance. Actual background persistence, subagent spawning, cancellation, messaging, and concurrency require a runtime/harness that exposes those controls. configured != running; dispatched != executing; executing != verified.

## Formula/context probes

For each parallel plan ask: What are we not discovering? What needs enhancement? Which jobs are truly independent? What shared state can conflict? What can be delegated? What must remain with the parent? How can the Creator interrupt safely? What evidence lets the parent retool or merge correctly?

## Final route

Creator conversation ↔ Parent Agent Lee control plane → Skill Orchestrator → Parallel Workplane → bounded workers/providers → checkpoints → Veritas → merge → receipt → learning.