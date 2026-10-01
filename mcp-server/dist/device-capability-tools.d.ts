import { Tool } from "@modelcontextprotocol/sdk/types.js";
type JsonObject = Record<string, unknown>;
export interface DeviceCapabilityExecutionResult {
    text: string;
    isError: boolean;
}
export declare const deviceCapabilityToolDefinitions: Tool[];
export declare function isDeviceCapabilityTool(name: string): boolean;
export declare function executeDeviceCapabilityTool(name: string, args?: JsonObject): Promise<DeviceCapabilityExecutionResult>;
export {};
//# sourceMappingURL=device-capability-tools.d.ts.map