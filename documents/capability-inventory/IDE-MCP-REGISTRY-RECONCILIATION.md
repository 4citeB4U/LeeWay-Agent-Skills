# LeeWay IDE MCP Registry Reconciliation — LCEL

LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.CAPABILITIES.INVENTORY
TAG: LEEWAY.CAPABILITIES.IDE_MCP_RECONCILIATION
5WH:
WHAT = Record observed IDE MCP registry identity and location discrepancies
WHY = Reconcile canonical execution sources without destroying legacy evidence
WHO = LeeWay Industries / Agent Lee directed audit
WHERE = documents/capability-inventory/IDE-MCP-REGISTRY-RECONCILIATION.md
WHEN = 2026-10-08
HOW = Read-only parsing of existing catalogs and literal-path checks
AGENTS: AUDIT, DISCOVER
LICENSE: MIT

## Scope

Source root: E:/Leeway-Ecosystem v2.1.4/leeway-ide-single-canvas/src/agent-lee/mcp

- leeway-mcp-registry.json — SHA256 89045C39183F23954872E84E6114A56CA65A016CEB5A4FB7ABDA74700ABC13CD; 27 declared tool-group objects.
- mcp-registry.json — SHA256 47B86CDDD0E4B475AD3D9AF13148E769D060D26921208D8993B937222BA21259; 17 string entries.
- generated-capability-catalog.json — SHA256 3D4FA734F81F4B6CCA78A55319006D49344D6C9B13E74F3F9C5772F256399E8A; 44 entries (34 MCP, 6 agent, 4 server).
- Generated catalog: 30 distinct IDs; 14 IDs appear more than once. This is an alias/source collision candidate, not proven duplicate implementation.
- All 44 recorded literal `location` references failed Test-Path on the live Windows host. These may be stale; portable resolution and real implementation search needed.

## Classification

Source registration OBSERVED. Catalogs are not verified as canonical, currently loaded, or executable. No MCP handshake/execution was performed in this pass. No records deleted, no registry overwritten, no host services changed.

## Next proof gates

1. Resolve each of the 30 catalog IDs and 27 declared tool groups against source and live runtime; record aliases separately.
2. Inspect IDE launch/registration consumers to determine which files are authoritative and which are generated/obsolete.
3. Validate real transport, tool schemas, adapter dependencies and authorization for each surviving MCP.
4. Test harmless read-only operations first, followed by explicitly approved bounded execution with Formula provenance, Veritas and independent receipt evidence.
