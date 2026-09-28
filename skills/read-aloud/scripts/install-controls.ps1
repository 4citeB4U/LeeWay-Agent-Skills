[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$desktopPath = [Environment]::GetFolderPath('Desktop')
$helperPath = Join-Path $PSScriptRoot 'speak.ps1'
$ackPath = Join-Path $PSScriptRoot 'resumed.txt'
$powershellPath = Join-Path $env:SystemRoot 'System32/WindowsPowerShell/v1.0/powershell.exe'
$shell = New-Object -ComObject WScript.Shell
foreach ($control in @(
    @{ Name = 'Resume Read Aloud'; Arguments = ('-NoProfile -WindowStyle Hidden -File "{0}" -Resume -TextPath "{1}"' -f $helperPath, $ackPath); Description = 'Turn spoken replies back on and hear confirmation.' },
    @{ Name = 'Stop Read Aloud'; Arguments = ('-NoProfile -WindowStyle Hidden -File "{0}" -Stop' -f $helperPath); Description = 'Silence the reader and keep it muted. Does not cancel your job.' }
)) {
    $linkPath = Join-Path $desktopPath ($control.Name + '.lnk')
    $link = $shell.CreateShortcut($linkPath)
    if ((Test-Path -LiteralPath $linkPath) -and $link.Arguments -notlike '*speak.ps1*') {
        throw "An unrelated shortcut already exists: $linkPath"
    }
    $link.TargetPath = $powershellPath
    $link.Arguments = $control.Arguments
    $link.WorkingDirectory = $PSScriptRoot
    $link.Description = $control.Description
    $link.WindowStyle = 7
    $link.Save()
    Write-Output $linkPath
}
