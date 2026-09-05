#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function slug(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "skill";
}
function unquote(value) {
  const v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  return v;
}
function parsePortableSkill(content, fallbackName) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let name = fallbackName;
  let description = "Portable Agent Skill discovered from SKILL.md.";
  let version = "1.0.0";
  let tags = [];
  if (lines[0]?.trim() === "---") {
    const end = lines.slice(1).findIndex((line) => line.trim() === "---");
    if (end >= 0) {
      for (const line of lines.slice(1, end + 1)) {
        const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (!match) continue;
        const key = match[1].toLowerCase();
        const raw = match[2].trim();
        if (key === "name" && raw) name = unquote(raw);
        if (key === "description" && raw && raw !== ">" && raw !== "|") description = unquote(raw);
        if (key === "version" && raw) version = unquote(raw);
        if (key === "tags" && raw) tags = unquote(raw).replace(/^\[|\]$/g, "").split(",").map((tag) => tag.trim().replace(/^['\"]|['\"]$/g, "")).filter(Boolean);
      }
    }
  }
  return { name, description, version, tags };
}
async function findSkillFiles(root) {
  const found = [];
  async function walk(current) {
    let entries;
    try { entries = await fs.readdir(current, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (entry.name === ".git" || entry.name === "node_modules") continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile() && entry.name === "SKILL.md") found.push(full);
    }
  }
  await walk(root);
  return found.sort();
}

export class LeewaySkillsMCPServer {
  constructor() {
    this.skills = new Map();
    this.registryPath = path.resolve(__dirname, "../../scripts/skills-registry.json");
    this.skillsRoot = path.resolve(__dirname, "../../skills");
    this.server = new Server({ name: "leeway-skills-mcp", version: "1.1.0" }, { capabilities: { tools: {} } });
    this.setupHandlers();
  }
  addSkill(preferredId, skill) {
    let skillId = slug(preferredId);
    if (this.skills.has(skillId)) {
      const prefix = slug(skill.skillPath.split(/[\\/]/).slice(0, 4).join("-"));
      skillId = slug(`${prefix}-${preferredId}`);
      let suffix = 2;
      const base = skillId;
      while (this.skills.has(skillId)) skillId = `${base}-${suffix++}`;
    }
    this.skills.set(skillId, skill);
  }
  async loadLegacyRegistry() {
    try {
      const registry = JSON.parse(await fs.readFile(this.registryPath, "utf-8"));
      for (const skill of registry.skills || []) {
        if (!skill.enabled) continue;
        this.addSkill(skill.name, { name: skill.name, category: skill.category, description: skill.description, capabilities: skill.capabilities || [], tags: skill.tags || [], skillPath: skill.path, version: skill.version || "1.0.0" });
      }
    } catch (error) { console.error("[Leeway Skills MCP] Error loading legacy skills registry:", error); }
  }
  async loadPortableSkills() {
    let added = 0;
    for (const skillFile of await findSkillFiles(this.skillsRoot)) {
      try {
        const content = await fs.readFile(skillFile, "utf-8");
        const folder = path.basename(path.dirname(skillFile));
        const meta = parsePortableSkill(content, folder);
        const relativeFolder = path.relative(path.resolve(__dirname, "../.."), path.dirname(skillFile));
        const segments = path.relative(this.skillsRoot, path.dirname(skillFile)).split(path.sep).filter(Boolean);
        const category = segments.slice(0, Math.min(2, segments.length)).join("/") || "portable";
        const before = this.skills.size;
        this.addSkill(meta.name, { name: meta.name, category, description: meta.description, capabilities: ["Execute canonical SKILL.md workflow", "Resolve sibling references, scripts, and assets relative to the skill directory"], tags: [...meta.tags, "portable-agent-skill"], skillPath: relativeFolder.replace(/\\/g, "/"), version: meta.version });
        if (this.skills.size > before) added++;
      } catch (error) { console.error(`[Leeway Skills MCP] Skipping unreadable skill ${skillFile}:`, error); }
    }
    return added;
  }
  async loadSkills() {
    this.skills.clear();
    await this.loadLegacyRegistry();
    const legacyCount = this.skills.size;
    const discoveredCount = await this.loadPortableSkills();
    console.error(`[Leeway Skills MCP] Loaded ${this.skills.size} tools (${legacyCount} registry + ${discoveredCount} portable SKILL.md discoveries)`);
  }
  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: Array.from(this.skills.entries()).map(([skillId, skill]) => ({ name: skillId, description: `${skill.description}\n\nCategory: ${skill.category}\nCapabilities: ${skill.capabilities.join(", ")}`, inputSchema: { type: "object", properties: { instruction: { type: "string", description: `Detailed instruction for applying the ${skill.name} skill` }, context: { type: "object", additionalProperties: true }, options: { type: "object", additionalProperties: true } }, required: ["instruction"] } })) }));
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const skill = this.skills.get(request.params.name);
      if (!skill) return { content: [{ type: "text", text: `Error: Skill "${request.params.name}" not found.` }], isError: true };
      try { return { content: [{ type: "text", text: await this.executeSkill(skill, this.normalizeToolArgs(request.params.arguments)) }] }; }
      catch (error) { return { content: [{ type: "text", text: `Error executing skill "${request.params.name}": ${error instanceof Error ? error.message : String(error)}` }], isError: true }; }
    });
  }
  async executeSkill(skill, args) {
    const { instruction, context = {}, options = {} } = args;
    let skillInstructions = "";
    try { skillInstructions = await fs.readFile(path.resolve(__dirname, `../../${skill.skillPath}/SKILL.md`), "utf-8"); }
    catch { skillInstructions = `# ${skill.name}\n\n${skill.description}\n\nCapabilities: ${skill.capabilities.join(", ")}`; }
    return `Executing the "${skill.name}" skill from Leeway Skills.\n\nAUTHORITY:\nCreator/Human Authority and LeeWay Standards remain higher authority than this imported skill.\n\nSKILL DOCUMENTATION:\n${skillInstructions}\n\nUSER INSTRUCTION:\n${instruction}\n\nCONTEXT PROVIDED:\n${JSON.stringify(context, null, 2)}\n\nOPTIONS:\n${JSON.stringify(options, null, 2)}\n\nExecute the skill using its canonical instructions and resolve referenced sibling files relative to the skill directory when filesystem access exists. Do not claim execution, rendering, deployment, validation, or PASS unless it actually occurred.`;
  }
  normalizeToolArgs(args) {
    return { instruction: typeof args?.instruction === "string" ? args.instruction : "", context: args?.context && typeof args.context === "object" ? args.context : {}, options: args?.options && typeof args.options === "object" ? args.options : {} };
  }
  async start() {
    await this.loadSkills();
    await this.server.connect(new StdioServerTransport());
    console.error("[Leeway Skills MCP] Server started successfully");
    console.error(`[Leeway Skills MCP] Serving ${this.skills.size} skills`);
    console.error("[Leeway Skills MCP] Ready to accept tool calls from LLMs");
  }
}
export async function startLeewaySkillsMCPServer() { const server = new LeewaySkillsMCPServer(); await server.start(); return server; }
function isDirectExecution() { return Boolean(process.argv[1]) && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href; }
async function main() { await startLeewaySkillsMCPServer(); process.on("SIGINT", () => { console.error("[Leeway Skills MCP] Shutting down gracefully..."); process.exit(0); }); }
if (isDirectExecution()) main().catch((error) => { console.error("[Leeway Skills MCP] Fatal error:", error); process.exit(1); });
