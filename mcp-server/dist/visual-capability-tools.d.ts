import { Tool } from "@modelcontextprotocol/sdk/types.js";
type JsonObject = Record<string, unknown>;
export interface VisualCapabilityExecutionResult {
    text: string;
    isError: boolean;
}
export declare const visualCapabilityToolDefinitions: Tool[];
export declare function isVisualCapabilityTool(name: string): boolean;
export declare function executeVisualCapabilityTool(name: string, args?: JsonObject): Promise<VisualCapabilityExecutionResult>;
export {};
//# sourceMappingURL=visual-capability-tools.d.ts.map