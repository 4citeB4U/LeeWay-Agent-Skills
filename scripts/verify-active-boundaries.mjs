import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve(process.argv[2] ?? process.env.LEEWAY_ACTIVE_BOUNDARIES_MANIFEST ?? '');
if (!manifestPath || !fs.existsSync(manifestPath)) {
  console.error('USAGE: node scripts/verify-active-boundaries.mjs <active-boundaries.json>');
  process.exit(2);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const canonicalPath = path.resolve(manifest.memoryContract);
const canonicalBytes = fs.readFileSync(canonicalPath);
const canonicalSha256 = crypto.createHash('sha256').update(canonicalBytes).digest('hex').toUpperCase();
const required = [
  'LEEWAY.MEMORY.AUTHORITY',
  'Uniform 12-stage engineering loop',
  'INVESTIGATE → DIAGNOSE → PLAN → IMPLEMENT → TEST → VALIDATE → REPAIR → RETEST → VERIFY → EVIDENCE → CHECKPOINT → CONTINUE',
  'Agent onboarding and loading',
  'Agent Lee voice and behavior',
  'Fail-closed rule'
];
const results = (manifest.boundaries ?? []).map(boundary => {
  const root = path.resolve(boundary.path);
  const file = path.join(root, 'MEMORY.md');
  try {
    const bytes = fs.readFileSync(file);
    const sha256 = crypto.createHash('sha256').update(bytes).digest('hex').toUpperCase();
    const text = bytes.toString('utf8');
    const missing = required.filter(fragment => !text.includes(fragment));
    return { id: boundary.id, root, file, state: sha256 === canonicalSha256 && missing.length === 0 ? 'UNIFORM' : 'DRIFTED', sha256, bytes: bytes.length, missing };
  } catch (error) {
    return { id: boundary.id, root, file, state: 'MISSING', error: error.message };
  }
});
const status = results.length > 0 && results.every(result => result.state === 'UNIFORM') ? 'PASS' : 'FAIL';
console.log(JSON.stringify({
  status,
  contractId: manifest.contractId,
  contractVersion: manifest.version,
  manifestPath,
  canonicalPath,
  canonicalSha256,
  historicalArchivesExcluded: manifest.historicalArchivesExcluded === true,
  boundaries: results
}, null, 2));
if (status !== 'PASS') process.exitCode = 1;
