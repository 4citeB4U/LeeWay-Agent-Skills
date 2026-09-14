# LeeWay Google Surface Routing

Use this guide after Context Engineering determines the real task.

## Routing principle

Do not ask one Google product to impersonate another.

Choose the smallest surface that naturally owns the deliverable.

| Need | Preferred surface | Why |
|---|---|---|
| Current external research / reasoning / multimodal analysis | Gemini API / Gemini / AI Studio agent | Open-world reasoning, tools, structured output, agent workflows |
| Repeatable programmatic Gemini execution | Gemini Interactions API | Current recommended API primitive for new agentic work |
| Current Gemini developer documentation | Gemini Docs MCP | Canonical developer-doc retrieval |
| Source-grounded research synthesis and Studio artifacts | Gemini Notebook | Controlled corpus + reports/tables/decks/video/audio/maps/cards/quizzes |
| Fast shareable mini-app without full product engineering | Opal | No-code, node-based, rapidly deployable AI mini-app |
| UI exploration / high-fidelity screens / design variants / frontend handoff | Stitch | AI-native design canvas and design-to-code workflow |
| Durable source/artifact bus | Google Drive / Docs / Sheets / Slides | Shared, inspectable, reusable artifacts |
| Outreach / follow-up | Gmail | External communications only when authorized |
| Meeting scheduling / campaign timeline | Calendar | Time-bound coordination |
| Known people / organization lookup | Contacts | Identity/contact resolution |

## Gemini Notebook law

Gemini Notebook is a production worker, not the campaign authority.

Before generating a Studio artifact:
1. load the LeeWay authority core;
2. load only the funder/project sources relevant to the artifact;
3. establish the Funder Evidence Table / Claim Ledger;
4. generate the artifact;
5. verify it against the evidence table;
6. repair contradictions before release.

If a public automation API is not verified, use a browser adapter and Drive/shared artifacts. Do not invent an API contract.

## Opal law

Use Opal when the desired outcome is useful, interactive and disposable or lightweight enough that a full product build would be wasteful.

Good LeeWay uses:
- funder-specific interactive explainer;
- proposal FAQ mini-app;
- workshop intake/assessment;
- demo navigator;
- evidence browser;
- guided product selector;
- event follow-up utility;
- temporary pilot interface.

Do not use Opal as the canonical database, Formula authority, permanent runtime fabric or sole evidence store.

Every Opal mini-app should have:
- one clear objective;
- one primary audience;
- bounded source set;
- explicit claim-status language;
- LeeWay visual/message system;
- exit path to a durable product if the mini-app proves valuable.

## Stitch law

Use Stitch to convert approved product intent and LeeWay visual standards into high-fidelity UI concepts, screen families, variants and frontend code.

Default design loop:
`Creator intent → LeeWay visual system → Stitch variants → design review → selected screen → exported code → implementation review → test → Veritas`

Generated code is candidate implementation until tested.

For programmatic Stitch work, prefer the current Google-announced Stitch MCP/SDK path when authorized. Treat experimental SDK behavior as host-dependent and verify the current API contract before production use.

## AI Studio agent law

AI Studio agents may load LeeWay skills and external MCP servers.

Recommended Google developer augmentations:
- Gemini Docs MCP for current Gemini API documentation;
- LeeWay Skills MCP when deployed;
- Stitch MCP/SDK when design work requires it;
- other connectors only at least privilege.

Never give an AI Studio agent broad credentials merely because it is sandboxed.

## Cross-surface handoff

A handoff should be an artifact, not an assumption.

Examples:
- Gemini research → approved research memo → Drive → Gemini Notebook.
- Gemini Notebook report → approved messaging brief → Stitch/Opal.
- Stitch screen → exported code → LeeWay implementation/test workflow.
- Opal pilot → measured user result → evidence → productization decision.

## Decision shorthand

`RESEARCH? → GEMINI`
`SOURCE-GROUNDED PRESENTATION? → GEMINI NOTEBOOK`
`QUICK SHAREABLE MINI-APP? → OPAL`
`UI / DESIGN / FRONTEND? → STITCH`
`DURABLE KNOWLEDGE? → DRIVE/GITHUB`
`EXTERNAL ACTION? → WORKSPACE CONNECTOR + AUTHORIZATION`
