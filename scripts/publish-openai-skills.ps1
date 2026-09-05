<#
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.OPENAI
TAG: LEEWAY.SKILLS.OPENAI.PROMOTION
5WH:
WHAT = Package synchronized LeeWay Agent Skills and optionally publish them to the OpenAI Skills API
WHY = Promote one canonical SKILL.md library into OpenAI without duplicating skill authority
WHO = Leeway Industries
WHERE = scripts/publish-openai-skills.ps1
WHEN = 2026
HOW = Discover SKILL.md bundles, validate, ZIP complete skill directories, dry-run by default, publish only with explicit authorization
AGENTS: INSPECT, PACKAGE, PUBLISH, VERIFY
LICENSE: MIT
#>

[CmdletBinding(SupportsShouldProcess=$true)]
param(
    [string]$RepositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
    [string[]]$SkillId,
    [switch]$Publish,
    [string]$ApiKey = $env:OPENAI_API_KEY
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$externalRoot = Join-Path $RepositoryRoot 'skills/external'
if (-not (Test-Path -LiteralPath $externalRoot -PathType Container)) {
    throw 'BLOCKED: skills/external is not synchronized. Run scripts/sync-external-design-skills.ps1 first.'
}

$skillFiles = @(Get-ChildItem -LiteralPath $externalRoot -Filter SKILL.md -File -Recurse)
if ($SkillId -and $SkillId.Count -gt 0) {
    $skillFiles = @($skillFiles | Where-Object {
        $relative = [IO.Path]::GetRelativePath($externalRoot, $_.DirectoryName).Replace('\\','/')
        ($SkillId | Where-Object { $relative -like "*$_*" }).Count -gt 0
    })
}
if ($skillFiles.Count -eq 0) { throw 'BLOCKED: no publishable SKILL.md files were found.' }

$seen = @{}
$bundles = [System.Collections.Generic.List[object]]::new()
foreach ($skillFile in $skillFiles) {
    $dir = $skillFile.Directory.FullName
    if ($seen.ContainsKey($dir)) { continue }
    $seen[$dir] = $true

    $text = Get-Content -LiteralPath $skillFile.FullName -Raw
    if ($text -notmatch '(?m)^---\s*$' -or $text -notmatch '(?m)^name\s*:') {
        throw "FAILED: malformed or unsupported SKILL.md frontmatter: $($skillFile.FullName)"
    }
    $nameMatch = [regex]::Match($text, '(?m)^name\s*:\s*["'']?([^\r\n"'']+)')
    $name = if ($nameMatch.Success) { $nameMatch.Groups[1].Value.Trim() } else { $skillFile.Directory.Name }
    $relative = [IO.Path]::GetRelativePath($RepositoryRoot, $dir).Replace('\\','/')
    $bundles.Add([pscustomobject]@{ Name=$name; Directory=$dir; RelativePath=$relative })
}

Write-Host "[LeeWay OpenAI Skills] Validated $($bundles.Count) publishable skill bundle(s)."
$bundles | Sort-Object RelativePath | Format-Table Name, RelativePath -AutoSize

if (-not $Publish) {
    Write-Host '[LeeWay OpenAI Skills] DRY RUN ONLY. No OpenAI skill objects were created.'
    return
}
if ([string]::IsNullOrWhiteSpace($ApiKey)) {
    throw 'BLOCKED: -Publish requested but OPENAI_API_KEY / -ApiKey is missing.'
}

$staging = Join-Path ([IO.Path]::GetTempPath()) ('leeway-openai-skills-' + [Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $staging -Force | Out-Null
$results = [System.Collections.Generic.List[object]]::new()
try {
    foreach ($bundle in $bundles) {
        $safe = ($bundle.Name -replace '[^A-Za-z0-9._-]+','-').Trim('-')
        if (-not $safe) { $safe = 'skill' }
        $zip = Join-Path $staging "$safe.zip"

        # -Path intentionally expands the wildcard so all sibling references/scripts/assets are bundled.
        Compress-Archive -Path (Join-Path $bundle.Directory '*') -DestinationPath $zip -Force
        if (-not (Test-Path -LiteralPath $zip -PathType Leaf)) { throw "FAILED: ZIP was not created for $($bundle.Name)." }

        if (-not $PSCmdlet.ShouldProcess($bundle.Name, 'Create OpenAI Skill')) { continue }
        $response = Invoke-RestMethod -Method Post -Uri 'https://api.openai.com/v1/skills' -Headers @{ Authorization = "Bearer $ApiKey" } -Form @{ files = Get-Item -LiteralPath $zip }
        if (-not $response.id) { throw "FAILED: OpenAI did not return a skill id for $($bundle.Name)." }

        $results.Add([pscustomobject]@{
            name = $bundle.Name
            local_path = $bundle.RelativePath
            openai_skill_id = [string]$response.id
            default_version = [string]$response.default_version
            latest_version = [string]$response.latest_version
        })
    }

    $receiptDir = Join-Path $RepositoryRoot 'receipts'
    New-Item -ItemType Directory -Path $receiptDir -Force | Out-Null
    $receiptPath = Join-Path $receiptDir 'openai-skills-promotion.json'
    [ordered]@{
        schema = 'leeway.openai-skills.promotion.v1'
        status = 'PASS'
        executed_utc = [DateTime]::UtcNow.ToString('o')
        published_count = $results.Count
        skills = $results
    } | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $receiptPath -Encoding utf8
    Write-Host "[LeeWay OpenAI Skills] PASS: published $($results.Count) skill(s). Receipt: $receiptPath"
}
finally {
    if (Test-Path -LiteralPath $staging) { Remove-Item -LiteralPath $staging -Recurse -Force -ErrorAction SilentlyContinue }
}
