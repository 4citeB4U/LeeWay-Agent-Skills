# REGION: LEEWAY.SKILLS.DEPLOY; TAG: REQUEST_COMPLETION_CONTRACT
# WHO: Leeway Industries / Creator-authorized operator. WHAT: Install four pinned contract files.
# WHY: Embed request retention and completion behavior in the existing skill owner.
# WHERE: Explicit SkillsRoot, PayloadPath and EvidenceRoot bindings. WHEN: 2026.
# HOW: Verify authority and bytes, stage, back up, apply, verify, roll back on failure.
# ROLES: ASSESS EXECUTE VERIFY. LICENSE: MIT
[CmdletBinding()]
param([Parameter(Mandatory=$true)][string]$SkillsRoot,
      [Parameter(Mandatory=$true)][string]$PayloadPath,
      [Parameter(Mandatory=$true)][string]$EvidenceRoot,
      [switch]$StageOnly,[switch]$Apply)
Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'
if ([bool]$StageOnly -eq [bool]$Apply) { throw 'Choose exactly one of -StageOnly or -Apply.' }
$baseCommit = 'fe33c00cb2a466728d996fc2a9145107ca308ab5'
$sourceCommit = '37102d9c184c71506bb065331e6ef7f88819426a'
$pins = @{
 'skills/leeway-agent-operating-loop/SKILL.md' = @('b6061c6aee7304cc7e0878c2aa7c2f7205997c9724929e96661c2159b85a2203','23094df7f94e8609e162dcfbe243f82517434b3cb9547d06a9006cf06ee0d46c')
 'skills/leeway-context-engineering/SKILL.md' = @('e3c48294ea3ea3ec5d8d5d896944ecf4f24347ed49887f8615da61452b581465','0b3756b7d726355fd208a6cc1542ca2ba415f7f04d02c8a9c449c485bfd34f2f')
 'skills/leeway-skill-orchestrator/SKILL.md' = @('60ae89e09e871d5ce100ad83f562a50f776148b1249184fb5bcf342cc23e7288','dc18a61557a6574157c3a61b3bf23965d570c45ff3fc50bffe2b9933d12622f5')
 'tests/fixtures/request-completion.v1.json' = @($null,'f8e4d228d7b8de2515fa3f6cc21eb2709a87f37031d9ae9d71bf63ac225605d4')
}
function ByteHash([byte[]]$Bytes) { $h=[Security.Cryptography.SHA256]::Create(); try { ([BitConverter]::ToString($h.ComputeHash($Bytes))).Replace('-','').ToLowerInvariant() } finally { $h.Dispose() } }
function FileHash([string]$File) { ByteHash ([IO.File]::ReadAllBytes($File)) }
function NoReparse([string]$File) {
 $p=[IO.Path]::GetFullPath($File)
 while ($p) { if (Test-Path -LiteralPath $p) { if ((Get-Item -LiteralPath $p -Force).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Reparse-point path refused.' } }; $p=[IO.Path]::GetDirectoryName($p) }
}
$root=(Resolve-Path -LiteralPath $SkillsRoot).ProviderPath.TrimEnd([IO.Path]::DirectorySeparatorChar)
$evidence=[IO.Path]::GetFullPath($EvidenceRoot)
if ($evidence.Equals($root,[StringComparison]::OrdinalIgnoreCase) -or $evidence.StartsWith($root+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'EvidenceRoot must be outside SkillsRoot.' }
NoReparse $root; NoReparse $evidence; NoReparse $PayloadPath
function AssertAuthority {
 $origin=(& git -C $root remote get-url origin 2>$null); if ($LASTEXITCODE -ne 0) { throw 'Cannot resolve Git origin.' }
 if (@($origin).Count -ne 1 -or $origin -notmatch '^(https://github\.com/4citeB4U/LeeWay-Agent-Skills(?:\.git)?|git@github\.com:4citeB4U/LeeWay-Agent-Skills(?:\.git)?)$') { throw 'Canonical skills origin mismatch.' }
 $head=(& git -C $root rev-parse HEAD 2>$null); if ($LASTEXITCODE -ne 0 -or $head -ne $baseCommit) { throw 'Canonical skills HEAD mismatch.' }
}
AssertAuthority
$payload=([IO.File]::ReadAllText((Resolve-Path -LiteralPath $PayloadPath).ProviderPath) | ConvertFrom-Json)
if ($payload.schema -ne 'leeway.request-completion.contract-payload.v1' -or $payload.sourceCommit -ne $sourceCommit -or @($payload.files).Count -ne 4) { throw 'Payload identity or file count mismatch.' }
$items=@(); $seen=@{}
foreach ($f in $payload.files) {
 $rel=[string]$f.path
 if (-not $pins.ContainsKey($rel) -or $seen.ContainsKey($rel)) { throw 'Unexpected or duplicate payload path.' }; $seen[$rel]=$true
 $pin=$pins[$rel]; if ($f.beforeSha256 -ne $pin[0] -or $f.afterSha256 -ne $pin[1]) { throw 'Payload pins mismatch.' }
 $target=[IO.Path]::GetFullPath((Join-Path $root $rel)); NoReparse $target
 if (-not $target.StartsWith($root+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Target outside SkillsRoot.' }
 if (-not [IO.Directory]::Exists([IO.Path]::GetDirectoryName($target))) { throw 'Expected source parent directory is missing.' }
 $bytes=[Convert]::FromBase64String([string]$f.contentBase64)
 if ((ByteHash $bytes) -ne $pin[1]) { throw 'Payload content hash mismatch.' }
 $items += [pscustomobject]@{ Path=$rel; Target=$target; Before=$pin[0]; After=$pin[1]; Bytes=$bytes; Stage=$null; Backup=$null }
}
function AssertBefore($Item) {
 NoReparse $Item.Target
 if ($null -eq $Item.Before) { if (Test-Path -LiteralPath $Item.Target) { throw 'New fixture already exists.' } }
 elseif (-not [IO.File]::Exists($Item.Target) -or (FileHash $Item.Target) -ne $Item.Before) { throw ('Before hash mismatch: '+$Item.Path) }
}
foreach ($item in $items) { AssertBefore $item }
$run=Join-Path $evidence ('request-completion-'+[DateTime]::UtcNow.ToString('yyyyMMddTHHmmssfffZ')+'-'+[Guid]::NewGuid().ToString('N'))
[void][IO.Directory]::CreateDirectory($run)
$receipt=[ordered]@{ schema='leeway.request-completion.install-receipt.v1'; sourceCommit=$sourceCommit; baseCommit=$baseCommit; skillsRoot=$root; state='STAGING'; startedAt=[DateTime]::UtcNow.ToString('o'); signatureState='UNSIGNED_CONTENT_HASH_ONLY'; evidenceScope='FILE_CHANGES_ONLY'; formula='NOT_EXECUTED'; modelTraining='NOT_EXECUTED'; learningLedger='NOT_UPDATED'; files=@(); rollbackErrors=@() }
function SaveReceipt {
 $receipt['finishedAt']=[DateTime]::UtcNow.ToString('o')
 if ($receipt.Contains('receiptSha256')) { $receipt.Remove('receiptSha256') }
 $receipt['receiptSha256']=ByteHash ([Text.Encoding]::UTF8.GetBytes(($receipt | ConvertTo-Json -Depth 8 -Compress)))
 [IO.File]::WriteAllText((Join-Path $run 'receipt.json'),($receipt | ConvertTo-Json -Depth 8),(New-Object Text.UTF8Encoding($false)))
}
$touched=@()
try {
 foreach ($item in $items) {
  $item.Stage=Join-Path $run ('staged/'+$item.Path); [void][IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($item.Stage))
  [IO.File]::WriteAllBytes($item.Stage,$item.Bytes); if ((FileHash $item.Stage) -ne $item.After) { throw 'Stage verification failed.' }
  if ($null -ne $item.Before) { $item.Backup=Join-Path $run ('backup/'+$item.Path); [void][IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($item.Backup)); [IO.File]::Copy($item.Target,$item.Backup,$false); if ((FileHash $item.Backup) -ne $item.Before) { throw 'Backup verification failed.' } }
  $receipt.files += [ordered]@{ path=$item.Path; beforeSha256=$item.Before; expectedAfterSha256=$item.After; backup=$item.Backup; stagedSha256=(FileHash $item.Stage) }
 }
 AssertAuthority; foreach ($item in $items) { AssertBefore $item }
 if ($StageOnly) { $receipt.state='STAGED'; SaveReceipt; Write-Output (Join-Path $run 'receipt.json'); return }
 foreach ($item in $items) {
  AssertBefore $item; $touched += $item
  [IO.File]::Copy($item.Stage,$item.Target,$true)
  if ((FileHash $item.Target) -ne $item.After) { throw ('Applied hash mismatch: '+$item.Path) }
 }
 foreach ($item in $items) { if ((FileHash $item.Target) -ne $item.After) { throw 'Final verification failed.' } }
 $receipt.state='APPLIED'; $receipt['observedAfter']=@($items | ForEach-Object { [ordered]@{path=$_.Path;sha256=(FileHash $_.Target)} }); SaveReceipt
 Write-Output (Join-Path $run 'receipt.json')
} catch {
 $failure=$_.Exception.Message
 for ($i=$touched.Count-1; $i -ge 0; $i--) {
  $item=$touched[$i]
  try { NoReparse $item.Target; if ($null -eq $item.Before) { if ([IO.File]::Exists($item.Target)) { [IO.File]::Delete($item.Target) }; if (Test-Path -LiteralPath $item.Target) { throw 'New fixture rollback failed.' } } else { if ((FileHash $item.Backup) -ne $item.Before) { throw 'Backup integrity failure.' }; [IO.File]::Copy($item.Backup,$item.Target,$true); if ((FileHash $item.Target) -ne $item.Before) { throw 'Rollback verification failed.' } } }
  catch { $receipt.rollbackErrors += ($item.Path+': '+$_.Exception.Message) }
 }
 $receipt.state=if ($receipt.rollbackErrors.Count) { 'ROLLBACK_FAILED' } elseif ($touched.Count) { 'ROLLED_BACK' } else { 'STAGING_FAILED' }
 $receipt['error']=$failure; SaveReceipt; throw ('Installation failed; '+$receipt.state+'. Evidence: '+(Join-Path $run 'receipt.json'))
}
