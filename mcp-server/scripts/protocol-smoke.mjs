import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const requiredTools = [
  "crochet_validate_lesson",
  "crochet_diagnose_attempt",
  "crochet_calculate_gauge",
  "crochet_recommend_next_lesson",
];

const client = new Client(
  { name: "leeway-crochet-protocol-smoke", version: "1.0.0" },
  { capabilities: {} },
);
const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["dist/index.js"],
});

try {
  await client.connect(transport);
  const listed = await client.listTools();
  const names = listed.tools.map((tool) => tool.name);
  for (const name of requiredTools) {
    if (!names.includes(name)) throw new Error(`MCP tool list is missing ${name}`);
  }

  const called = await client.callTool({
    name: "crochet_calculate_gauge",
    arguments: { stitches: 18, rows: 24, width_cm: 10, height_cm: 10 },
  });
  const text = called.content?.[0]?.text;
  if (typeof text !== "string") throw new Error("Gauge tool returned no text payload");
  const result = JSON.parse(text);
  if (result.stitches_per_10cm !== 18 || result.rows_per_10cm !== 24) {
    throw new Error(`Unexpected gauge result: ${text}`);
  }

  console.log(
    JSON.stringify({
      state: "PROTOCOL_VERIFIED",
      tool_count: names.length,
      crochet_tools: requiredTools,
      gauge: result,
    }),
  );
} finally {
  await client.close();
}
