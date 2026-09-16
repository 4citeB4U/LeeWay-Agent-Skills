import assert from "node:assert/strict";
import test from "node:test";
import { executeCrochetTool, isCrochetTool } from "./crochet-tools.js";
function run(name, args) {
    return JSON.parse(executeCrochetTool(name, args));
}
test("recognizes the crochet MCP tools", () => {
    assert.equal(isCrochetTool("crochet_calculate_gauge"), true);
    assert.equal(isCrochetTool("made_up_tool"), false);
});
test("validates a Loop Lab lesson", () => {
    const result = run("crochet_validate_lesson", {
        lesson: {
            id: "loop-001",
            title: "First chain",
            game_mode: "loop-lab",
            steps: [{ action: "chain", count: 10, cue: "Yarn over and pull through" }],
        },
    });
    assert.equal(result.state, "VALIDATED");
    assert.equal(result.valid, true);
});
test("diagnoses only from supplied attempt data", () => {
    const result = run("crochet_diagnose_attempt", {
        expected_stitches: 12,
        actual_stitches: 11,
        tension_samples: [1, 1.02, 0.98],
        turning_chain_present: false,
    });
    assert.equal(result.stitch_difference, -1);
    assert.deepEqual(result.diagnoses, [
        "possible-missed-stitch-or-edge-loss",
        "turning-chain-missing",
    ]);
    assert.match(String(result.evidence_boundary), /No camera/);
});
test("calculates a standard gauge", () => {
    const result = run("crochet_calculate_gauge", {
        stitches: 18,
        rows: 24,
        width_cm: 10,
        height_cm: 10,
        target_stitches_per_10cm: 20,
    });
    assert.equal(result.stitches_per_10cm, 18);
    assert.equal(result.rows_per_10cm, 24);
    assert.equal(result.stitch_delta, -2);
});
test("recommends only lessons with completed prerequisites", () => {
    const result = run("crochet_recommend_next_lesson", {
        completed_lesson_ids: ["chain"],
        lessons: [
            { id: "chain", prerequisite_ids: [] },
            { id: "single-crochet", prerequisite_ids: ["chain"] },
            { id: "increase", prerequisite_ids: ["single-crochet"] },
        ],
    });
    assert.deepEqual(result.eligible_lesson_ids, ["single-crochet"]);
});
//# sourceMappingURL=crochet-tools.test.js.map