# LeeWay Remote Skills MCP — Gemini Bridge

This server exposes the LeeWay Agent Skills repository as a **read-only Streamable HTTP MCP** so Gemini/Google AI Studio and other remote MCP clients can discover LeeWay authority and skill instructions without copy/paste.

It intentionally does **not** execute the LeeWay Formula, mutate the repository, send email, modify Drive, or perform host operations. It is the knowledge/skill bridge. Operational tools remain behind separate authorized adapters.

## What it exposes

MCP tools:

- `list_leeway_skills`
- `read_leeway_skill`
- `search_leeway_skills`
- `get_leeway_authority`
- `prepare_leeway_handoff`

The server discovers `skills/**/SKILL.md` directly from the repository, so newly added portable skills become available without manually registering each one.

## Build

```powershell
cd .\mcp-remote
npm install
npm run build
```

## Run locally

Create a strong temporary token in your shell/secret manager. Do not commit it.

```powershell
$env:LEEWAY_MCP_BEARER_TOKEN = '<secret-from-your-secret-store>'
$env:LEEWAY_MCP_HOST = '127.0.0.1'
$env:LEEWAY_MCP_PORT = '8788'
npm start
```

Health:

```powershell
Invoke-RestMethod http://127.0.0.1:8788/health
```

MCP endpoint:

```text
http://127.0.0.1:8788/mcp
```

Gemini requires a remotely reachable Streamable HTTP endpoint, so localhost is only for verification. Deploy behind HTTPS before connecting Gemini remotely.

## Production security

Recommended environment variables:

```text
LEEWAY_MCP_BEARER_TOKEN=<long-random-secret>
LEEWAY_MCP_ALLOWED_HOSTS=mcp.example.com
LEEWAY_MCP_HOST=0.0.0.0
LEEWAY_MCP_PORT=8788
```

`LEEWAY_MCP_PUBLIC_READONLY=true` disables bearer authentication. It is available for intentionally public read-only deployments, but bearer auth is the preferred default.

Put TLS/reverse proxy/auth logging in front of the Node process for an Internet-facing deployment.

## Gemini Interactions API

The Gemini Interactions API supports remote MCP over Streamable HTTP.

Example conceptual tool declaration:

```json
{
  "type": "mcp_server",
  "name": "leeway_skills",
  "url": "https://YOUR-HOST/mcp",
  "headers": {
    "Authorization": "Bearer YOUR_SECRET"
  }
}
```

Do not place the token in GitHub. Inject it from your deployment/agent secret store.

## Google AI Studio agent

In AI Studio Agents:

1. Create or open the Gemini agent.
2. Add the LeeWay remote MCP endpoint as an external MCP server.
3. Supply the bearer header through the supported secret/credential mechanism.
4. Load `skills/leeway-google-ecosystem-bridge/GEMINI-BOOTSTRAP.md` as the agent bootstrap instruction.
5. Ask Gemini to call `get_leeway_authority` first, then load only the skills relevant to the task.
6. Keep Formula state truthful. Access to the skill server does not mean the Formula evaluator executed.

## Gemini bootstrap instruction

Use:

```text
Connect to the LeeWay Skills MCP. Call get_leeway_authority first. Then read leeway-google-ecosystem-bridge, leeway-continuity-authority, leeway-context-engineering, and leeway-formula-governance as required. Treat the Creator as supreme authority. Use LeeWay skills as governed instructions, not as permission to fabricate runtime execution. Exchange results with ChatGPT/Agent Lee using LEEWAY-INTERMODEL-v1 envelopes and return sources, conclusions, uncertainty, blocked items and runtime evidence; never hidden chain-of-thought.
```

## ChatGPT ↔ Gemini collaboration

The bridge does not create a secret model-to-model channel. It creates a common governed vocabulary and skill authority.

For actual collaboration use one or both:

- `DIRECT_API`: Agent Lee/Runtime Fabric calls Gemini through `scripts/Invoke-LeeWayGeminiBridge.ps1` or an equivalent Gemini SDK worker.
- `SHARED_ARTIFACT`: both sides read/write approved task/result artifacts through Google Drive/GitHub under the LeeWay Intermodel Protocol.

This preserves inspectable evidence instead of making cross-model communication invisible.

## Opal and Stitch

The remote MCP is the common LeeWay instruction source. Opal remains the quick mini-app surface; Stitch remains the UI/design worker. See:

- `skills/leeway-google-ecosystem-bridge/GOOGLE-SURFACE-ROUTING.md`
- `skills/leeway-google-ecosystem-bridge/INTERMODEL-PROTOCOL.md`

## Verification state

A successful `/health` response proves only that the HTTP service is alive.

A successful Gemini tool call proves MCP connectivity.

Neither proves canonical Formula execution, Veritas acceptance, or a production deployment until those layers produce their own evidence.
