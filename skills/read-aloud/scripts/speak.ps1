[CmdletBinding()]
param(
    [string]$TextPath,
    [ValidateRange(-10, 10)][int]$Rate = -1,
    [string]$Voice,
    [string]$WavePath,
    [switch]$ListVoices,
    [switch]$Stop,
    [switch]$Resume
)
$ErrorActionPreference = 'Stop'
$stopPath = Join-Path ([IO.Path]::GetTempPath()) 'codex-read-aloud.stop'
$mutePath = Join-Path ([IO.Path]::GetTempPath()) 'codex-read-aloud.muted'
if ($Stop) {
    [IO.File]::WriteAllText($mutePath, 'User requested silence. Resume explicitly.')
    [IO.File]::WriteAllText($stopPath, [DateTime]::UtcNow.ToString('O'))
    Write-Output 'Stop requested.'
    return
}
if ($Resume) {
    if (Test-Path -LiteralPath $mutePath) { Remove-Item -LiteralPath $mutePath }
    Write-Output 'Read aloud resumed.'
    if (-not $TextPath) { return }
}
if (-not $ListVoices -and -not $WavePath -and (Test-Path -LiteralPath $mutePath)) {
    Write-Output 'Read aloud is muted. Resume only at the user request.'
    return
}
Add-Type -AssemblyName System.Speech
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
$shortcutRegistered = $false
try {
    if ($ListVoices) {
        $speaker.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name }
        return
    }
    if (-not $TextPath) { throw 'TextPath is required.' }
    $message = [IO.File]::ReadAllText((Resolve-Path -LiteralPath $TextPath).Path, [Text.Encoding]::UTF8)
    if ([string]::IsNullOrWhiteSpace($message)) { throw 'Speech text is empty.' }
    $speaker.Rate = $Rate
    if ($Voice) { $speaker.SelectVoice($Voice) }
    elseif (@($speaker.GetInstalledVoices() | Where-Object { $_.Enabled -and $_.VoiceInfo.Name -eq 'Microsoft Zira Desktop' }).Count -gt 0) {
        $speaker.SelectVoice('Microsoft Zira Desktop')
    }
    if ($WavePath) {
        if (-not [IO.Path]::IsPathRooted($WavePath)) { throw 'WavePath must be absolute.' }
        $speaker.SetOutputToWaveFile($WavePath)
        $speaker.Speak($message)
        $speaker.SetOutputToNull()
        Write-Output 'WAV generated.'
    } else {
        if (-not ('LeeWayStopShortcut' -as [type])) {
            Add-Type -Path (Join-Path $PSScriptRoot 'StopShortcut.cs')
        }
        $shortcutRegistered = [LeeWayStopShortcut]::Register()
        if (-not $shortcutRegistered) {
            throw 'Control+Alt+S is unavailable. Playback was not started because the stop shortcut could not be registered.'
        }
        Write-Output 'Stop shortcut ready: Control+Alt+S. It mutes the reader until Resume.'
        $startedAt = [DateTime]::UtcNow
        $speaker.SetOutputToDefaultAudioDevice()
        $prompt = $speaker.SpeakAsync($message)
        while (-not $prompt.IsCompleted) {
            if ([LeeWayStopShortcut]::Requested()) {
                $speaker.SpeakAsyncCancelAll()
                [IO.File]::WriteAllText($mutePath, 'Stopped using Control+Alt+S. Resume explicitly.')
                Write-Output 'Speech stopped by shortcut; read aloud remains muted.'
                return
            }
            if (Test-Path -LiteralPath $mutePath) {
                $speaker.SpeakAsyncCancelAll()
                Write-Output 'Speech stopped; read aloud remains muted.'
                return
            }
            if (Test-Path -LiteralPath $stopPath) {
                $stopTime = [DateTime]::MinValue
                if ([DateTime]::TryParse([IO.File]::ReadAllText($stopPath), [ref]$stopTime) -and $stopTime.ToUniversalTime() -ge $startedAt) {
                    $speaker.SpeakAsyncCancelAll()
                    Write-Output 'Speech stopped.'
                    return
                }
            }
            Start-Sleep -Milliseconds 100
        }
        Write-Output 'Playback completed; audibility requires user confirmation.'
    }
} finally {
    $speaker.Dispose()
    if ($shortcutRegistered) { [LeeWayStopShortcut]::Release() }
}
