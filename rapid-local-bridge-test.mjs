const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
const page=pages.find(x=>x.type==="page"&&/Rapid Web Develop/.test(x.title)&&x.url.startsWith("https://rapidwebdevelop.com"));
if(!page) throw new Error("RAPIDWEB_TAB_NOT_FOUND");
const ws=new WebSocket(page.webSocketDebuggerUrl);let id=0;const p=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}};
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("WS"))});
const call=(method,params={})=>new Promise(resolve=>{const n=++id;p.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
const expr="fetch('http://127.0.0.1:8770/health',{cache:'no-store'}).then(async r=>({ok:r.ok,status:r.status,text:(await r.text()).slice(0,1200),secure:isSecureContext,origin:location.origin})).catch(e=>({ok:false,error:e.message,secure:isSecureContext,origin:location.origin}))";
const out=await call("Runtime.evaluate",{expression:expr,awaitPromise:true,returnByValue:true});console.log(JSON.stringify(out.result.result.value,null,2));ws.close();
