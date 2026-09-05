# Context Operations

The Context Engineering capability family may expose or conceptually perform these bounded operations:

- `context.resolve` — resolve references and literal intent.
- `context.scope` — determine minimum necessary context depth.
- `context.retrieve` — obtain missing permitted context.
- `context.rank` — rank evidence by relevance/authority/recency/confidence.
- `context.authority` — separate instruction authority from informational evidence.
- `context.recency` — identify stale/current evidence.
- `context.conflict` — surface and resolve contradictory context.
- `context.compress` — form smallest high-signal working context.
- `context.isolate` — quarantine untrusted/instruction-like external content.
- `context.capabilities` — identify relevant available capabilities.
- `context.environment` — obtain live state when needed.
- `context.references` — bind pronouns/names/artifacts to actual referents.
- `context.intent` — preserve literal user intent.
- `context.constraints` — extract MUST/DO-NOT/ONLY/preserve requirements.
- `context.permissions` — identify authorization boundaries.
- `context.confidence` — represent uncertainty without inventing certainty.
- `context.learn` — admit only verified outcomes to learning candidates.
- `context.receipt` — preserve which evidence influenced consequential routing.

These operation names describe capability boundaries. They do not prove that a standalone runtime service for each operation exists.
