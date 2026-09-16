/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.TOOLS.MARKETING.TEST
TAG: LEEWAY.TOOLS.MARKETING.CLI_FAILURE_PATHS

5WH:
WHAT = Failure-path tests for locally hardened imported marketing CLIs
WHY = Prove secrets stay behind protected channels and failed operations return nonzero status
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = tools/external/marketingskills/tests/cli-failure-paths.test.mjs
WHEN = 2026
HOW = Spawn the real CLI entrypoints with isolated environments and a local HTTP failure server

LICENSE:
MIT
*/

import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { createServer } from 'node:http'
import test from 'node:test'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const testRoot = path.dirname(fileURLToPath(import.meta.url))
const cliRoot = path.resolve(testRoot, '..', 'clis')

function runSync(script, args, env) {
  return spawnSync(process.execPath, [path.join(cliRoot, script), ...args], {
    env: { ...process.env, ...env },
    encoding: 'utf8',
  })
}

function runAsync(script, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(cliRoot, script), ...args], {
      env: { ...process.env, ...env },
    })
    let stdout = ''
    let stderr = ''
    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')
    child.stdout.on('data', chunk => { stdout += chunk })
    child.stderr.on('data', chunk => { stderr += chunk })
    child.on('error', reject)
    child.on('close', (status, signal) => resolve({ status, signal, stdout, stderr }))
  })
}

test('GA4 rejects command-line API secrets without echoing them', () => {
  const secret = 'must-not-appear-in-output'
  const result = runSync('ga4.js', [
    'events', 'send', '--measurement-id', 'G-TEST', '--api-secret', secret,
    '--client-id', 'client-1', '--event-name', 'test_event', '--dry-run',
  ], { GA4_ACCESS_TOKEN: 'test-access-token', GA4_API_SECRET: '' })

  assert.equal(result.status, 1)
  assert.match(result.stdout, /--api-secret is not accepted/)
  assert.doesNotMatch(`${result.stdout}${result.stderr}`, new RegExp(secret))
})

test('GA4 reads its API secret from the environment and masks dry-run output', () => {
  const secret = 'environment-only-secret'
  const result = runSync('ga4.js', [
    'events', 'send', '--measurement-id', 'G-TEST', '--client-id', 'client-1',
    '--event-name', 'test_event', '--dry-run',
  ], { GA4_ACCESS_TOKEN: 'test-access-token', GA4_API_SECRET: secret })

  assert.equal(result.status, 0)
  const payload = JSON.parse(result.stdout)
  assert.equal(payload._dry_run, true)
  assert.doesNotMatch(`${result.stdout}${result.stderr}`, new RegExp(secret))
})

test('ActiveCampaign validation failures return a nonzero status', () => {
  const result = runSync('activecampaign.js', ['contacts', 'get', '--dry-run'], {
    ACTIVECAMPAIGN_API_KEY: 'test-key',
    ACTIVECAMPAIGN_API_URL: 'https://example.invalid',
  })

  assert.equal(result.status, 1)
  assert.deepEqual(JSON.parse(result.stdout), { error: '--id required' })
})

test('ActiveCampaign HTTP failures return a nonzero status', async t => {
  const server = createServer((request, response) => {
    response.writeHead(422, { 'content-type': 'application/json' })
    response.end(JSON.stringify({ errors: [{ title: 'invalid request' }] }))
  })
  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })
  t.after(() => new Promise(resolve => server.close(resolve)))
  const address = server.address()
  assert(address && typeof address === 'object')

  const result = await runAsync('activecampaign.js', ['users', 'me'], {
    ACTIVECAMPAIGN_API_KEY: 'test-key',
    ACTIVECAMPAIGN_API_URL: `http://127.0.0.1:${address.port}`,
  })

  assert.equal(result.status, 1)
  const payload = JSON.parse(result.stdout)
  assert.equal(payload.error, 'ActiveCampaign API request failed')
  assert.equal(payload.status, 422)
})
