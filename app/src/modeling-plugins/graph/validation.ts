import type { PluginContent, ValidationIssue } from '../types';
import { graphT as t } from './messages';
import {
  columnTypes, edgesOf, isGraphPluginId, isRecord, nodesOf, operators, palettes, records,
  type GraphEdge, type GraphNode, type GraphPluginId,
} from './model';

const reservedKeys = new Set(['__proto__', 'prototype', 'constructor']);
export function isIdentifier(value: unknown, dotted = false): value is string {
  return typeof value === 'string' && value.length <= 128 &&
    (dotted ? value.split('.') : [value]).every(part => /^[A-Za-z_][A-Za-z0-9_]*$/.test(part) && !reservedKeys.has(part));
}

export function walk(ids: string[], edges: GraphEdge[], reverse = false): Set<string> {
  const adjacency = new Map<string, string[]>();
  edges.forEach(edge => {
    const from = reverse ? edge.target : edge.source;
    const to = reverse ? edge.source : edge.target;
    adjacency.set(from, [...(adjacency.get(from) ?? []), to]);
  });
  const seen = new Set(ids);
  const queue = [...ids];
  for (let index = 0; index < queue.length; index += 1) {
    (adjacency.get(queue[index]) ?? []).forEach(id => {
      if (!seen.has(id)) {
        seen.add(id);
        queue.push(id);
      }
    });
  }
  return seen;
}

export function topologicalOrder(nodes: GraphNode[], edges: GraphEdge[]): string[] {
  const indegrees = new Map(nodes.map(node => [node.id, 0]));
  const outgoing = new Map<string, string[]>();
  edges.forEach(edge => {
    indegrees.set(edge.target, (indegrees.get(edge.target) ?? 0) + 1);
    outgoing.set(edge.source, [...(outgoing.get(edge.source) ?? []), edge.target]);
  });
  const queue = nodes.filter(node => indegrees.get(node.id) === 0).map(node => node.id);
  for (let index = 0; index < queue.length; index += 1) {
    (outgoing.get(queue[index]) ?? []).forEach(id => {
      const degree = (indegrees.get(id) ?? 0) - 1;
      indegrees.set(id, degree);
      if (degree === 0) queue.push(id);
    });
  }
  return queue;
}

function validateValue(properties: PluginContent, path: string, issues: ValidationIssue[]): void {
  const kind = properties.valueType;
  if (!['string', 'number', 'boolean'].includes(String(kind))) {
    issues.push({ path: `${path}.valueType`, message: '值类型必须为文本、数字或布尔' });
  } else if (typeof properties.value !== kind || (kind === 'number' && !Number.isFinite(properties.value))) {
    issues.push({ path: `${path}.value`, message: '值与声明类型不一致，数字必须为有限值' });
  }
}

function validatePredicate(properties: PluginContent, path: string, issues: ValidationIssue[]): void {
  if (!isIdentifier(properties.field, true)) issues.push({ path: `${path}.field`, message: '条件字段必须是安全的字段路径' });
  if (!operators.some(operator => operator.value === properties.operator)) issues.push({ path: `${path}.operator`, message: '不支持的比较运算符' });
  if (!['isNull', 'notNull'].includes(String(properties.operator))) {
    validateValue(properties, path, issues);
    if (properties.operator === 'contains' && properties.valueType !== 'string') issues.push({ path: `${path}.valueType`, message: '包含文本运算仅接受文本值' });
    if (['gt', 'gte', 'lt', 'lte'].includes(String(properties.operator)) && properties.valueType !== 'number') issues.push({ path: `${path}.valueType`, message: '大小比较必须使用数字值' });
  }
}

function validateProperties(pluginId: GraphPluginId, nodes: GraphNode[], edges: GraphEdge[], issues: ValidationIssue[]): void {
  const names = new Set<unknown>();
  nodes.forEach((node, index) => {
    const p = node.properties;
    const path = `nodes[${index}].properties`;
    const identifier = (key: string, dotted = false) => {
      if (!isIdentifier(p[key], dotted)) issues.push({ path: `${path}.${key}`, message: '名称必须以字母或下划线开头，只能含字母、数字和下划线' });
    };
    const text = (key: string) => {
      if (typeof p[key] !== 'string' || !(p[key] as string).trim()) issues.push({ path: `${path}.${key}`, message: '此属性不能为空' });
    };
    const fieldList = (key: string) => {
      if (!Array.isArray(p[key]) || !(p[key] as unknown[]).length ||
          !(p[key] as unknown[]).every(value => isIdentifier(value, pluginId === 'dataquerydesign')) ||
          new Set(p[key] as unknown[]).size !== (p[key] as unknown[]).length) {
        issues.push({ path: `${path}.${key}`, message: '至少配置一个合法字段，字段不可重复' });
      }
    };
    if (['predicate', 'condition', 'decision', 'filter'].includes(node.kind)) validatePredicate(p, path, issues);
    if (pluginId === 'valueruledesign' && p.message !== undefined && typeof p.message !== 'string') {
      issues.push({ path: `${path}.message`, message: '未通过提示必须为文本' });
    }
    if (node.kind === 'assign') {
      identifier('target', true);
      validateValue(p, path, issues);
    }
    if (node.kind === 'action') {
      identifier('action', true);
      identifier('input', true);
      identifier('output', true);
    }
    if (['task', 'approval'].includes(node.kind)) {
      text('assignee');
      if (typeof p.dueHours !== 'number' || !Number.isFinite(p.dueHours) || p.dueHours <= 0 || p.dueHours > 87600) issues.push({ path: `${path}.dueHours`, message: '办理时限应大于0且不超过87600小时' });
      if (node.kind === 'approval' && !['all', 'any'].includes(String(p.approvalMode))) issues.push({ path: `${path}.approvalMode`, message: '请选择会签或或签' });
    }
    if (node.kind === 'table') {
      identifier('tableName', pluginId === 'dataquerydesign');
      if (names.has(p.tableName)) issues.push({ path: `${path}.tableName`, message: '数据表名称不可重复' });
      names.add(p.tableName);
    }
    if (pluginId === 'erdesign') {
      const columns = records(p.columns);
      if (!Array.isArray(p.columns) || !columns.length || columns.length !== p.columns.length) issues.push({ path: `${path}.columns`, message: '数据表必须包含有效字段对象' });
      if (columns.filter(column => column.primary === true).length !== 1) issues.push({ path: `${path}.columns`, message: '每张表必须且只能有一个主键字段' });
      const columnNames = new Set<unknown>();
      columns.forEach((column, columnIndex) => {
        const columnPath = `${path}.columns[${columnIndex}]`;
        if (!isIdentifier(column.name) || columnNames.has(column.name)) issues.push({ path: `${columnPath}.name`, message: '字段名不合法或重复' });
        columnNames.add(column.name);
        if (!columnTypes.includes(String(column.type))) issues.push({ path: `${columnPath}.type`, message: '不支持的字段类型' });
        if (typeof column.primary !== 'boolean' || typeof column.nullable !== 'boolean') issues.push({ path: columnPath, message: '主键与允许空值必须是布尔值' });
        if (column.primary && column.nullable) issues.push({ path: `${columnPath}.nullable`, message: '主键不允许为空' });
      });
    }
    if (node.kind === 'select') {
      fieldList('columns');
      if (typeof p.distinct !== 'boolean') issues.push({ path: `${path}.distinct`, message: '去重配置必须是布尔值' });
      if (!Number.isInteger(p.limit) || Number(p.limit) < 1 || Number(p.limit) > 10000) issues.push({ path: `${path}.limit`, message: '返回行数上限必须为1到10000的整数' });
    }
    if (node.kind === 'sort') {
      identifier('field', true);
      if (!['asc', 'desc'].includes(String(p.direction))) issues.push({ path: `${path}.direction`, message: '排序方向必须为升序或降序' });
    }
    if (['source', 'sink'].includes(node.kind)) identifier('dataset');
    if (node.kind === 'source' && (!Array.isArray(p.records) || !p.records.every(isRecord) || p.records.length > 1000)) issues.push({ path: `${path}.records`, message: '样例数据必须为对象数组，最多1000行' });
    if (node.kind === 'sink' && !['replace', 'append'].includes(String(p.writeMode))) issues.push({ path: `${path}.writeMode`, message: '写入方式必须为覆盖或追加' });
    if (node.kind === 'transform') {
      if (!['set', 'pick', 'rename'].includes(String(p.operation))) issues.push({ path: `${path}.operation`, message: '不支持的字段转换操作' });
      if (p.operation === 'pick') fieldList('fields');
      if (p.operation === 'rename') {
        identifier('sourceField');
        identifier('targetField');
        if (p.sourceField === p.targetField) issues.push({ path: `${path}.targetField`, message: '原字段与目标字段必须不同' });
      }
      if (p.operation === 'set') {
        identifier('targetField');
        validateValue(p, path, issues);
      }
    }
  });
  if (pluginId === 'erdesign') {
    edges.forEach((edge, index) => {
      const p = edge.properties;
      const path = `edges[${index}].properties`;
      const sourceColumns = records(nodes.find(node => node.id === edge.source)?.properties.columns);
      const targetColumns = records(nodes.find(node => node.id === edge.target)?.properties.columns);
      const source = sourceColumns.find(column => column.name === p.sourceField);
      const target = targetColumns.find(column => column.name === p.targetField);
      if (!source) issues.push({ path: `${path}.sourceField`, message: '关系源字段不存在' });
      if (!target) issues.push({ path: `${path}.targetField`, message: '关系目标字段不存在' });
      if (!['one-to-many', 'many-to-one', 'one-to-one'].includes(String(p.cardinality))) issues.push({ path: `${path}.cardinality`, message: '请选择一对多、多对一或一对一关系' });
      if (source && target) {
        if (source.type !== target.type) issues.push({ path, message: '关系两端字段类型必须一致' });
        const reference = p.cardinality === 'many-to-one' ? target : source;
        if (reference.primary !== true) issues.push({ path, message: '被引用字段必须是主键' });
      }
    });
  }
}

function connectionProblem(pluginId: GraphPluginId, content: PluginContent, source: string, target: string): string | undefined {
  const nodes = nodesOf(content);
  const from = nodes.find(node => node.id === source);
  const to = nodes.find(node => node.id === target);
  if (!from || !to) return '连线两端必须是现有节点';
  if (source === target && pluginId !== 'erdesign') return '不能连接节点自身';
  if (pluginId === 'valueruledesign' && from.kind === 'predicate') return '条件节点不能包含子节点';
  if (pluginId !== 'erdesign' && ['end', 'sink', 'select'].includes(from.kind)) return '出口节点不能有后续连线';
  if (pluginId !== 'erdesign' && ['start', 'source', 'table'].includes(to.kind)) return '入口节点不能有前置连线';
  return undefined;
}

export function connectionIssue(pluginId: GraphPluginId, content: PluginContent, source: string, target: string): string | undefined {
  const problem = connectionProblem(pluginId, content, source, target);
  return problem ? t(problem) : undefined;
}

// Localize at the public boundary so every early return also uses the live locale.
export function validateGraph(pluginId: string, content: PluginContent): ValidationIssue[] {
  return graphIssues(pluginId, content).map(issue => ({ ...issue, message: t(issue.message) }));
}

function graphIssues(pluginId: string, content: PluginContent): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!isGraphPluginId(pluginId)) return [{ path: 'pluginId', message: '不支持的图模型类型' }];
  if (!isRecord(content)) return [{ path: '', message: '图模型必须是对象' }];
  if (!Array.isArray(content.nodes)) issues.push({ path: 'nodes', message: '节点集合必须为数组' });
  if (!Array.isArray(content.edges)) issues.push({ path: 'edges', message: '连线集合必须为数组' });
  if (issues.length) return issues;
  const rawNodes = content.nodes as unknown[];
  const rawEdges = content.edges as unknown[];
  if (!rawNodes.length) issues.push({ path: 'nodes', message: '至少需要一个节点' });
  if (rawNodes.length > 1000 || rawEdges.length > 4000) return [{ path: 'nodes', message: '图模型最多包含1000个节点和4000条连线' }];
  const ids = new Set<string>();
  const nodeIds = new Set<string>();
  const checkId = (value: PluginContent, path: string) => {
    if (typeof value.id !== 'string' || !value.id.trim() || value.id.length > 128) issues.push({ path: `${path}.id`, message: '标识不能为空且不能超过128个字符' });
    else {
      if (ids.has(value.id)) issues.push({ path: `${path}.id`, message: '节点与连线标识必须全局唯一' });
      ids.add(value.id);
    }
  };
  rawNodes.forEach((node, index) => {
    const path = `nodes[${index}]`;
    if (!isRecord(node)) { issues.push({ path, message: '节点必须是对象' }); return; }
    checkId(node, path);
    if (typeof node.id === 'string') nodeIds.add(node.id);
    if (!palettes[pluginId].some(entry => entry.kind === node.kind)) issues.push({ path: `${path}.kind`, message: '此设计器不支持该节点类型' });
    if (typeof node.label !== 'string' || !node.label.trim()) issues.push({ path: `${path}.label`, message: '节点名称不能为空' });
    for (const key of ['x', 'y']) {
      if (typeof node[key] !== 'number' || !Number.isFinite(node[key])) issues.push({ path: `${path}.${key}`, message: '节点坐标必须为有限数字' });
    }
    if (!isRecord(node.properties)) issues.push({ path: `${path}.properties`, message: '节点属性必须是对象' });
  });
  const links = new Set<string>();
  rawEdges.forEach((edge, index) => {
    const path = `edges[${index}]`;
    if (!isRecord(edge)) { issues.push({ path, message: '连线必须是对象' }); return; }
    checkId(edge, path);
    if (typeof edge.source !== 'string' || !nodeIds.has(edge.source)) issues.push({ path: `${path}.source`, message: '源节点不存在' });
    if (typeof edge.target !== 'string' || !nodeIds.has(edge.target)) issues.push({ path: `${path}.target`, message: '目标节点不存在' });
    if (!isRecord(edge.properties)) issues.push({ path: `${path}.properties`, message: '连线属性必须是对象' });
    if (typeof edge.label !== 'string') issues.push({ path: `${path}.label`, message: '连线名称必须是文本' });
    if (edge.vertices !== undefined && (!Array.isArray(edge.vertices) || !edge.vertices.every(point => isRecord(point) && typeof point.x === 'number' && Number.isFinite(point.x) && typeof point.y === 'number' && Number.isFinite(point.y)))) issues.push({ path: `${path}.vertices`, message: '折点坐标必须为有限数字' });
    const properties = isRecord(edge.properties) ? edge.properties : {};
    const key = JSON.stringify([edge.source, edge.target, properties.branch, properties.sourceField, properties.targetField]);
    if (links.has(key)) issues.push({ path, message: '不能存在相同语义的重复连线' });
    links.add(key);
  });
  if (issues.length) return issues;
  const nodes = nodesOf(content);
  const edges = edgesOf(content);
  validateProperties(pluginId, nodes, edges, issues);
  edges.forEach((edge, index) => {
    const message = connectionProblem(pluginId, content, edge.source, edge.target);
    if (message) issues.push({ path: `edges[${index}]`, message });
  });
  if (pluginId === 'erdesign') return issues;
  const incoming = (id: string) => edges.filter(edge => edge.target === id);
  const outgoing = (id: string) => edges.filter(edge => edge.source === id);
  const controlFlow = ['logicdesign', 'workflowdesign'].includes(pluginId);
  if (!controlFlow && topologicalOrder(nodes, edges).length !== nodes.length) issues.push({ path: 'edges', message: '数据管道与属性规则不允许循环依赖' });
  let roots: GraphNode[];
  let terminals: GraphNode[];
  if (pluginId === 'valueruledesign') {
    roots = nodes.filter(node => incoming(node.id).length === 0);
    terminals = nodes.filter(node => node.kind === 'predicate');
    if (roots.length !== 1) issues.push({ path: 'nodes', message: '属性规则必须有且只有一个根节点' });
    nodes.forEach((node, index) => {
      const path = `nodes[${index}]`;
      const children = outgoing(node.id).length;
      if (incoming(node.id).length > 1) issues.push({ path, message: '规则节点只能属于一个父节点' });
      if (['all', 'any'].includes(node.kind) && children === 0) issues.push({ path, message: '条件组至少需要一个子条件' });
      if (node.kind === 'not' && children !== 1) issues.push({ path, message: '取反节点必须且只能包含一个子条件' });
    });
    if (content.sample !== undefined && !isRecord(content.sample)) issues.push({ path: 'sample', message: '规则样例必须为对象' });
  } else {
    const rootKind = controlFlow ? 'start' : pluginId === 'dataquerydesign' ? 'table' : 'source';
    const endKind = controlFlow ? 'end' : pluginId === 'dataquerydesign' ? 'select' : 'sink';
    roots = nodes.filter(node => node.kind === rootKind);
    terminals = nodes.filter(node => node.kind === endKind);
    if (!roots.length || (pluginId !== 'dataflowdesign' && roots.length !== 1)) issues.push({ path: 'nodes', message: '必须配置唯一入口；数据流允许多个数据源' });
    if (!terminals.length || (pluginId === 'dataquerydesign' && terminals.length !== 1)) issues.push({ path: 'nodes', message: '必须配置出口；查询必须有且只有一个查询投影' });
    nodes.forEach((node, index) => {
      const path = `nodes[${index}]`;
      const inputs = incoming(node.id);
      const outputs = outgoing(node.id);
      if (node.kind !== rootKind && (!inputs.length || (!controlFlow && inputs.length !== 1))) issues.push({ path, message: controlFlow ? '非入口节点必须有前置连线' : '管道节点必须且只能有一条前置连线' });
      if (['condition', 'decision'].includes(node.kind)) {
        if (outputs.length !== 2 || !outputs.some(edge => edge.properties.branch === 'true') || !outputs.some(edge => edge.properties.branch === 'false')) issues.push({ path, message: '条件分支必须配置成立和不成立两条出口' });
      } else if (node.kind !== endKind && (pluginId === 'dataflowdesign' ? outputs.length === 0 : outputs.length !== 1)) {
        issues.push({ path, message: pluginId === 'dataflowdesign' ? '数据处理节点必须连接输出' : '普通节点必须且只能有一条后续连线' });
      }
    });
    edges.forEach((edge, index) => {
      const node = nodes.find(value => value.id === edge.source);
      if (edge.properties.branch !== undefined && node && !['condition', 'decision'].includes(node.kind)) issues.push({ path: `edges[${index}].properties.branch`, message: '只有条件分支可以配置成立或不成立出口' });
    });
  }
  const reachable = walk(roots.map(node => node.id), edges);
  const terminating = walk(terminals.map(node => node.id), edges, true);
  nodes.forEach((node, index) => {
    if (!reachable.has(node.id)) issues.push({ path: `nodes[${index}]`, message: '节点无法从入口到达' });
    if (!terminating.has(node.id)) issues.push({ path: `nodes[${index}]`, message: '节点无法到达出口或最终条件' });
  });
  return issues;
}
