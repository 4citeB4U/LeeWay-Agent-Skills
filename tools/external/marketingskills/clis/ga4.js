#!/usr/bin/env node

const ACCESS_TOKEN = process.env.GA4_ACCESS_TOKEN
const API_SECRET = process.env.GA4_API_SECRET
const DATA_API = 'https://analyticsdata.googleapis.com/v1beta'
const ADMIN_API = 'https://analyticsadmin.googleapis.com/v1beta'
const MP_URL = 'https://www.google-analytics.com/mp/collect'

if (!ACCESS_TOKEN) {
  console.error(JSON.stringify({ error: 'GA4_ACCESS_TOKEN environment variable required' }))
  process.exit(1)
}

async function api(method, baseUrl, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${baseUrl}${path}`, headers: { Authorization: '***', 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let payload
  try {
    payload = JSON.parse(text)
  } catch {
    payload = { body: text }
  }
  if (!res.ok) return { error: 'GA4 API request failed', status: res.status, details: payload }
  return payload
}

async function mpApi(measurementId, apiSecret, body) {
  const params = new URLSearchParams({ measurement_id: measurementId, api_secret: apiSecret })
  if (args['dry-run']) {
    return { _dry_run: true, method: 'POST', url: `${MP_URL}?${new URLSearchParams({ measurement_id: measurementId, api_secret: '***' })}`, headers: { 'Content-Type': 'application/json' }, body: body || undefined }
  }
  const res = await fetch(`${MP_URL}?${params}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!text) {
    if (!res.ok) return { error: 'GA4 Measurement Protocol request failed', status: res.status }
    return { status: res.status, success: true }
  }
  let payload
  try {
    payload = JSON.parse(text)
  } catch {
    payload = { body: text }
  }
  if (!res.ok) return { error: 'GA4 Measurement Protocol request failed', status: res.status, details: payload }
  return payload
}

function parseArgs(args) {
  const result = { _: [] }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const next = args[i + 1]
      if (next && !next.startsWith('--')) {
        result[key] = next
        i++
      } else {
        result[key] = true
      }
    } else {
      result._.push(arg)
    }
  }
  return result
}

const args = parseArgs(process.argv.slice(2))
const [cmd, sub, ...rest] = args._

async function main() {
  let result

  switch (cmd) {
    case 'reports':
      switch (sub) {
        case 'run': {
          const property = args.property
          if (!property) { result = { error: '--property required' }; break }
          const body = {
            dateRanges: [{
              startDate: args['start-date'] || '30daysAgo',
              endDate: args['end-date'] || 'today',
            }],
          }
          if (args.dimensions) {
            body.dimensions = args.dimensions.split(',').map(d => ({ name: d.trim() }))
          }
          if (args.metrics) {
            body.metrics = args.metrics.split(',').map(m => ({ name: m.trim() }))
          }
          result = await api('POST', DATA_API, `/properties/${property}:runReport`, body)
          break
        }
        default:
          result = { error: 'Unknown reports subcommand. Use: run' }
      }
      break

    case 'realtime':
      switch (sub) {
        case 'run': {
          const property = args.property
          if (!property) { result = { error: '--property required' }; break }
          const body = {}
          if (args.dimensions) {
            body.dimensions = args.dimensions.split(',').map(d => ({ name: d.trim() }))
          }
          if (args.metrics) {
            body.metrics = args.metrics.split(',').map(m => ({ name: m.trim() }))
          }
          result = await api('POST', DATA_API, `/properties/${property}:runRealtimeReport`, body)
          break
        }
        default:
          result = { error: 'Unknown realtime subcommand. Use: run' }
      }
      break

    case 'conversions':
      switch (sub) {
        case 'list': {
          const property = args.property
          if (!property) { result = { error: '--property required' }; break }
          result = await api('GET', ADMIN_API, `/properties/${property}/conversionEvents`)
          break
        }
        case 'create': {
          const property = args.property
          if (!property) { result = { error: '--property required' }; break }
          if (!args['event-name']) { result = { error: '--event-name required' }; break }
          result = await api('POST', ADMIN_API, `/properties/${property}/conversionEvents`, {
            eventName: args['event-name'],
          })
          break
        }
        default:
          result = { error: 'Unknown conversions subcommand. Use: list, create' }
      }
      break

    case 'events':
      switch (sub) {
        case 'send': {
          if (!args['measurement-id']) { result = { error: '--measurement-id required' }; break }
          if (args['api-secret']) { result = { error: '--api-secret is not accepted; use the GA4_API_SECRET environment variable or an authorized secret store' }; break }
          if (!API_SECRET) { result = { error: 'GA4_API_SECRET environment variable required' }; break }
          if (!args['client-id']) { result = { error: '--client-id required' }; break }
          if (!args['event-name']) { result = { error: '--event-name required' }; break }
          let eventParams = {}
          if (args.params) {
            try {
              eventParams = JSON.parse(args.params)
            } catch {
              result = { error: 'Invalid JSON in --params' }; break
            }
          }
          const body = {
            client_id: args['client-id'],
            events: [{
              name: args['event-name'],
              params: eventParams,
            }],
          }
          result = await mpApi(args['measurement-id'], API_SECRET, body)
          break
        }
        default:
          result = { error: 'Unknown events subcommand. Use: send' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          reports: 'reports run --property <id> [--start-date <date>] [--end-date <date>] [--dimensions <dims>] [--metrics <metrics>]',
          realtime: 'realtime run --property <id> [--dimensions <dims>] [--metrics <metrics>]',
          conversions: 'conversions [list|create] --property <id> [--event-name <name>]',
          events: 'GA4_API_SECRET=<secret> events send --measurement-id <id> --client-id <id> --event-name <name> [--params <json>]',
        }
      }
  }

  if (result?.error) process.exitCode = 1
  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
