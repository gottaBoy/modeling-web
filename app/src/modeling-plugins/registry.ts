import catalog from './catalog.json';
import { graphDefinitions } from './graph/definitions';
import { layoutDefinitions } from './layout/definitions';
import { toolDefinitions } from './tools/definitions';
import type { PluginContent, PluginDefinition, ValidationIssue } from './types';
import { t } from './messages';

const definitions = [...graphDefinitions, ...layoutDefinitions, ...toolDefinitions];
const byId = new Map(definitions.map(definition => [definition.id, definition]));
if (
  byId.size !== catalog.length ||
  definitions.length !== catalog.length ||
  catalog.some(entry => byId.get(entry.id)?.family !== entry.family)
) {
  throw new Error('Modeling plugin implementations do not match the required catalog');
}

export const plugins = catalog.map(entry => byId.get(entry.id)!);

export function getPlugin(id: string): PluginDefinition {
  const definition = byId.get(id);
  if (!definition) throw new Error(`Unknown modeling plugin: ${id}`);
  return definition;
}

export function validateContent(id: string, content: unknown): ValidationIssue[] {
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return [{ path: 'content', message: t('模型内容必须为 JSON 对象') }];
  }
  try {
    return getPlugin(id).validate(content as PluginContent);
  } catch {
    return [{ path: 'content', message: t('模型结构不符合插件契约') }];
  }
}
