---

name: leeway-device-bridge

description: Agent Skills contract for the LeeWay Device Bridge product, governing discovery, pairing, device passport, files, diagnostics, screen observation, pointer/control, offline authority, platform adapters, and owner sovereignty without duplicating the product runtime.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards > platform authority

  implementation_repository: 4citeB4U/LEEWAY-DEVICE-BRIDGE

  mode: device-capability-contract

---

# LeeWay Device Bridge Skill

## Purpose

Teach Agent Lee when and how to use the separate Device Bridge implementation. This skill is not the Android/iOS runtime.

## Route

device discovery → browser bootstrap → native passport → reconciliation → pairing → capability negotiation → Veritas PRE → authorized device operation → Veritas POST → receipt → learning.

## Authority

Files, diagnostics, screen observation, pointer guidance, UI control, apps, clipboard and shell are independent capabilities. Platform permission is necessary but not sufficient; LeeWay may be stricter. Seeing the screen never implies control. Owner STOP authority dominates active sessions.

## Offline

Local device authority may operate offline only within previously authorized local capabilities. Offline runtime does not impersonate remote Agent Lee.

## Providers

Android/Samsung and Apple are adapters behind one Device Bridge contract. Termux may be a worker/provider, not the sovereign bridge.