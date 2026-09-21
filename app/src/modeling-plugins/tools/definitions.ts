import type { PluginDefinition } from '../types';
import { createCollaboration, validateCollaboration } from './collaboration';
import { createViewWizard, validateViewWizard } from './view-wizard';
import { createPerspective, validatePerspective } from './perspective';
import { createAdvanced, validateAdvanced } from './advanced';
import { createMaterials, validateMaterials } from './materials';
import { createSync, validateSync } from './sync';
import { createSchemaImporter, validateSchemaImporter } from './schema-importer';
import { toolsT } from './messages';
import type { ToolsMessageKey } from './messages';

const definitions: (Omit<PluginDefinition, 'title' | 'capabilities'> & {
  title: ToolsMessageKey; capabilities: ToolsMessageKey[];
})[] = [
  { id: 'plm4modeling', title: 'PLM协作插件', family: 'tool', capabilities: ['本地任务', '状态跟踪', '评论', '模型引用'], create: createCollaboration, validate: validateCollaboration },
  { id: 'ibizappviewcreator', title: '视图建立向导插件', family: 'tool', capabilities: ['实体字段配置', '视图选择', 'PS模型生成'], create: createViewWizard, validate: validateViewWizard },
  { id: 'modelperspectivetool', title: '模型透视工具', family: 'tool', capabilities: ['结构化模型导入', '层级检索', '引用诊断'], create: createPerspective, validate: validatePerspective },
  { id: 'ibizmodelingadvanced', title: '系统维护工具', family: 'tool', capabilities: ['设置白名单', '配置校验', '模型一致性报告'], create: createAdvanced, validate: validateAdvanced },
  { id: 'modeling-materials', title: 'Modeling模型素材仓库', family: 'tool', capabilities: ['素材增删改查', '应用预览', '本地素材导入导出'], create: createMaterials, validate: validateMaterials },
  { id: 'modeling-sync', title: '模型增量同步工具', family: 'tool', capabilities: ['三方结构差异', '冲突决策', '显式应用', '未变更检测'], create: createSync, validate: validateSync },
  { id: 'ibizdbschemaimporter', title: '关系数据库导入插件', family: 'tool', capabilities: ['关系模式JSON导入', '字段类型映射', '主外键校验', 'PS实体预览'], create: createSchemaImporter, validate: validateSchemaImporter },
];

export const toolDefinitions: PluginDefinition[] = definitions.map(definition => ({
  ...definition,
  get title() { return toolsT(definition.title); },
  get capabilities() { return definition.capabilities.map(key => toolsT(key)); },
}));

export * from './collaboration';
export * from './view-wizard';
export * from './perspective';
export * from './advanced';
export * from './materials';
export * from './sync';
export * from './schema-importer';
export { parseModelJson, ToolValidationError } from './safe';
export { toolsT } from './messages';
