import { chromium } from "playwright-core";
import fs from "node:fs";
const browser=await chromium.launch({channel:"msedge",headless:true,args:["--enable-unsafe-webgpu","--enable-features=Vulkan"]});
const page=await browser.newPage();
page.on("console",m=>console.log("BROWSER",m.type(),m.text()));
page.on("pageerror",e=>console.log("PAGEERROR",e.message));
await page.goto("http://127.0.0.1:8767/",{waitUntil:"networkidle",timeout:120000});
console.log("PRE",await page.evaluate(()=>({gpu:!!navigator.gpu,voice:typeof window.v,ctor:typeof window.LeeWayBrowserVoice})));
const ready=await page.evaluate(async()=>{
  try{
    const r=await window.v.load(()=>{});
    return {ok:true,device:r.device,ready:window.v.ready};
  }catch(e){return {ok:false,error:e.message,stack:e.stack}}
});
console.log("LOAD",JSON.stringify(ready));
if(!ready.ok){await browser.close();process.exit(2)}
const out=await page.evaluate(async()=>{
  const result=await window.v.request("generate",{text:"Hello Lee. This is Agent Lee speaking in English through the Voice One clone. The LeeWay voice path is active.",exaggeration:.25});
  const samples=new Float32Array(result.audio),wav=new ArrayBuffer(44+samples.length*2),view=new DataView(wav);
  const w=(o,t)=>{for(let i=0;i<t.length;i++)view.setUint8(o+i,t.charCodeAt(i))};
  w(0,"RIFF");view.setUint32(4,wav.byteLength-8,true);w(8,"WAVE");w(12,"fmt ");view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,result.sampleRate,true);view.setUint32(28,result.sampleRate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);w(36,"data");view.setUint32(40,samples.length*2,true);
  for(let i=0;i<samples.length;i++){const x=Math.max(-1,Math.min(1,samples[i]));view.setInt16(44+i*2,Math.round(x*(x<0?32768:32767)),true)}
  const bytes=new Uint8Array(wav);let bin="";for(let i=0;i<bytes.length;i+=0x8000)bin+=String.fromCharCode(...bytes.subarray(i,i+0x8000));
  return {b64:btoa(bin),sampleRate:result.sampleRate,samples:samples.length};
});
const bytes=Buffer.from(out.b64,"base64");
fs.writeFileSync("C:/Users/Leona/.codex/leeway/voice-one-desktop/agent-lee-voice-one-test.wav",bytes);
console.log("GENERATED",JSON.stringify({bytes:bytes.length,sampleRate:out.sampleRate,samples:out.samples}));
await browser.close();
