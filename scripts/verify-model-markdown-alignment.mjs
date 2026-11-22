import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const canonicalRoot = path.resolve(args.shift() ?? '.');
const defaultManifest = path.join(canonicalRoot, 'config', 'leeway-model-markdown-alignment.json');
let manifestPath = defaultManifest;
if (args[0]?.toLowerCase().endsWith('.json')) manifestPath = path.resolve(canonicalRoot, args.shift());

const usage = 'USAGE: node scripts/verify-model-markdown-alignment.mjs <canonical-root> [manifest.json] [extra-file ...]';
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (error) {
  console.error(JSON.stringify({ status: 'FAIL', reason: 'ALIGNMENT_MANIFEST_MISSING_OR_INVALID', manifestPath, error: error.message }, null, 2));
  console.error(usage);
  process.exit(1);
}

const memoryPath = path.resolve(canonicalRoot, manifest.memoryContract ?? 'MEMORY.md');
let memoryBytes;
try {
  memoryBytes = fs.readFileSync(memoryPath);
} catch (error) {
  console.error(JSON.stringify({ status: 'FAIL', reason: 'MEMORY_CONTRACT_MISSING', memoryPath, error: error.message }, null, 2));
  process.exit(1);
}

const memorySha256 = crypto.createHash('sha256').update(memoryBytes).digest('hex').toUpperCase();
const requiredFragments = [
  'LEEWAY.MEMORY.AUTHORITY',
  'MEMORY.md',
  'MEMORY_AUTHORITY = BLOCKED',
  'INVESTIGATE → DIAGNOSE → PLAN → IMPLEMENT → TEST → VALIDATE → REPAIR → RETEST → VERIFY → EVIDENCE → CHECKPOINT → CONTINUE'
];

const relativeFiles = Array.isArray(manifest.activeDocuments) ? manifest.activeDocuments : [];
const files = [
  ...relativeFiles.map(file => path.resolve(canonicalRoot, file)),
  ...args.map(file => path.resolve(file))
];
const uniqueFiles = [...new Set(files)];
const results = uniqueFiles.map(file => {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (error) {
    return { file, state: 'MISSING', error: error.message };
  }
  const missing = requiredFragments.filter(fragment => !text.includes(fragment));
  const legacyLoop = text.includes('Investigate → Diagnose → Plan → Implement → Test → Validate → Repair → Retest → Verify → Evidence') &&
    !text.includes('Investigate → Diagnose → Plan → Implement → Test → Validate → Repair → Retest → Verify → Evidence → Checkpoint → Continue');
  return {
    file,
    state: missing.length === 0 && !legacyLoop ? 'ALIGNED' : 'DRIFTED',
    missing: missing.length === 0 ? [] : missing,
    legacyLoop
  };
});

const status = results.length > 0 && results.every(result => result.state === 'ALIGNED') ? 'PASS' : 'FAIL';
const report = {
  status,
  contractId: manifest.contractId,
  contractVersion: manifest.version,
  canonicalRoot,
  bindingDocument: path.resolve(canonicalRoot, manifest.bindingDocument ?? 'docs/LEEWAY-MODEL-MARKDOWN-BINDING.md'),
  memoryContract: { file: memoryPath, sha256: memorySha256 },
  scope: 'manifested active model-facing Markdown plus explicit extra files; historical archives are excluded',
  documents: results
};
console.log(JSON.stringify(report, null, 2));
if (status !== 'PASS') process.exitCode = 1;
