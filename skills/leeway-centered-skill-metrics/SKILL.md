---

name: leeway-centered-skill-metrics

description: Governance for centered multidimensional skill/release evaluation using zero-centered deviation vectors, positive-definite weighted quadratic potentials, admissible ellipsoids, and evidence-bound measurements. Compatible with LeeWay Formula staging without inventing canonical Formula constants or mappings.

license: MIT

metadata:

  authority: Creator/Human Authority > LeeWay Standards

  mode: centered-evaluation-geometry

  stage: measurement-and-shiproom-evaluation

---

# LeeWay Centered Skill Metrics

## Boundary

This skill formalizes an evaluation geometry proposed by the Creator. It is not a claim that the canonical LeeWay Formula already uses these exact dimensions, weights, constants, or equations. Bind to canonical Formula only when its real implementation/version/hash supplies the mapping.

## General model

Let x be a measured deviation vector from an explicitly defined target/equilibrium x*=0. Let W be symmetric positive-definite. Define E(x)=x^T W x and a bounded score S(x)=exp(-E(x)) when that transform is appropriate. An admissible gate may use x^T W x <= R^2.

## Measurement law

Zero must mean a defined target deviation, not an impossible fantasy. Normalize asymmetric or one-sided objectives before centering. Example: latency below an SLA is not naturally zero latency; define deviation from the target/envelope. Availability, coverage, security risk, cost, capacity, accessibility, delivery value and human factors require explicit units and normalization.

## Coupling law

Off-diagonal W terms are allowed only when measured/justified coupling exists. Do not invent covariance/coupling weights. If dimensions lack comparable evidence, preserve them separately rather than hiding uncertainty inside one score.

## Department families

SWE: correctness/coverage/determinism/latency/complexity/reliability. SRE: drift/burn/MTTD/MTTR/availability/capacity. Product: scope/delivery/value/experiment evidence/dependency risk. Security: residual threat/control coverage/exploitability/remediation. UX: accessibility/friction/error rate/task success/research evidence. Leadership: demand-capacity/risk/cost/dependency volatility/continuity.

## Shiproom geometry

Concatenate normalized department deviation vectors into X. A block-diagonal or evidence-supported coupled Omega may define X^T Omega X <= R^2. Passing the aggregate gate never erases hard constraints: a critical security, legal, authority, safety, or reliability failure can remain independently blocking.

## Veritas

Every metric must bind definition, unit, source, timestamp/window, target, transformation, uncertainty, weight provenance, and acceptance threshold. Generated numbers are not measurements.

## Formula handoff

Context Engineering prepares measured state; Formula Governance may use the canonical implementation if available; Centered Skill Metrics supplies an evidence-bound geometric evaluation representation; Veritas validates measurements and gate claims.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE BEGIN -->

# LeeWay Universal Formula Governance

Authority: Creator and LeeWay Standards.
Formula identity: LEEWAY-FORMULA-v1.0.

The canonical LeeWay Formula is mandatory throughout
the entire LeeWay ecosystem.

Every current and future application, capability,
agent, worker, employee, model, provider, adapter,
automation and integration inherits this requirement.

All applicable interactions, responses, decisions,
actions, revisions, executions, computations, model
inferences, resource allocations, information transfers,
memory operations, storage operations and deployments
must consume the canonical Formula through their
authorized and qualified domain contracts.

Formula availability, documentation, configuration,
health and historical results do not constitute actual
Formula consumption for a new operation.

Recover relevant authorized memory before substantive
work. Preserve identity, provenance, Formula integrity,
authorization, original receipts and verified learning.

Never invent observations, adapter mappings, mathematical
results, execution evidence or independent verification.

No application may bypass applicable Formula governance
by dispatching directly to a provider.

Every new application and capability must demonstrate
applicable Formula consumption before production admission.

Preserve the existing authority hierarchy:

Creator > Standards > Root of Trust > Runtime Fabric >
Agent Lee > Harness > Formula > skills/models/tools >
execution > Veritas > Receipt Authority > Learning Ledger.

Execute the complete engineering loop:

INVESTIGATE > DIAGNOSE > PLAN > IMPLEMENT > TEST >
VALIDATE > REPAIR > RETEST > VERIFY > EVIDENCE >
CHECKPOINT > CONTINUE.

Documentation compliance does not establish executable
enforcement or production admission.

<!-- LEEWAY UNIVERSAL FORMULA GOVERNANCE END -->
