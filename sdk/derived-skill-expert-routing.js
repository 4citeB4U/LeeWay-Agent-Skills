/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.AGENT_SKILLS.DERIVED_EXPERT_ROUTING
TAG: LEEWAY.AGENT_SKILLS.DERIVED_EXPERT_ROUTING.V1
5WH:
WHAT = Compile existing SKILL.md files into a lightweight deterministic expert-routing projection.
WHY = Help the original Skill Orchestrator select small relevant context sets for Machine Consciousness without a second skill registry.
WHO = Creator, original LeeWay-Agent-Skills authority; GPT-6 outside support contributor, not Agent Lee.
WHERE = sdk/derived-skill-expert-routing.js.
WHEN = 2026-11-22.
HOW = Hash source skills, extract bounded metadata, rank topical candidates and prepare original-Runtime hydration plans without reading privileged actions.
LICENSE = Existing repository MIT; no new ownership claimed.
*/
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, realpathSync, statSync } from 'node:fs';
import path from 'node:path';

const SKILLS_DIR = 'skills';
const stopWords = new Set(['a','an','and','any','are','as','at','be','by','can','for','from','in','into','is','it','its','leeway','of','on','or','the','this','to','use','using','with','when','your','skill','skills']);
const maxSourceFileBytes = 512000;
const safeName = v => typeof v === 'string' && /^[a-z0-9][a-z0-9-/]{0,160}$/.test(v) && !v.split('/').some(s => s === '.' || s === '..');
const safeHash = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const sha = value => createHash('sha256').update(value).digest('hex');
const tokenize = value => [...new Set(String(value ?? '').toLowerCase().normalize('NFKC').match(/[a-z0-9]+/g)?.filter(t => t.length > 1 && !stopWords.has(t)) ?? [])].slice(0,96);
const unquote = value => String(value).trim().replace(/^["']|["']$/g, '');
function asList(value) {
  if (Array.isArray(value)) return value.map(unquote).filter(Boolean).slice(0,32);
  const s = String(value ?? '').trim();
  if (!s) return [];
  return (s.startsWith('[') && s.endsWith(']') ? s.slice(1,-1) : s).split(',').map(unquote).filter(Boolean).slice(0,32);
}
function frontmatter(markdown) {
  const cleaned = markdown.replace(/^\uFEFF/, '').trimStart();
  const match = cleaned.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---(?:[ \t]*\r?\n|$)/);
  if (!match) return {};
  const metadata = {};
  let field = null;
  for (const line of match[1].split(/\r?\n/)) {
    const root = line.match(/^([A-Za-z][\w-]*):[ \t]*(.*)$/);
    if (root) {
      field = root[1].toLowerCase().replace(/-/g,'_');
      metadata[field] = unquote(root[2]);
      continue;
    }
    if (field === 'metadata') {
      const nested = line.match(/^[ ]{2}([A-Za-z][\w-]*):[ \t]*(.*)$/);
      if (nested) {
        const key = nested[1].toLowerCase().replace(/-/g,'_');
        if (!(key in metadata)) metadata[key] = unquote(nested[2]);
      }
      continue;
    }
    if (!field) continue;
    const bullet = line.match(/^[ \t]+-[ \t]+(.+)$/);
    if (bullet) {
      metadata[field] = (metadata[field] && !['>','|'].includes(metadata[field]) ? metadata[field] + ',' : '') + unquote(bullet[1]);
    } else if (/^[ \t]+\S/.test(line) && ['description','triggers','intents'].includes(field)) {
      metadata[field] = (['>','|'].includes(metadata[field]) ? '' : metadata[field]) + ' ' + line.trim();
    }
  }
  return metadata;
}
function skillPaths(repoRoot) {
  const root = path.resolve(repoRoot);
  const skillRoot = path.join(root, SKILLS_DIR);
  const found = [];
  function visit(dir, depth) {
    if (depth > 20 || found.length > 5000) throw Error('SKILL_SOURCE_DISCOVERY_BOUND_EXCEEDED');
    for (const item of readdirSync(dir, {withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name,'en'))) {
      if (item.isSymbolicLink()) continue;
      const target = path.join(dir,item.name);
      if (item.isDirectory()) {
        if (!['node_modules','dist','.git','build'].includes(item.name)) visit(target,depth+1);
      } else if (item.isFile() && item.name === 'SKILL.md') found.push(target);
    }
  }
  visit(skillRoot,0);
  return found;
}

/**
 * Derive only from the actual original repository's SKILL.md files.
 * This index is a disposable cache, never a new promoted skills registry.
 */
export function compileDerivedExpertMap({rootDir, sourceCommit='UNPINNED_SOURCE'}={}) {
  if (!rootDir || typeof rootDir !== 'string' || sourceCommit.length > 100) throw Error('SKILL_SOURCE_ROOT_REQUIRED');
  const root = realpathSync(path.resolve(rootDir));
  const experts = [];
  for (const file of skillPaths(root)) {
    const bytes = statSync(file).size;
    if (bytes <= 0 || bytes > maxSourceFileBytes) throw Error('SKILL_SOURCE_SIZE_BOUND:' + file);
    const source = readFileSync(file, 'utf8');
    const relative = path.relative(root,file).split(path.sep).join('/');
    const id = relative.replace(/^skills\//,'').replace(/\/SKILL\.md$/,'');
    if (!safeName(id)) throw Error('SKILL_SOURCE_ID_INVALID:' + relative);
    const meta = frontmatter(source);
    const name = (meta.name || id.split('/').at(-1)).slice(0,128);
    const description = (meta.description || '').slice(0,480);
    const domain = (meta.domain || (id.includes('/') ? id.split('/')[0] : 'leeway')).slice(0,64);
    const triggers = asList(meta.triggers);
    const intents = asList(meta.intents);
    const tags = asList(meta.tags);
    const dependencies = asList(meta.requires || meta.dependencies).filter(safeName);
    const conflicts = asList(meta.conflicts || meta.conflicts_with).filter(safeName);
    const claimedPriority = Number(meta.priority);
    const priority = meta.priority !== undefined && Number.isInteger(claimedPriority) && claimedPriority>=0 && claimedPriority<=5 ? claimedPriority : 0;
    const keywordTokens = tokenize([name,description,domain,tags.join(' '),intents.join(' '),id].join(' '));
    const triggerTokens = tokenize(triggers.join(' '));
    experts.push(Object.freeze({
      id, name, domain, description, tags, triggers, intents,
      dependencies, conflicts, priority,
      sourcePath:relative, sourceSha256:sha(source), sourceBytes:bytes,
      keywordTokens, triggerTokens,
      registryState:'SOURCE_PRESENT_NOT_LIVE_VERIFIED',
      capabilityGrant:'NOT_CONFERRED',
      execution:'NOT_EXECUTED',
      modelAuthority:'NONE'
    }));
  }
  experts.sort((a,b)=>a.id.localeCompare(b.id,'en'));
  const fingerprint = sha(experts.map(e=>e.sourcePath+':'+e.sourceSha256).join('\n'));
  return Object.freeze({
    schemaVersion:'leeway.agent-skills.derived-routing-projection.v1',
    owner:'4citeB4U/LeeWay-Agent-Skills',
    selectionOwner:'skills/leeway-skill-orchestrator/SKILL.md',
    kernel:'skills/leeway-universal-capability-kernel/SKILL.md',
    sourceCommit,
    fingerprintSha256:fingerprint,
    sourceState:'DERIVED_FROM_PRESENT_SKILL_FILES_NOT_RUNTIME_ADMITTED',
    sourcePolicy:'EXISTING_SKILL_MD_FILES_ARE_ONLY_AUTHORITY',
    expertCount:experts.length,
    experts:Object.freeze(experts),
    runtimeExecution:'NOT_EXECUTED',
    independentVeritas:'NOT_EXECUTED',
    receipt:'NOT_CREATED'
  });
}
const checkMap = map => {
  if (map?.schemaVersion !== 'leeway.agent-skills.derived-routing-projection.v1' ||
      map.owner !== '4citeB4U/LeeWay-Agent-Skills' ||
      !safeHash(map.fingerprintSha256) || !Array.isArray(map.experts) ||
      map.expertCount !== map.experts.length ||
      map.experts.some(e => !safeName(e.id) || !safeHash(e.sourceSha256))) throw Error('EXPERT_MAP_CANONICAL_SOURCE_REQUIRED');
};
/**
 * Score metadata only: broad ambient influence, Top-K focal source-plan.
 * Scores measure keyword overlap, NOT model confidence or actual capability.
 */
export function routeDerivedSkillExperts({map, task, topK=3}={}) {
  checkMap(map);
  if (typeof task !== 'string' || task.length > 1024 || !task.trim() ||
      !Number.isInteger(topK) || topK < 1 || topK > 8) throw Error('EXPERT_ROUTING_INPUT_INVALID');
  const queryTokens = tokenize(task);
  const ranked = map.experts.map(e => {
    const lexical = new Set(e.keywordTokens);
    const explicit = new Set(e.triggerTokens);
    const idTokens = new Set(tokenize(e.id));
    const matches = queryTokens.filter(t => lexical.has(t) || explicit.has(t));
    const score = matches.reduce((n,t)=>n+(explicit.has(t)?6:idTokens.has(t)?4:2),0) + (matches.length>0?e.priority:0);
    return {id:e.id,score,matches,sourcePath:e.sourcePath,sourceSha256:e.sourceSha256,sourceBytes:e.sourceBytes,
      dependencies:e.dependencies,conflicts:e.conflicts};
  }).filter(r => r.score>0).sort((a,b)=>b.score-a.score || a.id.localeCompare(b.id,'en'));
  const chosen=[];
  for (const candidate of ranked) {
    const collisions = chosen.some(s => s.conflicts.includes(candidate.id) || candidate.conflicts.includes(s.id));
    if (!collisions) chosen.push(candidate);
    if(chosen.length===topK)break;
  }
  return Object.freeze({
    status:chosen.length?'EXPERT_CANDIDATES_SOURCE_ONLY':'NO_MATCHING_SOURCE_SKILLS',
    owner:'LEEWAY_MACHINE_CONSCIOUSNESS',
    task, topK, metadataIndexSha256:map.fingerprintSha256,
    selected:Object.freeze(chosen.map(e=>Object.freeze({...e,sourceStatus:'PRESENT_NOT_EXECUTED'}))),
    decision:'NOT_FORMULA_EVALUATED',
    instructionsLoaded:false,
    toolGrant:'NOT_CONFERRED',
    runtimeDispatch:'NOT_EXECUTED',
    verification:'NOT_PERFORMED'
  });
}
/**
 * A request for the existing Runtime/Skill Orchestrator to load exact pinned
 * SKILL.md files after real authorization. This function does not read them.
 */
export function planSkillExpertHydration({map,route,maxContextBytes=32768}={}) {
  checkMap(map);
  if (route?.metadataIndexSha256 !== map.fingerprintSha256 || !Array.isArray(route.selected) ||
      route.selected.length > 8 || !Number.isInteger(maxContextBytes) ||
      maxContextBytes < 1024 || maxContextBytes > 131072) throw Error('EXPERT_HYDRATION_INPUT_INVALID');
  const available = new Map(map.experts.map(e=>[e.id,e]));
  const sourcePlans=[];
  let used=0;
  for(const picked of route.selected) {
    const e=available.get(picked?.id);
    if(!e || picked.sourceSha256 !== e.sourceSha256 || picked.sourcePath !== e.sourcePath) throw Error('EXPERT_HYDRATION_SOURCE_PIN_MISMATCH');
    if(used+e.sourceBytes>maxContextBytes) continue;
    used+=e.sourceBytes;
    sourcePlans.push({id:e.id,sourcePath:e.sourcePath,sourceSha256:e.sourceSha256,bytes:e.sourceBytes});
  }
  return Object.freeze({
    status:sourcePlans.length?'HYDRATION_PLAN_REQUIRES_AUTHORIZED_ORIGINAL_RUNTIME':'CONTEXT_BUDGET_OR_SELECTION_BLOCKED',
    owner:'LEEWAY_MACHINE_CONSCIOUSNESS',
    loader:'EXISTING_LEEWAY_SKILL_ORCHESTRATOR_AND_TOOL_GATEWAY',
    sourceCommit:map.sourceCommit,
    sourcePlans:Object.freeze(sourcePlans),
    plannedContextBytes:used,maxContextBytes,
    sourceFilesActuallyRead:false,
    originalRuntimeAuthorization:'NOT_CHECKED',
    instructionsInjected:false,
    privilegesGranted:false,
    dispatch:'NOT_EXECUTED',
    receipt:'NOT_CREATED'
  });
}
