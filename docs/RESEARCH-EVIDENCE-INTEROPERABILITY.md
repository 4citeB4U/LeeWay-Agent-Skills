<!--
REGION: LEEWAY.AGENT_SKILLS.RESEARCH_INTEROPERABILITY
TAG: LEEWAY.C3.RESEARCH.EVIDENCE_INTEROP
5WH:
WHAT = Link existing LeeWay research and reference skills to the current Receipt Authority JSON record
WHY = Ensure reproducible claim-to-source evidence across authorized agents and LLMs
WHO = LeeWay Agent Skills owner; W05 governed source proposal
WHERE = docs/RESEARCH-EVIDENCE-INTEROPERABILITY.md
WHEN = 2026-11-06
HOW = Source discovery, structured claims, original readback and contributor continuity
LICENSE: Existing repository terms
AUTHORITY: PROPOSED source guidance, not a production research runtime or receipt writer
-->

# Agent research evidence interoperability — source-only proposal

Read [canonical engineering laws](https://github.com/4citeB4U/LeeWay-Standards/blob/main/Docs/governance/LEEWAY-CANONICAL-ENGINEERING-LAWS.md), local [AGENTS.md](../AGENTS.md), [Contributor Handoff Protocol](CONTRIBUTOR-HANDOFF-PROTOCOL.md), [Reference Authority](../skills/leeway-reference-authority/SKILL.md), [Knowledge Synthesis](../skills/research/knowledge-synthesis/SKILL.md), and [Continuity Authority](../skills/leeway-continuity-authority/SKILL.md). These are the **existing skills**, not substitutes or duplicated systems.

## Mandatory research flow for every authorized LLM/agent
1. Recover last clean mission/workId, accepted/rejected decisions, latest contributor issue notes and original source revision; do not silently restart finished research.
2. Search LeeWay source repositories, tests, documentation, failed/retested evidence, historical CI artifact links and original receipts before launching further research or testing. Use the **proposed** [Receipt Authority evidence routing JSON](https://github.com/4citeB4U/Receipt-Authority/blob/w05-evidence-discovery-routing-20261106/config/evidence-routing.v1.json) and [artifact discovery JSON](https://github.com/4citeB4U/Receipt-Authority/blob/w05-evidence-discovery-routing-20261106/config/artifact-discovery.v1.json) only as review contracts. No active index API is implied.
3. Build a source mesh: **claim → original source identity → retrieved original or explicit unavailable state → corroborating or contradictory evidence → cited interpretation**. Verify date and version and preserve old/superseded proof without deleting it.
4. Classify `sourceClass` (PRIMARY/SECONDARY/TERTIARY/COMMUNITY/HISTORICAL/LEEWAY_NATIVE), `researchState`, `claim.status`, `retrievalState`, and independently verified content hashes as distinct properties. A Git blob SHA-1 is NOT original byte SHA-256. A copied claim is NOT Veritas-signed proof.
5. Emit a typed research record using the **source-only** [Receipt Authority research JSON Schema](https://github.com/4citeB4U/Receipt-Authority/blob/w05-evidence-discovery-routing-20261106/schemas/leeway-research-record.v1.schema.json), with `recordId`, tenantScope, workId, exact sources, source revision/locator, observed/retrieved timestamps, claim-to-sourceIds, receipt IDs if known, contradictions and remaining gaps. Do not paste private source bodies into GitHub/issues.
6. Run the owner-approved validation before claiming the record is well formed. The [deterministic source validator](https://github.com/4citeB4U/Receipt-Authority/blob/w05-evidence-discovery-routing-20261106/scripts/validate-research-record.mjs) checks missing citations, bogus digests and disallowed promotion; **it cannot** cryptographically verify an original receipt or determine external truth. Use independent Veritas and original custody/readback separately for approval.
7. Keep original research documents/artifacts and tests in their owning repository/authorized Continuum custodian, with a sanitized reference in the future authorized Receipt Authority index. Post BEGIN/PROGRESS/PROBLEM/RETEST/HANDOFF in the owning issue; Hub #22 receives only short links. Never mint a parallel Receipt Authority, duplicate original receipts, or self-promote Learning Ledger outcomes.

## Cross-agent acceptance (requires real host/CI evidence)
Two authorized agents with separate sessions must retrieve the *same* original permitted LeeWay evidence ID and original byte hash, reproduce its citation/source classification, retain tenant boundaries, and return consistent verification state. Negative cases: absent source, revoked access, missing/expired artifact, stale source revision, false hash, conflicting newer evidence, duplicate record, unverified Veritas, and private data requested by another tenant. Existing synthetic source tests qualify only deterministic source behavior; no production research claim or live runtime grant follows.

## Ownership and resumption
Receipt Authority W05 owns catalog/record source proposal; W15 original Runtime/provider bindings; W16 tenant access; W17 independent proof audit; W00/PRIME scope and adoption. See [C3 receipt owner issue #111](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/111) and [original C3 mission #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21). All source links to draft branches are proposals until owner/Standards merge.
