[CmdletBinding()]
param(
    [string]$TextPath,
    [switch]$Resume,
    [switch]$Stop,
    [switch]$ListVoices
)

# Read-aloud adapter for the existing LeeWay Runtime Fabric carrier. The carrier
# resolves the current LeeWay Voice Fabric binding; this adapter never picks a
# provider, starts a service, or falls back to another voice.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System
Import-Module (Join-Path $PSScriptRoot 'voice-text-segments.psm1') -Force
$fabric = 'http://127.0.0.1:8890'
$mutePath = Join-Path ([IO.Path]::GetTempPath()) 'codex-read-aloud.muted'
$stopPath = Join-Path ([IO.Path]::GetTempPath()) 'codex-read-aloud.stop'

if ($Stop) {
    [IO.File]::WriteAllText($mutePath, 'Stopped using the LeeWay Runtime Fabric reader.')
    [IO.File]::WriteAllText($stopPath, [DateTime]::UtcNow.ToString('O'))
    'Read aloud stopped and muted.'
    return
}
if ($Resume -and (Test-Path -LiteralPath $mutePath)) { Remove-Item -LiteralPath $mutePath -Force }
if ((Test-Path -LiteralPath $mutePath) -and -not $Resume) { throw 'LeeWay read aloud is muted.' }

try { $status = Invoke-RestMethod -Uri "$fabric/health" -TimeoutSec 4 }
catch { throw "LeeWay Runtime Fabric carrier is unavailable: $($_.Exception.Message)" }
$selected = $status.voice
if (-not $selected.voicePackageId -or -not $selected.provider) {
    throw 'LeeWay Runtime Fabric has no verified selected Voice Fabric binding.'
}
if ($ListVoices) {
    [pscustomobject]@{
        voicePackageId = $selected.voicePackageId
        provider = $selected.provider
        voiceId = $selected.voiceId
        ready = ($selected.ready -eq $true)
        state = $selected.state
        message = $selected.message
    } | ConvertTo-Json -Compress
    return
}
if ($selected.ready -ne $true) {
    throw "Selected LeeWay Voice Fabric voice '$($selected.voicePackageId)' via '$($selected.provider)' is unavailable: $($selected.message)"
}

$text = [IO.File]::ReadAllText((Resolve-Path -LiteralPath $TextPath).Path, [Text.Encoding]::UTF8).Trim()
if (-not $text) { throw 'Speech text is empty.' }
$normalizedText = [regex]::Replace($text, '\s+', ' ').Trim()
if ($normalizedText.Length -gt 9000) { throw 'LeeWay Runtime Fabric read aloud is limited to 9000 characters per reply.' }
if (Test-Path -LiteralPath $mutePath) { throw 'LeeWay read aloud was muted before playback.' }
$segments = @(Split-LeeWaySpeechText -Text $normalizedText -MaximumCharacters 900)
$waves = [Collections.Generic.List[string]]::new()
try {
    # Render and validate every segment before playback, so a later render
    # failure cannot leave the user with only the beginning of the reply.
    for ($i = 0; $i -lt $segments.Count; $i++) {
        $payload = @{ text = [string]$segments[$i] } | ConvertTo-Json -Compress
        try {
            $result = Invoke-RestMethod -Uri "$fabric/render-voice" -Method Post -ContentType 'application/json' -Body $payload -TimeoutSec 600
        } catch {
            $detail = if ($_.ErrorDetails.Message) { $_.ErrorDetails.Message } else { $_.Exception.Message }
            throw "LeeWay Runtime Fabric could not render segment $($i + 1) of $($segments.Count) for selected voice '$($selected.voicePackageId)' via '$($selected.provider)': $detail"
        }
        if ($result.error) { throw "LeeWay Runtime Fabric could not render segment $($i + 1) of $($segments.Count): $($result.error)" }
        if ($result.voicePackageId -ne $selected.voicePackageId -or $result.provider -ne $selected.provider -or
            ($selected.voiceId -and $result.voiceId -ne $selected.voiceId)) {
            throw 'Runtime Fabric returned audio for a different voice binding; playback was rejected.'
        }
        if ($result.format -ne 'wav' -or [string]::IsNullOrWhiteSpace([string]$result.audioContent)) {
            throw 'LeeWay Runtime Fabric returned no WAV audio for its selected voice.'
        }
        try { $bytes = [Convert]::FromBase64String([string]$result.audioContent) }
        catch { throw 'LeeWay Runtime Fabric returned malformed base64 audio; playback was rejected.' }
        if ($bytes.Length -lt 44 -or [Text.Encoding]::ASCII.GetString($bytes, 0, 4) -ne 'RIFF' -or [Text.Encoding]::ASCII.GetString($bytes, 8, 4) -ne 'WAVE') {
            throw 'LeeWay Runtime Fabric response was not a valid WAV artifact.'
        }
        $wave = Join-Path ([IO.Path]::GetTempPath()) ('leeway-runtime-fabric-' + [guid]::NewGuid().ToString('N') + '.wav')
        [IO.File]::WriteAllBytes($wave, $bytes)
        $waves.Add($wave)
    }

    $current = Invoke-RestMethod -Uri "$fabric/health" -TimeoutSec 4
    if ($current.voice.voicePackageId -ne $selected.voicePackageId -or $current.voice.provider -ne $selected.provider -or
        ($selected.voiceId -and $current.voice.voiceId -ne $selected.voiceId)) {
        throw 'LeeWay Voice Fabric selection changed during synthesis; playback was rejected.'
    }
    for ($i = 0; $i -lt $waves.Count; $i++) {
        if (Test-Path -LiteralPath $mutePath) { throw 'LeeWay read aloud was muted during playback.' }
        $player = [System.Media.SoundPlayer]::new($waves[$i])
        try { $player.Load(); $player.PlaySync() } finally { $player.Dispose() }
    }
} finally {
    foreach ($wave in $waves) { Remove-Item -LiteralPath $wave -Force -ErrorAction SilentlyContinue }
}
"LeeWay Runtime Fabric selected-voice playback completed for all $($segments.Count) validated segment(s)."

