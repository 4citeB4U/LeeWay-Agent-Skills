/*
LEEWAY HEADER - DO NOT REMOVE
REGION: CORE
TAG: CORE.TESTS.CONTRIBUTOR_HANDOFF
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
WHAT: Check canonical contributor coordination and startup handoff references.
WHY: Prevent cross-instance rediscovery and silent mission drift.
WHO: LeeWay Agent Skills. WHERE: tests/contributor-handoff.test.mjs.
WHEN: 2026-10-08. HOW: Deterministic source contract assertions.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const root=read('../AGENTS.md');
const continuity=read('../skills/leeway-continuity-authority/SKILL.md');
const protocol=read('../docs/CONTRIBUTOR-HANDOFF-PROTOCOL.md');
test('every contributor sees a canonical coordination hub at bootstrap',()=>{
 assert.match(root,/Contributor Handoff Protocol/);
 assert.match(root,/issues\/22/);
 assert.match(continuity,/issues\/22/);
 assert.match(continuity,/CONTRIBUTOR-HANDOFF-PROTOCOL\.md/);
});
test('handoff includes source, prior owner, acceptance and real evidence',()=>{
 for(const field of ['PARENT OBJECTIVE / ACCEPTANCE CASE','SOURCE:','CLAIM / FILES:','EXECUTED:','TESTED:','VERITAS / RECEIPTS:','REUSABLE FINDINGS:','NEXT ACTION:']) assert.ok(protocol.includes(field),field);
 assert.match(protocol,/overlapping changed files/);
 assert.match(protocol,/before editing/);
 assert.match(protocol,/CONTRIBUTOR/);
});
test('hub remains index and C3 remains original mission',()=>{
 assert.match(protocol,/Agent-Skills\/issues\/22/);
 assert.match(protocol,/Leeway-Runtime-Fabric\/issues\/21/);
 assert.match(protocol,/not a new cognitive authority/);
 assert.match(protocol,/R01–R25/);
});
