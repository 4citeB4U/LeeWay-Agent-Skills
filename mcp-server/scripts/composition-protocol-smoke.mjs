/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.MCP.COMPOSITION.TEST
TAG: LEEWAY.SKILLS.MCP_COMPOSITION_PARITY
5WH: WHAT = Prove MCP composition parity with SDK; WHY = prevent divergent execution claims;
WHO = Leeway Industries, Leonard Jerome Lee; WHERE = mcp-server/scripts/composition-protocol-smoke.mjs;
WHEN = 2026-10-25; HOW = real stdio MCP client and local SDK comparator.
AUTHORITY: REFERENCE_ONLY. LICENSE: MIT.
*/
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import {composeSkillCandidate} from '../../sdk/skill-composition.js';
import path from 'node:path';
const root=path.resolve('../skills');
const requestId='composition-parity-001';
const skillIds=['leeway-skill-orchestrator','leeway-universal-capability-kernel'];
const expected=await composeSkillCandidate({skillsRoot:root,requestId,skillIds});
const client=new Client({name:'leeway-composition-parity',version:'1.0.0'});
const transport=new StdioClientTransport({command:process.execPath,args:['dist/index.js']});
try{
 await client.connect(transport);
 const tools=(await client.listTools()).tools.map(t=>t.name);
 if(!tools.includes('leeway_compose_skills'))throw Error('COMPOSE_NOT_LISTED');
 const result=await client.callTool({name:'leeway_compose_skills',arguments:{requestId,skillIds}});
 const plan=JSON.parse(result.content[0].text);
 if(result.isError||plan.planSha256!==expected.planSha256||plan.executionAuthorized!==false||plan.workflowExecuted!==false)
  throw Error('COMPOSITION_PARITY_OR_AUTHORITY_FAILURE');
 const denied=await client.callTool({name:'leeway_compose_skills',arguments:{requestId,skillIds:['../unsafe','leeway-skill-orchestrator']}});
 if(!denied.isError)throw Error('INVALID_COMPOSITION_NOT_BLOCKED');
 console.log(JSON.stringify({state:'COMPOSITION_MCP_PARITY_VERIFIED',digest:plan.planSha256,executionAuthorized:plan.executionAuthorized,invalidInputBlocked:true}));
}finally{await client.close();}
