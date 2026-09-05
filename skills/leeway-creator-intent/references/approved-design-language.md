# Leonard Lee — Approved Design Language

This is a durable design-direction reference, not a rigid theme file.

## Evidence hierarchy

Current explicit request > project-specific approvals/corrections > this profile > imported skill defaults.

Do not force every artifact to look like the Digital Brain. Translate its approved design principles to the current product.

## Core design character

Leonard consistently favors interfaces that feel:

- deeply engineered rather than templated;
- high-end and visually intentional;
- information-rich without becoming cluttered;
- spatially organized with meaningful depth;
- immersive where the product benefits from immersion;
- alive through purposeful state/motion;
- structurally coherent across panels, navigation, visualization, and content;
- modern/futuristic when appropriate, but not at the expense of usability;
- polished enough to feel like a finished system rather than a developer demo.

## Digital Brain design DNA

The strongest approved architectural pattern is the Digital Brain direction:

1. **Living-system feeling** — the UI should communicate that parts belong to one connected system.
2. **Progressive spatial depth** — entering a deeper layer creates more room and more detail rather than simply magnifying clutter.
3. **Synchronized navigation** — multiple views can represent the same state and should update together when that helps orientation.
4. **Clear hierarchy** — whole system -> region -> application/domain -> service/object -> deeper child context.
5. **Contextual focus** — irrelevant information recedes as the selected area becomes primary.
6. **Relationship visibility** — connections can become visually explicit when relationships matter to the task.
7. **Purposeful animation** — movement communicates state, direction, relationships, transitions, or activity.
8. **Stable interaction state machines** — hover is not drag; selection is not navigation; animation does not cause flicker or accidental movement.
9. **Adaptive spacing** — information has enough room for its actual visual/clickable size; density is solved through hierarchy, clustering, or deeper context, not overlap.
10. **High-detail engineering** — visual polish and system behavior should be designed together.

## Default new-design stance

For brand-new work, aim above generic templates. Start with strong information architecture and interaction logic, then layer visual identity, depth, motion, typography, and polish.

Prefer:

- asymmetry when it improves hierarchy;
- layered surfaces over flat undifferentiated grids;
- clear focal regions;
- navigation that makes complex systems understandable;
- sophisticated but controlled motion;
- useful visualizations rather than decorative charts;
- responsive adaptations that preserve hierarchy on smaller screens;
- strong typography and spacing systems;
- deliberate empty space around important content;
- visual continuity between state changes.

Avoid by default:

- generic SaaS-card walls;
- excessive identical rounded cards with no hierarchy;
- decorative 3D or animation that does not improve meaning;
- cramped node clouds or overlapping labels;
- flicker, layout instability, accidental hover/drag coupling;
- interfaces that look impressive in a screenshot but fail on phone/desktop interaction;
- sacrificing functionality for spectacle;
- silently changing functionality that the Creator asked to preserve.

## Approval preservation

If Leonard explicitly says he likes a specific element, treat that element as project-local approved evidence. Preserve its underlying qualities through later revisions unless he later rejects or replaces them.

Examples of qualities worth preserving may include layout structure, spatial depth, color relationship, interaction behavior, panel architecture, motion language, information density, or visual hierarchy.

Do not infer that every incidental implementation detail is approved merely because the overall screen was approved.
