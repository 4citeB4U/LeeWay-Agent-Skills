# LeeWay Update Conformance v1.0

**Conformance ID:** `LEEWAY-UPDATE-CONFORMANCE-v1.0`  
**Governing standard:** `LEEWAY-UPDATE-v1.0`  
**Authority:** Creator/Human Authority > LeeWay Standards  
**Status:** Canonical enforcement profile  
**Applies to:** every deployable LeeWay application, service, agent runtime, mobile/desktop package, appliance, extension, and customer-facing software component that supports updates.

## Purpose

Convert the LeeWay Update Standard from descriptive policy into an executable acceptance gate.

A deployable LeeWay component is not update-conformant merely because it can fetch or install a new build. It must prove the complete governed lifecycle:

`DISCOVER → QUALIFY → DOWNLOAD → VERIFY → STAGE → REQUEST_APPROVAL → APPLY → VERIFY_APPLIED → HEALTH → RECEIPT → RETIRE_OLD_STAGE`

## Mandatory implementation contract

Every update-capable LeeWay component MUST provide:

1. **Declared canonical release binding**
   - one product/application identity;
   - one declared LeeWay-controlled release repository/channel;
   - immutable release/commit identity;
   - no arbitrary branch-tip installation.

2. **Owner-controlled retrieval preference**
   - setting equivalent to **Automatically check for and download LeeWay updates**;
   - default `OFF` until owner/user enables it;
   - manual **Check for updates** remains available;
   - preference is independently revocable.

3. **Automatic retrieval when authorized**
   - stale-startup and periodic checks;
   - newer-version comparison;
   - background download only when retrieval preference is enabled;
   - bounded retry/backoff;
   - no duplicate download of an already verified staged version.

4. **Qualification before staging**
   - SHA-256 verification;
   - package/application identity verification;
   - signer continuity when supported;
   - compatibility/minimum-version validation;
   - artifact size/release identity validation when supplied.

5. **Private staging**
   - verified artifact staged in app-private or designated LeeWay staging storage;
   - partial artifacts cannot be promoted;
   - user-visible Downloads must not accumulate historical installers;
   - one staged identity per target version/channel unless rollback policy explicitly requires more.

6. **Mandatory human apply gate**
   - staged state becomes `READY_FOR_APPROVAL`;
   - user/operator is notified;
   - interactive products present **Update now** / **Later** or platform-equivalent controls;
   - `Later` preserves the staged verified artifact;
   - no preference may authorize silent install, activation, restart into, or production cutover;
   - OS/platform installer confirmation is never auto-clicked.

7. **Post-apply proof**
   - installed version/build identity read back;
   - signer/package identity revalidated where supported;
   - critical health/readiness probes executed;
   - dependencies validated;
   - failure reported as failure, never inferred PASS from installer launch.

8. **Rollback discipline**
   - current qualified version/rollback route retained until target health PASS;
   - old staged duplicates retired only after PASS;
   - rollback availability recorded.

9. **Evidence and receipt**
   - canonical source/channel;
   - prior and target versions;
   - immutable release/source identity;
   - artifact SHA-256;
   - expected/observed signer;
   - retrieval preference state;
   - explicit apply approval event;
   - apply result;
   - post-apply health;
   - rollback state;
   - receipt/Veritas identity.

## Required release manifest

Every qualified release channel MUST expose immutable or release-bound metadata containing at least:

```json
{
  "standard": "LEEWAY-UPDATE-v1.0",
  "productId": "industries.leeway.example",
  "versionName": "1.2.3",
  "versionCode": 123,
  "channel": "stable",
  "canonicalRepository": "4citeB4U/example",
  "sourceCommit": "<immutable commit>",
  "artifactUrl": "<qualified HTTPS release asset>",
  "sha256": "<64 lowercase hex>",
  "signerSha256": "<expected signer when supported>",
  "artifactBytes": 0,
  "publishedAt": "<ISO-8601>"
}
```

A mutable branch URL by itself is not qualified release metadata.

## Conformance tests

A release is conformant only if automated tests prove at minimum:

- preference OFF prevents automatic download;
- preference ON permits check/download/stage;
- same/current version does not download;
- corrupt SHA-256 is rejected;
- signer mismatch is rejected where supported;
- wrong product/package identity is rejected;
- partial download is not staged;
- verified staged artifact is reused;
- `READY_FOR_APPROVAL` cannot transition to `APPLYING` without explicit human approval;
- choosing Later does not redownload;
- installer launch is not reported as installed;
- post-apply version mismatch fails;
- failed health check prevents retirement of rollback;
- successful update writes an evidence receipt;
- historical duplicate installers are not accumulated.

## Reference implementation requirement

LeeWay Pocket Agent / Agent Lee Android is the first reference implementation for this conformance profile.

The reference implementation MUST NOT be promoted as proof for other LeeWay products merely because code was copied. Each product must bind its own product identity, release source, signer, compatibility rules, health probes, and acceptance evidence.

Stable reusable updater logic SHOULD graduate into a shared deterministic LeeWay update SDK/helper after Pocket proves the lifecycle end-to-end.

## Veritas gate

`SOURCE_BOUND && VERSION_NEWER && HASH_PASS && SIGNER_PASS && IDENTITY_PASS && STAGED && HUMAN_APPROVED && APPLIED_VERSION_PASS && HEALTH_PASS && RECEIPT_EXISTS`

Only then:

`UPDATE_CONVERGED = PASS`

Anything else is `FAILED`, `BLOCKED`, or `NOT_CONVERGED`.

## Anti-bypass law

No model, agent, updater, workflow, GitHub action, plugin, service, or automation may reinterpret **automatic updates** to mean automatic installation. Automatic retrieval is a user-authorized capability. Installation/activation remains a consequential human-authorized action.
