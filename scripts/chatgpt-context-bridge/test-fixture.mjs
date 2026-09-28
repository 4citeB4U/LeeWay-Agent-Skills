import fs from "node:fs";import os from "node:os";import path from "node:path";import {execFileSync} from "node:child_process";
const d=fs.mkdtempSync(path.join(os.tmpdir(),"leeway-chatgpt-")); const store=path.join(d,"store");fs.writeFileSync(path.join(d,"asset.png"),Buffer.from([1,2,3,4]));
fs.writeFileSync(path.join(d,"conversations.json"),JSON.stringify([{id:"c1",title:"Digital Brain",mapping:{n1:{message:{id:"m1",author:{role:"user"},create_time:1,content:{parts:["dark blue 3D brain with formulas"]}}}}}]));
execFileSync(process.execPath,[new URL("./import-chatgpt.mjs",import.meta.url).pathname.slice(process.platform==="win32"?1:0),path.join(d,"conversations.json"),store],{stdio:"pipe"});
const q=execFileSync(process.execPath,[new URL("./query-chatgpt.mjs",import.meta.url).pathname.slice(process.platform==="win32"?1:0),store,"digital brain"],{encoding:"utf8"});const rows=JSON.parse(q);const man=JSON.parse(fs.readFileSync(path.join(store,"manifest.json")));
if(rows[0]?.conversation_id!=="c1")throw new Error("retrieval failed");if(!/^[a-f0-9]{64}$/.test(man.assets[0]?.sha256||""))throw new Error("asset hash failed");console.log("PASS chatgpt-context-bridge fixture");
