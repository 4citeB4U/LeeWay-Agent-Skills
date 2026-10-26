
const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
const page=pages.find(x=>x.type==="page"&&/Rapid Web Develop/.test(x.title)&&x.url.startsWith("https://rapidwebdevelop.com"));
if(!page) throw new Error("RAPIDWEB_TAB_NOT_FOUND");
const ws=new WebSocket(page.webSocketDebuggerUrl); let id=0; const p=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}};
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("WS"))});
const call=(method,params={})=>new Promise(resolve=>{const n=++id;p.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
await call("Browser.grantPermissions",{origin:"https://rapidwebdevelop.com",permissions:["audioCapture"]});
await call("Runtime.evaluate",{expression:"document.querySelector('#agentBubble')?.classList.remove('hidden');document.querySelector('#micBtn')?.scrollIntoView({block:'center'})"});
await new Promise(r=>setTimeout(r,500));
const out=await call("Runtime.evaluate",{expression:"(()=>{const b=document.querySelector('#micBtn');const r=b.getBoundingClientRect();return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2),label:b.getAttribute('aria-label'),state:document.querySelector('#agentState')?.textContent,badge:document.querySelector('#leewayIntegratedBadge')?.textContent}})()",returnByValue:true});
console.log(JSON.stringify(out.result.result.value));
ws.close();
