---
name: leeway-cyber-defense-sun
description: Evidence-bound four-ray defensive cybersecurity posture evaluation for PQC/crypto, edge/network, SOC/IR and AppSec/zero trust, with hard gates for active compromise, identity/key failures and missing evidence.
license: MIT
---
# LeeWay Cyber Defense Sun

## Four rays
1 CRYPTO_PQC — crypto inventory/agility, HNDL/data-lifetime exposure, approved algorithms/key lifecycle, migration/interoperability/performance.
2 EDGE_NETWORK — malicious leakage, legitimate false blocks, availability/mitigation, segmentation/origin exposure.
3 SOC_IR — telemetry coverage/quality, detection/triage/containment latency, uncontained scope, incident/recovery state.
4 APPSEC_ZERO_TRUST — unauthorized grants, exploitable/reachable critical findings, identity/policy failures, supply-chain verification and application control state.

For evidence-bound x_k,W_k,theta_k: r_k=sqrt(x_k^T W_k x_k); b_k=1 iff r_k<=theta_k. Omega=sum(b_k*2^(4-k)); Omega_max=15; Phi=product(b_k).

## No absolute-security claim
Omega=15 means the four measured profiles are within their declared tolerances for the observed window. It does not prove absence of unknown vulnerabilities/adversaries or perpetual quantum resistance.

## Hard gates
ACTIVE_UNCONTAINED_INCIDENT; COMPROMISED_TRUST_ANCHOR_OR_KEY; UNAUTHORIZED_ACCESS_GRANTED; UNKNOWN_CRITICAL_ASSET_OR_MISSING_REQUIRED_TELEMETRY; FAILED_REQUIRED_RECOVERY_TEST; UNVERIFIED_CRITICAL_RELEASE_ARTIFACT; MANDATORY_SECURITY_CONTROL_BYPASS.

## PQC law
Do not treat every remaining RSA/ECC key as an immediate equal failure. Evaluate algorithm/purpose, data confidentiality lifetime, signing lifetime, protocol, exposure, migration deadline and approved transition policy. Use standardized implementations; do not derive security from ad-hoc lattice-distance calculations.

## Detection law
Posterior/anomaly scores prioritize investigation; they do not prove compromise or cleanliness. Containment does not equal eradication.

## Zero-trust law
Authentication/mTLS, authorization, device/workload posture and policy enforcement are distinct controls.

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
