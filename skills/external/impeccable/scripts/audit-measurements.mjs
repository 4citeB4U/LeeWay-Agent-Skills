/*
LEEWAY HEADER - DO NOT REMOVE
REGION: LEEWAY.SKILLS.DESIGN.MEASUREMENTS
TAG: IMPECCABLE.CURATED.MEASUREMENT.HELPER.V1
5WH:
 WHAT = Check supplied design measurements against explicit project requirements
 WHY = Reuse a bounded deterministic check without importing the upstream detector
 WHO = LeeWay Industries / authorized Agent Lee capability execution
 WHERE = skills/external/impeccable/scripts/audit-measurements.mjs
 WHEN = 2026-10-06
 HOW = Pure numeric validation with missing-evidence and revision guards
AUTHORIZED ROLES: INSPECT / AUDIT / TEST; no authority grant or mutation
LICENSE: MIT
*/

export const MEASUREMENT_KINDS = Object.freeze([
  'contrast', 'text-overflow', 'bounds', 'target-size', 'frame-budget'
]);
const hash = v => typeof v === 'string' && /^[a-f0-9]{64}$/i.test(v);
const text = v => typeof v === 'string' && v.trim().length > 0;
const object = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const finite = (v, min = 0) => typeof v === 'number' && Number.isFinite(v) && v >= min;
const positive = v => finite(v) && v > 0;
const all = (m, keys, check = finite) => keys.every(k => check(m[k]));

/**
 * Evaluate supplied observations only. This function neither collects nor authenticates evidence.
 * @param {object} snapshot {artifactSha256, evidenceRef, measurements:[{id,kind,...}]}
 * @param {object} requirements {artifactSha256, evidenceRef, checks:[{id,kind,...limits}]}
 * Requirements are caller-provided approved limits, separate from measured values.
 * Each declared check ID needs exactly one measurement of the same kind. Extra IDs are rejected.
 * The hash binds artifact bytes, NOT a whole deployment or a temporal freshness guarantee.
 * @returns {{status:string, findings:object[], checked:number, scope:string,
 *   nativeRenderVerified:boolean, formulaExecuted:boolean, authorityGranted:boolean}}
 */
export function auditMeasurements(snapshot, requirements) {
  const findings = [];
  let checked = 0;
  const add = (code, id = null) => findings.push({code, id});
  const finish = () => ({
    status: findings.some(f => f.code.startsWith('MISSING_') || f.code.startsWith('INVALID_') || f.code.endsWith('_MISMATCH'))
      ? 'INCOMPLETE' : findings.length ? 'FINDINGS' : 'MEASUREMENTS_SATISFIED',
    findings, checked, scope: 'supplied-measurements-only',
    nativeRenderVerified: false, formulaExecuted: false, authorityGranted: false
  });
  if (!object(snapshot) || !object(requirements)) { add('INVALID_INPUT'); return finish(); }
  if (!hash(requirements.artifactSha256) || !hash(snapshot.artifactSha256)) add('INVALID_ARTIFACT_HASH');
  else if (snapshot.artifactSha256.toLowerCase() !== requirements.artifactSha256.toLowerCase()) add('ARTIFACT_MISMATCH');
  if (!text(requirements.evidenceRef) || !text(snapshot.evidenceRef)) add('MISSING_EVIDENCE_REFERENCE');
  else if (snapshot.evidenceRef !== requirements.evidenceRef) add('EVIDENCE_MISMATCH');
  if (!Array.isArray(requirements.checks) || !requirements.checks.length) add('MISSING_REQUIRED_CHECKS');
  if (!Array.isArray(snapshot.measurements) || !snapshot.measurements.length) add('MISSING_MEASUREMENTS');
  if (findings.length) return finish();
  const rules = new Map();
  for (const r of requirements.checks) {
    if (!object(r) || !text(r.id) || !MEASUREMENT_KINDS.includes(r.kind)) { add('INVALID_REQUIREMENT'); continue; }
    if (rules.has(r.id)) { add('INVALID_DUPLICATE_REQUIREMENT', r.id); continue; }
    let valid;
    switch (r.kind) {
      case 'contrast': valid = finite(r.minimum, 1) && r.minimum <= 21; break;
      case 'text-overflow': valid = true; break;
      case 'bounds': valid = all(r, ['x','y'], Number.isFinite) && all(r, ['width','height'], positive)
        && Number.isFinite(r.x + r.width) && Number.isFinite(r.y + r.height); break;
      case 'target-size': valid = all(r, ['minWidth','minHeight'], positive); break;
      case 'frame-budget': valid = positive(r.maxFrameMs); break;
    }
    if (!valid) add('INVALID_LIMIT', r.id);
    else rules.set(r.id, r);
  }
  if (findings.length) return finish();
  const seen = new Set();
  for (const m of snapshot.measurements) {
    if (!object(m) || !text(m.id)) { add('INVALID_MEASUREMENT'); continue; }
    if (seen.has(m.id)) { add('INVALID_DUPLICATE_MEASUREMENT', m.id); continue; }
    seen.add(m.id);
    const r = rules.get(m.id);
    if (!r) { add('INVALID_UNDECLARED_MEASUREMENT', m.id); continue; }
    if (m.kind !== r.kind) { add('KIND_MISMATCH', m.id); continue; }
    let valid = false, satisfied = false;
    switch (r.kind) {
      case 'contrast':
        valid = finite(m.value, 1) && m.value <= 21;
        satisfied = m.value >= r.minimum;
        break;
      case 'text-overflow':
        valid = all(m, ['contentWidth','contentHeight']) && all(m, ['boxWidth','boxHeight'], positive);
        satisfied = m.contentWidth <= m.boxWidth && m.contentHeight <= m.boxHeight;
        break;
      case 'bounds':
        valid = all(m, ['x','y'], Number.isFinite) && all(m, ['width','height'], positive)
          && Number.isFinite(m.x + m.width) && Number.isFinite(m.y + m.height);
        satisfied = m.x >= r.x && m.y >= r.y && m.x + m.width <= r.x + r.width && m.y + m.height <= r.y + r.height;
        break;
      case 'target-size':
        valid = all(m, ['width','height'], positive);
        satisfied = m.width >= r.minWidth && m.height >= r.minHeight;
        break;
      case 'frame-budget':
        valid = finite(m.frameMs);
        satisfied = m.frameMs <= r.maxFrameMs;
        break;
    }
    if (!valid) add('INVALID_MEASUREMENT', m.id);
    else { checked++; if (!satisfied) add('LIMIT_NOT_MET', m.id); }
  }
  for (const id of rules.keys()) if (!seen.has(id)) add('MISSING_REQUIRED_MEASUREMENT', id);
  return finish();
}
