const GAME_MODES = [
    "loop-lab",
    "tension-tower",
    "pattern-quest",
    "amigurumi-rescue",
    "yarnfolk-town-builder",
];
const STITCH_ACTIONS = [
    "chain",
    "slip-stitch",
    "single-crochet",
    "half-double-crochet",
    "double-crochet",
    "increase",
    "decrease",
    "turn",
    "fasten-off",
];
export const crochetToolDefinitions = [
    {
        name: "crochet_validate_lesson",
        description: "Validate a crochet game lesson against the LeeWay Crochet Game Factory's deterministic content contract.",
        inputSchema: {
            type: "object",
            properties: {
                lesson: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        game_mode: { type: "string", enum: [...GAME_MODES] },
                        steps: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    action: { type: "string", enum: [...STITCH_ACTIONS] },
                                    count: { type: "integer", minimum: 1 },
                                    cue: { type: "string" },
                                },
                                required: ["action"],
                            },
                        },
                    },
                    required: ["id", "title", "game_mode", "steps"],
                },
            },
            required: ["lesson"],
        },
    },
    {
        name: "crochet_diagnose_attempt",
        description: "Diagnose count, tension, insertion, and turning-chain signals from an observed crochet attempt without claiming camera or sensor evidence that was not supplied.",
        inputSchema: {
            type: "object",
            properties: {
                expected_stitches: { type: "integer", minimum: 0 },
                actual_stitches: { type: "integer", minimum: 0 },
                tension_samples: { type: "array", items: { type: "number", minimum: 0 } },
                missed_insertions: { type: "integer", minimum: 0 },
                extra_insertions: { type: "integer", minimum: 0 },
                turning_chain_present: { type: "boolean" },
            },
            required: ["expected_stitches", "actual_stitches"],
        },
    },
    {
        name: "crochet_calculate_gauge",
        description: "Calculate measured stitches/rows per 10 cm and compare them with an optional target gauge.",
        inputSchema: {
            type: "object",
            properties: {
                stitches: { type: "number", exclusiveMinimum: 0 },
                rows: { type: "number", exclusiveMinimum: 0 },
                width_cm: { type: "number", exclusiveMinimum: 0 },
                height_cm: { type: "number", exclusiveMinimum: 0 },
                target_stitches_per_10cm: { type: "number", exclusiveMinimum: 0 },
                target_rows_per_10cm: { type: "number", exclusiveMinimum: 0 },
            },
            required: ["stitches", "rows", "width_cm", "height_cm"],
        },
    },
    {
        name: "crochet_recommend_next_lesson",
        description: "Return lessons whose prerequisite lesson IDs are all complete, preserving the supplied lesson order.",
        inputSchema: {
            type: "object",
            properties: {
                completed_lesson_ids: { type: "array", items: { type: "string" } },
                lessons: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            prerequisite_ids: { type: "array", items: { type: "string" } },
                        },
                        required: ["id", "prerequisite_ids"],
                    },
                },
            },
            required: ["completed_lesson_ids", "lessons"],
        },
    },
];
function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function finiteNumber(value, field, allowZero = false) {
    if (typeof value !== "number" ||
        !Number.isFinite(value) ||
        (allowZero ? value < 0 : value <= 0)) {
        throw new Error(`${field} must be a ${allowZero ? "non-negative" : "positive"} finite number`);
    }
    return value;
}
function nonNegativeInteger(value, field) {
    const parsed = finiteNumber(value, field, true);
    if (!Number.isInteger(parsed))
        throw new Error(`${field} must be an integer`);
    return parsed;
}
function validateLesson(args) {
    const lesson = args.lesson;
    if (!isObject(lesson))
        throw new Error("lesson must be an object");
    const errors = [];
    if (typeof lesson.id !== "string" || !lesson.id.trim())
        errors.push("lesson.id is required");
    if (typeof lesson.title !== "string" || !lesson.title.trim())
        errors.push("lesson.title is required");
    if (!GAME_MODES.includes(lesson.game_mode)) {
        errors.push(`lesson.game_mode must be one of: ${GAME_MODES.join(", ")}`);
    }
    if (!Array.isArray(lesson.steps) || lesson.steps.length === 0) {
        errors.push("lesson.steps must contain at least one step");
    }
    else {
        lesson.steps.forEach((step, index) => {
            if (!isObject(step)) {
                errors.push(`lesson.steps[${index}] must be an object`);
                return;
            }
            if (!STITCH_ACTIONS.includes(step.action)) {
                errors.push(`lesson.steps[${index}].action is unsupported`);
            }
            if (step.count !== undefined && (!Number.isInteger(step.count) || Number(step.count) < 1)) {
                errors.push(`lesson.steps[${index}].count must be a positive integer`);
            }
        });
    }
    return {
        state: errors.length === 0 ? "VALIDATED" : "REJECTED",
        valid: errors.length === 0,
        errors,
        game_mode: lesson.game_mode ?? null,
        step_count: Array.isArray(lesson.steps) ? lesson.steps.length : 0,
    };
}
function diagnoseAttempt(args) {
    const expected = nonNegativeInteger(args.expected_stitches, "expected_stitches");
    const actual = nonNegativeInteger(args.actual_stitches, "actual_stitches");
    const missed = args.missed_insertions === undefined ? 0 : nonNegativeInteger(args.missed_insertions, "missed_insertions");
    const extra = args.extra_insertions === undefined ? 0 : nonNegativeInteger(args.extra_insertions, "extra_insertions");
    const samples = args.tension_samples === undefined ? [] : args.tension_samples;
    if (!Array.isArray(samples) || samples.some((sample) => typeof sample !== "number" || !Number.isFinite(sample) || sample < 0)) {
        throw new Error("tension_samples must contain non-negative finite numbers");
    }
    const diagnoses = [];
    const difference = actual - expected;
    if (difference < 0 || missed > 0)
        diagnoses.push("possible-missed-stitch-or-edge-loss");
    if (difference > 0 || extra > 0)
        diagnoses.push("possible-extra-insertion-or-unintended-increase");
    if (args.turning_chain_present === false)
        diagnoses.push("turning-chain-missing");
    let tension = { state: "UNOBSERVED", sample_count: 0 };
    if (samples.length > 0) {
        const mean = samples.reduce((sum, value) => sum + value, 0) / samples.length;
        const variance = samples.reduce((sum, value) => sum + (value - mean) ** 2, 0) / samples.length;
        const coefficientOfVariation = mean === 0 ? null : Math.sqrt(variance) / mean;
        tension = {
            state: "MEASURED_FROM_SUPPLIED_SAMPLES",
            sample_count: samples.length,
            mean: Number(mean.toFixed(4)),
            coefficient_of_variation: coefficientOfVariation === null ? null : Number(coefficientOfVariation.toFixed(4)),
            consistency: coefficientOfVariation === null ? "INDETERMINATE" : coefficientOfVariation <= 0.1 ? "CONSISTENT" : "VARIABLE",
        };
    }
    if (diagnoses.length === 0)
        diagnoses.push("no-count-or-structure-anomaly-detected-from-supplied-fields");
    return {
        state: "DIAGNOSED_FROM_SUPPLIED_DATA",
        stitch_difference: difference,
        diagnoses,
        tension,
        evidence_boundary: "No camera, motion, yarn, hook, or stitch geometry was observed by this tool.",
    };
}
function calculateGauge(args) {
    const stitches = finiteNumber(args.stitches, "stitches");
    const rows = finiteNumber(args.rows, "rows");
    const width = finiteNumber(args.width_cm, "width_cm");
    const height = finiteNumber(args.height_cm, "height_cm");
    const stitchGauge = (stitches / width) * 10;
    const rowGauge = (rows / height) * 10;
    const result = {
        state: "CALCULATED",
        stitches_per_10cm: Number(stitchGauge.toFixed(3)),
        rows_per_10cm: Number(rowGauge.toFixed(3)),
    };
    if (args.target_stitches_per_10cm !== undefined) {
        const target = finiteNumber(args.target_stitches_per_10cm, "target_stitches_per_10cm");
        result.stitch_delta = Number((stitchGauge - target).toFixed(3));
    }
    if (args.target_rows_per_10cm !== undefined) {
        const target = finiteNumber(args.target_rows_per_10cm, "target_rows_per_10cm");
        result.row_delta = Number((rowGauge - target).toFixed(3));
    }
    return result;
}
function recommendNextLesson(args) {
    if (!Array.isArray(args.completed_lesson_ids) || args.completed_lesson_ids.some((id) => typeof id !== "string")) {
        throw new Error("completed_lesson_ids must be an array of strings");
    }
    if (!Array.isArray(args.lessons))
        throw new Error("lessons must be an array");
    const completed = new Set(args.completed_lesson_ids);
    const eligible = [];
    for (const lesson of args.lessons) {
        if (!isObject(lesson) || typeof lesson.id !== "string" || !Array.isArray(lesson.prerequisite_ids)) {
            throw new Error("each lesson must have an id and prerequisite_ids array");
        }
        if (lesson.prerequisite_ids.some((id) => typeof id !== "string")) {
            throw new Error(`lesson ${lesson.id} has a non-string prerequisite`);
        }
        if (!completed.has(lesson.id) && lesson.prerequisite_ids.every((id) => completed.has(id))) {
            eligible.push(lesson.id);
        }
    }
    return { state: "CALCULATED", eligible_lesson_ids: eligible };
}
export function isCrochetTool(name) {
    return crochetToolDefinitions.some((tool) => tool.name === name);
}
export function executeCrochetTool(name, args = {}) {
    let result;
    switch (name) {
        case "crochet_validate_lesson":
            result = validateLesson(args);
            break;
        case "crochet_diagnose_attempt":
            result = diagnoseAttempt(args);
            break;
        case "crochet_calculate_gauge":
            result = calculateGauge(args);
            break;
        case "crochet_recommend_next_lesson":
            result = recommendNextLesson(args);
            break;
        default:
            throw new Error(`Unknown crochet tool: ${name}`);
    }
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=crochet-tools.js.map