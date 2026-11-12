/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.TESTS.TRANSFER
TAG: LEEWAY.AGENT_SKILLS.TEACHING_PACKET_CONFORMANCE.V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Reject incomplete tool selection and teacher/assessor/canonical promotion forgery.
WHY = Make skill transfer auditable while preserving real LG-08 and original rights.
WHO = Agent Skills source and CI under approved learning law.
WHERE = skills/leeway-learning-ledger/tests/teaching-transfer.test.mjs.
WHEN = 2026-11-12.
HOW = Node built-in tests; no actual permanent-agent learning or hidden model thought disclosure.
LICENSE: Existing repository terms remain unchanged.
*/
import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateTeachingTransfer} from '../scripts/validate-teaching-transfer.mjs';
const good=JSON.parse(readFileSync(new URL('../references/teaching-transfer-example.json',import.meta.url),'utf8'));
const clone=()=>JSON.parse(JSON.stringify(good));
test('documented source-only teaching packet may proceed to learner exercise',()=>{
 const v=validateTeachingTransfer(good);
 assert.equal(v.status,'SOURCE_CANDIDATE_VALID');assert.equal(v.learningAdmitted,false);
});
test('must declare actual tools and why selected',()=>{
 const x=clone();x.toolsSelected=[{toolId:'some-tool',realUse:true}];
 assert.equal(validateTeachingTransfer(x).reason,'TOOL_CHOICE_UNVERIFIABLE');
});
test('research-to-mastery fails without held-out learner exercise',()=>{
 const x=clone();x.heldOutPracticeTest='';
 assert.equal(validateTeachingTransfer(x).reason,'REPRODUCIBLE_TEACHING_INCOMPLETE');
});
test('unexplained alternatives and missing negative evidence are rejected',()=>{
 const x=clone();x.rejectedAlternatives=[{alternative:'trust a claim'}];
 assert.equal(validateTeachingTransfer(x).reason,'REPRODUCIBLE_TEACHING_INCOMPLETE');
});
test('LG-06 assessor cannot be teacher or learner',()=>{
 const x=clone();x.learningStage='LG-06';x.independentAssessor=x.teacher;
 assert.equal(validateTeachingTransfer(x).reason,'ASSESSOR_NOT_INDEPENDENT');
 x.independentAssessor=x.targetLearner;
 assert.equal(validateTeachingTransfer(x).reason,'ASSESSOR_NOT_INDEPENDENT');
});
test('a self-asserted canonical learning success remains blocked',()=>{
 const x=clone();x.learningStage='LG-08';x.admissionState='CANONICAL_ADMITTED_READBACK';
 assert.equal(validateTeachingTransfer(x).reason,'CANONICAL_ADMISSION_REQUIRES_ORIGINAL_HOST_VERIFIER');
});
test('missing permissions and actual-execution disclosure fails',()=>{
 const x=clone();delete x.authorizationBoundary.realDeviceExecution;
 assert.equal(validateTeachingTransfer(x).reason,'AUTHORITY_DISCLOSURE_INCOMPLETE');
});
test('missing parent mission cannot become a new authority',()=>{
 const x=clone();delete x.parentMissionId;
 assert.equal(validateTeachingTransfer(x).reason,'MISSING_PARENTMISSIONID');
});
