import fs from "node:fs"; import path from "node:path"; import crypto from "node:crypto";
const src=process.argv[2]; if(!src) throw new Error("usage: node import-chatgpt.mjs <export-dir|conversations.json> [store]");
const root=fs.statSync(src).isDirectory()?src:path.dirname(src);
const json=fs.statSync(src).isDirectory()?path.join(src,"conversations.json"):src;
const store=process.argv[3]||path.join(process.env.LOCALAPPDATA||process.cwd(),"LeeWay","ChatGPT-Context-Bridge");
fs.mkdirSync(store,{recursive:true});
const raw=JSON.parse(fs.readFileSync(json,"utf8")); const convs=Array.isArray(raw)?raw:(raw.conversations||[]);
const out=[]; const textOf=(m)=>{const c=m?.content; if(!c)return""; if(Array.isArray(c.parts))return c.parts.filter(x=>typeof x==="string").join("\n"); return typeof c.text==="string"?c.text:"";};
for(const c of convs){const messages=[]; for(const n of Object.values(c.mapping||{})){const m=n?.message;if(!m)continue; const text=textOf(m); if(text)messages.push({id:m.id||n.id,role:m.author?.role||"unknown",time:m.create_time||null,text});} messages.sort((a,b)=>(a.time||0)-(b.time||0)); out.push({id:c.id||c.conversation_id,title:c.title||"",create_time:c.create_time||null,update_time:c.update_time||null,messages});}
const assets=[]; const walk=(d)=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(path.resolve(p)!==path.resolve(json)){const h=crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");assets.push({path:path.relative(root,p),bytes:fs.statSync(p).size,sha256:h});}}}; walk(root);
const manifest={schema:"leeway.chatgpt-context.v1",imported_at:new Date().toISOString(),source:path.resolve(json),conversations:out.length,messages:out.reduce((n,c)=>n+c.messages.length,0),assets};
fs.writeFileSync(path.join(store,"conversations.json"),JSON.stringify(out,null,2)); fs.writeFileSync(path.join(store,"manifest.json"),JSON.stringify(manifest,null,2));
console.log(JSON.stringify(manifest,null,2));
