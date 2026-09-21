#!/usr/bin/env node
/* LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.AUDIT
TAG: LEEWAY.SKILLS.AUDIT.RELATIONSHIP_GRAPH
WHAT = Deterministic whole-repository skill/tool relationship and drift auditor
WHY = Prove what skills/tools exist, what is orphaned, and where registries disagree
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/audit-skill-tool-graph.mjs
WHEN = 2026
HOW = Walk canonical skills/tool-like artifacts, compare registry paths, extract LeeWay references, emit JSON evidence
LICENSE: MIT */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const walk=async dir=>{const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){if([".git","node_modules"].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(p);}return out;};
const rel=p=>path.relative(root,p).split(path.sep).join("/");
const files=(await walk(root)).map(rel).sort();
const canonical=files.filter(p=>/^skills\/[^/]+\/SKILL\.md$/.test(p));
const toolLike=files.filter(p=>/(^|\/)(tools?|scripts?|bin)\//i.test(p)||/\.(ps1|sh|mjs|js|ts)$/.test(p));
const skills=[];
for(const p of canonical){const txt=await fs.readFile(path.join(root,p),"utf8");const name=(txt.match(/^name:\s*(.+)$/m)||[])[1]?.trim()||p.split("/")[1];const refs=[...new Set([...txt.matchAll(/`(leeway-[a-z0-9-]+)`/gi)].map(m=>m[1]))].sort();skills.push({name,path:p,refs});}
let registry={skills:[]};try{registry=JSON.parse(await fs.readFile(path.join(root,"scripts/skills-registry.json"),"utf8"));}catch{}
const fileSet=new Set(files);
const registryRows=(registry.skills||[]).map(s=>({name:s.name,path:s.path,artifactPresent:fileSet.has(s.path)||fileSet.has(s.path+"/SKILL.md")}));
const registryDrift=registryRows.filter(x=>!x.artifactPresent);
const referenced=new Set(skills.flatMap(s=>s.refs));const skillNames=new Set(skills.map(s=>s.name));
const unresolvedSkillRefs=[...referenced].filter(x=>!skillNames.has(x)).sort();
const report={schemaVersion:"1.0.0",generatedAt:new Date().toISOString(),counts:{files:files.length,canonicalSkills:skills.length,toolLike:toolLike.length,registryDeclared:(registry.skills||[]).length,registryDrift:registryDrift.length,unresolvedSkillRefs:unresolvedSkillRefs.length},canonicalSkills:skills,registryDrift,unresolvedSkillRefs,toolLike};
console.log(JSON.stringify(report,null,2));