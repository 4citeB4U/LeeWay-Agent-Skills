import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'leeway-portability-'));
const client = new Client({ name: 'leeway-portability-verifier', version: '1.0.0' }, { capabilities: {} });
try {
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [fileURLToPath(new URL('../dist/index.js', import.meta.url))], cwd }));
  const { tools } = await client.listTools();
  for (const name of ['leeway-formula-governance', 'leeway-human-conversation', 'leeway-triposr']) {
    assert.ok(tools.some(tool => tool.name === name));
    const response = await client.callTool({ name, arguments: { instruction: 'Retrieve instructions for portability verification only.' } });
    assert.ok(!response.isError);
    const text = response.content?.find(item => item.type === 'text')?.text;
    assert.ok(text?.includes('LeeWay ecosystem portability law'));
    assert.ok(text?.includes('PLATFORM_TESTED'));
    assert.ok(text?.includes('SKILL DOCUMENTATION:'));
  }
  console.log(JSON.stringify({ status: 'PASS', platform: process.platform, unrelatedWorkingDirectory: true, sharedPortabilityApplied: true, toolCount: tools.length }));
} finally {
  await client.close();
  await fs.rmdir(cwd); // Only the empty temporary directory created by this test.
}
