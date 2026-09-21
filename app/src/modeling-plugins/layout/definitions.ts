import type { PluginDefinition } from '../types';
import { createLayoutContent, layoutIds, layoutSchemas } from './schema';
import { validateLayout } from './validation';
import { layoutT } from './messages';

export const layoutDefinitions: PluginDefinition[] = layoutIds.map(id => ({
  id,
  get title() { return layoutSchemas[id].title; },
  family: 'layout',
  get capabilities() { return [
    '本地组件编排',
    '属性编辑',
    '实时预览',
    '结构校验',
    ...(layoutSchemas[id].dataEnabled ? ['本地样例数据'] : []),
    ...(layoutSchemas[id].parentTypes ? ['层级编排'] : []),
    ...(id === 'chartdesign' || id === 'bireportdesign' ? ['ECharts 图表', '分组汇总'] : []),
  ].map(message => layoutT(message)); },
  create: () => createLayoutContent(id),
  validate: content => validateLayout(id, content),
}));
