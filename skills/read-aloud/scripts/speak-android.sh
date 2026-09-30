#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

ROOT="$HOME/.leeway/read-aloud"
MUTE="$ROOT/muted"
BASE="http://127.0.0.1:54321"
TEXT_PATH=""
ACTION="speak"

mkdir -p "$ROOT"

while [ $# -gt 0 ]; do
  case "$1" in
    --text) TEXT_PATH="$2"; shift 2 ;;
    --stop) ACTION="stop"; shift ;;
    --resume) ACTION="resume"; shift ;;
    --status) ACTION="status"; shift ;;
    *) echo "Unknown argument: $1" >&2; exit 2 ;;
  esac
done

health() { curl -fsS --max-time 3 "$BASE/health"; }

ensure_bridge() {
  if health >/dev/null 2>&1; then return 0; fi
  am start -n industries.leeway.readaloud/.MainActivity >/dev/null 2>&1 || true
  for _ in 1 2 3 4 5 6; do
    sleep 0.5
    if health >/dev/null 2>&1; then return 0; fi
  done
  echo "READ_ALOUD_BRIDGE_UNAVAILABLE" >&2
  return 1
}

case "$ACTION" in
  stop)
    mkdir -p "$ROOT"
    printf 'muted\n' > "$MUTE"
    ensure_bridge || true
    curl -fsS -X POST "$BASE/stop" || true
    echo "READ_ALOUD_MUTED"
    exit 0
    ;;
  resume)
    rm -f "$MUTE"
    echo "READ_ALOUD_RESUMED"
    exit 0
    ;;
  status)
    ensure_bridge
    health
    exit 0
    ;;
esac

if [ -f "$MUTE" ]; then
  echo "READ_ALOUD_MUTED"
  exit 0
fi

[ -n "$TEXT_PATH" ] || { echo "--text PATH is required" >&2; exit 2; }
[ -f "$TEXT_PATH" ] || { echo "Text file not found: $TEXT_PATH" >&2; exit 3; }

ensure_bridge
curl -fsS -X POST --data-binary "@$TEXT_PATH" "$BASE/speak"
echo
