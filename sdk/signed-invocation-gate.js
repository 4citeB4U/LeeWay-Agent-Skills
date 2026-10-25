/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.AUTHORITY
TAG: LEEWAY.SKILLS.SIGNED_INVOCATION_GATE_CANDIDATE
5WH: WHAT = Independently pin and verify a signed skill invocation PRE decision.
WHY = Do not confuse MCP tool discovery, caller authorization flags or skill prompts with production approval.
WHO = Leeway Industries; Leonard Jerome Lee.
WHERE = sdk/signed-invocation-gate.js; WHEN = 2026-10-25.
HOW = Exact request tuple + Ed25519 signature + qualified custodian pin + bounded expiry.
AUTHORITY: VERIFIER CANDIDATE; no bundled production trust roots or execution dispatch.
LICENSE: MIT
*/
import {createHash,createPublicKey,verify} from 'node:crypto';
const hex=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const id=x=>typeof x==='string'&&/^[A-Za-z0-9._-]{8,128}$/.test(x);
const deny=reason=>Object.freeze({admitted:false,executed:false,receiptId:null,reason});
const digest=b=>createHash('sha256').update(b).digest('hex');
export function verifySkillInvocationPre({request,decision,qualifiedCustodians=[],now=Date.now()}={}){
 if(!request||!id(request.requestId)||!id(request.developerId)||!id(request.deviceId)||
    !hex(request.planSha256)||!hex(request.nonce)||!Array.isArray(request.skillIds)||
    request.skillIds.length<1||request.skillIds.length>8||request.skillIds.some(x=>typeof x!=='string'||!/^[a-z0-9-]{2,100}$/.test(x)))
    return deny('SKILLS_INVOKE_SUBJECT_INVALID');
 if(!decision||decision.schema!=='leeway.skills.veritas-pre.v1'||decision.result!=='ALLOW'||
    !id(decision.requestId)||decision.requestId!==request.requestId||
    decision.developerId!==request.developerId||decision.deviceId!==request.deviceId||
    decision.planSha256!==request.planSha256||decision.nonce!==request.nonce||
    !Number.isSafeInteger(decision.issuedAt)||!Number.isSafeInteger(decision.expiresAt)||
    decision.issuedAt>now||decision.expiresAt<now||
    decision.expiresAt-decision.issuedAt>60000||
    typeof decision.custodianKeySha256!=='string'||!hex(decision.custodianKeySha256))
    return deny('SKILLS_INVOKE_PRE_INVALID');
 const keys=qualifiedCustodians.filter(x=>x&&x.productionQualified===true&&x.scope==='skills.invoke'&&
   x.keySha256===decision.custodianKeySha256&&typeof x.publicKeyPem==='string');
 if(keys.length!==1)return deny('SKILLS_INVOKE_INDEPENDENT_CUSTODIAN_UNENROLLED');
 if(typeof decision.signatureBase64!=='string'||! /^[A-Za-z0-9+/]+={0,2}$/.test(decision.signatureBase64))
   return deny('SKILLS_INVOKE_SIGNATURE_INVALID');
 try{
   const key=createPublicKey(keys[0].publicKeyPem);
   if(key.asymmetricKeyType!=='ed25519'||digest(key.export({type:'spki',format:'der'}))!==keys[0].keySha256)
    return deny('SKILLS_INVOKE_CUSTODIAN_PIN_INVALID');
   const {signatureBase64,...body}=decision;
   const signature=Buffer.from(signatureBase64,'base64');
   if(signature.length!==64||!verify(null,Buffer.from(JSON.stringify(body)),key,signature))
    return deny('SKILLS_INVOKE_SIGNATURE_INVALID');
 }catch{return deny('SKILLS_INVOKE_SIGNATURE_INVALID');}
 // Verification alone is not execution admission: nonce reservation and independent POST remain mandatory.
 return Object.freeze({admitted:false,preSignatureVerified:true,executed:false,receiptId:null,
  reason:'SKILLS_INVOKE_REPLAY_POST_AND_RECEIPT_NOT_QUALIFIED'});
}
