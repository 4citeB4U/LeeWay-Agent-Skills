/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.SDK.TYPES
TAG: LEEWAY.SKILLS.COMPOSITION_TYPES
5WH: WHAT = Typed canonical composition plan; WHY = TypeScript MCP and SDK share one contract;
WHO = Leeway Industries, Leonard Jerome Lee; WHERE = sdk/skill-composition.d.ts;
WHEN = 2026-10-25; HOW = exact non-executing candidate declaration.
AUTHORITY: CANDIDATE ONLY. LICENSE: MIT.
*/
export type SkillCompositionCandidate = {
  schema: 'leeway.skills.composition.candidate.v1';
  requestId: string;
  skillIds: readonly string[];
  nodes: readonly {id:string;sha256:string;bytes:number;capabilityState:'REFERENCE_DISCOVERED'}[];
  planSha256:string;
  state:'COMPOSITION_CANDIDATE';
  executionAuthorized:false;
  workflowExecuted:false;
  veritasPreVerified:false;
  veritasPostVerified:false;
  receiptId:null;
  learningLedgerId:null;
  nextGate:'AUTHENTICATED_FORMULA_VERITAS_DISPATCH';
};
export declare function composeSkillCandidate(args:{
 skillsRoot:string; skillIds:string[]; requestId:string
}):Promise<SkillCompositionCandidate>;
