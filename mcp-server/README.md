# Leeway Skills MCP Server

**A Leeway Industries Initiative**  
_By Leonard Jerome Lee_

## Overview

The **Leeway Skills MCP Server** exposes LeeWay skills and deterministic domain operations through MCP for Agent Lee and other compatible clients.

## Current verified surface

At the 2026-09-16 reconciliation point, a real stdio MCP round trip listed **286 tools**:

- 44 enabled legacy-registry skill entries;
- 238 recursively discovered portable `SKILL.md` files;
- 4 deterministic crochet tools with input validation and unit tests.

A skill-tool call returns the canonical skill instructions, user instruction, context, and options as an execution prompt for the host agent. It does not itself prove that an external application, model, browser, filesystem, or host tool executed. The four `crochet_*` tools execute deterministic logic directly. See `config/drive-mcp-reconciliation.json` for the status of drive-discovered MCP artifacts.

Instead of just reading skill documentation, your AI systems can now:

- ✅ Call skills as actual tools via MCP
- ✅ Access skill metadata and capabilities
- ✅ Chain multiple skills together
- ✅ Pass skills between agents and LLMs
- ✅ Execute skills with structured context and options

---

## What is MCP?

**Model Context Protocol** is a standard that allows LLMs and AI agents to:

- Discover available tools
- Request tool execution
- Receive structured results
- Integrate with external systems

The Leeway Skills MCP Server implements this protocol, making every skill a callable tool.

---

## Installation & Setup

### 1. Prerequisites

- Node.js 18+
- npm or yarn
- Leeway Skills directory properly configured

### 2. Install Dependencies

```powershell
Set-Location <path-to-LeeWay-Agent-Skills>\mcp-server
npm install
```

### 3. Build the Server

```powershell
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### 4. Verify Installation

```powershell
npm run build
ls dist/  # Should show index.js
```

---

## Running the MCP Server

### Option 1: Direct Execution

```powershell
Set-Location <path-to-LeeWay-Agent-Skills>\mcp-server
npm start
```

**Expected Output**:

```text
[Leeway Skills MCP] Loaded 282 tools (44 registry + 238 portable SKILL.md discoveries)
[Leeway Skills MCP] Server started successfully
[Leeway Skills MCP] Serving 286 tools (282 skill tools + 4 deterministic domain tools)
[Leeway Skills MCP] Ready to accept tool calls from LLMs
```

### Option 2: Run with Development Mode

```powershell
npm run dev
```

This rebuilds and starts in one command.

## Verified Badge Bundle

You can also generate a proof-backed badge bundle for another application:

```powershell
npm run build
node dist/install-badge-proof.js --target ..\some-app\public\leeway-proof --app-name "My App" --integration-method mcp-server
```

That command copies the `agentbage.png.png` badge, generates a `leeway-skills-proof.json` manifest, and creates embeddable HTML/CSS/JS files.

---

## Using with Agent Lee

### 1. Configure Agent Lee to Use the MCP Server

In Agent Lee's configuration file (`.agent.json` or similar):

```json
{
  "mcp": {
    "servers": [
      {
        "name": "leeway-skills",
        "command": "node",
        "args": ["c:\\Tools\\Leeway-Skills\\mcp-server\\dist\\index.js"],
        "env": {
          "LEEWAY_SKILLS_PATH": "c:\\Tools\\Leeway-Skills"
        }
      }
    ]
  },
  "tools": {
    "enableMCP": true,
    "mcpServers": ["leeway-skills"]
  }
}
```

### 2. Agent Lee Can Now Use Skills as Tools

```javascript
// In Agent Lee code, the skills are now available as tools
const result = await agentLee.useTool("typescript-codegen", {
  instruction: "Generate a type-safe API client for a REST API",
  context: {
    framework: "axios",
    apiEndpoint: "https://api.example.com",
  },
  options: {
    includeErrorHandling: true,
    useAsync: true,
  },
});
```

### 3. Invoke Skills Directly

```javascript
// Using the MCP protocol directly
const skill = "python-codegen";
const args = {
  instruction: "Create a FastAPI application with proper async patterns",
  context: {
    framework: "fastapi",
    requirements: "User authentication, database models",
  },
  options: {
    useTypehints: true,
    includeDocs: true,
  },
};

const response = await mcp.callTool(skill, args);
```

---

## Available Skills as MCP Tools

The server exposes **44 skills** organized in **24 categories**:

### By Category

| Category        | Skills | Example Tools                              |
| --------------- | ------ | ------------------------------------------ |
| code-generation | 3      | `typescript-codegen`, `python-codegen`     |
| agent-patterns  | 3      | `agent-loop-patterns`, `autonomous-agents` |
| code-analysis   | 2      | `static-analysis`, `refactoring`           |
| testing         | 2      | `unit-testing`, `integration-testing`      |
| devops          | 2      | `dockerfile-creation`, `kubernetes`        |
| ai-ml           | 2      | `llm-prompting`, `ml-model-development`    |
| And 18 more...  | 26+    | See full list below                        |

### Full Tool List

All available skills are returned by the MCP `list_tools` endpoint:

```powershell
# Query the server directly
npm start | grep "Loaded"
```

Each tool name is in the format: `{skill-name}` (lowercase, hyphens)

Examples:

- `typescript-codegen`
- `python-codegen`
- `full-stack-application`
- `agent-orchestration`
- `llm-prompting`
- `kubernetes-deployment`
- `system-design-architecture`
- `database-schema-design`

---

## Tool Invocation Format

### Standard Tool Call

```json
{
  "method": "call_tool",
  "params": {
    "name": "typescript-codegen",
    "arguments": {
      "instruction": "Generate a REST API client",
      "context": {
        "code": "// API definition",
        "framework": "axios",
        "language": "typescript"
      },
      "options": {
        "includeTypes": true,
        "includeErrors": true
      }
    }
  }
}
```

### Parameters Explained

| Parameter     | Type   | Required | Description                                    |
| ------------- | ------ | -------- | ---------------------------------------------- |
| `instruction` | string | ✅       | What to do with the skill                      |
| `context`     | object | ❌       | Code, files, requirements, framework, language |
| `options`     | object | ❌       | Skill-specific options                         |

### Response Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "Generated code or result with skill expertise applied..."
    }
  ],
  "isError": false
}
```

---

## Use Cases

### 1. Agent Lee Using Leeway Skills

**Agent Lee wants to generate a TypeScript API client:**

```text
Agent Lee: "Use the typescript-codegen skill to create an API client for the REST endpoint at /users"

MCP Server: Lists typescript-codegen skill
Agent Lee: Calls typescript-codegen with instruction and context
MCP Server: Returns compiled TypeScript code
Agent Lee: Can directly use the generated code
```

### 2. Passing Skills Between Agents

**Multiple agents collaborating:**

```javascript
// Agent A discovers available skills
const skills = await mcp.listTools();

// Agent A calls a skill
const generatedCode = await mcp.callTool("python-codegen", {
  instruction: "Create FastAPI application",
  // ...
});

// Agent A shares the skill result with Agent B
agentB.receiveToolResult("python-codegen", generatedCode);

// Agent B can also call the same skill with different params
const optimizedCode = await mcp.callTool("code-analysis", {
  instruction: "Optimize the generated code for performance",
  context: { code: generatedCode },
});
```

### 3. Chaining Skills

**Execute multiple skills in sequence:**

```javascript
// Step 1: Generate code
const codeGenResult = await mcp.callTool("typescript-codegen", {
  instruction: "Create a React component",
});

// Step 2: Analyze the generated code
const analysisResult = await mcp.callTool("static-analysis", {
  instruction: "Find issues in the generated code",
  context: { code: codeGenResult },
});

// Step 3: Generate tests
const testResult = await mcp.callTool("unit-testing", {
  instruction: "Create unit tests for the component",
  context: { code: codeGenResult },
});
```

---

## Tool Discovery

### List All Available Tools

```bash
# Using curl to query the MCP server
curl -X POST http://localhost:3000/tools \
  -H "Content-Type: application/json" \
  -d '{"method":"list_tools"}'
```

### Output Example

```json
{
  "tools": [
    {
      "name": "typescript-codegen",
      "description": "Generating production-ready TypeScript code...",
      "inputSchema": {
        "type": "object",
        "properties": {
          "instruction": { "type": "string" },
          "context": { "type": "object" },
          "options": { "type": "object" }
        },
        "required": ["instruction"]
      }
    }
    // ... more tools
  ]
}
```

---

## Architecture

```text
┌─────────────────────────────────────┐
│   Agent Lee / LLMs / Agents        │
│   (Claude, GPT-4, Custom Agents)   │
└──────────────┬──────────────────────┘
               │
               │ MCP Protocol
               │ (JSON-RPC over stdio)
               ▼
┌─────────────────────────────────────┐
│   Leeway Skills MCP Server          │
│   (mcp-server/dist/index.js)        │
└──────────────┬──────────────────────┘
               │
               │ Reads & Executes
               │
               ▼
┌─────────────────────────────────────┐
│   Leeway Skills Registry            │
│   (skills-registry.json)            │
│                                     │
│   ├─ TypeScript Codegen            │
│   ├─ Python Codegen                │
│   ├─ Agent Orchestration           │
│   ├─ LLM Prompting                 │
│   └─ 40+ More Skills               │
└─────────────────────────────────────┘
```

---

## Configuration

### Environment Variables

```powershell
# Optional - set registry path
$env:LEEWAY_SKILLS_PATH = "c:\Tools\Leeway-Skills"

# Optional - set MCP server port
$env:MCP_PORT = "3000"

# Optional - enable debug logging
$env:DEBUG = "leeway-skills:*"
```

### Server Configuration File

Create `mcp-server/config.json`:

```json
{
  "registryPath": "c:\\Tools\\Leeway-Skills\\scripts\\skills-registry.json",
  "skillsPath": "c:\\Tools\\Leeway-Skills\\skills",
  "port": 3000,
  "logging": {
    "level": "info",
    "format": "json"
  },
  "categories": {
    "enabled": true,
    "filtering": true
  },
  "capabilities": {
    "tools": true,
    "introspection": true,
    "chaining": true
  }
}
```

---

## Integration Examples

### With Claude (via Tools API)

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Define Leeway Skills as tools for Claude
const leewayTools = await mcp.listTools();

const response = await client.messages.create({
  model: "claude-3-opus-20240229",
  max_tokens: 1024,
  tools: leewayTools,
  messages: [
    {
      role: "user",
      content:
        "Generate a TypeScript API client using the typescript-codegen skill",
    },
  ],
});

// Claude can now call Leeway Skills as tools
```

### With OpenAI (via Function Calling)

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

// Convert Leeway Skills to OpenAI function schema
const leewayFunctions = await mcp.listTools();

const response = await openai.chat.completions.create({
  model: "gpt-4-turbo-preview",
  functions: leewayFunctions.map((tool) => ({
    name: tool.name,
    description: tool.description,
    parameters: tool.inputSchema,
  })),
  messages: [
    {
      role: "user",
      content:
        "Use the llm-prompting skill to improve this prompt for better results",
    },
  ],
});

// OpenAI can execute Leeway Skills via function calls
```

---

## Troubleshooting

### Server Won't Start

**Problem**: `Error: Cannot find module '@modelcontextprotocol/sdk'`

**Solution**:

```powershell
cd c:\Tools\Leeway-Skills\mcp-server
npm install
npm run build
```

### Skills Not Loading

**Problem**: `Loaded 0 skills from registry`

**Solution**:

1. Check registry path: `ls c:\Tools\Leeway-Skills\scripts\skills-registry.json`
2. Verify JSON syntax: `cat scripts/skills-registry.json | jq .`
3. Ensure registry has `skills` array with enabled entries

### MCP Client Can't Connect

**Problem**: `Connection refused` or `Can't find running MCP server`

**Solution**:

1. Ensure server is started: `npm start`
2. Check stdio is properly configured
3. Verify client uses correct command in config

### Memory/Performance Issues

**Problem**: Server using too much memory with many skill calls

**Solution**:

1. Implement skill caching: Set `CACHE_SKILLS=true`
2. Limit concurrent executions: Set `MAX_CONCURRENT=5`
3. Clear old execution logs: `npm run clean:logs`

---

## Development

### Contributing New Skill Adapters

Add new skill-specific logic in `src/adapters/`:

```typescript
// src/adapters/typescript-codegen-adapter.ts
export async function executeTypescriptCodegen(
  instruction: string,
  context: any,
  options: any,
): Promise<string> {
  // Custom logic for this specific skill
  return generatedCode;
}
```

### Running Tests

```powershell
npm run test
npm run test:coverage
```

### Building for Production

```powershell
npm run build
npm run test
npm prune --production
```

---

## Performance Metrics

- **Skill Loading**: ~100ms for 44 skills
- **Tool Discovery**: ~50ms response time
- **Tool Execution**: Depends on LLM but typically 500ms-30s
- **Memory Footprint**: ~45MB with all skills loaded

---

## Security Considerations

### Leeway Governance

The MCP Server enforces **Leeway Standards** compliance:

- ✅ All skills validated against governance policies
- ✅ Execution logged for audit trails
- ✅ No secrets or credentials passed to LLMs
- ✅ Rate limiting on tool calls
- ✅ Activity monitoring and reporting

### Best Practices

1. **Never pass secrets in instructions**
2. **Always validate instruction output**
3. **Monitor tool execution logs**
4. **Keep skills enabled/disabled appropriately**
5. **Run server in secure environment**

---

## API Reference

### ListToolsRequest

List all available Leeway Skills as MCP tools.

**Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "tools/list",
  "id": 1
}
```

**Response**:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "tools": [
      {
        "name": "typescript-codegen",
        "description": "...",
        "inputSchema": { ... }
      }
    ]
  }
}
```

### CallToolRequest

Execute a specific Leeway Skill.

**Request**:

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "typescript-codegen",
    "arguments": {
      "instruction": "Generate API client",
      "context": { ... },
      "options": { ... }
    }
  }
}
```

**Response**:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [{ "type": "text", "text": "Generated code..." }]
  }
}
```

---

## Leeway Standards Compliance

The MCP Server maintains **Leeway Standards** governance:

✅ **NO_SECRETS_IN_CODE** — No credentials in tool calls  
✅ **HEADERS_REQUIRED** — All files have proper headers  
✅ **TAGS_REQUIRED** — Tools properly tagged and categorized  
✅ **NO_CIRCULAR_DEPS** — Skills have no circular dependencies  
✅ **DOCUMENTATION** — Complete API and usage documentation

---

## Support & Documentation

- **Main Docs**: `c:\Tools\Leeway-Skills\README.md`
- **Skill Docs**: `c:\Tools\Leeway-Skills\skills\{category}\{skill}\SKILL.md`
- **Branding**: `c:\Tools\Leeway-Skills\LEEWAY_SKILLS_BRANDING.md`
- **Governance**: `c:\Tools\Leeway-Skills\documents\LEEWAY_STANDARDS_COMPLIANCE.md`
- **Badge Integration**: `c:\Tools\AIskills\documents\LEEWAY_BADGE_INTEGRATION.md`

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: March 15, 2026  
**Organization**: Leeway Industries | By Leonard Jerome Lee
