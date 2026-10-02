import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LEEWAY_UPDATE_STANDARD,
  createUpdatePolicy,
  mayAutomaticallyRetrieve,
  mayApplyUpdate,
  assertApplyTransition
} from './update-policy.js';

test('automatic retrieval is opt-in and apply always requires a human', () => {
  const off = createUpdatePolicy({ canonicalRepository: '4citeB4U/example' });
  assert.equal(off.standard, LEEWAY_UPDATE_STANDARD);
  assert.equal(mayAutomaticallyRetrieve(off), false);
  assert.equal(off.applyRequiresUserApproval, true);

  const on = createUpdatePolicy({
    canonicalRepository: '4citeB4U/example',
    automaticRetrievalEnabled: true
  });
  assert.equal(mayAutomaticallyRetrieve(on), true);
  assert.equal(mayApplyUpdate({ state: 'READY_FOR_APPROVAL', humanApproved: false }), false);
  assert.equal(mayApplyUpdate({ state: 'READY_FOR_APPROVAL', humanApproved: true }), true);
});

test('READY_FOR_APPROVAL cannot become APPLYING without human approval', () => {
  assert.throws(
    () => assertApplyTransition({ from: 'READY_FOR_APPROVAL', to: 'APPLYING', humanApproved: false }),
    /LEEWAY_UPDATE_HUMAN_APPROVAL_REQUIRED/
  );
  assert.equal(assertApplyTransition({
    from: 'READY_FOR_APPROVAL',
    to: 'APPLYING',
    humanApproved: true
  }), true);
});
