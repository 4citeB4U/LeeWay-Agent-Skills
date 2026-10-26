# LEEWAY HEADER — DO NOT REMOVE
# REGION: LEEWAY.CAPABILITIES.INVENTORY
# TAG: LEEWAY.CAPABILITIES.INVENTORY.READ_ONLY_COLLECTOR
# 5WH: WHAT=Inventory skill files and hashes; WHY=Deduplicate evidence before promotion; WHO=LeeWay; WHERE=documents/capability-inventory; WHEN=2026-10-08; HOW=Read-only enumeration with separate JSON output
# AGENTS: AUDIT, DISCOVER; LICENSE: MIT
$ErrorActionPreference='Stop'
$repo=(Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$ecosystem='E:\Leeway-Ecosystem v2.1.4'
$sources=@(
 @{id='skills-current';path=(Join-Path $repo 'skills')},
 @{id='legacy-university';path=(Join-Path $ecosystem 'Leeway Runtime Fabric\skills-university')},
 @{id='legacy-fabric';path=(Join-Path $ecosystem 'Leeway Runtime Fabric\skills')},
 @{id='legacy-agent-coding';path=(Join-Path $ecosystem 'agent-lee-coding-mode\skills')},
 @{id='legacy-agents';path=(Join-Path $ecosystem '.agents\skills')}
)
$rows=@(foreach($s in $sources){if(Test-Path -LiteralPath $s.path){Get-ChildItem -LiteralPath $s.path -Filter SKILL.md -File -Recurse -ErrorAction SilentlyContinue | ForEach-Object { $h=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash; [pscustomobject]@{source=$s.id;relativePath=$_.FullName.Substring($s.path.Length).TrimStart('\');absolutePath=$_.FullName;sha256=$h;classification='DISCOVERED_UNTESTED';executionVerified=$false} }}})
$groups=@($rows|Group-Object sha256|Where-Object Count -gt 1|ForEach-Object {[pscustomobject]@{sha256=$_.Name;occurrences=$_.Count;paths=@($_.Group.absolutePath)}})
$payload=[ordered]@{schema='leeway.capabilities.discovery.v0';scope='five inspected skill roots, not entire ecosystem';sourceCounts=@($sources|ForEach-Object {$id=$_.id;[pscustomobject]@{source=$id;count=@($rows|Where-Object source -eq $id).Count}});totalFiles=$rows.Count;uniqueContentHashes=@($rows|Select-Object -ExpandProperty sha256 -Unique).Count;exactDuplicateGroups=$groups;entries=$rows}
$out=Join-Path $PSScriptRoot 'skill-discovery.v0.json'
$payload|ConvertTo-Json -Depth 10|Set-Content -LiteralPath $out -Encoding utf8
Write-Output ('INVENTORY='+$out)
Write-Output ('FILES='+$rows.Count)
Write-Output ('UNIQUE_HASHES='+$payload.uniqueContentHashes)
Write-Output ('EXACT_DUPLICATE_GROUPS='+$groups.Count)
$payload.sourceCounts|ForEach-Object {Write-Output ($_.source+'='+$_.count)}
Write-Output ('OUTPUT_SHA256='+(Get-FileHash -LiteralPath $out -Algorithm SHA256).Hash)
