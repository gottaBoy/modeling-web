<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { Graph, type Cell } from '@antv/x6';
import '@antv/x6/dist/index.css';
import type { PluginContent } from '../types';
import { locale } from '../i18n';
import { graphT as t } from './messages';
import {
  addColumn, addEdge, addNode, commonKinds, defaultEdgeProperties, edgesOf, isGraphPluginId,
  isRecord, moveNode, nodesOf, palettes, propertyFields, reconnectEdge, records, removeColumn,
  removeEdge, removeNode, titles, uniqueId, updateColumn, updateEdge, updateNode, columnTypes,
  type GraphEdge, type GraphNode, type GraphPluginId, type PropertyField,
} from './model';
import { connectionIssue, isIdentifier, validateGraph } from './validation';
import { fieldValue, semanticPreview } from './semantics';
import PropertyFields from './PropertyFields.vue';
import SemanticPreview from './SemanticPreview.vue';

const props = defineProps<{ pluginId: string; modelValue: PluginContent }>();
const emit = defineEmits<{ (event: 'update:modelValue', value: PluginContent): void }>();
const draft = shallowRef<PluginContent>(isRecord(props.modelValue) ? props.modelValue : {});
const canvas = ref<HTMLDivElement>();
const selected = ref('');
const listMode = ref<'nodes' | 'edges'>('nodes');
const sourceId = ref('');
const targetId = ref('');
const connectionAttempt = ref<{ source: string; target: string; excludeId?: string }>();
const linkError = computed(() => connectionAttempt.value
  ? linkMessage(connectionAttempt.value.source, connectionAttempt.value.target, connectionAttempt.value.excludeId) : undefined);
const graphError = ref(false);
const zoom = ref(100);
let graph: Graph | undefined;
let observer: ResizeObserver | undefined;
let syncing = false;
let disposed = false;
let firstFit = true;

const plugin = computed<GraphPluginId | undefined>(() => isGraphPluginId(props.pluginId) ? props.pluginId : undefined);
const palette = computed(() => plugin.value ? palettes[plugin.value] : []);
const nodes = computed(() => nodesOf(draft.value));
const edges = computed(() => edgesOf(draft.value));
const selectedNode = computed(() => nodes.value.find(node => node.id === selected.value));
const selectedEdge = computed(() => edges.value.find(edge => edge.id === selected.value));
const issues = computed(() => validateGraph(props.pluginId, draft.value));
const preview = computed(() => semanticPreview(props.pluginId, draft.value));
const commonLabel = computed(() => palette.value.find(entry => entry.kind === (plugin.value ? commonKinds[plugin.value] : ''))?.label ?? t('节点'));
const columns = computed(() => Array.isArray(selectedNode.value?.properties.columns) ? selectedNode.value.properties.columns : []);
const previewTitle = computed(() => t(({
  logicdesign: '逻辑执行计划', workflowdesign: '工作流定义', erdesign: '表结构与关系DDL',
  dataflowdesign: '样例执行结果', dataquerydesign: '参数化SQL', valueruledesign: '规则求值结果',
}[props.pluginId] ?? '语义输出')));
const ruleFields = computed(() => {
  const fields = new Map<string, PluginContent>();
  nodes.value.filter(node => node.kind === 'predicate').forEach(node => {
    if (isIdentifier(node.properties.field, true)) fields.set(node.properties.field, node.properties);
  });
  return [...fields.entries()].map(([field, properties]) => ({ field, valueType: properties.valueType }));
});
const edgeFields = computed<PropertyField[]>(() => {
  if (!selectedEdge.value) return [];
  if (props.pluginId === 'erdesign') {
    const from = nodes.value.find(node => node.id === selectedEdge.value?.source);
    const to = nodes.value.find(node => node.id === selectedEdge.value?.target);
    return [
      { key: 'cardinality', label: t('关系基数'), control: 'select', options: [
        { value: 'one-to-many', label: t('一对多') }, { value: 'many-to-one', label: t('多对一') }, { value: 'one-to-one', label: t('一对一') },
      ] },
      { key: 'sourceField', label: t('源字段'), control: 'select', options: records(from?.properties.columns).map(column => ({ value: String(column.name), label: String(column.name) })) },
      { key: 'targetField', label: t('目标字段'), control: 'select', options: records(to?.properties.columns).map(column => ({ value: String(column.name), label: String(column.name) })) },
    ];
  }
  const node = nodes.value.find(value => value.id === selectedEdge.value?.source);
  return node && ['condition', 'decision'].includes(node.kind) ? [{
    key: 'branch', label: t('分支条件'), control: 'select',
    options: [{ value: 'true', label: t('条件成立') }, { value: 'false', label: t('条件不成立') }],
  }] : [];
});

watch(() => props.modelValue, value => { draft.value = isRecord(value) ? value : {}; });
watch(() => props.pluginId, () => {
  selected.value = '';
  sourceId.value = '';
  targetId.value = '';
  connectionAttempt.value = undefined;
  firstFit = true;
});
watch([draft, () => props.pluginId], () => {
  if (!nodes.value.some(node => node.id === selected.value) && !edges.value.some(edge => edge.id === selected.value)) selected.value = nodes.value[0]?.id ?? '';
  if (!nodes.value.some(node => node.id === sourceId.value)) sourceId.value = nodes.value[0]?.id ?? '';
  if (!nodes.value.some(node => node.id === targetId.value)) targetId.value = nodes.value[1]?.id ?? '';
  void nextTick(syncGraph);
}, { immediate: true, flush: 'post' });
watch(selected, () => paintSelection());
// Updating only display attributes preserves cell identity, selection and viewport.
watch(locale, () => {
  graph?.getNodes().forEach(cell => {
    const node = nodes.value.find(value => value.id === cell.id);
    if (node) cell.attr('label/text', nodeLabel(node));
  });
  graph?.getEdges().forEach(cell => {
    const edge = edges.value.find(value => value.id === cell.id);
    if (edge) cell.setLabels(edgeLabels(edge));
  });
}, { flush: 'post' });

function commit(value: PluginContent) {
  draft.value = value;
  emit('update:modelValue', value);
}
function add(kind?: string) {
  if (!plugin.value) return;
  const chosen = kind ?? commonKinds[plugin.value];
  const id = uniqueId(draft.value, chosen);
  commit(addNode(draft.value, plugin.value, chosen));
  selected.value = id;
  listMode.value = 'nodes';
  void nextTick(() => {
    syncGraph();
    const cell = graph?.getCellById(id);
    if (cell) graph?.centerCell(cell);
  });
}
function select(id: string) {
  selected.value = id;
}
function removeSelected() {
  if (selectedNode.value) commit(removeNode(draft.value, selected.value));
  else if (selectedEdge.value) commit(removeEdge(draft.value, selected.value));
  selected.value = '';
}
function patchNode(patch: PluginContent) {
  if (selectedNode.value) commit(updateNode(draft.value, selected.value, patch));
}
function patchEdge(patch: PluginContent) {
  if (selectedEdge.value) commit(updateEdge(draft.value, selected.value, patch));
}
function value(event: Event): string {
  return (event.target as HTMLInputElement).value;
}
function coordinate(key: 'x' | 'y', event: Event) {
  const input = value(event);
  patchNode({ [key]: input.trim() && Number.isFinite(Number(input)) ? Number(input) : '' });
}
function columnValue(column: unknown, key: string): unknown {
  return isRecord(column) ? column[key] : '';
}
function patchColumn(index: number, patch: PluginContent) {
  if (selectedNode.value) commit(updateColumn(draft.value, selected.value, index, patch));
}
function endpoint(key: 'source' | 'target', event: Event) {
  if (!selectedEdge.value || !plugin.value) return;
  const id = value(event);
  const source = key === 'source' ? id : selectedEdge.value.source;
  const target = key === 'target' ? id : selectedEdge.value.target;
  connectionAttempt.value = { source, target, excludeId: selected.value };
  if (linkError.value) {
    (event.target as HTMLSelectElement).value = selectedEdge.value[key];
    return;
  }
  connectionAttempt.value = undefined;
  commit(reconnectEdge(draft.value, plugin.value, selected.value, source, target));
}
function linkMessage(source: string, target: string, excludeId?: string): string | undefined {
  if (!plugin.value) return t('不支持的图模型类型');
  const error = connectionIssue(plugin.value, draft.value, source, target);
  if (error) return error;
  const properties = excludeId
    ? edgesOf(reconnectEdge(draft.value, plugin.value, excludeId, source, target)).find(edge => edge.id === excludeId)?.properties
      ?? defaultEdgeProperties(plugin.value, draft.value, source, target, excludeId)
    : defaultEdgeProperties(plugin.value, draft.value, source, target);
  if (edges.value.some(edge => edge.id !== excludeId && edge.source === source && edge.target === target &&
    edge.properties.branch === properties.branch && edge.properties.sourceField === properties.sourceField && edge.properties.targetField === properties.targetField)) return t('相同语义的连线已存在');
  return undefined;
}
function connect() {
  if (!plugin.value) return;
  connectionAttempt.value = { source: sourceId.value, target: targetId.value };
  if (linkError.value) return;
  connectionAttempt.value = undefined;
  const id = uniqueId(draft.value, 'edge');
  commit(addEdge(draft.value, plugin.value, sourceId.value, targetId.value));
  selected.value = id;
  listMode.value = 'edges';
}
function fit() {
  graph?.zoomToFit({ padding: 36, maxScale: 1 });
  zoom.value = Math.round((graph?.zoom() ?? 1) * 100);
}
function changeZoom(amount: number) {
  graph?.zoom(amount);
  zoom.value = Math.round((graph?.zoom() ?? 1) * 100);
}
function nodeLabel(node: GraphNode): string {
  if (props.pluginId === 'erdesign') return [
    `${node.label} (${String(node.properties.tableName ?? '')})`,
    ...records(node.properties.columns).slice(0, 5).map(column => `${column.primary ? '* ' : ''}${String(column.name)}: ${String(column.type)}`),
    ...(records(node.properties.columns).length > 5 ? ['...'] : []),
  ].join('\n');
  return `${node.label}\n${palette.value.find(entry => entry.kind === node.kind)?.label ?? node.kind}`;
}
function edgeLabels(edge: GraphEdge) {
  const suffix = edge.properties.branch === 'true' ? t('成立') : edge.properties.branch === 'false' ? t('不成立')
    : ({ 'one-to-many': '1:N', 'many-to-one': 'N:1', 'one-to-one': '1:1' } as Record<string, string>)[String(edge.properties.cardinality)] ?? '';
  return [{ attrs: { label: { text: [edge.label, suffix].filter(Boolean).join(' / '), fill: '#465762', fontSize: 11 } } }];
}
function paintSelection() {
  if (!graph || syncing) return;
  graph.getNodes().forEach(node => {
    node.attr('body/strokeWidth', node.id === selected.value ? 3 : 1.4);
    node.attr('body/fill', node.id === selected.value ? '#eaf4fc' : '#ffffff');
  });
  graph.getEdges().forEach(edge => {
    edge.attr('line/stroke', edge.id === selected.value ? '#1775a6' : '#6c7a85');
    edge.attr('line/strokeWidth', edge.id === selected.value ? 2.8 : 1.6);
  });
}
function syncGraph() {
  if (!graph || disposed || syncing) return;
  syncing = true;
  try {
    const cells: Cell[] = [];
    const ids = new Set<string>();
    nodes.value.slice(0, 1000).forEach(node => {
      if (!node.id || ids.has(node.id)) return;
      ids.add(node.id);
      const entry = palette.value.find(value => value.kind === node.kind);
      const isTerminal = ['start', 'end'].includes(node.kind);
      cells.push(graph!.createNode({
        id: node.id, shape: isTerminal ? 'ellipse' : 'rect', x: node.x, y: node.y,
        width: props.pluginId === 'erdesign' ? 230 : 186,
        height: props.pluginId === 'erdesign' ? 170 : 68,
        attrs: {
          body: { stroke: entry?.color ?? '#b1283d', strokeWidth: 1.4, fill: '#fff', rx: isTerminal ? 0 : 4, ry: isTerminal ? 0 : 4 },
          label: { text: nodeLabel(node), fill: '#24313b', fontSize: 12, fontFamily: 'system-ui, sans-serif', textWrap: { width: -20, height: -16, ellipsis: true, breakWord: true } },
        },
        ports: {
          groups: {
            in: { position: 'left', attrs: { circle: { r: 5, magnet: 'passive', stroke: '#6c8899', strokeWidth: 1.5, fill: '#fff' } } },
            out: { position: 'right', attrs: { circle: { r: 5, magnet: true, stroke: '#307fa8', strokeWidth: 1.5, fill: '#fff' } } },
          },
          items: [{ id: 'in', group: 'in' }, { id: 'out', group: 'out' }],
        },
      }));
    });
    edges.value.slice(0, 4000).forEach(edge => {
      if (!edge.id || ids.has(edge.id) || !ids.has(edge.source) || !ids.has(edge.target)) return;
      ids.add(edge.id);
      const vertices = records(edge.vertices).filter(point => typeof point.x === 'number' && Number.isFinite(point.x) && typeof point.y === 'number' && Number.isFinite(point.y)).map(point => ({ x: Number(point.x), y: Number(point.y) }));
      cells.push(graph!.createEdge({
        id: edge.id, source: { cell: edge.source, port: 'out' }, target: { cell: edge.target, port: 'in' },
        router: { name: 'manhattan', args: { padding: 18 } }, connector: { name: 'rounded', args: { radius: 6 } },
        vertices, attrs: { line: { stroke: '#6c7a85', strokeWidth: 1.6, targetMarker: 'block' } },
        labels: edgeLabels(edge),
      }));
    });
    graph.resetCells(cells);
    graphError.value = false;
  } catch {
    graphError.value = true;
  } finally {
    syncing = false;
  }
  paintSelection();
  if (firstFit && nodes.value.length) { fit(); firstFit = false; }
}
function sampleValue(field: string): unknown {
  return fieldValue(isRecord(draft.value.sample) ? draft.value.sample : {}, field);
}
function changeSample(field: string, valueType: unknown, event: Event) {
  const text = value(event);
  const nextValue = valueType === 'boolean' ? text === 'true' : valueType === 'number' && text.trim() && Number.isFinite(Number(text)) ? Number(text) : text;
  writeSample(field, nextValue);
}
function sampleState(field: string): string {
  const current = sampleValue(field);
  return current === undefined ? 'unset' : current === null ? 'null' : 'value';
}
function changeSampleState(field: string, valueType: unknown, event: Event) {
  const state = value(event);
  writeSample(field, state === 'null' ? null : state === 'unset' ? undefined : valueType === 'boolean' ? true : valueType === 'number' ? 0 : '');
}
function writeSample(field: string, nextValue: unknown) {
  if (!isIdentifier(field, true)) return;
  const sample: PluginContent = { ...(isRecord(draft.value.sample) ? draft.value.sample : {}) };
  const parts = field.split('.');
  let current = sample;
  parts.slice(0, -1).forEach(part => {
    const child: PluginContent = { ...(isRecord(current[part]) ? current[part] as PluginContent : {}) };
    current[part] = child;
    current = child;
  });
  if (nextValue === undefined) delete current[parts[parts.length - 1]];
  else current[parts[parts.length - 1]] = nextValue;
  commit({ ...draft.value, sample });
}

onMounted(() => {
  if (!canvas.value) return;
  try {
  graph = new Graph({
    container: canvas.value,
    width: canvas.value.clientWidth || 600, height: canvas.value.clientHeight || 480,
    grid: { visible: true, size: 10, type: 'dot', args: { color: '#dce3e8', thickness: 1 } },
    background: { color: '#f8fafb' }, async: false,
    panning: true, mousewheel: { enabled: true, modifiers: ['ctrl', 'meta'], minScale: 0.2, maxScale: 2 },
    scaling: { min: 0.2, max: 2 },
    connecting: {
      allowBlank: false, allowLoop: () => props.pluginId === 'erdesign', allowNode: true, allowEdge: false,
      allowMulti: true, snap: { radius: 18 },
      validateConnection: ({ sourceCell, targetCell, sourcePort, targetPort, edge }) =>
        sourcePort !== 'in' && targetPort !== 'out' && !!sourceCell && !!targetCell &&
        !linkMessage(sourceCell.id, targetCell.id, edge?.id),
      createEdge: () => graph!.createEdge({ attrs: { line: { stroke: '#307fa8', targetMarker: 'block' } } }),
    },
  });
  graph.on('node:click', ({ node }) => { selected.value = node.id; listMode.value = 'nodes'; });
  graph.on('edge:click', ({ edge }) => { selected.value = edge.id; listMode.value = 'edges'; });
  graph.on('blank:click', () => { selected.value = ''; });
  graph.on('node:moved', ({ node }) => {
    if (!syncing) {
      const point = node.position();
      commit(moveNode(draft.value, node.id, point.x, point.y));
    }
  });
  graph.on('edge:connected', ({ edge, isNew }) => {
    if (syncing || !plugin.value) return;
    const source = edge.getSourceCellId();
    const target = edge.getTargetCellId();
    if (!source || !target || linkMessage(source, target, edge.id)) { void nextTick(syncGraph); return; }
    const id = isNew ? uniqueId(draft.value, 'edge') : edge.id;
    commit(isNew ? addEdge(draft.value, plugin.value, source, target) : reconnectEdge(draft.value, plugin.value, edge.id, source, target));
    selected.value = id;
    listMode.value = 'edges';
  });
  graph.on('scale', ({ sx }) => { zoom.value = Math.round(sx * 100); });
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(() => {
      if (canvas.value && graph && !disposed) graph.resize(Math.max(1, canvas.value.clientWidth), Math.max(1, canvas.value.clientHeight));
    });
    observer.observe(canvas.value);
  }
  syncGraph();
  } catch {
    graphError.value = true;
  }
});
onBeforeUnmount(() => {
  disposed = true;
  observer?.disconnect();
  graph?.dispose();
  graph = undefined;
});
</script>

<template>
  <section class="local-graph-editor" data-testid="plugin-editor" :data-plugin-id="pluginId" :aria-label="plugin ? titles[plugin] : t('图模型编辑器')">
    <div class="graph-toolbar">
      <button type="button" class="graph-primary" data-testid="add-item" :aria-label="t('新增{label}', { label: commonLabel })" :disabled="!plugin" @click="add()">
        <i class="fa fa-plus" aria-hidden="true" /><span>{{ t('新增{label}', { label: commonLabel }) }}</span>
      </button>
      <span class="graph-count" data-testid="graph-count">{{ t('{nodes} 节点 · {edges} 连线', { nodes: nodes.length, edges: edges.length }) }}</span>
      <div class="graph-tools">
        <button type="button" :aria-label="t('缩小画布')" :title="t('缩小画布')" data-testid="zoom-out" @click="changeZoom(-0.1)"><i class="fa fa-search-minus" aria-hidden="true" /></button>
        <output class="graph-zoom" :aria-label="t('画布缩放比例')">{{ zoom }}%</output>
        <button type="button" :aria-label="t('放大画布')" :title="t('放大画布')" data-testid="zoom-in" @click="changeZoom(0.1)"><i class="fa fa-search-plus" aria-hidden="true" /></button>
        <button type="button" :aria-label="t('适配画布')" :title="t('适配画布')" data-testid="fit-graph" @click="fit"><i class="fa fa-arrows-alt" aria-hidden="true" /></button>
        <button type="button" :aria-label="t(selectedEdge ? '删除所选连线' : '删除所选节点')" :title="t(selectedEdge ? '删除所选连线' : '删除所选节点')"
          data-testid="delete-item" :disabled="!selectedNode && !selectedEdge" @click="removeSelected"><i class="fa fa-trash-o" aria-hidden="true" /></button>
      </div>
    </div>
    <div class="graph-workspace">
      <aside class="graph-palette" :aria-label="t('节点面板')">
        <h3>{{ t('节点类型') }}</h3>
        <div class="graph-palette-items">
          <button v-for="entry in palette" :key="entry.kind" type="button" :aria-label="t('添加{label}节点', { label: entry.label })"
            :data-testid="`add-node-${entry.kind}`" @click="add(entry.kind)">
            <i :class="entry.icon" :style="{ color: entry.color }" aria-hidden="true" /><span>{{ entry.label }}</span>
          </button>
        </div>
        <div class="graph-list-tabs" role="tablist" :aria-label="t('图元素列表')">
          <button type="button" role="tab" :aria-selected="listMode === 'nodes'" @click="listMode = 'nodes'">{{ t('节点') }}</button>
          <button type="button" role="tab" :aria-selected="listMode === 'edges'" @click="listMode = 'edges'">{{ t('连线') }}</button>
        </div>
        <div v-if="listMode === 'nodes'" class="graph-element-list" data-testid="node-list" role="tabpanel" :aria-label="t('节点列表')">
          <button v-for="node in nodes" :key="node.id" type="button" :aria-pressed="selected === node.id" :aria-label="t('选择节点 {label}', { label: node.label })"
            :data-testid="`node-row-${node.id}`" @click="select(node.id)">{{ node.label }}</button>
        </div>
        <div v-else class="graph-element-list" data-testid="edge-list" role="tabpanel" :aria-label="t('连线列表')">
          <button v-for="edge in edges" :key="edge.id" type="button" :aria-pressed="selected === edge.id" :aria-label="t('选择连线 {id}', { id: edge.id })"
            :data-testid="`edge-row-${edge.id}`" @click="select(edge.id)">{{ edge.label || `${nodes.find(node => node.id === edge.source)?.label ?? '?'} → ${nodes.find(node => node.id === edge.target)?.label ?? '?'}` }}</button>
        </div>
      </aside>
      <div class="graph-stage">
        <div ref="canvas" class="graph-canvas" data-testid="graph-canvas" :aria-label="t('图模型画布')" />
        <p v-if="graphError" class="graph-error" role="alert">{{ t('图形渲染失败') }}</p>
        <form class="graph-connect" :aria-label="t('新增连线')" @submit.prevent="connect">
          <label><span>{{ t('源节点') }}</span><select v-model="sourceId" :aria-label="t('连线源节点')" data-testid="connect-source">
            <option value="" disabled>{{ t('选择源节点') }}</option><option v-for="node in nodes" :key="node.id" :value="node.id">{{ node.label }} ({{ node.id }})</option>
          </select></label>
          <i class="fa fa-long-arrow-right" aria-hidden="true" />
          <label><span>{{ t('目标节点') }}</span><select v-model="targetId" :aria-label="t('连线目标节点')" data-testid="connect-target">
            <option value="" disabled>{{ t('选择目标节点') }}</option><option v-for="node in nodes" :key="node.id" :value="node.id">{{ node.label }} ({{ node.id }})</option>
          </select></label>
          <button type="submit" :aria-label="t('新增连线')" :title="t('新增连线')" data-testid="add-edge" :disabled="!sourceId || !targetId"><i class="fa fa-link" aria-hidden="true" /></button>
          <p v-if="linkError" class="graph-error" role="alert" data-testid="connection-error">{{ linkError }}</p>
        </form>
      </div>
      <aside class="graph-inspector" :aria-label="t('属性面板')">
        <template v-if="selectedNode">
          <h3>{{ t('节点属性') }}</h3>
          <label class="graph-input"><span>{{ t('节点名称') }}</span><input :value="selectedNode.label" :aria-label="t('节点名称')" data-testid="node-label" @change="patchNode({ label: value($event) })"></label>
          <div class="graph-position">
            <label class="graph-input"><span>{{ t('X 坐标') }}</span><input type="number" step="any" :value="selectedNode.x" :aria-label="t('节点X坐标')" data-testid="node-x" @change="coordinate('x', $event)"></label>
            <label class="graph-input"><span>{{ t('Y 坐标') }}</span><input type="number" step="any" :value="selectedNode.y" :aria-label="t('节点Y坐标')" data-testid="node-y" @change="coordinate('y', $event)"></label>
          </div>
          <PropertyFields :key="selectedNode.id" :model-value="selectedNode.properties" :fields="propertyFields(pluginId, selectedNode.kind)" @update:model-value="patchNode({ properties: $event })" />
          <section v-if="pluginId === 'erdesign'" class="graph-columns" :aria-label="t('数据表字段')">
            <div class="graph-section-heading"><h3>{{ t('字段') }}</h3><button type="button" :aria-label="t('新增字段')" :title="t('新增字段')" data-testid="add-column" @click="commit(addColumn(draft, selected))"><i class="fa fa-plus" aria-hidden="true" /></button></div>
            <div v-for="(column, index) in columns" :key="index" class="graph-column" :data-testid="`column-${index}`">
              <div class="graph-column-heading"><strong>{{ t('字段 {index}', { index: index + 1 }) }}</strong><button type="button" :aria-label="t('删除字段{index}', { index: index + 1 })" :title="t('删除字段{index}', { index: index + 1 })" @click="commit(removeColumn(draft, selected, index))"><i class="fa fa-trash-o" aria-hidden="true" /></button></div>
              <input :value="columnValue(column, 'name')" :aria-label="t('字段{index}名称', { index: index + 1 })" :data-testid="`column-name-${index}`" @change="patchColumn(index, { name: value($event) })">
              <select :value="columnValue(column, 'type')" :aria-label="t('字段{index}类型', { index: index + 1 })" :data-testid="`column-type-${index}`" @change="patchColumn(index, { type: value($event) })"><option v-for="type in columnTypes" :key="type" :value="type">{{ type }}</option></select>
              <div class="graph-column-checks">
                <label><input type="checkbox" :checked="columnValue(column, 'primary') === true" :aria-label="t('字段{index}主键', { index: index + 1 })" @change="patchColumn(index, { primary: ($event.target as HTMLInputElement).checked })">{{ t('主键') }}</label>
                <label><input type="checkbox" :checked="columnValue(column, 'nullable') === true" :disabled="columnValue(column, 'primary') === true" :aria-label="t('字段{index}允许空值', { index: index + 1 })" @change="patchColumn(index, { nullable: ($event.target as HTMLInputElement).checked })">{{ t('允许空值') }}</label>
              </div>
            </div>
          </section>
        </template>
        <template v-else-if="selectedEdge">
          <h3>{{ t('连线属性') }}</h3>
          <label class="graph-input"><span>{{ t('连线名称') }}</span><input :value="selectedEdge.label" :aria-label="t('连线名称')" data-testid="edge-label" @change="patchEdge({ label: value($event) })"></label>
          <label class="graph-input"><span>{{ t('源节点') }}</span><select :value="selectedEdge.source" :aria-label="t('修改连线源节点')" data-testid="edge-source" @change="endpoint('source', $event)"><option v-for="node in nodes" :key="node.id" :value="node.id">{{ node.label }} ({{ node.id }})</option></select></label>
          <label class="graph-input"><span>{{ t('目标节点') }}</span><select :value="selectedEdge.target" :aria-label="t('修改连线目标节点')" data-testid="edge-target" @change="endpoint('target', $event)"><option v-for="node in nodes" :key="node.id" :value="node.id">{{ node.label }} ({{ node.id }})</option></select></label>
          <PropertyFields :key="selectedEdge.id" :model-value="selectedEdge.properties" :fields="edgeFields" @update:model-value="patchEdge({ properties: $event })" />
        </template>
        <h3 v-else>{{ t('未选择图元素') }}</h3>
      </aside>
    </div>
    <section class="graph-validation" :aria-label="t('图模型校验')" aria-live="polite" data-testid="graph-validation">
      <strong :class="{ 'graph-error': issues.length }"><i :class="issues.length ? 'fa fa-exclamation-triangle' : 'fa fa-check-circle'" aria-hidden="true" /> {{ issues.length ? t('{count} 项待修正', { count: issues.length }) : t('校验通过') }}</strong>
      <ul v-if="issues.length" data-testid="validation-issues"><li v-for="(issue, index) in issues" :key="index"><code>{{ issue.path }}</code> {{ issue.message }}</li></ul>
    </section>
    <section class="graph-preview" :aria-label="previewTitle">
      <h3>{{ previewTitle }}</h3>
      <div v-if="pluginId === 'valueruledesign'" class="graph-sample" data-testid="rule-sample">
        <div v-for="field in ruleFields" :key="field.field" class="graph-input"><span>{{ field.field }}</span>
          <select :value="sampleState(field.field)" :aria-label="t('样例 {field} 状态', { field: field.field })" :data-testid="`sample-state-${field.field}`" @change="changeSampleState(field.field, field.valueType, $event)">
            <option value="value">{{ t('有值') }}</option><option value="null">{{ t('空值') }}</option><option value="unset">{{ t('未设置') }}</option>
          </select>
          <select v-if="field.valueType === 'boolean'" :value="String(sampleValue(field.field))" :disabled="sampleState(field.field) !== 'value'" :aria-label="t('样例 {field}', { field: field.field })" :data-testid="`sample-${field.field}`" @change="changeSample(field.field, field.valueType, $event)"><option value="true">{{ t('是') }}</option><option value="false">{{ t('否') }}</option></select>
          <input v-else :type="field.valueType === 'number' ? 'number' : 'text'" step="any" :value="sampleValue(field.field)" :disabled="sampleState(field.field) !== 'value'" :aria-label="t('样例 {field}', { field: field.field })" :data-testid="`sample-${field.field}`" @change="changeSample(field.field, field.valueType, $event)">
        </div>
      </div>
      <SemanticPreview :plugin-id="pluginId" :result="preview" />
    </section>
  </section>
</template>

<style scoped>
.local-graph-editor { width: 100%; min-width: 0; color: #24313b; background: #fff; font: 13px/1.5 system-ui, sans-serif; letter-spacing: 0; }
.local-graph-editor * { box-sizing: border-box; }
.local-graph-editor h3 { margin: 0 0 12px; font-size: 13px; font-weight: 600; }
.local-graph-editor button { display: inline-flex; gap: 7px; align-items: center; justify-content: center; min-height: 32px; padding: 5px 9px; border: 1px solid #d1d9df; border-radius: 4px; color: #354c5a; background: #fff; font: inherit; cursor: pointer; }
.local-graph-editor button:hover:not(:disabled) { background: #edf4f8; border-color: #88b1c6; }
.local-graph-editor button:disabled { opacity: .45; cursor: not-allowed; }
.local-graph-editor :focus-visible { outline: 2px solid #307fa8; outline-offset: 2px; }
.graph-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 10px 12px; border-bottom: 1px solid #dce2e6; }
.local-graph-editor .graph-primary { color: #fff; background: #286e94; border-color: #286e94; }
.local-graph-editor .graph-primary:hover:not(:disabled) { color: #fff; background: #205c7d; }
.graph-count { color: #60717d; overflow-wrap: anywhere; }
.local-graph-editor button > span, .graph-input > span, .graph-connect label > span { min-width: 0; overflow-wrap: anywhere; }
.graph-tools { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.graph-tools button { width: 32px; height: 32px; padding: 0; }
.graph-zoom { width: 44px; text-align: center; font-variant-numeric: tabular-nums; }
.graph-workspace { display: grid; grid-template-columns: 152px minmax(260px, 1fr) 282px; min-width: 0; align-items: stretch; border-bottom: 1px solid #dce2e6; }
.graph-palette { min-width: 0; padding: 14px 8px; border-right: 1px solid #dce2e6; }
.graph-palette h3 { padding-left: 6px; }
.graph-palette-items { display: grid; gap: 5px; }
.graph-palette-items button { justify-content: flex-start; text-align: left; border-color: transparent; }
.graph-palette-items button i { width: 16px; flex: 0 0 16px; }
.graph-list-tabs { display: flex; margin: 16px 0 8px; border-bottom: 1px solid #dce2e6; }
.graph-list-tabs button { flex: 1; border: none; border-radius: 0; }
.graph-list-tabs button[aria-selected="true"] { color: #20688e; border-bottom: 2px solid #307fa8; }
.graph-element-list { display: grid; align-content: start; gap: 3px; max-height: 260px; overflow-y: auto; }
.graph-element-list button { display: block; width: 100%; text-align: left; border-color: transparent; overflow-wrap: anywhere; }
.graph-element-list button[aria-pressed="true"] { background: #eaf4fc; color: #20688e; }
.graph-stage { min-width: 0; }
.graph-canvas { width: 100%; height: 470px; overflow: hidden; touch-action: none; }
.graph-connect { display: grid; grid-template-columns: minmax(0, 1fr) 16px minmax(0, 1fr) 34px; align-items: end; gap: 8px; padding: 10px; border-top: 1px solid #dce2e6; }
.graph-connect > i { align-self: center; margin-top: 20px; }
.graph-connect label, .graph-input { display: grid; gap: 5px; min-width: 0; }
.graph-connect select, .graph-input input, .graph-input select, .graph-column > input, .graph-column > select { width: 100%; min-width: 0; border: 1px solid #cbd2d8; border-radius: 4px; padding: 7px 8px; color: #24313b; background: #fff; font: inherit; }
.graph-connect .graph-error { grid-column: 1 / -1; }
.graph-inspector { display: flex; flex-direction: column; gap: 12px; padding: 14px; border-left: 1px solid #dce2e6; min-width: 0; max-height: 552px; overflow-y: auto; }
.graph-inspector h3 { margin: 0; }
.graph-position { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.graph-section-heading, .graph-column-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.graph-columns { margin-top: 8px; }
.graph-column { display: grid; gap: 7px; padding: 12px 0; border-bottom: 1px solid #e2e7eb; }
.graph-column-heading strong { font-size: 12px; font-weight: 500; color: #64737d; }
.graph-column-checks { display: flex; flex-wrap: wrap; gap: 12px; }
.graph-column-checks label { display: inline-flex; align-items: center; gap: 4px; }
.graph-column-checks input { margin: 0; width: 15px; height: 15px; }
.graph-validation { padding: 12px 14px; border-bottom: 1px solid #dce2e6; color: #247358; }
.graph-validation ul { padding-left: 18px; color: #a82c40; margin: 8px 0 0; max-height: 150px; overflow-y: auto; overflow-wrap: anywhere; }
.graph-error { color: #b1283d; font-size: 12px; margin: 0; overflow-wrap: anywhere; }
.graph-preview { padding: 14px; min-width: 0; }
.graph-sample { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(160px, 100%), 1fr)); gap: 12px; margin-bottom: 14px; }
@media (max-width: 1100px) {
  .graph-workspace { grid-template-columns: 140px minmax(0, 1fr); }
  .graph-inspector { grid-column: 1 / -1; border-left: 0; border-top: 1px solid #dce2e6; max-height: 420px; }
}
@media (max-width: 600px) {
  .graph-workspace { grid-template-columns: minmax(0, 1fr); }
  .graph-toolbar { gap: 8px; }
  .graph-count { font-size: 12px; }
  .graph-tools { width: 100%; margin-left: 0; }
  .graph-palette { padding: 10px; border-right: 0; border-bottom: 1px solid #dce2e6; }
  .graph-palette-items { display: flex; overflow-x: auto; }
  .graph-palette-items button { flex: 0 0 auto; }
  .graph-palette h3 { margin-bottom: 5px; }
  .graph-list-tabs { margin-top: 8px; }
  .graph-element-list { display: flex; overflow-x: auto; max-height: 80px; }
  .graph-element-list button { width: auto; flex: 0 0 auto; max-width: 160px; }
  .graph-canvas { height: 360px; }
  .graph-connect { gap: 5px; padding: 8px; }
  .graph-connect select { font-size: 12px; padding: 7px 3px; }
}
</style>
