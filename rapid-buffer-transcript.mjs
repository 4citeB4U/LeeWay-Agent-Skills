
const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
const page=pages.find(x=>x.type==="page"&&/Rapid Web Develop/.test(x.title)&&x.url==="https://rapidwebdevelop.com/");
if(!page) throw new Error("RAPIDWEB_TAB_NOT_FOUND");
const ws=new WebSocket(page.webSocketDebuggerUrl);let id=0;const p=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}};
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("WS"))});
const call=(method,params={})=>new Promise(resolve=>{const n=++id;p.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
const patch=`
(()=>{
 const l=window.__leewayLocalListener,state=document.querySelector("#agentState"),transcript=document.querySelector("#agentTranscript");
 if(!l)return "listener-missing";
 window.__leewayTranscriptBuffer="";
 clearTimeout(window.__leewayTranscriptTimer);
 l.options.onTranscript=t=>{
   t=String(t||"").trim();if(!t)return;
   window.__leewayTranscriptBuffer=(window.__leewayTranscriptBuffer+" "+t).trim();
   transcript.textContent=window.__leewayTranscriptBuffer;transcript.classList.remove("hidden");
   state.textContent="Heard you — waiting for the rest of the question...";
   clearTimeout(window.__leewayTranscriptTimer);
   window.__leewayTranscriptTimer=setTimeout(()=>{
     const q=window.__leewayTranscriptBuffer.trim();window.__leewayTranscriptBuffer="";
     const words=q.split(/\s+/).filter(Boolean);
     if(words.length<3){state.textContent="Short fragment ignored. Keep speaking your full question.";return}
     state.textContent="Question captured — routing through LeeWay...";
     window.__leewayIntegratedAsk(q);
   },1600);
 };
 return "buffered-transcription-installed";
})()
`;
const out=await call("Runtime.evaluate",{expression:patch,returnByValue:true});
console.log(JSON.stringify(out.result.result.value));ws.close();