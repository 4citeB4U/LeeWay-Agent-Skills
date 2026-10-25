<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.DIAGNOSTICS
TAG: LEEWAY.BLOCKED_QUALIFICATION_ROOT_CAUSE_PLAYBOOK_V1
5WH: WHAT = Reusable qualification-failure diagnosis; WHY = stop generic blocked states from hiding repairable causes;
WHO = Leeway Industries / Leonard Jerome Lee; WHERE = docs/BLOCKED-QUALIFICATION-ROOT-CAUSE-20261025.md;
WHEN = 2026-10-25; HOW = deterministic layer-by-layer observations, never relaxed authority.
AUTHORITY: DIAGNOSTIC_REFERENCE_ONLY. LICENSE: MIT.
-->

# LeeWay BLOCKED_QUALIFICATION: expedited diagnosis

## Proven incident (Agent-Lee, 2026-10-25)
- Runtime Supervisor source pins: 5/5 MATCH.
- Supervisor boot adapter `-ValidateOnly`: PASS.
- Direct invocation of the **existing** `createGovernedHostReadRuntime` with the configured owner binding: `NATIVE_BINDING_HASH_MISMATCH`.
- Trusted runtime binding expects native Device Bridge binding SHA-256 `90db9173b18d6756803388e47c3c710c5f936383bc73fdd6694f29e319a56b3c`.
- Active `host-commander.binding.v1.json` is `948e14434251e1537a638dcf561c51b9d4749c35b6eed0a8131b737ebeebb8dd`.
- Native binding file exists. Its owner field is `4citeB4U/LEEWAY-DEVICE-BRIDGE`, provider is `LEEWAY_NATIVE_HOST_COMMANDER`, and `remoteExposure=false`.
- **No production qualification or trust re-enrollment follows from these observations**.

## Why generic BLOCKED_QUALIFICATION proliferates
`leeway-runtime-supervisor/supervisor.mjs` wraps the provider constructor and registration in a `try { ... } catch { ... }` and emits only `BLOCKED_QUALIFICATION`. This erases the actual exception, including `NATIVE_BINDING_HASH_MISMATCH`. Similar catch-all gates should be checked using a read-only direct qualification probe, not patched by guessing.

## Expedited response loop
1. **Identify gate**: record supervisor, provider, request, source revision, host and timestamp.
2. **Find exact check**: follow the exported factory/constructor called inside the generic catch. Avoid privileged command dispatch.
3. **Read-only reproduce**: invoke only the deterministic preflight/constructor with existing owner-configured paths and expected SHA. Record sanitized exact failure code. Do not print credentials or unrestricted file content.
4. **Walk nested pin graph**: compare the *actual bytes* of every referenced artifact with its immediate parent's expected digest. A top-level binding may pass while a nested native binding fails.
5. **Classify**: `MISSING_FILE`, `SCHEMA_DRIFT`, `PIN_MISMATCH`, `PROVIDER_UNREGISTERED`, `AUTHORITY_UNQUALIFIED`, `RUNTIME_START_FAILED`, `DEPENDENCY_UNAVAILABLE`, `EVIDENCE_UNAVAILABLE`.
6. **Reconcile without blind trust**: for `PIN_MISMATCH`, compare approved original and current binding semantically, assess dependencies, provenance, signer and scope; only authorized independent enrollment can approve a new pin. Never merely rewrite a SHA to match unknown bytes.
7. **Retest progressively**: source pin → nested pin → provider construction → registration → supervisor activation → actual PRE/execution/POST → canonical receipt → Learning Ledger → restart recovery.
8. **Learning Ledger policy**: file this diagnostic as a candidate lesson only. Promote as operational learned behavior after cross-host replay, independent review, and authoritative admission.

## System-wide automation acceptance
Every high-level `BLOCKED_QUALIFICATION` result must include *sanitized* `stage`, `reasonCode`, `dependencyId`, `expectedSourceRevision`, `checkedAt`, and `executionAttempted:false`; private file paths and key material stay out of external logs. A generic catch may still deny access but must not erase the internal reason evidence. Verify fail-closed behavior with negative tests; do not auto-repair trusted pins.
