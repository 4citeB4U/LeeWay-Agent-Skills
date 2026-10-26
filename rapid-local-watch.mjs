
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const pages=await fetch("http://127.0.0.1:9223/json").then(r=>r.json());
const page=pages.find(x=>x.type==="page"&&/Rapid Web Develop/.test(x.title)&&x.url==="https://rapidwebdevelop.com/");
if(!page) throw new Error("RAPIDWEB_TAB_NOT_FOUND");
const ws=new WebSocket(page.webSocketDebuggerUrl);let id=0;const p=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}};
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=()=>j(new Error("WS"))});
const call=(method,params={})=>new Promise(resolve=>{const n=++id;p.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
const evalv=async expression=>(await call("Runtime.evaluate",{expression,returnByValue:true})).result.result.value;
let last="";
for(let i=0;i<120;i++){
 const s=await evalv("({state:document.querySelector('#agentState')?.textContent,active:window.__leewayLocalListener?.active,ready:window.__leewayLocalListener?.ready,transcript:document.querySelector('#agentTranscript')?.textContent,answer:document.querySelector('#agentText')?.textContent,receipt:window.__leewayLastRuntimeReceipt||null,metrics:window.__leewayLocalMicMetrics?.slice(-6)||[]})");
 const sig=JSON.stringify({state:s.state,active:s.active,ready:s.ready,transcript:s.transcript,answer:s.answer});
 if(sig!==last){console.log(new Date().toISOString(),JSON.stringify(s));last=sig}
 if(s.receipt){console.log("FINAL_RECEIPT",JSON.stringify(s.receipt));ws.close();process.exit(0)}
 if(/failed|error/i.test(s.state||"")&&!/loading/i.test(s.state||"")){console.log("FAIL",JSON.stringify(s));ws.close();process.exit(2)}
 await sleep(2000);
}
console.log("TIMEOUT");ws.close();process.exit(3);
