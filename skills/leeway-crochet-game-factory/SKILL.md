---
name: leeway-crochet-game-factory
description: Designs and validates the shared learning architecture for Loop Lab, Tension Tower, Pattern Quest, Amigurumi Rescue, and Yarnfolk Town Builder. Use for crochet lesson schemas, stitch mechanics, tension and gauge feedback, adaptive progression, accessibility, mistake diagnosis, and the deterministic crochet MCP tools.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards
  mode: domain-factory
  mcp-server: mcp-server/src/crochet-tools.ts
  compatibility: Agent Skills / MCP / web / mobile / 2D / 3D
---

# LeeWay Crochet Game Factory

## Shared domain

Build the five experiences as modes over one governed crochet model:

| Mode | Primary learning loop |
|---|---|
| Loop Lab | gesture and stitch-sequence rehearsal |
| Tension Tower | consistency, gauge, and controlled adjustment |
| Pattern Quest | notation, repetition, and dependency reasoning |
| Amigurumi Rescue | shaping, increases/decreases, assembly, and recovery |
| Yarnfolk Town Builder | project planning, resource choices, and cumulative mastery |

Keep lesson identity, stitch vocabulary, prerequisites, attempt evidence, accessibility settings, progress, and receipts interoperable across modes.

## MCP boundary

The initial MCP is one domain server with focused tools:

- `crochet_validate_lesson` validates portable lesson content;
- `crochet_diagnose_attempt` reasons only from supplied count, tension, insertion, and turning-chain fields;
- `crochet_calculate_gauge` performs deterministic gauge mathematics;
- `crochet_recommend_next_lesson` resolves prerequisite eligibility.

Do not split each game into a separate MCP until independent deployment, permissions, ownership, or scaling requirements are proven.

## Evidence boundary

Text and numeric input do not prove physical hook motion, yarn tension, stitch geometry, hand position, camera observation, or learner mastery. Mark those signals `UNOBSERVED` unless a verified sensor/CV adapter supplies them with provenance.

Future adapters may add:

- camera-based stitch and hand-state observation;
- 2D/3D stitch visualization;
- haptic or controller telemetry;
- authored pattern import/export;
- learner profile and durable progression storage.

Each adapter remains separate from the deterministic domain core and must declare permissions, confidence, privacy, and failure modes.

## Learning progression

Prefer this dependency order unless learner evidence warrants a change:

`slip knot → chain → single crochet → turning/rows → half-double/double crochet → increases/decreases → rounds → gauge → pattern reading → shaped projects`

Adapt pacing, cue density, repetition, contrast, handedness, captions, motion reduction, input method, and error recovery without silently changing the learning objective.

## Validation

For a lesson or game change:

1. validate its content contract;
2. test prerequisite reachability and prevent cycles;
3. test count/gauge calculations with known examples;
4. verify accessible alternatives for color, audio, motion, timing, and precise pointer gestures;
5. keep simulated success separate from physical-world mastery;
6. attach build/test/protocol evidence before declaring the MCP operational.

## MVP

Start with Loop Lab, a small lesson graph, deterministic gauge/count feedback, local progress, and accessible 2D visuals. Add 3D, computer vision, multiplayer, marketplace, and physical telemetry only after the shared contracts and learning loop are verified.
