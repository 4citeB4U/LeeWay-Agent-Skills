# LeeWay Formula Decision Receipt Schema

Use this schema for consequential Formula-governed decisions when the runtime can preserve structured evidence.

Do not fabricate fields. Missing evidence must use an explicit state such as `NOT_EXECUTED`, `NOT_AVAILABLE`, `BLOCKED`, or `FAILED`.

```yaml
receiptVersion: "1.0"
receiptId: "<runtime-generated-or-NOT_AVAILABLE>"
timestamp: "<ISO-8601-or-NOT_AVAILABLE>"

formula:
  executionState: "EXECUTED | NOT_EXECUTED | BLOCKED | FAILED"
  implementation: "<canonical implementation identity>"
  version: "<version>"
  authorityHash: "<sha256-or-NOT_AVAILABLE>"

input:
  state: "<canonical/qualitative state reference>"
  stateHash: "<hash-or-NOT_AVAILABLE>"
  provenance:
    - source: "<source>"
      authority: "<authority class>"
      evidenceRef: "<path/hash/citation/receipt>"
  continuityAuthority: "<continuity receipt/checkpoint or NOT_AVAILABLE>"

context:
  encoding: "C64 | qualitative | other"
  contextState: "<value/reference or NOT_EXECUTED>"
  contextStateHash: "<hash-or-NOT_AVAILABLE>"

formulaDecision:
  selectedPolicy: "<policy or NOT_AVAILABLE>"
  selectedAction: "<action or NOT_AVAILABLE>"
  selectedRoute: "<route or NOT_AVAILABLE>"
  decisionHash: "<hash-or-NOT_AVAILABLE>"

runtime:
  target: "<runtime/tool/service>"
  executionState: "EXECUTED | NOT_EXECUTED | BLOCKED | FAILED"
  executionId: "<native runtime id or NOT_AVAILABLE>"
  correlationId: "<LeeWay correlation id or NOT_AVAILABLE>"
  result: "<result summary/reference>"
  evidenceRef: "<native log/receipt/path/hash>"

veritas:
  state: "PASS | FAIL | NOT_RUN | BLOCKED"
  measurements:
    - name: "<metric>"
      value: "<measured value>"
      unit: "<unit or none>"
      authority: "<measurement source>"
  acceptanceCriteria: "<criteria reference>"

receipt:
  convergence: "CONVERGED | NOT_CONVERGED"
  receiptHash: "<hash-or-NOT_AVAILABLE>"
  learningLedgerCorrelation: "<id-or-NOT_AVAILABLE>"
```

## Required separation

Keep these identities distinct:

- Formula decision ID/hash;
- LeeWay correlation ID;
- native runtime execution ID;
- Veritas measurement identity;
- final receipt identity/hash.

Never substitute one for another.

## Convergence law

For consequential claims:

`FORMULA AUTHORITY → DECISION → RUNTIME → VERITAS → RECEIPT`

and:

`CLAIM == SOURCE == TEST == RUNTIME == VERITAS == RECEIPT`

A material disagreement sets `convergence: NOT_CONVERGED`.
