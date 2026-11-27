# LeeWay Universal Voice Bus Browser Lab

This GitHub Pages lab tests the external contract, not server-side hosting.

- Browser-local model target: HuggingFaceTB/SmolLM2-1.7B-Instruct, optional Qwen/Qwen2.5-1.5B-Instruct.
- Browser inference: Transformers.js, WebGPU when available, WASM fallback.
- Input: browser SpeechRecognition when exposed, typed fallback.
- Output: browser SpeechSynthesis.
- Trace: Universal Voice Bus event envelope with generation epochs and cancellation.

## Evidence limits
GitHub Pages cannot run a persistent Python/LLM backend. Model weights are fetched by the browser at test time. Browser/device support, memory and model compatibility determine whether local inference succeeds. Browser speech APIs are a conformance surface, not the final LeeWay acoustic engine.

## Acceptance
1. Page loads.
2. Capability probe reports device surfaces.
3. A 1–2B model loads locally OR failure is captured as evidence.
4. Typed prompt reaches the model and returns a response.
5. Response can be spoken where SpeechSynthesis exists.
6. Interrupt increments epoch and cancels browser speech.
7. Trace preserves events/errors.

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
