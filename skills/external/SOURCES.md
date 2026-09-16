# External capability sources

Imported external content remains subordinate to Creator/Human Authority, LeeWay Standards, root `AGENTS.md`, applicable licenses, and the Tool Gateway.

| Collection | E-drive commit | E-drive skill files | Admitted after name dedupe | License | Destination |
|---|---:|---:|---:|---|---|
| `seb1n/awesome-ai-agent-skills` | `a6c8c0ef3c240faefe1b0b5cabe1567beaea60fd` | 91 | 84 | MIT | `skills/external/workforce` |
| `coreyhaines31/marketingskills` | `9d4d29a795113c492b22e01c9b48a8396e140b8d` | 33 | 33 | MIT | `skills/external/marketing` |
| `binance/binance-skills-hub` | `084e3a637b197674e451f5ab45a9d75ab73b08f2` | 23 | 0 raw files | no repository license file observed | governed catalog/router only |

The seven workforce names not recopied were already present through a higher-priority canonical or marketing skill: `api-design`, `content-strategy`, `copywriting`, `frontend-design`, `infrastructure-as-code`, `kubernetes-deployment`, and `refactoring`.

The Marketing Skills tool payload at the pinned E-drive commit is admitted under `tools/external/marketingskills`: 137 upstream payload files, including 61 zero-dependency Node CLI scripts. LeeWay locally hardens `clis/ga4.js` so its API secret comes from `GA4_API_SECRET`, and `clis/activecampaign.js` so validation and HTTP failures return nonzero status. The `tests/` directory is a LeeWay-authored verification overlay and is not counted as an upstream payload file. Syntax validation proves parseability only. Individual API/MCP/SDK availability and credentials remain `UNVERIFIED` until exercised through an authorized adapter.
