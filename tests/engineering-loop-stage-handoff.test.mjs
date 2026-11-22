/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.ENGINEERING_LOOP.SOURCE_GATE_TESTS
TAG: LEEWAY.AGENT_SKILLS.ENGINEERING_LOOP.SOURCE_GATE_TESTS.V1
5WH:
WHAT = Test all twelve original stages, immutable memory and source-only skill-specialist routing.
WHY = A model or skill file cannot claim real execution/Veritas/Continuum from syntactic conformance.
WHO = Original Agent Skills owner; GPT-6 outside support, not Agent Lee.
WHERE = tests/engineering-loop-stage-handoff.test.mjs
WHEN = 2026-11-22.
HOW = Node built-in tests and actual source readback, no host/service mutation.
LICENSE = Existing repository terms unchanged.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  ENGINEERING_STAGES, inspectEngineeringLoopStageHandoff
} from '../sdk/engineering-loop-stage-check.js';
import {
  compileDerivedExpertMap,routeDerivedSkillExperts,planSkillExpertHydration
} from '../sdk/derived-skill-expert-routing.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(path.join(root,p),'utf8');
const pinned='a'.repeat(64);
const initial=()=>ENGINEERING_STAGES.map((stage,i)=>({
  stage,status:i<3?'DONE':'NOT_STARTED',
  evidenceRefs:i<3?['readback-actual-source-candidate']:[],
}));
const input=(extra={})=>({
  missionId:'existing-engineering-mission',
  expectedMemorySha256:pinned,observedMemorySha256:pinned,
  stageRecords:initial(),...extra
});
test('canonical LeeWay 12-stage order is unchanged and correctly named',()=>{
  assert.deepEqual(ENGINEERING_STAGES,[
    'INVESTIGATE','DIAGNOSE','PLAN','IMPLEMENT','TEST','VALIDATE',
    'REPAIR','RETEST','VERIFY','EVIDENCE','CHECKPOINT','CONTINUE'
  ]);
  const skill=read('skills/leeway-agent-operating-loop/SKILL.md');
  const doc=read('skills/leeway-agent-operating-loop/references/engineering-loop-invocation-handoff.md');
  for(const stage of ENGINEERING_STAGES){
    assert.ok(skill.includes('**'+stage+':**') || skill.includes('**'+stage+'**'));
    assert.ok(doc.includes(stage));
  }
  assert.ok(skill.includes('engineering-loop-invocation-handoff.md'));
});
test('valid candidate checkpoint is only source-shape accepted, never verified or executed',()=>{
  const result=inspectEngineeringLoopStageHandoff(input());
  assert.equal(result.status,'SOURCE_HANDOFF_SHAPE_ACCEPTED_NOT_PRODUCTION_PROOF');
  assert.equal(result.nextUnfinishedGate,'IMPLEMENT');
  assert.equal(result.memoryContractState,'HASH_STRINGS_MATCH_NOT_INDEPENDENTLY_VERIFIED');
  assert.equal(result.sourceReviewCanAuthorizeAction,false);
  assert.equal(result.independentVeritasAccepted,false);
  assert.equal(result.canonicalReceiptCreated,false);
  assert.equal(result.runtimeReadback,'NOT_PERFORMED_BY_THIS_VALIDATOR');
});
test('missing or altered memory contract is not silently treated as LOADED',()=>{
  assert.equal(inspectEngineeringLoopStageHandoff({...input(),expectedMemorySha256:'not-a-sha'}).status,
    'BLOCKED_SOURCE_STAGE_HANDOFF');
  assert.equal(inspectEngineeringLoopStageHandoff({...input(),observedMemorySha256:'b'.repeat(64)}).reason,
    'CONTRACT_HASH_MISMATCH');
  assert.equal(inspectEngineeringLoopStageHandoff({...input(),observedMemorySha256:null}).memoryContractState,
    'NOT_READ_BACK');
});
test('a shortened or misordered 10-stage sequence is rejected',()=>{
  assert.equal(inspectEngineeringLoopStageHandoff(input({stageRecords:initial().slice(0,10)})).reason,
    'EXACT_12_STAGE_ORDER_AND_EVIDENCE_RECORDS_REQUIRED');
  const swapped=initial();[swapped[0],swapped[1]]=[swapped[1],swapped[0]];
  assert.equal(inspectEngineeringLoopStageHandoff(input({stageRecords:swapped})).status,
    'BLOCKED_SOURCE_STAGE_HANDOFF');
});
test('DONE without supporting evidence and unjustified skipped stages fail closed',()=>{
  const bad=initial();bad[0].evidenceRefs=[];
  assert.match(inspectEngineeringLoopStageHandoff(input({stageRecords:bad})).reason,
    /DONE_STAGE_WITHOUT_EVIDENCE_REF/);
  const skipped=initial();skipped[3]={stage:'IMPLEMENT',status:'NOT_APPLICABLE',evidenceRefs:[]};
  assert.match(inspectEngineeringLoopStageHandoff(input({stageRecords:skipped})).reason,
    /NOT_APPLICABLE_WITHOUT_REASON/);
});
test('later done stage cannot bypass an unfinished predecessor',()=>{
  const steps=initial();steps[4]={stage:'TEST',status:'DONE',evidenceRefs:['run-test-12']};
  assert.equal(inspectEngineeringLoopStageHandoff(input({stageRecords:steps})).reason,
    'SKIPPED_OPEN_STAGE_BEFORE_DONE:TEST');
});
test('repairs and retests can be not-applicable with explicit real explanation',()=>{
  const steps=ENGINEERING_STAGES.map((stage,i)=>({
    stage,
    status:i<6?'DONE':i===6||i===7?'NOT_APPLICABLE':'NOT_STARTED',
    evidenceRefs:i<6?['test-or-change-evidence']:[],
    ...(i===6||i===7?{reason:'No defect observed in the original tests'}:{})
  }));
  const result=inspectEngineeringLoopStageHandoff(input({stageRecords:steps}));
  assert.equal(result.status,'SOURCE_HANDOFF_SHAPE_ACCEPTED_NOT_PRODUCTION_PROOF');
  assert.equal(result.nextUnfinishedGate,'VERIFY');
});
test('self-reported Veritas PASS is not accepted as an independent verifier',()=>{
  const steps=ENGINEERING_STAGES.map((stage,i)=>({
    stage,status:i<=8?'DONE':'NOT_STARTED',evidenceRefs:i<=8?['source-only-claim']:[]
  }));
  const fake=inspectEngineeringLoopStageHandoff(input({stageRecords:steps,independentVeritas:'PASS'}));
  assert.equal(fake.reason,'VERIFY_STAGE_REQUIRES_EXTERNAL_INDEPENDENT_VERIFIER_REF');
  const claimed=inspectEngineeringLoopStageHandoff(input({
    stageRecords:steps,independentVeritas:'EXTERNAL_VERIFIER_OBSERVED',verifierReference:'review-evidence-123'
  }));
  assert.equal(claimed.status,'SOURCE_HANDOFF_SHAPE_ACCEPTED_NOT_PRODUCTION_PROOF');
  assert.equal(claimed.independentVeritasAccepted,false);
});
test('checkpoint DONE requires a readback reference but still cannot mint receipts',()=>{
  const steps=ENGINEERING_STAGES.map((stage,i)=>({
    stage,status:i<=10?'DONE':'NOT_STARTED',evidenceRefs:i<=10?['source-only-evidence']:[]
  }));
  const bad=inspectEngineeringLoopStageHandoff(input({
    stageRecords:steps,independentVeritas:'EXTERNAL_VERIFIER_OBSERVED',verifierReference:'external-check-123'
  }));
  assert.equal(bad.reason,'CHECKPOINT_REQUIRES_ACTUAL_READBACK_REF');
  const record=inspectEngineeringLoopStageHandoff(input({
    stageRecords:steps,independentVeritas:'EXTERNAL_VERIFIER_OBSERVED',verifierReference:'external-check-123',
    checkpointReadbackReference:'checkpoint-actual-readback-123'
  }));
  assert.equal(record.nextUnfinishedGate,'CONTINUE');
  assert.equal(record.canonicalReceiptCreated,false);
});
test('uniform MEMORY.md is treated as fixed contract not writable milestone log',()=>{
  const doc=read('skills/leeway-agent-operating-loop/references/engineering-loop-invocation-handoff.md');
  const loop=read('skills/leeway-agent-operating-loop/SKILL.md');
  assert.ok(doc.includes('not a mutable journal'));
  assert.ok(loop.includes('fixed, integrity-pinned operating contract'));
  assert.ok(doc.includes('SESSION.md'));
  assert.ok(doc.includes('Continuation contract'));
  assert.ok(!doc.includes('Update `MEMORY.md` after every milestone'));
});
test('Craft Anything is one source candidate, not a live CLI or new control plane',()=>{
  const source=read('skills/craft-anything-builder/SKILL.md');
  assert.match(source,/SOURCE_CANDIDATE_CLI_NOT_VERIFIED/);
  assert.match(source,/clean-room/);
  assert.match(source,/separate.*Deep/i);
  assert.match(source,/NOT an installed CLI/);
  assert.match(source,/independent LeeWay Veritas/i);
  assert.match(source,/Never overwrite the uniform integrity-pinned/);
  const map=compileDerivedExpertMap({rootDir:root});
  const match=routeDerivedSkillExperts({map,task:'Craft Anything clean room software inspection',topK:3});
  assert.ok(match.selected.some(item=>item.id==='craft-anything-builder'));
  const plan=planSkillExpertHydration({map,route:match});
  assert.equal(plan.instructionsInjected,false);
  assert.equal(plan.dispatch,'NOT_EXECUTED');
});
test('missing mission identity and missing source-stage reports are blocked',()=>{
  assert.equal(inspectEngineeringLoopStageHandoff({...input(),missionId:''}).reason,'MISSION_ID_REQUIRED');
  assert.equal(inspectEngineeringLoopStageHandoff({...input(),stageRecords:null}).reason,
    'EXACT_12_STAGE_ORDER_AND_EVIDENCE_RECORDS_REQUIRED');
});
