/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.AUTHORITY.TEST
TAG: LEEWAY.SKILLS.SIGNED_INVOCATION_GATE_TEST
5WH: WHAT = Test signed PRE binding and mandatory execution denial.
WHY = Never promote mere key possession to independent production authority.
WHO = Leeway Industries; Leonard Jerome Lee.
WHERE = tests/signed-invocation-gate.test.mjs; WHEN = 2026-10-25.
HOW = Synthetic Ed25519 test keys and Node assertions. AUTHORITY: TEST_ONLY. LICENSE: MIT
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,createHash,sign} from 'node:crypto';
import {verifySkillInvocationPre} from '../sdk/signed-invocation-gate.js';
const sha=x=>createHash('sha256').update(x).digest('hex');
const {publicKey,privateKey}=generateKeyPairSync('ed25519');
const keySha256=sha(publicKey.export({type:'spki',format:'der'}));
const pub=publicKey.export({type:'spki',format:'pem'}).toString();
const request={requestId:'req-123456',developerId:'developer-123',deviceId:'device-123',planSha256:'a'.repeat(64),nonce:'b'.repeat(64),skillIds:['leeway-rea-reverse-engineering']};
const now=Date.now();
const body={schema:'leeway.skills.veritas-pre.v1',result:'ALLOW',requestId:request.requestId,
 developerId:request.developerId,deviceId:request.deviceId,planSha256:request.planSha256,nonce:request.nonce,
 issuedAt:now-1000,expiresAt:now+30000,custodianKeySha256:keySha256};
const decision={...body,signatureBase64:sign(null,Buffer.from(JSON.stringify(body)),privateKey).toString('base64')};
const roots=[{keySha256,publicKeyPem:pub,scope:'skills.invoke',productionQualified:true}];
test('unsigned caller and missing independent custodian both blocked',()=>{
 assert.equal(verifySkillInvocationPre({request,now}).admitted,false);
 assert.equal(verifySkillInvocationPre({request,decision,now}).reason,'SKILLS_INVOKE_INDEPENDENT_CUSTODIAN_UNENROLLED');
});
test('signature with wrong subject denied',()=>{
 const result=verifySkillInvocationPre({request:{...request,planSha256:'c'.repeat(64)},decision,qualifiedCustodians:roots,now});
 assert.equal(result.reason,'SKILLS_INVOKE_PRE_INVALID');
});
test('expired decision denied',()=>{
 assert.equal(verifySkillInvocationPre({request,decision,qualifiedCustodians:roots,now:now+65000}).reason,'SKILLS_INVOKE_PRE_INVALID');
});
test('valid synthetic PRE signature still refuses dispatch absent replay POST and receipt',()=>{
 const result=verifySkillInvocationPre({request,decision,qualifiedCustodians:roots,now});
 assert.equal(result.preSignatureVerified,true);
 assert.equal(result.admitted,false);
 assert.equal(result.executed,false);
 assert.equal(result.receiptId,null);
});
