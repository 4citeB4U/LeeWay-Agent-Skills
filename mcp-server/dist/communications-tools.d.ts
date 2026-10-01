import { Tool } from "@modelcontextprotocol/sdk/types.js";
type JsonObject = Record<string, unknown>;
export interface CommunicationsExecutionResult {
    text: string;
    isError: boolean;
}
export declare const communicationsToolDefinitions: Tool[];
export declare function isCommunicationsTool(name: string): boolean;
export declare function executeCommunicationsTool(name: string, args?: JsonObject): Promise<CommunicationsExecutionResult>;
export {};
//# sourceMappingURL=communications-tools.d.ts.map