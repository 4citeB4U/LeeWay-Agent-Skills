---
name: hyperframes
description: LeeWay-governed binding to HeyGen HyperFrames for agent-authored HTML-native deterministic video, motion graphics, explainers, product videos, decks, captions, and render workflows.
license: Apache-2.0 upstream
metadata:
  authority: LeeWay Standards
  source: heygen-com/hyperframes
  canonical-skill: skills/hyperframes/SKILL.md
  mode: syncable-remote-canonical
---

# HyperFrames — LeeWay Binding

Canonical source: `heygen-com/hyperframes` → `skills/` on `main`.
Mandatory upstream router: `skills/hyperframes/SKILL.md`.

Use synchronized `upstream/hyperframes/SKILL.md` first, then load only the routed HyperFrames domain/workflow skills. If upstream is absent, fetch the canonical skill suite through authorized GitHub/network access.

## Route selection

Prefer HyperFrames when the requested deliverable benefits from HTML/CSS/JS-native, frame-seekable, deterministic rendering or the project is already HyperFrames-based.

Prefer Remotion when the project is explicitly Remotion/React-video based or its React composition ecosystem is the better fit. Do not load both by default. HyperFrames includes an explicit Remotion-port workflow when conversion is requested.

## Execution boundary

Verify the HyperFrames CLI/runtime and rendering dependencies before claiming preview, lint, render, publish, batch render, or frame-identical output. Generated HTML alone is not proof of a rendered video.

State while `upstream/` is absent: `REMOTE_CANONICAL`.
