[CmdletBinding()]
param(
    [string]$TextPath,
    [ValidateRange(-10, 10)][int]$Rate = -1,
    [string]$Voice,
    [string]$WavePath,
    [switch]$ListVoices,
    [switch]$Stop
)
$ErrorActionPreference = 'Stop'
$stopPath = Join-Path ([IO.Path]::GetTempPath()) 'codex-read-aloud.stop'
if ($Stop) {
    [IO.File]::WriteAllText($stopPath, [DateTime]::UtcNow.ToString('O'))
    Write-Output 'Stop requested.'
    return
}
Add-Type -AssemblyName System.Speech
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
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
        $startedAt = [DateTime]::UtcNow
        $speaker.SetOutputToDefaultAudioDevice()
        $prompt = $speaker.SpeakAsync($message)
        while (-not $prompt.IsCompleted) {
            if (Test-Path -LiteralPath $stopPath) {
                $stopTime = [DateTime]::Parse([IO.File]::ReadAllText($stopPath)).ToUniversalTime()
                if ($stopTime -ge $startedAt) {
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
}
