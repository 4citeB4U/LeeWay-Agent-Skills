#!/usr/bin/env node
/* LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.VERIFY
TAG: LEEWAY.SKILLS.VERIFY.OPEN_SOURCE_LINEAGE
WHAT = Verify the LeeWay open-source gratitude and provenance registry
WHY = Preserve real upstream identity, evidence, and license truth without decorative or invented attribution
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/verify-open-source-lineage.mjs
WHEN = 2026
HOW = Validate unique repositories, LeeWay evidence paths, license-state discipline, minimum coverage, and public dedication linkage
LICENSE: MIT */
import fs from "node:fs";

const registryPath="config/open-source-lineage-v1.json";
const pagePath="docs/thank-you.html";
const indexPath="docs/index.html";

for(const p of [registryPath,pagePath,indexPath]){
  if(!fs.existsSync(p)) throw new Error("Missing open-source attribution artifact: "+p);
}

const registry=JSON.parse(fs.readFileSync(registryPath,"utf8"));
const page=fs.readFileSync(pagePath,"utf8");
const index=fs.readFileSync(indexPath,"utf8");

if(registry.registryId!=="LEEWAY_OPEN_SOURCE_LINEAGE_V1") throw new Error("Lineage registry identity drift");
if(!Array.isArray(registry.sources)) throw new Error("Lineage sources must be an array");
if(registry.sources.length<30) throw new Error("Dedication must preserve at least 30 evidenced upstream repositories");

const seen=new Set();
let verified=0,pending=0;
for(const source of registry.sources){
  if(!source.project||!source.repo||!source.relationship||!source.usedFor) throw new Error("Incomplete upstream record: "+JSON.stringify(source));
  if(!/^[^/\s]+\/[^/\s]+$/.test(source.repo)) throw new Error("Invalid GitHub repo identity: "+source.repo);
  const key=source.repo.toLowerCase();
  if(seen.has(key)) throw new Error("Duplicate upstream repository: "+source.repo);
  seen.add(key);
  if(!Array.isArray(source.leewayEvidence)||source.leewayEvidence.length<1) throw new Error("Missing LeeWay usage/reference evidence: "+source.repo);
  if(String(source.licenseState).startsWith("VERIFIED")){
    verified++;
    if(!source.licenseEvidence) throw new Error("Verified license missing upstream artifact evidence: "+source.repo);
    if(source.license==="UPSTREAM_REVIEW_REQUIRED") throw new Error("Verified source cannot remain license-pending: "+source.repo);
  }else if(source.licenseState==="PENDING"){
    pending++;
    if(source.license!=="UPSTREAM_REVIEW_REQUIRED") throw new Error("Pending license must not guess a license: "+source.repo);
  }else{
    throw new Error("Unsupported license evidence state for "+source.repo+": "+source.licenseState);
  }
}

if(registry.counts?.total!==registry.sources.length) throw new Error("Registry total count drift");
if(registry.counts?.verifiedLicense!==verified) throw new Error("Verified license count drift");
if(registry.counts?.pendingLicenseReview!==pending) throw new Error("Pending license count drift");

const godsEye=registry.sources.find(x=>x.repo==="bilawalsidhu/gods-eye-view");
if(!godsEye) throw new Error("God's Eye View foundational lineage missing");
if(godsEye.relationship!=="DIRECT_LINEAGE"||godsEye.tributeTier!=="FOUNDATIONAL"||godsEye.license!=="MIT"||godsEye.licenseState!=="VERIFIED"){
  throw new Error("God's Eye View foundational lineage evidence drift");
}

for(const token of [
  "To the builders who left the door open.",
  "God's Eye View · Bilawal Sidhu",
  "config/open-source-lineage-v1.json",
  "Attribution and license boundary."
]){
  if(!page.includes(token)) throw new Error("Dedication page missing required token: "+token);
}
if(!index.includes("./thank-you.html")) throw new Error("Agent Skills hub does not link the Thank You page");

console.log(JSON.stringify({
  state:"PASS_OPEN_SOURCE_LINEAGE",
  registryId:registry.registryId,
  upstreamRepositories:registry.sources.length,
  verifiedLicenseRecords:verified,
  pendingLicenseReviews:pending,
  foundationalLineage:godsEye.repo,
  publicPage:pagePath
},null,2));
