#!/usr/bin/env node
/* LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.AUDIT
TAG: LEEWAY.SKILLS.AUDIT.TOOL_CLASSIFIER
WHAT = Deterministically classify broad tool/script artifacts before semantic ownership mapping
WHY = Prevent generated/tests/external resources from being miscounted as direct executors
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/classify-tool-artifacts.mjs
WHEN = 2026
HOW = Recursive path/extension classification into bounded evidence buckets
LICENSE: MIT */
import fs from "node:fs/promises";import path from "node:path";import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const walk=async d=>{let o=[];for(const e of await fs.readdir(d,{withFileTypes:true})){if([".git","node_modules"].includes(e.name))continue;const p=path.join(d,e.name);if(e.isDirectory())o.push(...await walk(p));else o.push(p);}return o;};
const rel=p=>path.relative(root,p).split(path.sep).join("/");const files=(await walk(root)).map(rel).sort();
const candidates=files.filter(p=>/(^|\/)(tools?|scripts?|bin)\//i.test(p)||/\.(ps1|sh|mjs|js|ts)$/.test(p));
const buckets={GENERATED:[],TEST:[],EXTERNAL_TOOL:[],AUDIT_MAINTENANCE:[],CANDIDATE_EXECUTOR_ADAPTER:[]};
for(const p of candidates){const q=p.toLowerCase();if(q.includes("/dist/")||q.endsWith(".d.ts"))buckets.GENERATED.push(p);else if(/(\.test\.|\/tests?\/|test-)/.test(q))buckets.TEST.push(p);else if(q.startsWith("tools/external/"))buckets.EXTERNAL_TOOL.push(p);else if(q.startsWith("scripts/")||q.includes("audit")||q.includes("verify")||q.includes("sync")||q.includes("normalize")||q.includes("publish"))buckets.AUDIT_MAINTENANCE.push(p);else buckets.CANDIDATE_EXECUTOR_ADAPTER.push(p);}
console.log(JSON.stringify({schemaVersion:"1.0.0",evidenceState:"PATH_CLASSIFICATION_NOT_RUNTIME_PROOF",counts:Object.fromEntries(Object.entries(buckets).map(([k,v])=>[k,v.length])),buckets},null,2));