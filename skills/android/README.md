<!--
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.ANDROID
TAG: LEEWAY.SKILLS.ANDROID.DOMAIN_INDEX

COLOR_ONION_HEX:
NEON=#39FF14
FLUO=#00E5FF
PASTEL=#DDF7FF

ICON_ASCII:
family=lucide
glyph=smartphone

5WH:
WHAT = Android domain routing index for LeeWay Agent Skills
WHY = Give Agent Lee and compatible runtimes one discoverable entry point for Android workstation preparation and authority routing without duplicating skill authority
WHO = Leeway Industries / Creator-authorized runtimes
WHERE = skills/android/README.md
WHEN = Android phone setup, developer preparation, workstation recovery or privilege troubleshooting
HOW = Route to the canonical skill and its adapters/contracts

AGENTS:
ASSESS
AUDIT
ROUTE

LICENSE:
MIT
-->

# LeeWay Android Skills

## Canonical developer-workstation skill

Use:

`skills/leeway-secondary-workstation/SKILL.md`

Aliases:

- **LeeWay Developer Android State**
- **Android Developer Workstation**
- **Android Secondary Workstation**

Do not create a second workstation authority merely because the device, OEM, Android version or LLM changes.

## Supporting artifacts

- `config/android-developer-state-v1.json` — machine-readable state/authority contract.
- `skills/leeway-secondary-workstation/scripts/android-developer-state-audit.sh` — read-only preflight/audit.
- `skills/leeway-secondary-workstation/scripts/leeway-priv.sh` — fail-closed privileged-shell adapter.
- `skills/leeway-device-bridge/SKILL.md` — Android-native device/provider authority.
- `receipts/leeway-developer-android-state-20261001.json` — privileged reference qualification.

## Routing law

Ordinary development:
`Agent -> Desktop Commander -> Termux app UID`.

Governed Android shell:
`Agent -> Termux -> leeway-priv -> authenticated ADB -> uid=2000(shell)`.

Android-native UI/hardware:
route through a separately authorized Device Bridge/native provider.

`shell != root`
`running != healthy`
`paired != connected`
`configured != proven`

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
