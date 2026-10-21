/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT.SKILLS.TESTS
TAG: LEEWAY.REQUEST.COMPLETION.FIXTURE.CONTRACT
WHAT: Validate deterministic request completion scenario fixtures and explicit boundaries.
WHY: Prevent silently missing cases or claiming an unexecuted adapter qualification.
WHO: LeeWay Agent Skills source test (not independent Veritas).
WHERE: tests/request-completion-fixture.test.mjs
WHEN: 2026-10-21.
HOW: Node built-in assertions over checked-in fixture fields.
AUTHORITY: Source-fixture structural test only, not live runtime evidence.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const fixture=JSON.parse(fs.readFileSync(
 new URL('./fixtures/request-completion.v1.json',import.meta.url),'utf8'));

test('the canonical request completion fixture is present and provenance-labelled',()=>{
 assert.equal(fixture.schema,'leeway.agent.request-completion.fixtures.v1');
 assert.equal(fixture.authority,'SOURCE_FIXTURE_ONLY_NOT_RUNTIME_ATTESTATION');
 assert.equal(fixture.executionEvidence,'NOT_EXECUTED_AGAINST_LIVE_HANDLER');
 for(const key of ['what','why','who','where','when','how'])
  assert.ok(typeof fixture.fiveWH?.[key]==='string'&&fixture.fiveWH[key].length>8,key);
});
test('every request has independent outcomes, dispatcher expectations, and negative assertions',()=>{
 assert.ok(Array.isArray(fixture.cases)&&fixture.cases.length>=11);
 const ids=new Set();
 for(const c of fixture.cases){
  assert.match(c.id,/^[a-z][a-z0-9-]+$/);
  assert.ok(!ids.has(c.id),c.id);
  ids.add(c.id);
  assert.ok(typeof c.utterance==='string'&&c.utterance.length>5,c.id);
  assert.ok(Array.isArray(c.expected)&&c.expected.length>0,c.id);
  assert.ok(Array.isArray(c.mustNot)&&c.mustNot.length>0,c.id);
  assert.equal(new Set(c.expected.map(x=>x.outcome)).size,c.expected.length,c.id);
  for(const x of c.expected)
   for(const key of ['outcome','kind','dispatch','acceptance'])
    assert.ok(typeof x[key]==='string'&&x[key].length>1,c.id+' '+key);
 }
});
test('compound, voice, replay, verification and fail-closed scenarios are represented',()=>{
 const ids=new Set(fixture.cases.map(c=>c.id));
 for(const id of ['compound-greeting-and-tasks','action-paraphrase-pronoun',
  'quoted-search-parameter','quoted-example-no-action','hypothetical-only',
  'explicit-negation','denied-authority-continue-independent-work',
  'partial-failure-no-global-abort','replayed-request-id',
  'ambiguous-acknowledgement','correction-and-cancellation','unfinished-voice-transcript'])
  assert.ok(ids.has(id),'missing '+id);
 const compound=fixture.cases.find(x=>x.id==='compound-greeting-and-tasks');
 assert.equal(compound.expected.length,3,'compound requests cannot shrink to first intent');
 const blocked=fixture.cases.find(x=>x.id==='denied-authority-continue-independent-work');
 assert.ok(blocked.expected.some(x=>x.acceptance.includes('BLOCKED_AUTHORITY')));
 assert.ok(blocked.expected.some(x=>x.dispatch==='draft'));
 const unavailable=fixture.cases.find(x=>x.id==='partial-failure-no-global-abort');
 assert.equal(unavailable.expected.find(x=>x.outcome==='readiness').dispatch,'none');
 assert.equal(unavailable.expected.find(x=>x.outcome==='log-summary').dispatch,'read-existing-logs');
});
