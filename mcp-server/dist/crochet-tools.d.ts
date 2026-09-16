import { Tool } from "@modelcontextprotocol/sdk/types.js";
type JsonObject = Record<string, unknown>;
export declare const crochetToolDefinitions: Tool[];
export declare function isCrochetTool(name: string): boolean;
export declare function executeCrochetTool(name: string, args?: JsonObject): string;
export {};
//# sourceMappingURL=crochet-tools.d.ts.map