---
name: last30days
description: LeeWay-governed binding to mvanhorn Last 30 Days for multi-source recent-community research across social, developer, prediction-market, video, and web sources when its runtime is available.
license: MIT upstream
metadata:
  authority: LeeWay Standards
  source: mvanhorn/last30days-skill
  canonical-skill: skills/last30days/SKILL.md
  mode: syncable-remote-canonical
---

# Last 30 Days — LeeWay Binding

Canonical source: `mvanhorn/last30days-skill` → `skills/last30days` on `main`.

Use synchronized `upstream/SKILL.md` and its scripts when present. Otherwise fetch the canonical skill through authorized GitHub/network access.

## Route here when

The task specifically benefits from what communities and current sources have been saying in roughly the latest 30-day window: product sentiment, developer reactions, recommendations, trends, recent discourse, or multi-source community intelligence.

## Execution boundary

The upstream runtime may depend on Python/Node and optional credentials for some sources. Verify the installed runtime and available source coverage before use. Never imply that Reddit, X, YouTube, TikTok, Hacker News, Polymarket, GitHub, or another source was queried unless that source actually returned evidence.

When this runtime is unavailable but ordinary current public-web research can satisfy the request, use the available governed web capability and label the route accurately rather than pretending `/last30days` ran.

State while `upstream/` is absent: `REMOTE_CANONICAL`.
