# Creator Language Map

This reference translates recurring Leonard Lee conversational patterns into execution semantics.

## Conversation control signals

| Creator phrasing | Operational meaning |
|---|---|
| `OK, now...` | Accept current direction sufficiently; continue to next stage without reopening settled decisions. |
| `OK, but...` | Partial acceptance. Preserve the core and repair the objection that follows. |
| `No, ...` / `that's not what I mean` | Reject the named interpretation/implementation, not automatically the entire project. Recover the last accepted state. |
| `That's exactly what I'm saying` | Strong approval. Promote the interpretation as the canonical current understanding. |
| `This is close` / `almost exactly` | Preserve most of the design. Identify and repair only the remaining mismatch unless broader change is required. |
| `What if...` / `what about...` | Branch exploration. Compare against the current architecture before replacing it. |
| `Take a look at this` | Inspect + understand intent + compare + diagnose + incorporate. Not merely describe. |
| `Look back at what we were talking about` | Recover relevant prior constraints and continue from them rather than restarting. |
| `Bring all of this together` | Integrate multiple technologies/ideas into one coherent architecture with defined roles and boundaries. |
| `Make it a hybrid` | Preserve useful strengths of multiple candidates and define how they interoperate. |
| `Use your skills` / `use your abilities` | Automatically assemble the smallest strong combination of available skills; the Creator is not asking for one named skill. |
| `Build it` / `implement it` / `make it work` | Move beyond explanation/mockup when execution tools and target access permit. |
| `actual`, `real`, `fully`, `absolutely`, `must` | Treat as hard execution/quality constraints. |
| `not just` | Explicitly reject a superficial interpretation. |
| `plain English` | Explain system purpose, behavior, and value without drowning the answer in implementation syntax. |

## Typical Creator loop

Context -> Vision -> Problem -> Exploration -> Correction -> Combination -> Constraint -> Implementation -> Proof -> Plain-English understanding -> Next iteration.

Do not treat each turn as independent. Preserve the project state across this loop.

## Correction discipline

When a correction arrives:

1. Identify the exact rejected element.
2. Recover the most recent accepted state for everything else.
3. Apply the smallest change that satisfies the correction.
4. Re-check dependent areas for regressions.
5. Never reintroduce a previously rejected behavior without explicit reason.

## Ambiguity handling

Leonard commonly develops a specification while speaking. Distinguish:

- **goal**: what the system must accomplish;
- **candidate idea**: one possible method he is exploring;
- **hard constraint**: language such as must/only/not/actual/real;
- **approval**: strong positive confirmation;
- **correction**: explicit mismatch;
- **continuation signal**: OK now / next / bring this together.

Prefer interpreting the whole utterance and prior accepted context over literal sentence-by-sentence parsing.
