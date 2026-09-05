---
name: playwright
description: Governed LeeWay execution adapter for Microsoft Playwright browser automation, end-to-end testing, screenshots, interaction validation, and visual/runtime verification.
metadata:
  source-type: execution-tool
  canonical: microsoft/playwright
---
# Playwright Adapter
Canonical source: `microsoft/playwright` on `main`.

Use Playwright for browser-level proof: navigation, interaction, responsive states, accessibility-adjacent DOM checks, screenshots, and end-to-end behavior. It is an execution dependency, not evidence by itself.

Execution contract:
1. Verify Playwright and the required browser binary are already available before use.
2. Do not install browsers or packages without authorization.
3. Record the exact test, target URL/build, browser, exit state, and produced evidence.
4. A passing script proves only its asserted behavior; do not generalize it into total application health.

State: `REFERENCE_ADAPTER` until Playwright is actually available and executed.
