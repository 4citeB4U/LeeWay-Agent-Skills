#!/data/data/com.termux/files/usr/bin/bash
: <<'LEEWAY_HEADER'
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.ANDROID
TAG: LEEWAY.SKILLS.ANDROID.DEVELOPER_STATE_AUDIT

COLOR_ONION_HEX:
NEON=#39FF14
FLUO=#00E5FF
PASTEL=#DDF7FF

ICON_ASCII:
family=lucide
glyph=scan-search

5WH:
WHAT = Read-only audit of Android developer-workstation prerequisites and common harmful debug toggles
WHY = Diagnose the exact authority and developer-option state before mutation
WHO = Creator-authorized LeeWay/Agent Lee operators
WHERE = Android Termux hosts
WHEN = New-phone preparation, workstation recovery, permission debugging, or pre-mutation inspection
HOW = Read app identity, Android properties, ADB state, optional governed shell settings and known debug flags

AGENTS:
ASSESS
AUDIT
VERIFY

LICENSE:
MIT
LEEWAY_HEADER

set -u
export TMPDIR="${PREFIX:-/data/data/com.termux/files/usr}/tmp"
mkdir -p "$TMPDIR"

echo "LEEWAY_ANDROID_DEVELOPER_STATE_AUDIT"
echo "timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "local_identity=$(id)"
echo "android_release=$(getprop ro.build.version.release)"
echo "android_sdk=$(getprop ro.build.version.sdk)"
echo "arch=$(uname -m)"
echo "adbd=$(getprop init.svc.adbd)"
echo "usb_config=$(getprop sys.usb.config)"
echo "adb_client=$(command -v adb 2>/dev/null || echo absent)"

if command -v adb >/dev/null 2>&1; then
  adb version 2>/dev/null | head -2 | sed 's/^/adb_version=/'
  adb devices -l 2>/dev/null | sed 's/^/adb_device=/'
fi

for key in   debug.hwui.overdraw   debug.layout   debug.egl.force_msaa   debug.hwui.force_dark   debug.hwui.profile   debug.hwui.show_dirty_regions   debug.hwui.show_layers_updates   persist.sys.strictmode.visual
do
  printf '%s=%s\n' "$key" "$(getprop "$key")"
done

if command -v leeway-priv >/dev/null 2>&1; then
  echo "privilege_gate_begin"
  leeway-priv status 2>&1 || true
  for key in     development_settings_enabled     adb_enabled     adb_wifi_enabled     always_finish_activities     stay_on_while_plugged_in
  do
    value="$(leeway-priv "settings get global $key" 2>/dev/null || true)"
    printf 'global.%s=%s\n' "$key" "$value"
  done
  echo "android_user=$(leeway-priv 'am get-current-user' 2>/dev/null || true)"
  echo "privilege_gate_end"
fi

echo "AUDIT_ONLY=TRUE"
echo "MUTATION_PERFORMED=FALSE"
