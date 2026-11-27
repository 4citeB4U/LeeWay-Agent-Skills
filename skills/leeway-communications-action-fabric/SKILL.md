---
name: leeway-communications-action-fabric
description: Governed preparation and execution of Agent Lee email, phone, SMS, and calendar actions through authorized provider adapters. Separates drafts and work orders from actual external delivery, dialing, texting, or calendar mutation.
license: MIT
metadata:
  authority: Creator/Human Authority > LeeWay Standards > provider/account authority
  mode: portable-communications-action-fabric
  mcp_tools: communications_prepare_action, communications_execute_approved
---

# LeeWay Communications Action Fabric

## Purpose

Provide one action contract for communications without confusing prose generation, simulated success, UI clicks, provider acceptance or real delivery.

`intent → recipient resolution → content/work order → approval → authorized provider → execution evidence → post-verification → receipt`

## Capability identities

- `communications.email.prepare`
- `communications.email.send`
- `communications.phone.prepare`
- `communications.phone.call`
- `communications.sms.prepare`
- `communications.sms.send`
- `communications.calendar.prepare`
- `communications.calendar.mutate`

Preparation is safe local work. External execution is a separate capability with a stronger authority boundary.

## Truth states

Use precise states:

- `DRAFTED` — content exists only as a draft.
- `WORK_ORDER_CREATED` — structured action data exists.
- `APPROVED` — authority is bound to the exact action, recipient and content.
- `PROVIDER_ACCEPTED` — the provider accepted the request.
- `EXECUTED_UNVERIFIED` — the provider reports an external action.
- `DELIVERED_OR_CONNECTED` — delivery/call connection is independently evidenced when the provider supports it.
- `VERIFIED` — task acceptance and receipt checks passed.

A click on a mail or dial button does not prove delivery or connection. A historical API shell that creates work orders is not a send/call provider.

## Approval and idempotency

Before external execution, preserve:

- action type;
- recipient identity;
- exact content or script;
- requested timing;
- account/provider identity;
- approval reference;
- idempotency key for retries;
- privacy and recording requirements;
- cancellation/STOP route.

Do not reuse approval when the recipient, content, account, amount, timing or action class changes materially.
The preparation tool computes a canonical SHA-256 and content-addressed work-order ID over the action, recipient, content and purpose. Execution recomputes both values and rejects any changed material. The provider gateway must verify the approval reference against that exact hash.

## MCP adapter contract

`communications_prepare_action` creates a normalized work order and explicitly reports that no external action occurred.

`communications_execute_approved` requires the prepared ID/hash, an approval reference, a mandatory idempotency key and an authenticated provider gateway. It marks execution only when the upstream provider returns `executed=true` together with a provider receipt. A timeout after dispatch is `INDETERMINATE_RECONCILIATION_REQUIRED`; reconcile the idempotency key before retrying.

## Provider boundary

Adapters may include Gmail/Google Calendar, Microsoft Graph, a telephony/SIP provider, an Android Telecom adapter, browser automation or another authorized service. Keep credentials behind the adapter. The skill receives capabilities, never plaintext secrets.

## Recovered provenance

Historical LeeWay repositories contain useful approval queues, drafts, meeting-room/ICS generation and provider clients. Several email/call classes and runtime shells return simulated or work-order-only success. Preserve those as design evidence until a real account/provider execution is qualified.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE BEGIN -->

# LeeWay Universal Formula Governance

Authority: Creator and LeeWay Standards.
Formula identity: LEEWAY-FORMULA-v1.0.

The canonical LeeWay Formula is mandatory throughout
the entire LeeWay ecosystem.

Every current and future application, capability,
agent, worker, employee, model, provider, adapter,
automation and integration inherits this requirement.

All applicable interactions, responses, decisions,
actions, revisions, executions, computations, model
inferences, resource allocations, information transfers,
memory operations, storage operations and deployments
must consume the canonical Formula through their
authorized and qualified domain contracts.

Formula availability, documentation, configuration,
health and historical results do not constitute actual
Formula consumption for a new operation.

Recover relevant authorized memory before substantive
work. Preserve identity, provenance, Formula integrity,
authorization, original receipts and verified learning.

Never invent observations, adapter mappings, mathematical
results, execution evidence or independent verification.

No application may bypass applicable Formula governance
by dispatching directly to a provider.

Every new application and capability must demonstrate
applicable Formula consumption before production admission.

Preserve the existing authority hierarchy:

Creator > Standards > Root of Trust > Runtime Fabric >
Agent Lee > Harness > Formula > skills/models/tools >
execution > Veritas > Receipt Authority > Learning Ledger.

Execute the complete engineering loop:

INVESTIGATE > DIAGNOSE > PLAN > IMPLEMENT > TEST >
VALIDATE > REPAIR > RETEST > VERIFY > EVIDENCE >
CHECKPOINT > CONTINUE.

Documentation compliance does not establish executable
enforcement or production admission.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE END -->
