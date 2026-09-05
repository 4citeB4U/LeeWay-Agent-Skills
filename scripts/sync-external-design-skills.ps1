<#
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.SYNC
TAG: LEEWAY.SKILLS.SYNC.EXTERNAL.DESIGN

5WH:
WHAT = Synchronize approved external Agent Skills into the canonical LeeWay Agent Skills repository
WHY = Make one governed skill directory usable by LeeWay, MCP consumers, Codex, OpenCode, Hermes, and other Agent Skills runtimes
WHO = Leeway Industries
WHERE = scripts/sync-external-design-skills.ps1
WHEN = 2026
HOW = Read manifest, shallow-clone exact source refs, copy only declared source paths, record provenance, validate SKILL.md presence

AGENTS:
SYNC
VALIDATE
PROVE

LICENSE:
MIT
#>

[CmdletBinding()]
param(
    [string]$RepositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
    [string]$ManifestPath = (Join-Path $PSScriptRoot 'external-design-skills.json')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Step([string]$Message) {
    Write-Host "[LeeWay Skill Sync] $Message"
}

if (-not (Test-Path -LiteralPath $ManifestPath -PathType Leaf)) {
    throw "BLOCKED: manifest not found: $ManifestPath"
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'BLOCKED: git is not available on PATH.'
}

$manifest = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json
if (-not $manifest.sources -or $manifest.sources.Count -eq 0) {
    throw 'BLOCKED: manifest contains no sources.'
}

$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("leeway-skill-sync-" + [Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null

$results = [System.Collections.Generic.List[object]]::new()

try {
    foreach ($source in $manifest.sources) {
        $id = [string]$source.id
        $repo = [string]$source.repo
        $ref = [string]$source.ref
        $sourcePath = [string]$source.sourcePath
        $destinationRelative = [string]$source.destination

        if ([string]::IsNullOrWhiteSpace($id) -or [string]::IsNullOrWhiteSpace($repo) -or [string]::IsNullOrWhiteSpace($destinationRelative)) {
            throw 'BLOCKED: manifest source is missing id, repo, or destination.'
        }

        Write-Step "Syncing $id from $repo@$ref"

        $cloneDir = Join-Path $tempRoot $id
        $repoUrl = "https://github.com/$repo.git"
        & git clone --depth 1 --branch $ref --single-branch $repoUrl $cloneDir
        if ($LASTEXITCODE -ne 0) {
            throw "FAILED: git clone failed for $repo@$ref"
        }

        $commit = (& git -C $cloneDir rev-parse HEAD).Trim()
        if ($LASTEXITCODE -ne 0 -or -not $commit) {
            throw "FAILED: could not resolve source commit for $repo@$ref"
        }

        $declaredSource = if ($sourcePath -eq '.') { $cloneDir } else { Join-Path $cloneDir $sourcePath }
        if (-not (Test-Path -LiteralPath $declaredSource)) {
            throw "FAILED: declared source path does not exist: $repo@$ref :: $sourcePath"
        }

        $destination = Join-Path $RepositoryRoot $destinationRelative
        $upstream = Join-Path $destination 'upstream'

        if (Test-Path -LiteralPath $upstream) {
            Remove-Item -LiteralPath $upstream -Recurse -Force
        }
        New-Item -ItemType Directory -Path $upstream -Force | Out-Null

        if ((Get-Item -LiteralPath $declaredSource).PSIsContainer) {
            Get-ChildItem -LiteralPath $declaredSource -Force |
                Where-Object { $_.Name -ne '.git' } |
                ForEach-Object { Copy-Item -LiteralPath $_.FullName -Destination $upstream -Recurse -Force }
        } else {
            Copy-Item -LiteralPath $declaredSource -Destination $upstream -Force
        }

        $skillFiles = @(Get-ChildItem -LiteralPath $upstream -Filter 'SKILL.md' -File -Recurse -ErrorAction SilentlyContinue)
        if ($skillFiles.Count -eq 0) {
            throw "FAILED: no SKILL.md discovered after syncing $id"
        }

        $licenseCandidates = @('LICENSE','LICENSE.md','LICENSE.txt','NOTICE','NOTICE.md')
        $licenseDir = Join-Path $destination 'provenance'
        New-Item -ItemType Directory -Path $licenseDir -Force | Out-Null
        foreach ($candidate in $licenseCandidates) {
            $candidatePath = Join-Path $cloneDir $candidate
            if (Test-Path -LiteralPath $candidatePath -PathType Leaf) {
                Copy-Item -LiteralPath $candidatePath -Destination (Join-Path $licenseDir $candidate) -Force
            }
        }

        $provenance = [ordered]@{
            id = $id
            name = [string]$source.name
            repository = "https://github.com/$repo"
            ref = $ref
            commit = $commit
            source_path = $sourcePath
            destination = $destinationRelative
            synchronized_utc = [DateTime]::UtcNow.ToString('o')
            skill_files = $skillFiles.Count
        }
        $provenance | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $destination 'SOURCE.json') -Encoding utf8

        $results.Add([pscustomobject]$provenance)
    }

    $receiptDir = Join-Path $RepositoryRoot 'receipts'
    New-Item -ItemType Directory -Path $receiptDir -Force | Out-Null
    $receiptPath = Join-Path $receiptDir 'external-design-skills-sync.json'
    [ordered]@{
        schema = 'leeway.skill-sync.receipt.v1'
        status = 'PASS'
        executed_utc = [DateTime]::UtcNow.ToString('o')
        source_count = $results.Count
        results = $results
    } | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $receiptPath -Encoding utf8

    Write-Step "PASS: synchronized $($results.Count) sources. Receipt: $receiptPath"
}
finally {
    if (Test-Path -LiteralPath $tempRoot) {
        Remove-Item -LiteralPath $tempRoot -Recurse -Force -ErrorAction SilentlyContinue
    }
}
