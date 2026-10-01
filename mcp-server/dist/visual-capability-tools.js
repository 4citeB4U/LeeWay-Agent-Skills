/*
LEEWAY HEADER — DO NOT REMOVE

REGION: LEEWAY.SKILLS.MCP
TAG: LEEWAY.SKILLS.MCP.VISUAL_CAPABILITIES

5WH:
WHAT = Portable MCP contracts for image generation, visual inspection, and image-to-3D conversion
WHY = Recover proven LeeWay visual lanes without binding Agent Lee to one model, host path, or provider
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = mcp-server/src/visual-capability-tools.ts
WHEN = 2026
HOW = Strict schemas plus configured provider adapters with honest execution states

LICENSE:
MIT
*/
const stringField = (description) => ({ type: "string", minLength: 1, description });
const objectField = (description) => ({
    type: "object",
    minProperties: 1,
    description,
    additionalProperties: true,
});
const numberField = (description) => ({ type: "number", description });
const booleanField = (description) => ({ type: "boolean", description });
const providerField = {
    type: "string",
    enum: ["image", "vision", "image-to-3d"],
    description: "Visual provider family whose health should be read.",
};
const specs = [
    {
        name: "visual_provider_status",
        description: "Read the health/status of a selected LeeWay visual provider without generating or modifying an artifact.",
        method: "GET",
        route: "status",
        required: ["provider"],
        properties: { provider: providerField },
    },
    {
        name: "visual_generate_image",
        description: "Generate a raster image through an authorized provider and return the provider artifact reference and evidence payload.",
        family: "image",
        method: "POST",
        route: "image/generate",
        required: ["prompt"],
        properties: {
            prompt: stringField("Concrete image-generation prompt."),
            width: numberField("Requested pixel width; the provider may apply a bounded maximum."),
            height: numberField("Requested pixel height; the provider may apply a bounded maximum."),
            steps: numberField("Requested inference step count; the provider may clamp it."),
            guidance_scale: numberField("Requested classifier-free guidance scale."),
            seed: numberField("Optional deterministic seed."),
            return_base64: booleanField("Return image bytes as base64 when the provider supports it."),
        },
    },
    {
        name: "visual_inspect_image",
        description: "Inspect an authorized image artifact with a configured vision provider and an explicit rubric.",
        family: "vision",
        method: "POST",
        route: "vision/analyze",
        required: ["image_ref", "rubric"],
        properties: {
            image_ref: stringField("Authorized image artifact reference understood by the provider."),
            rubric: objectField("Observable visual acceptance criteria."),
            question: stringField("Optional focused inspection question."),
        },
    },
    {
        name: "visual_convert_image_to_3d",
        description: "Convert an authorized image artifact into a 3D asset through a configured provider.",
        family: "image-to-3d",
        method: "POST",
        route: "convert/from-path",
        required: ["image_ref"],
        properties: {
            image_ref: stringField("Authorized local or provider-resolved image artifact reference."),
            character_id: stringField("Stable character or asset identity."),
            output_format: { type: "string", enum: ["obj", "glb", "ply", "stl"], description: "Requested mesh format." },
        },
    },
];
const specsByName = new Map(specs.map((spec) => [spec.name, spec]));
export const visualCapabilityToolDefinitions = specs.map((spec) => ({
    name: spec.name,
    description: `${spec.description} Repository presence or an adapter response is not Veritas acceptance proof.`,
    inputSchema: {
        type: "object",
        properties: spec.properties,
        required: spec.required,
        additionalProperties: false,
    },
}));
export function isVisualCapabilityTool(name) {
    return specsByName.has(name);
}
function isJsonObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
function valueMatchesSchema(value, schema) {
    if (schema.enum && Array.isArray(schema.enum) && !schema.enum.includes(value))
        return false;
    switch (schema.type) {
        case "string": return typeof value === "string" && value.trim().length > 0;
        case "number": return typeof value === "number" && Number.isFinite(value);
        case "boolean": return typeof value === "boolean";
        case "object": return isJsonObject(value) && Object.keys(value).length > 0;
        default: return false;
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
}
function gatewayFor(family) {
    const mapping = {
        image: { url: "LEEWAY_IMAGE_GENERATION_URL", token: "LEEWAY_IMAGE_GENERATION_BEARER_TOKEN" },
        vision: { url: "LEEWAY_VISION_GATEWAY_URL", token: "LEEWAY_VISION_GATEWAY_BEARER_TOKEN" },
        "image-to-3d": { url: "LEEWAY_IMAGE_TO_3D_URL", token: "LEEWAY_IMAGE_TO_3D_BEARER_TOKEN" },
    };
    const names = mapping[family];
    return {
        url: process.env[names.url],
        token: process.env[names.token],
        requiredEnv: [names.url, `${names.token} for non-loopback providers`],
    };
}
function isLoopback(hostname) {
    return hostname === "127.0.0.1" || hostname === "localhost" || hostname === "::1" || hostname === "[::1]";
}
function providerEndpoint(baseUrl, route, token) {
    const base = new URL(baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
    if (!["http:", "https:"].includes(base.protocol))
        throw new Error("Visual provider URL must use http or https.");
    if (!isLoopback(base.hostname) && !token)
        throw new Error("A bearer token is required for a non-loopback visual provider.");
    if (!isLoopback(base.hostname) && base.protocol !== "https:")
        throw new Error("A non-loopback visual provider must use https.");
    return new URL(route, base);
}
function nonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}
function providerExecuted(name, payload) {
    if (!isJsonObject(payload))
        return false;
    if (name === "visual_generate_image") {
        const artifact = payload.path ?? payload.outputPath ?? payload.artifact_ref ?? payload.image_path;
        const providerAccepted = payload.status === "READY" || payload.ok === true;
        return providerAccepted && nonEmptyString(artifact);
    }
    if (name === "visual_convert_image_to_3d") {
        const files = payload.mesh_files ?? payload.artifact_urls;
        const artifact = payload.path ?? payload.artifact_ref;
        return (payload.ok === true || payload.executed === true)
            && ((Array.isArray(files) && files.some(nonEmptyString)) || nonEmptyString(artifact));
    }
    if (name === "visual_inspect_image") {
        return (payload.ok === true || payload.executed === true)
            && (payload.result !== undefined || payload.analysis !== undefined);
    }
    return false;
}
function timeoutMs() {
    const parsed = Number.parseInt(process.env.LEEWAY_VISUAL_MCP_TIMEOUT_MS || "120000", 10);
    return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1000), 900000) : 120000;
}
function result(payload, isError = false) {
    return { text: JSON.stringify(payload, null, 2), isError };
}
export async function executeVisualCapabilityTool(name, args = {}) {
    const spec = specsByName.get(name);
    if (!spec)
        throw new Error(`Unknown visual capability tool: ${name}`);
    validateArguments(spec, args);
    const family = (spec.family ?? args.provider);
    const gateway = gatewayFor(family);
    if (!gateway.url) {
        return result({
            tool: name,
            provider_family: family,
            state: "BLOCKED_ADAPTER_UNCONFIGURED",
            executed: false,
            required_environment: gateway.requiredEnv,
            normalized_arguments: args,
            claim_boundary: "The portable MCP contract is installed, but no selected visual provider is configured. No image, analysis, or 3D artifact was created.",
        }, true);
    }
    let endpoint;
    try {
        endpoint = providerEndpoint(gateway.url, spec.route, gateway.token);
    }
    catch (error) {
        return result({
            tool: name,
            provider_family: family,
            state: "BLOCKED_ADAPTER_CONFIGURATION_INVALID",
            executed: false,
            error: error instanceof Error ? error.message : String(error),
            claim_boundary: "No provider request was sent.",
        }, true);
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs());
    try {
        const headers = { accept: "application/json" };
        if (gateway.token)
            headers.authorization = `Bearer ${gateway.token}`;
        if (spec.method === "POST")
            headers["content-type"] = "application/json";
        const response = await fetch(endpoint, {
            method: spec.method,
            headers,
            body: spec.method === "POST" ? JSON.stringify(name === "visual_convert_image_to_3d"
                ? { image_path: args.image_ref, character_id: args.character_id, output_format: args.output_format }
                : args) : undefined,
            signal: controller.signal,
        });
        const raw = await response.text();
        let payload = raw;
        try {
            payload = JSON.parse(raw);
        }
        catch { /* keep text response as evidence */ }
        const executed = response.ok && providerExecuted(name, payload);
        const responded = response.ok && name === "visual_provider_status";
        return result({
            tool: name,
            provider_family: family,
            state: responded ? "PROVIDER_STATUS_RECEIVED" : response.ok
                ? (executed ? "ADAPTER_EXECUTED_UNVERIFIED" : "ADAPTER_RESPONDED_WITHOUT_ARTIFACT_EVIDENCE")
                : "ADAPTER_FAILED",
            executed,
            provider_http_status: response.status,
            provider: payload,
            claim_boundary: responded
                ? "Provider status was read; this is not generation or task acceptance proof."
                : executed
                    ? "The provider returned tool-specific artifact/result evidence. Veritas still requires artifact existence, type, hash, and task-specific acceptance checks."
                    : "The provider response did not prove that the requested visual artifact or analysis was produced.",
        }, !responded && !executed);
    }
    catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            return result({
                tool: name,
                provider_family: family,
                state: "ADAPTER_TIMEOUT",
                executed: false,
                claim_boundary: "The visual-provider request timed out; no artifact or analysis is admitted.",
            }, true);
        }
        throw error;
    }
    finally {
        clearTimeout(timer);
    }
}
//# sourceMappingURL=visual-capability-tools.js.map