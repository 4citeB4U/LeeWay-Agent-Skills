<#
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.PLAYWRIGHT
TAG: LEEWAY.SKILLS.PLAYWRIGHT.RUNTIME.GATE

5WH:
WHAT = LeeWay Playwright runtime install, build, smoke, Veritas, and receipt gate
WHY = Makes the existing Playwright Agent Skill executable without fabricating Formula or runtime proof
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/Install-LeeWay-Playwright.ps1
WHEN = 2026
HOW = Verifies prerequisites, installs pinned packages without browser downloads, builds the Skills MCP, runs a real Playwright MCP browser proof, hashes evidence, and creates a receipt only after PASS

AGENTS:
INVESTIGATE
IMPLEMENT
TEST
VERIFY
EVIDENCE

LICENSE:
MIT
#>

[CmdletBinding()]
param(
    [string]$RepoRoot,
    [switch]$ReuseInstalledDependencies
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($RepoRoot)) {
    $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
}

function Invoke-Checked {
    param([Parameter(Mandatory)][string]$Label, [Parameter(Mandatory)][scriptblock]$Action)
    Write-Host "[LeeWay Playwright] $Label"
    & $Action
    if ($LASTEXITCODE -ne 0) {
        throw "$Label failed with exit code $LASTEXITCODE"
    }
}

function Get-Sha256 {
    param([Parameter(Mandatory)][string]$Path)
    (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
}

$packagePath = Join-Path $RepoRoot 'package.json'
$skillPath = Join-Path $RepoRoot 'skills\external\playwright\SKILL.md'
$configPath = Join-Path $RepoRoot 'config\leeway-playwright-runtime.json'
$smokeScript = Join-Path $RepoRoot 'scripts\playwright-mcp-smoke.mjs'
$mcpLauncher = Join-Path $RepoRoot 'bin\leeway-playwright-mcp.js'
$cliLauncher = Join-Path $RepoRoot 'bin\leeway-playwright-cli.js'
$receiptPath = Join-Path $RepoRoot 'receipts\LEEWAY-PLAYWRIGHT-RUNTIME-BINDING-GATE-1.json'
$evidenceDir = Join-Path $RepoRoot '.leeway\runtime-evidence\playwright'

foreach ($required in @($packagePath, $skillPath, $configPath, $smokeScript, $mcpLauncher, $cliLauncher)) {
    if (-not (Test-Path -LiteralPath $required)) {
        throw "BLOCKED: required authority file missing: $required"
    }
}

$nodeText = (& node --version).Trim()
$nodeMajor = [int](($nodeText -replace '^v','').Split('.')[0])
if ($nodeMajor -lt 20) {
    throw "BLOCKED: Playwright runtime requires Node.js 20+ for this LeeWay gate; observed $nodeText"
}

$npmText = (& npm --version).Trim()
$edgeCandidates = @(
    'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
)
$edgePath = $edgeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $edgePath) {
    throw 'BLOCKED: Microsoft Edge executable was not found; browser payload download is not authorized by this gate.'
}
$edgeVersion = (Get-Item -LiteralPath $edgePath).VersionInfo.FileVersion

$preHashes = [ordered]@{
    package = Get-Sha256 $packagePath
    skill = Get-Sha256 $skillPath
    config = Get-Sha256 $configPath
    smoke = Get-Sha256 $smokeScript
    mcpLauncher = Get-Sha256 $mcpLauncher
    cliLauncher = Get-Sha256 $cliLauncher
}

Push-Location $RepoRoot
try {
    $env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1'
    if ($ReuseInstalledDependencies) {
        Invoke-Checked 'Verifying existing pinned Playwright dependencies' { npm list @playwright/mcp@0.0.82 @playwright/cli@0.1.21 playwright@1.63.0 --depth=0 }
    } else {
        if (Test-Path -LiteralPath (Join-Path $RepoRoot 'package-lock.json')) {
            Invoke-Checked 'Installing root dependencies from lockfile' { npm ci --no-audit --no-fund }
        } else {
            Invoke-Checked 'Installing pinned root dependencies and creating lockfile' { npm install --no-audit --no-fund }
        }
        Invoke-Checked 'Installing MCP server dependencies from lockfile' { npm --prefix mcp-server ci --no-audit --no-fund }
    }

    Invoke-Checked 'Building LeeWay Skills MCP server' { npm run build }

    New-Item -ItemType Directory -Path $evidenceDir -Force | Out-Null
    $env:LEEWAY_PLAYWRIGHT_OUTPUT_DIR = $evidenceDir
    Invoke-Checked 'Executing real Playwright MCP browser smoke proof' { node $smokeScript }
}
finally {
    Pop-Location
}

$smokeEvidence = Join-Path $evidenceDir 'playwright-mcp-smoke-result.json'
if (-not (Test-Path -LiteralPath $smokeEvidence)) {
    throw 'FAILED: smoke evidence file was not created.'
}
$smoke = Get-Content -LiteralPath $smokeEvidence -Raw | ConvertFrom-Json
if ($smoke.status -ne 'PASS' -or -not $smoke.interaction -or -not $smoke.postInteractionAssertion) {
    throw 'FAILED: Playwright MCP smoke evidence did not satisfy interaction acceptance.'
}

$installed = (& npm --prefix $RepoRoot list --depth=0 --json 2>$null) | ConvertFrom-Json
function Get-InstalledVersion([string]$Name) {
    $property = $installed.dependencies.PSObject.Properties[$Name]
    if ($null -eq $property) { return $null }
    return $property.Value.version
}

$receipt = [ordered]@{
    schema = 'leeway.playwright.runtime-binding.receipt.v1'
    gate = 'LEEWAY-PLAYWRIGHT-RUNTIME-BINDING-GATE-1'
    status = 'PASS'
    createdAt = (Get-Date).ToUniversalTime().ToString('o')
    repoRoot = $RepoRoot
    gitHead = (& git -C $RepoRoot rev-parse HEAD).Trim()
    nodeVersion = $nodeText
    npmVersion = $npmText
    browser = [ordered]@{ channel = 'msedge'; executable = $edgePath; version = $edgeVersion }
    dependencyRestore = $(if ($ReuseInstalledDependencies) { 'REUSED_VERIFIED_EXISTING' } else { 'INSTALLED_OR_RESTORED' })
    packages = [ordered]@{
        playwrightMcp = Get-InstalledVersion '@playwright/mcp'
        playwrightCli = Get-InstalledVersion '@playwright/cli'
        playwright = Get-InstalledVersion 'playwright'
    }
    acceptance = [ordered]@{
        mcpToolsList = [bool]$smoke.mcpToolsList
        navigation = [bool]$smoke.navigation
        semanticElementDiscovered = [bool]$smoke.semanticElementDiscovered
        interaction = [bool]$smoke.interaction
        postInteractionAssertion = [bool]$smoke.postInteractionAssertion
        screenshotRequested = [bool]$smoke.screenshotRequested
    }
    formulaEvaluatorState = 'DISCOVERED'
    formulaExecutionState = 'NOT_EXECUTED'
    formulaBrowserDiagnosticsMappingState = 'UNVERIFIED'
    veritas = 'PASS'
    evidence = [ordered]@{
        smokeResult = $smokeEvidence
        smokeResultSha256 = Get-Sha256 $smokeEvidence
        evidenceDirectory = $evidenceDir
    }
    sourceHashes = $preHashes
}

$receipt | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $receiptPath -Encoding UTF8
Write-Host "[LeeWay Playwright] VERITAS PASS"
Write-Host "[LeeWay Playwright] RECEIPT $receiptPath"
