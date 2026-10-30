/*
LEEWAY HEADER - DO NOT REMOVE
REGION: LEEWAY.SKILLS.DESIGN.TEST
TAG: IMPECCABLE.CURATED.MEASUREMENT.TEST.V1
5WH:
 WHAT = Exercise objective helper behavior on explicitly synthetic unit fixtures
 WHY = Reject false success from missing, mismatched or invalid measurements
 WHO = LeeWay Industries / authorized test role
 WHERE = skills/external/impeccable/tests/audit-measurements.test.mjs
 WHEN = 2026-10-06
 HOW = Node built-in test runner; no models, network or external dependencies
AUTHORIZED ROLES: TEST / INSPECT
LICENSE: MIT
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {auditMeasurements} from '../scripts/audit-measurements.mjs';
const artifactSha256 = 'a'.repeat(64); // synthetic fixture, NOT a real artifact hash
const evidenceRef = 'unit-fixture-only';
function fixture() {
  const requirements = {artifactSha256, evidenceRef, checks: [
    {id:'caption',kind:'contrast',minimum:4.5},
    {id:'title',kind:'text-overflow'},
    {id:'safe',kind:'bounds',x:10,y:10,width:180,height:80},
    {id:'play',kind:'target-size',minWidth:44,minHeight:44},
    {id:'seek',kind:'frame-budget',maxFrameMs:20}
  ]};
  const snapshot = {artifactSha256,evidenceRef,measurements:[
    {id:'caption',kind:'contrast',value:7},
    {id:'title',kind:'text-overflow',contentWidth:100,contentHeight:30,boxWidth:100,boxHeight:30},
    {id:'safe',kind:'bounds',x:10,y:10,width:180,height:80},
    {id:'play',kind:'target-size',width:44,height:44},
    {id:'seek',kind:'frame-budget',frameMs:20}
  ]};
  return {requirements,snapshot};
}
const run = f => auditMeasurements(f.snapshot,f.requirements);
test('valid measurements meet exactly the declared limits without granting authority',()=>{
  const r=run(fixture()); assert.equal(r.status,'MEASUREMENTS_SATISFIED'); assert.equal(r.checked,5);
  assert.equal(r.nativeRenderVerified,false); assert.equal(r.formulaExecuted,false); assert.equal(r.authorityGranted,false);
});
for (const [name,index,key,value] of [
  ['low contrast',0,'value',3],['horizontal text overflow',1,'contentWidth',101],
  ['vertical text overflow',1,'contentHeight',31],['unsafe left edge',2,'x',9],
  ['unsafe right edge',2,'width',181],['undersized control',3,'width',43],
  ['frame budget exceeded',4,'frameMs',21]
]) test(name,()=>{const f=fixture(); f.snapshot.measurements[index][key]=value;
  const r=run(f);assert.equal(r.status,'FINDINGS');assert.equal(r.findings[0].code,'LIMIT_NOT_MET');});
test('artifact mismatch cannot pass',()=>{const f=fixture(); f.snapshot.artifactSha256='b'.repeat(64);assert.equal(run(f).status,'INCOMPLETE');});
test('evidence mismatch cannot pass',()=>{const f=fixture(); f.snapshot.evidenceRef='another-fixture';assert.equal(run(f).status,'INCOMPLETE');});
test('missing evidence cannot pass',()=>{const f=fixture(); delete f.snapshot.evidenceRef;assert.equal(run(f).status,'INCOMPLETE');});
test('empty requirements cannot pass',()=>{const f=fixture(); f.requirements.checks=[];assert.equal(run(f).status,'INCOMPLETE');});
test('empty measurements cannot pass',()=>{const f=fixture(); f.snapshot.measurements=[];assert.equal(run(f).status,'INCOMPLETE');});
test('every required item must be present, not only its kind',()=>{const f=fixture(); f.requirements.checks.push({id:'other-caption',kind:'contrast',minimum:4.5});assert.equal(run(f).status,'INCOMPLETE');});
test('duplicate measurement cannot cover a missing ID',()=>{const f=fixture(); f.snapshot.measurements.push({...f.snapshot.measurements[0]});assert.equal(run(f).status,'INCOMPLETE');});
test('unknown kinds cannot pass',()=>{const f=fixture(); f.requirements.checks[0].kind='looks-good';assert.equal(run(f).status,'INCOMPLETE');});
test('wrong measured kind cannot pass',()=>{const f=fixture(); f.snapshot.measurements[0].kind='bounds';assert.equal(run(f).status,'INCOMPLETE');});
test('undeclared measurements cannot silently change coverage',()=>{const f=fixture(); f.snapshot.measurements.push({id:'extra',kind:'contrast',value:7});assert.equal(run(f).status,'INCOMPLETE');});
test('requirements own limits; a measured limit does not override them',()=>{const f=fixture();Object.assign(f.snapshot.measurements[0],{value:3,minimum:1});assert.equal(run(f).status,'FINDINGS');});
for(const invalid of [NaN,Infinity,-1,'7',null])test(`invalid value ${String(invalid)}`,()=>{const f=fixture();f.snapshot.measurements[0].value=invalid;assert.equal(run(f).status,'INCOMPLETE');});
test('limits are mandatory',()=>{const f=fixture();delete f.requirements.checks[0].minimum;assert.equal(run(f).status,'INCOMPLETE');});
test('overflow in coordinate arithmetic is rejected',()=>{const f=fixture();Object.assign(f.snapshot.measurements[2],{x:Number.MAX_VALUE,width:Number.MAX_VALUE});assert.equal(run(f).status,'INCOMPLETE');});
test('does not mutate either input',()=>{const f=fixture();const before=structuredClone(f);run(f);assert.deepEqual(f,before);});
test('malformed envelopes are rejected',()=>{for(const v of [null,[],0,'',undefined])assert.equal(auditMeasurements(v,{}).status,'INCOMPLETE');});
test('duplicate requirements are rejected',()=>{const f=fixture();f.requirements.checks.push({...f.requirements.checks[0]});assert.equal(run(f).status,'INCOMPLETE');});
