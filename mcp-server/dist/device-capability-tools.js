/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP
TAG: LEEWAY.SKILLS.MCP.DEVICE_CAPABILITIES

5WH:
WHAT = Device-agnostic MCP tools for discovery, observation, files, applications, and governed UI control
WHY = Let Agent Lee address Android, desktop, browser, and future device adapters through one protocol surface
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/device-capability-tools.ts
WHEN = 2026
HOW = Strict JSON schemas delegated to an authenticated LeeWay Device Bridge gateway

LICENSE:
MIT
*/
const stringField = (description) => ({ type: "string", minLength: 1, description });
const objectField = (description) => ({ type: "object", description, additionalProperties: true });
const booleanField = (description) => ({ type: "boolean", description });
const deviceId = stringField("Stable Device Bridge identity, not a host path or transport address.");
const uiAction = {
    type: "object",
    description: "One bounded action with an explicit type and target.",
    required: ["type", "target"],
    additionalProperties: false,
    properties: {
        type: {
            type: "string",
            enum: ["tap", "long_press", "type_text", "press_key", "scroll", "select", "back", "home"],
        },
        target: {
            type: "object",
            description: "Selector/accessibility identity/visible text or bounded coordinates.",
            additionalProperties: false,
            properties: {
                accessibility_id: { type: "string" },
                selector: { type: "string" },
                text: { type: "string" },
                x: { type: "number", minimum: 0, maximum: 100000 },
                y: { type: "number", minimum: 0, maximum: 100000 },
            },
        },
        text: { type: "string", description: "Text for type_text." },
        key: { type: "string", description: "Adapter-neutral key name for press_key." },
        direction: { type: "string", enum: ["up", "down", "left", "right"] },
        distance: { type: "number", minimum: 1, maximum: 100000 },
    },
};
const specs = [
    {
        name: "device_list",
        description: "List authorized Device Bridge devices and their connection/evidence state.",
        route: "device.list",
        required: [],
        properties: {},
    },
    {
        name: "device_capabilities",
        description: "Read one device passport and distinguish supported, authorized, and verified capabilities.",
        route: "device.capabilities",
        required: ["device_id"],
        properties: { device_id: deviceId },
    },
    {
        name: "device_observe_screen",
        description: "Capture or inspect the current authorized device screen without implying control.",
        route: "device.screen.observe",
        required: ["device_id"],
        properties: {
            device_id: deviceId,
            include_accessibility_tree: booleanField("Request the platform accessibility/UI tree when authorized."),
        },
    },
    {
        name: "device_open_app",
        description: "Open an authorized application on a device and return execution evidence.",
        route: "device.app.open",
        required: ["device_id", "app_id"],
        properties: {
            device_id: deviceId,
            app_id: stringField("Platform-neutral app identity or adapter-resolved package/bundle identifier."),
        },
    },
    {
        name: "device_ui_action",
        description: "Perform one bounded authorized UI action using selector, accessibility identity, text, or coordinates.",
        route: "device.ui.control",
        required: ["device_id", "action", "expected_postcondition"],
        properties: {
            device_id: deviceId,
            action: uiAction,
            expected_postcondition: objectField("Observable state that must hold after the action."),
        },
    },
    {
        name: "device_files_read",
        description: "Read an authorized device file through its platform adapter.",
        route: "device.files.read",
        required: ["device_id", "path"],
        properties: {
            device_id: deviceId,
            path: stringField("Adapter-scoped device path or content URI."),
            encoding: stringField("Requested text or binary encoding."),
        },
    },
    {
        name: "device_files_write",
        description: "Write an authorized device file and return post-write hash/evidence.",
        route: "device.files.write",
        required: ["device_id", "path", "content", "expected_sha256"],
        properties: {
            device_id: deviceId,
            path: stringField("Adapter-scoped device path or content URI."),
            content: stringField("Text or encoded content to write."),
            encoding: stringField("Content encoding."),
            expected_sha256: stringField("Required expected post-write SHA-256."),
        },
    },
];
const specsByName = new Map(specs.map((spec) => [spec.name, spec]));
export const deviceCapabilityToolDefinitions = specs.map((spec) => ({
    name: spec.name,
    description: `${spec.description} Platform permission alone does not establish LeeWay authorization or successful execution.`,
    inputSchema: {
        type: "object",
        properties: spec.properties,
        required: spec.required,
        additionalProperties: false,
    },
}));
export function isDeviceCapabilityTool(name) {
    return specsByName.has(name);
}
function isJsonObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
function valueMatchesSchema(value, schema) {
    if (schema.type === "string")
        return typeof value === "string" && value.trim().length > 0;
    if (schema.type === "boolean")
        return typeof value === "boolean";
    if (schema.type === "object")
        return isJsonObject(value);
    return false;
}
function validateUiAction(value) {
    if (!isJsonObject(value))
        throw new Error("Invalid arguments: action");
    const allowed = new Set(["type", "target", "text", "key", "direction", "distance"]);
    const unknown = Object.keys(value).filter((key) => !allowed.has(key));
    if (unknown.length > 0)
        throw new Error(`Unexpected UI action arguments: ${unknown.join(", ")}`);
    const type = value.type;
    const allowedTypes = ["tap", "long_press", "type_text", "press_key", "scroll", "select", "back", "home"];
    if (typeof type !== "string" || !allowedTypes.includes(type))
        throw new Error("Invalid UI action type.");
    if (!isJsonObject(value.target))
        throw new Error("UI actions require a target object.");
    const target = value.target;
    const targetKeys = new Set(["accessibility_id", "selector", "text", "x", "y"]);
    const unknownTargets = Object.keys(target).filter((key) => !targetKeys.has(key));
    if (unknownTargets.length > 0)
        throw new Error(`Unexpected UI target arguments: ${unknownTargets.join(", ")}`);
    const hasTextTarget = ["accessibility_id", "selector", "text"].some((key) => typeof target[key] === "string" && String(target[key]).trim().length > 0 && String(target[key]).length <= 512);
    const coordinates = typeof target.x === "number" && Number.isFinite(target.x) && target.x >= 0 && target.x <= 100000
        && typeof target.y === "number" && Number.isFinite(target.y) && target.y >= 0 && target.y <= 100000;
    if (!["back", "home", "press_key"].includes(type) && !hasTextTarget && !coordinates) {
        throw new Error("UI action target requires an accessibility ID, selector, visible text, or bounded x/y pair.");
    }
    if (type === "type_text" && (typeof value.text !== "string" || value.text.length === 0 || value.text.length > 10000)) {
        throw new Error("type_text requires bounded non-empty text.");
    }
    if (type === "press_key" && (typeof value.key !== "string" || value.key.trim().length === 0 || value.key.length > 128)) {
        throw new Error("press_key requires a bounded key name.");
    }
    if (type === "scroll") {
        if (!["up", "down", "left", "right"].includes(String(value.direction)))
            throw new Error("scroll requires a valid direction.");
        if (typeof value.distance !== "number" || !Number.isFinite(value.distance) || value.distance < 1 || value.distance > 100000) {
            throw new Error("scroll requires a bounded distance.");
        }
    }
}
function validateArguments(spec, args) {
    const missing = spec.required.filter((key) => args[key] === undefined || args[key] === null || args[key] === "");
    if (missing.length > 0)
        throw new Error(`Missing required arguments: ${missing.join(", ")}`);
    const unknown = Object.keys(args).filter((key) => !(key in spec.properties));
    if (unknown.length > 0)
        throw new Error(`Unexpected arguments: ${unknown.join(", ")}`);
    const invalid = Object.entries(args)
        .filter(([, value]) => value !== undefined)
        .filter(([key, value]) => !valueMatchesSchema(value, spec.properties[key]))
        .map(([key]) => key);
    if (invalid.length > 0)
        throw new Error(`Invalid arguments: ${invalid.join(", ")}`);
    if (spec.name === "device_ui_action") {
        validateUiAction(args.action);
        if (!isJsonObject(args.expected_postcondition) || Object.keys(args.expected_postcondition).length === 0) {
            throw new Error("device_ui_action requires a non-empty expected_postcondition.");
        }
    }
}
function timeoutMs() {
    const parsed = Number.parseInt(process.env.LEEWAY_DEVICE_MCP_TIMEOUT_MS || "30000", 10);
    return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1000), 120000) : 30000;
}
function result(payload, isError = false) {
    return { text: JSON.stringify(payload, null, 2), isError };
}
function hasEvidence(name, payload) {
    if (name === "device_list")
        return Array.isArray(payload.devices);
    if (name === "device_capabilities")
        return isJsonObject(payload.capabilities) || isJsonObject(payload.passport);
    if (name === "device_observe_screen")
        return typeof payload.artifact_ref === "string" || isJsonObject(payload.screen);
    if (name === "device_files_read")
        return typeof payload.content === "string" || typeof payload.artifact_ref === "string";
    if (name === "device_files_write")
        return typeof payload.sha256 === "string" && (typeof payload.receipt_id === "string" || isJsonObject(payload.receipt));
    if (name === "device_open_app")
        return payload.executed === true && (typeof payload.receipt_id === "string" || isJsonObject(payload.receipt));
    if (name === "device_ui_action") {
        return payload.executed === true
            && payload.postcondition_verified === true
            && (typeof payload.receipt_id === "string" || isJsonObject(payload.receipt));
    }
    return false;
}
export async function executeDeviceCapabilityTool(name, args = {}) {
    const spec = specsByName.get(name);
    if (!spec)
        throw new Error(`Unknown device capability tool: ${name}`);
    validateArguments(spec, args);
    const gatewayUrl = process.env.LEEWAY_DEVICE_MCP_GATEWAY_URL;
    const token = process.env.LEEWAY_DEVICE_MCP_BEARER_TOKEN;
    if (!gatewayUrl || !token) {
        return result({
            tool: name,
            state: "BLOCKED_ADAPTER_UNCONFIGURED",
            executed: false,
            required_environment: ["LEEWAY_DEVICE_MCP_GATEWAY_URL", "LEEWAY_DEVICE_MCP_BEARER_TOKEN"],
            normalized_arguments: args,
            claim_boundary: "The standard MCP contract is installed, but no authenticated Device Bridge gateway is configured. No device operation occurred.",
        }, true);
    }
    const base = new URL(gatewayUrl.endsWith("/") ? gatewayUrl : `${gatewayUrl}/`);
    if (base.protocol !== "https:" && !["127.0.0.1", "localhost", "::1", "[::1]"].includes(base.hostname)) {
        return result({
            tool: name,
            state: "BLOCKED_ADAPTER_CONFIGURATION_INVALID",
            executed: false,
            error: "A non-loopback Device Bridge gateway must use https.",
            claim_boundary: "No device request was sent.",
        }, true);
    }
    const endpoint = new URL(`tools/${encodeURIComponent(spec.route)}`, base);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs());
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({ tool: spec.route, arguments: args }),
            signal: controller.signal,
        });
        const raw = await response.text();
        let payload = raw;
        try {
            payload = JSON.parse(raw);
        }
        catch { /* preserve non-JSON evidence */ }
        const evidence = response.ok && isJsonObject(payload) && hasEvidence(name, payload);
        return result({
            tool: name,
            state: response.ok ? (evidence ? "ADAPTER_EVIDENCE_RECEIVED" : "ADAPTER_RESPONDED_WITHOUT_EVIDENCE") : "ADAPTER_FAILED",
            executed: evidence,
            upstream_http_status: response.status,
            upstream: payload,
            claim_boundary: evidence
                ? "The bridge returned tool-specific evidence. Veritas still controls final acceptance."
                : "The bridge response did not prove the requested device operation completed.",
        }, !evidence);
    }
    catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            return result({
                tool: name,
                state: "ADAPTER_TIMEOUT",
                executed: false,
                claim_boundary: "The Device Bridge request timed out; completion was not admitted.",
            }, true);
        }
        throw error;
    }
    finally {
        clearTimeout(timer);
    }
}
//# sourceMappingURL=device-capability-tools.js.map