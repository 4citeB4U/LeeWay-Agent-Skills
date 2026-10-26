
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
const page=pages.find(x=>x.type==="page"&&/Rapid Web Develop/.test(x.title)&&x.url==="https://rapidwebdevelop.com/");
if(!page) throw new Error("RAPIDWEB_TAB_NOT_FOUND");
const ws=new WebSocket(page.webSocketDebuggerUrl);let id=0;const p=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}};
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("WS"))});
const call=(method,params={})=>new Promise(resolve=>{const n=++id;p.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
await call("Runtime.enable");
const patch=`
(()=>{
 const text=document.querySelector("#agentText"),transcript=document.querySelector("#agentTranscript"),state=document.querySelector("#agentState");
 window.__leewayConversationActive=true;
 window.__leewayLiveBusy=false;
 window.__leewayIntegratedAsk=async question=>{
   question=String(question||"").trim(); if(!question||window.__leewayLiveBusy)return;
   window.__leewayLiveBusy=true;
   try{await window.__leewayLocalListener?.stop?.()}catch{}
   transcript.textContent=question;transcript.classList.remove("hidden");
   text.textContent="Agent Lee is routing this through the LeeWay runtime...";
   state.textContent="Formula/context → Agent Skills → Gemma 4 → Agent Lee clone";
   try{
     const r=await fetch("http://127.0.0.1:8770/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question})});
     const data=await r.json();if(!r.ok)throw new Error(data.error||("HTTP "+r.status));
     text.textContent=data.answer||"";window.__leewayLastRuntimeReceipt=data.receipt||null;
     let panel=document.querySelector("#leewayLiveReceipt");
     if(!panel){panel=document.createElement("details");panel.id="leewayLiveReceipt";panel.open=true;panel.style.cssText="margin-top:10px;padding:8px;border:1px solid #2a4b5f;border-radius:8px";panel.innerHTML="<summary>Live LeeWay receipt</summary><pre style='white-space:pre-wrap;font-size:11px'></pre>";document.querySelector("#agentBubble")?.appendChild(panel)}
     panel.querySelector("pre").textContent=JSON.stringify(data.receipt,null,2);
     if(data.audio_url){
       state.textContent="Agent Lee is speaking through the governed clone.";
       const a=new Audio("http://127.0.0.1:8770"+data.audio_url+"?t="+Date.now());window.__leewayCurrentAudio=a;
       await a.play();
       await new Promise((resolve,reject)=>{a.onended=resolve;a.onerror=()=>reject(new Error("Clone audio playback failed."))});
     }
     state.textContent="Turn complete. Clearing echo window...";
   }catch(e){text.textContent="ERROR: "+e.message;state.textContent="Live LeeWay turn failed."}
   finally{
     window.__leewayLiveBusy=false;window.__leewayCurrentAudio=null;
     if(window.__leewayConversationActive){
       setTimeout(async()=>{try{await window.__leewayLocalListener?.start?.();state.textContent="Listening on this device. Ask Agent Lee your next question."}catch(e){state.textContent="Mic restart failed: "+e.message}},1200);
     }
   }
 };
 return "clean-turn-controller-installed";
})()
`;
try{await call("Runtime.evaluate",{expression:"window.__leewayConversationActive=false;window.__leewayLocalListener?.stop?.()",awaitPromise:true})}catch{}
const out=await call("Runtime.evaluate",{expression:patch,returnByValue:true});console.log("PATCH",JSON.stringify(out.result.result.value));
const st=await call("Runtime.evaluate",{expression:"({state:document.querySelector('#agentState')?.textContent,active:window.__leewayLocalListener?.active,ready:window.__leewayLocalListener?.ready,busy:window.__leewayLiveBusy})",returnByValue:true});
console.log("STATE",JSON.stringify(st.result.result.value));ws.close();