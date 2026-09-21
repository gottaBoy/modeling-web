export type PluginFamily = 'graph' | 'layout' | 'tool';
export type PluginContent = Record<string, unknown>;

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface PluginDefinition {
  id: string;
  title: string;
  family: PluginFamily;
  capabilities: string[];
  create: () => PluginContent;
  validate: (content: PluginContent) => ValidationIssue[];
}

export interface PluginDocument {
  schemaVersion: 1;
  id: string;
  pluginId: string;
  title: string;
  revision: number;
  updatedAt: string;
  content: PluginContent;
}
