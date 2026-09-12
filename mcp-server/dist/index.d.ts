#!/usr/bin/env node
export interface SkillsTool {
    name: string;
    category: string;
    description: string;
    capabilities: string[];
    tags: string[];
    skillPath: string;
    version: string;
}
export interface SkillRegistryEntry {
    name: string;
    category: string;
    path: string;
    version?: string;
    tags?: string[];
    description: string;
    capabilities?: string[];
    enabled?: boolean;
}
export interface SkillRegistry {
    skills?: SkillRegistryEntry[];
}
export interface ToolCallArguments {
    instruction: string;
    context?: Record<string, unknown>;
    options?: Record<string, unknown>;
}
export declare class LeewaySkillsMCPServer {
    private server;
    private skills;
    private registryPath;
    private skillsRoot;
    constructor();
    private addSkill;
    private loadLegacyRegistry;
    private loadPortableSkills;
    loadSkills(): Promise<void>;
    private setupHandlers;
    private executeSkill;
    private normalizeToolArgs;
    start(): Promise<void>;
}
export declare function startLeewaySkillsMCPServer(): Promise<LeewaySkillsMCPServer>;
//# sourceMappingURL=index.d.ts.map