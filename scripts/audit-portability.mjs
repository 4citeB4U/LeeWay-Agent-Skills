import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const fixedHost = /\b[A-Za-z]:[\\/]|\/(?:Users|home)\/[A-Za-z0-9_.-]+/;
const failures = [];
let sourceFiles = 0, skillFiles = 0, configFiles = 0;
async function walk(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', '__pycache__'].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}
function inspect(text, file, pointer = '') {
  if (fixedHost.test(text)) failures.push({ file: path.relative(root, file).split(path.sep).join('/'), pointer, reason: 'Fixed machine path in operational surface' });
}
for (const directory of ['scripts', 'sdk', 'bin', 'tools', 'mcp-server/src', 'mcp-remote/src']) {
  for (const file of await walk(path.join(root, directory))) {
    if (!/\.(?:[cm]?js|ts|py|ps1|sh)$/.test(file) || /[\\/]tests?[\\/]|\.test\./.test(file)) continue;
    sourceFiles++;
    inspect(await fs.readFile(file, 'utf8'), file);
  }
}
for (const file of await walk(path.join(root, 'skills'))) {
  if (path.basename(file) !== 'SKILL.md') continue;
  skillFiles++;
  inspect(await fs.readFile(file, 'utf8'), file);
}
for (const file of await walk(path.join(root, 'config'))) {
  if (!file.endsWith('.json')) continue;
  configFiles++;
  const document = JSON.parse((await fs.readFile(file, 'utf8')).replace(/^\uFEFF/, ''));
  const visit = (value, pointer = '') => {
    // These exact evidence branches are dated history, never runtime defaults.
    const relative = path.relative(root, file).split(path.sep).join('/');
    if (relative === 'config/leeway-capability-universe.json' && pointer.startsWith('/host_inventories/')) return;
    if (relative === 'config/image-to-3d-refinement-pipeline.json' && pointer.startsWith('/historicalRuntime/')) return;
    if (typeof value === 'string') inspect(value, file, pointer);
    else if (value && typeof value === 'object') for (const [key, child] of Object.entries(value)) visit(child, `${pointer}/${key}`);
  };
  visit(document);
}
const result = { state: failures.length ? 'FAIL' : 'PASS_BOUNDED_STATIC_AUDIT', sourceFiles, skillFiles, configFiles, failures, scope: 'Operational source, every SKILL.md and JSON configuration; historical evidence branches retained. Does not prove OS, device, browser, model or integration execution.' };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
