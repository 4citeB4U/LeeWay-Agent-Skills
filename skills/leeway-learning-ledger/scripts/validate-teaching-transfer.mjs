/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.LEARNING_TRANSFER
TAG: LEEWAY.SKILLS.TEACHING_PACKET_SOURCE_VALIDATOR.V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Validate essential source-level skill/tool teaching packet obligations and independence checks.
WHY = Prevent untraceable assistant tool choice or false canonical learning promotion.
WHO = Original LeeWay Agent Skills owner with Learning Ledger/Workforce assessor authority.
WHERE = skills/leeway-learning-ledger/scripts/validate-teaching-transfer.mjs.
WHEN = 2026-11-12.
HOW = Deterministic source validation without issuing a grant, badge, receipt, verifier or admitted lesson.
LICENSE: Existing repository terms remain unchanged.
*/
import {readFileSync} from 'node:fs';
const schema=JSON.parse(readFileSync(new URL('../references/teaching-transfer-packet.schema.json',import.meta.url),'utf8'));
const nonempty=x=>typeof x==='string' && x.trim().length>0;
const denial=reason=>({status:'BLOCKED',reason,learningAdmitted:false});
export function validateTeachingTransfer(packet){
  if(!packet || typeof packet!=='object' || Array.isArray(packet))return denial('PACKET_INVALID');
  for(const field of schema.required){if(packet[field]===undefined)return denial('MISSING_'+field.toUpperCase());}
  if(!/^TP-[A-Za-z0-9-]+$/.test(packet.packetId)||!nonempty(packet.parentMissionId)||
     !nonempty(packet.workId)||!nonempty(packet.standardsRef)||!nonempty(packet.targetLearner)||
     !nonempty(packet.teacher))return denial('PACKET_PROVENANCE_INVALID');
  if(!schema.properties.learningStage.enum.includes(packet.learningStage))return denial('INVALID_LEARNING_STAGE');
  if(!Array.isArray(packet.skillsInvoked)||!packet.skillsInvoked.length ||
     packet.skillsInvoked.some(x=>!nonempty(x)))return denial('SKILL_DISCLOSURE_MISSING');
  if(!Array.isArray(packet.toolsSelected)||!packet.toolsSelected.length||
    packet.toolsSelected.some(t=>!nonempty(t?.toolId)||typeof t.realUse!=='boolean'||
      !nonempty(t.whyChosen)||!nonempty(t.scope)))return denial('TOOL_CHOICE_UNVERIFIABLE');
  if(!nonempty(packet.selectionRationale)||!Array.isArray(packet.rejectedAlternatives)||
     packet.rejectedAlternatives.some(x=>!nonempty(x?.alternative)||!nonempty(x.reason))||
     !Array.isArray(packet.reusableMethod)||!packet.reusableMethod.length||
     packet.reusableMethod.some(x=>!nonempty(x))||
     !nonempty(packet.heldOutPracticeTest))return denial('REPRODUCIBLE_TEACHING_INCOMPLETE');
  if(!packet.authorizationBoundary||
     !Array.isArray(packet.authorizationBoundary.permissionsActuallyObserved)||
     !Array.isArray(packet.authorizationBoundary.permissionsMissing)||
     typeof packet.authorizationBoundary.realDeviceExecution!=='boolean')
     return denial('AUTHORITY_DISCLOSURE_INCOMPLETE');
  if(!Array.isArray(packet.evidenceFor)||!Array.isArray(packet.evidenceAgainst)||
     !schema.properties.learnerDemonstration.enum.includes(packet.learnerDemonstration)||
     !schema.properties.admissionState.enum.includes(packet.admissionState))
     return denial('EVIDENCE_STATE_INVALID');
  if(packet.learningStage==='LG-06'||packet.learnerDemonstration==='INDEPENDENTLY_QUALIFIED'){
    if(!nonempty(packet.independentAssessor)||packet.independentAssessor===packet.teacher||
       packet.independentAssessor===packet.targetLearner)
      return denial('ASSESSOR_NOT_INDEPENDENT');
  }
  if(packet.admissionState==='CANONICAL_ADMITTED_READBACK')
    return denial('CANONICAL_ADMISSION_REQUIRES_ORIGINAL_HOST_VERIFIER');
  return {status:'SOURCE_CANDIDATE_VALID',learningAdmitted:false,packetId:packet.packetId,
    nextGate:'ORIGINAL_WORKFORCE_AND_LEDGER_INDEPENDENT_VERIFICATION'};
}
