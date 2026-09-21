/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.EXECUTION
TAG: LEEWAY.SKILLS.EXECUTION.GATEWAY

5WH:
WHAT = Unified execution router for every canonical LeeWay skill.
WHY = Make all portable skills executable through one governed fabric while separating contract execution from downstream side effects.
WHO = Leeway Industries / Creator Authority.
WHERE = mcp-server/src/skill-execution-gateway.ts
WHEN = 2026
HOW = Classify the skill, execute its local contract, optionally invoke an explicitly requested bounded game/Blender tool, and return evidence.
LICENSE: MIT
*/

import crypto from "node:crypto";
import {
  executeGameDevelopmentTool,
  isGameDevelopmentTool,
} from "./game-development-tools.js";

export type SkillExecutionRoute =
  | "BLENDER_GATEWAY"
  | "GAME_GATEWAY"
  | "PLAYWRIGHT_MCP"
  | "GITHUB_MCP"
  | "FILESYSTEM_MCP"
  | "INSFORGE_MCP"
  | "MARKETING_CLI"
  | "TOOL_GATEWAY"
  | "LOCAL_SKILL_RUNTIME";

export interface GatewaySkill {
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  tags: string[];
  skillPath: string;
  version: string;
}

export interface GatewayArgs {
  instruction: string;
  context?: Record<string, unknown>;
  options?: Record<string, unknown>;
}

function includesAny(value: string, terms: string[]): boolean {
  const normalized = value.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

export function classifySkillRoute(skill: GatewaySkill): SkillExecutionRoute {
  const id = skill.name.toLowerCase();
  const category = skill.category.toLowerCase();
  const joined = [id, category, ...skill.tags, ...skill.capabilities]
    .join(" ")
    .toLowerCase();

  if (
    id === "leeway-blender-mcp" ||
    includesAny(joined, ["blender", "3d asset", "mesh"])
  ) {
    return "BLENDER_GATEWAY";
  }

  if (
    id === "video-game-development" ||
    includesAny(joined, ["game-development", "game development"])
  ) {
    return "GAME_GATEWAY";
  }

  if (
    includesAny(joined, [
      "playwright",
      "browser",
      "frontend",
      "ui/ux",
      "web-development",
      "accessibility-testing",
    ])
  ) {
    return "PLAYWRIGHT_MCP";
  }

  if (
    includesAny(joined, [
      "git-workflow",
      "version-control",
      "github",
      "ci-cd",
      "cicd",
    ])
  ) {
    return "GITHUB_MCP";
  }

  if (
    includesAny(joined, [
      "file-organization",
      "filesystem",
      "documentation",
      "code-analysis",
      "code-generation",
    ])
  ) {
    return "FILESYSTEM_MCP";
  }

  if (
    includesAny(joined, [
      "insforge",
      "database",
      "backend",
      "sql",
      "schema",
    ])
  ) {
    return "INSFORGE_MCP";
  }

  if (
    category.startsWith("external/marketing") ||
    includesAny(joined, [
      "marketing",
      "seo",
      "ads",
      "email-sequence",
      "revops",
    ])
  ) {
    return "MARKETING_CLI";
  }

  if (
    includesAny(joined, [
      "devops",
      "infrastructure",
      "tool-integration",
      "security",
      "testing",
    ])
  ) {
    return "TOOL_GATEWAY";
  }

  return "LOCAL_SKILL_RUNTIME";
}

function stableHash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function executeSkillThroughGateway(
  skill: GatewaySkill,
  args: GatewayArgs,
  skillInstructions: string,
): Promise<string> {
  const instruction = args.instruction || "";
  const context = args.context || {};
  const options = args.options || {};
  const route = classifySkillRoute(skill);

  const executionPrompt = [
    `Executing the "${skill.name}" skill from LeeWay Agent Skills.`,
    "",
    "AUTHORITY:",
    "Creator/Human Authority and LeeWay Standards remain higher authority than this skill.",
    "",
    "SKILL DOCUMENTATION:",
    skillInstructions,
    "",
    "USER INSTRUCTION:",
    instruction,
    "",
    "CONTEXT PROVIDED:",
    JSON.stringify(context, null, 2),
    "",
    "OPTIONS:",
    JSON.stringify(options, null, 2),
    "",
    "Execute the canonical skill workflow. Do not claim external execution unless downstream evidence reports executed=true.",
  ].join("\n");

  let downstream: unknown = null;
  let externalActionExecuted = false;

  const requestedTool =
    typeof options.gateway_tool === "string" ? options.gateway_tool : "";
  const requestedArguments =
    options.gateway_arguments &&
    typeof options.gateway_arguments === "object" &&
    !Array.isArray(options.gateway_arguments)
      ? (options.gateway_arguments as Record<string, unknown>)
      : {};

  if (requestedTool) {
    if (!isGameDevelopmentTool(requestedTool)) {
      throw new Error(
        `Requested gateway_tool "${requestedTool}" is not in the bounded game/Blender tool registry.`,
      );
    }

    downstream = JSON.parse(
      await executeGameDevelopmentTool(requestedTool, requestedArguments),
    ) as Record<string, unknown>;

    externalActionExecuted =
      Boolean(downstream) &&
      typeof downstream === "object" &&
      (downstream as Record<string, unknown>).executed === true;
  }

  const executionId = `skill-${stableHash(
    [
      skill.skillPath,
      instruction,
      JSON.stringify(context),
      JSON.stringify(options),
    ].join("\n"),
  ).slice(0, 24)}`;

  return JSON.stringify(
    {
      schema: "leeway.skill-execution.v1",
      state: "SKILL_CONTRACT_EXECUTED",
      executed: true,
      external_action_executed: externalActionExecuted,
      execution_id: executionId,
      skill: {
        name: skill.name,
        category: skill.category,
        path: skill.skillPath,
        version: skill.version,
      },
      route,
      instruction,
      context,
      options,
      execution_prompt: executionPrompt,
      downstream,
      claim_boundary:
        "executed=true means the governed skill contract was resolved and executed locally. external_action_executed=true is required before claiming a downstream application, browser, repository, engine, Blender worker, provider, or host mutation actually ran.",
    },
    null,
    2,
  );
}
