#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.REMOTE
TAG: LEEWAY.SKILLS.MCP.REMOTE.GATEWAY

5WH:
WHAT = Universal LeeWay remote MCP gateway and privacy-minimal administration portal
WHY = Give remote MCP hosts one governed HTTP endpoint with deterministic context routing and current skills
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/http.ts
WHEN = 2026
HOW = MCP v2 createMcpHandler over Node HTTP plus read-only operational APIs and live registry loading

AGENTS:
SERVE
ROUTE
INTROSPECT

LICENSE:
MIT
*/

import { createServer, IncomingMessage, ServerResponse } from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import { toNodeHandler } from "@modelcontextprotocol/node";
import * as z from "zod/v4";
import {
  ContextSetId,
  getContextSet,
  getSystemDefinitions,
  getTelemetry,
  observeConnection,
  routeContext,
} from "./context-harness.js";

interface SkillRegistryEntry {
  name: string;
  category: string;
  path: string;
  version?: string;
  tags?: string[];
  description: string;
  capabilities?: string[];
  enabled?: boolean;
}

interface SkillRegistry {
  version?: string;
  totalSkills?: number;
  totalCategories?: number;
  lastUpdated?: string;
  skills?: SkillRegistryEntry[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../..");
const REGISTRY_PATH = path.join(REPO_ROOT, "scripts", "skills-registry.json");
const PORT = Number.parseInt(process.env.PORT || process.env.LEEWAY_MCP_PORT || "8788", 10);
const HOST = process.env.LEEWAY_MCP_HOST || "0.0.0.0";
const ADMIN_TOKEN = process.env.LEEWAY_ADMIN_TOKEN?.trim() || "";

async function loadRegistry(): Promise<SkillRegistry> {
  const raw = await fs.readFile(REGISTRY_PATH, "utf8");
  return JSON.parse(raw) as SkillRegistry;
}

function skillId(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function loadSkillInstructions(skill: SkillRegistryEntry): Promise<string> {
  try {
    return await fs.readFile(path.join(REPO_ROOT, skill.path, "SKILL.md"), "utf8");
  } catch {
    return `# ${skill.name}\n\n${skill.description}\n\nCapabilities: ${(skill.capabilities || []).join(", ")}`;
  }
}

function registerContextPrimitives(server: McpServer): void {
  server.registerTool(
    "leeway_context_route",
    {
      title: "Route LeeWay Context",
      description:
        "Deterministically maps intent to the minimum configured LeeWay context sets. Does not invent missing runtime or Veritas state.",
      inputSchema: z.object({
        intent: z.string().min(1),
        requestedSets: z.array(z.enum(["A", "B", "C", "D"])).optional(),
      }),
    },
    async ({ intent, requestedSets }) => {
      const routed = await routeContext(intent, requestedSets as ContextSetId[] | undefined);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(routed, null, 2) }],
        structuredContent: routed,
      };
    },
  );

  server.registerTool(
    "leeway_gateway_status",
    {
      title: "LeeWay Gateway Status",
      description: "Returns observed gateway telemetry and configured context-system definitions without captured prompt content.",
    },
    async () => {
      const output = {
        status: "OBSERVED",
        protocol: "MCP 2026-07-28 with stateless legacy fallback",
        systems: getSystemDefinitions(),
        telemetry: getTelemetry(),
      };
      return {
        content: [{ type: "text" as const, text: JSON.stringify(output, null, 2) }],
        structuredContent: output,
      };
    },
  );

  for (const id of ["A", "B", "C", "D"] as ContextSetId[]) {
    server.registerResource(
      `leeway-context-set-${id.toLowerCase()}`,
      `leeway://context/set-${id.toLowerCase()}`,
      {
        title: `LeeWay Context Set ${id}`,
        description: getSystemDefinitions()[id].purpose,
        mimeType: "application/json",
      },
      async (uri) => {
        const set = await getContextSet(id);
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify(set, null, 2),
            },
          ],
        };
      },
    );
  }

  server.registerResource(
    "leeway-gateway-telemetry",
    "leeway://gateway/telemetry",
    {
      title: "LeeWay MCP Gateway Telemetry",
      description: "Privacy-minimal observed client/model/request metadata. Prompt content capture is disabled.",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(getTelemetry(), null, 2),
        },
      ],
    }),
  );

  server.registerPrompt(
    "leeway-governed-context",
    {
      title: "LeeWay Governed Context",
      description: "Build a deterministic pre-packaged LeeWay context payload for a stated intent.",
      argsSchema: z.object({ intent: z.string().min(1) }),
    },
    async ({ intent }) => {
      const routed = await routeContext(intent);
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text:
                "Use this LeeWay evidence payload as system-state context. Preserve each evidence status; do not promote UNVERIFIED or FAILED data to fact.\n\n" +
                JSON.stringify(routed, null, 2),
            },
          },
        ],
      };
    },
  );
}

async function buildMcpServer(): Promise<McpServer> {
  const server = new McpServer(
    {
      name: "leeway-context-gateway",
      version: "1.1.0",
      description: "Governed LeeWay skills and deterministic context gateway",
    },
    { capabilities: { tools: {}, resources: {}, prompts: {} } },
  );

  registerContextPrimitives(server);

  const registry = await loadRegistry();
  for (const skill of registry.skills || []) {
    if (!skill.enabled) continue;
    server.registerTool(
      skillId(skill.name),
      {
        title: skill.name,
        description: `${skill.description}\nCategory: ${skill.category}\nCapabilities: ${(skill.capabilities || []).join(", ")}`,
        inputSchema: z.object({
          instruction: z.string().min(1),
          context: z.record(z.string(), z.unknown()).optional(),
          options: z.record(z.string(), z.unknown()).optional(),
        }),
      },
      async ({ instruction, context = {}, options = {} }) => {
        const instructions = await loadSkillInstructions(skill);
        const executionPrompt = [
          `Executing the \"${skill.name}\" LeeWay skill.`,
          "",
          "SKILL DOCUMENTATION:",
          instructions,
          "",
          "USER INSTRUCTION:",
          instruction,
          "",
          "CONTEXT PROVIDED:",
          JSON.stringify(context, null, 2),
          "",
          "OPTIONS:",
          JSON.stringify(options, null, 2),
          "",
          "Execute under the skill documentation and preserve evidence status. This MCP surface supplies governed instructions; it does not fabricate execution receipts.",
        ].join("\n");
        return { content: [{ type: "text" as const, text: executionPrompt }] };
      },
    );
  }

  return server;
}

const mcpHandler = createMcpHandler(() => buildMcpServer());
const nodeMcpHandler = toNodeHandler(mcpHandler, {
  onerror: (error) => console.error("[LeeWay MCP] adapter error", error),
});

function json(res: ServerResponse, status: number, value: unknown): void {
  const body = JSON.stringify(value, null, 2);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

function text(res: ServerResponse, status: number, value: string, type = "text/plain; charset=utf-8"): void {
  res.writeHead(status, {
    "content-type": type,
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(value),
  });
  res.end(value);
}

function isAdminAuthorized(req: IncomingMessage): boolean {
  if (!ADMIN_TOKEN) return false;
  const header = req.headers.authorization || "";
  return header === `Bearer ${ADMIN_TOKEN}`;
}

function isHostAllowed(req: IncomingMessage): boolean {
  const host = (req.headers.host || "").split(":")[0].toLowerCase();
  const configured = (process.env.LEEWAY_ALLOWED_HOSTS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  if (configured.length > 0) return configured.includes(host);
  if (process.env.NODE_ENV === "production") return false;
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function adminHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>LeeWay MCP Context Gateway</title>
<style>
:root{color-scheme:dark;--bg:#050807;--panel:#0c1310;--line:#1b3226;--text:#e8fff0;--muted:#94ad9c;--accent:#39ff14}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top,#0d1912,#050807 52%);color:var(--text);font:15px/1.5 Inter,ui-sans-serif,system-ui,sans-serif}main{max-width:1180px;margin:auto;padding:34px 20px 70px}.eyebrow{color:var(--accent);letter-spacing:.18em;text-transform:uppercase;font-size:12px}.hero{display:grid;grid-template-columns:1.3fr .7fr;gap:18px;align-items:end;margin-bottom:22px}h1{font-size:clamp(34px,6vw,68px);line-height:.95;margin:10px 0}.sub{color:var(--muted);max-width:760px}.endpoint{border:1px solid var(--line);background:#08100b;padding:16px;border-radius:12px}.endpoint code{color:var(--accent)}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card,.panel{border:1px solid var(--line);background:linear-gradient(180deg,#0d1511,#080d0a);border-radius:14px;padding:16px}.card{cursor:pointer;min-height:150px}.card:hover{border-color:#376849}.label{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.12em}.big{font-size:28px;font-weight:700;margin:6px 0}.status{font-size:12px;color:var(--accent)}.row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}.topology{display:flex;align-items:center;justify-content:center;gap:10px;min-height:170px;flex-wrap:wrap}.node{border:1px solid var(--line);padding:10px 13px;border-radius:999px}.arrow{color:var(--accent)}table{width:100%;border-collapse:collapse;font-size:13px}th,td{text-align:left;border-bottom:1px solid var(--line);padding:9px 6px}th{color:var(--muted)}pre{white-space:pre-wrap;word-break:break-word;color:#c6f7d3}.note{margin-top:14px;color:var(--muted);font-size:13px}@media(max-width:800px){.hero,.row{grid-template-columns:1fr}.grid{grid-template-columns:1fr 1fr}}@media(max-width:520px){.grid{grid-template-columns:1fr}}
</style>
</head>
<body><main>
<div class="hero"><div><div class="eyebrow">LeeWay Industries · MCP Harness</div><h1>Zero Search Debt<br/>Context Gateway</h1><div class="sub">One governed remote MCP endpoint for ChatGPT-compatible hosts, Claude-compatible hosts, Gemini-compatible hosts, IDEs and LeeWay clients. Context sets are deterministically routed; missing evidence fails closed instead of being invented.</div></div><div class="endpoint"><div class="label">Remote MCP endpoint</div><code id="endpoint"></code><div class="note">Streamable HTTP · MCP 2026-07-28 · legacy stateless fallback</div></div></div>
<div id="systems" class="grid"></div>
<div class="row"><section class="panel"><div class="label">Connection topology</div><div class="topology"><span class="node">LLM / Agent</span><span class="arrow">→</span><span class="node">/mcp</span><span class="arrow">→</span><span class="node">Intent Router</span><span class="arrow">→</span><span class="node">A · B · C · D</span></div><div class="note">Tool/resource data can change behind the same endpoint without client disconnects. Individual MCP hosts may still require a catalog refresh to expose newly added tool schemas.</div></section><section class="panel"><div class="label">Observed telemetry</div><div class="big" id="requests">0 requests</div><div id="routes">0 context routes</div><div id="clients">0 observed clients</div><div class="note">Prompt/content capture is OFF. Client/model fields appear only when the caller declares them in headers or user-agent metadata.</div></section></div>
<section class="panel" style="margin-top:12px"><div class="label">Connected clients / models</div><table><thead><tr><th>Client</th><th>Model</th><th>Method</th><th>Requests</th><th>Last seen</th></tr></thead><tbody id="connections"></tbody></table></section>
<section class="panel" style="margin-top:12px"><div class="label">Selected system evidence</div><pre id="detail">Select System A, B, C or D.</pre></section>
</main>
<script>
const esc=s=>String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
document.getElementById('endpoint').textContent=location.origin+'/mcp';
async function refresh(){const [systems,telemetry]=await Promise.all([fetch('/api/systems').then(r=>r.json()),fetch('/api/telemetry').then(r=>r.json())]);const el=document.getElementById('systems');el.innerHTML='';Object.entries(systems.systems).forEach(([id,s])=>{const d=document.createElement('article');d.className='card';d.innerHTML='<div class="label">System '+esc(id)+'</div><div class="big">Set '+esc(id)+'</div><div>'+esc(s.name)+'</div><div class="status">'+esc(s.status)+'</div>';d.onclick=()=>{document.getElementById('detail').textContent=JSON.stringify(s,null,2)};el.appendChild(d)});document.getElementById('requests').textContent=telemetry.totalRequests+' requests';document.getElementById('routes').textContent=telemetry.contextRoutes+' context routes';document.getElementById('clients').textContent=telemetry.activeObservedClients+' observed clients';document.getElementById('connections').innerHTML=(telemetry.connections||[]).map(c=>'<tr><td>'+esc(c.client)+'</td><td>'+esc(c.model)+'</td><td>'+esc(c.method)+'</td><td>'+esc(c.requestCount)+'</td><td>'+esc(c.lastSeen)+'</td></tr>').join('')||'<tr><td colspan="5">No MCP clients observed yet.</td></tr>'}
refresh();setInterval(refresh,5000);
</script></body></html>`;
}

async function systemSnapshot(): Promise<Record<string, unknown>> {
  const systems: Record<string, unknown> = {};
  for (const id of ["A", "B", "C", "D"] as ContextSetId[]) {
    const set = await getContextSet(id);
    systems[id] = {
      name: set.name,
      purpose: set.purpose,
      status: set.status,
      source: set.source,
      sha256: set.sha256,
      observedAt: set.observedAt,
      data: set.data,
    };
  }
  return systems;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/healthz") {
      return json(res, 200, {
        status: "OBSERVED",
        service: "leeway-context-gateway",
        version: "1.1.0",
        protocol: "MCP 2026-07-28",
      });
    }

    if (url.pathname === "/" && req.method === "GET") {
      return text(res, 200, adminHtml(), "text/html; charset=utf-8");
    }

    if (url.pathname === "/api/telemetry" && req.method === "GET") {
      return json(res, 200, getTelemetry());
    }

    if (url.pathname === "/api/systems" && req.method === "GET") {
      return json(res, 200, { status: "OBSERVED", systems: await systemSnapshot() });
    }

    if (url.pathname === "/api/context/route" && req.method === "GET") {
      const intent = url.searchParams.get("intent") || "";
      if (!intent.trim()) return json(res, 400, { status: "FAILED", error: "intent query parameter is required" });
      return json(res, 200, await routeContext(intent));
    }

    if (url.pathname === "/api/admin/config" && req.method === "GET") {
      if (!isAdminAuthorized(req)) return json(res, 401, { status: "BLOCKED", error: "admin authorization required" });
      return json(res, 200, {
        status: "OBSERVED",
        configuredSets: Object.entries(getSystemDefinitions()).map(([id, definition]) => ({
          id,
          environmentVariable: definition.env,
          configured: Boolean(process.env[definition.env]),
        })),
        allowedHostsConfigured: Boolean(process.env.LEEWAY_ALLOWED_HOSTS),
        adminTokenConfigured: Boolean(ADMIN_TOKEN),
        contentCapture: false,
      });
    }

    if (url.pathname === "/mcp") {
      if (!isHostAllowed(req)) {
        return json(res, 403, {
          status: "BLOCKED",
          error: "Host is not authorized. Set LEEWAY_ALLOWED_HOSTS for production deployment.",
        });
      }
      observeConnection({
        client: req.headers["x-leeway-client-id"] as string | undefined,
        model: req.headers["x-leeway-model"] as string | undefined,
        userAgent: req.headers["user-agent"],
        method: req.headers["mcp-method"] as string | undefined,
        name: req.headers["mcp-name"] as string | undefined,
      });
      await nodeMcpHandler(req, res);
      return;
    }

    return json(res, 404, { status: "FAILED", error: "not found" });
  } catch (error) {
    console.error("[LeeWay MCP] request failure", error);
    if (!res.headersSent) {
      return json(res, 500, {
        status: "FAILED",
        error: error instanceof Error ? error.message : String(error),
      });
    }
    res.end();
  }
});

server.listen(PORT, HOST, () => {
  console.error(`[LeeWay MCP] Remote gateway listening on http://${HOST}:${PORT}`);
  console.error("[LeeWay MCP] MCP endpoint: /mcp");
  console.error("[LeeWay MCP] Admin portal: /");
  if (process.env.NODE_ENV === "production" && !process.env.LEEWAY_ALLOWED_HOSTS) {
    console.error("[LeeWay MCP] BLOCKED: production /mcp requests require LEEWAY_ALLOWED_HOSTS");
  }
});
