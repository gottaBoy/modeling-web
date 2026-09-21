import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import * as Vue from 'vue';
import { computed, createRenderer, createSSRApp, h, nextTick, ref, ssrContextKey } from 'vue';
import type { Component } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { compileScript, compileTemplate, parse } from 'vue/compiler-sfc';
import { transformWithEsbuild } from 'vite';
import * as echarts from 'echarts';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setLocale } from '../src/modeling-plugins/i18n';
import type { PluginContent } from '../src/modeling-plugins/types';
import { layoutDefinitions } from '../src/modeling-plugins/layout/definitions';
import { layoutMessages, layoutT } from '../src/modeling-plugins/layout/messages';
import {
  createLayoutContent, getLayoutSchema, layoutIds, layoutSchemas, readableContent,
} from '../src/modeling-plugins/layout/schema';
import type { LayoutContent, LayoutPluginId } from '../src/modeling-plugins/layout/schema';
import {
  addDataColumn, addDataRow, addLayoutItem, changeItemType, dataColumnReferences, descendants,
  moveDataRow, moveLayoutItem, propertyOptions, removeDataColumn, removeDataRow, removeLayoutItem,
  renameDataColumn, updateDataCell, updateLayoutItem, updateLayoutSettings,
} from '../src/modeling-plugins/layout/operations';
import {
  aggregateValue, buildChartOption, buildPortletOption, buildReport, buildReportOption,
  csvData, displayValue, formatNumber, hierarchyRows, rawValue,
} from '../src/modeling-plugins/layout/preview';
import {
  validDate, validLocalRoute, validateFormValues, validateLayout,
} from '../src/modeling-plugins/layout/validation';
import LayoutEditor from '../src/modeling-plugins/layout/LayoutEditor.vue';
import LayoutPreview from '../src/modeling-plugins/layout/LayoutPreview.vue';
import DatasetEditor from '../src/modeling-plugins/layout/DatasetEditor.vue';
import PropertyFields from '../src/modeling-plugins/layout/PropertyFields.vue';
import ViewBlock from '../src/modeling-plugins/layout/ViewBlock.vue';
import ChartPreview from '../src/modeling-plugins/layout/ChartPreview.vue';

// Vue's host renderer exercises real component updates without adding a DOM dependency.
// Browser layout, canvas pixels, and transport remain the external harness's responsibility.
class HostNode {
  parent: HostNode | null = null;
  children: HostNode[] = [];
  props: Record<string, any> = {};
  listeners: Record<string, ((event: any) => void)[]> = {};
  value: any = '';
  checked = false;
  selected = false;
  multiple = false;
  selectedIndex = -1;
  clientWidth = 0;
  clientHeight = 0;
  constructor(public tag: string, public text = '') {}
  get tagName() { return this.tag.toUpperCase(); }
  get type() { return this.props.type; }
  get options() { return this.children.filter(child => child.tag === 'option'); }
  addEventListener(name: string, handler: (event: any) => void) {
    (this.listeners[name] ||= []).push(handler);
  }
  removeEventListener(name: string, handler: (event: any) => void) {
    this.listeners[name] = (this.listeners[name] || []).filter(entry => entry !== handler);
  }
  setAttribute(key: string, value: unknown) { this.props[key] = value; }
}

function detach(node: HostNode) {
  if (node.parent) node.parent.children = node.parent.children.filter(child => child !== node);
  node.parent = null;
}
function insert(node: HostNode, parent: HostNode, anchor: HostNode | null = null) {
  detach(node);
  const index = anchor ? parent.children.indexOf(anchor) : -1;
  parent.children.splice(index < 0 ? parent.children.length : index, 0, node);
  node.parent = parent;
}
const renderer = createRenderer<HostNode, HostNode>({
  createElement: tag => new HostNode(tag),
  createText: text => new HostNode('#text', text),
  createComment: text => new HostNode('#comment', text),
  insert, remove: detach,
  setText: (node, text) => { node.text = text; },
  setElementText: (node, text) => { node.text = text; node.children = []; },
  parentNode: node => node.parent,
  nextSibling: node => node.parent?.children[node.parent.children.indexOf(node) + 1] || null,
  patchProp: (node, key, _previous, value) => {
    node.props[key] = value;
    if (['value', 'checked', 'selected', 'multiple', 'indeterminate'].includes(key)) {
      Object.assign(node, { [key]: value });
    }
  },
  insertStaticContent: (content, parent, anchor) => {
    const node = new HostNode('#static', content);
    insert(node, parent, anchor);
    return [node, node];
  },
});
const cleanups: (() => void)[] = [];

function mount(component: Component, props: Record<string, unknown>) {
  const root = new HostNode('root');
  const app = renderer.createApp({ render: () => h(component, props) });
  app.provide(ssrContextKey, {});
  app.mount(root);
  cleanups.push(() => app.unmount());
  return root;
}
function nodes(root: HostNode): HostNode[] {
  return [root, ...root.children.flatMap(nodes)];
}
function find(root: HostNode, predicate: (node: HostNode) => boolean): HostNode {
  const node = nodes(root).find(predicate);
  expect(node, 'Expected a rendered control').toBeDefined();
  return node!;
}
function byProp(root: HostNode, name: string, value: unknown) {
  return find(root, node => node.props[name] === value);
}
function text(root: HostNode): string {
  return [root.tag === '#comment' ? '' : root.text, ...root.children.map(text)].join('');
}
async function fire(node: HostNode, name: string, patch: Record<string, unknown> = {}) {
  Object.assign(node, patch);
  const event = { target: node, currentTarget: node, preventDefault() {}, stopPropagation() {} };
  node.listeners[name]?.forEach(handler => handler(event));
  const handler = node.props[`on${name[0].toUpperCase()}${name.slice(1)}`];
  if (Array.isArray(handler)) handler.forEach(callback => callback(event));
  else handler?.(event);
  await nextTick();
}
function previewInput(root: HostNode, id: string, tag = 'input') {
  return find(byProp(root, 'data-preview-item', id), node => node.tag === tag);
}
async function html(component: Component, props: Record<string, unknown>) {
  return renderToString(createSSRApp({ render: () => h(component, props) }));
}

beforeAll(async () => {
  // The node-only Vite config emits SSR SFCs. Add client render functions compiled
  // from the same templates for live updates, retaining their real setup functions.
  for (const [name, component] of Object.entries({ LayoutEditor, LayoutPreview, DatasetEditor, PropertyFields, ViewBlock, ChartPreview })) {
    const filename = fileURLToPath(new URL(`../src/modeling-plugins/layout/${name}.vue`, import.meta.url));
    const { descriptor } = parse(readFileSync(filename, 'utf8'), { filename });
    const script = compileScript(descriptor, { id: name });
    const result = compileTemplate({
      source: descriptor.template!.content, filename, id: name,
      compilerOptions: {
        mode: 'function', bindingMetadata: script.bindings, expressionPlugins: ['typescript'],
      },
    });
    expect(result.errors).toEqual([]);
    const { code } = await transformWithEsbuild(result.code, `${name}.ts`, { loader: 'ts' });
    component.render = new Function('Vue', code)(Vue);
  }
});

beforeEach(() => {
  const document = { documentElement: { lang: '' }, title: '', activeElement: null };
  vi.stubGlobal('document', document);
  vi.stubGlobal('window', {
    document, addEventListener: vi.fn(), removeEventListener: vi.fn(),
    location: new URL('http://localhost/modeling-plugins.html'),
    history: { state: null, replaceState: vi.fn() },
    localStorage: { setItem: vi.fn() },
  });
  setLocale('zh-CN');
});
afterEach(() => {
  cleanups.splice(0).reverse().forEach(cleanup => cleanup());
  setLocale('zh-CN');
  vi.unstubAllGlobals();
});

const domainCases: {
  id: LayoutPluginId; item: string; valid: Record<string, unknown>;
  invalid: Record<string, unknown>; path: string;
}[] = [
  { id: 'formdesign', item: 'project_budget', valid: { min: 1, max: 2000, defaultValue: 1999.5 }, invalid: { max: -1 }, path: 'items[2].max' },
  { id: 'griddesign', item: 'amount', valid: { field: 'cost', precision: 2, unit: ' USD' }, invalid: { field: 'name' }, path: 'items[2].field' },
  { id: 'toolbardesign', item: 'create', valid: { action: 'export', mode: 'icon' }, invalid: { action: 'remote' }, path: 'items[0].action' },
  { id: 'menudesign', item: 'projects', valid: { route: '/local/projects?status=1#list' }, invalid: { route: '/local/%2e%2e/admin' }, path: 'items[1].route' },
  { id: 'treeviewdesign', item: 'requirements', valid: { value: 'requirements_v2', parentId: 'product' }, invalid: { value: 'milestones' }, path: 'items[3].value' },
  { id: 'viewdesign', item: 'details', valid: { field: 'cost', span: 6 }, invalid: { parentId: 'header' }, path: 'items[2].parentId' },
  { id: 'mddesign', item: 'revenue', valid: { field: 'cost', unit: ' EUR' }, invalid: { field: 'status' }, path: 'items[3].field' },
  { id: 'dashboarddesign', item: 'revenue', valid: { field: 'cost', aggregate: 'avg', span: 12 }, invalid: { span: 13 }, path: 'items[0].span' },
  { id: 'chartdesign', item: 'revenue', valid: { yField: 'cost', aggregate: 'max' }, invalid: { yField: 'date' }, path: 'items[0].yField' },
  { id: 'bireportdesign', item: 'revenue', valid: { aggregate: 'avg', field: 'cost' }, invalid: { aggregate: 'median' }, path: 'items[1].aggregate' },
];

describe.each(domainCases)('$id local editor contract', ({ id, item, valid, invalid, path }) => {
  it('validates defaults, all palette additions, edits and non-destructive operations', () => {
    const original = createLayoutContent(id);
    const snapshot = JSON.stringify(original);
    expect(layoutDefinitions.find(definition => definition.id === id)!.validate(original)).toEqual([]);
    for (const entry of layoutSchemas[id].palette) {
      const added = addLayoutItem(id, original, entry.type);
      expect(added.items).toHaveLength(original.items.length + 1);
      expect(validateLayout(id, added)).toEqual([]);
      const key = added.items.at(-1)!.id;
      expect(moveLayoutItem(added, key, -1).items.map(entry => entry.id)).not.toEqual(added.items.map(entry => entry.id));
      expect(removeLayoutItem(added, key)).toEqual(original);
    }
    const changed = updateLayoutItem(original, item, valid);
    expect(validateLayout(id, changed)).toEqual([]);
    expect(changed.items.find(entry => entry.id === item)).toMatchObject(valid);
    expect(JSON.stringify(original)).toBe(snapshot);
    expect(validateLayout(id, validateLayout)).not.toEqual([]);
    expect(validateLayout(id, null)).not.toEqual([]);
    expect(validateLayout(id, updateLayoutItem(changed, item, invalid)).map(issue => issue.path)).toContain(path);
  });

  it('renders valid and invalid domain edits in both languages without translating data', async () => {
    const content = updateLayoutItem(createLayoutContent(id), item, { ...valid, label: '用户标题 Search' });
    const snapshot = JSON.stringify(content);
    for (const language of ['zh-CN', 'en'] as const) {
      setLocale(language);
      const rendered = await html(LayoutEditor, { pluginId: id, modelValue: content });
      expect(rendered).toContain(`data-preview-kind="${id}"`);
      expect(rendered).toContain(layoutT('校验通过'));
      expect(rendered).toContain('用户标题 Search');
      expect(rendered).toContain(layoutT('组件属性'));
      const broken = updateLayoutItem(content, item, invalid);
      const issues = validateLayout(id, broken);
      expect(issues.map(issue => issue.path)).toContain(path);
      expect(issues.every(issue => language !== 'en' || !/\p{Script=Han}/u.test(issue.message))).toBe(true);
      const invalidHtml = await html(LayoutEditor, { pluginId: id, modelValue: broken });
      expect(invalidHtml).toContain(layoutT('布局校验错误'));
      expect(invalidHtml).toContain(path);
      expect(await html(LayoutEditor, { pluginId: id, modelValue: { kind: id, items: [null], data: null } })).toContain(layoutT('暂无组件'));
    }
    expect(JSON.stringify(content)).toBe(snapshot);
  });

  it('switches a mounted editor, metadata, options and issues without model writes or remount', async () => {
    const model = updateLayoutItem(createLayoutContent(id), item, { ...invalid, label: '名称' });
    const original = JSON.stringify(model);
    const changes = vi.fn();
    const root = mount(LayoutEditor, { pluginId: id, modelValue: model, 'onUpdate:modelValue': changes });
    const editor = byProp(root, 'data-testid', 'plugin-editor');
    const preview = byProp(root, 'data-preview-kind', id);
    const property = byProp(root, 'data-testid', 'property-label');
    const schema = layoutSchemas[id];
    const title = computed(() => schema.title);
    const palette = schema.palette[0];
    const chineseTitle = title.value;
    const chinesePalette = palette.label;
    expect(text(root)).toContain('组件属性');
    setLocale('en');
    await nextTick();
    expect(byProp(root, 'data-testid', 'plugin-editor')).toBe(editor);
    expect(byProp(root, 'data-preview-kind', id)).toBe(preview);
    expect(byProp(root, 'data-testid', 'property-label')).toBe(property);
    expect(property.value).toBe(model.items[0].label);
    expect(text(root)).toContain('Component properties');
    expect(text(root)).toContain('Errors:');
    expect(title.value).toBe(layoutMessages[chineseTitle]);
    expect(palette.label).toBe(layoutMessages[chinesePalette]);
    expect(getLayoutSchema(id)).toBe(schema);
    setLocale('zh-CN');
    await nextTick();
    expect(title.value).toBe(chineseTitle);
    expect(changes).not.toHaveBeenCalled();
    expect(JSON.stringify(model)).toBe(original);
  });
});

describe('translation coverage and metadata boundaries', () => {
  it('has precisely the 10 layout IDs and covers every property, static option and capability', () => {
    expect(layoutDefinitions.map(definition => definition.id)).toEqual([...layoutIds]);
    const originalDefaults = layoutIds.map(createLayoutContent);
    const metadata = layoutDefinitions.map(definition => {
      const schema = layoutSchemas[definition.id as LayoutPluginId];
      const properties = [...schema.settings, ...schema.palette.flatMap(entry => entry.properties)];
      return {
        definition, schema, title: definition.title, itemLabel: schema.itemLabel,
        capabilities: definition.capabilities, palettes: schema.palette.map(entry => ({ entry, label: entry.label })),
        properties: properties.map(property => ({ property, label: property.label })),
        options: properties.flatMap(property => property.options || []).map(option => ({ option, label: option.label })),
      };
    });
    setLocale('en');
    for (const entry of metadata) {
      expect(entry.definition.title).toBe(layoutMessages[entry.title]);
      expect(entry.schema.itemLabel).toBe(layoutMessages[entry.itemLabel]);
      expect(entry.definition.capabilities).toEqual(entry.capabilities.map(key => layoutMessages[key]));
      for (const value of entry.palettes) expect(value.entry.label).toBe(layoutMessages[value.label]);
      for (const value of entry.properties) expect(value.property.label).toBe(layoutMessages[value.label]);
      for (const value of entry.options) expect(value.option.label).toBe(layoutMessages[value.label]);
    }
    expect(layoutIds.map(createLayoutContent)).toEqual(originalDefaults);
    expect(getLayoutSchema('__proto__')).toBeUndefined();
  });

  it('covers every Chinese UI literal outside persisted schema defaults', () => {
    const directory = fileURLToPath(new URL('../src/modeling-plugins/layout/', import.meta.url));
    for (const name of readdirSync(directory).filter(name => /\.(ts|vue)$/.test(name) && !['schema.ts', 'messages.ts'].includes(name))) {
      const source = readFileSync(`${directory}/${name}`, 'utf8');
      for (const match of source.matchAll(/'([^'\n]*\p{Script=Han}[^'\n]*)'/gu)) {
        expect(layoutMessages[match[1]], `${name}: ${match[1]}`).toBeDefined();
      }
    }
  });

  it('translates only the root option, not matching Chinese captions or field keys', () => {
    const content = createLayoutContent('viewdesign');
    content.items[1].label = '根级';
    content.data.columns[0].label = '名称';
    const fields = layoutSchemas.viewdesign.palette.find(entry => entry.type === 'form')!.properties;
    setLocale('en');
    expect(propertyOptions(fields.find(field => field.source === 'parents')!, content, content.items[2])).toEqual([
      { value: '', label: 'Root' }, { value: 'main', label: '根级' },
    ]);
    expect(propertyOptions(fields.find(field => field.key === 'field')!, content)[0]).toEqual({ value: 'name', label: '名称 (name)' });
  });

  it.each(layoutIds)('%s renders bilingual empty states', async id => {
    const content = createLayoutContent(id);
    content.items = [];
    for (const language of ['zh-CN', 'en'] as const) {
      setLocale(language);
      expect(await html(LayoutEditor, { pluginId: id, modelValue: content })).toContain(layoutT('暂无组件'));
    }
  });
});

describe('editing and validation regressions', () => {
  it('preserves compatible field settings and bindings on type changes', () => {
    const form = updateLayoutItem(createLayoutContent('formdesign'), 'project_name', {
      name: 'custom_field', placeholder: 'Name hint', defaultValue: 'User value', fullWidth: true, disabled: true,
    });
    const converted = changeItemType(form, 'project_name', 'textarea');
    expect(converted.items[0]).toMatchObject({
      id: 'project_name', type: 'textarea', name: 'custom_field', required: true,
      placeholder: 'Name hint', defaultValue: 'User value', fullWidth: true, disabled: true,
    });
    expect(validateLayout('formdesign', converted)).toEqual([]);
    expect(validateLayout('formdesign', changeItemType(form, 'project_name', 'date'))).toEqual([]);
    expect(validateLayout('formdesign', changeItemType(form, 'project_name', 'select'))).toEqual([]);
    const grid = updateLayoutItem(createLayoutContent('griddesign'), 'project', { width: 320, align: 'right' });
    const badge = changeItemType(grid, 'project', 'badge');
    expect(badge.items[0]).toMatchObject({ field: 'name', width: 320, align: 'right' });
    expect(validateLayout('griddesign', changeItemType(grid, 'project', 'number'))).toEqual([]);
  });

  it.each(['menudesign', 'treeviewdesign', 'viewdesign'] as const)('%s excludes descendants and reparents without losing children', id => {
    const content = createLayoutContent(id);
    const parent = content.items.find(item => layoutSchemas[id].parentTypes!.includes(item.type))!;
    const children = content.items.filter(item => item.parentId === parent.id);
    const property = layoutSchemas[id].palette[0].properties.find(property => property.source === 'parents')!;
    const excluded = descendants(content.items, parent.id);
    expect(propertyOptions(property, content, parent).some(option => excluded.has(option.value))).toBe(false);
    const cycle = updateLayoutItem(content, parent.id, { parentId: parent.id });
    expect(validateLayout(id, cycle).some(issue => issue.message === '父级引用形成循环')).toBe(true);
    expect(hierarchyRows(cycle.items)).toHaveLength(content.items.length);
    const removed = removeLayoutItem(content, parent.id);
    children.forEach(child => expect(removed.items.find(item => item.id === child.id)?.parentId).toBe(parent.parentId || ''));
    expect(validateLayout(id, removed)).toEqual([]);
    const leaf = layoutSchemas[id].palette.find(entry => !layoutSchemas[id].parentTypes!.includes(entry.type))!;
    const converted = changeItemType(content, parent.id, leaf.type);
    children.forEach(child => expect(converted.items.find(item => item.id === child.id)?.parentId).toBe(parent.parentId || ''));
    expect(validateLayout(id, converted)).toEqual([]);
  });

  it('rejects invalid settings, duplicate fields, invalid data and malformed imports', () => {
    for (const id of layoutIds) {
      const content = createLayoutContent(id);
      const setting = layoutSchemas[id].settings[0];
      expect(validateLayout(id, updateLayoutSettings(content, { [setting.key]: null })).map(issue => issue.path)).toContain(`settings.${setting.key}`);
      expect(validateLayout(id, { ...content, items: [...content.items, content.items[0]] }).some(issue => issue.message === '组件标识重复')).toBe(true);
      expect(validateLayout(id, updateDataCell(content, 0, 'date', '2026-02-30')).map(issue => issue.path)).toContain('data.rows[0].date');
      expect(validateLayout(id, updateDataCell(content, 0, 'amount', Infinity)).map(issue => issue.path)).toContain('data.rows[0].amount');
      expect(validateLayout(id, { ...content, data: { ...content.data, rows: [{ unknown: 1 }] } }).length).toBeGreaterThan(0);
      const malformed = { kind: 'wrong', settings: null, items: [null, { id: 42 }, { id: 'a', type: 'unknown' }], data: { columns: [null], rows: [null] } };
      const snapshot = JSON.stringify(malformed);
      expect(readableContent(id, malformed).items).toHaveLength(1);
      expect(validateLayout(id, malformed).length).toBeGreaterThan(0);
      expect(JSON.stringify(malformed)).toBe(snapshot);
    }
    const form = createLayoutContent('formdesign');
    expect(validateLayout('formdesign', updateLayoutItem(form, 'project_status', { name: 'name', options: ['x', 'x'] })).length).toBeGreaterThan(1);
    const report = createLayoutContent('bireportdesign');
    const grouped = addLayoutItem('bireportdesign', report, 'group');
    expect(validateLayout('bireportdesign', updateLayoutItem(grouped, grouped.items.at(-1)!.id, { field: 'region' })).some(issue => issue.message === '分组字段重复')).toBe(true);
  });

  it('validates dates and decoded local routes', () => {
    expect(validDate('2024-02-29')).toBe(true);
    for (const value of ['2026-02-29', '2026-04-31', '2026-1-01', 'invalid', null]) expect(validDate(value)).toBe(false);
    for (const route of ['/projects', '/projects?name=test#details', '/']) expect(validLocalRoute(route)).toBe(true);
    for (const route of ['https://example.test', '//external', '/a/../b', '/a/%2e%2e/b', '/%2fexternal', '/a/%5cb', '/bad%']) {
      expect(validLocalRoute(route), route).toBe(false);
    }
  });

  it('adds, edits, moves and removes typed data without removing referenced fields', () => {
    const original = createLayoutContent('chartdesign');
    expect(dataColumnReferences(original, 'region')).toContain('settings.xField');
    expect(dataColumnReferences(original, 'amount')).toContain('items[0].yField');
    expect(removeDataColumn(original, 'region')).toBe(original);
    for (const type of ['text', 'number', 'boolean', 'date'] as const) {
      const added = addDataColumn(original, type);
      const column = added.data.columns.at(-1)!;
      const renamed = renameDataColumn(added, column.key, '用户字段');
      const withRow = addDataRow(renamed);
      expect(validateLayout('chartdesign', withRow)).toEqual([]);
      expect(moveDataRow(withRow, 0, 1).data.rows[1]).toEqual(withRow.data.rows[0]);
      const removed = removeDataRow(withRow, withRow.data.rows.length - 1);
      expect(removeDataColumn(removed, column.key)).toEqual(original);
    }
    expect(updateDataCell(original, 0, '__proto__', 'bad')).toBe(original);
    expect(moveDataRow(original, 0, -1)).toBe(original);
  });
});

describe('preview formatting and ECharts', () => {
  it('formats dates, booleans and numbers using the locale and preserves explicit precision and raw values', () => {
    for (const language of ['zh-CN', 'en'] as const) {
      setLocale(language);
      expect(displayValue('2026-09-03', 'date')).toBe(new Intl.DateTimeFormat(language, {
        year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC',
      }).format(new Date('2026-09-03T00:00:00Z')));
      expect(displayValue('2026-09-03', 'text')).toBe('2026-09-03');
      expect(displayValue(12345.67)).toBe(new Intl.NumberFormat(language, { maximumFractionDigits: 20 }).format(12345.67));
      expect(formatNumber(12345.6, 3)).toBe(new Intl.NumberFormat(language, { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(12345.6));
      expect(displayValue(true)).toBe(layoutT('是'));
      expect(displayValue(false)).toBe(layoutT('否'));
      expect(rawValue(true)).toBe('true');
      expect(rawValue(12345.67)).toBe('12345.67');
      expect(displayValue(null)).toBe('');
    }
  });

  it('keeps CSV data locale-independent and escapes formulas and quotes', () => {
    const content = createLayoutContent('toolbardesign');
    content.data = {
      columns: [
        { key: 'text', label: '名称', type: 'text' }, { key: 'number', label: 'N', type: 'number' },
        { key: 'bool', label: 'B', type: 'boolean' }, { key: 'date', label: 'D', type: 'date' },
      ],
      rows: [{ text: '=SUM("A1")', number: 1234.5, bool: true, date: '2026-09-03' }],
    };
    const chineseCsv = csvData(content);
    setLocale('en');
    expect(csvData(content)).toBe(chineseCsv);
    expect(chineseCsv).toContain(`"'=SUM(""A1"")","1234.5","true","2026-09-03"`);
  });

  it('does not merge null, empty text, translated-looking user strings or typed values', () => {
    const content = createLayoutContent('chartdesign');
    content.data.rows = [null, '', '空值', 'Null', true, 'true', 1, '1'].map((value, index) => ({ region: value, amount: index + 1 }));
    const snapshot = JSON.stringify(content);
    for (const language of ['zh-CN', 'en'] as const) {
      setLocale(language);
      const option = buildChartOption(content) as any;
      expect(option.xAxis.data).toHaveLength(8);
      expect(option.xAxis.data.slice(0, 4)).toEqual([layoutT('空值'), layoutT('空文本'), '空值', 'Null']);
      expect(option.series[0].data).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(option.aria.label.description).toContain(language === 'en' ? 'Chart:' : '图表：');
    }
    expect(JSON.stringify(content)).toBe(snapshot);
  });

  it('aggregates numeric non-null values, sorts groups and computes weighted totals from source rows', () => {
    const rows = [{ n: 10 }, { n: 20 }, { n: null }, { n: '100' }, { n: Infinity }];
    expect(['sum', 'avg', 'count', 'min', 'max'].map(mode => aggregateValue(rows, 'n', mode))).toEqual([30, 15, 2, 10, 20]);
    expect(aggregateValue([], 'n', 'avg')).toBe(0);
    const content = createLayoutContent('bireportdesign');
    content.items[0].sort = 'desc';
    content.data.rows = [
      { region: 'A', amount: 10, cost: 10 }, { region: 'A', amount: 20, cost: 20 },
      { region: 'B', amount: 90, cost: 90 },
    ];
    const report = buildReport(content);
    expect(report.rows.map(row => row.groups)).toEqual([['B'], ['A']]);
    expect(report.rows.map(row => row.values)).toEqual([[90, 90], [30, 15]]);
    expect(report.totals).toEqual([120, 40]);
    content.items = content.items.filter(item => item.type !== 'group');
    setLocale('en');
    expect((buildReportOption(content) as any).xAxis.data).toEqual(['All']);
  });

  it.each(['bar', 'line', 'pie'])('renders %s with the installed ECharts engine and honors chart settings', chartType => {
    const content = updateLayoutSettings(createLayoutContent('chartdesign'), { chartType, stacked: true, orientation: 'horizontal', legend: false });
    const option = buildChartOption(content) as any;
    expect(option.series).toHaveLength(2);
    expect(option.series.every((series: any) => series.type === chartType)).toBe(true);
    expect(option.legend.show).toBe(false);
    if (chartType !== 'pie') {
      expect(option.yAxis.type).toBe('category');
      expect(option.series[0].stack).toBe('total');
    }
    const chart = echarts.init(null, undefined, { renderer: 'svg', ssr: true, width: 760, height: 400 });
    try {
      vi.stubGlobal('document', undefined);
      // SSR has no DOM for aria attributes; the generated aria metadata is tested above.
      chart.setOption({ ...option, aria: { enabled: false } });
      const svg = chart.renderToSVGString();
      expect(svg).toContain('<svg');
      expect(svg).toContain('<path');
      expect(svg.length).toBeGreaterThan(1000);
    } finally {
      chart.dispose();
    }
  });

  it('uses dashboard bindings, BI precision, user colors and visibility in generated options', () => {
    const dashboard = createLayoutContent('dashboarddesign');
    const portlet = { ...dashboard.items[2], xField: 'status', yField: 'cost', chartType: 'line', color: '#123456' };
    const option = buildPortletOption(dashboard, portlet) as any;
    expect(option.series[0].type).toBe('line');
    expect(option.series[0].itemStyle.color).toBe('#123456');
    expect(option.xAxis.data).toEqual(['进行中', '已完成', '待处理']);
    const report = createLayoutContent('bireportdesign');
    report.settings.precision = 4;
    expect((buildReportOption(report) as any).tooltip.valueFormatter(12.3)).toBe('12.3000');
    const chart = createLayoutContent('chartdesign');
    chart.items[0].visible = false;
    expect((buildChartOption(chart) as any).series.map((series: any) => series.id)).toEqual(['cost']);
  });
});

describe('live preview and editor interactions', () => {
  it('keeps form input and validation feedback through language switches without writing the model', async () => {
    const content = createLayoutContent('formdesign');
    const snapshot = JSON.stringify(content);
    const root = mount(LayoutEditor, { pluginId: content.kind, modelValue: content });
    const name = previewInput(root, 'project_name');
    await fire(name, 'input', { value: '用户输入' });
    const form = find(root, node => node.tag === 'form');
    await fire(form, 'submit');
    expect(text(root)).toContain('表单校验通过');
    setLocale('en');
    await nextTick();
    expect(previewInput(root, 'project_name')).toBe(name);
    expect(name.value).toBe('用户输入');
    expect(text(root)).toContain('Form validation passed');
    await fire(name, 'input', { value: '' });
    await fire(form, 'submit');
    expect(text(root)).toContain('项目名称: required');
    setLocale('zh-CN');
    await nextTick();
    expect(text(root)).toContain('项目名称：必填');
    await fire(form, 'reset');
    expect(name.value).toBe('协作平台');
    expect(text(root)).not.toContain('项目名称：必填');
    expect(JSON.stringify(content)).toBe(snapshot);
  });

  it('validates preview values for each form control and skips disabled fields', () => {
    const content = createLayoutContent('formdesign');
    const values = Object.fromEntries(content.items.map(item => [item.id, item.defaultValue]));
    expect(validateFormValues(content, values)).toEqual([]);
    values.project_budget = 1e9;
    values.project_date = '2026-02-30';
    values.project_status = 'missing';
    values.project_name = ' ';
    content.items.at(-1)!.required = true;
    values.project_notify = false;
    expect(validateFormValues(content, values).map(issue => issue.path)).toEqual([
      'project_name', 'project_status', 'project_budget', 'project_date', 'project_notify',
    ]);
    content.items.forEach(item => { item.disabled = true; });
    expect(validateFormValues(content, values)).toEqual([]);
  });

  it('executes toolbar create/edit/delete/reset and preserves working records and status on locale change', async () => {
    const content = createLayoutContent('toolbardesign');
    const snapshot = JSON.stringify(content);
    const root = mount(LayoutPreview, { content, selectedId: '' });
    await fire(byProp(root, 'data-preview-item', 'create'), 'click');
    expect(text(root)).toContain('已新增预览记录');
    const edited = byProp(root, 'aria-label', '编辑项目');
    await fire(edited, 'change', { value: 'Local draft' });
    setLocale('en');
    await nextTick();
    expect(text(root)).toContain('Preview record created');
    expect(byProp(root, 'aria-label', 'Edit 项目')).toBe(edited);
    expect(edited.value).toBe('Local draft');
    await fire(byProp(root, 'data-preview-item', 'delete'), 'click');
    expect(text(root)).toContain('Selected preview record deleted');
    await fire(byProp(root, 'data-preview-item', 'refresh'), 'click');
    expect(text(root)).toContain('Preview records reset');
    await fire(byProp(root, 'data-preview-item', 'edit'), 'click');
    expect(byProp(root, 'aria-label', 'Edit 项目').value).toBe('协作平台');
    expect(JSON.stringify(content)).toBe(snapshot);
  });

  it.each(['griddesign', 'mddesign'] as const)('%s preserves pagination, search and model data across locale changes', async id => {
    const content = updateLayoutSettings(createLayoutContent(id), { pageSize: 2 });
    const snapshot = JSON.stringify(content);
    const root = mount(LayoutPreview, { content, selectedId: '' });
    await fire(byProp(root, 'aria-label', '下一页'), 'click');
    expect(text(root)).toContain('2 / 3');
    setLocale('en');
    await nextTick();
    expect(text(root)).toContain('2 / 3');
    const search = byProp(root, 'aria-label', id === 'griddesign' ? 'Search grid' : 'Search collection');
    await fire(search, 'input', { value: '协作平台' });
    expect(text(root)).toContain('Records: 1');
    setLocale('zh-CN');
    await nextTick();
    expect(search.value).toBe('协作平台');
    expect(text(root)).toContain('1 条记录');
    expect(JSON.stringify(content)).toBe(snapshot);
  });

  it.each(['menudesign', 'treeviewdesign'] as const)('%s keeps expansion, selection and checked state', async id => {
    const content = createLayoutContent(id);
    const snapshot = JSON.stringify(content);
    const root = mount(LayoutPreview, { content, selectedId: '' });
    const parent = content.items[0];
    const firstChild = content.items.find(item => item.parentId === parent.id)!;
    if (id === 'treeviewdesign') await fire(byProp(root, 'aria-label', `勾选${parent.label}`), 'change', { checked: true });
    await fire(byProp(root, 'data-preview-item', parent.id), 'click');
    expect(nodes(root).some(node => node.props['data-preview-item'] === firstChild.id)).toBe(false);
    setLocale('en');
    await nextTick();
    expect(nodes(root).some(node => node.props['data-preview-item'] === firstChild.id)).toBe(false);
    if (id === 'treeviewdesign') expect(text(root)).toContain('Checked nodes: 3');
    await fire(byProp(root, 'data-preview-item', parent.id), 'click');
    expect(byProp(root, 'data-preview-item', firstChild.id)).toBeDefined();
    expect(JSON.stringify(content)).toBe(snapshot);
  });

  it('preserves data-tab state, raw input formats and nullable dates', async () => {
    const content = createLayoutContent('griddesign');
    const changes = vi.fn();
    const root = mount(LayoutEditor, { pluginId: content.kind, modelValue: content, 'onUpdate:modelValue': changes });
    await fire(find(root, node => node.props.role === 'tab' && text(node) === '数据'), 'click');
    const date = byProp(root, 'aria-label', '交付日期 第 1 行');
    const amount = byProp(root, 'aria-label', '收入 第 1 行');
    expect(date.value).toBe('2026-09-03');
    expect(amount.value).toBe('12800');
    setLocale('en');
    await nextTick();
    expect(byProp(root, 'aria-label', '交付日期, row 1')).toBe(date);
    expect(byProp(root, 'aria-label', '收入, row 1')).toBe(amount);
    expect(changes).not.toHaveBeenCalled();
    await fire(date, 'change', { value: '' });
    const updated = changes.mock.calls[0][0] as LayoutContent;
    expect(updated.data.rows[0].date).toBeNull();
    expect(validateLayout('griddesign', updated)).toEqual([]);
    const dataset = await html(DatasetEditor, { content: { ...content, data: { columns: [], rows: [] } } });
    expect(dataset).toContain('No fields');
  });

  it('edits options, preserves user values, and repairs a removed default without locale writes', async () => {
    const content = createLayoutContent('formdesign');
    const selected = content.items[1];
    const changes = vi.fn();
    const fields = layoutSchemas.formdesign.palette.find(entry => entry.type === 'select')!.properties;
    const root = mount(PropertyFields, { fields, values: selected, content, selected, onChange: changes });
    setLocale('en');
    await nextTick();
    expect(changes).not.toHaveBeenCalled();
    expect(byProp(root, 'aria-label', 'Option 1').value).toBe('待处理');
    await fire(byProp(root, 'aria-label', 'Add option'), 'click');
    expect(changes.mock.calls[0][0].options).toEqual(['待处理', '进行中', '已完成', 'Option 4']);
    const remove = nodes(root).filter(node => node.props['aria-label'] === 'Delete option')[1];
    await fire(remove, 'click');
    expect(changes.mock.calls[1][0]).toEqual({ options: ['待处理', '已完成'], defaultValue: '待处理' });
  });

  it('renders model edits through the real editor event contract', async () => {
    const model = ref(createLayoutContent('dashboarddesign'));
    const root = mount({ render: () => h(LayoutEditor, {
      pluginId: model.value.kind, modelValue: model.value,
      'onUpdate:modelValue': (value: PluginContent) => { model.value = value as LayoutContent; },
    }) }, {});
    await fire(byProp(root, 'data-testid', 'property-label'), 'change', { value: 'Custom metric' });
    expect(model.value.items[0].label).toBe('Custom metric');
    expect(text(byProp(root, 'data-preview-item', 'revenue'))).toContain('Custom metric');
    const snapshot = JSON.stringify(model.value);
    setLocale('en');
    await nextTick();
    expect(JSON.stringify(model.value)).toBe(snapshot);
  });

  it.each(['griddesign', 'mddesign', 'chartdesign', 'bireportdesign', 'dashboarddesign'] as const)('%s renders localized data/visibility empty states', async id => {
    const content = createLayoutContent(id);
    content.data.rows = [];
    setLocale('en');
    expect(await html(LayoutPreview, { content, selectedId: '' })).toContain('No records');
    if (['griddesign', 'mddesign', 'chartdesign'].includes(id)) {
      content.items.forEach(item => { item.visible = false; });
      expect(await html(LayoutPreview, { content, selectedId: '' })).toContain(id === 'chartdesign' ? 'No visible series' : 'No visible fields');
    }
  });
});
