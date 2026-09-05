# LeeWay MCP Context Gateway — Coolify Deployment Authority

LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.DEPLOY
TAG: LEEWAY.SKILLS.MCP.DEPLOY.COOLIFY

WHAT = Canonical Coolify deployment contract for the LeeWay MCP Context Gateway
WHY = Make Coolify the governed hosting target for LeeWay remote MCP access
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = LeeWay-Agent-Skills / mcp-server
WHEN = 2026
HOW = Git repository deployment using the existing production Dockerfile

## Canonical source

Repository: `4citeB4U/LeeWay-Agent-Skills`
Branch: `agentlee/c3-mcp-context-harness`
Build pack: `Dockerfile`
Base directory / build context: `/`
Dockerfile location: `mcp-server/Dockerfile`
Internal port: `8788`
Health endpoint: `/healthz`
MCP endpoint: `/mcp`
Admin portal: `/`

## Required production environment

```text
NODE_ENV=production
LEEWAY_MCP_PORT=8788
LEEWAY_MCP_HOST=0.0.0.0
LEEWAY_ALLOWED_HOSTS=<EXACT_COOLIFY_HTTPS_HOSTNAME>
```

`LEEWAY_ALLOWED_HOSTS` MUST be replaced with the exact deployed hostname before production verification. Do not use `*` as a shortcut.

Optional protected administration capability:

```text
LEEWAY_ADMIN_TOKEN=<SECRET_IN_COOLIFY_RUNTIME_STORAGE>
```

Do not commit the actual token.

## Evidence adapters

The gateway fails closed if canonical evidence exports are absent. Configure only paths that are actually mounted and produced by their governing systems:

```text
LEEWAY_SET_A_FILE=/run/leeway/context/set-a.json
LEEWAY_SET_B_FILE=/run/leeway/context/set-b.json
LEEWAY_SET_C_FILE=/run/leeway/context/set-c.json
LEEWAY_SET_D_FILE=/run/leeway/context/set-d.json
```

Set B must originate from canonical Runtime Fabric / Veritas evidence before any runtime-health claim can be VERIFIED.

## Coolify resource contract

Create one Coolify Application from the canonical Git repository and branch above. Use the repository root as Docker build context so the Dockerfile can copy `mcp-server`, `scripts`, and `skills` without duplicating those authorities. Route HTTPS traffic to internal port `8788`.

Coolify should perform the image build from `mcp-server/Dockerfile`; no second Dockerfile, runtime, registry, or MCP server should be created.

## Acceptance gate

Deployment is not PASS until all of the following are observed against the public HTTPS hostname:

1. Coolify image build completes successfully.
2. Container reaches healthy state.
3. `GET /healthz` returns HTTP 200.
4. Admin portal `/` loads.
5. `/api/systems` reports System A/B/C/D definitions without fabricated health.
6. An MCP client negotiates Streamable HTTP against `/mcp`.
7. MCP tool discovery returns `leeway_context_route` and gateway status capability.
8. MCP resource discovery exposes the governed LeeWay context resources.
9. A deterministic context-route invocation returns a payload with evidence status and SHA-256 identity.
10. Telemetry records the connection without storing prompt content.

Only after these checks may the deployment be classified VERIFIED. A LeeWay/Veritas receipt may only be created by actual receipt authority after execution.

## Rollback

Rollback target is the prior known-good Coolify deployment/image or disable this application without altering `main`. The source branch remains isolated until the live acceptance gate passes.

RECEIPT NOT CREATED BY THIS DOCUMENT.
LEARNING LEDGER NOT UPDATED BY THIS DOCUMENT.
