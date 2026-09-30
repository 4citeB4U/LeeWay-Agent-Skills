import fs from "node:fs";
import assert from "node:assert/strict";

const index=JSON.parse(fs.readFileSync("docs/pocket-skills-index.json","utf8"));
assert.equal(index.authority,"4citeB4U/LeeWay-Agent-Skills");
assert.match(index.skillsSourceCommit,/^[0-9a-f]{40}$/);
assert.equal(index.count,index.skills.length);
assert.ok(index.count>0);
const paths=new Set();
for(const skill of index.skills){
  assert.match(skill.path,/^skills\/.+\/SKILL\.md$/);
  assert.ok(fs.existsSync(skill.path),"Missing canonical skill path: "+skill.path);
  assert.ok(!paths.has(skill.path),"Duplicate skill path: "+skill.path);
  paths.add(skill.path);
}
for(const required of [
  "leeway-continuity-authority",
  "leeway-context-engineering",
  "leeway-formula-governance"
]){
  assert.ok(index.skills.some(s=>s.slug===required),"Missing required Pocket governance skill: "+required);
}
console.log("PASS Pocket skill index count="+index.count+" source="+index.skillsSourceCommit);
