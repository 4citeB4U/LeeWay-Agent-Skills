
const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
const page=pages.find(x=>x.type==="page"&&/Rapid Web Develop/.test(x.title)&&x.url==="https://rapidwebdevelop.com/");
if(!page) throw new Error("RAPIDWEB_TAB_NOT_FOUND");
const ws=new WebSocket(page.webSocketDebuggerUrl);let id=0;const p=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}};
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("WS"))});
const call=(method,params={})=>new Promise(resolve=>{const n=++id;p.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
await call("Page.bringToFront");
const out=await call("Runtime.evaluate",{expression:"(async()=>{window.__leewayConversationActive=true;window.__leewayLastRuntimeReceipt=null;document.querySelector('#agentTranscript').textContent='';document.querySelector('#agentText').textContent='Agent Lee is ready for your ecosystem question.';try{await window.__leewayLocalListener.start();return {ok:true,active:window.__leewayLocalListener.active,ready:window.__leewayLocalListener.ready,state:document.querySelector('#agentState').textContent}}catch(e){return {ok:false,error:e.message}}})()",awaitPromise:true,returnByValue:true});
console.log(JSON.stringify(out.result.result.value));ws.close();