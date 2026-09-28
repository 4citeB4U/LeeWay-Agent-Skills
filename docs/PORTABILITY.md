# LeeWay ecosystem portability and verification

The [shared contract](../config/portability-contract.md) applies to every canonical/imported skill and ecosystem integration. Root AGENTS instructions, agent configuration, Copilot instructions and both stdio/HTTP skill retrieval paths carry it. The core has no required drive, machine directory, model provider or device identity.

## What runs where

| Component | Portable contract / implementation | Verification boundary |
|---|---|---|
| Skills source and orchestration | Repository-relative resources; 493 skill entrypoints; shared adapter-selection policy | Windows, Linux and macOS stdio/HTTP MCP checks passed at implementation e42f89d; specific domain adapters remain separately qualified |
| Formula | Byte-preserved canonical v1, built-in Node HTTP host, stdio MCP, relative Docker Compose deployment | Windows, Linux and macOS runtime suites passed at implementation a0c569c; mobile clients and specific LLM hosts need their own binding tests |
| Speech | speech.output / cancel / resume / voice_inventory | Current Windows reader is an adapter; native/browser/remote equivalents must be selected and tested on other platforms |
| Browser | Authorized browser capability selected according to host policy | Chrome extension, Playwright and host browser interfaces are distinct adapters, not interchangeable proof |
| Notebook Studio Direct Git Bridge | Notebook/source/promotion capabilities should bind through adapters | Existing bridge has Chrome MV3, local-service and Windows credential dependencies; cross-platform credential and browser adapters are still required |
| Device Bridge | Governed paired device capability, separate from source discovery | Native runtime requires actual supported device pairing; no universal phone/desktop support claimed |
| Models | Capability-qualified provider behind the same task/evidence contract | No arbitrary model is marked tested; tool support/modalities/authorization must be verified |

GitHub is canonical source/distribution. Runtime execution still occurs on a chosen host or service. “Path agnostic” means no fixed path dependency, not that physical storage disappears. A phone may use a governed remote service when local execution is unavailable. Do not move plaintext secrets or remove authentication to create apparent portability.

## Enforcement

Verified 2026-09-28: [Skills three-platform run](https://github.com/4citeB4U/LeeWay-Agent-Skills/actions/runs/36383914955) and [Formula three-platform run](https://github.com/4citeB4U/Leeway-formula-live/actions/runs/36383917762) both concluded success. These prove the named core test suites, not every skill's domain operation on every device.

`node scripts/audit-portability.mjs` checks all SKILL.md entrypoints, shared runtime source and JSON config for fixed Windows drives/user-home paths. Exact dated historical inventory branches are retained as evidence. This is a bounded static check, not a complete semantic audit or runtime certification.

`node mcp-server/scripts/portability-smoke.mjs` verifies instruction retrieval from an unrelated working directory and asserts the shared portability law accompanies representative skills. `.github/workflows/portability.yml` runs that check on Linux, Windows and macOS. Each integration still requires task-level verification and receipts.

Platform implementations remain explicit: PowerShell helpers require PowerShell; Windows speech requires its speech provider; encrypted Windows credential material needs a secure authorized migration before other OS adapters can use equivalent credentials. These dependencies are outside the portable core and must not silently become universal requirements.
