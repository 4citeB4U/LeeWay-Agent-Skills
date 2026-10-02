/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE.UPDATE.GOVERNANCE
TAG: CORE.UPDATE.POLICY.V1

5WH:
WHAT = Canonical LeeWay automatic-retrieval / human-apply update policy helpers
WHY = Prevents silent application while allowing opt-in automatic GitHub update retrieval
WHO = LeeWay Industries
WHERE = LeeWay-Standards/src/core/update-policy.js
WHEN = 2026
HOW = Pure ESM state/policy helpers with no network or installer side effects

LICENSE:
MIT
*/

export const LEEWAY_UPDATE_STANDARD = 'LEEWAY-UPDATE-v1.0';

export const UPDATE_STATES = Object.freeze([
  'DISABLED','CHECKING','CURRENT','UPDATE_AVAILABLE','DOWNLOADING','VERIFYING',
  'READY_FOR_APPROVAL','APPLYING','VERIFYING_APPLIED','PASS','ROLLBACK_READY',
  'FAILED','BLOCKED'
]);

export function createUpdatePolicy(input = {}) {
  return Object.freeze({
    standard: LEEWAY_UPDATE_STANDARD,
    canonicalRepository: String(input.canonicalRepository || '').trim(),
    channel: input.channel || 'stable',
    automaticRetrievalEnabled: input.automaticRetrievalEnabled === true,
    applyRequiresUserApproval: true,
    checkIntervalHours: Math.max(1, Number(input.checkIntervalHours || 24)),
    minimumRetryBackoffHours: Math.max(1, Number(input.minimumRetryBackoffHours || 1)),
    wifiOnly: input.wifiOnly === true,
    retainRollbackUntilHealthPass: true,
    requireSha256: true,
    requireSignerContinuityWhenSupported: true
  });
}

export function mayAutomaticallyRetrieve(policy) {
  return policy?.standard === LEEWAY_UPDATE_STANDARD &&
    policy?.automaticRetrievalEnabled === true &&
    String(policy?.canonicalRepository || '').trim().length > 0;
}

export function mayApplyUpdate({ state, humanApproved } = {}) {
  return state === 'READY_FOR_APPROVAL' && humanApproved === true;
}

export function assertApplyTransition({ from, to, humanApproved } = {}) {
  if (to === 'APPLYING' && !mayApplyUpdate({ state: from, humanApproved })) {
    throw new Error('LEEWAY_UPDATE_HUMAN_APPROVAL_REQUIRED');
  }
  return true;
}
