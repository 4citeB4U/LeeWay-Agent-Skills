/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP.TEST
TAG: LEEWAY.SKILLS.MCP.COMMUNICATIONS.TEST

5WH:
WHAT = Contract tests for communication MCP tools
WHY = Prevent work orders from being misreported as sent emails, calls, texts, or calendar changes
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/communications-tools.test.ts
WHEN = 2026
HOW = Node assertions over schemas, local preparation, and executor gates

LICENSE:
MIT
*/
import assert from "node:assert/strict";
import test from "node:test";
import { communicationsToolDefinitions, executeCommunicationsTool, isCommunicationsTool, } from "./communications-tools.js";
test("publishes preparation and approved execution tools", () => {
    const names = communicationsToolDefinitions.map((tool) => tool.name).sort();
    assert.deepEqual(names, ["communications_execute_approved", "communications_prepare_action"]);
    assert.equal(isCommunicationsTool("communications_execute_approved"), true);
});
test("prepares a work order without claiming external execution", async () => {
    const execution = await executeCommunicationsTool("communications_prepare_action", {
        action: "email",
        recipient: "owner@example.invalid",
        content: { subject: "Draft", body: "Prepared only" },
    });
    const result = JSON.parse(execution.text);
    assert.equal(result.state, "EXECUTED_LOCAL");
    assert.equal(execution.isError, false);
    assert.equal(result.external_action_executed, false);
    assert.match(result.work_order.work_order_id, /^leeway-comm-[a-f0-9]{24}$/);
    assert.match(result.work_order.work_order_sha256, /^[a-f0-9]{64}$/);
    assert.match(result.claim_boundary, /No email, call, SMS, or calendar mutation occurred/);
});
test("blocks approved execution when the provider pair is absent", async () => {
    const names = ["LEEWAY_COMMUNICATIONS_GATEWAY_URL", "LEEWAY_COMMUNICATIONS_GATEWAY_BEARER_TOKEN"];
    const prior = Object.fromEntries(names.map((name) => [name, process.env[name]]));
    names.forEach((name) => delete process.env[name]);
    try {
        const prepared = JSON.parse((await executeCommunicationsTool("communications_prepare_action", {
            action: "phone_call",
            recipient: "+15555550100",
            content: { script: "Test only" },
        })).text);
        const execution = await executeCommunicationsTool("communications_execute_approved", {
            action: "phone_call",
            recipient: "+15555550100",
            content: { script: "Test only" },
            work_order_id: prepared.work_order.work_order_id,
            work_order_sha256: prepared.work_order.work_order_sha256,
            approval_id: "approval-test",
            idempotency_key: "call-test-1",
        });
        const result = JSON.parse(execution.text);
        assert.equal(result.state, "BLOCKED_ADAPTER_UNCONFIGURED");
        assert.equal(result.executed, false);
        assert.equal(execution.isError, true);
    }
    finally {
        for (const name of names) {
            if (prior[name] === undefined)
                delete process.env[name];
            else
                process.env[name] = prior[name];
        }
    }
});
test("rejects execution without an approval reference", async () => {
    await assert.rejects(executeCommunicationsTool("communications_execute_approved", {
        action: "sms",
        recipient: "+15555550100",
        content: { body: "Test" },
    }), /Missing required arguments: .*approval_id/);
});
test("rejects a mutated approved work order", async () => {
    const prepared = JSON.parse((await executeCommunicationsTool("communications_prepare_action", {
        action: "email",
        recipient: "owner@example.invalid",
        content: { subject: "Approved", body: "Original" },
    })).text);
    await assert.rejects(executeCommunicationsTool("communications_execute_approved", {
        action: "email",
        recipient: "owner@example.invalid",
        content: { subject: "Approved", body: "Changed after approval" },
        work_order_id: prepared.work_order.work_order_id,
        work_order_sha256: prepared.work_order.work_order_sha256,
        approval_id: "approval-test",
        idempotency_key: "email-test-1",
    }), /does not match the approved action/);
});
test("rejects empty communication content and missing idempotency", async () => {
    await assert.rejects(executeCommunicationsTool("communications_prepare_action", {
        action: "sms",
        recipient: "+15555550100",
        content: {},
    }), /Invalid arguments: content/);
    await assert.rejects(executeCommunicationsTool("communications_execute_approved", {
        action: "sms",
        recipient: "+15555550100",
        content: { body: "test" },
        work_order_id: "leeway-comm-test",
        work_order_sha256: "test",
        approval_id: "approval-test",
    }), /Missing required arguments: idempotency_key/);
});
//# sourceMappingURL=communications-tools.test.js.map