# LEEWAY HEADER — DO NOT REMOVE
# REGION: LEEWAY.CAPABILITIES.INVENTORY
# TAG: LEEWAY.CAPABILITIES.MCP_TOOL_DISCOVERY
# 5WH: WHAT=Locate MCP/tool implementation candidates; WHY=Ground LCEL registration audit; WHO=LeeWay Industries; WHERE=documents/capability-inventory; WHEN=2026-10-08; HOW=Read-only bounded source search with SHA256 manifest
# AGENTS: DISCOVER AUDIT | LICENSE: MIT
$ErrorActionPreference='Stop'
$roots=@(
 @{id='skills-mcp';path='E:\LeeWay-Work\agent-skills-benchmark\mcp-server'},
 @{id='remote-mcp';path='E:\LeeWay-Work\agent-skills-benchmark\mcp-remote'},
 @{id='skills-tools';path='E:\LeeWay-Work\agent-skills-benchmark\tools'},
 @{id='fabric-tools';path='E:\Leeway-Ecosystem v2.1.4\Leeway Runtime Fabric\tools'},
 @{id='fabric-gateway';path='E:\Leeway-Ecosystem v2.1.4\Leeway Runtime Fabric\skills-gateway'},
 @{id='fabric-orchestrator';path='E:\Leeway-Ecosystem v2.1.4\Leeway Runtime Fabric\orchestrator'},
 @{id='vscode-src';path='E:\leeway-vs-code-edge-mcp-app-forge\src'},
 @{id='vscode-core';path='E:\leeway-vs-code-edge-mcp-app-forge\core'},
 @{id='legacy-mcp';path='E:\Leeway-Ecosystem v2.1.4\agent-lee-coding-mode\mcp'},
 @{id='ide-src';path='E:\Leeway-Ecosystem v2.1.4\leeway-ide-single-canvas\src'}
)
$rows=@(foreach($s in $roots){if(Test-Path -LiteralPath $s.path){Get-ChildItem -LiteralPath $s.path -File -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Extension -in @('.js','.mjs','.ts','.json','.py','.ps1') -and ($_.Name -match 'mcp|tool|adapter|dispatch|gateway|orchestrat|manifest|registry|capabil') -and $_.FullName -notmatch '[\\/](node_modules|dist|build|\.git|\.venv|Archive)[\\/]' } | ForEach-Object {[pscustomobject]@{source=$s.id;path=$_.FullName;sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash;kind='SOURCE_CANDIDATE_UNVERIFIED';runtimeTest='NOT_RUN'}}}})
$unique=@($rows | Select-Object -ExpandProperty sha256 -Unique)
$out=Join-Path $PSScriptRoot 'mcp-tool-candidates.v0.json'
[ordered]@{schema='leeway.capabilities.mcp-tool-candidates.v0';scope='ten targeted source roots, not ecosystem-wide';count=$rows.Count;uniqueHashes=$unique.Count;roots=$roots;entries=$rows}|ConvertTo-Json -Depth 7|Set-Content -LiteralPath $out -Encoding utf8
Write-Output ('CANDIDATES='+$rows.Count);Write-Output ('UNIQUE_HASHES='+$unique.Count);foreach($g in ($rows|Group-Object source)){Write-Output ($g.Name+'='+$g.Count)};Write-Output ('SHA256='+(Get-FileHash $out -Algorithm SHA256).Hash)
