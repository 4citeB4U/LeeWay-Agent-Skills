#!/usr/bin/env node
/* LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.SKILLS.VERIFY
TAG: LEEWAY.SKILLS.VERIFY.PERSISTENT_WORKPLANE_BINDING
WHAT = Verify the canonical Parallel Workplane to Runtime Fabric source binding
WHY = Prevent duplicate harness creation, authority drift, secret embedding, and false persistent-execution claims
WHO = Leeway Industries (By Leonard Jerome Lee)
WHERE = scripts/verify-persistent-workplane-binding.mjs
WHEN = 2026
HOW = Validate the binding contract and root/skill/portability references without claiming deployed runtime execution
LICENSE: MIT */
import fs from "node:fs";

const bindingPath = "config/persistent-workplane-runtime-binding-v1.json";
const agentsPath = "AGENTS.md";
const skillPath = "skills/leeway-parallel-workplane/SKILL.md";
const portabilityPath = "config/portability-contract.md";

for (const file of [bindingPath, agentsPath, skillPath, portabilityPath]) {
  if (!fs.existsSync(file)) throw new Error("Missing persistent-workplane authority artifact: " + file);
}

const binding = JSON.parse(fs.readFileSync(bindingPath, "utf8"));
const agents = fs.readFileSync(agentsPath, "utf8");
const skill = fs.readFileSync(skillPath, "utf8");
const portability = fs.readFileSync(portabilityPath, "utf8");

const expected = {
  bindingId: "LEEWAY_PERSISTENT_WORKPLANE_RUNTIME_BINDING_V1",
  capabilityId: "execution.persistent_workplane",
  runtimeRepository: "4citeB4U/Leeway-Runtime-Fabric",
  runtimeCommit: "24dbad2e6114a9b3bf63f5c5a92b74e0c4ce8d4a",
  workplaneId: "LEEWAY_RUNTIME_FABRIC_PERSISTENT_WORKPLANE",
  proofRunId: 36406952640
};

if (binding.bindingId !== expected.bindingId) throw new Error("Persistent workplane binding id drift");
if (binding.capabilityId !== expected.capabilityId) throw new Error("Persistent workplane capability id drift");
if (binding.authority?.runtimeRepository !== expected.runtimeRepository) throw new Error("Runtime Fabric authority drift");
if (binding.authority?.runtimeBranch !== "main") throw new Error("Runtime Fabric binding must target main");
if (binding.authority?.runtimeCommit !== expected.runtimeCommit) throw new Error("Runtime Fabric immutable commit drift");
if (!/^[0-9a-f]{40}$/.test(binding.authority.runtimeCommit)) throw new Error("Runtime commit is not a full Git SHA");
if (binding.authority?.sourceProof?.workflowRunId !== expected.proofRunId) throw new Error("Runtime source proof id drift");
if (binding.authority?.sourceProof?.conclusion !== "success") throw new Error("Runtime source proof is not recorded successful");
if (binding.workplane?.id !== expected.workplaneId) throw new Error("Persistent workplane id drift");
if (binding.workplane?.law !== "conversation lifetime != job lifetime") throw new Error("Persistent workplane lifetime law drift");

const requiredOwners = {
  durableJobState: "automation-runtime/job-queue.mjs",
  taskExecution: "automation-runtime/task-runner.mjs",
  scheduling: "automation-runtime/scheduler.mjs",
  retryPolicy: "automation-runtime/retry-policy.mjs",
  supervisor: "leeway-runtime-supervisor/supervisor.mjs",
  sovereignEventBus: "leeway-runtime-supervisor/services/eventBus.mjs",
  runtimeControlPlane: "server/index.cjs"
};
for (const [key, value] of Object.entries(requiredOwners)) {
  if (binding.canonicalOwners?.[key] !== value) throw new Error("Canonical runtime owner drift: " + key);
}

const requiredStates = [
  "QUEUED", "RUNNING", "CHECKPOINTED", "PAUSE_REQUESTED", "PAUSED",
  "CANCEL_REQUESTED", "CANCELLED", "RETOOL_REQUIRED", "BLOCKED",
  "FAILED", "COMPLETED", "SUPERSEDED"
];
for (const state of requiredStates) {
  if (!binding.workplane?.states?.includes(state)) throw new Error("Missing workplane state: " + state);
}

const requiredControls = ["PAUSE", "CANCEL", "RETOOL", "CONTINUE", "RESUME", "SUPERSEDE"];
for (const control of requiredControls) {
  if (!binding.workplane?.creatorControls?.includes(control)) throw new Error("Missing Creator control: " + control);
}

const requiredRoutes = new Map([
  ["GET /api/persistent-workplane/status", "workplane.status"],
  ["GET /api/persistent-workplane/jobs", "workplane.jobs.list"],
  ["GET /api/persistent-workplane/jobs/:id", "workplane.job.read"],
  ["POST /api/persistent-workplane/jobs", "workplane.job.enqueue"],
  ["POST /api/persistent-workplane/jobs/:id/control", "workplane.job.control"]
]);
const actualRoutes = new Map(
  (binding.controlPlane?.routes || []).map((route) => [`${route.method} ${route.path}`, route.capability])
);
for (const [route, capability] of requiredRoutes) {
  if (actualRoutes.get(route) !== capability) throw new Error("Persistent workplane route drift: " + route);
}

if (binding.controlPlane?.authentication?.required !== true) throw new Error("Persistent workplane control authentication must remain required");
if (binding.controlPlane?.authentication?.environmentBinding !== "LEEWAY_WORKPLANE_CONTROL_TOKEN") {
  throw new Error("Persistent workplane control-token environment binding drift");
}
if (binding.controlPlane?.authentication?.failClosedWhenUnconfigured !== true) {
  throw new Error("Persistent workplane control must fail closed when unconfigured");
}

const serialized = JSON.stringify(binding);
for (const forbidden of ["controlTokenValue", "bearerTokenValue", "password", "apiKeyValue"]) {
  if (serialized.includes(forbidden)) throw new Error("Binding must not embed credential value field: " + forbidden);
}

const duplicateLaw = (binding.antiDuplicationLaw || []).join("\n");
for (const token of ["second Runtime Fabric", "second Parallel Workplane", "second Agent Lee identity", "persistent job queue"]) {
  if (!duplicateLaw.includes(token)) throw new Error("Anti-duplication law missing: " + token);
}

for (const [label, text] of [
  ["AGENTS", agents],
  ["Parallel Workplane skill", skill],
  ["Portability contract", portability]
]) {
  if (!text.includes(bindingPath)) throw new Error(label + " missing canonical persistent-workplane binding reference");
}

for (const token of [expected.runtimeRepository, expected.workplaneId, "workId"]) {
  if (!skill.includes(token) && token !== expected.workplaneId) {
    throw new Error("Parallel Workplane skill missing authority token: " + token);
  }
}
if (!agents.includes(expected.runtimeRepository)) throw new Error("Root authority missing Runtime Fabric binding");
if (!agents.includes("workId")) throw new Error("Root authority missing workId evidence gate");

console.log(JSON.stringify({
  state: "PASS_SOURCE_BINDING",
  bindingId: binding.bindingId,
  runtimeRepository: binding.authority.runtimeRepository,
  runtimeCommit: binding.authority.runtimeCommit,
  workplaneId: binding.workplane.id,
  proofRunId: binding.authority.sourceProof.workflowRunId,
  controlRoutes: binding.controlPlane.routes.length,
  runtimeExecutionClaim: "NOT_ESTABLISHED_BY_THIS_CHECK"
}, null, 2));
