import React,{useState} from 'react';
import type {Branch,BranchKey,Skill} from '../types/skills';
type Props={branches:Record<BranchKey,Branch>;skills:Skill[];onSelectBranch:(key:BranchKey)=>void;onCenter:()=>void;onNear:()=>void;onCloseUp:()=>void;onAudio:()=>void;onOpenDrawer:()=>void;onOpenGitHub:()=>void};
export function SkillsWidgetRail({branches,skills,onSelectBranch,onCenter,onNear,onCloseUp,onAudio,onOpenDrawer,onOpenGitHub}:Props){
const [expanded,setExpanded]=useState(false);
return <>
<nav aria-label="Skill namespaces" className="absolute z-30 top-1 left-4 right-16 flex flex-wrap justify-center gap-2 pointer-events-auto">
{(Object.keys(branches) as BranchKey[]).map(k=><button key={k} title={branches[k].subtitle} onClick={()=>onSelectBranch(k)} style={{color:branches[k].color}} className="text-[10px] tracking-widest font-mono bg-transparent border-0 hover:underline">{k} · {skills.filter(s=>s.branchKey===k).length}</button>)}
</nav>
<aside aria-label="Agent Skills right-side control tab" className="absolute right-0 top-[15%] z-40 flex items-start pointer-events-auto">
<button aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)} title="Open Skills Controls" className="border border-emerald-400/55 rounded-l-lg bg-[#071713]/90 text-emerald-200 text-xs font-mono px-2 py-5 [writing-mode:vertical-rl]">SKILLS CONTROLS</button>
{expanded&&<div className="flex flex-col gap-2 bg-[#071713]/90 border-l border-emerald-400/55 p-3 max-h-[75vh] overflow-y-auto min-w-40">
<strong className="text-emerald-200 text-xs">Navigation &amp; Hubs</strong>
{(Object.keys(branches) as BranchKey[]).map(k=><button key={k} className="text-left text-[11px] hover:underline" onClick={()=>onSelectBranch(k)}>{branches[k].title}</button>)}
<button onClick={onCenter}>Center 3D</button><button onClick={onNear}>Near skills</button><button onClick={onCloseUp}>Zoom mode</button><button onClick={onAudio}>Sound</button><button onClick={onOpenDrawer}>Branch details</button><button onClick={onOpenGitHub}>GitHub registry</button>
<p className="text-[10px] opacity-70">Registry entries are not proof of executable skills.</p>
</div>}
</aside>
</>;
}
