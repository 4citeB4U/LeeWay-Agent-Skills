/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.DERIVED_EXPERT_ROUTING_CLI
TAG: LEEWAY.AGENT_SKILLS.DERIVED_EXPERT_ROUTING_CLI.V1
5WH:
WHAT = Inspect or optionally export a disposable routing projection from canonical skill source.
WHY = Validate compact skill metadata without creating an alternate authority registry.
WHO = LeeWay Agent Skills source owner; GPT-6 external support.
WHERE = scripts/compile-derived-skill-experts.mjs.
WHEN = 2026-11-22.
HOW = Read-only compile and sample route, with optional explicitly requested local derived artifact.
LICENSE = Existing repository terms unchanged.
*/
import {execFileSync} from 'node:child_process';
import {writeFileSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {compileDerivedExpertMap, routeDerivedSkillExperts, planSkillExpertHydration} from '../sdk/derived-skill-expert-routing.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function main(argv=process.argv.slice(2)) {
  let output=null,query=null,topK=3;
  for(let i=0;i<argv.length;i++){
    const opt=argv[i];
    if(opt==='--output') output=argv[++i];
    else if(opt==='--query') query=argv[++i];
    else if(opt==='--top-k') topK=Number(argv[++i]);
    else throw Error('UNKNOWN_EXPERT_ROUTING_OPTION:' + opt);
  }
  let sourceCommit='UNPINNED_SOURCE';
  try{sourceCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8',timeout:3000}).trim();}catch{}
  const map=compileDerivedExpertMap({rootDir:root,sourceCommit});
  const route=query?routeDerivedSkillExperts({map,task:query,topK}):null;
  const plan=route?planSkillExpertHydration({map,route}):null;
  if(output){
    if(typeof output !== 'string' || !output.trim())throw Error('EXPERT_OUTPUT_PATH_REQUIRED');
    const target=path.resolve(root,output);
    if(!target.startsWith(root+path.sep) || !target.endsWith('.json'))throw Error('EXPERT_OUTPUT_MUST_BE_RELATIVE_LOCAL_JSON');
    mkdirSync(path.dirname(target),{recursive:true});
    writeFileSync(target,JSON.stringify(map,null,2)+'\n',{flag:'wx'});
  }
  const summary={
    status:'COMPILED_DERIVED_SOURCE_ONLY',
    canonicalOwner:map.owner,
    sourceCommit:map.sourceCommit,
    expertCount:map.expertCount,
    fingerprintSha256:map.fingerprintSha256,
    outputWritten:output??'NONE',
    candidateRoute:route,
    hydrationPlan:plan,
    runtimeDispatch:'NOT_EXECUTED'
  };
  process.stdout.write(JSON.stringify(summary,null,2)+'\n');
  return summary;
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  try{main()}catch(e){console.error('SKILL_EXPERT_MAP_BLOCKED:'+e.message);process.exitCode=1;}
}
