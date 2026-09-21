#!/usr/bin/env node
/* LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.VERIFY
TAG: LEEWAY.SKILLS.VERIFY.COMPANY_FABRIC_SEAL
WHAT = Verify sealed company-fabric source artifacts and invariants
WHY = Make the source lock repeatably inspectable without self-referential seal hashing
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/verify-company-fabric-seal.mjs
WHEN = 2026
HOW = Check manifest paths exist and root architecture contains required laws/authorities; Git blob identity remains repository-side evidence
LICENSE: MIT */
import fs from "node:fs";
const seal=JSON.parse(fs.readFileSync("config/leeway-agent-skills-company-fabric-seal.json","utf8"));
const missing=seal.artifacts.filter(a=>!fs.existsSync(a.path)).map(a=>a.path);
if(missing.length) throw new Error("Missing sealed artifacts: "+missing.join(", "));
const agents=fs.readFileSync("AGENTS.md","utf8");
for(const token of ["FOCAL != SILOED","leeway-parallel-workplane","leeway-mathematical-sun","leeway-shiproom","leeway-veritas","leeway-receipt-authority","leeway-learning-ledger","leeway-agent-skills-company-fabric-seal.json"]) if(!agents.includes(token)) throw new Error("Root authority missing "+token);
const sun=JSON.parse(fs.readFileSync("config/mathematical-sun-v1.json","utf8"));
if(sun.bitCount!==11||sun.omegaMax!==2047) throw new Error("Mathematical Sun v1 invariant mismatch");
console.log(JSON.stringify({state:"PASS_SOURCE_SEAL",sealId:seal.sealId,artifacts:seal.artifacts.length,missing:0,sunBits:sun.bitCount,omegaMax:sun.omegaMax},null,2));