---
name: leeway-voice-fabric
description: Governed use, development, integration, testing and promotion of the canonical LeeWay Voice Fabric for agents, workers, applications and Harnesses.
---

# LeeWay Voice Fabric

Use the canonical voice service at `4citeB4U/LeeWay-Voice-Fabric`. Do not create application-owned divergent voice engines when the required capability can be satisfied through Voice Fabric.

## Purpose

Voice Fabric provides model-, provider-, device-, OS- and path-agnostic speech capabilities. It is independently consumable and is also a capability used by the Sensory Harness.

## Required operating sequence

1. Identify the caller and required speech capability.
2. Resolve or require a `voicePackageId`.
3. Query the canonical voice catalog/registry.
4. Select a qualified provider adapter through Runtime Fabric.
5. Prepare the selected voice package.
6. Speak or stream ordered text.
7. Preserve interruption semantics independently of upstream job cancellation.
8. Capture software timing/evidence.
9. Run acoustic/user verification when a claim depends on actual heard quality.
10. If Formula evaluation is requested, collect 16×6 calibrated observations and call the canonical Formula evaluator through the authorized voice domain mapping.
11. Preserve receipt and learning state only after Veritas.

## Voice identity

Agent Lee uses `agent-lee-voice-one`. Other agents/workers do not inherit it automatically. Use `chatterbox-default-natural` as the ordinary shared default unless creator/policy selects another package.

## Package types

- `CLONED_REFERENCE`
- `CHATTERBOX_DEFAULT_PROFILE`

A package contains identity/configuration; it does not own reasoning.

## Streaming behavior

Prefer progressive complete-clause/phrase speech rather than waiting for an entire generated answer. Preserve bounded queue, ordered words, one-mouth playback, one-segment lookahead and stale-audio suppression.

## Interruption

`speech.cancel` cancels audible/queued speech. It does not cancel the parent work item.

## Portability

Track separately:
- CONTRACT_PORTABLE
- ADAPTER_IMPLEMENTED
- PLATFORM_TESTED

Never treat repository presence, Pages deployment, model load or a successful tool call as acoustic proof.

## Developer integration

External developers may use the Voice Fabric SDK/Pages service without adopting Sensory Harness. LeeWay internal systems should bind by logical capability and `voicePackageId`, not copied implementation files.

## Formula boundary

The semantic voice mapping is `voice-runtime-state-v1`. Until calibrated ranges and real observations exist:

`FORMULA EVALUATION = NOT EXECUTED`

Never invent missing ranges or Q69 results.

## Creator-facing read-aloud authority

For Agent Lee Creator-facing speech, use only `agent-lee-voice-one`. Do not substitute Windows System.Speech, browser default SpeechSynthesis, Chatterbox shared profiles or unrelated voices. If Voice One cannot execute, report `VOICE_UNAVAILABLE`.

ChatGPT-native Read Aloud/voice is owned by the ChatGPT client. When the user chooses that surface, do not replace it with a LeeWay fallback voice.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE BEGIN -->

# LeeWay Universal Formula Governance

Authority: Creator and LeeWay Standards.
Formula identity: LEEWAY-FORMULA-v1.0.

The canonical LeeWay Formula is mandatory throughout
the entire LeeWay ecosystem.

Every current and future application, capability,
agent, worker, employee, model, provider, adapter,
automation and integration inherits this requirement.

All applicable interactions, responses, decisions,
actions, revisions, executions, computations, model
inferences, resource allocations, information transfers,
memory operations, storage operations and deployments
must consume the canonical Formula through their
authorized and qualified domain contracts.

Formula availability, documentation, configuration,
health and historical results do not constitute actual
Formula consumption for a new operation.

Recover relevant authorized memory before substantive
work. Preserve identity, provenance, Formula integrity,
authorization, original receipts and verified learning.

Never invent observations, adapter mappings, mathematical
results, execution evidence or independent verification.

No application may bypass applicable Formula governance
by dispatching directly to a provider.

Every new application and capability must demonstrate
applicable Formula consumption before production admission.

Preserve the existing authority hierarchy:

Creator > Standards > Root of Trust > Runtime Fabric >
Agent Lee > Harness > Formula > skills/models/tools >
execution > Veritas > Receipt Authority > Learning Ledger.

Execute the complete engineering loop:

INVESTIGATE > DIAGNOSE > PLAN > IMPLEMENT > TEST >
VALIDATE > REPAIR > RETEST > VERIFY > EVIDENCE >
CHECKPOINT > CONTINUE.

Documentation compliance does not establish executable
enforcement or production admission.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE END -->
