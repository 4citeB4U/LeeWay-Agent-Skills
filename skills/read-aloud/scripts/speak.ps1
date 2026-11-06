[CmdletBinding()]
param([string]$TextPath,[switch]$ListVoices,[switch]$Stop,[switch]$Resume)
$ErrorActionPreference = 'Stop'
$voiceHelper = Join-Path $PSScriptRoot 'speak-leeway-main-voice.ps1'
if (-not (Test-Path -LiteralPath $voiceHelper)) { throw 'The LeeWay Runtime Fabric main-voice reader is not installed.' }
& $voiceHelper @PSBoundParameters
