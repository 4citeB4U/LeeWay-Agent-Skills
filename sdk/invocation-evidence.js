/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.AUTHORITY
TAG: LEEWAY.SKILLS.INVOCATION_EVIDENCE_CANDIDATE
5WH: WHAT = Durable nonce reservation and independently signed POST verification.
WHY = Fail closed on replay, missing signer, mismatched output and missing ledger admission.
WHO = Leeway Industries; Leonard Jerome Lee.
WHERE = sdk/invocation-evidence.js; WHEN = 2026-10-25.
HOW = Exclusive nonce file and pinned Ed25519 POST proof of exact request/result.
AUTHORITY: CANDIDATE ONLY; never claims production receipts. LICENSE: MIT.
*/
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash,createPublicKey,verify} from 'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex');
const hex=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const id=x=>typeof x==='string'&&/^[A-Za-z0-9._-]{8,128}$/.test(x);
const block=reason=>Object.freeze({accepted:false,receiptId:null,learningLedgerId:null,reason});
export async function reserveInvocationNonce({evidenceRoot,requestId,nonce}={}){
 if(typeof evidenceRoot!=='string'||!path.isAbsolute(evidenceRoot)||!id(requestId)||!hex(nonce))
  return block('INVALID_NONCE_SUBJECT');
 const directory=path.join(evidenceRoot,'consumed-skills-nonces');
 try{
  await fs.mkdir(directory,{recursive:true});
  const f=path.join(directory,sha(nonce)+'.json');
  const handle=await fs.open(f,'wx',0o600);
  try{await handle.writeFile(JSON.stringify({requestId,nonceSha256:sha(nonce)}));await handle.sync();}
  finally{await handle.close();}
  return Object.freeze({reserved:true,nonceSha256:sha(nonce)});
 }catch(e){return block(e?.code==='EEXIST'?'SKILLS_INVOKE_REPLAYED':'NONCE_STORE_UNAVAILABLE');}
}
export function verifyInvocationPost({request,execution,decision,qualifiedCustodians=[],now=Date.now()}={}){
 if(!request||!id(request.requestId)||!hex(request.planSha256)||!hex(request.nonce)||
 !execution||execution.requestId!==request.requestId||!hex(execution.resultSha256)||
 !decision||decision.schema!=='leeway.skills.veritas-post.v1'||decision.result!=='PASS'||
 decision.requestId!==request.requestId||decision.planSha256!==request.planSha256||
 decision.nonce!==request.nonce||decision.resultSha256!==execution.resultSha256||
 !Number.isSafeInteger(decision.issuedAt)||!Number.isSafeInteger(decision.expiresAt)||
 decision.issuedAt>now||decision.expiresAt<now||decision.expiresAt-decision.issuedAt>60000||
 !hex(decision.custodianKeySha256))return block('SKILLS_POST_SUBJECT_INVALID');
 const roots=qualifiedCustodians.filter(x=>x&&x.productionQualified===true&&x.scope==='skills.invoke.post'&&
 x.keySha256===decision.custodianKeySha256&&typeof x.publicKeyPem==='string');
 if(roots.length!==1)return block('SKILLS_POST_INDEPENDENT_CUSTODIAN_UNENROLLED');
 try{
  const key=createPublicKey(roots[0].publicKeyPem);
  if(key.asymmetricKeyType!=='ed25519'||sha(key.export({type:'spki',format:'der'}))!==roots[0].keySha256)
   return block('SKILLS_POST_CUSTODIAN_PIN_INVALID');
  const {signatureBase64,...body}=decision;
  const sig=Buffer.from(signatureBase64,'base64');
  if(sig.length!==64||!verify(null,Buffer.from(JSON.stringify(body)),key,sig))
   return block('SKILLS_POST_SIGNATURE_INVALID');
 }catch{return block('SKILLS_POST_SIGNATURE_INVALID');}
 return Object.freeze({postSignatureVerified:true,accepted:false,receiptId:null,learningLedgerId:null,
 reason:'CANONICAL_RECEIPT_AND_LEARNING_LEDGER_NOT_ADMITTED'});
}
