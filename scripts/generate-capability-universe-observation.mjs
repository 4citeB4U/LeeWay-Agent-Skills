#!/usr/bin/env node
/* LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.AUDIT
TAG: LEEWAY.SKILLS.AUDIT.CAPABILITY_UNIVERSE
WHAT = Generate current repository capability-universe observation
WHY = Prevent stale skill/tool counts and shallow hierarchy mistakes
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/generate-capability-universe-observation.mjs
WHEN = 2026
HOW = Recursively classify SKILL.md and tool-like artifacts without claiming runtime execution
LICENSE: MIT */
import fs from "node:fs/promises";import path from "node:path";import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const walk=async d=>{let o=[];for(const e of await fs.readdir(d,{withFileTypes:true})){if([".git","node_modules"].includes(e.name))continue;const p=path.join(d,e.name);if(e.isDirectory())o.push(...await walk(p));else o.push(p);}return o;};
const rel=p=>path.relative(root,p).split(path.sep).join("/");const files=(await walk(root)).map(rel);
const skills=files.filter(p=>/^skills\/.+\/SKILL\.md$/.test(p));const core=skills.filter(p=>p.split("/").length===3);const external=skills.filter(p=>p.startsWith("skills/external/"));const nested=skills.filter(p=>p.split("/").length>3);
const toolLike=files.filter(p=>/(^|\/)(tools?|scripts?|bin)\//i.test(p)||/\.(ps1|sh|mjs|js|ts)$/.test(p));
console.log(JSON.stringify({schemaVersion:"1.0.0",observedAt:new Date().toISOString(),evidenceState:"PRESENT_ARTIFACTS_NOT_RUNTIME_PROOF",counts:{trackedFiles:files.length,skillArtifacts:skills.length,topLevelSkills:core.length,nestedSkills:nested.length,externalSkills:external.length,toolLikeArtifacts:toolLike.length},skills:skills.sort()},null,2));