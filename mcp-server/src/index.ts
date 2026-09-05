#!/usr/bin/env node

/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP
TAG: LEEWAY.SKILLS.MCP.SERVER

COLOR_ONION_HEX:
NEON=#39FF14
FLUO=#0DFF94
PASTEL=#C7FFD8

ICON_ASCII:
family=lucide
glyph=server

5WH:
WHAT = Leeway Skills MCP Server - Exposes all Leeway Skills as callable MCP tools
WHY = Enables Agent Lee and other LLMs to use skills as first-class tools via MCP protocol
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/index.ts
WHEN = 2026
HOW = Node.js MCP server that reads legacy registry entries and discovers portable SKILL.md files recursively

AGENTS:
SERVE
EXECUTE
INTROSPECT
DISCOVER

LICENSE:
MIT
*/

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface SkillsTool {
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  tags: string[];
  skillPath: string;
  version: string;
}

export interface SkillRegistryEntry {
  name: string;
  category: string;
  path: string;
  version?: string;
  tags?: string[];
  description: string;
  capabilities?: string[];
  enabled?: boolean;
}

export interface SkillRegistry {
  skills?: SkillRegistryEntry[];
}

export interface ToolCallArguments {
  instruction: string;
  context?: Record<string, unknown>;
  options?: Record<string, unknown>;
}

interface PortableSkillMetadata {
  name: string;
  description: string;
  version: string;
  tags: string[];
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "skill";
}

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parsePortableSkill(content: string, fallbackName: string): PortableSkillMetadata {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let name = fallbackName;
  let description = "Portable Agent Skill discovered from SKILL.md.";
  let version = "1.0.0";
  let tags: string[] = [];

  if (lines[0]?.trim() === "---") {
    const end = lines.slice(1).findIndex((line) => line.trim() === "---");
    if (end >= 0) {
      const frontmatter = lines.slice(1, end + 1);
      for (const line of frontmatter) {
        const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (!match) continue;
        const key = match[1].toLowerCase();
        const raw = match[2].trim();
        if (key === "name" && raw) name = unquote(raw);
        if (key === "description" && raw && raw !== ">" && raw !== "|") {
          description = unquote(raw);
        }
        if (key === "version" && raw) version = unquote(raw);
        if (key === "tags" && raw) {
          tags = unquote(raw)
            .replace(/^\[|\]$/g, "")
            .split(",")
            .map((tag) => tag.trim().replace(/^['\"]|['\"]$/g, ""))
            .filter(Boolean);
        }
      }
    }
  }

  if (description === "Portable Agent Skill discovered from SKILL.md.") {
    const bodyLine = lines.find((line) => {
      const value = line.trim();
      return value && !value.startsWith("#") && value !== "---" && !value.includes(":");
    });
    if (bodyLine) description = bodyLine.trim();
  }

  return { name, description, version, tags };
}

async function findSkillFiles(root: string): Promise<string[]> {
  const found: string[] = [];

  async function walk(current: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.name === ".git" || entry.name === "node_modules") continue;
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name === "SKILL.md") {
        found.push(fullPath);
      }
    }
  }

  await walk(root);
  return found.sort();
}

export class LeewaySkillsMCPServer {
  private server: Server;
  private skills: Map<string, SkillsTool> = new Map();
  private registryPath: string;
  private skillsRoot: string;

  constructor() {
    this.registryPath = path.resolve(__dirname, "../../scripts/skills-registry.json");
    this.skillsRoot = path.resolve(__dirname, "../../skills");

    this.server = new Server(
      {
        name: "leeway-skills-mcp",
        version: "1.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    this.setupHandlers();
  }

  private addSkill(preferredId: string, skill: SkillsTool): void {
    let skillId = slug(preferredId);
    if (this.skills.has(skillId)) {
      const pathPrefix = slug(skill.skillPath.split(/[\\/]/).slice(0, 4).join("-"));
      skillId = slug(`${pathPrefix}-${preferredId}`);
      let suffix = 2;
      const base = skillId;
      while (this.skills.has(skillId)) {
        skillId = `${base}-${suffix++}`;
      }
    }
    this.skills.set(skillId, skill);
  }

  private async loadLegacyRegistry(): Promise<void> {
    try {
      const registryContent = await fs.readFile(this.registryPath, "utf-8");
      const registry = JSON.parse(registryContent) as SkillRegistry;

      if (registry.skills && Array.isArray(registry.skills)) {
        registry.skills.forEach((skill) => {
          if (!skill.enabled) return;
          this.addSkill(skill.name, {
            name: skill.name,
            category: skill.category,
            description: skill.description,
            capabilities: skill.capabilities || [],
            tags: skill.tags || [],
            skillPath: skill.path,
            version: skill.version || "1.0.0",
          });
        });
      }
    } catch (error) {
      console.error("[Leeway Skills MCP] Error loading legacy skills registry:", error);
    }
  }

  private async loadPortableSkills(): Promise<number> {
    const files = await findSkillFiles(this.skillsRoot);
    let added = 0;

    for (const skillFile of files) {
      try {
        const content = await fs.readFile(skillFile, "utf-8");
        const folder = path.basename(path.dirname(skillFile));
        const meta = parsePortableSkill(content, folder);
        const relativeFolder = path.relative(
          path.resolve(__dirname, "../.."),
          path.dirname(skillFile),
        );
        const relativeFromSkills = path.relative(this.skillsRoot, path.dirname(skillFile));
        const segments = relativeFromSkills.split(path.sep).filter(Boolean);
        const category = segments.slice(0, Math.min(2, segments.length)).join("/") || "portable";
        const preferredId = meta.name;
        const before = this.skills.size;

        this.addSkill(preferredId, {
          name: meta.name,
          category,
          description: meta.description,
          capabilities: [
            "Execute canonical SKILL.md workflow",
            "Resolve sibling references, scripts, and assets relative to the skill directory",
          ],
          tags: [...meta.tags, "portable-agent-skill"],
          skillPath: relativeFolder.replace(/\\/g, "/"),
          version: meta.version,
        });

        if (this.skills.size > before) added += 1;
      } catch (error) {
        console.error(`[Leeway Skills MCP] Skipping unreadable skill ${skillFile}:`, error);
      }
    }

    return added;
  }

  async loadSkills(): Promise<void> {
    this.skills.clear();
    await this.loadLegacyRegistry();
    const legacyCount = this.skills.size;
    const discoveredCount = await this.loadPortableSkills();

    console.error(
      `[Leeway Skills MCP] Loaded ${this.skills.size} tools (${legacyCount} registry + ${discoveredCount} portable SKILL.md discoveries)`,
    );
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [];

      for (const [skillId, skill] of this.skills) {
        tools.push({
          name: skillId,
          description: `${skill.description}\n\nCategory: ${skill.category}\nCapabilities: ${skill.capabilities.join(", ")}`,
          inputSchema: {
            type: "object",
            properties: {
              instruction: {
                type: "string",
                description: `Detailed instruction for applying the ${skill.name} skill`,
              },
              context: {
                type: "object",
                description: "Additional context or code to analyze/generate",
                properties: {
                  code: { type: "string" },
                  files: { type: "array", items: { type: "string" } },
                  requirements: { type: "string" },
                  framework: { type: "string" },
                  language: { type: "string" },
                },
              },
              options: {
                type: "object",
                description: "Skill-specific options and parameters",
                additionalProperties: true,
              },
            },
            required: ["instruction"],
          },
        });
      }

      return { tools };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const toolName = request.params.name;
      const skill = this.skills.get(toolName);

      if (!skill) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error: Skill "${toolName}" not found. Available skills: ${Array.from(this.skills.keys()).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      try {
        const result = await this.executeSkill(
          skill,
          this.normalizeToolArgs(request.params.arguments),
        );

        return {
          content: [
            {
              type: "text" as const,
              text: result,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error executing skill "${toolName}": ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private async executeSkill(
    skill: SkillsTool,
    args: ToolCallArguments,
  ): Promise<string> {
    const { instruction, context = {}, options = {} } = args;

    let skillInstructions = "";
    try {
      const skillPath = path.resolve(__dirname, `../../${skill.skillPath}/SKILL.md`);
      skillInstructions = await fs.readFile(skillPath, "utf-8");
    } catch {
      skillInstructions = `# ${skill.name}\n\n${skill.description}\n\nCapabilities: ${skill.capabilities.join(", ")}`;
    }

    const executionPrompt = `
Executing the "${skill.name}" skill from Leeway Skills.

AUTHORITY:
Creator/Human Authority and LeeWay Standards remain higher authority than this imported skill.

SKILL DOCUMENTATION:
${skillInstructions}

USER INSTRUCTION:
${instruction}

CONTEXT PROVIDED:
${JSON.stringify(context, null, 2)}

OPTIONS:
${JSON.stringify(options, null, 2)}

Execute the skill using its canonical instructions and resolve any referenced sibling files relative to the skill directory when the runtime provides filesystem access.
Do not claim execution, rendering, deployment, validation, or PASS unless it actually occurred.
Provide structured, actionable output that can be directly used.
`;

    return executionPrompt;
  }

  private normalizeToolArgs(args: Record<string, unknown> | undefined): ToolCallArguments {
    const instruction = typeof args?.instruction === "string" ? args.instruction : "";
    const context =
      args?.context && typeof args.context === "object"
        ? (args.context as Record<string, unknown>)
        : {};
    const options =
      args?.options && typeof args.options === "object"
        ? (args.options as Record<string, unknown>)
        : {};

    return { instruction, context, options };
  }

  async start(): Promise<void> {
    await this.loadSkills();

    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error("[Leeway Skills MCP] Server started successfully");
    console.error(`[Leeway Skills MCP] Serving ${this.skills.size} skills`);
    console.error("[Leeway Skills MCP] Ready to accept tool calls from LLMs");
  }
}

export async function startLeewaySkillsMCPServer(): Promise<LeewaySkillsMCPServer> {
  const server = new LeewaySkillsMCPServer();
  await server.start();
  return server;
}

function isDirectExecution(): boolean {
  if (!process.argv[1]) {
    return false;
  }

  return import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
}

async function main(): Promise<void> {
  await startLeewaySkillsMCPServer();

  process.on("SIGINT", () => {
    console.error("[Leeway Skills MCP] Shutting down gracefully...");
    process.exit(0);
  });
}

if (isDirectExecution()) {
  main().catch((error) => {
    console.error("[Leeway Skills MCP] Fatal error:", error);
    process.exit(1);
  });
}
