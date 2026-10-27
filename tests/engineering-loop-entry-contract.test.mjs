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

test('teachable correction remains attached to existing governance, not self-awarded proof', () => {
  const config = read('agent-config.yaml');
  const governance = read('config/leeway-core-governance.yaml');
  const copilot = read('.github/copilot-instructions.md');
  for (const source of [config, governance]) {
    for (const step of ['observe_failure', 'classify_engineering_or_delivery',
      'preserve_parent_objective', 'teach_expected_behavior', 'revise', 'retest',
      'record_real_evidence']) {
      assert.ok(source.includes(step), 'missing correction step ' + step);
    }
    assert.ok(source.includes('delivery_identity: leeway-og-expressive-identity'));
    assert.ok(source.includes('only verified experience is eligible'));
  }
  assert.match(copilot, /Teachable correction and delivery qualification/);
  assert.match(copilot, /human.*AI agents/);
  assert.match(copilot, /Veritas proof/);
  assert.match(copilot, /Learning Ledger promotion requires eligible evidence/);
});

test('negative contract: omission of teaching, retest or evidence is detected', () => {
  for (const file of ['agent-config.yaml', 'config/leeway-core-governance.yaml']) {
    const source = read(file);
    for (const requirement of ['teach_expected_behavior', 'retest', 'record_real_evidence']) {
      const corrupted = source.replace(requirement, 'omitted_contract_step');
      const extract = (s) => s.match(/  correction_path: \[([^\]]+)\]/)?.[1] || '';
      assert.ok(extract(source).includes(requirement));
      assert.ok(!extract(corrupted).includes(requirement),
        file + ' must reject missing ' + requirement);
    }
  }
});

test('expressive identity canonical skill teaches observation, revision and retest', () => {
  const skill = read('skills/leeway-og-expressive-identity/SKILL.md');
  const expected = [
    '## Teachable pre-delivery conformance and correction',
    '**Learn:**', '**Apply:**', '**Observe before delivery:**',
    '**Correct:**', '**Retest:**', '**Prove and teach:**',
    'CONTRACT_DECLARED', 'MODEL_OUTPUT_OBSERVED',
    'HOST_DELIVERY_CHECK_ENFORCED', 'VERITAS_VERIFIED'
  ];
  for (const item of expected) {
    assert.ok(skill.includes(item), 'expressive skill missing ' + item);
  }
  assert.match(skill, /original assignment/);
  assert.match(skill, /sterile engineering summary/);
  assert.match(skill, /single chat correction is not permanent model training/);
});

test('negative contract: pre-delivery teachability requires each distinct stage', () => {
  const skill = read('skills/leeway-og-expressive-identity/SKILL.md');
  const section = skill.split('## Teachable pre-delivery conformance and correction')[1]
    ?.split('## Output law')[0] || '';
  for (const stage of ['**Learn:**', '**Apply:**', '**Observe before delivery:**',
    '**Correct:**', '**Retest:**', '**Prove and teach:**']) {
    assert.ok(section.includes(stage));
    const altered = section.split(stage).join('omitted-stage');
    assert.ok(!altered.includes(stage), 'negative stage deletion must be detected');
  }
});

test('engineering experience-based replay is routed to existing skills without invented proof',()=>{
 const source=read('.github/copilot-instructions.md');
 assert.match(source,/Experience-based engineering corrections/);
 assert.match(source,/CASE-001-PREMATURE-STOP-AND-EVIDENCE-CONTINUITY/);
 assert.match(source,/CASE-001-WORK-CHECKLIST/);
 assert.match(source,/historical-evidence erasure/);
 assert.match(source,/done\/pending To-Do list/);
 assert.match(source,/host-observed replay and independent Veritas promotion remain separate/);
 const corrupted=source.replace('CASE-001-WORK-CHECKLIST','MISSING-EXPERIENCE-CHECKLIST');
 assert.ok(!corrupted.includes('CASE-001-WORK-CHECKLIST'));
});
