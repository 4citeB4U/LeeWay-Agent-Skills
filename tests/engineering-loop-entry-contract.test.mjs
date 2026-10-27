/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT.SKILLS.TESTS
TAG: LEEWAY.AGENT.SKILLS.TESTS.ENGINEERING.LOOP.ENTRY.CONTRACT
5WH:
WHAT = Verify always-on engineering loop and OG expressive identity entry declarations.
WHY = Prevent omission of either established skill from supported source configurations.
WHO = LeeWay Agent Skills contributors under LeeWay Standards authority.
WHERE = tests/engineering-loop-entry-contract.test.mjs
WHEN = 2026-10-27.
HOW = Node built-in assertions against existing checked-in entry contracts.
LICENSE: Existing LeeWay-Agent-Skills repository terms apply.
AUTHORITY: Source-contract only; not host loading, native execution, Veritas or speech proof.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = p => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const loop = 'leeway-agent-operating-loop';
const identity = 'leeway-og-expressive-identity';

function listSection(source, start, end) {
  const i = source.indexOf(start);
  if (i < 0) return '';
  const tail = source.slice(i + start.length);
  const j = tail.indexOf(end);
  return j < 0 ? tail : tail.slice(0, j);
}
const cases = [
  ['agent-config.yaml', '  constitutional_core:\n', '  available_core:'],
  ['config/leeway-core-governance.yaml', 'always_on_stack:\n', 'conditional_core:'],
  ['.github/copilot-instructions.md', '## Always-on stack\n', '## Governed path']
];

test('every declared always-on entrypoint includes both existing skills in correct order', () => {
  for (const [file, start, end] of cases) {
    const section = listSection(read(file), start, end);
    assert.ok(section, file + ' missing always-on section');
    assert.ok(section.includes(loop), file + ' missing operating-loop');
    assert.ok(section.includes(identity), file + ' missing expressive identity');
    assert.ok(section.indexOf(loop) < section.indexOf(identity),
      file + ' delivery identity must follow operating loop');
  }
});

test('regression negative: removing either mandatory skill is rejected', () => {
  for (const [file, start, end] of cases) {
    const section = listSection(read(file), start, end);
    for (const skill of [loop, identity]) {
      const altered = section.split(skill).join('missing-skill-for-negative-test');
      assert.equal(altered.includes(skill), false,
        file + ' negative fixture must genuinely omit ' + skill);
      assert.ok(!([loop, identity].every(id => altered.includes(id))),
        file + ' should fail required-skill coverage after removal');
    }
  }
});

test('source explicitly preserves ten-step lifecycle and output role', () => {
  const agentConfig = read('agent-config.yaml');
  const governance = read('config/leeway-core-governance.yaml');
  const copilot = read('.github/copilot-instructions.md');
  const steps = ['Investigate','Diagnose','Plan','Implement','Test','Validate','Repair','Retest','Verify','Evidence'];
  for (const s of steps) {
    assert.ok(agentConfig.includes(s), 'agent-config missing ' + s);
    assert.ok(governance.includes(s), 'core-governance missing ' + s);
    assert.ok(copilot.includes(s), 'Copilot missing ' + s);
  }
  assert.ok(governance.includes('stage: output_identity'));
  assert.ok(copilot.includes('## LeeWay voice'));
});
