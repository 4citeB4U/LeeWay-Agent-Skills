# LeeWay IDE Tooling Consumer Trace

LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.CAPABILITIES.INVENTORY
TAG: LEEWAY.CAPABILITIES.IDE_TOOLING_CONSUMER_TRACE
5WH: WHAT=Evidence-backed trace of IDE MCP registry consumer; WHY=Prevent loss of tool identities during LCEL reconciliation; WHO=LeeWay Industries; WHERE=documents/capability-inventory; WHEN=2026-10-08; HOW=Source inspection and independent PowerShell count reproduction
AGENTS: AUDIT, DOCUMENT
LICENSE: MIT

## Inspected source

`E:/Leeway-Ecosystem v2.1.4/leeway-ide-single-canvas/src/services/tooling/toolingRegistry.ts` imports both `agent-lee/mcp/mcp-registry.json` and `agent-lee/mcp/leeway-mcp-registry.json`. `loadWorkspaceMcpEntries()` passes string entries to `normalizeEntry()`, which expects object members; therefore strings receive the fallback `unknown` ID. `dedupeEntries()` retains only the first entry with each lowercased ID. `getToolingSnapshot()` returns the computed catalog, and `enabled` is not runtime availability proof.

## Independent read-only reproduction

- Workspace registry: 17 string entries.
- Leeway declared registry: 27 group IDs.
- Literal distinct IDs across both inputs: 42.
- IDs after reproducing `normalizeEntry` fallback and `dedupeEntries`: 28.
- 14 literal identities therefore lack distinct representation in this transformation. This is an inventory-loss defect, not proof those underlying MCPs are installed/executable.

## Authority boundary and smallest repair candidate

Do not edit historical IDE source until canonical live owner and deployed source relationship is resolved. The smallest proposed change is to teach `normalizeEntry()` to preserve string values as IDs/names, reject blank entries explicitly, and retain collisions as provenance aliases pending semantic deduplication. Acceptance: 42 distinct declared IDs preserved (given currently inspected inputs), no `unknown` identifier from valid strings, and existing UI/catalog tests pass. This only fixes discovery; transport and tool execution remain separate gates.

STATUS: SOURCE DEFECT OBSERVED; LIVE IDE RUNTIME NOT VERIFIED. NO DEPLOYMENT OR SOURCE REPAIR EXECUTED.
