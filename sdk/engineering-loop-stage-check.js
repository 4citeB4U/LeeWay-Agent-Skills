/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.ENGINEERING_LOOP.SOURCE_GATE
TAG: LEEWAY.AGENT_SKILLS.ENGINEERING_LOOP.SOURCE_STAGE_CHECK.V1
5WH:
WHAT = Validate source-level 12-stage LeeWay Engineering handoff claims without producing execution authority.
WHY = Detect missing evidence, fabricated stage transitions, mutable uniform memory and self-certified Veritas.
WHO = Original LeeWay Agent Skills authority; GPT-6 outside support, not Agent Lee.
WHERE = sdk/engineering-loop-stage-check.js
WHEN = 2026-11-22.
HOW = Pure deterministic stage check with explicit open gates and no filesystem, network or runtime side effects.
LICENSE = Existing repository terms unchanged.
*/

export const ENGINEERING_STAGES = Object.freeze([
  'INVESTIGATE','DIAGNOSE','PLAN','IMPLEMENT','TEST','VALIDATE',
  'REPAIR','RETEST','VERIFY','EVIDENCE','CHECKPOINT','CONTINUE'
]);
export const STAGE_STATES = Object.freeze([
  'DONE','IN_PROGRESS','BLOCKED','NOT_STARTED','NOT_APPLICABLE'
]);
const sha256 = s => typeof s === 'string' && /^[a-fA-F0-9]{64}$/.test(s);
const validRef = r => typeof r === 'string' && r.length > 3 && r.length <= 320 &&
  /^[a-zA-Z0-9][a-zA-Z0-9_.:/#@-]+$/.test(r);
const recordFor = (record, name) => record && typeof record === 'object' &&
  record.stage === name && STAGE_STATES.includes(record.status) &&
  Array.isArray(record.evidenceRefs) && record.evidenceRefs.length <= 30 &&
  record.evidenceRefs.every(validRef);

export function inspectEngineeringLoopStageHandoff({
  missionId, stageRecords, expectedMemorySha256, observedMemorySha256 = null,
  independentVeritas = 'NOT_RUN', verifierReference = null,
  checkpointReadbackReference = null
} = {}) {
  const blocked = (reason, nextUnfinishedGate='INVESTIGATE') => Object.freeze({
    status:'BLOCKED_SOURCE_STAGE_HANDOFF',
    reason,
    nextUnfinishedGate,
    actualRuntimeExecution:'NOT_EVALUATED',
    independentVeritasAccepted:false,
    canonicalReceiptCreated:false,
    sourceReviewCanAuthorizeAction:false
  });
  if (typeof missionId !== 'string' || !validRef(missionId)) return blocked('MISSION_ID_REQUIRED');
  if (!Array.isArray(stageRecords) || stageRecords.length !== ENGINEERING_STAGES.length ||
      !stageRecords.every((record, i) => recordFor(record, ENGINEERING_STAGES[i]))) {
    return blocked('EXACT_12_STAGE_ORDER_AND_EVIDENCE_RECORDS_REQUIRED');
  }
  if (!sha256(expectedMemorySha256)) return blocked('PINNED_MEMORY_CONTRACT_SHA256_REQUIRED');

  const memoryState = observedMemorySha256 === null ? 'NOT_READ_BACK' :
    !sha256(observedMemorySha256) ? 'INVALID_OBSERVED_SHA' :
    observedMemorySha256.toLowerCase() !== expectedMemorySha256.toLowerCase() ?
      'CONTRACT_HASH_MISMATCH' : 'HASH_STRINGS_MATCH_NOT_INDEPENDENTLY_VERIFIED';
  if (memoryState === 'INVALID_OBSERVED_SHA' || memoryState === 'CONTRACT_HASH_MISMATCH') {
    return blocked(memoryState);
  }
  let firstUnfinished = null;
  const recordStates = [];
  for (let i=0;i<stageRecords.length;i++) {
    const r = stageRecords[i], name = ENGINEERING_STAGES[i];
    if (r.status === 'DONE' && r.evidenceRefs.length === 0) {
      return blocked('DONE_STAGE_WITHOUT_EVIDENCE_REF:' + name,name);
    }
    if (r.status === 'NOT_APPLICABLE' &&
        (typeof r.reason !== 'string' || r.reason.trim().length < 10)) {
      return blocked('NOT_APPLICABLE_WITHOUT_REASON:' + name,name);
    }
    if (r.status === 'DONE' && firstUnfinished !== null) {
      return blocked('SKIPPED_OPEN_STAGE_BEFORE_DONE:' + name,firstUnfinished);
    }
    if (!['DONE','NOT_APPLICABLE'].includes(r.status) && firstUnfinished === null) {
      firstUnfinished=name;
    }
    recordStates.push({stage:name,status:r.status,evidenceRefs:r.evidenceRefs});
  }
  const veritas = stageRecords[8];
  if (veritas.status === 'DONE' &&
      (independentVeritas !== 'EXTERNAL_VERIFIER_OBSERVED' || !validRef(verifierReference))) {
    return blocked('VERIFY_STAGE_REQUIRES_EXTERNAL_INDEPENDENT_VERIFIER_REF','VERIFY');
  }
  const checkpoint = stageRecords[10];
  if (checkpoint.status === 'DONE' && !validRef(checkpointReadbackReference)) {
    return blocked('CHECKPOINT_REQUIRES_ACTUAL_READBACK_REF','CHECKPOINT');
  }
  const unfinished = firstUnfinished || 'AWAITING_INDEPENDENT_PRODUCTION_ADMISSION';
  return Object.freeze({
    status:'SOURCE_HANDOFF_SHAPE_ACCEPTED_NOT_PRODUCTION_PROOF',
    missionId,
    memoryContractState:memoryState,
    nextUnfinishedGate:unfinished,
    stageStates:Object.freeze(recordStates.map(Object.freeze)),
    sourceEvidenceReferencesOnly:true,
    runtimeReadback:'NOT_PERFORMED_BY_THIS_VALIDATOR',
    actualRuntimeExecution:'NOT_EVALUATED',
    independentVeritasAccepted:false,
    canonicalReceiptCreated:false,
    continuumState:'NOT_PROBED',
    learningState:'NOT_ADMITTED',
    sourceReviewCanAuthorizeAction:false
  });
}
