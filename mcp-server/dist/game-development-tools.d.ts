import { Tool } from "@modelcontextprotocol/sdk/types.js";
type JsonObject = Record<string, unknown>;
export declare const gameDevelopmentToolDefinitions: Tool[];
export declare function isGameDevelopmentTool(name: string): boolean;
export declare function executeGameDevelopmentTool(name: string, args?: JsonObject): Promise<string>;
export {};
//# sourceMappingURL=game-development-tools.d.ts.map