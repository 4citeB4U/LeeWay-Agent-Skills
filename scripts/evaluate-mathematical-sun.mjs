#!/usr/bin/env node
/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.METRICS
TAG: LEEWAY.SKILLS.METRICS.MATHEMATICAL_SUN
WHAT = Deterministic evaluator for the versioned 11-ray Mathematical Sun profile
WHY = Compute radial gates without inventing measurements, weights, thresholds, or Formula outputs
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/evaluate-mathematical-sun.mjs
WHEN = 2026
HOW = Validate 11 evidence-bound rays, SPD matrices, quadratic radii, binary register, Omega and Phi
LICENSE: MIT
*/
import fs from "node:fs";

const inputPath=process.argv[2];
if(!inputPath) throw new Error("Usage: node scripts/evaluate-mathematical-sun.mjs <input.json>");
const input=JSON.parse(fs.readFileSync(inputPath,"utf8"));
if(!Array.isArray(input.rays)||input.rays.length!==11) throw new Error("Exactly 11 rays are required for v1");

function choleskySPD(A){
 const n=A.length,L=Array.from({length:n},()=>Array(n).fill(0));
 if(!A.every(r=>Array.isArray(r)&&r.length===n)) throw new Error("W must be square");
 for(let i=0;i<n;i++) for(let j=0;j<=i;j++){
  if(Math.abs(A[i][j]-A[j][i])>1e-10) throw new Error("W must be symmetric");
  let sum=A[i][j]; for(let k=0;k<j;k++) sum-=L[i][k]*L[j][k];
  if(i===j){if(!(sum>0)) throw new Error("W must be positive definite");L[i][j]=Math.sqrt(sum);}
  else L[i][j]=sum/L[j][j];
 }
 return L;
}
function quadratic(x,W){
 choleskySPD(W);
 let q=0; for(let i=0;i<x.length;i++) for(let j=0;j<x.length;j++) q+=x[i]*W[i][j]*x[j];
 return q;
}
const results=input.rays.map((ray,index)=>{
 if(ray.i!==index+1) throw new Error(`Ray order mismatch at ${index+1}`);
 if(!Array.isArray(ray.x)||!ray.x.every(Number.isFinite)) throw new Error(`Ray ${ray.i} x missing/non-numeric`);
 if(!Array.isArray(ray.W)||ray.W.length!==ray.x.length) throw new Error(`Ray ${ray.i} W dimension mismatch`);
 if(!Number.isFinite(ray.theta)||ray.theta<0) throw new Error(`Ray ${ray.i} theta invalid`);
 const q=quadratic(ray.x,ray.W);
 const r=Math.sqrt(Math.max(0,q));
 const b=r<=ray.theta?1:0;
 return {i:ray.i,id:ray.id,r,theta:ray.theta,b,evidence:ray.evidence??null};
});
const bits=results.map(r=>r.b);
const omega=bits.reduce((acc,b,i)=>acc+b*(2**(10-i)),0);
const phi=bits.reduce((a,b)=>a*b,1);
console.log(JSON.stringify({profile:"mathematical-sun-v1-11-ray",bits:bits.join(""),omega,omegaMax:2047,phi,shipProfilePass:phi===1,rays:results},null,2));
