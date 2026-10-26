
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function attach(){
  const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
  const page=pages.find(x=>x.type==="page"&&/Rapid Web Develop/.test(x.title)&&x.url.startsWith("https://rapidwebdevelop.com"));
  if(!page) throw new Error("RAPIDWEB_TAB_NOT_FOUND");
  const ws=new WebSocket(page.webSocketDebuggerUrl);
  let id=0; const pending=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id)}};
  await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("CDP_WS_ERROR"))});
  const call=(method,params={})=>new Promise(resolve=>{const n=++id;pending.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
  await call("Runtime.enable");
  const controller = `
  (()=>{
    if(window.__leewayIntegratedTestInstalled)return "already-installed";
    window.__leewayIntegratedTestInstalled=true;
    const q=s=>document.querySelector(s);
    const text=q("#agentText"), transcript=q("#agentTranscript"), state=q("#agentState"), input=q("#agentInput"), send=q("#agentSend"), mic=q("#micBtn"), bubble=q("#agentBubble");
    if(!text||!transcript||!state||!input||!send||!mic) return "missing-agent-ui";
    bubble?.classList.remove("hidden");
    let recognition=null,busy=false,currentAudio=null;
    const setStatus=s=>{state.textContent=s};
    async function liveAsk(question){
      question=String(question||"").trim(); if(!question||busy)return;
      busy=true; transcript.textContent=question; transcript.classList.remove("hidden"); text.textContent="Agent Lee is routing this through the LeeWay runtime...";
      setStatus("Formula/context → Agent Skills → Gemma 4 → Agent Lee clone");
      try{
        const r=await fetch("http://127.0.0.1:8770/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question})});
        const data=await r.json();
        if(!r.ok) throw new Error(data.error||("HTTP "+r.status));
        text.textContent=data.answer||"";
        window.__leewayLastRuntimeReceipt=data.receipt||null;
        let panel=q("#leewayLiveReceipt");
        if(!panel){
          panel=document.createElement("details"); panel.id="leewayLiveReceipt"; panel.open=true; panel.style.cssText="margin-top:10px;padding:8px;border:1px solid #2a4b5f;border-radius:8px";
          panel.innerHTML="<summary>Live LeeWay receipt</summary><pre style='white-space:pre-wrap;font-size:11px'></pre>";
          q("#agentBubble")?.appendChild(panel);
        }
        panel.querySelector("pre").textContent=JSON.stringify(data.receipt,null,2);
        if(data.audio_url){
          currentAudio?.pause?.();
          currentAudio=new Audio("http://127.0.0.1:8770"+data.audio_url+"?t="+Date.now());
          currentAudio.onended=()=>{busy=false;setStatus("Ready for your next question.")};
          currentAudio.onerror=()=>{busy=false;setStatus("Answer ready; clone audio failed to play.")};
          await currentAudio.play();
          setStatus("Agent Lee is speaking through the governed clone.");
        } else {busy=false;setStatus("Answer ready.");}
      }catch(e){busy=false;text.textContent="ERROR: "+e.message;setStatus("Live LeeWay turn failed.");}
    }
    window.__leewayIntegratedAsk=liveAsk;
    send.onclick=e=>{e?.preventDefault?.();const v=input.value;input.value="";liveAsk(v);return false};
    input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();e.stopImmediatePropagation();const v=input.value;input.value="";liveAsk(v)}},true);
    mic.onclick=e=>{
      e?.preventDefault?.();
      if(recognition){try{recognition.abort()}catch{} recognition=null; setStatus("Microphone stopped."); return false;}
      const R=window.SpeechRecognition||window.webkitSpeechRecognition;
      if(!R){setStatus("Chrome speech recognition unavailable; type your question.");return false}
      recognition=new R(); recognition.lang="en-US"; recognition.continuous=false; recognition.interimResults=true;
      recognition.onstart=()=>setStatus("Listening — ask Agent Lee your question.");
      recognition.onresult=ev=>{
        let f="",p=""; for(let i=ev.resultIndex;i<ev.results.length;i++){if(ev.results[i].isFinal)f+=ev.results[i][0].transcript;else p+=ev.results[i][0].transcript}
        transcript.textContent=(f||p).trim(); transcript.classList.remove("hidden");
        if(f.trim()){const q=f.trim();recognition=null;liveAsk(q)}
      };
      recognition.onerror=ev=>{setStatus("Microphone error: "+ev.error);recognition=null};
      recognition.onend=()=>{if(recognition){recognition=null;if(!busy)setStatus("Listening stopped.")}};
      recognition.start(); return false;
    };
    const badge=document.createElement("div"); badge.id="leewayIntegratedBadge"; badge.textContent="LIVE LEEWAY TEST: Formula + Skills + Gemma 4 + Clone"; badge.style.cssText="padding:7px 9px;margin:8px 0;background:#0c2b20;color:#7dffb3;border-radius:8px;font-size:12px";
    q("#agentBubble")?.prepend(badge);
    setStatus("Live LeeWay test controller attached. Ask Agent Lee.");
    return "installed";
  })()
  `;
  const result=await call("Runtime.evaluate",{expression:controller,returnByValue:true});
  console.log("INJECT_RESULT",JSON.stringify(result.result.result.value));
  const probe=await call("Runtime.evaluate",{expression:"fetch('http://127.0.0.1:8770/health',{cache:'no-store'}).then(async r=>({ok:r.ok,status:r.status,body:(await r.text()).slice(0,1000)})).catch(e=>({ok:false,error:e.message}))",awaitPromise:true,returnByValue:true});
  console.log("BRIDGE_PROBE",JSON.stringify(probe.result.result.value));
  ws.close();
}
await attach();
