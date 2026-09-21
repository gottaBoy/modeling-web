import type { PluginDefinition } from '../types';
import { createGraph, graphPluginIds, titles } from './model';
import { validateGraph } from './validation';
import { graphT as t } from './messages';

export const graphDefinitions: PluginDefinition[] = graphPluginIds.map(id => ({
  id,
  get title() { return titles[id]; },
  family: 'graph',
  get capabilities() { return [
    '本地图形编辑', '节点与连线属性', '位置持久模型', '结构与语义校验',
    ...({
      logicdesign: ['结构化赋值与分支', '逻辑执行计划'],
      workflowdesign: ['任务与审批配置', '入口出口可达性检查'],
      erdesign: ['数据表字段建模', '关系与外键DDL'],
      dataflowdesign: ['源转换输出管道', '本地样例数据执行'],
      dataquerydesign: ['查询字段与筛选编译', '参数化SQL预览'],
      valueruledesign: ['组合条件树', '无脚本规则求值'],
    }[id]),
  ].map(label => t(label)); },
  create: () => createGraph(id),
  validate: content => validateGraph(id, content),
}));
