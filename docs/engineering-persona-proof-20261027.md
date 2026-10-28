# LeeWay Engineering persona correction — execution checklist and proof
Date: 2026-10-27 (America/Chicago)
Status: SOURCE TESTED; LIVE HOST OUTPUT/VOICE UNVERIFIED

Original Creator requirement: the agent must communicate as a LeeWay Engineering Agent in every substantial delivery—clear, poetic, rhythmic, high-knowledge, executive and grounded in real engineering evidence. A dry dashboard, unsupported rhyme, or summary that stops before the authorized work is done is a delivery failure, not a new mission.

## Checkable work

- [x] Investigate current canonical expressive-identity skill and Agent Skills entrypoint.
- [x] Diagnose the actual gap: instructions described Level 2 voice, but a mandatory engineering-report narrative+evidence pre-send check was not explicit enough.
- [x] Implement the Creator's combined persona/evidence directive **in the existing** `skills/leeway-og-expressive-identity/SKILL.md`, not a new persona.
- [x] Bind it to the existing `.github/copilot-instructions.md` entrypoint.
- [x] Add VOICE-01 through VOICE-05 replay cases and two source regressions without fabricating model behavior.
- [x] Execute exact-source persona contract tests [run #40615143417](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40615143417): **10/10 PASS, 0 FAIL** at source commit `3de1f80fed320c67037c30a476170e2cf0f65bac`.
- [x] Integrate that test suite into Windows/macOS/Linux portability workflow.
- [x] Confirm cross-platform portability run [#40615272670](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40615272670) SUCCESS on Windows, macOS and Ubuntu at correction commit `c53ef3ba542db26cf7eb4a273b4625a7a7b1abce`.
- [x] Repeat the dedicated 10/10 persona-source test at [run #40615272683](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40615272683), SUCCESS.
- [ ] Execute actual model-output replay against VOICE-01…VOICE-05 and capture the delivered text.
- [ ] Observe actual Voice Fabric TTS/Agent Lee speech when an authorized live voice host is connected.
- [ ] Obtain independent Veritas review and eligible canonical Receipt/Learning Ledger promotion.

## Evidence, not decoration

Source implementation is inspectable in [Agent Skills PR #30](https://github.com/4citeB4U/LeeWay-Agent-Skills/pull/30).
Native source-proof test: [Actions #40615143417](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40615143417), 10 pass, 0 fail. This validates the **source contract**, not all LLM outputs or vocal delivery.

General portability and separate native persona tests must not be conflated. A GitHub branch commit or a JSON file is not a canonical LeeWay Receipt Ledger entry or independent Veritas result. Canonical Formula authority governs the higher-order task; the style rules do not imply a Formula evaluator actually executed.

The original engineering mission continues. Repairing this delivery defect does not reset previous completed Runtime Fabric or NotebookLM accomplishments.

## Observed corrective branch — Windows CRLF

The first cross-platform source test run [#40615143435](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40615143435) failed **only** on the Windows job at `agent-config.yaml missing always-on section`, while Ubuntu and macOS passed. The actual defect was brittle newline matching in the test itself, not evidence the persona contract had vanished. The existing source-test reader was corrected to normalize CRLF → LF at commit `c53ef3ba542db26cf7eb4a273b4625a7a7b1abce`. Both the cross-platform run [#40615272670](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40615272670) and dedicated persona run [#40615272683](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/40615272683) concluded **SUCCESS**. The failure and repair remain under the same original mission.

**Do not overpromote:** no multi-model observed-output conformance, Voice Fabric speech proof, or independent production Veritas is established by these CI runs.
