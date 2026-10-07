# LeeWay Agent Skills — Grapevine source package

This directory contains the uploaded Grapevine 3D Registry & Pipeline Engine project used by GitHub Pages.

- Source package: `leeway-grapevine-actual-fixed.zip`
- Source package SHA-256: `145208f2656b218a8756a6caee72592d0a12660bc49631a6ec056d1d3fb834e4`
- Visual source: the user-supplied React/Three.js Grapevine project.
- Registry source: generated at deploy time from every canonical `skills/**/SKILL.md` in the checked-out commit.
- Truth boundary: registry presence is not execution. Public GitHub Pages is read/select only; local execution remains subject to Runtime Fabric, MCP/provider authority, Veritas, and receipts.

The deploy workflow unpacks this source, generates `public/grapevine-state.json`, type-checks the project, builds it with Vite, and deploys the resulting `dist/`.
