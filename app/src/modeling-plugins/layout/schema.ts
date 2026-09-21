import type { PluginContent } from '../types';
import { layoutT } from './messages';

export const layoutIds = [
  'formdesign',
  'griddesign',
  'toolbardesign',
  'menudesign',
  'treeviewdesign',
  'viewdesign',
  'mddesign',
  'dashboarddesign',
  'chartdesign',
  'bireportdesign',
] as const;

export type LayoutPluginId = (typeof layoutIds)[number];
export type DataType = 'text' | 'number' | 'date' | 'boolean';
export interface DataColumn {
  key: string;
  label: string;
  type: DataType;
}
export interface LayoutData {
  columns: DataColumn[];
  rows: Record<string, unknown>[];
}
export interface LayoutItem extends Record<string, unknown> {
  id: string;
  type: string;
  label: string;
}
export interface LayoutContent extends PluginContent {
  kind: LayoutPluginId;
  title: string;
  settings: Record<string, unknown>;
  items: LayoutItem[];
  data: LayoutData;
}
export interface PropertyOption {
  value: string;
  label: string;
}
export interface PropertySchema {
  key: string;
  label: string;
  control: 'text' | 'number' | 'boolean' | 'select' | 'color' | 'options';
  default: unknown;
  required?: boolean;
  min?: number;
  max?: number;
  integer?: boolean;
  options?: PropertyOption[];
  source?: 'fields' | 'numericFields' | 'dateFields' | 'parents';
}
export interface PaletteItem {
  type: string;
  label: string;
  icon: string;
  properties: PropertySchema[];
}
export interface LayoutSchema {
  id: LayoutPluginId;
  title: string;
  itemLabel: string;
  icon: string;
  dataEnabled: boolean;
  parentTypes?: string[];
  settings: PropertySchema[];
  palette: PaletteItem[];
}

const option = (value: string, label: string): PropertyOption => ({ value, label });
const text = (key: string, label: string, value = '', required = false): PropertySchema => ({
  key, label, control: 'text', default: value, required,
});
const number = (key: string, label: string, value: number, min: number, max: number): PropertySchema => ({
  key, label, control: 'number', default: value, min, max, integer: true,
});
const toggle = (key: string, label: string, value = false): PropertySchema => ({
  key, label, control: 'boolean', default: value,
});
const select = (key: string, label: string, value: string, options: PropertyOption[]): PropertySchema => ({
  key, label, control: 'select', default: value, options,
});
const binding = (key = 'field', label = '数据字段', numeric = false): PropertySchema => ({
  key, label, control: 'select', default: numeric ? 'amount' : 'name',
  source: numeric ? 'numericFields' : 'fields', required: true,
});
const parent: PropertySchema = {
  key: 'parentId', label: '父级', control: 'select', default: '', source: 'parents',
};
const color = (value = '#2878c7'): PropertySchema => ({
  key: 'color', label: '颜色', control: 'color', default: value,
});
const label = text('label', '名称', '新组件', true);
const aggregate = select('aggregate', '汇总方式', 'sum', [
  option('sum', '求和'), option('avg', '平均值'), option('count', '计数'),
  option('min', '最小值'), option('max', '最大值'),
]);
const chartType = select('chartType', '图表类型', 'bar', [
  option('bar', '柱状图'), option('line', '折线图'), option('pie', '环形图'),
]);
const align = select('align', '对齐', 'left', [
  option('left', '左对齐'), option('center', '居中'), option('right', '右对齐'),
]);
const span = number('span', '宽度 / 12', 6, 1, 12);
const icons = [
  option('file-text-o', '文档'), option('folder-o', '目录'), option('home', '首页'),
  option('tasks', '任务'), option('users', '成员'), option('bar-chart', '图表'),
  option('plus', '新建'), option('pencil', '编辑'), option('trash', '删除'),
  option('refresh', '刷新'), option('download', '下载'), option('check', '确认'),
  option('cog', '设置'), option('search', '搜索'),
];
const icon = select('icon', '图标', 'file-text-o', icons);
const fieldBase = [
  label, text('name', '字段标识', 'field', true), toggle('required', '必填'),
  toggle('disabled', '禁用'), toggle('fullWidth', '整行显示'),
];
const gridBase = [
  label, binding(), number('width', '列宽', 160, 64, 800), align,
  toggle('sortable', '允许排序', true), toggle('visible', '显示', true),
];
const viewBase = [label, parent, span];
const mdBase = [label, binding(), toggle('visible', '显示', true)];
const dashboardBase = [
  label, span, number('height', '高度', 240, 120, 800),
];

const defaultSchemas: Record<LayoutPluginId, LayoutSchema> = {
  formdesign: {
    id: 'formdesign', title: '标准表单设计器', itemLabel: '字段', icon: 'wpforms',
    dataEnabled: false,
    settings: [
      number('columns', '表单列数', 2, 1, 3),
      select('labelPosition', '标签位置', 'top', [option('top', '顶部'), option('left', '左侧')]),
      select('density', '间距', 'comfortable', [option('comfortable', '常规'), option('compact', '紧凑')]),
    ],
    palette: [
      { type: 'text', label: '单行文本', icon: 'font', properties: [...fieldBase, text('placeholder', '占位文字', '请输入'), text('defaultValue', '默认值')] },
      { type: 'textarea', label: '多行文本', icon: 'align-left', properties: [...fieldBase, text('placeholder', '占位文字', '请输入说明'), text('defaultValue', '默认值'), number('rows', '行数', 3, 2, 12)] },
      { type: 'number', label: '数值', icon: 'hashtag', properties: [...fieldBase, { ...number('defaultValue', '默认值', 0, -1e12, 1e12), integer: false }, { ...number('min', '最小值', 0, -1e12, 1e12), integer: false }, { ...number('max', '最大值', 100000, -1e12, 1e12), integer: false }] },
      { type: 'date', label: '日期', icon: 'calendar', properties: [...fieldBase, text('defaultValue', '默认日期', '2026-09-01')] },
      { type: 'select', label: '下拉选择', icon: 'list', properties: [...fieldBase, { key: 'options', label: '选项', control: 'options', default: ['待处理', '进行中', '已完成'] }, text('defaultValue', '默认值', '待处理')] },
      { type: 'checkbox', label: '复选框', icon: 'check-square-o', properties: [...fieldBase, toggle('defaultValue', '默认选中')] },
    ],
  },
  griddesign: {
    id: 'griddesign', title: '标准表格设计器', itemLabel: '列', icon: 'table',
    dataEnabled: true,
    settings: [
      toggle('striped', '斑马纹', true), toggle('selection', '行选择', true),
      number('pageSize', '每页行数', 5, 1, 100), toggle('showSummary', '数值汇总', true),
    ],
    palette: [
      { type: 'text', label: '文本列', icon: 'font', properties: gridBase },
      { type: 'number', label: '数值列', icon: 'hashtag', properties: [...gridBase.filter(p => p.key !== 'field'), binding('field', '数据字段', true), number('precision', '小数位数', 0, 0, 6), text('unit', '单位', '元')] },
      { type: 'badge', label: '状态列', icon: 'tag', properties: [...gridBase, color('#18856b')] },
      { type: 'date', label: '日期列', icon: 'calendar', properties: [...gridBase.filter(p => p.key !== 'field'), { ...binding(), source: 'dateFields', default: 'date' }] },
    ],
  },
  toolbardesign: {
    id: 'toolbardesign', title: '标准工具栏设计器', itemLabel: '操作', icon: 'wrench',
    dataEnabled: false,
    settings: [
      select('align', '排列', 'left', [option('left', '左对齐'), option('right', '右对齐')]),
      select('mode', '按钮模式', 'both', [option('both', '图标和文字'), option('icon', '仅图标'), option('text', '仅文字')]),
      toggle('vertical', '垂直排列'),
    ],
    palette: [
      { type: 'action', label: '操作按钮', icon: 'mouse-pointer', properties: [
        label, icon,
        select('action', '本地操作', 'create', [option('create', '新建记录'), option('edit', '编辑所选'), option('delete', '删除所选'), option('refresh', '重置记录'), option('export', '导出 CSV')]),
        select('variant', '样式', 'default', [option('default', '默认'), option('primary', '主要'), option('danger', '危险')]),
        toggle('disabled', '禁用'),
      ] },
      { type: 'separator', label: '分隔线', icon: 'ellipsis-v', properties: [label] },
    ],
  },
  menudesign: {
    id: 'menudesign', title: '标准应用菜单设计器', itemLabel: '菜单', icon: 'bars',
    dataEnabled: false, parentTypes: ['group'],
    settings: [
      select('direction', '导航方向', 'vertical', [option('vertical', '纵向'), option('horizontal', '横向')]),
      toggle('showIcons', '显示图标', true),
    ],
    palette: [
      { type: 'group', label: '菜单分组', icon: 'folder-o', properties: [label, parent, { ...icon, default: 'folder-o' }] },
      { type: 'item', label: '菜单项', icon: 'file-text-o', properties: [label, parent, icon, text('route', '本地路由', '/workspace', true), toggle('disabled', '禁用')] },
    ],
  },
  treeviewdesign: {
    id: 'treeviewdesign', title: '标准树部件设计器', itemLabel: '节点', icon: 'sitemap',
    dataEnabled: false, parentTypes: ['folder'],
    settings: [toggle('checkable', '显示复选框', true), toggle('defaultExpanded', '默认展开', true), toggle('showIcons', '显示图标', true)],
    palette: [
      { type: 'folder', label: '目录节点', icon: 'folder-o', properties: [label, parent, { ...icon, default: 'folder-o' }] },
      { type: 'node', label: '数据节点', icon: 'file-text-o', properties: [label, parent, icon, text('value', '节点值', 'record', true), toggle('disabled', '禁用')] },
    ],
  },
  viewdesign: {
    id: 'viewdesign', title: '标准视图设计器', itemLabel: '部件', icon: 'columns',
    dataEnabled: true, parentTypes: ['container'],
    settings: [
      select('layout', '布局', 'grid', [option('grid', '栅格'), option('stack', '纵向')]),
      number('gap', '部件间距', 16, 0, 48),
    ],
    palette: [
      { type: 'container', label: '容器', icon: 'square-o', properties: [...viewBase, select('direction', '内部排列', 'grid', [option('grid', '栅格'), option('stack', '纵向')])] },
      { type: 'heading', label: '文本', icon: 'header', properties: [...viewBase, text('text', '内容', '项目工作台'), select('level', '文字级别', 'heading', [option('heading', '标题'), option('body', '正文')])] },
      { type: 'form', label: '表单部件', icon: 'wpforms', properties: [...viewBase, binding(), toggle('readonly', '只读')] },
      { type: 'grid', label: '表格部件', icon: 'table', properties: [...viewBase, number('limit', '展示行数', 4, 1, 20)] },
    ],
  },
  mddesign: {
    id: 'mddesign', title: '标准多数据部件设计器', itemLabel: '展示字段', icon: 'th-large',
    dataEnabled: true,
    settings: [
      select('mode', '展示模式', 'card', [option('card', '卡片'), option('list', '列表')]),
      number('columns', '卡片列数', 2, 1, 4), number('pageSize', '每页条数', 6, 1, 100),
    ],
    palette: [
      { type: 'title', label: '标题字段', icon: 'header', properties: mdBase },
      { type: 'text', label: '文本字段', icon: 'font', properties: mdBase },
      { type: 'badge', label: '状态标签', icon: 'tag', properties: [...mdBase, color('#18856b')] },
      { type: 'number', label: '数值字段', icon: 'hashtag', properties: [...mdBase.filter(p => p.key !== 'field'), binding('field', '数据字段', true), text('unit', '单位', '元')] },
    ],
  },
  dashboarddesign: {
    id: 'dashboarddesign', title: '标准看板设计器', itemLabel: '看板部件', icon: 'tachometer',
    dataEnabled: true,
    settings: [number('gap', '部件间距', 16, 0, 48), toggle('showTitle', '显示标题', true)],
    palette: [
      { type: 'metric', label: '指标', icon: 'hashtag', properties: [...dashboardBase, binding('field', '指标字段', true), aggregate, text('unit', '单位', '元'), color('#18856b')] },
      { type: 'chart', label: '图表', icon: 'bar-chart', properties: [...dashboardBase, binding('xField', '分组字段'), binding('yField', '指标字段', true), chartType, aggregate, color()] },
      { type: 'list', label: '数据列表', icon: 'list', properties: [...dashboardBase, binding(), number('limit', '记录数', 5, 1, 20)] },
    ],
  },
  chartdesign: {
    id: 'chartdesign', title: '标准图表设计器', itemLabel: '系列', icon: 'bar-chart',
    dataEnabled: true,
    settings: [
      chartType, binding('xField', '分类字段'), toggle('legend', '图例', true),
      toggle('stacked', '堆叠'), select('orientation', '方向', 'vertical', [option('vertical', '纵向'), option('horizontal', '横向')]),
    ],
    palette: [
      { type: 'series', label: '数据系列', icon: 'line-chart', properties: [label, binding('yField', '数值字段', true), aggregate, color(), toggle('visible', '显示', true)] },
    ],
  },
  bireportdesign: {
    id: 'bireportdesign', title: '标准智能报表设计器', itemLabel: '报表字段', icon: 'area-chart',
    dataEnabled: true,
    settings: [chartType, toggle('showTable', '显示明细', true), toggle('showTotals', '显示合计', true), number('precision', '小数位数', 2, 0, 6)],
    palette: [
      { type: 'measure', label: '度量', icon: 'hashtag', properties: [label, binding('field', '度量字段', true), aggregate, color()] },
      { type: 'group', label: '分组', icon: 'object-group', properties: [label, binding(), select('sort', '分组排序', 'asc', [option('asc', '升序'), option('desc', '降序')])] },
    ],
  },
};

function translatedLabel<T extends { label: string }>(value: T): T {
  return { ...value, get label() { return layoutT(value.label); } };
}

function translatedProperty(property: PropertySchema): PropertySchema {
  const translated = translatedLabel(property);
  if (property.options) translated.options = property.options.map(translatedLabel);
  return translated;
}

// Metadata is reactive; defaults remain locale-independent persisted model data.
export const layoutSchemas = Object.fromEntries(layoutIds.map(id => {
  const schema = defaultSchemas[id];
  return [id, {
    ...schema,
    get title() { return layoutT(schema.title); },
    get itemLabel() { return layoutT(schema.itemLabel); },
    settings: schema.settings.map(translatedProperty),
    palette: schema.palette.map(entry => ({
      ...entry,
      get label() { return layoutT(entry.label); },
      properties: entry.properties.map(translatedProperty),
    })),
  }];
})) as Record<LayoutPluginId, LayoutSchema>;

export const seriesColors = ['#2878c7', '#18856b', '#d15a73', '#8d6ac8', '#ac7d1b', '#317c87'];

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function cloneValue<T>(value: T): T {
  if (Array.isArray(value)) return value.map(entry => cloneValue(entry)) as T;
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneValue(entry)])) as T;
  }
  return value;
}

export function getLayoutSchema(id: string): LayoutSchema | undefined {
  return Object.prototype.hasOwnProperty.call(layoutSchemas, id)
    ? layoutSchemas[id as LayoutPluginId] : undefined;
}

export function propertyDefaults(properties: PropertySchema[]): Record<string, unknown> {
  return Object.fromEntries(properties.map(property => [property.key, cloneValue(property.default)]));
}

export function sampleData(): LayoutData {
  return {
    columns: [
      { key: 'name', label: '项目', type: 'text' },
      { key: 'region', label: '区域', type: 'text' },
      { key: 'status', label: '状态', type: 'text' },
      { key: 'amount', label: '收入', type: 'number' },
      { key: 'cost', label: '成本', type: 'number' },
      { key: 'date', label: '交付日期', type: 'date' },
    ],
    rows: [
      { name: '协作平台', region: '华东', status: '进行中', amount: 12800, cost: 7600, date: '2026-09-03' },
      { name: '研发门户', region: '华北', status: '已完成', amount: 9600, cost: 5200, date: '2026-09-06' },
      { name: '质量管理', region: '华东', status: '待处理', amount: 6800, cost: 3100, date: '2026-09-10' },
      { name: '客户工作台', region: '华南', status: '进行中', amount: 15400, cost: 8800, date: '2026-09-12' },
      { name: '供应商门户', region: '华北', status: '进行中', amount: 8200, cost: 4600, date: '2026-09-15' },
      { name: '数据中心', region: '华南', status: '已完成', amount: 18600, cost: 9900, date: '2026-09-18' },
    ],
  };
}

function seed(schema: LayoutSchema, id: string, type: string, values: Record<string, unknown>): LayoutItem {
  const palette = schema.palette.find(entry => entry.type === type)!;
  return { ...propertyDefaults(palette.properties), id, type, label: palette.label, ...values };
}

export function createLayoutContent(id: LayoutPluginId): LayoutContent {
  const schema = defaultSchemas[id];
  const content: LayoutContent = {
    kind: id, title: schema.title.replace('标准', ''),
    settings: propertyDefaults(schema.settings), items: [], data: sampleData(),
  };
  const item = (key: string, type: string, values: Record<string, unknown>) => seed(schema, key, type, values);
  switch (id) {
    case 'formdesign':
      content.title = '项目登记';
      content.items = [
        item('project_name', 'text', { label: '项目名称', name: 'name', required: true, defaultValue: '协作平台' }),
        item('project_status', 'select', { label: '项目状态', name: 'status', defaultValue: '进行中' }),
        item('project_budget', 'number', { label: '预算', name: 'budget', defaultValue: 12800 }),
        item('project_date', 'date', { label: '计划交付', name: 'date' }),
        item('project_notes', 'textarea', { label: '说明', name: 'notes', fullWidth: true, defaultValue: '研发协作与项目跟踪' }),
        item('project_notify', 'checkbox', { label: '接收项目通知', name: 'notify', defaultValue: true }),
      ];
      break;
    case 'griddesign':
      content.title = '项目台账';
      content.items = [
        item('project', 'text', { label: '项目', field: 'name', width: 200 }),
        item('status', 'badge', { label: '状态', field: 'status', width: 120 }),
        item('amount', 'number', { label: '收入', field: 'amount', align: 'right' }),
        item('delivery', 'date', { label: '交付日期', field: 'date' }),
      ];
      break;
    case 'toolbardesign':
      content.title = '项目操作';
      content.items = [
        item('create', 'action', { label: '新建', icon: 'plus', action: 'create', variant: 'primary' }),
        item('edit', 'action', { label: '编辑', icon: 'pencil', action: 'edit' }),
        item('delete', 'action', { label: '删除', icon: 'trash', action: 'delete', variant: 'danger' }),
        item('divider', 'separator', { label: '分隔线' }),
        item('refresh', 'action', { label: '刷新', icon: 'refresh', action: 'refresh' }),
        item('export', 'action', { label: '导出', icon: 'download', action: 'export' }),
      ];
      break;
    case 'menudesign':
      content.title = '研发导航';
      content.items = [
        item('workspace', 'group', { label: '工作空间', icon: 'home' }),
        item('projects', 'item', { label: '项目', parentId: 'workspace', route: '/projects', icon: 'tasks' }),
        item('members', 'item', { label: '成员', parentId: 'workspace', route: '/members', icon: 'users' }),
        item('analysis', 'group', { label: '分析', icon: 'bar-chart' }),
        item('reports', 'item', { label: '报表', parentId: 'analysis', route: '/reports', icon: 'bar-chart' }),
      ];
      break;
    case 'treeviewdesign':
      content.title = '项目结构';
      content.items = [
        item('product', 'folder', { label: '协作平台' }),
        item('planning', 'folder', { label: '计划', parentId: 'product' }),
        item('requirements', 'node', { label: '需求清单', parentId: 'planning', value: 'requirements' }),
        item('milestones', 'node', { label: '里程碑', parentId: 'planning', value: 'milestones' }),
        item('delivery', 'node', { label: '交付记录', parentId: 'product', value: 'delivery' }),
      ];
      break;
    case 'viewdesign':
      content.title = '项目工作台';
      content.items = [
        item('header', 'heading', { label: '标题', text: '项目工作台', span: 12 }),
        item('main', 'container', { label: '项目概览', span: 12 }),
        item('details', 'form', { label: '项目资料', parentId: 'main', span: 4 }),
        item('projects', 'grid', { label: '项目列表', parentId: 'main', span: 8 }),
      ];
      break;
    case 'mddesign':
      content.title = '项目集合';
      content.items = [
        item('name', 'title', { label: '项目', field: 'name' }),
        item('status', 'badge', { label: '状态', field: 'status' }),
        item('region', 'text', { label: '区域', field: 'region' }),
        item('revenue', 'number', { label: '收入', field: 'amount' }),
      ];
      break;
    case 'dashboarddesign':
      content.title = '经营看板';
      content.items = [
        item('revenue', 'metric', { label: '总收入', span: 6, height: 140, field: 'amount' }),
        item('cost', 'metric', { label: '总成本', span: 6, height: 140, field: 'cost', color: '#2878c7' }),
        item('regional', 'chart', { label: '区域收入', span: 8, height: 300, xField: 'region', yField: 'amount' }),
        item('projects', 'list', { label: '交付项目', span: 4, height: 300, field: 'name' }),
      ];
      break;
    case 'chartdesign':
      content.title = '区域收入与成本';
      content.settings.xField = 'region';
      content.items = [
        item('revenue', 'series', { label: '收入', yField: 'amount', color: seriesColors[0] }),
        item('cost', 'series', { label: '成本', yField: 'cost', color: seriesColors[1] }),
      ];
      break;
    case 'bireportdesign':
      content.title = '区域经营报表';
      content.items = [
        item('region', 'group', { label: '区域', field: 'region' }),
        item('revenue', 'measure', { label: '收入合计', field: 'amount', aggregate: 'sum', color: seriesColors[0] }),
        item('average_cost', 'measure', { label: '平均成本', field: 'cost', aggregate: 'avg', color: seriesColors[1] }),
      ];
      break;
  }
  return content;
}

// Invalid imports remain visible to validation; rendering never mutates or saves repairs.
export function readableContent(id: LayoutPluginId, value: PluginContent): LayoutContent {
  const fallback = createLayoutContent(id);
  const root = isRecord(value) ? value : {};
  const data = isRecord(root.data) ? root.data : {};
  return {
    ...root,
    kind: id,
    title: typeof root.title === 'string' ? root.title : fallback.title,
    settings: { ...fallback.settings, ...(isRecord(root.settings) ? root.settings : {}) },
    items: Array.isArray(root.items)
      ? root.items.filter(isRecord).filter(entry => typeof entry.id === 'string' && typeof entry.type === 'string') as LayoutItem[]
      : [],
    data: {
      ...data,
      columns: Array.isArray(data.columns)
        ? data.columns.filter(isRecord).filter(entry => typeof entry.key === 'string') as unknown as DataColumn[] : [],
      rows: Array.isArray(data.rows) ? data.rows.filter(isRecord) : [],
    },
  };
}
