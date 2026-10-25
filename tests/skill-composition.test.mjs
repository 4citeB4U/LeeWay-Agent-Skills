/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.CAPABILITY.COMPOSITION.TEST
TAG: LEEWAY.SKILLS.CANONICAL_COMPOSITION_TEST
5WH:
WHAT = Verify two-skill candidate hash and fail-closed execution boundary.
WHY = Discover and compose without forging dispatch evidence.
WHO = Leeway Industries; Leonard Jerome Lee
WHERE = tests/skill-composition.test.mjs
WHEN = 2026-10-25
HOW = Isolated fixture with Node native tests.
LICENSE: MIT
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {composeSkillCandidate} from '../sdk/skill-composition.js';
test('two skills form stable candidate, not execution',async t=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'leeway-composition-'));t.after(()=>fs.rm(root,{force:true,recursive:true}));
 for(const id of ['leeway-rea-reverse-engineering','leeway-skill-orchestrator']){
  await fs.mkdir(path.join(root,id));
  await fs.writeFile(path.join(root,id,'SKILL.md'),'# '+id);
 }
 const args={skillsRoot:root,requestId:'composition-01',skillIds:['leeway-rea-reverse-engineering','leeway-skill-orchestrator']};
 const a=await composeSkillCandidate(args),b=await composeSkillCandidate(args);
 assert.equal(a.planSha256,b.planSha256);
 assert.equal(a.nodes.length,2);
 assert.equal(a.executionAuthorized,false);
 assert.equal(a.workflowExecuted,false);
 assert.equal(a.receiptId,null);
 await fs.writeFile(path.join(root,'leeway-skill-orchestrator','SKILL.md'),'# changed');
 const c=await composeSkillCandidate(args);
 assert.notEqual(a.planSha256,c.planSha256);
});
test('rejects path traversal and duplicate skill IDs',async()=>{
 await assert.rejects(composeSkillCandidate({skillsRoot:'/tmp',requestId:'composition-02',skillIds:['../x','abc']}),/ARGUMENTS_INVALID/);
 await assert.rejects(composeSkillCandidate({skillsRoot:'/tmp',requestId:'composition-02',skillIds:['abc','abc']}),/ARGUMENTS_INVALID/);
});
