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
