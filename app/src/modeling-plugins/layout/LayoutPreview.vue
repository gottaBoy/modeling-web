<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { locale } from '../i18n';
import type { LayoutContent, LayoutItem } from './schema';
import { cloneValue } from './schema';
import { defaultCell, descendants } from './operations';
import { aggregateValue, bounded, buildChartOption, buildPortletOption, buildReport, buildReportOption, csvData, displayField, displayValue, formatNumber, hierarchyRows, rawValue } from './preview';
import { layoutT } from './messages';
import { validateFormValues } from './validation';
import ChartPreview from './ChartPreview.vue';
import ViewBlock from './ViewBlock.vue';

const props = defineProps<{ content: LayoutContent; selectedId: string }>();
const emit = defineEmits<{ select: [id: string] }>();
const formValues = ref<Record<string, unknown>>({});
const formSubmitted = ref(false);
const formIssues = computed(() => formSubmitted.value ? validateFormValues(props.content, formValues.value) : []);
const formStatus = computed(() => formSubmitted.value && !formIssues.value.length ? layoutT('表单校验通过') : '');
const search = ref('');
const page = ref(1);
const sortId = ref('');
const sortDirection = ref(1);
const checkedRows = ref<number[]>([]);
const expanded = ref(new Set<string>());
const checkedNodes = ref(new Set<string>());
const activeNode = ref('');
const toolbarRows = ref<Record<string, unknown>[]>([]);
const toolbarSelected = ref(0);
const toolbarEditing = ref(-1);
const toolbarStatus = ref<{ key: string; params?: Record<string, unknown> }>();

function resetForm() {
  formValues.value = Object.fromEntries(props.content.items.map(item => [item.id, item.defaultValue ?? '']));
  formSubmitted.value = false;
}
function submitForm() {
  formSubmitted.value = true;
  if (formIssues.value.length) emit('select', formIssues.value[0].path);
}
watch(() => props.content.items, resetForm, { deep: true, immediate: true });
watch(() => [props.content.kind, props.content.data], () => {
  toolbarRows.value = cloneValue(props.content.data.rows);
  toolbarSelected.value = 0;
  toolbarEditing.value = -1;
  toolbarStatus.value = undefined;
  page.value = 1;
  checkedRows.value = [];
}, { deep: true, immediate: true });
watch(() => [props.content.kind, props.content.settings.defaultExpanded], () => {
  expanded.value = new Set(props.content.settings.defaultExpanded === false ? [] : props.content.items.map(item => item.id));
  checkedNodes.value = new Set();
  activeNode.value = '';
}, { immediate: true });
watch(search, () => { page.value = 1; });

const visibleItems = computed(() => props.content.items.filter(item => item.visible !== false));
const sortedRows = computed(() => {
  const term = search.value.toLocaleLowerCase(locale.value);
  const rows = props.content.data.rows.map((row, index) => ({ row, index }))
    .filter(entry => !term || props.content.data.columns.some(column =>
      displayValue(entry.row[column.key], column.type).toLocaleLowerCase(locale.value).includes(term)
      || rawValue(entry.row[column.key]).toLocaleLowerCase(locale.value).includes(term)));
  const column = props.content.items.find(item => item.id === sortId.value && item.sortable);
  if (column) rows.sort((a, b) => {
    const left = a.row[String(column.field)];
    const right = b.row[String(column.field)];
    const comparison = typeof left === 'number' && typeof right === 'number'
      ? left - right : rawValue(left).localeCompare(rawValue(right), locale.value, { numeric: true });
    return comparison * sortDirection.value;
  });
  return rows;
});
const pageSize = computed(() => Math.trunc(bounded(props.content.settings.pageSize, 1, 100, 6)));
const pageCount = computed(() => Math.max(1, Math.ceil(sortedRows.value.length / pageSize.value)));
const currentPage = computed(() => Math.min(page.value, pageCount.value));
const pageRows = computed(() => sortedRows.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value));
const report = computed(() => buildReport(props.content));
const chartOption = computed(() => props.content.kind === 'bireportdesign' ? buildReportOption(props.content) : buildChartOption(props.content));
const treeRows = computed(() => hierarchyRows(props.content.items).filter(({ item }) => {
  const seen = new Set<string>();
  let parent = String(item.parentId || '');
  while (parent && !seen.has(parent)) {
    seen.add(parent);
    if (!expanded.value.has(parent)) return false;
    parent = String(props.content.items.find(entry => entry.id === parent)?.parentId || '');
  }
  return true;
}));
const selectedNode = computed(() => props.content.items.find(item => item.id === activeNode.value));
const viewRoots = computed(() => hierarchyRows(props.content.items).filter(entry => entry.depth === 0).map(entry => entry.item));

function hasChildren(item: LayoutItem) {
  return props.content.items.some(entry => entry.parentId === item.id);
}
function toggleNode(item: LayoutItem) {
  if (item.disabled) return;
  activeNode.value = item.id;
  emit('select', item.id);
  const next = new Set(expanded.value);
  if (next.has(item.id)) next.delete(item.id);
  else next.add(item.id);
  expanded.value = next;
}
function checkNode(item: LayoutItem, checked: boolean) {
  const affected = descendants(props.content.items, item.id);
  const next = new Set(checkedNodes.value);
  props.content.items.filter(entry => affected.has(entry.id) && !entry.disabled).forEach(entry => {
    if (checked) next.add(entry.id);
    else next.delete(entry.id);
  });
  checkedNodes.value = next;
}
function nodeChecked(item: LayoutItem) {
  const leaves = props.content.items.filter(entry => descendants(props.content.items, item.id).has(entry.id) && !hasChildren(entry) && !entry.disabled);
  return leaves.length > 0 && leaves.every(entry => checkedNodes.value.has(entry.id));
}
function nodePartial(item: LayoutItem) {
  const ids = descendants(props.content.items, item.id);
  return !nodeChecked(item) && [...checkedNodes.value].some(id => ids.has(id));
}
function sort(item: LayoutItem) {
  if (!item.sortable) return;
  sortDirection.value = sortId.value === item.id ? -sortDirection.value : 1;
  sortId.value = item.id;
  emit('select', item.id);
}
function formInput(item: LayoutItem, event: Event) {
  const input = event.target as HTMLInputElement;
  formValues.value = {
    ...formValues.value,
    [item.id]: item.type === 'checkbox' ? input.checked : item.type === 'number'
      ? (input.validity?.badInput ? NaN : input.value === '' ? '' : Number(input.value)) : input.value,
  };
  formSubmitted.value = false;
}
function toolbarAction(item: LayoutItem) {
  if (item.disabled === true || (['edit', 'delete'].includes(String(item.action)) && !toolbarRows.value.length)) return;
  emit('select', item.id);
  if (item.action === 'create') {
    const row = cloneValue(props.content.data.rows[0] || Object.fromEntries(
      props.content.data.columns.map(column => [column.key, defaultCell(column.type, toolbarRows.value.length)]),
    ));
    const field = props.content.data.columns.find(column => column.type === 'text')?.key;
    if (field) row[field] = layoutT('新项目 {index}', { index: toolbarRows.value.length + 1 });
    toolbarRows.value = [...toolbarRows.value, row];
    toolbarSelected.value = toolbarRows.value.length - 1;
    toolbarEditing.value = toolbarSelected.value;
    toolbarStatus.value = { key: '已新增预览记录' };
  } else if (item.action === 'edit') {
    toolbarEditing.value = toolbarSelected.value;
    toolbarStatus.value = { key: '正在编辑所选记录' };
  } else if (item.action === 'delete') {
    toolbarRows.value = toolbarRows.value.filter((_, index) => index !== toolbarSelected.value);
    toolbarSelected.value = Math.max(0, Math.min(toolbarSelected.value, toolbarRows.value.length - 1));
    toolbarEditing.value = -1;
    toolbarStatus.value = { key: '已删除所选预览记录' };
  } else if (item.action === 'refresh') {
    toolbarRows.value = cloneValue(props.content.data.rows);
    toolbarSelected.value = 0;
    toolbarEditing.value = -1;
    toolbarStatus.value = { key: '预览记录已重置' };
  } else if (item.action === 'export') {
    const csv = csvData({ ...props.content, data: { ...props.content.data, rows: toolbarRows.value } });
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'preview-records.csv';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toolbarStatus.value = { key: '已导出 {count} 条预览记录', params: { count: toolbarRows.value.length } };
  }
}
function editToolbarCell(index: number, field: string, event: Event) {
  toolbarRows.value = toolbarRows.value.map((row, position) => position === index
    ? { ...row, [field]: (event.target as HTMLInputElement).value } : row);
}
function gridCell(item: LayoutItem, row: Record<string, unknown>): string {
  const value = row[String(item.field)];
  if (value === null || value === undefined) return '';
  return item.type === 'number' ? `${formatNumber(value, bounded(item.precision, 0, 6, 0))}${item.unit || ''}`
    : displayField(props.content, item.field, value);
}
</script>

<template>
  <section class="layout-preview" :data-preview-kind="content.kind" :aria-label="layoutT('实时预览')" :lang="locale">
    <h2 v-if="content.settings.showTitle !== false" class="layout-preview-title">{{ content.title }}</h2>
    <p v-if="!content.items.length" class="layout-empty">{{ layoutT('暂无组件') }}</p>

    <form v-else-if="content.kind === 'formdesign'" class="layout-form-preview" novalidate
      :class="{ 'is-compact': content.settings.density === 'compact', 'labels-left': content.settings.labelPosition === 'left' }"
      :style="{ '--form-columns': bounded(content.settings.columns, 1, 3, 2) }"
      @submit.prevent="submitForm" @reset.prevent="resetForm">
      <label v-for="item in content.items" :key="item.id" class="layout-form-field"
        :class="{ 'is-wide': item.fullWidth, 'is-selected': selectedId === item.id, 'is-checkbox': item.type === 'checkbox' }"
        :data-preview-item="item.id" @click="emit('select', item.id)">
        <span>{{ item.label }}<span v-if="item.required" class="layout-required"> *</span></span>
        <textarea v-if="item.type === 'textarea'" :value="rawValue(formValues[item.id])" :rows="bounded(item.rows, 2, 12, 3)"
          :aria-invalid="formIssues.some(issue => issue.path === item.id)"
          :placeholder="String(item.placeholder || '')" :required="item.required === true" :disabled="item.disabled === true" @input="formInput(item, $event)" />
        <select v-else-if="item.type === 'select'" :value="formValues[item.id]" :required="item.required === true" :disabled="item.disabled === true"
          :aria-invalid="formIssues.some(issue => issue.path === item.id)" @change="formInput(item, $event)">
          <option value="">{{ layoutT('请选择') }}</option>
          <option v-for="entry in Array.isArray(item.options) ? item.options : []" :key="String(entry)" :value="entry">{{ entry }}</option>
        </select>
        <input v-else :type="['number', 'date', 'checkbox'].includes(item.type) ? item.type : 'text'" :value="formValues[item.id]"
          :aria-invalid="formIssues.some(issue => issue.path === item.id)"
          :checked="formValues[item.id] === true" :min="typeof item.min === 'number' ? item.min : undefined" :max="typeof item.max === 'number' ? item.max : undefined" step="any"
          :placeholder="String(item.placeholder || '')" :required="item.required === true" :disabled="item.disabled === true" @input="formInput(item, $event)">
      </label>
      <div class="layout-form-actions">
        <button type="submit" class="layout-command is-primary"><i class="fa fa-check" aria-hidden="true" />{{ layoutT('提交') }}</button>
        <button type="reset" class="layout-icon-button" :title="layoutT('重置表单')" :aria-label="layoutT('重置表单')"><i class="fa fa-refresh" aria-hidden="true" /></button>
        <output class="layout-success" aria-live="polite">{{ formStatus }}</output>
        <ul v-if="formIssues.length" class="layout-form-errors" role="alert">
          <li v-for="issue in formIssues" :key="issue.path">{{ issue.message }}</li>
        </ul>
      </div>
    </form>

    <template v-else-if="content.kind === 'griddesign'">
      <label class="layout-preview-search"><i class="fa fa-search" aria-hidden="true" /><input v-model="search" type="search" :aria-label="layoutT('搜索表格')" :placeholder="layoutT('搜索记录')"></label>
      <div v-if="visibleItems.length" class="layout-table-scroll" tabindex="0" :aria-label="layoutT('表格预览')">
        <table class="layout-preview-table" :class="{ 'is-striped': content.settings.striped }">
          <thead><tr>
            <th v-if="content.settings.selection" class="layout-check-cell">
              <input type="checkbox" :aria-label="layoutT('选择本页')" :checked="pageRows.length > 0 && pageRows.every(entry => checkedRows.includes(entry.index))"
                :indeterminate="pageRows.some(entry => checkedRows.includes(entry.index)) && !pageRows.every(entry => checkedRows.includes(entry.index))"
                @change="checkedRows = ($event.target as HTMLInputElement).checked ? [...new Set([...checkedRows, ...pageRows.map(entry => entry.index)])] : checkedRows.filter(index => !pageRows.some(entry => entry.index === index))">
            </th>
            <th v-for="item in visibleItems" :key="item.id" :style="{ minWidth: `${bounded(item.width, 64, 800, 160)}px`, textAlign: item.align as 'left' | 'center' | 'right' }"
              :aria-sort="sortId === item.id ? sortDirection === 1 ? 'ascending' : 'descending' : 'none'">
              <button type="button" class="layout-sort-button" :class="{ 'is-selected': selectedId === item.id }" @click="sort(item); emit('select', item.id)">
                {{ item.label }}<i v-if="item.sortable" :class="['fa', sortId === item.id ? sortDirection === 1 ? 'fa-sort-asc' : 'fa-sort-desc' : 'fa-sort']" aria-hidden="true" />
              </button>
            </th>
          </tr></thead>
          <tbody><tr v-for="entry in pageRows" :key="entry.index" :class="{ 'is-row-selected': checkedRows.includes(entry.index) }">
            <td v-if="content.settings.selection"><input v-model="checkedRows" type="checkbox" :value="entry.index" :aria-label="layoutT('选择第 {index} 行', { index: entry.index + 1 })"></td>
            <td v-for="item in visibleItems" :key="item.id" :style="{ textAlign: item.align as 'left' | 'center' | 'right' }" :data-preview-item="item.id" @click="emit('select', item.id)">
              <span v-if="item.type === 'badge'" class="layout-badge" :style="{ color: String(item.color) }">{{ gridCell(item, entry.row) }}</span>
              <template v-else>{{ gridCell(item, entry.row) }}</template>
            </td>
          </tr></tbody>
          <tfoot v-if="content.settings.showSummary"><tr>
            <td v-if="content.settings.selection"><i class="fa fa-calculator" :aria-label="layoutT('合计')" /></td>
            <td v-for="(item, index) in visibleItems" :key="item.id" :style="{ textAlign: item.align as 'left' | 'center' | 'right' }">
              {{ item.type === 'number' ? formatNumber(aggregateValue(sortedRows.map(entry => entry.row), String(item.field), 'sum'), bounded(item.precision, 0, 6, 0)) : index === 0 ? layoutT('合计') : '' }}
            </td>
          </tr></tfoot>
        </table>
      </div>
      <p v-if="!visibleItems.length" class="layout-empty">{{ layoutT('暂无可见字段') }}</p>
      <p v-else-if="!pageRows.length" class="layout-empty">{{ layoutT('暂无记录') }}</p>
    </template>

    <template v-else-if="content.kind === 'toolbardesign'">
      <div class="layout-toolbar-preview" :class="{ 'is-vertical': content.settings.vertical, 'is-right': content.settings.align === 'right' }" role="toolbar" :aria-label="content.title">
        <template v-for="item in content.items" :key="item.id">
          <span v-if="item.type === 'separator'" class="layout-toolbar-divider" role="separator" />
          <button v-else type="button" class="layout-command" :class="{ 'is-primary': item.variant === 'primary', 'is-danger': item.variant === 'danger', 'is-selected': selectedId === item.id }"
            :title="item.label" :aria-label="item.label" :data-preview-item="item.id"
            :disabled="item.disabled === true || (['edit', 'delete'].includes(String(item.action)) && !toolbarRows.length)" @click="toolbarAction(item)">
            <i v-if="content.settings.mode !== 'text'" :class="['fa', `fa-${item.icon}`]" aria-hidden="true" /><span v-if="content.settings.mode !== 'icon'">{{ item.label }}</span>
          </button>
        </template>
      </div>
      <output class="layout-preview-output" aria-live="polite">{{ toolbarStatus ? layoutT(toolbarStatus.key, toolbarStatus.params) : '' }}</output>
      <div class="layout-table-scroll" tabindex="0" :aria-label="layoutT('操作记录')">
        <table class="layout-preview-table">
          <thead><tr><th>{{ layoutT('选择') }}</th><th v-for="column in content.data.columns.slice(0, 3)" :key="column.key">{{ column.label }}</th></tr></thead>
          <tbody><tr v-for="(row, index) in toolbarRows" :key="index" :class="{ 'is-row-selected': toolbarSelected === index }" @click="toolbarSelected = index">
            <td><input v-model="toolbarSelected" type="radio" :name="`toolbar-selection-${content.kind}`" :value="index" :aria-label="layoutT('选择第 {index} 条记录', { index: index + 1 })"></td>
            <td v-for="column in content.data.columns.slice(0, 3)" :key="column.key">
              <input v-if="toolbarEditing === index && column.type === 'text'" :value="rawValue(row[column.key])" :aria-label="layoutT('编辑{label}', { label: column.label })" @change="editToolbarCell(index, column.key, $event)">
              <template v-else>{{ displayValue(row[column.key], column.type) }}</template>
            </td>
          </tr></tbody>
        </table>
      </div>
      <p v-if="!toolbarRows.length" class="layout-empty">{{ layoutT('暂无记录') }}</p>
    </template>

    <div v-else-if="content.kind === 'menudesign' || content.kind === 'treeviewdesign'" class="layout-navigation-preview" :class="{ 'is-horizontal': content.kind === 'menudesign' && content.settings.direction === 'horizontal' }">
      <nav class="layout-tree-preview" :aria-label="content.title" :role="content.kind === 'treeviewdesign' ? 'tree' : undefined">
        <div v-for="entry in treeRows" :key="entry.item.id" class="layout-tree-row"
          :class="{ 'is-active': activeNode === entry.item.id, 'is-selected': selectedId === entry.item.id, 'is-disabled': entry.item.disabled }"
          :style="{ paddingLeft: `${Math.min(entry.depth, 12) * 16 + 6}px` }"
          :role="content.kind === 'treeviewdesign' ? 'treeitem' : undefined"
          :aria-level="content.kind === 'treeviewdesign' ? entry.depth + 1 : undefined"
          :aria-expanded="hasChildren(entry.item) ? expanded.has(entry.item.id) : undefined"
          :aria-selected="activeNode === entry.item.id">
          <input v-if="content.kind === 'treeviewdesign' && content.settings.checkable" type="checkbox" :aria-label="layoutT('勾选{label}', { label: entry.item.label })"
            :checked="nodeChecked(entry.item)" :indeterminate="nodePartial(entry.item)" :disabled="entry.item.disabled === true"
            @change="checkNode(entry.item, ($event.target as HTMLInputElement).checked)">
          <button type="button" :disabled="entry.item.disabled === true" :data-preview-item="entry.item.id" @click="toggleNode(entry.item)">
            <i :class="['fa', hasChildren(entry.item) ? expanded.has(entry.item.id) ? 'fa-caret-down' : 'fa-caret-right' : 'fa-angle-right']" aria-hidden="true" />
            <i v-if="content.settings.showIcons" :class="['fa', `fa-${entry.item.icon}`]" aria-hidden="true" />
            <span>{{ entry.item.label }}</span>
          </button>
        </div>
      </nav>
      <section class="layout-navigation-content">
        <h3>{{ selectedNode?.label || content.title }}</h3>
        <code v-if="selectedNode?.route">{{ selectedNode.route }}</code>
        <code v-if="selectedNode?.value">{{ selectedNode.value }}</code>
        <p v-if="content.kind === 'treeviewdesign'" class="layout-muted">{{ layoutT('已勾选 {count} 个节点', { count: content.items.filter(item => !hasChildren(item) && checkedNodes.has(item.id)).length }) }}</p>
        <ul v-if="selectedNode && hasChildren(selectedNode)" class="layout-navigation-list">
          <li v-for="child in content.items.filter(item => item.parentId === selectedNode?.id)" :key="child.id">
            <button type="button" :disabled="child.disabled === true" @click="toggleNode(child)"><i :class="['fa', `fa-${child.icon}`]" aria-hidden="true" />{{ child.label }}</button>
          </li>
        </ul>
      </section>
    </div>

    <div v-else-if="content.kind === 'viewdesign'" class="layout-view-grid" :class="{ 'is-stack': content.settings.layout === 'stack' }" :style="{ gap: `${bounded(content.settings.gap, 0, 48, 16)}px` }">
      <ViewBlock v-for="item in viewRoots" :key="item.id" :item="item" :content="content" :selected-id="selectedId" @select="emit('select', $event)" />
    </div>

    <template v-else-if="content.kind === 'mddesign'">
      <label class="layout-preview-search"><i class="fa fa-search" aria-hidden="true" /><input v-model="search" type="search" :aria-label="layoutT('搜索集合')" :placeholder="layoutT('搜索记录')"></label>
      <div v-if="visibleItems.length" class="layout-records" :class="{ 'is-list': content.settings.mode === 'list' }" :style="{ '--record-columns': bounded(content.settings.columns, 1, 4, 2) }">
        <article v-for="entry in pageRows" :key="entry.index" class="layout-record">
          <div v-for="item in visibleItems" :key="item.id" class="layout-record-field" :class="{ 'is-selected': selectedId === item.id, 'is-title': item.type === 'title' }" :data-preview-item="item.id" @click="emit('select', item.id)">
            <h3 v-if="item.type === 'title'">{{ displayField(content, item.field, entry.row[String(item.field)]) }}</h3>
            <template v-else>
              <span class="layout-muted">{{ item.label }}</span>
              <span v-if="item.type === 'badge'" class="layout-badge" :style="{ color: String(item.color) }">{{ displayField(content, item.field, entry.row[String(item.field)]) }}</span>
              <strong v-else-if="item.type === 'number'">{{ formatNumber(entry.row[String(item.field)]) }}{{ entry.row[String(item.field)] == null ? '' : item.unit }}</strong>
              <span v-else>{{ displayField(content, item.field, entry.row[String(item.field)]) }}</span>
            </template>
          </div>
        </article>
      </div>
      <p v-if="!visibleItems.length" class="layout-empty">{{ layoutT('暂无可见字段') }}</p>
      <p v-else-if="!pageRows.length" class="layout-empty">{{ layoutT('暂无记录') }}</p>
    </template>

    <div v-else-if="content.kind === 'dashboarddesign'" class="layout-dashboard" :style="{ gap: `${bounded(content.settings.gap, 0, 48, 16)}px` }">
      <article v-for="item in content.items" :key="item.id" class="layout-portlet" :class="{ 'is-selected': selectedId === item.id }"
        :style="{ gridColumn: `span ${bounded(item.span, 1, 12, 6)}`, minHeight: `${bounded(item.height, 120, 800, 240)}px` }"
        :data-preview-item="item.id" @click="emit('select', item.id)">
        <h3>{{ item.label }}</h3>
        <p v-if="!content.data.rows.length" class="layout-empty">{{ layoutT('暂无记录') }}</p>
        <div v-else-if="item.type === 'metric'" class="layout-metric" :style="{ color: String(item.color) }">
          <strong>{{ formatNumber(aggregateValue(content.data.rows, String(item.field), item.aggregate), item.aggregate === 'avg' ? 2 : 0) }}</strong><span>{{ item.unit }}</span>
        </div>
        <ChartPreview v-else-if="item.type === 'chart'" :option="buildPortletOption(content, item)" :label="item.label" :height="bounded(item.height, 120, 800, 240) - 58" />
        <ol v-else-if="item.type === 'list'" class="layout-portlet-list">
          <li v-for="(row, index) in content.data.rows.slice(0, bounded(item.limit, 1, 20, 5))" :key="index">{{ displayField(content, item.field, row[String(item.field)]) }}</li>
        </ol>
      </article>
    </div>

    <template v-else-if="content.kind === 'chartdesign'">
      <p v-if="!visibleItems.length" class="layout-empty">{{ layoutT('暂无可见系列') }}</p>
      <p v-else-if="!content.data.rows.length" class="layout-empty">{{ layoutT('暂无记录') }}</p>
      <ChartPreview v-else :option="chartOption" :label="content.title" :height="380" />
      <div class="layout-series-summary">
        <button v-for="item in visibleItems" :key="item.id" type="button" :class="{ 'is-selected': selectedId === item.id }" @click="emit('select', item.id)">
          <span class="layout-swatch" :style="{ background: String(item.color) }" /><span>{{ item.label }}</span>
          <strong>{{ formatNumber(aggregateValue(content.data.rows, String(item.yField), item.aggregate), item.aggregate === 'avg' ? 2 : 0) }}</strong>
        </button>
      </div>
    </template>

    <template v-else-if="content.kind === 'bireportdesign'">
      <p v-if="!report.measures.length" class="layout-empty">{{ layoutT('暂无度量') }}</p>
      <p v-else-if="!report.rows.length" class="layout-empty">{{ layoutT('暂无记录') }}</p>
      <ChartPreview v-else :option="chartOption" :label="content.title" :height="340" />
      <div v-if="content.settings.showTable" class="layout-table-scroll" tabindex="0" :aria-label="layoutT('报表明细')">
        <table class="layout-preview-table" data-testid="bi-table">
          <thead><tr>
            <th v-if="!report.groups.length">{{ layoutT('分组') }}</th>
            <th v-for="item in [...report.groups, ...report.measures]" :key="item.id"><button type="button" class="layout-sort-button" :class="{ 'is-selected': selectedId === item.id }" @click="emit('select', item.id)">{{ item.label }}</button></th>
          </tr></thead>
          <tbody><tr v-for="row in report.rows" :key="row.key">
            <td v-if="!report.groups.length">{{ layoutT('全部') }}</td>
            <td v-for="(value, index) in row.groups" :key="`group-${index}`">{{ value == null ? layoutT('空值') : value === '' ? layoutT('空文本') : displayField(content, report.groups[index].field, value) }}</td>
            <td v-for="(value, index) in row.values" :key="`measure-${index}`" class="layout-number">{{ formatNumber(value, bounded(content.settings.precision, 0, 6, 2)) }}</td>
          </tr></tbody>
          <tfoot v-if="content.settings.showTotals"><tr>
            <th :colspan="Math.max(1, report.groups.length)">{{ layoutT('合计') }}</th>
            <td v-for="(value, index) in report.totals" :key="index" class="layout-number">{{ formatNumber(value, bounded(content.settings.precision, 0, 6, 2)) }}</td>
          </tr></tfoot>
        </table>
      </div>
    </template>

    <div v-if="['griddesign', 'mddesign'].includes(content.kind)" class="layout-pagination">
      <span>{{ layoutT('{count} 条记录', { count: sortedRows.length }) }}</span>
      <div class="layout-inline-tools">
        <button type="button" class="layout-icon-button" :title="layoutT('上一页')" :aria-label="layoutT('上一页')" :disabled="currentPage <= 1" @click="page = currentPage - 1"><i class="fa fa-chevron-left" aria-hidden="true" /></button>
        <span>{{ currentPage }} / {{ pageCount }}</span>
        <button type="button" class="layout-icon-button" :title="layoutT('下一页')" :aria-label="layoutT('下一页')" :disabled="currentPage >= pageCount" @click="page = currentPage + 1"><i class="fa fa-chevron-right" aria-hidden="true" /></button>
      </div>
    </div>
  </section>
</template>
