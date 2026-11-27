# LeeWay Agent Voice

Standalone browser test application for the LeeWay voice architecture.

## Goal
Tap microphone → speech transcript → local 1–2B model → spoken response → interrupt while speaking.

## Current browser model profiles
- HuggingFaceTB/SmolLM2-1.7B-Instruct (primary)
- Qwen/Qwen2.5-1.5B-Instruct (alternate)

## LeeWay voice stack represented
1. Frontier Voice Architecture Selector
2. Universal Voice Bus
3. Acoustic Coprocessor Fabric contract
4. Real-Time Voice & Multimodal Infrastructure
5. Generation epochs / stale-output rejection
6. Speech playout / interruption
7. Evidence trace

## Important boundary
This Pages build is a browser conformance application. Browser SpeechRecognition and SpeechSynthesis are temporary platform adapters. It does not claim to execute the full native AEC/WebRTC/Formula Fabric stack. Local model load/inference must succeed on the target device before runtime PASS.

## Target standalone repository
4citeB4U/LEEWAY-AGENT-VOICE

The connected GitHub tool cannot create a new repository. Until that repository is created, this deployable project is staged here under docs/agent-voice/.

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
