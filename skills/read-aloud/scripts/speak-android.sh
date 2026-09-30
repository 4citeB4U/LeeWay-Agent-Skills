#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

ROOT="$HOME/.leeway/read-aloud"
MUTE="$ROOT/muted"
BASE="${LEEWAY_READ_ALOUD_URL:-http://127.0.0.1:54321}"
TEXT_PATH=""
CHUNK_PATH=""
ACTION="speak"
STREAM_ID=""

mkdir -p "$ROOT"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --text) ACTION="speak"; TEXT_PATH="${2:-}"; shift 2 ;;
    --stop) ACTION="stop"; shift ;;
    --resume) ACTION="resume"; shift ;;
    --status|--health) ACTION="status"; shift ;;
    --prepare) ACTION="prepare"; shift ;;
    --stream-start) ACTION="stream-start"; STREAM_ID="${2:-}"; shift 2 ;;
    --stream-chunk) ACTION="stream-chunk"; STREAM_ID="${2:-}"; CHUNK_PATH="${3:-}"; shift 3 ;;
    --stream-end) ACTION="stream-end"; STREAM_ID="${2:-}"; shift 2 ;;
    *) echo "Unknown argument: $1" >&2; exit 2 ;;
  esac
done

request() {
  local method="$1" path="$2"
  shift 2
  curl -fsS --max-time 12 -X "$method" "$BASE$path" "$@"
}

health() { request GET /health; }

ensure_bridge() {
  if health >/dev/null 2>&1; then return 0; fi
  am start -n industries.leeway.readaloud/.MainActivity >/dev/null 2>&1 || true
  for _ in $(seq 1 20); do
    sleep 0.5
    if health >/dev/null 2>&1; then return 0; fi
  done
  echo "READ_ALOUD_BRIDGE_UNAVAILABLE" >&2
  return 1
}

wait_ready() {
  ensure_bridge
  request POST /prepare >/dev/null 2>&1 || true
  local i h
  for i in $(seq 1 450); do
    h="$(health 2>/dev/null || true)"
    if [ -n "$h" ] && node -e 'const j=JSON.parse(process.argv[1]);process.exit(j.ready===true?0:1)' "$h" 2>/dev/null; then
      printf '%s\n' "$h"
      return 0
    fi
    sleep 2
  done
  echo "VOICE_ONE_NOT_READY_AFTER_15_MINUTES" >&2
  return 4
}

json_stream() {
  local id="$1" text="${2:-}"
  node - "$id" "$text" <<'NODE'
const [id,text]=process.argv.slice(2);
process.stdout.write(JSON.stringify({streamId:id,text:text||""}));
NODE
}

case "$ACTION" in
  stop)
    printf 'muted\n' > "$MUTE"
    ensure_bridge || true
    request POST /stop || true
    echo
    echo "READ_ALOUD_MUTED"
    exit 0
    ;;
  resume)
    rm -f "$MUTE"
    ensure_bridge
    request POST /resume
    echo
    echo "READ_ALOUD_RESUMED"
    exit 0
    ;;
  status)
    ensure_bridge
    health
    exit 0
    ;;
  prepare)
    rm -f "$MUTE"
    ensure_bridge
    wait_ready
    exit 0
    ;;
esac

if [ -f "$MUTE" ]; then
  echo "READ_ALOUD_MUTED"
  exit 0
fi

case "$ACTION" in
  speak)
    [ -n "$TEXT_PATH" ] || { echo "--text PATH is required" >&2; exit 2; }
    [ -f "$TEXT_PATH" ] || { echo "Text file not found: $TEXT_PATH" >&2; exit 3; }
    wait_ready >/dev/null
    request POST /speak --data-binary "@$TEXT_PATH"
    echo
    ;;
  stream-start)
    [ -n "$STREAM_ID" ] || { echo "STREAM_ID_REQUIRED" >&2; exit 2; }
    wait_ready >/dev/null
    json_stream "$STREAM_ID" | request POST /stream/start -H 'Content-Type: application/json' --data-binary @-
    echo
    ;;
  stream-chunk)
    [ -n "$STREAM_ID" ] || { echo "STREAM_ID_REQUIRED" >&2; exit 2; }
    [ -f "$CHUNK_PATH" ] || { echo "Chunk file not found: $CHUNK_PATH" >&2; exit 3; }
    TEXT="$(cat "$CHUNK_PATH")"
    json_stream "$STREAM_ID" "$TEXT" | request POST /stream/chunk -H 'Content-Type: application/json' --data-binary @-
    echo
    ;;
  stream-end)
    [ -n "$STREAM_ID" ] || { echo "STREAM_ID_REQUIRED" >&2; exit 2; }
    json_stream "$STREAM_ID" | request POST /stream/end -H 'Content-Type: application/json' --data-binary @-
    echo
    ;;
esac
