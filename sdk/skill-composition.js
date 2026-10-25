/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.CAPABILITY.COMPOSITION
TAG: LEEWAY.SKILLS.CANONICAL_COMPOSITION_CANDIDATE
5WH:
WHAT = Deterministic, system-agnostic composition of approved skill identities into one candidate execution plan.
WHY = Make multi-skill capability routing consistent across SDK, CLI and MCP without inventing execution.
WHO = Leeway Industries; Leonard Jerome Lee
WHERE = sdk/skill-composition.js
WHEN = 2026-10-25
HOW = Hash exact skill documents, validate distinct canonical IDs, emit bounded non-executable proposal.
AUTHORITY: PLAN_ONLY. Formula/Veritas PRE/POST, dispatch and receipts MUST be separate trusted services.
LICENSE: MIT
*/
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex');
const valid=id=>typeof id==='string'&&/^[a-z0-9][a-z0-9-]{1,99}$/.test(id);
export async function composeSkillCandidate({skillsRoot,skillIds,requestId}={}){
 if(typeof skillsRoot!=='string'||!path.isAbsolute(skillsRoot)||
 !Array.isArray(skillIds)||skillIds.length<2||skillIds.length>8||
 !skillIds.every(valid)||new Set(skillIds).size!==skillIds.length||
 typeof requestId!=='string'||! /^[A-Za-z0-9._-]{8,128}$/.test(requestId))
 throw Error('SKILL_COMPOSITION_ARGUMENTS_INVALID');
 const root=await fs.realpath(skillsRoot);
 const nodes=[];
 for(const id of skillIds){
   const dir=path.join(root,id);
   const realDir=await fs.realpath(dir);
   if(realDir!==dir||!realDir.startsWith(root+path.sep))throw Error('SKILL_DIRECTORY_UNSAFE');
   const file=path.join(realDir,'SKILL.md');
   const fileReal=await fs.realpath(file);
   if(fileReal!==file||!(await fs.lstat(file)).isFile())throw Error('SKILL_FILE_UNSAFE');
   const data=await fs.readFile(file);
   if(data.length>256*1024)throw Error('SKILL_SIZE_EXCEEDED');
   nodes.push(Object.freeze({id,sha256:hash(data),bytes:data.length,capabilityState:'REFERENCE_DISCOVERED'}));
 }
 const digest=hash(Buffer.from(JSON.stringify({requestId,nodes})));
 return Object.freeze({schema:'leeway.skills.composition.candidate.v1',requestId,
    skillIds:Object.freeze([...skillIds]),nodes:Object.freeze(nodes),planSha256:digest,
    state:'COMPOSITION_CANDIDATE',executionAuthorized:false,workflowExecuted:false,
    veritasPreVerified:false,veritasPostVerified:false,receiptId:null,learningLedgerId:null,
    nextGate:'AUTHENTICATED_FORMULA_VERITAS_DISPATCH'});
}
