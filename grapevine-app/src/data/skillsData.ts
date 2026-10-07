import { Branch, BranchKey, Skill } from '../types/skills';

export const BRANCHES: Record<BranchKey, Branch> = {
  CORE: { key:'CORE', title:'LeeWay Core', subtitle:'Governed Skills & Runtime Fabric', color:'#39FF14', glowColor:'rgba(57, 255, 20, 0.45)', icon:'⚙', yaw:0, pitch:0, description:'Canonical LeeWay governance, orchestration, Formula, runtime, continuity, factory and capability-fabric skills.', badge:'Loop Core' },
  PERCEPTION: { key:'PERCEPTION', title:'OmniParser Tendril', subtitle:'Visual, Media & Spatial Skills', color:'#ff007f', glowColor:'rgba(255, 0, 127, 0.45)', icon:'◎', yaw:0, pitch:0, description:'Perception, visual, audio, 3D, rendering and spatial capability skills. Individual execution maturity is shown per grape.', badge:'Perception' },
  MACOS: { key:'MACOS', title:'macOS Tendril', subtitle:'Apple Platform Skills', color:'#a855f7', glowColor:'rgba(168, 85, 247, 0.45)', icon:'', yaw:-30, pitch:15, description:'macOS, iOS, Swift and Apple-platform skills. Registration is not platform qualification.', badge:'macOS Native' },
  WINDOWS: { key:'WINDOWS', title:'Windows Tendril', subtitle:'Windows & Desktop Skills', color:'#38edf8', glowColor:'rgba(56, 237, 248, 0.45)', icon:'⊞', yaw:30, pitch:-15, description:'Windows, PowerShell, desktop and workstation skills. Consequential actions remain authority-gated.', badge:'Win32 / UIA' },
  LINUX: { key:'LINUX', title:'Linux Tendril', subtitle:'Linux, DevOps & Deployment', color:'#ff9900', glowColor:'rgba(255, 153, 0, 0.45)', icon:'🐧', yaw:-20, pitch:20, description:'Linux, deployment, CI/CD, containers and DevOps skills. Individual adapters require their own evidence.', badge:'POSIX / X11' },
  ANDROID: { key:'ANDROID', title:'Android Tendril', subtitle:'Android & Mobile Skills', color:'#10b981', glowColor:'rgba(16, 185, 129, 0.45)', icon:'🤖', yaw:0, pitch:-25, description:'Android, ADB, phone and mobile skills routed through the governed device capability fabric when qualified.', badge:'ADB / Android' },
  WEB: { key:'WEB', title:'Web Tendril', subtitle:'Web, Knowledge & Business', color:'#3b82f6', glowColor:'rgba(59, 130, 246, 0.45)', icon:'🌐', yaw:20, pitch:15, description:'Web, research, knowledge, business, browser and workflow skills. Public Pages itself is read/select only.', badge:'CDP Protocol' },
};

export const INITIAL_SKILLS: Skill[] = [];
