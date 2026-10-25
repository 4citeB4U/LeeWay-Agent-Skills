/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.AUTHORITY.TEST
TAG: LEEWAY.SKILLS.INVOCATION_EVIDENCE_TEST
5WH: WHAT = Verify replay resistance and independent POST contract; WHY = prevent falsely admitted work;
WHO = Leeway Industries, Leonard Jerome Lee; WHERE = tests/invocation-evidence.test.mjs;
WHEN = 2026-10-25; HOW = isolated filesystem and synthetic Ed25519 proofs.
AUTHORITY: TEST_ONLY. LICENSE: MIT.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {generateKeyPairSync,createHash,sign} from 'node:crypto';
import {reserveInvocationNonce,verifyInvocationPost} from '../sdk/invocation-evidence.js';
const sha=x=>createHash('sha256').update(x).digest('hex');
test('12 concurrent identical nonces admit exactly one reservation',async t=>{
 const evidenceRoot=await fs.mkdtemp(path.join(os.tmpdir(),'leeway-invoke-'));
 t.after(()=>fs.rm(evidenceRoot,{recursive:true,force:true}));
 const args={evidenceRoot,requestId:'request-001',nonce:'a'.repeat(64)};
 const results=await Promise.all(Array.from({length:12},()=>reserveInvocationNonce(args)));
 assert.equal(results.filter(x=>x.reserved).length,1);
 assert.equal(results.filter(x=>x.reason==='SKILLS_INVOKE_REPLAYED').length,11);
});
test('POST refuses unqualified roots and changed result digests',()=>{
 const {publicKey,privateKey}=generateKeyPairSync('ed25519');
 const keySha256=sha(publicKey.export({type:'spki',format:'der'}));
 const request={requestId:'request-001',planSha256:'a'.repeat(64),nonce:'b'.repeat(64)};
 const execution={requestId:request.requestId,resultSha256:'c'.repeat(64)};
 const now=Date.now();
 const body={schema:'leeway.skills.veritas-post.v1',result:'PASS',requestId:request.requestId,
 planSha256:request.planSha256,nonce:request.nonce,resultSha256:execution.resultSha256,
 issuedAt:now-1000,expiresAt:now+30000,custodianKeySha256:keySha256};
 const decision={...body,signatureBase64:sign(null,Buffer.from(JSON.stringify(body)),privateKey).toString('base64')};
 const roots=[{keySha256,publicKeyPem:publicKey.export({type:'spki',format:'pem'}).toString(),scope:'skills.invoke.post',productionQualified:true}];
 assert.equal(verifyInvocationPost({request,execution,decision,now}).reason,'SKILLS_POST_INDEPENDENT_CUSTODIAN_UNENROLLED');
 assert.equal(verifyInvocationPost({request,execution:{...execution,resultSha256:'d'.repeat(64)},decision,qualifiedCustodians:roots,now}).reason,'SKILLS_POST_SUBJECT_INVALID');
 const verified=verifyInvocationPost({request,execution,decision,qualifiedCustodians:roots,now});
 assert.equal(verified.postSignatureVerified,true);
 assert.equal(verified.accepted,false);
 assert.equal(verified.receiptId,null);
});
