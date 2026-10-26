
const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
const page=pages.find(x=>x.type==="page"&&/Rapid Web Develop/.test(x.title)&&x.url==="https://rapidwebdevelop.com/");
if(!page) throw new Error("RAPIDWEB_TAB_NOT_FOUND");
const ws=new WebSocket(page.webSocketDebuggerUrl);let id=0;const p=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}};
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("WS"))});
const call=(method,params={})=>new Promise(resolve=>{const n=++id;p.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
await call("Runtime.enable");
const patch=`
(async()=>{
 window.__leewayKeepListening=false;
 try{window.__leewayCloudRecognition?.abort?.()}catch{}
 const mic=document.querySelector("#micBtn"),state=document.querySelector("#agentState"),transcript=document.querySelector("#agentTranscript");
 if(!window.LeeWayBrowserListener||!window.__leewayIntegratedAsk||!mic||!state)return {ok:false,error:"missing-live-components"};
 try{await window.__leewayLocalListener?.dispose?.()}catch{}
 const listener=new LeeWayBrowserListener({
   onState:m=>{state.textContent=m},
   onListening:a=>{mic.setAttribute("aria-pressed",String(a));mic.setAttribute("aria-label",a?"Stop local LeeWay microphone":"Start local LeeWay microphone")},
   onSpeech:()=>{state.textContent="Speech detected — keep talking until you finish."},
   onTranscript:t=>{transcript.textContent=t;transcript.classList.remove("hidden");state.textContent="Local transcript ready — routing through LeeWay...";window.__leewayIntegratedAsk(t)},
   onProgress:p=>{
     const label=p?.file?("Loading local speech model: "+p.file.split("/").pop()):"Preparing local speech recognition...";
     state.textContent=label;
   },
   onMetric:(stage,detail)=>{window.__leewayLocalMicMetrics ||= [];window.__leewayLocalMicMetrics.push({stage,detail,at:performance.now()})}
 });
 window.__leewayLocalListener=listener;
 mic.onclick=async e=>{
   e?.preventDefault?.();
   if(listener.active){await listener.stop();state.textContent="Local LeeWay microphone stopped.";return false}
   try{await listener.start()}catch(err){state.textContent="Local mic error: "+err.message}
   return false
 };
 state.textContent="Starting local LeeWay microphone...";
 try{await listener.start();return {ok:true,active:listener.active,ready:listener.ready}}catch(e){return {ok:false,error:e.message}}
})()
`;
const out=await call("Runtime.evaluate",{expression:patch,awaitPromise:true,returnByValue:true});
console.log("LOCAL_LISTENER",JSON.stringify(out.result.result.value));
await new Promise(r=>setTimeout(r,1200));
const st=await call("Runtime.evaluate",{expression:"({state:document.querySelector('#agentState')?.textContent,active:window.__leewayLocalListener?.active,ready:window.__leewayLocalListener?.ready,metrics:window.__leewayLocalMicMetrics?.slice(-5)||[]})",returnByValue:true});
console.log("STATE",JSON.stringify(st.result.result.value));
ws.close();