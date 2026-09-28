---
name: read-aloud
description: Read assistant replies aloud using local Windows speech when requested or enabled by a persistent accessibility preference. Supports voice selection, speech rate, cancellation, and WAV output.
---

# Read Aloud

Use local Windows speech to make assistant messages accessible. The user wants to hear the reply, including important progress updates and questions. Once requested, continue for subsequent replies in this conversation until the user disables it. A skill is not an app-wide streaming hook: do not promise automatic activation in every chat or reading every token as it appears.

Honor a persistent host accessibility preference at the start of new chats without making the user ask again. This workstation's global AGENTS.md enables that preference. Other hosts must load an equivalent user-authorized preference and have a working local audio provider. Repository presence alone does not activate speech.

Compose brief natural paragraphs. Speak the same substantive information you show in chat; do not silently replace a full answer with a summary. For long answers, deliver short sections sequentially. Read link labels instead of raw URLs and explain code or tables in words unless the user requests verbatim reading. Do not speak secrets. If native voice is already speaking replies, avoid duplicate audio.

Write the prepared speech as UTF-8 to a file in the current workspace's work directory, using a literal file-writing mechanism rather than interpolating message text into shell code. Invoke the bundled helper with Windows PowerShell:

```powershell
powershell.exe -NoProfile -File "ABSOLUTE_SKILL_DIRECTORY/scripts/speak.ps1" -TextPath "ABSOLUTE_PATH_TO_TEXT"
```

Use tool calls that yield promptly for lengthy playback, allowing new user input. Speak a progress update before lengthy work and the final answer before ending the turn. Use short sections so spoken questions reach the user promptly. Keep the written version accessible too.

## Immediate interruption

Before the first playback, explain: **Press Control+Alt+S to silence this reader. Say or type "Resume reading" in chat to enable it again.** The shortcut is global while this helper is playing, so Codex need not have focus. It stops speech and sets a persistent local mute latch; it does not cancel the user's main job. The helper registers only this shortcut and does not record keyboard input. Registration failure prevents playback rather than leaving the user without the stop control.

Respect the latch across messages and chats. Do not clear it to deliver progress or a final answer. After an explicit resume request, call `speak.ps1 -Resume`, optionally with `-TextPath`. `-Stop` also mutes subsequent playback. A helper result saying muted means no speaker playback occurred. This shortcut controls only the Windows helper, not native ChatGPT voice or separately played WAV files. Voice barge-in is not implemented: microphone input must reach chat before the assistant can act on spoken requests. Do not claim continuous listening or that a key press was physically tested merely from an injected message test.

Resolve ABSOLUTE_SKILL_DIRECTORY from this skill's actual location. The helper defaults to Microsoft Zira Desktop when installed, otherwise the Windows default voice, at rate -1. Optional parameters: `-Rate` (-10 to 10), `-Voice` (installed name), and `-WavePath` (absolute output WAV path, generates audio instead of speaker playback). To list voices, use `-ListVoices`. To cancel this helper's current speech on this host, call it with `-Stop`. Stop requests disable further speech in the current conversation; an explicit request to disable the persistent preference also updates its host instruction. Do not change system volume or the user's screen reader settings.

If speaker playback fails, report the error without claiming the user heard anything. Offer or create a WAV under the workspace outputs directory and embed it as audio. A completed playback call confirms software completion, not audible sound at the user's device. Ask once whether the initial test was audible. No cloud service, API key, microphone, or screen capture is needed.

In hosts without a persistent preference, the user can say "Use Read Aloud" or invoke `$read-aloud`. Discovery may require a new chat or reloading skills. Change global instructions only when the user requests persistence. LeeWay's real-time voice infrastructure owns full-duplex streaming systems; this helper is a local prepared-text playback adapter and does not claim microphone interruption or a live Device Bridge connection.
