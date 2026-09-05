# LeeWay Context Formula Prelude

## Established design decisions

- Context Engineering is the prequel of the LeeWay Formula, not a detached preprocessing layer.
- Literal meaning is the protected starting point.
- Context starts small and expands only when required.
- Simple meaning remains simple; complexity must be earned by evidence.
- Context can enrich literal meaning but cannot silently overwrite it.
- Incoming information retains provenance.
- Data is not automatically authority.
- Context masks prevent irrelevant dimensions from contaminating decisions.
- Original evidence remains available even when a compact state is produced.
- The Formula determines not only what to do, but how much processing is justified.

## 64-bit state family

The established architecture uses a family of related Formula-ready compact states rather than one overloaded word:

- Context state
- Decision state
- Routing / Automation state
- Verification state
- Trust / Learning state

The exact bit definitions remain canonical-specification work unless a verified implementation is present.

## Context dimensions

Candidate dimensions established in the earlier architecture include:

- Intent
- Relevance
- Authority
- Recency
- Confidence
- Risk
- Capability
- Continuity
- Provenance
- Task relationship

## Safety boundary

A skill may prepare features and context evidence. It may not claim to have executed the canonical Formula unless the Formula implementation actually ran.
