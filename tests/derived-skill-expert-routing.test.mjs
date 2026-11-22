/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.DERIVED_EXPERT_ROUTING_TESTS
TAG: LEEWAY.AGENT_SKILLS.DERIVED_EXPERT_ROUTING_TESTS.V1
5WH:
WHAT = Prove portable, bounded and deterministic skill-source selection without execution claims.
WHY = Prevent metadata routing from becoming a second skill authority or accidental tool invocation.
WHO = Original LeeWay Agent Skills source owner; GPT-6 outside support contributor.
WHERE = tests/derived-skill-expert-routing.test.mjs.
WHEN = 2026-11-22.
HOW = Node built-ins, safe disposable fixtures and canonical repo smoke test; no live providers.
LICENSE = Existing repository terms unchanged.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {compileDerivedExpertMap, routeDerivedSkillExperts, planSkillExpertHydration} from '../sdk/derived-skill-expert-routing.js';

const fixtureRoot=mkdtempSync(path.join(tmpdir(),'leeway-derived-expert-test-'));
const add=(p,text)=>{
  const full=path.join(fixtureRoot,'skills',p,'SKILL.md');
  mkdirSync(path.dirname(full),{recursive:true});
  writeFileSync(full,text,'utf8');
};
add('leeway-office',[
  '---','name: leeway-office','description: Render source-grounded editable infographic charts',
  'domain: office','triggers: [infographic, document, chart]','priority: 2',
  'requires: [leeway-veritas]','conflicts: [leeway-office-unsafe]','---','# Office'
].join('\n'));
add('leeway-office-unsafe',[
  '---','name: leeway-office-unsafe','description: Outdated infographic graphics',
  'triggers: [infographic]','conflicts: [leeway-office]','---','# Unsafe'
].join('\n'));
add('leeway-veritas',[
  '---','name: leeway-veritas','description: Independently verify source and output',
  'triggers: [verify, evidence]','---','# Veritas'
].join('\n'));
add('external/gsap',[
  '---','name: gsap-skills','description: React animation and interactive motion',
  'metadata:','  mode: visual','---','# GSAP'
].join('\n'));
const realRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const fixtureMap=compileDerivedExpertMap({rootDir:fixtureRoot,sourceCommit:'fixture-commit'});
test.after(()=>rmSync(fixtureRoot,{recursive:true,force:true}));

test('derived projection reflects only actual SKILL.md files and path-pins its source',()=>{
  assert.equal(fixtureMap.expertCount,4);
  assert.equal(fixtureMap.owner,'4citeB4U/LeeWay-Agent-Skills');
  assert.equal(fixtureMap.sourceState,'DERIVED_FROM_PRESENT_SKILL_FILES_NOT_RUNTIME_ADMITTED');
  assert.equal(fixtureMap.receipt,'NOT_CREATED');
  for(const e of fixtureMap.experts){
    assert.match(e.sourcePath,/^skills\/.*\/SKILL\.md$/);
    assert.match(e.sourceSha256,/^[a-f0-9]{64}$/);
    assert.equal(e.capabilityGrant,'NOT_CONFERRED');
    assert.equal(e.execution,'NOT_EXECUTED');
    assert.equal(e.modelAuthority,'NONE');
  }
});
test('same source inputs compile exactly the same fingerprint and ordering',()=>{
  const second=compileDerivedExpertMap({rootDir:fixtureRoot,sourceCommit:'fixture-commit'});
  assert.deepEqual(fixtureMap,second);
});
test('top-K matches infographic source, returns source metadata not heavy instructions',()=>{
  const r=routeDerivedSkillExperts({map:fixtureMap,task:'Create an editable source infographic and chart',topK:3});
  assert.equal(r.status,'EXPERT_CANDIDATES_SOURCE_ONLY');
  assert.equal(r.selected[0].id,'leeway-office');
  assert.ok(r.selected.length<=3);
  assert.equal(r.instructionsLoaded,false);
  assert.equal(r.toolGrant,'NOT_CONFERRED');
  assert.equal(r.runtimeDispatch,'NOT_EXECUTED');
  assert.equal(r.verification,'NOT_PERFORMED');
});
test('ambiguous matching obeys explicit conflicts and stable tie-break',()=>{
  const r=routeDerivedSkillExperts({map:fixtureMap,task:'infographic',topK:3});
  const ids=r.selected.map(e=>e.id);
  assert.ok(ids.includes('leeway-office'));
  assert.ok(!ids.includes('leeway-office-unsafe'));
});
test('hydration returns only exact-source read plan, not instructions or permission',()=>{
  const r=routeDerivedSkillExperts({map:fixtureMap,task:'office infographic',topK:1});
  const h=planSkillExpertHydration({map:fixtureMap,route:r});
  assert.equal(h.status,'HYDRATION_PLAN_REQUIRES_AUTHORIZED_ORIGINAL_RUNTIME');
  assert.equal(h.sourcePlans.length,1);
  assert.equal(h.sourceFilesActuallyRead,false);
  assert.equal(h.instructionsInjected,false);
  assert.equal(h.originalRuntimeAuthorization,'NOT_CHECKED');
  assert.equal(h.privilegesGranted,false);
  assert.equal(h.dispatch,'NOT_EXECUTED');
  assert.match(h.sourcePlans[0].sourceSha256,/^[a-f0-9]{64}$/);
});
test('context byte budget keeps full skill files out of active context',()=>{
  const route=routeDerivedSkillExperts({map:fixtureMap,task:'office infographic',topK:3});
  const h=planSkillExpertHydration({map:fixtureMap,route,maxContextBytes:1024});
  assert.ok(h.plannedContextBytes<=1024);
  assert.ok(h.sourcePlans.length<=route.selected.length);
});
test('no-match returns zero skills instead of inventing an executor',()=>{
  const r=routeDerivedSkillExperts({map:fixtureMap,task:'zzzzcobaltunknowncapability',topK:2});
  assert.equal(r.status,'NO_MATCHING_SOURCE_SKILLS');
  assert.deepEqual(r.selected,[]);
  assert.equal(planSkillExpertHydration({map:fixtureMap,route:r}).status,'CONTEXT_BUDGET_OR_SELECTION_BLOCKED');
});
test('unbounded inputs, prompts and invalid topK fail closed',()=>{
  assert.throws(()=>routeDerivedSkillExperts({map:fixtureMap,task:'abc',topK:999}),/EXPERT_ROUTING_INPUT_INVALID/);
  assert.throws(()=>routeDerivedSkillExperts({map:fixtureMap,task:'',topK:1}),/EXPERT_ROUTING_INPUT_INVALID/);
  assert.throws(()=>routeDerivedSkillExperts({map:fixtureMap,task:'x'.repeat(1200),topK:2}),/EXPERT_ROUTING_INPUT_INVALID/);
  assert.throws(()=>planSkillExpertHydration({map:fixtureMap,route:{selected:[],metadataIndexSha256:'fake'}}),/EXPERT_HYDRATION_INPUT_INVALID/);
});
test('forged source hash and missing metadata fingerprint block hydration',()=>{
  const selected=routeDerivedSkillExperts({map:fixtureMap,task:'infographic',topK:1});
  const forged={...selected,selected:[{...selected.selected[0],sourceSha256:'a'.repeat(64)}]};
  assert.throws(()=>planSkillExpertHydration({map:fixtureMap,route:forged}),/EXPERT_HYDRATION_SOURCE_PIN_MISMATCH/);
  assert.throws(()=>routeDerivedSkillExperts({map:{experts:[],expertCount:0},task:'office'}),/EXPERT_MAP_CANONICAL_SOURCE_REQUIRED/);
});
test('derive from filenames, not legacy 44-row catalog or arbitrary external URL',()=>{
  assert.ok(!fixtureMap.experts.some(e=>e.sourcePath.includes('skills-registry.json')));
  assert.equal(fixtureMap.experts.find(e=>e.id==='external/gsap').name,'gsap-skills');
});
test('source scope omits symlinks and never recurses outside skills directory',()=>{
  const outside=path.join(fixtureRoot,'non-skill-folder');
  mkdirSync(outside,{recursive:true});
  writeFileSync(path.join(outside,'SKILL.md'),'---\nname: injected\n---');
  try{symlinkSync(outside,path.join(fixtureRoot,'skills','escape-linked-dir'),'dir');}catch{}
  const next=compileDerivedExpertMap({rootDir:fixtureRoot});
  assert.equal(next.expertCount,4);
});
test('real canonical repository yields useful original skill metadata without host execution',()=>{
  const map=compileDerivedExpertMap({rootDir:realRoot});
  assert.ok(map.expertCount>=75,'real source should have many canonical skill files');
  assert.ok(map.experts.some(e=>e.id==='leeway-skill-orchestrator'));
  assert.ok(map.experts.some(e=>e.id==='leeway-veritas'));
  assert.ok(map.experts.some(e=>e.id==='external/gsap'));
  assert.equal(map.runtimeExecution,'NOT_EXECUTED');
  const r=routeDerivedSkillExperts({map,task:'capability skill orchestration and formula routing',topK:4});
  assert.ok(r.selected.length>0);
  assert.ok(r.selected.length<=4);
  const h=planSkillExpertHydration({map,route:r});
  assert.equal(h.loader,'EXISTING_LEEWAY_SKILL_ORCHESTRATOR_AND_TOOL_GATEWAY');
  assert.equal(h.dispatch,'NOT_EXECUTED');
});

test('canonical orchestrator outranks generic descriptions for routing intent in real skill source',()=>{
  const map=compileDerivedExpertMap({rootDir:realRoot});
  const routed=routeDerivedSkillExperts({
    map,task:'governed skill routing and verification',topK:3
  });
  const ids=routed.selected.map(e=>e.id);
  assert.ok(ids.includes('leeway-skill-orchestrator'),
    'original Skill Orchestrator should be selected before unrelated visual/design matches');
  assert.ok(ids.length<=3);
  assert.equal(routed.instructionsLoaded,false);
  assert.equal(routed.runtimeDispatch,'NOT_EXECUTED');
});
