import { spawnSync } from "node:child_process";
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
const page=pages.find(x=>x.type==="page"&&x.title==="LeeWay Voice One Qualification");
if(!page) throw new Error("VOICE_PAGE_NOT_FOUND");
const ws=new WebSocket(page.webSocketDebuggerUrl);
let id=0; const pending=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id)}};
await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=()=>rej(new Error("WS_ERROR"))});
const call=(method,params={})=>new Promise(resolve=>{const n=++id;pending.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
const evalv=async expression=>(await call("Runtime.evaluate",{expression,returnByValue:true})).result.result.value;
for(let i=0;i<120;i++){
  const s=await evalv("(()=>({ready:window.voice?.ready,device:window.voice?.device,status:(document.querySelector(\"#status\")?.innerText||\"\").slice(-1200),disabled:document.querySelector(\"#speak\")?.disabled}))()");
  if(i%3===0) console.log("POLL",i*5,JSON.stringify(s));
  if(/ERROR/.test(s.status)&&!s.ready){console.log("LOAD_ERROR",JSON.stringify(s));process.exit(2)}
  if(s.ready){
    console.log("READY",JSON.stringify(s));
    await call("Runtime.evaluate",{expression:"document.querySelector(\"#speak\").scrollIntoView({block:\"center\"})"});
    await sleep(500);
    const rect=await evalv("(()=>{const r=document.querySelector(\"#speak\").getBoundingClientRect();return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2),disabled:document.querySelector(\"#speak\").disabled}})()");
    console.log("TAP",JSON.stringify(rect));
    if(rect.disabled) throw new Error("SPEAK_BUTTON_DISABLED");
    spawnSync("adb",["logcat","-c"],{stdio:"ignore"});
    spawnSync("adb",["shell","input","tap",String(rect.x),String(rect.y)],{stdio:"inherit"});
    for(let j=0;j<180;j++){
      const st=await evalv("(document.querySelector(\"#status\")?.innerText||\"\").slice(-1800)");
      if(j%5===0) console.log("SPEAK_POLL",j*2,st.slice(-500));
      if(st.includes("SPEAK COMPLETE")){console.log("SPEAK_COMPLETE");process.exit(0)}
      if(st.includes("SPEAK ERROR")){console.log("SPEAK_ERROR",st.slice(-1200));process.exit(3)}
      await sleep(2000);
    }
    throw new Error("SPEAK_TIMEOUT");
  }
  await sleep(5000);
}
throw new Error("LOAD_TIMEOUT");
