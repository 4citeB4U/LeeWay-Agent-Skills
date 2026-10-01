#!/data/data/com.termux/files/usr/bin/bash
: <<'LEEWAY_HEADER'
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.ANDROID
TAG: LEEWAY.SKILLS.ANDROID.PRIVILEGE_GATE

COLOR_ONION_HEX:
NEON=#39FF14
FLUO=#00E5FF
PASTEL=#DDF7FF

ICON_ASCII:
family=lucide
glyph=shield-check

5WH:
WHAT = Fail-closed Termux adapter for routing explicitly privileged Android commands through verified Shizuku/rish or authenticated ADB shell
WHY = Preserve ordinary Termux as default while allowing governed Android shell authority only after exact identity proof
WHO = Creator-authorized LeeWay/Agent Lee operators
WHERE = Qualified Android Termux hosts
WHEN = Only for Android operations that require authority above the ordinary app UID
HOW = Probe -> verify uid=2000(shell) -> bind provider -> deny destructive classes -> log -> execute

AGENTS:
ASSESS
AUDIT
EXECUTE
VERIFY

LICENSE:
MIT
LEEWAY_HEADER

set -u
export TMPDIR="${PREFIX:-/data/data/com.termux/files/usr}/tmp"
mkdir -p "$TMPDIR"

LOG="${LEEWAY_PRIV_LOG:-$HOME/.leeway/authority/logs/privileged.log}"
mkdir -p "$(dirname "$LOG")"
cmd="${*:-}"

ts(){ date -u +%Y-%m-%dT%H:%M:%SZ; }

deny='(^|[[:space:]])(reboot|poweroff|halt|shutdown|su|mount|umount|mkfs|dd|fdisk|parted|fastboot)([[:space:]]|$)|rm[[:space:]]+-rf[[:space:]]+/'

lane=""
probe=""
adb_serial=""

if command -v rish >/dev/null 2>&1; then
  probe="$(rish -c 'id' 2>/dev/null || true)"
  echo "$probe" | grep -q 'uid=2000(shell)' && lane="rish"
fi

if [ -z "$lane" ] && command -v adb >/dev/null 2>&1; then
  serials="$(adb devices 2>/dev/null | awk '$2=="device"{print $1}')"
  count="$(printf '%s\n' "$serials" | sed '/^$/d' | wc -l | tr -d ' ')"
  if [ "$count" = "1" ]; then
    adb_serial="$(printf '%s\n' "$serials" | head -1)"
    probe="$(adb -s "$adb_serial" shell id 2>/dev/null || true)"
    echo "$probe" | grep -q 'uid=2000(shell)' && lane="adb"
  elif [ "$count" -gt 1 ]; then
    probe="AMBIGUOUS_ADB_TARGETS"
  fi
fi

if [ "${1:-}" = "status" ]; then
  printf 'current=%s\nprivileged_lane=%s\nadb_serial=%s\nprobe=%s\n'     "$(id)" "${lane:-BLOCKED}" "${adb_serial:-none}" "${probe:-none}"
  exit 0
fi

[ -n "$cmd" ] || {
  echo "usage: leeway-priv status | <android-shell-command>"
  exit 2
}

echo "$cmd" | grep -Eqi "$deny" && {
  echo "BLOCKED: destructive command denied"
  printf '%s DENY %s\n' "$(ts)" "$cmd" >>"$LOG"
  exit 78
}

[ -n "$lane" ] || {
  echo "BLOCKED: no unambiguous verified uid=2000(shell) authority"
  printf '%s BLOCKED %s\n' "$(ts)" "$cmd" >>"$LOG"
  exit 77
}

printf '%s lane=%s target=%s cmd=%q\n' "$(ts)" "$lane" "${adb_serial:-rish}" "$cmd" >>"$LOG"

if [ "$lane" = "rish" ]; then
  exec rish -c "$cmd"
fi

exec adb -s "$adb_serial" shell "$cmd"
