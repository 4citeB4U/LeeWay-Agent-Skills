# 🧠 Leeway Agent Skills - LLM Lifelong Learning System

**Machine-Readable Learning Framework for AI Agents**  
_Leeway Industries | Leonard Jerome Lee_

---

## 🎯 What This System Is

### Leeway Agent Skills + Workflows + Lifelong Learning = LLM School

This is an exclusive architecture for LLM agents to:

- Load skill atoms and execution templates
- Practice with workflows (proven sequences)
- Learn from every task via episodic, semantic, and procedural memory
- Improve autonomously with each execution
- Build persistent knowledge that makes them smarter immediately

**Not for humans. Not time-based. For LLMs only.**

**Verified repository state (2026-09-16)**: 238 unique `SKILL.md` capabilities; 286 locally protocol-listed stdio MCP tools; 4 deterministic crochet-domain tools; 61 imported marketing CLIs syntax-verified. GitHub Actions is currently `FAILED_UNDIAGNOSED_EXTERNAL` because the observed jobs failed before any runner steps, so hosted deployment is not claimed.

Drive reconciliation evidence is recorded in [`config/leeway-capability-universe.json`](config/leeway-capability-universe.json), [`config/drive-mcp-reconciliation.json`](config/drive-mcp-reconciliation.json), and [`skills/external/SOURCES.md`](skills/external/SOURCES.md). A file, registry entry, generated agent, or configured endpoint is not described as live unless fresh execution evidence proves it.

## 🔒 Leeway Standards Compliance

**✅ Status**: ACTIVE COMPLIANCE MONITORING  
**Framework**: Leeway SDK 1.0.0  
**Score Target**: 85/100  
**Last Audit**: March 15, 2026

This project is fully integrated with **Leeway Standards** governance framework. All skills, agents, and code files are continuously monitored for:

- ✅ Mandatory headers on tracked files
- ✅ No hardcoded secrets in code
- ✅ Valid tags and regions (REGION/TAG)
- ✅ No circular dependencies
- ✅ Complete documentation coverage

**Compliance Monitoring Agents**:

- `ComplianceMonitor` — Hourly compliance scans
- `SkillValidator` — Per-skill validation
- `AutonomyAuditor` — Weekly agent pattern audits
- `HeaderInjector` — Automated Leeway header injection

**Quick Commands**:

```powershell
# Initialize and check compliance (first time)
node scripts/init-leeway.js

# Run full compliance audit
node scripts/leeway-agents/compliance-monitor.js

# Auto-fix missing headers
node scripts/leeway-agents/header-injector.js
```

📖 **Docs**: [Leeway Standards Compliance](documents/LEEWAY_STANDARDS_COMPLIANCE.md) | [Integration Guide](documents/LEEWAY_INTEGRATION_GUIDE.md)

## MCP Server - Use Skills as Tools

Leeway Agent Skills is available as an **MCP (Model Context Protocol) server**. It currently discovers 44 enabled legacy-registry entries and 238 portable `SKILL.md` files, then adds four deterministic crochet tools for a locally verified total of 286 protocol-listed tools.

### Install As Full NPM SDK

You can now install the **full Leeway Agent Skills application** as one npm package:

```powershell
npm install @agentlee5/agent-skills
```

That install ships the skill library, workflows, standards toolkit, scripts, badge asset, runtime config, and the built MCP server together.

Quick commands after install:

```powershell
leeway-agent-skills info
leeway-agent-skills-mcp
leeway-agent-skills-badge .\public "My App" mcp-server
leeway-agent-skills extract .\leeway-agent-skills-app
```

### Quick Start

```powershell
# 1. Install & build the MCP server
cd mcp-server
npm install
npm run build

# 2. Start the server
npm start

# Expected: 282 skill tools + 4 deterministic domain tools = 286 tools
```

### Use Skills in Agent Lee

Configure Agent Lee to connect to the MCP server, then:

```text
Agent Lee: "Use the typescript-codegen skill to create an API client"
→ Agent Lee calls typescript-codegen tool
→ Gets production TypeScript code with proper types and error handling
```

### Why MCP?

Instead of just reading documentation, your agents can now:

- ✅ **Call skills as tools** - Execute skill expertise directly
- ✅ **Chain skills** - Compose multiple skills together
- ✅ **Share skills** - Pass tools between agents and LLMs
- ✅ **Discover tools** - LLMs discover 44 available skills
- ✅ **Structured results** - Get formatted output ready to use

### 📚 Documentation

- **[MCP Server README](mcp-server/README.md)** - How to run and use the MCP server
- **[Agent Lee Integration](documents/AGENT_LEE_INTEGRATION.md)** - Connect Agent Lee to Leeway Agent Skills
- **[MCP Architecture](documents/MCP_ARCHITECTURE.md)** - Technical deep dive into the MCP implementation
- **[Badge Integration](documents/LEEWAY_BADGE_INTEGRATION.md)** - Add a proof badge to another application
- **[NPM SDK Guide](documents/LEEWAY_NPM_SDK.md)** - Install the full Leeway Agent Skills application from npm

---

## � Leeway Workflows - Automated Orchestration

**NEW**: Beyond individual skills, **Leeway Workflows** provides pre-engineered automation templates that compose skills into proven end-to-end processes.

### What You Get

Instead of "grab one skill at a time," you now get **workflow bundles**:

```text
Workflow: "CI Failure Recovery"
├─ Auto-loads 5 required skills:
│  ├─ skill.ci-log-analysis
│  ├─ skill.error-diagnosis
│  ├─ skill.code-fix-generator
│  ├─ skill.test-validation
│  └─ skill.pr-creation
├─ Executes in proven sequence:
│  1. Parse CI failure
│  2. Diagnose root cause
│  3. Generate fix
│  4. Test the fix
│  5. Create PR
└─ Result: Automated CI failure recovery (no manual intervention)
```

### Workflow Categories (50+ Templates)

| Category                       | Count | Examples                                                            |
| ------------------------------ | ----- | ------------------------------------------------------------------- |
| **Automation & Orchestration** | 8     | Sequential task chain, Hierarchical delegation, Event router        |
| **Analysis & Insights**        | 7     | Daily reports, Weekly summaries, Trend analysis, Research synthesis |
| **Code Quality**               | 6     | CI failure recovery, Code review, Test improvement, Simplification  |
| **Security & Compliance**      | 5     | Malicious code detection, Access audits, Patch management           |
| **Product & Growth**           | 5     | User feedback analysis, Market research, Feature prioritization     |
| **DevOps & Infrastructure**    | 4     | Deployment pipeline, Resource optimization, Health monitoring       |
| **Collaboration**              | 4     | Status summaries, Team coordination, Feedback loops                 |
| **RAG & Knowledge**            | 3     | Document retrieval, Knowledge updates, Context injection            |
| **Meta/System**                | 3     | Workflow optimization, Self-improvement, Telemetry                  |

### Workflow Acquisition

**PHASE 1 COMPLETE**: Strategic acquisition plan for 50+ production-proven workflows from elite GitHub repositories.

| Source                | Workflows | Framework                      | Status               |
| --------------------- | --------- | ------------------------------ | -------------------- |
| **GitHub Agentics**   | 20+       | GitHub Agentic Workflows       | 📋 Ready             |
| **CrewAI**            | 15+       | CrewAI (Crews + Flows)         | 📋 Ready             |
| **Microsoft AutoGen** | 12+       | AutoGen (FSM + Multi-agent)    | 📋 Ready             |
| **LangGraph**         | 18+       | LangGraph (DAGs + Persistence) | 📋 Ready             |
| **SuperAGI**          | 8+        | SuperAGI (Enterprise patterns) | 📋 Ready             |
| **Total**             | **50+**   | **Multi-framework**            | **Ready to Execute** |

### Documentation

Workflows are fully documented and ready to deploy:

1. [**LEEWAY_WORKFLOWS_STRATEGIC_PLAN.md**](documents/LEEWAY_WORKFLOWS_STRATEGIC_PLAN.md) - Strategic blueprint (5 sources, 50+ workflows, composition patterns)
2. [**WORKFLOW_ACQUISITION_MANIFEST.md**](documents/WORKFLOW_ACQUISITION_MANIFEST.md) - Complete inventory (all 50+ workflows catalogued)
3. [**SKILL_WORKFLOW_COMPOSITION_MATRIX.md**](documents/SKILL_WORKFLOW_COMPOSITION_MATRIX.md) - Skill-to-workflow mapping (how 250 skills compose into workflows)
4. [**workflow-integration-toolkit.py**](scripts/workflow-integration-toolkit.py) - Automation for workflow acquisition and execution

### How Skills + Workflows Work Together

```text
250+ Skills (Capabilities)
        ↓
   50+ Workflows (Orchestration)
        ↓
   Agent Lee (Execution)
        ↓
Enterprise-Grade Automation
```

**Without workflows**: Agent Lee loads individual skills manually  
**With workflows**: Agent Lee loads pre-composed bundles of 5-10 skills working together

---

## �🚀 Skill Acquisition Initiative: 250+ World-Class Skills

**PHASE 1 COMPLETE**: Comprehensive acquisition plan for 250+ production-ready skills from elite GitHub repositories.

### What We're Acquiring

| Source                         | Skills      | Quality              | Status               |
| ------------------------------ | ----------- | -------------------- | -------------------- |
| alirezarezvani/claude-skills   | 177         | ⭐⭐⭐⭐⭐           | 🎯 Planning          |
| anthropics/skills              | 15+         | ⭐⭐⭐⭐⭐           | 🎯 Planning          |
| nextlevelbuilder/ui-ux-pro-max | 1 (+assets) | ⭐⭐⭐⭐⭐           | 🎯 Planning          |
| obra/superpowers + community   | 30+         | ⭐⭐⭐⭐             | 🎯 Planning          |
| **TOTAL**                      | **250+**    | **Production-Grade** | **Ready to Execute** |

### The Vision

Transform Leeway Skills from 44 specialized skills into a **comprehensive 250+ skill library** that makes any LLM (including small 7B-13B models) behave like enterprise-grade AI across 23+ domains.

### Skill Categories (250+ Total)

- **Engineering** (68): Code generation, testing, DevOps, security, databases, APIs
- **Business** (95): Marketing (43), C-Suite (28), Product (12), Project Mgmt (6), Operations (6)
- **Design** (20): UI/UX systems, frontend, typography, color theory, design patterns
- **Compliance** (12): ISO, FDA, GDPR, risk management, auditing
- **Meta Skills** (18): Orchestration, composition, self-improvement, skill creation
- **Specialized** (25+): Industry-specific, emerging tech, vertical solutions

### Documentation & Execution Plan

All planning documents are ready:

1. [**SKILL_ACQUISITION_EXECUTIVE_SUMMARY.md**](documents/SKILL_ACQUISITION_EXECUTIVE_SUMMARY.md) - Overview & ROI
2. [**COMPREHENSIVE_SKILL_INTEGRATION_PLAN.md**](documents/COMPREHENSIVE_SKILL_INTEGRATION_PLAN.md) - Full strategic blueprint (250+ page detailed plan)
3. [**SKILL_ACQUISITION_MANIFEST.md**](documents/SKILL_ACQUISITION_MANIFEST.md) - Master checklist (all 250 skills listed by source)
4. [**SKILL_ACQUISITION_IMPLEMENTATION.md**](documents/SKILL_ACQUISITION_IMPLEMENTATION.md) - Step-by-step execution guide (5-week timeline)
5. [**skill-integration-toolkit.py**](scripts/skill-integration-toolkit.py) - Automation scripts for normalization & deduplication

### 5-Week Execution Plan

| Phase | Week | Deliverable                             |
| ----- | ---- | --------------------------------------- |
| 1     | W1   | Repo audit & setup (all sources cloned) |
| 2     | W1-2 | Engineering core normalized (68 skills) |
| 3     | W2-3 | Product/Marketing/Business (95 skills)  |
| 4     | W3-4 | Design systems & compliance (32 skills) |
| 5     | W4-5 | Complete registry build & testing       |

### Ready to Execute?

Start with: [SKILL_ACQUISITION_EXECUTIVE_SUMMARY.md](documents/SKILL_ACQUISITION_EXECUTIVE_SUMMARY.md) → [SKILL_ACQUISITION_IMPLEMENTATION.md](documents/SKILL_ACQUISITION_IMPLEMENTATION.md)

---

## �📁 Directory Structure

```text
Leeway Skills/
├── skills/                          # All skill definitions
│   ├── code-generation/             # Code generation and scaffolding
│   │   ├── typescript-codegen/
│   │   └── python-codegen/
│   ├── code-analysis/               # Code review and analysis
│   │   ├── static-analysis/
│   │   └── refactoring/
│   ├── data-analysis/               # Data science and analysis
│   │   └── pandas-analysis/
│   ├── devops/                      # DevOps and infrastructure
│   │   ├── dockerfile-creation/
│   │   └── kubernetes-deployment/
│   ├── web-development/             # Web technologies
│   │   ├── react-development/
│   │   └── css-styling/
│   ├── debugging/                   # Debugging techniques
│   │   ├── javascript-debugging/
│   │   └── python-debugging/
│   ├── testing/                     # Testing frameworks
│   │   ├── unit-testing/
│   │   └── integration-testing/
│   ├── ai-ml/                       # AI and ML expertise
│   │   ├── llm-prompting/
│   │   └── ml-model-development/
│   ├── security/                    # Security and vulnerability
│   │   └── code-security/
│   ├── documentation/               # Documentation
│   │   └── api-documentation/
│   ├── architecture/                # System design
│   │   └── system-design/
│   └── git-workflow/                # Version control
│       └── git-collaboration/
├── scripts/                         # Utility scripts
│   ├── sync-skills.ps1             # PowerShell sync script
│   └── skills-registry.json        # Skills index
├── config/                          # Configuration files
│   ├── skills-config.json          # Global configuration
│   └── .skillsignore               # Exclude patterns
├── documents/                       # Project documentation
│   ├── STRUCTURE.md                # Detailed structure docs
│   ├── SETUP.md                    # Setup guide
│   └── ...                         # Additional planning and reference docs
├── README.md                        # This file
└── agent-config.yaml                # Agent/runtime configuration

```

## 🎯 Categories

### Code Generation

- **TypeScript**: Type-safe TypeScript/JavaScript code generation
- **Python**: Pythonic code generation with type hints

### Code Analysis

- **Static Analysis**: Code quality, complexity, anti-patterns
- **Refactoring**: Code restructuring and improvement

### Data Analysis

- **Pandas Analysis**: Data manipulation and statistical analysis

### DevOps

- **Dockerfile Creation**: Container creation and optimization
- **Kubernetes Deployment**: K8s manifests and deployment

### Web Development

- **React**: Modern React with hooks and patterns
- **CSS Styling**: Responsive and accessible styling

### Debugging

- **JavaScript Debugging**: Browser and Node.js debugging
- **Python Debugging**: pdb and IDE debugging

### Testing

- **Unit Testing**: Jest, Pytest, and mocking
- **Integration Testing**: API and integration tests

### AI/ML

- **LLM Prompting**: Prompt engineering and optimization
- **ML Model Development**: scikit-learn, TensorFlow, PyTorch

### Security

- **Code Security**: Vulnerability detection and fixes

### Documentation Skills

- **API Documentation**: OpenAPI, Swagger, examples

### Architecture

- **System Design**: Distributed systems and patterns

### Git Workflow

- **Git Collaboration**: Branching, reviews, releases

## 🚀 Quick Start

1. **Point your LLM** to the `skills/` directory for skill discovery
2. **Run the sync script** to update skills from upstream sources
3. **Check the registry** (`skills-registry.json`) to see available skills
4. **Reference by category** when asking the LLM to use specific expertise

## 📋 Using Skills

### For Copilot/Claude/Similar LLMs

Place the skills directory in the LLM's discovery path:

- Project-level: `.agents/skills/` or `.claude/skills/`
- User-level: `~/.agents/skills/` or `~/.config/opencode/skills`

### Configuration

Each skill contains a `SKILL.md` file with:

- **Description**: What the skill does
- **Capabilities**: Specific things it can do
- **Use cases**: When to apply this skill
- **Techniques**: Key approaches and patterns
- **Tags**: Searchable metadata

### Skill Selection Example

```text
"I need to generate a Python FastAPI application.
Use the python-codegen skill with proper async/await patterns."
```

## 🔄 Synchronization

Use `scripts/sync-skills.ps1` to:

- Update skills from upstream repositories
- Check for new public skill collections
- Validate SKILL.md structure
- Generate registry

```powershell
.\scripts\sync-skills.ps1 -Update -Validate
```

## 📊 Skills Registry

The `skills-registry.json` contains:

- Skill metadata (name, version, category)
- Tags and keywords
- Dependencies
- Last updated timestamp
- Source repository

## 🏷️ Tagging System

Skills are tagged by:

- **Language**: typescript, python, javascript, java, etc.
- **Domain**: devops, testing, security, etc.
- **Methodology**: agile, tdd, bdd, etc.
- **Tool**: jest, pytest, docker, k8s, etc.
- **Level**: beginner, intermediate, expert

## 📖 Key Files

| File                           | Purpose                            |
| ------------------------------ | ---------------------------------- |
| `SKILL.md`                     | Skill definition and documentation |
| `scripts/sync-skills.ps1`      | Update and manage skills           |
| `config/skills-config.json`    | Global configuration               |
| `scripts/skills-registry.json` | Searchable skill index             |

## 🔄 Extending the Skills Directory

### Adding a New Skill

1. Create a directory under the appropriate category:

   ```text
   skills/{category}/{skill-name}/
   ```

2. Create `SKILL.md` with:

   ```markdown
   # Skill Name

   **Expert in**: Brief description

   ## Capabilities

   - What it does

   ## Use this skill when

   - When to apply

   ## Key techniques

   - How it works

   ## Tags

   `tag1` `tag2` `tag3`
   ```

3. Run the sync script to update the registry

### Creating a New Category

1. Create the directory: `skills/{new-category}/`
2. Update `skills-registry.json`
3. Add documentation to this README

## 💾 Backup and Export

Backup the entire skills directory:

```powershell
Copy-Item -Path "c:\Tools\Leeway-Skills\skills" -Destination "c:\Backups\leeway-skills-$(Get-Date -f 'yyyy-MM-dd')" -Recurse
```

Export skills as JSON catalog:

```powershell
Get-ChildItem -Path "skills" -Recurse -Filter "SKILL.md" | ConvertTo-Json > skills-export.json
```

## 🤝 Contributing

To add new skills or categories:

1. Follow the SKILL.md template
2. Organize by category
3. Add appropriate tags
4. Update the registry
5. Document in README

## 📝 Notes

- Each skill is self-contained in its own directory
- SKILL.md files are the primary documentation
- Tags enable efficient skill discovery
- Skills can be disabled via config without deletion
- Symlinks are supported for shared skills

---

**Last Updated**: 2026-03-15  
**Skills Count**: 19 core skills  
**Categories**: 13  
**Version**: 1.0.0
