import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, createRenderer, createSSRApp, h, nextTick, shallowRef } from 'vue';
import * as Vue from 'vue';
import { renderToString } from 'vue/server-renderer';
import { compileScript, parse } from 'vue/compiler-sfc';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
import * as i18n from '../src/modeling-plugins/i18n';
import * as graphModel from '../src/modeling-plugins/graph/model';
import * as graphValidation from '../src/modeling-plugins/graph/validation';
import * as graphSemantics from '../src/modeling-plugins/graph/semantics';
import * as graphMessages from '../src/modeling-plugins/graph/messages';
import { setLocale } from '../src/modeling-plugins/i18n';
import type { PluginContent } from '../src/modeling-plugins/types';
import {
  addColumn, addEdge, addNode, columnTypes, createGraph, edgesOf, graphPluginIds, makeEdge,
  makeNode, moveNode, nodesOf, operators, palettes, propertyFields, reconnectEdge,
  records, removeColumn, removeEdge, removeNode, titles, updateColumn, updateEdge, updateNode,
  type GraphPluginId,
} from '../src/modeling-plugins/graph/model';
import { graphDefinitions } from '../src/modeling-plugins/graph/definitions';
import { graphT, messages } from '../src/modeling-plugins/graph/messages';
import { connectionIssue, validateGraph } from '../src/modeling-plugins/graph/validation';
import {
  compileER, compileQuery, evaluatePredicate, evaluateRules, fieldValue, runDataflow, semanticPreview,
} from '../src/modeling-plugins/graph/semantics';
import GraphEditor from '../src/modeling-plugins/graph/GraphEditor.vue';

// The Vue component is real; only the DOM-dependent X6 surface is replaced.
// These tests do not establish browser rendering, SVG geometry, or pointer behavior.
const x6 = vi.hoisted(() => {
  class Cell {
    attributes: Record<string, unknown> = {};
    labels: unknown;
    constructor(readonly type: string, readonly data: Record<string, any>) {
      this.labels = data.labels;
      this.attributes['label/text'] = data.attrs?.label?.text;
    }
    get id(): string { return this.data.id; }
    attr(path: string, value: unknown) { this.attributes[path] = value; }
    setLabels(value: unknown) { this.labels = value; }
    position() { return { x: this.data.x, y: this.data.y }; }
    getSourceCellId() { return this.data.source?.cell; }
    getTargetCellId() { return this.data.target?.cell; }
  }
  class Graph {
    static instances: Graph[] = [];
    cells: Cell[] = [];
    handlers = new Map<string, (value: any) => void>();
    resets = 0;
    scale = 1;
    disposed = false;
    centered?: Cell;
    constructor() { Graph.instances.push(this); }
    createNode(data: Record<string, any>) { return new Cell('node', data); }
    createEdge(data: Record<string, any>) { return new Cell('edge', data); }
    resetCells(cells: Cell[]) { this.cells = cells; this.resets += 1; }
    getNodes() { return this.cells.filter(cell => cell.type === 'node'); }
    getEdges() { return this.cells.filter(cell => cell.type === 'edge'); }
    getCellById(id: string) { return this.cells.find(cell => cell.id === id); }
    centerCell(cell: Cell) {
      if (!(cell instanceof Cell)) throw new TypeError('centerCell requires a Cell');
      this.centered = cell;
    }
    zoom(amount = 0) { this.scale += amount; return this.scale; }
    zoomToFit() { this.scale = 1; }
    on(event: string, handler: (value: any) => void) { this.handlers.set(event, handler); }
    resize() {}
    dispose() { this.disposed = true; }
  }
  return { Graph };
});
vi.mock('@antv/x6', () => ({ Graph: x6.Graph }));

// Vite's Node transform produces SSR-only components. Compile the same SFC source
// with Vue's client compiler for lifecycle/reactivity tests in the custom host.
const clientModules = new Map<string, { exports: Record<string, any> }>();
function clientComponent(name: string): any {
  const cached = clientModules.get(name);
  if (cached) return cached.exports.default;
  const filename = new URL(`../src/modeling-plugins/graph/${name}`, import.meta.url);
  const { descriptor, errors } = parse(readFileSync(filename, 'utf8'), { filename: filename.pathname });
  if (errors.length) throw errors[0];
  const script = compileScript(descriptor, { id: name, inlineTemplate: true });
  const compiled = ts.transpileModule(script.content, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  const module = { exports: {} };
  clientModules.set(name, module);
  const imports: Record<string, unknown> = {
    vue: Vue, '@antv/x6': x6, '../i18n': i18n,
    './model': graphModel, './validation': graphValidation,
    './semantics': graphSemantics, './messages': graphMessages,
  };
  const require = (id: string) => {
    if (id.endsWith('.css')) return {};
    if (id.endsWith('.vue')) return { __esModule: true, default: clientComponent(id.slice(2)) };
    if (id in imports) return imports[id];
    throw new Error(`Unexpected component dependency: ${id}`);
  };
  new Function('require', 'module', 'exports', compiled.outputText)(require, module, module.exports);
  return (module.exports as Record<string, any>).default;
}

class Element {
  parent: Element | null = null;
  children: Element[] = [];
  props: Record<string, any> = {};
  listeners = new Map<string, ((event: any) => void)[]>();
  text = '';
  value: unknown = '';
  _value: unknown;
  selected = false;
  selectedIndex = -1;
  multiple = false;
  clientWidth = 800;
  clientHeight = 470;
  constructor(readonly tag: string) {}
  get options(): Element[] { return this.children.filter(child => child.tag === 'option'); }
  addEventListener(event: string, listener: (event: any) => void) {
    this.listeners.set(event, [...this.listeners.get(event) ?? [], listener]);
  }
  removeEventListener() {}
  setAttribute(key: string, value: unknown) { this.props[key] = value; }
}
function detach(node: Element) {
  if (node.parent) node.parent.children = node.parent.children.filter(child => child !== node);
  node.parent = null;
}
function insert(node: Element, parent: Element, anchor?: Element | null) {
  detach(node);
  const index = anchor ? parent.children.indexOf(anchor) : -1;
  parent.children.splice(index < 0 ? parent.children.length : index, 0, node);
  node.parent = parent;
}
const renderer = createRenderer<Element, Element>({
  createElement: tag => new Element(tag),
  createText: text => Object.assign(new Element('#text'), { text }),
  createComment: text => Object.assign(new Element('#comment'), { text }),
  setText: (node, text) => { node.text = text; },
  setElementText: (node, text) => {
    node.children.forEach(child => { child.parent = null; });
    node.children = [];
    node.text = text;
  },
  parentNode: node => node.parent,
  nextSibling: node => node.parent?.children[node.parent.children.indexOf(node) + 1] ?? null,
  insert,
  remove: detach,
  patchProp: (node, key, _previous, value) => {
    node.props[key] = value;
    if (key === 'value') { node.value = value; node._value = value; }
  },
  setScopeId: () => {},
  insertStaticContent: (content, parent, anchor) => {
    const node = Object.assign(new Element('#static'), { text: content });
    insert(node, parent, anchor);
    return [node, node];
  },
});
const all = (node: Element): Element[] => [node, ...node.children.flatMap(all)];
const textOf = (node: Element): string => node.tag === '#comment' ? '' : node.text + node.children.map(textOf).join('');
const settle = async () => { await nextTick(); await nextTick(); };
const cleanup: (() => void)[] = [];

async function mountEditor(pluginId: GraphPluginId, content: PluginContent = createGraph(pluginId)) {
  const root = new Element('root');
  const model = shallowRef<PluginContent>(content);
  const emitted: PluginContent[] = [];
  const app = renderer.createApp({
    setup: () => () => h(clientComponent('GraphEditor.vue'), {
      pluginId, modelValue: model.value,
      'onUpdate:modelValue': (value: PluginContent) => { emitted.push(value); model.value = value; },
    }),
  });
  app.mount(root);
  cleanup.push(() => app.unmount());
  await settle();
  const find = (testId: string) => {
    const element = all(root).find(node => node.props['data-testid'] === testId);
    if (!element) throw new Error(`Element not found: ${testId}`);
    return element;
  };
  const click = async (testId: string) => { find(testId).props.onClick?.({}); await settle(); };
  const change = async (testId: string, value: unknown) => {
    const element = find(testId);
    element.value = value;
    element.props.onChange?.({ target: element });
    await settle();
  };
  const graph = x6.Graph.instances[x6.Graph.instances.length - 1];
  return { root, model, emitted, find, click, change, graph };
}

beforeEach(() => { setLocale('zh-CN'); });
afterEach(async () => {
  cleanup.splice(0).forEach(unmount => unmount());
  setLocale('zh-CN');
  await settle();
  x6.Graph.instances = [];
});

describe('live bilingual graph metadata and server-safe semantics', () => {
  it('uses real English translations and covers every built-in Chinese string', () => {
    for (const [key, english] of Object.entries(messages)) {
      expect(english, key).not.toMatch(/\p{Script=Han}/u);
      expect(english.trim(), key).not.toBe('');
      expect(english, key).not.toBe(key);
      expect([...key.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort(), key)
        .toEqual([...english.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort());
    }
    for (const file of ['model.ts', 'definitions.ts', 'validation.ts', 'semantics.ts', 'GraphEditor.vue', 'PropertyFields.vue', 'SemanticPreview.vue']) {
      const source = readFileSync(new URL(`../src/modeling-plugins/graph/${file}`, import.meta.url), 'utf8');
      for (const match of source.matchAll(/'([^'\n]*\p{Script=Han}[^'\n]*)'/gu)) {
        expect(messages, `${file}: ${match[1]}`).toHaveProperty(match[1]);
      }
    }
  });

  it.each(graphPluginIds)('%s retains captured palette/field metadata across language changes', pluginId => {
    expect(typeof window).toBe('undefined');
    const definition = graphDefinitions.find(item => item.id === pluginId)!;
    const entries = palettes[pluginId];
    const fields = entries.flatMap(entry => propertyFields(pluginId, entry.kind));
    const chinese = [definition.title, ...definition.capabilities, ...entries.map(entry => entry.label), ...fields.map(field => field.label)];
    const model = definition.create();
    const before = JSON.stringify(model);
    const live = computed(() => [titles[pluginId], ...entries.map(entry => entry.label), ...fields.map(field => field.label)]);
    const oldLive = live.value;
    setLocale('en-US');
    const english = [definition.title, ...definition.capabilities, ...entries.map(entry => entry.label), ...fields.map(field => field.label)];
    expect(english).not.toEqual(chinese);
    expect(english.join(' ')).not.toMatch(/\p{Script=Han}/u);
    expect(live.value).not.toEqual(oldLive);
    fields.forEach(field => field.options?.forEach(option => expect(option.label).not.toMatch(/\p{Script=Han}/u)));
    expect(JSON.stringify(model)).toBe(before);
    expect(definition.validate(model)).toEqual([]);
    setLocale('zh-CN');
    expect([definition.title, ...definition.capabilities, ...entries.map(entry => entry.label), ...fields.map(field => field.label)]).toEqual(chinese);
    expect(live.value).toEqual(oldLive);
  });

  it.each(graphPluginIds)('%s localizes invalid semantics without changing paths or model data', pluginId => {
    const model = createGraph(pluginId);
    model.nodes[0].label = '';
    const snapshot = JSON.stringify(model);
    const chinese = validateGraph(pluginId, model);
    const preview = computed(() => semanticPreview(pluginId, model));
    expect(chinese.length).toBeGreaterThan(0);
    expect(preview.value.ok).toBe(false);
    setLocale('en');
    const english = validateGraph(pluginId, model);
    expect(english.map(issue => issue.path)).toEqual(chinese.map(issue => issue.path));
    expect(english.map(issue => issue.message).join(' ')).not.toMatch(/\p{Script=Han}/u);
    expect(english).not.toEqual(chinese);
    expect(preview.value.issues).toEqual(english);
    expect(JSON.stringify(model)).toBe(snapshot);
  });

  it('localizes early structural errors, connection errors, and thrown model errors', () => {
    setLocale('en');
    expect(validateGraph('unknown', {})).toEqual([{ path: 'pluginId', message: 'Unsupported graph model type' }]);
    expect(validateGraph('logicdesign', null as unknown as PluginContent)[0].message).toBe('The graph model must be an object');
    expect(validateGraph('logicdesign', {}).map(issue => issue.message)).toEqual(['Nodes must be an array', 'Edges must be an array']);
    expect(connectionIssue('logicdesign', createGraph('logicdesign'), 'missing', 'end_3')).toBe('Both edge endpoints must be existing nodes');
    expect(() => makeNode('logicdesign', 'unknown-kind', 'x')).toThrow('Unsupported node type: unknown-kind');
    expect(evaluateRules(createGraph('valueruledesign'), null as unknown as PluginContent).issues[0].message).toBe('Rule input must be an object');
  });
});

describe('plugin-specific valid and invalid semantics', () => {
  it.each(graphPluginIds)('%s has valid defaults and a valid common add operation', pluginId => {
    const model = createGraph(pluginId);
    const before = JSON.stringify(model);
    expect(validateGraph(pluginId, model)).toEqual([]);
    expect(semanticPreview(pluginId, model).ok).toBe(true);
    const added = addNode(model, pluginId);
    expect(nodesOf(added).length).toBeGreaterThan(model.nodes.length);
    expect(validateGraph(pluginId, added)).toEqual([]);
    expect(semanticPreview(pluginId, added).ok).toBe(true);
    expect(JSON.stringify(model)).toBe(before);
  });

  it('logicdesign compiles structured assignment, action, and both branch outcomes', () => {
    let model: PluginContent = addNode(createGraph('logicdesign'), 'logicdesign', 'condition');
    model = addNode(model, 'logicdesign', 'action');
    const result = semanticPreview('logicdesign', model);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const plan = result.value as PluginContent;
    expect(plan.kind).toBe('logic-plan');
    const branch = records(plan.steps).find(step => step.operation === 'condition')!;
    expect(records(branch.next).map(next => next.when).sort()).toEqual([false, true]);
    expect(records(plan.steps).find(step => step.operation === 'action')?.configuration).toEqual({ action: 'notify', input: 'request', output: 'result' });
    const falseEdge = edgesOf(model).find(edge => edge.properties.branch === 'false')!;
    expect(semanticPreview('logicdesign', removeEdge(model, falseEdge.id)).ok).toBe(false);
    expect(validateGraph('logicdesign', updateNode(model, 'assign_2', { properties: { valueType: 'number', value: 'wrong' } })))
      .toContainEqual({ path: 'nodes[1].properties.value', message: graphT('值与声明类型不一致，数字必须为有限值') });
    expect(semanticPreview('logicdesign', updateNode(model, 'assign_2', { properties: { target: '__proto__.polluted' } })).ok).toBe(false);
  });

  it('workflowdesign retains task, approval and gateway configuration and rejects invalid tasks', () => {
    let model: PluginContent = addNode(createGraph('workflowdesign'), 'workflowdesign', 'task');
    model = addNode(model, 'workflowdesign', 'decision');
    model = updateNode(model, 'approval_2', { properties: { assignee: 'reviewers', dueHours: 12.5, approvalMode: 'any' } });
    const result = semanticPreview('workflowdesign', model);
    expect(result.ok).toBe(true);
    if (result.ok) {
      const plan = result.value as PluginContent;
      expect(plan.kind).toBe('workflow-plan');
      expect(plan.entry).toBe('start_1');
      expect(plan.exits).toEqual(['end_3']);
      expect(records(plan.steps).find(step => step.id === 'approval_2')?.configuration).toEqual({ assignee: 'reviewers', dueHours: 12.5, approvalMode: 'any' });
    }
    for (const patch of [{ assignee: '' }, { dueHours: 0 }, { dueHours: Infinity }, { approvalMode: 'unsupported' }]) {
      expect(semanticPreview('workflowdesign', updateNode(model, 'approval_2', { properties: patch })).ok).toBe(false);
    }
    expect(semanticPreview('workflowdesign', removeEdge(model, 'edge_1')).ok).toBe(false);
  });

  it('erdesign compiles all supported cardinalities and rejects incompatible references', () => {
    const model = createGraph('erdesign');
    const result = compileER(model);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.ddl).toContain('ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id")');
    const one = compileER(updateEdge(model, 'edge_1', { properties: { cardinality: 'one-to-one', id: 'untrusted', source: 'untrusted' } }));
    expect(one.ok).toBe(true);
    if (one.ok) {
      expect(one.value.ddl).toContain('ADD UNIQUE ("customer_id")');
      expect(records(one.value.relations)[0]).toMatchObject({ id: 'edge_1', source: 'table_1' });
    }
    const reverse = updateEdge(model, 'edge_1', {
      source: 'table_2', target: 'table_1',
      properties: { cardinality: 'many-to-one', sourceField: 'customer_id', targetField: 'id' },
    });
    expect(compileER(reverse).ok).toBe(true);
    expect(compileER(updateColumn(model, 'table_2', 2, { type: 'TEXT' })).ok).toBe(false);
    expect(compileER(updateEdge(model, 'edge_1', { properties: { sourceField: 'name', targetField: 'name' } })).ok).toBe(false);
    expect(compileER(updateColumn(model, 'table_1', 1, { name: 'id' })).ok).toBe(false);
  });

  it('dataquerydesign binds values, escapes LIKE wildcards and preserves sort order', () => {
    let model: PluginContent = addNode(createGraph('dataquerydesign'), 'dataquerydesign', 'sort');
    model = updateNode(model, 'filter_2', { properties: { operator: 'contains', value: "50%_!'; DROP TABLE orders; --" } });
    model = updateNode(model, 'sort_1', { properties: { field: 'id', direction: 'desc' } });
    model = updateNode(model, 'select_3', { properties: { columns: ['id', 'name'], distinct: true, limit: 42 } });
    const result = compileQuery(model);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.sql).toBe('SELECT DISTINCT "id", "name"\nFROM "orders"\nWHERE "status" LIKE $1 ESCAPE \'!\'\nORDER BY "id" DESC\nLIMIT $2;');
      expect(result.value.parameters).toEqual(["%50!%!_!!'; DROP TABLE orders; --%", 42]);
      expect(result.value.sql).not.toContain('DROP');
    }
    const nullQuery = compileQuery(updateNode(model, 'filter_2', { properties: { operator: 'isNull' } }));
    expect(nullQuery.ok).toBe(true);
    if (nullQuery.ok) {
      expect(nullQuery.value.sql).toContain('"status" IS NULL');
      expect(nullQuery.value.parameters).toEqual([42]);
    }
    for (const patch of [{ columns: [] }, { columns: ['id', 'id'] }, { limit: 0 }, { limit: 10001 }, { distinct: 'true' }]) {
      expect(compileQuery(updateNode(model, 'select_3', { properties: patch })).ok).toBe(false);
    }
    expect(compileQuery(updateNode(model, 'sort_1', { properties: { field: 'id;drop' } })).ok).toBe(false);
    expect(compileQuery(addEdge(model, 'dataquerydesign', 'sort_1', 'filter_2')).ok).toBe(false);
  });

  it('dataflowdesign runs set, filter, rename and pick without mutating input rows', () => {
    let model: PluginContent = addNode(createGraph('dataflowdesign'), 'dataflowdesign', 'filter');
    model = addNode(model, 'dataflowdesign', 'transform');
    model = updateNode(model, 'transform_1', { properties: { operation: 'rename', sourceField: 'name', targetField: 'title' } });
    model = addNode(model, 'dataflowdesign', 'transform');
    model = updateNode(model, 'transform_3', { properties: { operation: 'pick', fields: ['id', 'title', 'processed'] } });
    const before = JSON.stringify(model);
    const result = runDataflow(model);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.outputs[0].rows).toEqual([{ id: 1, title: '示例订单', processed: true }]);
    expect(JSON.stringify(model)).toBe(before);
    expect(runDataflow(updateNode(model, 'transform_2', { properties: { operation: 'invalid' } })).ok).toBe(false);
    const missing = updateNode(model, 'transform_3', { properties: { fields: ['missing'] } });
    expect(validateGraph('dataflowdesign', missing)).toEqual([]);
    setLocale('en');
    expect(runDataflow(missing).issues[0].message).toBe('A field to keep does not exist in the input data');
    const collision = updateNode(model, 'transform_1', { properties: { targetField: 'id' } });
    expect(runDataflow(collision).issues[0].message).toBe('The original field is missing or the target field already exists');
    expect(runDataflow(addEdge(model, 'dataflowdesign', 'filter_1', 'transform_2')).ok).toBe(false);
  });

  it('dataflowdesign supports multiple independent sources, outputs and unique dataset defaults', () => {
    let model: PluginContent = addNode(createGraph('dataflowdesign'), 'dataflowdesign', 'source');
    model = addNode(model, 'dataflowdesign', 'sink');
    model = addEdge(model, 'dataflowdesign', 'source_2', 'sink_1');
    const sources = nodesOf(model).filter(node => node.kind === 'source');
    expect(new Set(sources.map(node => node.properties.dataset)).size).toBe(2);
    expect(nodesOf(model).find(node => node.id === 'sink_1')?.properties.dataset).toBe('result_2');
    const result = runDataflow(model);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.outputs).toHaveLength(2);
  });

  it('valueruledesign evaluates all/any/not, missing values and typed predicates', () => {
    const model = createGraph('valueruledesign');
    expect(evaluateRules(model, { age: 24, status: 'active' })).toMatchObject({ ok: true, value: { passed: true } });
    expect(evaluateRules(model, { age: '24', status: 'active' })).toMatchObject({ ok: true, value: { passed: false } });
    expect(evaluateRules(model, { age: 17, status: 'active' })).toMatchObject({ ok: true, value: { passed: false } });
    const any = updateNode(model, 'all_1', { kind: 'any' });
    expect(evaluateRules(any, { age: 17, status: 'active' })).toMatchObject({ ok: true, value: { passed: true } });
    const leaf = makeNode('valueruledesign', 'predicate', 'leaf');
    const not = addNode({ nodes: [leaf], edges: [] }, 'valueruledesign', 'not');
    expect(evaluateRules(not, { status: 'closed' })).toMatchObject({ ok: true, value: { passed: true } });
    expect(evaluateRules(not, { status: 'active' })).toMatchObject({ ok: true, value: { passed: false } });
    expect(validateGraph('valueruledesign', addEdge(not, 'valueruledesign', 'not_1', 'leaf')).length).toBeGreaterThan(0);
    expect(validateGraph('valueruledesign', updateNode(model, 'predicate_2', { properties: { message: {} } })).length).toBeGreaterThan(0);
    const nested = { field: 'user.age', operator: 'gte', valueType: 'number', value: 18 };
    expect(evaluatePredicate(nested, { user: { age: 18 } })).toBe(true);
    expect(evaluatePredicate(nested, { user: { age: '18' } })).toBe(false);
    expect(evaluatePredicate({ ...nested, operator: 'ne' }, {})).toBe(false);
    expect(evaluatePredicate({ ...nested, operator: 'isNull' }, {})).toBe(true);
    expect(evaluatePredicate({ ...nested, operator: 'notNull' }, { user: { age: null } })).toBe(false);
    expect(fieldValue({ user: Object.create({ age: 24 }) }, 'user.age')).toBeUndefined();
    expect(fieldValue({}, '__proto__.polluted')).toBeUndefined();
  });
});

describe('graph editing integrity', () => {
  it('reconnects branches without resetting unchanged semantics or extension metadata', () => {
    let model = addNode(createGraph('logicdesign'), 'logicdesign', 'condition');
    const edge = edgesOf(model).find(item => item.properties.branch === 'true')!;
    model = updateEdge(model, edge.id, { label: '成立', extension: { keep: true }, vertices: [{ x: 25, y: 35 }], properties: { custom: '条件' } });
    expect(reconnectEdge(model, 'logicdesign', edge.id, edge.source, edge.target)).toBe(model);
    model = addNode(model, 'logicdesign', 'action');
    const action = nodesOf(model).find(node => node.kind === 'action')!;
    const reconnected = reconnectEdge(model, 'logicdesign', edge.id, edge.source, action.id);
    expect(edgesOf(reconnected).find(item => item.id === edge.id)).toMatchObject({
      label: '成立', extension: { keep: true }, vertices: [{ x: 25, y: 35 }], properties: { branch: 'true', custom: '条件' },
    });
    expect(edgesOf(reconnectEdge(reconnected, 'logicdesign', edge.id, action.id, 'end_3')).find(item => item.id === edge.id)?.properties)
      .toEqual({ custom: '条件' });
  });

  it('preserves ER cardinality and fields when only the other endpoint changes', () => {
    let model = updateEdge(createGraph('erdesign'), 'edge_1', { properties: { cardinality: 'one-to-one', custom: '主键' } });
    expect(reconnectEdge(model, 'erdesign', 'edge_1', 'table_1', 'table_2')).toBe(model);
    model = addNode(model, 'erdesign');
    model = updateColumn(model, 'table_3', 0, { name: 'customer_key' });
    const result = reconnectEdge(model, 'erdesign', 'edge_1', 'table_3', 'table_2');
    expect(edgesOf(result)[0].properties).toEqual({ cardinality: 'one-to-one', sourceField: 'customer_key', targetField: 'customer_id', custom: '主键' });
    expect(compileER(result).ok).toBe(true);
  });

  it('renames ER references, removes relations for deleted columns and ignores stale indices', () => {
    const original = createGraph('erdesign');
    let model = updateColumn(original, 'table_1', 0, { name: 'customer_key' });
    expect(edgesOf(model)[0].properties.sourceField).toBe('customer_key');
    model = updateColumn(model, 'table_2', 2, { name: 'owner_id' });
    expect(edgesOf(model)[0].properties.targetField).toBe('owner_id');
    expect(compileER(model).ok).toBe(true);
    expect(updateColumn(model, 'table_1', 99, { primary: true })).toBe(model);
    expect(removeColumn(model, 'table_1', -1)).toBe(model);
    const deleted = removeColumn(model, 'table_2', 2);
    expect(edgesOf(deleted)).toEqual([]);
    expect(compileER(deleted).ok).toBe(true);
    expect(original.edges[0].properties.sourceField).toBe('id');
    expect(records(nodesOf(addColumn(model, 'table_1'))[0].properties.columns)).toHaveLength(3);
  });

  it.each(['all', 'any', 'not', 'predicate'])('adds %s to a single predicate root without leaving disconnected rules', kind => {
    const content = { nodes: [makeNode('valueruledesign', 'predicate', 'leaf')], edges: [], sample: { status: 'active' } };
    const result = addNode(content, 'valueruledesign', kind);
    expect(validateGraph('valueruledesign', result)).toEqual([]);
    expect(evaluateRules(result, { status: 'active' }).ok).toBe(true);
    expect(content.nodes).toHaveLength(1);
  });

  it.each(['all', 'any', 'not'])('creates an evaluable %s group in an empty rule model', kind => {
    const model = addNode({ nodes: [], edges: [] }, 'valueruledesign', kind);
    expect(validateGraph('valueruledesign', model)).toEqual([]);
  });

  it('preserves unknown and malformed imported data through scoped mutations', () => {
    const model = createGraph('logicdesign');
    const imported: PluginContent = {
      ...model, extension: { untranslated: '排序' },
      nodes: [...model.nodes, null], edges: [...model.edges, 'unknown-edge'],
    };
    const moved = moveNode(imported, 'assign_2', 110.5, 200.75);
    expect(nodesOf(moved).find(node => node.id === 'assign_2')).toMatchObject({ x: 110.5, y: 200.75 });
    expect((moved.nodes as unknown[]).at(-1)).toBeNull();
    expect((moved.edges as unknown[]).at(-1)).toBe('unknown-edge');
    expect(moved.extension).toBe(imported.extension);
    expect(moveNode(moved, 'assign_2', NaN, 0)).toBe(moved);
    const deleted = removeNode(moved, 'assign_2');
    expect(edgesOf(deleted)).toEqual([]);
    expect(deleted.edges).toEqual(['unknown-edge']);
    expect(model.nodes[1].x).toBe(280);
    expect(columnTypes).toContain('INTEGER');
    expect(operators.map(operator => operator.value)).toContain('isNull');
  });
});

describe('Vue SSR and mounted custom-renderer locale harness', () => {
  it.each(graphPluginIds)('%s renders English UI and preview in SSR without browser globals', async pluginId => {
    setLocale('en');
    const content = createGraph(pluginId);
    const before = JSON.stringify(content);
    const html = await renderToString(createSSRApp(GraphEditor, { pluginId, modelValue: content }));
    expect(html).toContain('Graph validation');
    expect(html).toContain('Raw semantic output');
    expect(html).not.toMatch(/\p{Script=Han}/u);
    expect(JSON.stringify(content)).toBe(before);
    expect(x6.Graph.instances).toHaveLength(0);
  });

  it.each(graphPluginIds)('%s switches both ways without remounting cells, selection, or unsaved model', async pluginId => {
    const view = await mountEditor(pluginId);
    const node = nodesOf(view.model.value)[1];
    await view.click(`node-row-${node.id}`);
    await view.change('node-label', '开始');
    view.model.value = updateNode(view.model.value, node.id, { properties: { custom: '排序' }, extension: { note: '条件' } });
    await settle();
    const original = view.model.value;
    const snapshot = JSON.stringify(original);
    const emissions = view.emitted.length;
    const cells = [...view.graph.cells];
    const resets = view.graph.resets;
    view.graph.scale = 1.4;
    setLocale('en');
    await settle();
    expect(view.find('node-label').props['aria-label']).toBe('Node label');
    expect(view.find('node-label').value).toBe('开始');
    expect(view.find(`node-row-${node.id}`).props['aria-pressed']).toBe(true);
    expect(textOf(view.find('add-item'))).toMatch(/^Add /);
    expect(view.model.value).toBe(original);
    expect(JSON.stringify(view.model.value)).toBe(snapshot);
    expect(view.emitted).toHaveLength(emissions);
    expect(view.graph.resets).toBe(resets);
    expect(view.graph.cells.every((cell, index) => cell === cells[index])).toBe(true);
    expect(view.graph.scale).toBe(1.4);
    if (pluginId !== 'erdesign') expect(view.graph.getCellById(node.id)?.attributes['label/text'])
      .toBe(`开始\n${palettes[pluginId].find(entry => entry.kind === node.kind)?.label}`);
    setLocale('zh-CN');
    await settle();
    expect(view.find('node-label').props['aria-label']).toBe('节点名称');
    expect(view.find(`node-row-${node.id}`).props['aria-pressed']).toBe(true);
    expect(view.model.value).toBe(original);
    expect(view.graph.resets).toBe(resets);
  });

  it.each(graphPluginIds)('%s exposes translated properties and errors for every palette operation', async pluginId => {
    setLocale('en');
    const view = await mountEditor(pluginId);
    for (const entry of palettes[pluginId]) {
      await view.click(`add-node-${entry.kind}`);
      expect(view.graph.centered).toBeDefined();
      expect(textOf(view.root)).not.toMatch(/\p{Script=Han}/u);
      for (const element of all(view.root)) {
        for (const name of ['aria-label', 'title']) expect(String(element.props[name] ?? '')).not.toMatch(/\p{Script=Han}/u);
      }
    }
  });

  it('keeps edge selection and user labels while translating canvas branch suffixes', async () => {
    const content = addNode(createGraph('logicdesign'), 'logicdesign', 'condition');
    const edge = edgesOf(content).find(item => item.properties.branch === 'true')!;
    const view = await mountEditor('logicdesign', updateEdge(content, edge.id, { label: '成立' }) as ReturnType<typeof createGraph>);
    view.graph.handlers.get('edge:click')!({ edge: view.graph.getCellById(edge.id) });
    await settle();
    const resets = view.graph.resets;
    setLocale('en');
    await settle();
    expect(view.find(`edge-row-${edge.id}`).props['aria-pressed']).toBe(true);
    expect(view.find('edge-label').value).toBe('成立');
    expect(view.find('property-branch').value).toBe('true');
    expect(view.graph.getCellById(edge.id)?.labels).toMatchObject([{ attrs: { label: { text: '成立 / True' } } }]);
    expect(view.graph.resets).toBe(resets);
  });

  it('retains invalid JSON drafts and re-localizes their errors without committing', async () => {
    const view = await mountEditor('dataflowdesign');
    await view.click('node-row-source_1');
    await view.change('property-records', '[{"name":"未完成"');
    const textarea = view.find('property-records');
    const original = view.model.value;
    const emissions = view.emitted.length;
    expect(textOf(view.root)).toContain('样例数据不是有效的JSON');
    setLocale('en');
    await settle();
    expect(view.find('property-records')).toBe(textarea);
    expect(textarea.value).toBe('[{"name":"未完成"');
    expect(textOf(view.root)).toContain('Sample records are not valid JSON');
    expect(view.model.value).toBe(original);
    expect(view.emitted).toHaveLength(emissions);
    setLocale('zh-CN');
    await settle();
    expect(textOf(view.root)).toContain('样例数据不是有效的JSON');
    await view.change('property-records', '[{"name":"保存"}]');
    expect(nodesOf(view.model.value)[0].properties.records).toEqual([{ name: '保存' }]);
  });

  it('does not translate ER column option labels that happen to match built-in text', async () => {
    const content = updateColumn(createGraph('erdesign'), 'table_1', 0, { name: '开始' });
    const view = await mountEditor('erdesign', content as ReturnType<typeof createGraph>);
    view.graph.handlers.get('edge:click')!({ edge: view.graph.getCellById('edge_1') });
    await settle();
    setLocale('en');
    await settle();
    const field = view.find('property-sourceField');
    expect(field.props['aria-label']).toBe('Source field');
    expect(field.options.map(textOf)).toContain('开始');
    expect(field.value).toBe('开始');
  });

  it('rejects invalid inspector reconnections and updates their error on language switch', async () => {
    const view = await mountEditor('logicdesign');
    view.graph.handlers.get('edge:click')!({ edge: view.graph.getCellById('edge_1') });
    await settle();
    const before = view.model.value;
    await view.change('edge-target', 'start_1');
    expect(view.model.value).toBe(before);
    expect(view.find('edge-target').value).toBe('assign_2');
    expect(textOf(view.find('connection-error'))).toBe('不能连接节点自身');
    setLocale('en');
    await settle();
    expect(textOf(view.find('connection-error'))).toBe('A node cannot connect to itself');
    expect(view.find('edge-label').props['aria-label']).toBe('Edge label');
  });

  it('edits null and unset nested rule samples without deleting sibling properties', async () => {
    let model: PluginContent = updateNode(createGraph('valueruledesign'), 'predicate_2', { properties: { field: 'user.age', operator: 'isNull' } });
    model = { ...model, sample: { user: { age: 24, name: '开始' }, status: 'active' } };
    const view = await mountEditor('valueruledesign', model as ReturnType<typeof createGraph>);
    await view.change('sample-state-user.age', 'null');
    expect(view.model.value.sample).toEqual({ user: { age: null, name: '开始' }, status: 'active' });
    expect(textOf(view.find('rule-result')).trim()).toBe('通过');
    await view.change('sample-state-user.age', 'unset');
    expect(view.model.value.sample).toEqual({ user: { name: '开始' }, status: 'active' });
    await view.change('sample-state-user.age', 'value');
    await view.change('sample-user.age', '30');
    expect(view.model.value.sample).toEqual({ user: { age: 30, name: '开始' }, status: 'active' });
    expect(textOf(view.find('rule-result')).trim()).toBe('未通过');
    setLocale('en');
    await settle();
    expect(textOf(view.find('rule-result')).trim()).toBe('Failed');
  });
});
