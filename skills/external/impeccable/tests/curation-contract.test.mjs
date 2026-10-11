/*
LEEWAY HEADER - DO NOT REMOVE
REGION: LEEWAY.SKILLS.DESIGN.TEST
TAG: IMPECCABLE.CURATION.SOURCE.CONTRACT.TEST.V1
5WH:
 WHAT = Validate selective source wiring and attribution, not editor behavior
 WHY = Keep the existing skill identities and prevent accidental bulk import
 WHO = LeeWay Industries / authorized test role
 WHERE = skills/external/impeccable/tests/curation-contract.test.mjs
 WHEN = 2026-10-06
 HOW = Node built-in tests over repository-relative source artifacts
AUTHORIZED ROLES: TEST / INSPECT
LICENSE: MIT
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read = relative => readFileSync(new URL(relative, import.meta.url),'utf8');
const manifest=JSON.parse(read('../../../../scripts/external-design-skills.json'));
const source=JSON.parse(read('../SOURCE.json'));
const skill=read('../SKILL.md');
const hf=read('../../hyperframes/SKILL.md');
const profile=read('../../hyperframes/references/leeway-design-profile.md');
const ops=['critique','audit','layout','typeset','adapt','clarify','animate','polish'];
test('existing skill identity preserved with exactly eight curated operations',()=>{
  assert.match(skill,/^name: impeccable$/m);assert.deepEqual(source.retained_operations,ops);
  assert.deepEqual([...skill.matchAll(/^\| `([^`]+)` \|/gm)].map(x=>x[1]),ops);
});
test('bulk importer cannot select impeccable through sources',()=>{
  assert.equal(manifest.sources.some(s=>s.id==='impeccable'),false);
  const curated=manifest.curatedSources.filter(s=>s.id==='impeccable');assert.equal(curated.length,1);
  assert.equal(curated[0].bulkSync,false);assert.equal(curated[0].destination,'skills/external/impeccable');
  assert.equal(curated[0].ref,source.commit);
  assert.equal(new Set(manifest.sources.map(s=>s.id)).size,manifest.sources.length);
});
test('HyperFrames uses the curated skill and resolvable profile link',()=>{
  assert.match(hf,/skills\/external\/impeccable\/SKILL.md/);
  assert.match(hf,/references\/leeway-design-profile.md/);
  assert.ok(existsSync(new URL('../../hyperframes/references/leeway-design-profile.md',import.meta.url)));
});
test('existing creative engineering and all requested shared roles remain present',()=>{
  assert.match(hf,/skills\/leeway-creative-rendering-engineering\/SKILL.md/);
  for(const role of ['Formula','Cesium','Continuum','LDWMD','LeeWay GPU','HyperFrames','Veritas'])assert.ok(profile.includes(role));
});
test('upstream source hashes and notices remain explicit without import claims',()=>{
  assert.equal(source.full_upstream_imported,false);assert.equal(source.upstream_runtime_executed,false);
  assert.match(source.commit,/^[a-f0-9]{40}$/);assert.equal(source.references.length,8);
  for(const r of source.references)assert.match(r.sha256,/^[a-f0-9]{64}$/);
  for(const a of source.license_artifacts){
    const bytes=readFileSync(new URL('../'+a.path,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),a.sha256);
  }
});
