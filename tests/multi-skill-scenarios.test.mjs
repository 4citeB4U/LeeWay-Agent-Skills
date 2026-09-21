import fs from "node:fs";import assert from "node:assert/strict";
const s=JSON.parse(fs.readFileSync("config/multi-skill-scenarios.json","utf8"));
const skillFiles=[];const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=d+"/"+e.name;if(e.isDirectory())walk(p);else if(e.name==="SKILL.md")skillFiles.push(p);}};walk("skills");
const names=new Map();for(const p of skillFiles){const t=fs.readFileSync(p,"utf8");const m=t.match(/^name:\s*(.+)$/m);if(m)names.set(m[1].trim(),p);}
for(const x of s.scenarios){assert.ok(x.requiredSkills.length>=5,x.id+" is siloed");for(const name of x.requiredSkills)assert.ok(names.has(name),x.id+" missing "+name);assert.ok(names.has(x.verifier),x.id+" verifier missing");assert.ok(names.has(x.recovery),x.id+" recovery missing");assert.ok(x.lanes.length>=2,x.id+" lacks parallel lanes");}
console.log(JSON.stringify({state:"PASS_MULTI_SKILL_SCENARIOS",scenarios:s.scenarios.length,skillsIndexed:names.size},null,2));