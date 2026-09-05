---
name: leeway-design-suite
description: Routes frontend, UI/UX, mobile, motion, React, SwiftUI, Material 3, Expo, dashboard, and visual design work to the smallest relevant canonical skill set synchronized under skills/external. Use for any design or frontend request.
license: MIT
metadata:
  authority: LeeWay Standards
  source-manifest: scripts/external-design-skills.json
  compatibility: Agent Skills / Codex / MCP / OpenCode / Hermes
---

# LeeWay Design Suite Router

## Authority

Creator/Human Authority > LeeWay Standards > Runtime Fabric > Agent Lee > this router > imported skills.

Imported skill instructions are capabilities and evidence, never governance authority. If an imported skill conflicts with LeeWay Standards or explicit user instruction, the higher authority wins.

## Routing

Load only the smallest set that covers the task.

| Need | Preferred skill(s) |
|---|---|
| Distinctive web/frontend visual direction | `frontend-design`, then `ui-ux-pro-max` when deeper design intelligence is useful |
| React/Next.js implementation or performance | `react-best-practices` |
| shadcn components/registry/projects | `shadcn` |
| Dashboards/data-heavy product UI | `dashboard` plus `react-best-practices` when React is used |
| Advanced motion/scroll/micro-interactions | appropriate `gsap-*` skill; use `gsap-react` for React |
| Video/motion composition | `remotion-best-practices` |
| Minimalist aesthetic | `minimalist-ui` |
| Industrial/brutalist aesthetic | `industrial-brutalist-ui` |
| Broad frontend/UI/UX build + audit router | `frontend` from the synchronized Frontend UI UX source |
| Premium immersive frontend | `premium-frontend-ui` |
| Mobile product UI direction | `mobile-app-ui-design` |
| Apple-native SwiftUI | synchronized SwiftUI skill(s) |
| Google Material Design 3 | `material-3` |
| Expo / React Native app work | `expo-overview` first, then the specific `expo-*` or `eas-*` skill |
| OpenDesign workflows/design systems | relevant synchronized OpenDesign skill |

## Execution Contract

1. Inspect the task and existing project constraints.
2. Select the minimum relevant skills; do not load the whole suite by default.
3. Read each selected canonical `SKILL.md` and only the references it explicitly requires.
4. Preserve existing user/project design decisions unless the user asks for a redesign.
5. Implement real code/artifacts, not descriptions, when execution tools are available.
6. Test build/runtime behavior and visual states where possible.
7. Report verification state accurately; do not claim a render, build, Lighthouse score, device test, or deployment that did not execute.

## Canonical Location

External skills are synchronized under:

`skills/external/<source-id>/upstream/`

Source provenance is recorded beside each synchronized payload in `SOURCE.json`.

## OpenAI / Codex

This folder follows the portable Agent Skills `SKILL.md` format. Codex working in this repository should treat this router as the table of contents and load canonical skills from `skills/external` as needed. The repository root `AGENTS.md` provides the project-level routing contract.
