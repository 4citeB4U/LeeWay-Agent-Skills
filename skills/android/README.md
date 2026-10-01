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
