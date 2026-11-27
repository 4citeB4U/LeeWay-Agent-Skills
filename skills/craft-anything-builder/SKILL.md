---
name: craft-anything-builder
description: Inspect and reconstruct authorized websites, apps and games through Craft Anything tooling, with LeeWay skill routing, evidence and permission gates.
---

<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.CRAFT_ANYTHING
TAG: LEEWAY.AGENT_SKILLS.CRAFT_ANYTHING.BUILDER
5WH:
WHAT = Route authorized Craft Anything inspection and rebuild work as a portable specialist skill.
WHY = Reuse existing LeeWay skill discovery without a second authority or execution plane.
WHO = Creator-authorized agents and operators under LeeWay Standards.
WHERE = skills/craft-anything-builder/SKILL.md.
WHEN = 2026-11-22.
HOW = Fail-closed scope checks, host qualification, bounded MCP adapter and evidence-driven validation.
LICENSE = Repository license applies to LeeWay-authored integration; external tool licenses require separate review.
-->

# Craft Anything Builder

This is a **skill instruction**, not proof that Craft Anything is installed, licensed, authenticated, running, or connected. Route requests through the existing LeeWay Agent Skills MCP skill discovery and Runtime/Formula authorization boundaries. Do not register a second control plane, issue execution grants, or claim independent Veritas/Receipt proof.

## Use when

- An authorized operator requests observable UI and behavior inspection or rebuilding of a website, app, or game.
- An agent needs to verify a Craft Anything CLI installation or MCP adapter.
- A qualified host must compare a rebuild with source-observable behavior and preserve provenance.

## Required gates

1. **Authorization and scope.** Record operator authority, permitted target, operation, data-handling boundaries and applicable licensing. Refuse or escalate unauthorized targets. Do not bypass authentication, access controls or protected content.
2. **Mode.** Default to observable, clean-room UI/behavior inspection. Binary disassembly/decompilation, source extraction and `--deep` require separate explicit approval and applicable rights; never silently escalate.
3. **Host qualification.** Resolve a qualified host or authorized remote adapter, not a hardcoded path, PC or OS. Discover the installed CLI and its supported syntax using `--help` before invoking subcommands. The following are **candidate commands from the supplied draft, not independently verified CLI contracts**:

   ```text
   craft-anything-cli doctor
   craft-anything-cli commands
   craft-anything-cli setup --client <client> --dry-run
   craft-anything-cli mcp
   ```

   Do not assume `--dry-run`, `--yes`, `doctor --client`, `rebuild`, `--rounds` or `core_evidence_browse` exists until confirmed on the installed version. Never run configuration-changing setup without owner authorization.
4. **MCP routing.** The Craft Anything stdio MCP process, when available, is an optional tool adapter behind the existing LeeWay skill router. Preserve the original identity, tool permissions, authentication, and device/workspace boundaries. Listing tools is not proof of execution.
5. **Study → build → check → ready.** Capture target and stack; inspect observable desktop/tablet/mobile layouts where authorized; build only within the approved workspace; compare visuals, interactions, navigation, responsiveness and accessible behavior. Review `checks/` only if the tool actually produces it. Distinguish untested backend state, payments, auth, persistence and private APIs.
6. **Evidence.** Record target scope, tool and adapter versions, commands, exit codes, source hashes where applicable, outputs, tests, positive and negative findings, and gaps. Mark results `VERIFIED`, `FAILED`, `NOT_PROBED` or `NOT_EXECUTED`. Never fabricate Formula, Veritas, Receipt Authority or Learning Ledger acceptance.
7. **Delivery.** Use an isolated branch/draft PR with explicit review. Preserve existing Agent Lee, Codex and other agents' work. Do not merge, deploy or enable execution without the required owner approval.

## Negative qualification tests

- Unauthorized target → refuse inspection and record denial; no CLI invocation.
- Missing separate deep-mode approval → reject `--deep`; no disassembler invocation.
- CLI missing or unsupported subcommand → fail visibly with exact diagnostic; do not simulate inspection.
- MCP adapter unavailable or client unauthenticated → report `NOT_EXECUTED`, not connected.
- Missing workspace authority → no local writes, agent configuration changes or source extraction.
- Visual-only match → do not assert backend, authentication, persistence or functional equivalence.
- Absent independent custody or physical-device proof → no production admission or device-execution claim.

## Portability and governance

Follow `config/portability-contract.md`, canonical LeeWay Standards R01–R25, the applicable Agent Skills contracts, independent authority boundaries and the 12-stage engineering cycle. Skill discovery alone establishes neither a qualified Craft Anything installation nor live MCP connectivity.

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
