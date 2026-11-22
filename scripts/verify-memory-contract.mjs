import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const roots = process.argv.slice(2).map(value => path.resolve(value));
if (roots.length < 1) {
  console.error('USAGE: node scripts/verify-memory-contract.mjs <canonical-root> [target-root ...]');
  process.exit(2);
}

const required = [
  'LEEWAY.MEMORY.AUTHORITY',
  'Uniform 12-stage engineering loop',
  'INVESTIGATE → DIAGNOSE → PLAN → IMPLEMENT → TEST → VALIDATE → REPAIR → RETEST → VERIFY → EVIDENCE → CHECKPOINT → CONTINUE',
  'Agent onboarding and loading',
  'Agent Lee voice and behavior',
  'Fail-closed rule'
];

const contractPath = root => path.join(root, 'MEMORY.md');
const read = file => fs.readFileSync(file);
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex').toUpperCase();

let canonicalBytes;
let canonicalText;
try {
  canonicalBytes = read(contractPath(roots[0]));
  canonicalText = canonicalBytes.toString('utf8');
} catch (error) {
  console.error(JSON.stringify({ status: 'FAIL', reason: 'CANONICAL_MEMORY_CONTRACT_MISSING', root: roots[0], error: error.message }, null, 2));
  process.exit(1);
}

const missingRequired = required.filter(fragment => !canonicalText.includes(fragment));
const expectedSha256 = sha256(canonicalBytes);
const results = roots.map(root => {
  const file = contractPath(root);
  try {
    const bytes = read(file);
    const actualSha256 = sha256(bytes);
    return {
      root,
      file,
      state: actualSha256 === expectedSha256 ? 'UNIFORM' : 'DRIFTED',
      sha256: actualSha256,
      bytes: bytes.length
    };
  } catch (error) {
    return { root, file, state: 'MISSING', error: error.message };
  }
});

const status = missingRequired.length === 0 && results.every(result => result.state === 'UNIFORM') ? 'PASS' : 'FAIL';
const report = {
  status,
  contractId: 'LEEWAY.MEMORY.AUTHORITY',
  contractVersion: '1.0.0',
  canonicalRoot: roots[0],
  canonicalFile: contractPath(roots[0]),
  canonicalSha256: expectedSha256,
  requiredFragments: missingRequired.length === 0 ? 'PRESENT' : missingRequired,
  roots: results
};

console.log(JSON.stringify(report, null, 2));
if (status !== 'PASS') process.exitCode = 1;
