import assert from "node:assert/strict";
import test from "node:test";
import {
  classifySkillRoute,
  executeSkillThroughGateway,
} from "./skill-execution-gateway.js";
import type { GatewaySkill } from "./skill-execution-gateway.js";

function skill(
  name: string,
  category: string,
  tags: string[] = [],
): GatewaySkill {
  return {
    name,
    category,
    description: `${name} description`,
    capabilities: ["Execute canonical SKILL.md workflow"],
    tags,
    skillPath: `skills/${category}/${name}`,
    version: "1.0.0",
  };
}

test("classifies canonical execution routes", () => {
  assert.equal(
    classifySkillRoute(skill("leeway-blender-mcp", "leeway-blender-mcp")),
    "BLENDER_GATEWAY",
  );
  assert.equal(
    classifySkillRoute(
      skill("video-game-development", "video-game-development"),
    ),
    "GAME_GATEWAY",
  );
  assert.equal(
    classifySkillRoute(skill("accessibility-testing", "external/workforce")),
    "PLAYWRIGHT_MCP",
  );
  assert.equal(
    classifySkillRoute(skill("version-control", "external/workforce")),
    "GITHUB_MCP",
  );
  assert.equal(
    classifySkillRoute(skill("file-organization", "external/workforce")),
    "FILESYSTEM_MCP",
  );
  assert.equal(
    classifySkillRoute(skill("database-schema-design", "external/workforce")),
    "INSFORGE_MCP",
  );
  assert.equal(
    classifySkillRoute(skill("seo-audit", "external/marketing")),
    "MARKETING_CLI",
  );
  assert.equal(
    classifySkillRoute(skill("secure-architecture", "security")),
    "TOOL_GATEWAY",
  );
  assert.equal(
    classifySkillRoute(skill("llm-prompting", "ai-ml")),
    "LOCAL_SKILL_RUNTIME",
  );
});

test("executes a skill contract without claiming downstream action", async () => {
  const payload = JSON.parse(
    await executeSkillThroughGateway(
      skill("llm-prompting", "ai-ml"),
      {
        instruction: "Verify the skill contract only.",
        options: { verification_probe: true },
      },
      "# LLM Prompting\nCanonical instructions.",
    ),
  );

  assert.equal(payload.schema, "leeway.skill-execution.v1");
  assert.equal(payload.state, "SKILL_CONTRACT_EXECUTED");
  assert.equal(payload.executed, true);
  assert.equal(payload.external_action_executed, false);
  assert.equal(payload.route, "LOCAL_SKILL_RUNTIME");
  assert.match(payload.execution_id, /^skill-[a-f0-9]{24}$/);
});

test("allows an explicit bounded game tool through the shared skill gateway", async () => {
  const payload = JSON.parse(
    await executeSkillThroughGateway(
      skill("video-game-development", "video-game-development"),
      {
        instruction: "Normalize a tiny vertical slice.",
        options: {
          gateway_tool: "game_plan_slice",
          gateway_arguments: {
            concept: "One room movement proof",
            engine: "godot",
            target_platforms: ["windows"],
            acceptance_criteria: ["Player can move"],
          },
        },
      },
      "# Video Game Development",
    ),
  );

  assert.equal(payload.state, "SKILL_CONTRACT_EXECUTED");
  assert.equal(payload.route, "GAME_GATEWAY");
  assert.equal(payload.external_action_executed, true);
  assert.equal(payload.downstream.state, "EXECUTED_LOCAL");
  assert.equal(payload.downstream.tool, "game_plan_slice");
});

test("rejects gateway tools outside the bounded game/Blender registry", async () => {
  await assert.rejects(
    () =>
      executeSkillThroughGateway(
        skill("llm-prompting", "ai-ml"),
        {
          instruction: "Do not execute arbitrary tools.",
          options: { gateway_tool: "arbitrary_shell" },
        },
        "# LLM Prompting",
      ),
    /not in the bounded game\/Blender tool registry/,
  );
});
