import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:net';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
const socket = createServer();
socket.listen(0, '127.0.0.1');
await once(socket, 'listening');
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const token = randomUUID();
const server = spawn(process.execPath, [fileURLToPath(new URL('../../mcp-remote/dist/index.js', import.meta.url))], { env: { ...process.env, PORT: String(port), LEEWAY_MCP_HOST: '127.0.0.1', LEEWAY_MCP_BEARER_TOKEN: token, LEEWAY_MCP_PUBLIC_READONLY: 'false' }, stdio: ['ignore', 'pipe', 'pipe'] });
const client = new Client({ name: 'leeway-remote-portability-verifier', version: '1.0.0' }, { capabilities: {} });
try {
  await new Promise((resolve, reject) => {
    let text = '';
    const timer = setTimeout(() => reject(new Error(`Remote startup timed out: ${text}`)), 10000);
    server.once('error', error => { clearTimeout(timer); reject(error); });
    server.once('exit', code => { clearTimeout(timer); reject(new Error(`Remote exit ${code}: ${text}`)); });
    server.stderr.on('data', data => { text += data; if (text.includes('auth=BEARER_REQUIRED')) { clearTimeout(timer); resolve(); } });
  });
  const url = new URL(`http://127.0.0.1:${port}/mcp`);
  const denied = await fetch(url);
  assert.equal(denied.status, 401);
  await client.connect(new StreamableHTTPClientTransport(url, { requestInit: { headers: { authorization: `Bearer ${token}` } } }));
  const result = await client.callTool({ name: 'read_leeway_skill', arguments: { name: 'leeway-human-conversation' } });
  assert.ok(!result.isError);
  assert.ok(result.content?.some(item => item.type === 'text' && item.text.includes('LeeWay ecosystem portability law') && item.text.includes('SKILL DOCUMENTATION:')));
  console.log(JSON.stringify({ status: 'PASS', transport: 'authenticated-local-HTTP-MCP', sharedPortabilityApplied: true }));
} finally {
  await client.close();
  if (server.exitCode === null) { const ended = once(server, 'exit'); server.kill(); await ended; }
}
