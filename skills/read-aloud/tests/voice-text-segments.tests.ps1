$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot '..\scripts\voice-text-segments.psm1') -Force

function Assert-Split($Text, $ExpectedCount = $null) {
    $segments = @(Split-LeeWaySpeechText -Text $Text -MaximumCharacters 900)
    if (($segments -join ' ') -cne $Text) { throw 'Text did not round-trip exactly.' }
    if (@($segments | Where-Object { $_.Length -gt 900 }).Count -gt 0) { throw 'Segment exceeded the 900-character target.' }
    if ($ExpectedCount -ne $null -and $segments.Count -ne $ExpectedCount) { throw "Expected $ExpectedCount segment(s), received $($segments.Count)." }
    return $segments.Count
}

$cases = @(
    @{ Name = 'short'; Text = 'Voice check. This is the selected LeeWay voice.'; Expected = 1 },
    @{ Name = '1500 characters'; Text = (('alpha beta gamma delta epsilon zeta eta theta. ' * 45).Substring(0, 1500)); Expected = $null },
    @{ Name = '1533 characters'; Text = (('alpha beta gamma delta epsilon zeta eta theta. ' * 46).Substring(0, 1533)); Expected = $null },
    @{ Name = '9000 characters'; Text = (('LeeWay words stay whole across every bounded spoken segment. ' * 200).Substring(0, 9000)); Expected = $null }
)
foreach ($case in $cases) {
    $count = Assert-Split -Text $case.Text -ExpectedCount $case.Expected
    "PASS $($case.Name): $count segment(s)"
}

$throws = $false
try { Split-LeeWaySpeechText -Text ('x' * 901) -MaximumCharacters 900 | Out-Null } catch { $throws = $true }
if (-not $throws) { throw 'Oversized unbroken token was not rejected.' }
'PASS oversized unbroken token rejected'

