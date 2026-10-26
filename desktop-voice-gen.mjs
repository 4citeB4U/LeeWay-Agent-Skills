import { chromium } from "playwright-core";
const browser=await chromium.launch({channel:"msedge",headless:true,args:["--enable-unsafe-webgpu","--enable-features=Vulkan"]});
const page=await browser.newPage();
await page.goto("http://127.0.0.1:8767/",{waitUntil:"domcontentloaded"});
console.log("GPU",await page.evaluate(()=>!!navigator.gpu));
await page.click("#load");
for(let i=0;i<90;i++){
  const state=await page.evaluate(()=>({text:document.querySelector("#status").innerText,ready:window.v?.ready,device:window.v?.device}));
  if(i%5===0)console.log(JSON.stringify(state));
  if(state.ready){console.log("READY",JSON.stringify(state));break}
  if(/^ERR/.test(state.text)){console.log("FAILED",JSON.stringify(state));break}
  await page.waitForTimeout(2000);
}
const final=await page.evaluate(()=>({text:document.querySelector("#status").innerText,ready:window.v?.ready,device:window.v?.device}));
if(final.ready){
  await page.click("#gen");
  for(let i=0;i<120;i++){
    const s=await page.locator("#status").innerText();
    if(i%5===0)console.log("GEN",s);
    if(s.startsWith("GENERATED")||s.startsWith("ERR"))break;
    await page.waitForTimeout(1000);
  }
  const out=await page.evaluate(()=>({status:document.querySelector("#status").innerText,b64:window.generatedWav||null}));
  if(out.b64){
    const fs=await import("node:fs");
    fs.writeFileSync("C:/Users/Leona/.codex/leeway/voice-one-desktop/agent-lee-voice-one-test.wav",Buffer.from(out.b64,"base64"));
  }
  console.log(JSON.stringify({status:out.status,bytes:out.b64?Buffer.from(out.b64,"base64").length:0}));
}
await browser.close();
