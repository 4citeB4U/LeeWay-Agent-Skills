# LEEWAY HEADER — DO NOT REMOVE
# REGION: LEEWAY.CAPABILITIES.INVENTORY
# TAG: LEEWAY.CAPABILITIES.INVENTORY.EXPANSION
# 5WH: WHAT=Discover additional skill and adapter sources; WHY=Reconcile complete LCEL; WHO=LeeWay Industries; WHERE=documents/capability-inventory; WHEN=2026-10-08; HOW=Read-only hashing, JSON output
# AGENTS: DISCOVER AUDIT | LICENSE: MIT
$ErrorActionPreference='Stop'
$base=(Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$legacy='E:\Leeway-Ecosystem v2.1.4\Leeway Runtime Fabric'
$roots=@(@{id='vscode-app-forge';path='E:\leeway-vs-code-edge-mcp-app-forge'},@{id='leeway-ide';path='E:\Leeway-Ecosystem v2.1.4\leeway-ide-single-canvas'},@{id='legacy-skills-exports';path=(Join-Path $legacy 'skills-university-exports')})
$prev=Get-Content -Raw (Join-Path $PSScriptRoot 'skill-discovery.v0.json') | ConvertFrom-Json
$rows=@(foreach($s in $roots){Get-ChildItem -LiteralPath $s.path -File -Recurse -Filter SKILL.md -ErrorAction SilentlyContinue | ForEach-Object{[pscustomobject]@{source=$s.id;relativePath=$_.FullName.Substring($s.path.Length).TrimStart('\');absolutePath=$_.FullName;sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash;classification='DISCOVERED_UNTESTED';executionVerified=$false}}})
$known=@{};foreach($e in $prev.entries){$known[$e.sha256]=$true}
$new=@($rows|Where-Object {-not $known.ContainsKey($_.sha256)})
$adapterDirs=@(Get-ChildItem -LiteralPath (Join-Path $legacy 'adapters') -Directory | ForEach-Object {[pscustomobject]@{name=$_.Name;path=$_.FullName;classification='DISCOVERED_UNTESTED';executionVerified=$false}})
$output=[ordered]@{schema='leeway.capabilities.expansion.v0';scope='three added roots and one legacy adapter directory, non-exhaustive';files=$rows.Count;newFileOccurrencesNotInPriorHashSet=$new.Count;uniqueNewHashes=@($new|Select-Object -ExpandProperty sha256 -Unique).Count;adapterDirectories=$adapterDirs.Count;skills=$rows;adapters=$adapterDirs}
$out=Join-Path $PSScriptRoot 'expansion-discovery.v0.json';$output|ConvertTo-Json -Depth 8|Set-Content -LiteralPath $out -Encoding utf8
Write-Output ('FILES='+$rows.Count);Write-Output ('NEW_OCCURRENCES='+$new.Count);Write-Output ('UNIQUE_NEW_HASHES='+$output.uniqueNewHashes);Write-Output ('ADAPTER_DIRS='+$adapterDirs.Count);Write-Output ('OUTPUT_SHA256='+(Get-FileHash $out -Algorithm SHA256).Hash)
