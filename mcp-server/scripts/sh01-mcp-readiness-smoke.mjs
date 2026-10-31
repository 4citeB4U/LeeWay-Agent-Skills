/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.MCP.SH01
TAG: LEEWAY.SKILLS.MCP.SH01.PROTOCOL_QUALIFICATION
5WH:
WHAT = Exercise real LeeWay Skills stdio MCP discovery and fail-closed calls.
WHY = Separate available instructions from authorized native execution for SH-01.
WHO = LeeWay Agent Skills under LeeWay Standards and Runtime Fabric.
WHERE = mcp-server/scripts/sh01-mcp-readiness-smoke.mjs
WHEN = 2026-10-28
HOW = One Node SDK client invokes the actual built MCP subprocess.
LICENSE: MIT
AUTHORITY: SOURCE_PROTOCOL_PROOF_ONLY; no Veritas, Formula, or physical action.
*/
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const client = new Client(
  { name: 'leeway-sh01-mcp-verifier', version: '1.0.0' },
  { capabilities: {} }
);
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [fileURLToPath(new URL('../dist/index.js', import.meta.url))]
});
const textOf = result => result.content?.find(item => item.type === 'text')?.text || '';

try {
  await client.connect(transport);
  const { tools } = await client.listTools();
  const names = tools.map(t => t.name);
  assert.equal(new Set(names).size, names.length, 'MCP tool identities must be unique');
  for (const name of [
    'leeway-agent-operating-loop',
    'leeway-veritas',
    'leeway-learning-ledger',
    'leeway_compose_skills',
    'game_run_build'
  ]) assert.ok(names.includes(name), 'MCP discovery missing '+name);

  const skill = await client.callTool({
    name: 'leeway-agent-operating-loop',
    arguments: { instruction: 'Return the existing skill instructions for a read-only SH-01 audit.' }
  });
  assert.notEqual(skill.isError, true, 'Existing skill must remain discoverable');
  assert.match(textOf(skill), /SKILL DOCUMENTATION:/);
  assert.match(textOf(skill), /Do not claim execution, rendering, deployment, validation, or PASS unless it actually occurred/);

  const missing = await client.callTool({
    name: 'sh01-unregistered-nonexistent-tool',
    arguments: { instruction: 'No mutation or fallback permitted' }
  });
  assert.equal(missing.isError, true, 'Unregistered tool must not be dispatched');

  const denied = await client.callTool({
    name: 'game_run_build',
    arguments: {
      project_root: '/not-an-authorized-live-project',
      target: 'windows', configuration: 'release'
    }
  });
  const execution = JSON.parse(textOf(denied));
  assert.equal(execution.state, 'BLOCKED_ADAPTER_UNCONFIGURED');
  assert.equal(execution.executed, false);

  const invalidComposition = await client.callTool({
    name: 'leeway_compose_skills',
    arguments: {
      requestId: 'SH01-invalid-composition',
      skillIds: ['../forbidden', 'leeway-agent-operating-loop']
    }
  });
  assert.equal(invalidComposition.isError, true, 'Traversal cannot become a skill');

  console.log(JSON.stringify({
    schema: 'leeway.sh01.mcp.proof.v1',
    state: 'SOURCE_PROTOCOL_VERIFIED',
    transport: 'LOCAL_STDIO_REAL_MCP',
    discoveredToolCount: names.length,
    coreSkillRead: 'REFERENCE_ONLY',
    unsupportedTool: 'BLOCKED',
    unconfiguredNativeAction: 'BLOCKED_ADAPTER_UNCONFIGURED',
    invalidSkillComposition: 'BLOCKED',
    runtimeFabricPhysicalExecution: 'NOT_EXECUTED',
    independentProductionVeritas: 'NOT_EXECUTED',
    receiptCreated: false,
    learningUpdated: false
  }));
} finally {
  await client.close();
}
