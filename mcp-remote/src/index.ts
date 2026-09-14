#!/usr/bin/env node

import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { toNodeHandler } from '@modelcontextprotocol/node';
import * as z from 'zod/v4';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const skillsRoot = path.join(repoRoot, 'skills');

const port = Number(process.env.PORT || process.env.LEEWAY_MCP_PORT || '8788');
const host = process.env.LEEWAY_MCP_HOST || '0.0.0.0';
const bearer = process.env.LEEWAY_MCP_BEARER_TOKEN || '';
const publicReadonly = (process.env.LEEWAY_MCP_PUBLIC_READONLY || '').toLowerCase() === 'true';
const allowedHosts = (process.env.LEEWAY_MCP_ALLOWED_HOSTS || '')
  .split(',')
  .map(v => v.trim().toLowerCase())
  .filter(Boolean);

interface SkillEntry {
  name: string;
  description: string;
  path: string;
  content: string;
}

function textResult(text: string) {
  return { content: [{ type: 'text' as const, text }] };
}

function parseFrontmatter(content: string, fallbackName: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  let name = fallbackName;
  let description = 'LeeWay Agent Skill';

  if (lines[0]?.trim() === '---') {
    const end = lines.slice(1).findIndex(line => line.trim() === '---');
    if (end >= 0) {
      for (const line of lines.slice(1, end + 1)) {
        const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (!match) continue;
        const key = match[1].toLowerCase();
        const value = match[2].trim().replace(/^['"]|['"]$/g, '');
        if (key === 'name' && value) name = value;
        if (key === 'description' && value && value !== '>' && value !== '|') description = value;
      }
    }
  }

  return { name, description };
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
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist') continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile() && entry.name === 'SKILL.md') found.push(full);
    }
  }

  await walk(root);
  return found.sort();
}

let skillCache: SkillEntry[] | null = null;
let skillCacheAt = 0;
const CACHE_MS = 30_000;

async function loadSkills(): Promise<SkillEntry[]> {
  if (skillCache && Date.now() - skillCacheAt < CACHE_MS) return skillCache;

  const files = await findSkillFiles(skillsRoot);
  const skills: SkillEntry[] = [];

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const folder = path.basename(path.dirname(file));
      const meta = parseFrontmatter(content, folder);
      skills.push({
        name: meta.name,
        description: meta.description,
        path: path.relative(repoRoot, file).replace(/\\/g, '/'),
        content,
      });
    } catch {
      // Ignore unreadable skill files; callers can still see all valid skills.
    }
  }

  skillCache = skills;
  skillCacheAt = Date.now();
  return skills;
}

async function findSkill(name: string): Promise<SkillEntry | undefined> {
  const needle = name.trim().toLowerCase();
  const skills = await loadSkills();
  return skills.find(skill =>
    skill.name.toLowerCase() === needle ||
    skill.path.toLowerCase().includes(`/${needle}/`) ||
    path.basename(path.dirname(skill.path)).toLowerCase() === needle,
  );
}

function buildServer(): McpServer {
  const server = new McpServer({
    name: 'leeway-agent-skills-remote',
    version: '1.0.0',
  });

  server.registerTool(
    'list_leeway_skills',
    {
      description: 'List LeeWay Agent Skills, optionally filtered by text. Read-only.',
      inputSchema: z.object({
        query: z.string().optional(),
        limit: z.number().int().min(1).max(200).default(50),
      }),
    },
    async ({ query, limit }) => {
      const skills = await loadSkills();
      const q = (query || '').trim().toLowerCase();
      const filtered = q
        ? skills.filter(s => `${s.name} ${s.description} ${s.path}`.toLowerCase().includes(q))
        : skills;

      return textResult(JSON.stringify(filtered.slice(0, limit).map(s => ({
        name: s.name,
        description: s.description,
        path: s.path,
      })), null, 2));
    },
  );

  server.registerTool(
    'read_leeway_skill',
    {
      description: 'Read one canonical LeeWay SKILL.md by skill name or folder slug. Read-only.',
      inputSchema: z.object({ name: z.string().min(1) }),
    },
    async ({ name }) => {
      const skill = await findSkill(name);
      if (!skill) return textResult(`SKILL_NOT_FOUND: ${name}`);
      return textResult(skill.content);
    },
  );

  server.registerTool(
    'search_leeway_skills',
    {
      description: 'Search LeeWay skill names, descriptions, paths and SKILL.md content. Read-only.',
      inputSchema: z.object({
        query: z.string().min(1),
        limit: z.number().int().min(1).max(50).default(10),
      }),
    },
    async ({ query, limit }) => {
      const q = query.toLowerCase();
      const skills = await loadSkills();
      const matches = skills
        .filter(s => `${s.name}\n${s.description}\n${s.path}\n${s.content}`.toLowerCase().includes(q))
        .slice(0, limit)
        .map(s => ({ name: s.name, description: s.description, path: s.path }));
      return textResult(JSON.stringify(matches, null, 2));
    },
  );

  server.registerTool(
    'get_leeway_authority',
    {
      description: 'Read the canonical LeeWay AGENTS.md runtime authority map. Read-only.',
      inputSchema: z.object({}),
    },
    async () => {
      const content = await fs.readFile(path.join(repoRoot, 'AGENTS.md'), 'utf8');
      return textResult(content);
    },
  );

  server.registerTool(
    'prepare_leeway_handoff',
    {
      description: 'Create a LeeWay Intermodel Envelope for a model-to-model handoff. Does not execute Formula or mutate data.',
      inputSchema: z.object({
        task_id: z.string().min(1),
        creator_instruction: z.string().min(1),
        goal: z.string().min(1),
        audience: z.string().default('unspecified'),
        requested_capability: z.string().min(1),
        hard_constraints: z.array(z.string()).default([]),
        source_manifest: z.array(z.object({
          id: z.string(),
          type: z.string(),
          location: z.string(),
          purpose: z.string().optional(),
        })).default([]),
        verification_requirements: z.array(z.string()).default([]),
        return_channel: z.string().default('conversation'),
      }),
    },
    async (args) => {
      const envelope = {
        protocol_version: 'LEEWAY-INTERMODEL-v1',
        task_id: args.task_id,
        creator_instruction: args.creator_instruction,
        authority_chain: 'Creator > LeeWay Standards > Root of Trust > Runtime Fabric > Agent Lee/Harness > Formula > models/skills/MCPs/tools > execution > Veritas > receipt',
        goal: args.goal,
        audience: args.audience,
        source_manifest: args.source_manifest,
        hard_constraints: args.hard_constraints,
        claim_classes: ['CANONICAL', 'PROVEN', 'CANDIDATE', 'EXTERNAL', 'HISTORICAL', 'OPEN_GAP'],
        requested_capability: args.requested_capability,
        requested_output_schema: 'LEEWAY-INTERMODEL-v1 response envelope',
        formula_evaluator_state: 'UNEXPOSED',
        formula_execution_state: 'NOT_EXECUTED',
        verification_requirements: args.verification_requirements,
        return_channel: args.return_channel,
        timestamp: new Date().toISOString(),
      };
      return textResult(JSON.stringify(envelope, null, 2));
    },
  );

  return server;
}

function isAuthorized(req: IncomingMessage): boolean {
  if (publicReadonly) return true;
  if (!bearer) return false;
  const auth = req.headers.authorization || '';
  return auth === `Bearer ${bearer}`;
}

function hostAllowed(req: IncomingMessage): boolean {
  if (allowedHosts.length === 0) return true;
  const raw = (req.headers.host || '').toLowerCase();
  const hostname = raw.replace(/:\d+$/, '');
  return allowedHosts.includes(hostname) || allowedHosts.includes(raw);
}

const handler = createMcpHandler(buildServer, { responseMode: 'json' });
const nodeHandler = toNodeHandler(handler);

const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'leeway-agent-skills-remote',
      mode: publicReadonly ? 'PUBLIC_READONLY' : 'BEARER_REQUIRED',
    }));
    return;
  }

  if (url.pathname !== '/mcp') {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'not_found' }));
    return;
  }

  if (!hostAllowed(req)) {
    res.writeHead(403, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'host_not_allowed' }));
    return;
  }

  if (!isAuthorized(req)) {
    res.writeHead(401, {
      'content-type': 'application/json',
      'www-authenticate': 'Bearer realm="leeway-mcp"',
    });
    res.end(JSON.stringify({ error: 'unauthorized' }));
    return;
  }

  void nodeHandler(req, res);
});

httpServer.listen(port, host, () => {
  console.error(`[LeeWay Remote MCP] http://${host}:${port}/mcp`);
  console.error(`[LeeWay Remote MCP] auth=${publicReadonly ? 'PUBLIC_READONLY' : bearer ? 'BEARER_REQUIRED' : 'BLOCKED_NO_TOKEN'}`);
});
