# LeeWay Update Standard v1.0

**Standard ID:** `LEEWAY-UPDATE-v1.0`  
**Authority:** Creator/Human Authority > LeeWay Standards  
**Applies to:** every LeeWay application, service, agent runtime, desktop/mobile package, appliance, and deployable software component that supports updates.

## Canonical law

A LeeWay product may automatically **check, download, verify, and stage** a qualified update only after the user/operator enables automatic updates. A LeeWay product must **not silently apply, install, activate, restart into, or switch production authority to** that update. Applying the staged update requires an explicit human approval event.

`DISCOVER → QUALIFY → DOWNLOAD → VERIFY → STAGE → REQUEST_APPROVAL → APPLY → HEALTH_CHECK → RECEIPT`

**Automatic retrieval is not automatic authority.**

## Required user control

Every interactive LeeWay product must expose a setting equivalent to:

**Automatically check for and download LeeWay updates**

- Default: `OFF` until explicitly enabled by the user/operator.
- When `ON`: the product checks its canonical GitHub release source automatically, downloads qualified newer releases, verifies them, and stages them.
- When a qualified update reaches `READY_FOR_APPROVAL`: notify the user and present **Update now** / **Later**.
- Choosing `Later` keeps the verified staged artifact without repeatedly downloading it.
- The user may disable automatic retrieval at any time.
- A manual **Check for updates** action must remain available.

For headless services, the same approval requirement is satisfied through the authorized human administration surface; the service must not treat machine availability as human approval.

## Canonical source

Each product must bind to one declared canonical GitHub repository and release channel. Update discovery must use versioned release metadata or an equivalent immutable manifest tied to a release/commit and artifact.

The updater must not:
- switch repository owners or package/application identity implicitly;
- treat an arbitrary branch tip as an installable release;
- follow unqualified third-party artifact URLs;
- replace a LeeWay-signed package with an artifact signed by a different authority without an explicit migration ceremony.

## Required release metadata

A qualified manifest must provide, directly or by immutable release metadata:

- `standard`: `LEEWAY-UPDATE-v1.0`
- product/application identifier
- version name and monotonic version/build code
- release channel
- canonical repository
- immutable source commit or release identity
- HTTPS artifact URL
- SHA-256 digest
- expected signing authority/fingerprint when the platform supports package signing
- artifact size when known
- compatibility/minimum-version constraints when needed
- publication timestamp

## Update state machine

`DISABLED` — automatic retrieval not authorized.  
`CHECKING` — canonical source is being queried.  
`CURRENT` — no qualified newer release.  
`UPDATE_AVAILABLE` — newer release discovered but not yet staged.  
`DOWNLOADING` — artifact retrieval in progress.  
`VERIFYING` — digest/signature/compatibility qualification in progress.  
`READY_FOR_APPROVAL` — verified artifact staged; human approval is required.  
`APPLYING` — human-approved platform installer/restart/migration is in progress.  
`VERIFYING_APPLIED` — installed version and health are being checked.  
`PASS` — target version and health verified.  
`ROLLBACK_READY` — previous qualified version retained for recovery.  
`FAILED` / `BLOCKED` — update did not qualify or could not safely proceed.

No transition from `READY_FOR_APPROVAL` to `APPLYING` is valid without a recorded human approval event.

## Download and staging law

- Stage updates in app-private/cache-managed storage or a designated LeeWay staging directory, not as accumulating user-visible duplicate installers.
- A version already staged and verified must be reused rather than downloaded again.
- Partial downloads must use a temporary identity and may not be promoted to staged state.
- SHA-256 must be verified before `READY_FOR_APPROVAL`.
- Platform package signature/certificate must be verified where available.
- The current working version/rollback artifact must remain available until the new version passes post-apply health checks.

## Check cadence

Implementations may tune cadence for platform/battery/network constraints, but an opt-in implementation must support:
- check on application/service startup when the last successful check is stale;
- periodic background checks while the product is active/eligible;
- manual check on demand;
- backoff after network/service failures;
- no tight polling loop.

Recommended default active cadence: **24 hours**, with a minimum retry backoff of **1 hour** after transient failure unless a platform-specific policy is stricter.

## Network and resource policy

Automatic retrieval may be constrained by user preferences such as Wi-Fi-only, metered-network permission, battery saver, maintenance windows, or storage limits. Such constraints may delay retrieval; they do not permit skipping verification or human apply approval.

## Apply law

The updater may open the operating system installer, updater, service-management approval, or equivalent platform confirmation after the user approves. It must not claim the update was installed merely because the installer was opened.

After apply:
1. verify expected version/build identity;
2. verify package/signing authority where supported;
3. start/read health and readiness probes;
4. validate critical runtime dependencies;
5. write a receipt;
6. retire superseded staged artifacts only after PASS.

`first installer success != completion`

## Failure and rollback law

A failed qualification never replaces the active version. A failed post-apply health gate preserves or restores a qualified rollback route when the platform permits it. Failure details must be surfaced without fabricating success.

## Required evidence

For consequential updates preserve:
- check timestamp;
- canonical repository/channel;
- source release/commit;
- prior version;
- target version;
- artifact SHA-256;
- expected/observed signer when available;
- user automatic-retrieval preference;
- approval event for apply;
- apply result;
- post-apply health result;
- rollback state;
- Veritas/receipt identity.

## Reference behavior

```
if automaticUpdatesEnabled:
    checkCanonicalGitHub()
    if newerQualifiedRelease:
        download()
        verifyHashAndSigner()
        stagePrivately()
        notifyUser("Update ready")
        waitForExplicitApproval()

if userApproves:
    invokePlatformApply()
    verifyInstalledVersion()
    verifyHealth()
    writeReceipt()
```

## Anti-patterns

Non-compliant behavior includes:
- silent install/activation;
- auto-clicking an OS installer;
- equating download with installation;
- stale duplicate APK/package accumulation;
- updater pointing at a superseded sibling application;
- unsigned or mismatched-signature replacement;
- branch-tip deployment without immutable release qualification;
- deleting rollback before post-apply verification;
- forcing the user through repeated manual download cycles after automatic retrieval was authorized.

## Acceptance gate

A LeeWay updater is compliant only when:

`CANONICAL_SOURCE == NEWER_VERSION == ARTIFACT_HASH == SIGNER == STAGED_ARTIFACT == HUMAN_APPROVAL == APPLIED_VERSION == HEALTH_PASS == RECEIPT`

Any material discrepancy is `NOT_CONVERGED`.
