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
