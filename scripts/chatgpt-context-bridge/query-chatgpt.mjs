import fs from "node:fs"; import path from "node:path";
const store=process.argv[2]||path.join(process.env.LOCALAPPDATA||process.cwd(),"LeeWay","ChatGPT-Context-Bridge"); const q=(process.argv.slice(3).join(" ")||"").toLowerCase();
const cs=JSON.parse(fs.readFileSync(path.join(store,"conversations.json"),"utf8")); const terms=q.split(/\s+/).filter(Boolean);
const rows=[]; for(const c of cs){for(const m of c.messages){const hay=(c.title+" "+m.text).toLowerCase();const score=terms.reduce((n,t)=>n+(hay.includes(t)?1:0),0);if(score)rows.push({score,conversation_id:c.id,title:c.title,message_id:m.id,role:m.role,time:m.time,snippet:m.text.slice(0,800)});}}
rows.sort((a,b)=>b.score-a.score); console.log(JSON.stringify(rows.slice(0,25),null,2));
