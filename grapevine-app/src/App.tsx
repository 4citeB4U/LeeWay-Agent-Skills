import React, { useState, useCallback, useEffect } from 'react';
import { Branch, BranchKey, GrapevineRegistry, Skill } from './types/skills';
import { BRANCHES } from './data/skillsData';
import { loadCanonicalRegistry } from './data/registryData';
import { Grapevine3DCanvas } from './components/Grapevine3DCanvas';
import { TopBar } from './components/TopBar';
import { HarvestBasket } from './components/HarvestBasket';
import { SkillInspectorModal } from './components/SkillInspectorModal';
import { GrapevineNearRadar } from './components/GrapevineNearRadar';
import { BranchDrawer } from './components/BranchDrawer';
import { PipelineRunnerModal } from './components/PipelineRunnerModal';
import { GitHubSyncModal } from './components/GitHubSyncModal';
import { ExportPipelineModal } from './components/ExportPipelineModal';
import { sounds } from './utils/audio';

export default function App() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [registry, setRegistry] = useState<GrapevineRegistry | null>(null);
  const [registryError, setRegistryError] = useState<string | null>(null);
  const [branches] = useState<Record<BranchKey, Branch>>(BRANCHES);

  useEffect(() => {
    let alive = true;
    loadCanonicalRegistry().then(({ registry, skills }) => {
      if (!alive) return;
      setRegistry(registry);
      setSkills(skills);
      setRegistryError(null);
    }).catch((error) => {
      if (!alive) return;
      setRegistryError(error?.message || 'GRAPEVINE_REGISTRY_LOAD_FAILED');
    });
    return () => { alive = false; };
  }, []);

  const [basket, setBasket] = useState<Skill[]>([]);
  useEffect(() => {
    if (!skills.length) return;
    try {
      const saved = localStorage.getItem('leeway_harvest_basket_v2');
      if (!saved) return;
      const ids = JSON.parse(saved);
      if (!Array.isArray(ids)) return;
      const restored = ids.map((id) => skills.find((skill) => skill.id === id)).filter(Boolean) as Skill[];
      setBasket(restored.slice(0, 5));
    } catch {}
  }, [skills]);
  useEffect(() => {
    try { localStorage.setItem('leeway_harvest_basket_v2', JSON.stringify(basket.map((skill) => skill.id))); } catch {}
  }, [basket]);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPipelineRunnerOpen, setIsPipelineRunnerOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeBranchFilter, setActiveBranchFilter] = useState<BranchKey | null>(null);
  const [isNearModeActive, setIsNearModeActive] = useState(false);
  const [nearFocalSkill, setNearFocalSkill] = useState<Skill | null>(null);
  const [isCloseUp, setIsCloseUp] = useState(false);
  const [cameraYaw, setCameraYaw] = useState(0);
  const [cameraPitch, setCameraPitch] = useState(0);
  const [cameraZoom, setCameraZoom] = useState(1.0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const handleToggleAudio = () => { const next = !isAudioEnabled; setIsAudioEnabled(next); sounds.enabled = next; };
  const handleCenterCamera = useCallback(() => { setCameraYaw(0); setCameraPitch(0); setCameraZoom(1.0); setActiveBranchFilter(null); setIsCloseUp(false); }, []);
  const handleToggleCloseUp = useCallback(() => setIsCloseUp((prev) => !prev), []);
  const handleToggleNearMode = useCallback(() => {
    setIsNearModeActive((prev) => {
      const next = !prev;
      if (next && !nearFocalSkill && skills.length) setNearFocalSkill(selectedSkill || basket[0] || skills[0]);
      return next;
    });
  }, [nearFocalSkill, selectedSkill, basket, skills]);
  const handleSelectSkill = useCallback((skill: Skill) => { setSelectedSkill(skill); setNearFocalSkill(skill); sounds.playChime(); }, []);
  const handleAddToBasket = useCallback((skill: Skill) => setBasket((prev) => prev.some((s) => s.id === skill.id) ? prev : prev.length >= 5 ? prev : [...prev, skill]), []);
  const handleRemoveFromBasket = useCallback((skillId: string) => setBasket((prev) => prev.filter((s) => s.id !== skillId)), []);
  const handleClearBasket = useCallback(() => setBasket([]), []);
  const handleToggleAttach = useCallback((skill: Skill) => setBasket((prev) => prev.some((s) => s.id === skill.id) ? prev.filter((s) => s.id !== skill.id) : prev.length >= 5 ? prev : [...prev, skill]), []);
  const handleSuggestNear = useCallback(() => {
    if (!skills.length) return;
    const anchor = basket[basket.length - 1] || skills[0];
    const candidate = skills.find((s) => anchor.compatibleNeighbors.includes(s.id) && !basket.some((b) => b.id === s.id)) || skills.find((s) => s.branchKey === anchor.branchKey && !basket.some((b) => b.id === s.id)) || skills.find((s) => !basket.some((b) => b.id === s.id));
    if (candidate) { handleAddToBasket(candidate); setNearFocalSkill(candidate); }
  }, [basket, skills, handleAddToBasket]);
  const handleSelectBranch = useCallback((key: BranchKey) => {
    const branch = branches[key]; setCameraYaw(branch.yaw); setCameraPitch(branch.pitch); setCameraZoom(1.5); setActiveBranchFilter(key); setIsDrawerOpen(false);
  }, [branches]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black select-none">
      <Grapevine3DCanvas skills={skills} branches={branches} selectedSkill={selectedSkill} basket={basket} activeBranchFilter={activeBranchFilter} nearModeSkill={nearFocalSkill} isNearModeActive={isNearModeActive} isCloseUp={isCloseUp} onSelectSkill={handleSelectSkill} cameraYaw={cameraYaw} cameraPitch={cameraPitch} cameraZoom={cameraZoom} onCameraChange={(yaw,pitch,zoom)=>{setCameraYaw(yaw);setCameraPitch(pitch);setCameraZoom(zoom)}} />
      <TopBar onOpenDrawer={()=>setIsDrawerOpen(true)} onCenterCamera={handleCenterCamera} onToggleNearMode={handleToggleNearMode} isNearModeActive={isNearModeActive} onToggleCloseUp={handleToggleCloseUp} isCloseUp={isCloseUp} isAudioEnabled={isAudioEnabled} onToggleAudio={handleToggleAudio} onOpenGitHubModal={()=>setIsGitHubModalOpen(true)} />
      {registry && <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none rounded-full border border-[#39FF14]/35 bg-[#041008]/80 px-3 py-1 text-[10px] font-mono text-[#b9ffad] backdrop-blur-md shadow-lg">{registry.counts.canonicalSkillMd} canonical grapes · {registry.counts.mcpProtocolListedTools} protocol-listed MCP tools · {registry.commit.slice(0,12)}</div>}
      {registryError && <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 rounded-xl border border-red-500/60 bg-red-950/90 px-4 py-2 text-xs font-mono text-red-100">Registry blocked: {registryError}</div>}
      {isNearModeActive && nearFocalSkill && <GrapevineNearRadar focalSkill={nearFocalSkill} allSkills={skills} branches={branches} basket={basket} onSelectSkill={handleSelectSkill} onAddToBasket={handleAddToBasket} onClose={()=>setIsNearModeActive(false)} />}
      <HarvestBasket basket={basket} branches={branches} onRemoveSkill={handleRemoveFromBasket} onClearBasket={handleClearBasket} onInspectSkill={setSelectedSkill} onExecutePipeline={()=>setIsPipelineRunnerOpen(true)} onExportPipeline={()=>setIsExportModalOpen(true)} onSuggestNear={handleSuggestNear} />
      <BranchDrawer isOpen={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)} branches={branches} skills={skills} activeBranchFilter={activeBranchFilter} onSelectBranch={handleSelectBranch} onClearFilter={()=>setActiveBranchFilter(null)} onCenterCamera={handleCenterCamera} />
      {selectedSkill && <SkillInspectorModal skill={selectedSkill} branch={branches[selectedSkill.branchKey]} basket={basket} onClose={()=>setSelectedSkill(null)} onToggleAttach={handleToggleAttach} onSelectNeighbor={(neighborId)=>{const found=skills.find((s)=>s.id===neighborId);if(found){setSelectedSkill(found);setNearFocalSkill(found)}}} />}
      {isPipelineRunnerOpen && <PipelineRunnerModal basket={basket} branches={branches} registry={registry} onClose={()=>setIsPipelineRunnerOpen(false)} />}
      {isGitHubModalOpen && <GitHubSyncModal registry={registry} onClose={()=>setIsGitHubModalOpen(false)} />}
      {isExportModalOpen && <ExportPipelineModal basket={basket} branches={branches} registry={registry} onClose={()=>setIsExportModalOpen(false)} />}
    </main>
  );
}
