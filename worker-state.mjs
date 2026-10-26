const targets=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
console.log(JSON.stringify(targets.filter(x=>x.type==="worker"),null,2));
for(const t of targets.filter(x=>x.type==="worker")){
 const ws=new WebSocket(t.webSocketDebuggerUrl);let id=0;const p=new Map();
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}};
 await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("WS"))});
 const call=(method,params={})=>new Promise(resolve=>{const n=++id;p.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
 const out=await call("Runtime.evaluate",{expression:"(()=>{try{return {href:self.location.href,device:typeof device==='undefined'?null:device,hasModel:typeof model!=='undefined'&&!!model,hasProcessor:typeof processor!=='undefined'&&!!processor,hasSpeaker:typeof speaker!=='undefined'&&!!speaker,epoch:typeof epoch==='undefined'?null:epoch}}catch(e){return {error:e.message}}})()",returnByValue:true});
 console.log("WORKER_STATE",JSON.stringify(out.result.result.value));
 ws.close();
}
