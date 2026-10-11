$ErrorActionPreference='Stop'
$repo='E:\LeeWay-Work\grapevine-actual-publish-20261007'
$app=Join-Path $repo 'grapevine-app\src\App.tsx'
$renderer=Join-Path $repo 'grapevine-app\src\components\Grapevine3DCanvas.tsx'
$original='E:\LeeWay-Work\pc-consciousness-live\receipts\skills-grapevine-integration-20261007\source\grapevine-app\src\components\Grapevine3DCanvas.tsx'
if(-not(Test-Path $renderer)){Copy-Item $original $renderer}
$t=[IO.File]::ReadAllText($renderer)
$t=$t.Replace('scene.background=new THREE.Color(0x000000);','scene.background=null;')
$t=$t.Replace('new THREE.WebGLRenderer({antialias:true,powerPreference:', 'new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:')
$t=$t.Replace('renderer.setPixelRatio(Math.min(devicePixelRatio,2));','renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(devicePixelRatio,2));')
$t=$t.Replace('scene.add(ground);','// Floating widget mode: omit backdrop ground plane.')
$t=$t.Replace('touch-none bg-black cursor-grab','touch-none bg-transparent cursor-grab')
[IO.File]::WriteAllText($renderer,$t,[Text.UTF8Encoding]::new($false))
$a=[IO.File]::ReadAllText($app)
$a=$a.Replace("import { TopBar } from './components/TopBar';","import { TopBar } from './components/TopBar';"+[Environment]::NewLine+"import { SkillsWidgetRail } from './components/SkillsWidgetRail';")
$a=$a.Replace("  return (","  const widgetMode = new URLSearchParams(window.location.search).get('widget') === '1';"+[Environment]::NewLine+"  return (")
$a=$a.Replace('className="relative w-screen h-screen overflow-hidden bg-black select-none"','className={`relative w-screen h-screen overflow-hidden select-none ${widgetMode ? "bg-transparent" : "bg-black"}`}')
$a=$a.Replace('      <TopBar onOpenDrawer=', '      {!widgetMode && <TopBar onOpenDrawer=')
$a=$a.Replace('onOpenGitHubModal={()=>setIsGitHubModalOpen(true)} />','onOpenGitHubModal={()=>setIsGitHubModalOpen(true)} />}')
$anchor='      {registry && <div'
$rail='      {widgetMode && <SkillsWidgetRail branches={branches} skills={skills} onSelectBranch={handleSelectBranch} onCenter={handleCenterCamera} onNear={handleToggleNearMode} onCloseUp={handleToggleCloseUp} onAudio={handleToggleAudio} onOpenDrawer={()=>setIsDrawerOpen(true)} onOpenGitHub={()=>setIsGitHubModalOpen(true)} />}'+[Environment]::NewLine
$a=$a.Replace($anchor,$rail+$anchor)
[IO.File]::WriteAllText($app,$a,[Text.UTF8Encoding]::new($false))
'WIDGET_SOURCE_CANDIDATE_PREPARED'
