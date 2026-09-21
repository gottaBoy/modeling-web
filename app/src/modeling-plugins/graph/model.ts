import type { PluginContent } from '../types';
import { graphT as t } from './messages';

export const graphPluginIds = [
  'logicdesign',
  'workflowdesign',
  'erdesign',
  'dataflowdesign',
  'dataquerydesign',
  'valueruledesign',
] as const;
export type GraphPluginId = (typeof graphPluginIds)[number];

export interface GraphNode extends PluginContent {
  id: string;
  kind: string;
  label: string;
  x: number;
  y: number;
  properties: PluginContent;
}

export interface GraphEdge extends PluginContent {
  id: string;
  source: string;
  target: string;
  label: string;
  properties: PluginContent;
}

export interface GraphContent extends PluginContent {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface Column extends PluginContent {
  name: string;
  type: string;
  primary: boolean;
  nullable: boolean;
}

export interface PropertyField {
  key: string;
  label: string;
  control: 'text' | 'number' | 'boolean' | 'select' | 'list' | 'records' | 'value';
  options?: { value: string; label: string }[];
  when?: (properties: PluginContent) => boolean;
}

export interface PaletteItem {
  kind: string;
  label: string;
  icon: string;
  color: string;
}

export const titles: Record<GraphPluginId, string> = {
  get logicdesign() { return t('标准逻辑设计器'); },
  get workflowdesign() { return t('标准工作流设计器'); },
  get erdesign() { return t('标准ER设计器'); },
  get dataflowdesign() { return t('标准数据流设计器'); },
  get dataquerydesign() { return t('标准数据查询设计器'); },
  get valueruledesign() { return t('标准属性值规则设计器'); },
};

const item = (kind: string, label: string, icon: string, color: string): PaletteItem =>
  ({ kind, get label() { return t(label); }, icon: `fa fa-${icon}`, color });
const start = item('start', '开始', 'play-circle-o', '#20785b');
const end = item('end', '结束', 'stop-circle-o', '#a94a55');
const predicate = item('predicate', '条件', 'filter', '#956014');

export const palettes: Record<GraphPluginId, PaletteItem[]> = {
  logicdesign: [
    start,
    item('assign', '赋值', 'pencil-square-o', '#306fa3'),
    item('condition', '条件分支', 'code-fork', '#956014'),
    item('action', '动作调用', 'bolt', '#427479'),
    end,
  ],
  workflowdesign: [
    start,
    item('task', '人工任务', 'user-o', '#306fa3'),
    item('approval', '审批任务', 'check-square-o', '#427479'),
    item('decision', '条件网关', 'code-fork', '#956014'),
    end,
  ],
  erdesign: [item('table', '数据表', 'table', '#306fa3')],
  dataflowdesign: [
    item('source', '数据源', 'database', '#20785b'),
    item('transform', '字段转换', 'exchange', '#306fa3'),
    item('filter', '行过滤', 'filter', '#956014'),
    item('sink', '数据输出', 'sign-out', '#a94a55'),
  ],
  dataquerydesign: [
    item('table', '查询数据表', 'database', '#20785b'),
    item('filter', '筛选条件', 'filter', '#956014'),
    item('sort', '排序', 'sort-amount-asc', '#427479'),
    item('select', '查询投影', 'list-alt', '#306fa3'),
  ],
  valueruledesign: [
    item('all', '全部满足', 'check-square-o', '#306fa3'),
    item('any', '任一满足', 'list-ul', '#427479'),
    item('not', '取反', 'minus-circle', '#a94a55'),
    predicate,
  ],
};

export function isGraphPluginId(value: string): value is GraphPluginId {
  return graphPluginIds.some(id => id === value);
}

export function isRecord(value: unknown): value is PluginContent {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function records(value: unknown): PluginContent[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

// Read views tolerate malformed imports. Mutations below always patch the original
// arrays so unrelated, unknown fields (including malformed entries) are not erased.
export function nodesOf(content: PluginContent): GraphNode[] {
  return records(content.nodes)
    .filter(node => typeof node.id === 'string')
    .map(node => ({
      ...node,
      id: node.id as string,
      kind: typeof node.kind === 'string' ? node.kind : '',
      label: typeof node.label === 'string' ? node.label : String(node.id),
      x: typeof node.x === 'number' && Number.isFinite(node.x) ? node.x : 40,
      y: typeof node.y === 'number' && Number.isFinite(node.y) ? node.y : 40,
      properties: isRecord(node.properties) ? node.properties : {},
    }));
}

export function edgesOf(content: PluginContent): GraphEdge[] {
  return records(content.edges)
    .filter(edge => typeof edge.id === 'string')
    .map(edge => ({
      ...edge,
      id: edge.id as string,
      source: typeof edge.source === 'string' ? edge.source : '',
      target: typeof edge.target === 'string' ? edge.target : '',
      label: typeof edge.label === 'string' ? edge.label : '',
      properties: isRecord(edge.properties) ? edge.properties : {},
    }));
}

export function uniqueId(content: PluginContent, prefix: string): string {
  const ids = new Set([...records(content.nodes), ...records(content.edges)].map(value => value.id));
  let index = 1;
  while (ids.has(`${prefix}_${index}`)) index += 1;
  return `${prefix}_${index}`;
}

function translatedOptions(options: { value: string; label: string }[]) {
  return options.map(option => ({ value: option.value, get label() { return t(option.label); } }));
}

export const operators = translatedOptions([
  { value: 'eq', label: '等于' },
  { value: 'ne', label: '不等于' },
  { value: 'gt', label: '大于' },
  { value: 'gte', label: '大于等于' },
  { value: 'lt', label: '小于' },
  { value: 'lte', label: '小于等于' },
  { value: 'contains', label: '包含文本' },
  { value: 'isNull', label: '为空' },
  { value: 'notNull', label: '不为空' },
]);
export const columnTypes = ['INTEGER', 'VARCHAR', 'TEXT', 'DECIMAL', 'BOOLEAN', 'DATE', 'TIMESTAMP', 'UUID'];
export const valueTypes = translatedOptions([
  { value: 'string', label: '文本' },
  { value: 'number', label: '数字' },
  { value: 'boolean', label: '布尔' },
]);
const valueFields: PropertyField[] = [
  { key: 'valueType', label: '值类型', control: 'select', options: valueTypes },
  { key: 'value', label: '比较值', control: 'value' },
];
const predicateFields: PropertyField[] = [
  { key: 'field', label: '条件字段', control: 'text' },
  { key: 'operator', label: '比较运算符', control: 'select', options: operators },
  ...valueFields.map(field => ({
    ...field,
    when: (p: PluginContent) => !['isNull', 'notNull'].includes(String(p.operator)),
  })),
];

function rawPropertyFields(pluginId: string, kind: string): PropertyField[] {
  if (['predicate', 'condition', 'decision', 'filter'].includes(kind)) return [
    ...predicateFields,
    ...(pluginId === 'valueruledesign' ? [{ key: 'message', label: '未通过提示', control: 'text' as const }] : []),
  ];
  if (kind === 'assign') return [
    { key: 'target', label: '目标变量', control: 'text' },
    ...valueFields.map(field => ({ ...field, label: field.key === 'value' ? '赋值内容' : field.label })),
  ];
  if (kind === 'action') return [
    { key: 'action', label: '动作标识', control: 'text' },
    { key: 'input', label: '输入变量', control: 'text' },
    { key: 'output', label: '输出变量', control: 'text' },
  ];
  if (['task', 'approval'].includes(kind)) return [
    { key: 'assignee', label: '办理人', control: 'text' },
    { key: 'dueHours', label: '办理时限（小时）', control: 'number' },
    ...(kind === 'approval' ? [{
      key: 'approvalMode', label: '审批方式', control: 'select' as const,
      options: [{ value: 'all', label: '会签' }, { value: 'any', label: '或签' }],
    }] : []),
  ];
  if (kind === 'table') return [{ key: 'tableName', label: '表名', control: 'text' }];
  if (kind === 'select') return [
    { key: 'columns', label: '查询字段', control: 'list' },
    { key: 'distinct', label: '去重', control: 'boolean' },
    { key: 'limit', label: '返回行数上限', control: 'number' },
  ];
  if (kind === 'sort') return [
    { key: 'field', label: '排序字段', control: 'text' },
    { key: 'direction', label: '排序方向', control: 'select', options: [{ value: 'asc', label: '升序' }, { value: 'desc', label: '降序' }] },
  ];
  if (kind === 'source') return [
    { key: 'dataset', label: '数据源名称', control: 'text' },
    { key: 'records', label: '样例数据', control: 'records' },
  ];
  if (kind === 'sink') return [
    { key: 'dataset', label: '输出数据集', control: 'text' },
    { key: 'writeMode', label: '写入方式', control: 'select', options: [{ value: 'replace', label: '覆盖' }, { value: 'append', label: '追加' }] },
  ];
  if (kind === 'transform') return [
    { key: 'operation', label: '转换操作', control: 'select', options: [
      { value: 'set', label: '设置字段' }, { value: 'rename', label: '字段重命名' }, { value: 'pick', label: '保留字段' },
    ] },
    { key: 'fields', label: '保留字段', control: 'list', when: p => p.operation === 'pick' },
    { key: 'sourceField', label: '原字段', control: 'text', when: p => p.operation === 'rename' },
    { key: 'targetField', label: '目标字段', control: 'text', when: p => p.operation !== 'pick' },
    ...valueFields.map(field => ({ ...field, when: (p: PluginContent) => p.operation === 'set' })),
  ];
  return pluginId === 'valueruledesign' ? [{ key: 'message', label: '未通过提示', control: 'text' }] : [];
}

export function propertyFields(pluginId: string, kind: string): PropertyField[] {
  return rawPropertyFields(pluginId, kind).map(field => ({
    ...field,
    get label() { return t(field.label); },
    // The two shared option sets already expose reactive labels.
    options: field.options === operators || field.options === valueTypes
      ? field.options : field.options && translatedOptions(field.options),
  }));
}

export function defaultProperties(pluginId: GraphPluginId, kind: string, suffix = 1): PluginContent {
  if (['predicate', 'condition', 'decision', 'filter'].includes(kind)) {
    return { field: 'status', operator: 'eq', valueType: 'string', value: 'active', message: t('状态必须有效') };
  }
  switch (kind) {
    case 'assign': return { target: 'result.status', valueType: 'string', value: 'ready' };
    case 'action': return { action: 'notify', input: 'request', output: 'result' };
    case 'task': return { assignee: 'owner', dueHours: 24 };
    case 'approval': return { assignee: 'manager', dueHours: 48, approvalMode: 'all' };
    case 'table': return {
      tableName: pluginId === 'erdesign' ? `table_${suffix}` : 'orders',
      ...(pluginId === 'erdesign' ? { columns: [
        { name: 'id', type: 'INTEGER', primary: true, nullable: false },
        { name: 'name', type: 'VARCHAR', primary: false, nullable: false },
      ] } : {}),
    };
    case 'select': return { columns: ['id', 'name'], distinct: false, limit: 100 };
    case 'sort': return { field: 'id', direction: 'asc' };
    case 'source': return {
      dataset: `source_${suffix}`,
      records: [{ id: 1, name: t('示例订单'), status: 'active', amount: 120 }, { id: 2, name: t('已关闭订单'), status: 'closed', amount: 50 }],
    };
    case 'transform': return { operation: 'set', targetField: 'processed', sourceField: 'name', fields: ['id', 'name'], valueType: 'boolean', value: true };
    case 'sink': return { dataset: `result_${suffix}`, writeMode: 'replace' };
    case 'all':
    case 'any':
    case 'not': return { message: t('属性值不符合规则') };
    default: return {};
  }
}

export function makeNode(pluginId: GraphPluginId, kind: string, id: string, x = 40, y = 100): GraphNode {
  const entry = palettes[pluginId].find(value => value.kind === kind);
  if (!entry) throw new Error(t('不支持的节点类型：{kind}', { kind }));
  return { id, kind, label: entry.label, x, y, properties: defaultProperties(pluginId, kind) };
}

export function makeEdge(id: string, source: string, target: string, properties: PluginContent = {}): GraphEdge {
  return { id, source, target, label: '', properties };
}

export function createGraph(pluginId: GraphPluginId): GraphContent {
  let kinds: string[];
  switch (pluginId) {
    case 'logicdesign': kinds = ['start', 'assign', 'end']; break;
    case 'workflowdesign': kinds = ['start', 'approval', 'end']; break;
    case 'erdesign': kinds = ['table', 'table']; break;
    case 'dataflowdesign': kinds = ['source', 'transform', 'sink']; break;
    case 'dataquerydesign': kinds = ['table', 'filter', 'select']; break;
    default: kinds = ['all', 'predicate', 'predicate'];
  }
  const nodes = kinds.map((kind, index) => makeNode(pluginId, kind, `${kind}_${index + 1}`, 40 + index * 240, 100));
  const edges = nodes.slice(1).map((node, index) => makeEdge(`edge_${index + 1}`, nodes[index].id, node.id));
  if (pluginId === 'erdesign') {
    nodes[0].label = t('客户');
    nodes[0].properties.tableName = 'customers';
    nodes[1].label = t('订单');
    nodes[1].properties.tableName = 'orders';
    (nodes[1].properties.columns as Column[]).push({ name: 'customer_id', type: 'INTEGER', primary: false, nullable: false });
    edges[0].properties = { cardinality: 'one-to-many', sourceField: 'id', targetField: 'customer_id' };
    edges[0].label = t('客户订单');
  }
  if (pluginId === 'valueruledesign') {
    nodes[0].x = 40;
    nodes[0].y = 150;
    nodes[1].x = 300;
    nodes[1].y = 60;
    nodes[1].label = t('年龄要求');
    nodes[1].properties = { field: 'age', operator: 'gte', valueType: 'number', value: 18, message: t('年龄不得小于18岁') };
    nodes[2].x = 300;
    nodes[2].y = 240;
    nodes[2].label = t('有效状态');
    edges[1].source = nodes[0].id;
  }
  return {
    nodes, edges,
    ...(pluginId === 'valueruledesign' ? { sample: { age: 24, status: 'active' } } : {}),
  };
}

function patchItem(content: PluginContent, key: 'nodes' | 'edges', id: string, patch: PluginContent): PluginContent {
  const values = Array.isArray(content[key]) ? content[key] as unknown[] : [];
  return {
    ...content,
    [key]: values.map(value => {
      if (!isRecord(value) || value.id !== id) return value;
      return {
        ...value, ...patch, id: value.id,
        ...(isRecord(patch.properties) ? { properties: { ...(isRecord(value.properties) ? value.properties : {}), ...patch.properties } } : {}),
      };
    }),
  };
}

export function updateNode(content: PluginContent, id: string, patch: PluginContent): PluginContent {
  return patchItem(content, 'nodes', id, patch);
}
export function updateEdge(content: PluginContent, id: string, patch: PluginContent): PluginContent {
  return patchItem(content, 'edges', id, patch);
}
export function moveNode(content: PluginContent, id: string, x: number, y: number): PluginContent {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return content;
  return updateNode(content, id, { x, y });
}
export function removeNode(content: PluginContent, id: string): PluginContent {
  return {
    ...content,
    nodes: (Array.isArray(content.nodes) ? content.nodes : []).filter(node => !isRecord(node) || node.id !== id),
    edges: (Array.isArray(content.edges) ? content.edges : []).filter(edge => !isRecord(edge) || (edge.source !== id && edge.target !== id)),
  };
}
export function removeEdge(content: PluginContent, id: string): PluginContent {
  return { ...content, edges: (Array.isArray(content.edges) ? content.edges : []).filter(edge => !isRecord(edge) || edge.id !== id) };
}

export function defaultEdgeProperties(pluginId: GraphPluginId, content: PluginContent, source: string, target: string, excludeId?: string): PluginContent {
  const nodes = nodesOf(content);
  const from = nodes.find(node => node.id === source);
  const to = nodes.find(node => node.id === target);
  if (pluginId === 'erdesign') {
    const sourceColumns = records(from?.properties.columns);
    const targetColumns = records(to?.properties.columns);
    return {
      cardinality: 'one-to-many',
      sourceField: sourceColumns.find(column => column.primary)?.name ?? sourceColumns[0]?.name ?? '',
      targetField: targetColumns.find(column => !column.primary && column.type === sourceColumns.find(c => c.primary)?.type)?.name ?? targetColumns[0]?.name ?? '',
    };
  }
  if (from && ['condition', 'decision'].includes(from.kind)) {
    const used = edgesOf(content).filter(edge => edge.source === source && edge.id !== excludeId).map(edge => edge.properties.branch);
    return { branch: used.includes('true') ? 'false' : 'true' };
  }
  return {};
}

export function addEdge(content: PluginContent, pluginId: GraphPluginId, source: string, target: string, properties?: PluginContent): PluginContent {
  return {
    ...content,
    edges: [...(Array.isArray(content.edges) ? content.edges : []), makeEdge(uniqueId(content, 'edge'), source, target, properties ?? defaultEdgeProperties(pluginId, content, source, target))],
  };
}

export function reconnectEdge(content: PluginContent, pluginId: GraphPluginId, id: string, source: string, target: string): PluginContent {
  const edge = edgesOf(content).find(value => value.id === id);
  if (!edge) return content;
  if (edge.source === source && edge.target === target) return content;
  const defaults = defaultEdgeProperties(pluginId, content, source, target, id);
  const properties = { ...edge.properties };
  if (pluginId === 'erdesign') {
    const nodes = nodesOf(content);
    const referenced = (nodeId: string) => {
      const columns = records(nodes.find(node => node.id === nodeId)?.properties.columns);
      return columns.find(column => column.primary)?.name ?? columns[0]?.name ?? '';
    };
    if (edge.source !== source) properties.sourceField = properties.cardinality === 'many-to-one' ? defaults.sourceField : referenced(source);
    if (edge.target !== target) properties.targetField = properties.cardinality === 'many-to-one' ? referenced(target) : defaults.targetField;
  } else if (edge.source !== source) {
    if (defaults.branch !== undefined) properties.branch = defaults.branch;
    else delete properties.branch;
  }
  return {
    ...content,
    edges: (Array.isArray(content.edges) ? content.edges : []).map(value =>
      isRecord(value) && value.id === id ? { ...value, source, target, properties } : value),
  };
}

export const commonKinds: Record<GraphPluginId, string> = {
  logicdesign: 'assign', workflowdesign: 'task', erdesign: 'table',
  dataflowdesign: 'transform', dataquerydesign: 'filter', valueruledesign: 'predicate',
};

export function addNode(content: PluginContent, pluginId: GraphPluginId, kind = commonKinds[pluginId]): PluginContent {
  const nodes = nodesOf(content);
  const edges = edgesOf(content);
  const node = makeNode(pluginId, kind, uniqueId(content, kind), 40 + (nodes.length % 3) * 240, 260 + Math.floor(nodes.length / 3) * 140);
  if ((kind === 'table' && pluginId === 'erdesign') || ['source', 'sink'].includes(kind)) {
    const key = kind === 'table' ? 'tableName' : 'dataset';
    const prefix = kind === 'sink' ? 'result' : kind;
    const names = new Set(nodes.map(value => value.properties[key]));
    let suffix = 1;
    while (names.has(`${prefix}_${suffix}`)) suffix += 1;
    node.properties = defaultProperties(pluginId, kind, suffix);
  }
  let result: PluginContent = { ...content, nodes: [...(Array.isArray(content.nodes) ? content.nodes : []), node] };
  if (pluginId === 'valueruledesign') {
    const roots = nodes.filter(value => !edges.some(edge => edge.target === value.id));
    const root = roots.length === 1 ? roots[0] : undefined;
    if (root && ['all', 'any'].includes(root.kind)) {
      result = addEdge(result, pluginId, root.id, node.id);
    } else if (root && ['all', 'any', 'not'].includes(kind)) {
      return addEdge(result, pluginId, node.id, root.id);
    } else if (root) {
      const group = makeNode(pluginId, 'all', uniqueId(result, 'all'), Math.min(root.x, node.x) - 240, root.y);
      result = { ...result, nodes: [...(result.nodes as unknown[]), group] };
      result = addEdge(result, pluginId, group.id, root.id);
      return addEdge(result, pluginId, group.id, node.id);
    }
    if (['all', 'any', 'not'].includes(kind)) {
      const child = makeNode(pluginId, 'predicate', uniqueId(result, 'predicate'), node.x + 240, node.y);
      result = { ...result, nodes: [...(result.nodes as unknown[]), child] };
      result = addEdge(result, pluginId, node.id, child.id);
    }
  } else if (pluginId !== 'erdesign' && !['start', 'end', 'source', 'sink', 'table', 'select'].includes(kind)) {
    const terminal = pluginId === 'dataquerydesign' ? 'select' : pluginId === 'dataflowdesign' ? 'sink' : 'end';
    const link = edges.find(edge => nodes.find(value => value.id === edge.target)?.kind === terminal);
    if (link) {
      // Splitting a link retains its ID, branch semantics and extension metadata.
      result = updateEdge(result, link.id, { target: node.id });
      result = addEdge(result, pluginId, node.id, link.target);
      if (['condition', 'decision'].includes(kind)) result = addEdge(result, pluginId, node.id, link.target);
    }
  }
  return result;
}

export function addColumn(content: PluginContent, nodeId: string): PluginContent {
  const node = nodesOf(content).find(value => value.id === nodeId);
  const columns = Array.isArray(node?.properties.columns) ? node.properties.columns : [];
  let index = 1;
  while (columns.some(value => isRecord(value) && value.name === `field_${index}`)) index += 1;
  return updateNode(content, nodeId, { properties: { columns: [...columns, { name: `field_${index}`, type: 'VARCHAR', primary: false, nullable: true }] } });
}

export function updateColumn(content: PluginContent, nodeId: string, index: number, patch: PluginContent): PluginContent {
  const node = nodesOf(content).find(value => value.id === nodeId);
  if (!Array.isArray(node?.properties.columns) || !Number.isInteger(index) || index < 0 || index >= node.properties.columns.length) return content;
  const original = node.properties.columns[index];
  const columns = node.properties.columns.map((column, i) => {
    if (i === index) return { ...(isRecord(column) ? column : {}), ...patch, ...(patch.primary === true ? { nullable: false } : {}) };
    return isRecord(column) && patch.primary === true ? { ...column, primary: false } : column;
  });
  let result = updateNode(content, nodeId, { properties: { columns } });
  if (isRecord(original) && typeof original.name === 'string' && typeof patch.name === 'string' && patch.name !== original.name) {
    // Keep relationship references in sync, including both ends of self-relations.
    edgesOf(content).forEach(edge => {
      const properties: PluginContent = {};
      if (edge.source === nodeId && edge.properties.sourceField === original.name) properties.sourceField = patch.name;
      if (edge.target === nodeId && edge.properties.targetField === original.name) properties.targetField = patch.name;
      if (Object.keys(properties).length) result = updateEdge(result, edge.id, { properties });
    });
  }
  return result;
}

export function removeColumn(content: PluginContent, nodeId: string, index: number): PluginContent {
  const node = nodesOf(content).find(value => value.id === nodeId);
  if (!Array.isArray(node?.properties.columns) || !Number.isInteger(index) || index < 0 || index >= node.properties.columns.length) return content;
  const column = node.properties.columns[index];
  let result = updateNode(content, nodeId, { properties: { columns: node.properties.columns.filter((_, i) => i !== index) } });
  if (isRecord(column) && typeof column.name === 'string') {
    edgesOf(result).forEach(edge => {
      if ((edge.source === nodeId && edge.properties.sourceField === column.name) ||
          (edge.target === nodeId && edge.properties.targetField === column.name)) result = removeEdge(result, edge.id);
    });
  }
  return result;
}
