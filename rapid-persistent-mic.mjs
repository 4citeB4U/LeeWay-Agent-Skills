
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
 const mic=document.querySelector("#micBtn"),state=document.querySelector("#agentState"),transcript=document.querySelector("#agentTranscript");
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!mic||!state||!transcript||!R||!window.__leewayIntegratedAsk)return "missing";
 let rec=null;
 window.__leewayKeepListening=false;
 const start=()=>{
  if(!window.__leewayKeepListening)return;
  rec=new R(); rec.lang="en-US"; rec.continuous=true; rec.interimResults=true;
  rec.onstart=()=>{state.textContent="Listening continuously — ask Agent Lee your question.";};
  rec.onresult=e=>{
    let f="",p=""; for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)f+=e.results[i][0].transcript;else p+=e.results[i][0].transcript}
    transcript.textContent=(f||p).trim(); transcript.classList.remove("hidden");
    if(f.trim()){window.__leewayKeepListening=false;try{rec.stop()}catch{};window.__leewayIntegratedAsk(f.trim())}
  };
  rec.onerror=e=>{
    state.textContent="Microphone event: "+e.error+(window.__leewayKeepListening?" — restarting...":"");
  };
  rec.onend=()=>{rec=null;if(window.__leewayKeepListening){setTimeout(start,350)}else if(!window.__leewayLastRuntimeReceipt){state.textContent="Listening stopped."}};
  try{rec.start()}catch(e){state.textContent="Microphone start error: "+e.message}
 };
 mic.onclick=e=>{
  e?.preventDefault?.();
  if(window.__leewayKeepListening){window.__leewayKeepListening=false;try{rec?.abort()}catch{};state.textContent="Microphone stopped.";return false}
  window.__leewayKeepListening=true;start();return false
 };
 window.__leewayStartPersistentMic=()=>{window.__leewayKeepListening=true;start()};
 state.textContent="Persistent mic controller ready.";
 return "patched";
})()
`;
const out=await call("Runtime.evaluate",{expression:patch,returnByValue:true});
console.log("PATCH",JSON.stringify(out.result.result.value));
await call("Runtime.evaluate",{expression:"window.__leewayStartPersistentMic(); 'started'",returnByValue:true});
await new Promise(r=>setTimeout(r,700));
const st=await call("Runtime.evaluate",{expression:"({state:document.querySelector('#agentState')?.textContent,keep:window.__leewayKeepListening})",returnByValue:true});
console.log("STATE",JSON.stringify(st.result.result.value));
ws.close();