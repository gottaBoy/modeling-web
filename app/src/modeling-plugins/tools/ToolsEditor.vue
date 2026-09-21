<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import type { PluginContent, ValidationIssue } from '../types';
import JsonImport from './JsonImport.vue';
import {
  addTask, updateTask, deleteTask, addTaskComment, filterTasks, taskStatuses,
  addWizardField, updateWizardField, removeWizardField, updateViewWizard, fieldTypes, viewKinds,
  inspectModel, importPerspective, addPerspectiveEntity, updateSettings, importAdvancedModel, consistencyReport, settingDefinitions,
  removeUnsupportedSetting, addMaterial, updateMaterial, deleteMaterial, filterMaterials, exportMaterial,
  importMaterial, previewMaterial, applyMaterial, addSyncChange, previewSync,
  applySyncContent, addSchemaTable, previewSchemaImport, applySchemaImport, toolDefinitions,
} from './definitions';
import type { MaterialPreview, SyncPreview, SchemaPreview } from './definitions';
import { assertValid, cloneJson, isRecord, ToolValidationError, toolErrorText } from './safe';
import { issueText, toolIssue, toolsT } from './messages';
import type { ToolsMessageKey } from './messages';

const props = defineProps<{ pluginId: string; modelValue: PluginContent }>();
const emit = defineEmits<{ (event: 'update:modelValue', value: PluginContent): void }>();
const error = shallowRef<unknown>();
const errorMessage = computed(() => error.value ? toolErrorText(error.value) : '');
const notice = ref<ToolsMessageKey | ''>('');
const selectedTask = ref('');
const selectedMaterial = ref('');
const taskQuery = ref('');
const taskStatus = ref('');
const materialQuery = ref('');
const materialKind = ref('');
const author = ref('');
const comment = ref('');
const reference = ref('');
const search = ref('');
const selectedPath = ref('');
const collapsed = ref<string[]>([]);
const confirmed = ref(false);
const overwrite = ref(false);
const materialPreview = ref<MaterialPreview | null>(null);
const syncPreview = ref<SyncPreview | null>(null);
const schemaPreview = ref<SchemaPreview | null>(null);
const resolutions = ref<Record<string, 'incoming' | 'local'>>({});
const exported = ref('');
const definition = computed(() => toolDefinitions.find(item => item.id === props.pluginId));
const issues = computed(() => definition.value?.validate(props.modelValue) ?? [toolIssue('', '未知工具')]);
const object = (value: unknown): PluginContent => isRecord(value) ? value : {};
const rows = (value: unknown): PluginContent[] => Array.isArray(value) ? value.filter(isRecord) : [];
const strings = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
const text = (value: unknown): string => typeof value === 'string' ? value : '';
const eventValue = (event: Event): string => (event.target as HTMLInputElement).value;
const eventChecked = (event: Event): boolean => (event.target as HTMLInputElement).checked;
const tasks = computed(() => rows(props.modelValue.tasks));
const visibleTasks = computed(() => props.pluginId === 'plm4modeling' && !issues.value.length
  ? filterTasks(props.modelValue, taskQuery.value, taskStatus.value) : tasks.value);
const task = computed(() => visibleTasks.value.find(item => item.id === selectedTask.value) ?? visibleTasks.value[0]);
const materials = computed(() => rows(props.modelValue.materials));
const materialKinds = computed(() => [...new Set(materials.value.map(item => text(item.kind)).filter(Boolean))]);
const visibleMaterials = computed(() => props.pluginId === 'modeling-materials' && !issues.value.length
  ? filterMaterials(props.modelValue, materialQuery.value, materialKind.value) : materials.value);
const material = computed(() => visibleMaterials.value.find(item => item.id === selectedMaterial.value) ?? visibleMaterials.value[0]);
const entity = computed(() => object(props.modelValue.entity));
const fields = computed(() => rows(entity.value.fields));
const view = computed(() => object(props.modelValue.view));
const settings = computed(() => object(props.modelValue.settings));
const unsupportedSettings = computed(() => Object.keys(settings.value).filter(key => !settingDefinitions.some(item => item.key === key)));
const inspection = computed(() => inspectModel(object(props.modelValue.model), search.value));
const visibleNodes = computed(() => inspection.value.matches.filter(node =>
  search.value || !collapsed.value.some(path => node.path !== path && node.path.startsWith(`${path}/`))));
const selectedNode = computed(() => inspection.value.nodes.find(node => node.path === selectedPath.value));
const report = computed(() => props.pluginId === 'ibizmodelingadvanced' ? consistencyReport(props.modelValue) : null);
const schema = computed(() => object(props.modelValue.schema));
const schemaTables = computed(() => rows(schema.value.tables));
const generated = computed(() => object(props.modelValue.generatedModel));
const addLabels: Record<string, ToolsMessageKey> = {
  plm4modeling: '新增任务', ibizappviewcreator: '新增字段', modelperspectivetool: '新增实体',
  ibizmodelingadvanced: '调整分页大小', 'modeling-materials': '新增素材',
  'modeling-sync': '新增传入实体', ibizdbschemaimporter: '新增数据表',
};
const syncStatus: Record<string, ToolsMessageKey> = { ready: '待应用', conflict: '冲突', unchanged: '已一致', 'local-only': '保留本地' };
const syncKind: Record<string, ToolsMessageKey> = { add: '新增', remove: '删除', replace: '修改' };
const nodeTypes: Record<string, ToolsMessageKey> = { object: '对象', array: '数组', string: '文本', number: '数值', boolean: '布尔', null: '空值' };
const syncHasChanges = computed(() => syncPreview.value?.changes.some(change => change.status === 'ready' || change.status === 'conflict'));

function resetPreview(): void {
  materialPreview.value = null;
  syncPreview.value = null;
  schemaPreview.value = null;
  confirmed.value = false;
  resolutions.value = {};
}
watch(() => props.modelValue, () => { resetPreview(); exported.value = ''; }, { deep: true, flush: 'sync' });
watch(overwrite, () => { materialPreview.value = null; confirmed.value = false; });
watch(() => props.pluginId, () => {
  error.value = undefined;
  notice.value = '';
  selectedTask.value = '';
  selectedMaterial.value = '';
  taskQuery.value = '';
  taskStatus.value = '';
  materialQuery.value = '';
  materialKind.value = '';
  search.value = '';
  selectedPath.value = '';
  collapsed.value = [];
  exported.value = '';
  comment.value = '';
  reference.value = '';
  overwrite.value = false;
  resetPreview();
});
watch(() => material.value?.id, () => { materialPreview.value = null; confirmed.value = false; exported.value = ''; });
watch(() => task.value?.id, () => { comment.value = ''; reference.value = ''; });

function action(operation: () => void): void {
  error.value = undefined;
  notice.value = '';
  try { operation(); } catch (reason) {
    error.value = reason;
  }
}
function commit(operation: () => PluginContent): void {
  action(() => {
    const next = operation();
    assertValid(definition.value?.validate(next) ?? [toolIssue('', '未知工具')]);
    emit('update:modelValue', cloneJson(next));
    notice.value = '已更新本地草稿';
  });
}
function replaceSection(key: string, value: PluginContent): void {
  commit(() => sectionValue(key, value));
}
function sectionValue(key: string, value: PluginContent): PluginContent {
  if (key === 'model' && props.pluginId === 'ibizmodelingadvanced') return importAdvancedModel(props.modelValue, value);
  if (key === 'model' && props.pluginId === 'modelperspectivetool') return importPerspective(props.modelValue, value);
  const next = { ...cloneJson(props.modelValue), [key]: cloneJson(value) };
  assertValid(definition.value?.validate(next) ?? [toolIssue('', '未知工具')]);
  return next;
}
function operationIssues(operation: () => unknown): ValidationIssue[] {
  try { operation(); return []; } catch (reason) {
    return reason instanceof ToolValidationError ? reason.issues : [toolIssue('', '导入失败')];
  }
}
function addItem(): void {
  commit(() => {
    switch (props.pluginId) {
      case 'plm4modeling': return addTask(props.modelValue);
      case 'ibizappviewcreator': return addWizardField(props.modelValue);
      case 'modelperspectivetool': return addPerspectiveEntity(props.modelValue);
      case 'ibizmodelingadvanced': return updateSettings(props.modelValue, { pageSize: Number(settings.value.pageSize) % 500 + 1 });
      case 'modeling-materials': return addMaterial(props.modelValue);
      case 'modeling-sync': return addSyncChange(props.modelValue);
      case 'ibizdbschemaimporter': return addSchemaTable(props.modelValue);
      default: throw new ToolValidationError([toolIssue('', '未知工具')]);
    }
  });
}
function editTask(patch: PluginContent): void {
  if (task.value) commit(() => updateTask(props.modelValue, text(task.value!.id), patch));
}
function postComment(): void {
  if (!task.value) return;
  commit(() => addTaskComment(props.modelValue, text(task.value!.id), author.value, comment.value));
  if (!error.value) comment.value = '';
}
function attachReference(): void {
  const refs = Array.isArray(task.value?.modelRefs) ? task.value.modelRefs : [];
  editTask({ modelRefs: [...refs, reference.value] });
  if (!error.value) reference.value = '';
}
function toggleField(id: string, checked: boolean): void {
  const ids = Array.isArray(view.value.fieldIds) ? view.value.fieldIds : [];
  commit(() => updateViewWizard(props.modelValue, 'view', { fieldIds: checked ? [...ids, id] : ids.filter(value => value !== id) }));
}
function toggleNode(path: string): void {
  collapsed.value = collapsed.value.includes(path) ? collapsed.value.filter(item => item !== path) : [...collapsed.value, path];
}
function editMaterial(patch: PluginContent): void {
  if (material.value) commit(() => updateMaterial(props.modelValue, text(material.value!.id), patch));
}
function previewSelectedMaterial(): void {
  action(() => {
    assertValid(issues.value);
    if (!material.value) throw new ToolValidationError([toolIssue('', '请选择素材')]);
    materialPreview.value = previewMaterial(object(props.modelValue.targetModel), object(material.value.model), overwrite.value);
    confirmed.value = false;
  });
}
function applySelectedMaterial(): void {
  if (!material.value || !materialPreview.value) return;
  commit(() => applyMaterial(props.modelValue, text(material.value!.id), {
    confirm: confirmed.value, overwrite: overwrite.value, preview: materialPreview.value!,
  }));
}
function createSyncPreview(): void {
  action(() => {
    assertValid(issues.value);
    syncPreview.value = previewSync(object(props.modelValue.base), object(props.modelValue.target), object(props.modelValue.incoming));
    confirmed.value = false;
    resolutions.value = {};
  });
}
function resolveConflict(path: string, event: Event): void {
  const value = eventValue(event);
  const next = { ...resolutions.value };
  if (value === 'incoming' || value === 'local') next[path] = value;
  else delete next[path];
  resolutions.value = next;
  confirmed.value = false;
}
function importMaterialEnvelope(value: PluginContent): void {
  commit(() => importMaterial(props.modelValue, JSON.stringify(value)));
}
function importMaterialText(): PluginContent {
  return {
    format: 'ibiz-local-material', version: 1,
    material: material.value ?? { id: 'material_import', name: '', kind: '', tags: [], model: {} },
  };
}
function downloadExport(): void {
  action(() => {
    assertValid(typeof document === 'undefined' || typeof Blob === 'undefined' ||
      typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function'
      ? [toolIssue('', '浏览器不支持文件下载')] : []);
    const blob = new Blob([exported.value], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'model-material.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  });
}
function previewSchema(): void {
  action(() => {
    schemaPreview.value = previewSchemaImport(schema.value, generated.value);
    confirmed.value = false;
  });
}
function stringify(value: unknown): string {
  try { return JSON.stringify(value, null, 2) ?? ''; } catch { return toolsT('模型不是可保存的 JSON'); }
}
</script>

<template>
  <section class="local-tools" data-testid="plugin-editor" :data-plugin-id="pluginId">
    <header class="tool-header">
      <h2>{{ definition?.title ?? toolsT('未知工具') }}</h2>
      <button type="button" data-testid="add-item" :disabled="issues.length > 0" @click="addItem">
        <i :class="pluginId === 'ibizmodelingadvanced' ? 'fa fa-cog' : 'fa fa-plus'" aria-hidden="true"></i>
        {{ toolsT(addLabels[pluginId] ?? '未知工具') }}
      </button>
    </header>
    <p v-if="errorMessage" class="tool-error" role="alert" data-testid="tool-error">{{ errorMessage }}</p>
    <p v-if="notice" class="tool-notice" role="status">{{ toolsT(notice) }}</p>
    <ul v-if="issues.length" class="tool-error" :aria-label="toolsT('模型校验')">
      <li v-for="(issue, index) in issues" :key="index">{{ issue.path }}: {{ issueText(issue) }}</li>
    </ul>

    <template v-if="pluginId === 'plm4modeling'">
      <JsonImport :label="toolsT('导入关联模型 JSON')" :value="object(modelValue.model)" :validate="value => operationIssues(() => sectionValue('model', value))" @import="replaceSection('model', $event)" />
      <div class="tool-columns">
        <div>
          <h3>{{ toolsT('本地协作任务') }} <span>{{ tasks.length }}</span></h3>
          <label class="search-field"><i class="fa fa-search" aria-hidden="true"></i><input v-model="taskQuery" type="search" :aria-label="toolsT('搜索任务')" :placeholder="toolsT('搜索任务标题、负责人或评论')" /></label>
          <select v-model="taskStatus" :aria-label="toolsT('筛选任务状态')"><option value="">{{ toolsT('所有状态') }}</option><option v-for="status in taskStatuses" :key="status.value" :value="status.value">{{ status.label }}</option></select>
          <p v-if="!tasks.length" class="empty">{{ toolsT('暂无任务') }}</p>
          <p v-else-if="!visibleTasks.length" class="empty">{{ toolsT('无匹配任务') }}</p>
          <ul class="select-list" :aria-label="toolsT('本地协作任务')">
            <li v-for="item in visibleTasks" :key="text(item.id)">
              <button type="button" :aria-pressed="task?.id === item.id" @click="selectedTask = text(item.id)">
                <i class="fa fa-tasks" aria-hidden="true"></i>
                <span>{{ item.title }}</span>
                <small>{{ taskStatuses.find(status => status.value === item.status)?.label }}</small>
              </button>
            </li>
          </ul>
        </div>
        <div v-if="task" class="detail">
          <div class="tool-row">
            <h3>{{ task.id }}</h3>
            <button type="button" class="icon-button danger" :title="toolsT('删除任务')" :aria-label="toolsT('删除任务')" @click="commit(() => deleteTask(modelValue, text(task!.id)))"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </div>
          <label>{{ toolsT('任务标题') }}<input :value="task.title" :aria-label="toolsT('任务标题')" @change="editTask({ title: eventValue($event) })" /></label>
          <div class="form-grid">
            <label>{{ toolsT('负责人') }}<input :value="task.assignee" :aria-label="toolsT('负责人')" @change="editTask({ assignee: eventValue($event) })" /></label>
            <label>{{ toolsT('状态') }}<select :value="task.status" :aria-label="toolsT('任务状态')" @change="editTask({ status: eventValue($event) })">
              <option v-for="status in taskStatuses" :key="status.value" :value="status.value">{{ status.label }}</option>
            </select></label>
          </div>
          <h3>{{ toolsT('模型引用') }}</h3>
          <ul class="plain-list">
            <li v-for="refPath in strings(task.modelRefs)" :key="refPath" class="tool-row">
              <code>{{ refPath || '#' }}</code>
              <button type="button" class="icon-button" :title="toolsT('移除引用')" :aria-label="toolsT('移除引用')" @click="editTask({ modelRefs: strings(task.modelRefs).filter(path => path !== refPath) })"><i class="fa fa-unlink" aria-hidden="true"></i></button>
            </li>
          </ul>
          <div class="tool-row"><input v-model="reference" :aria-label="toolsT('模型引用路径')" placeholder="#/getPSDataEntities/0" />
            <button type="button" class="icon-button" :title="toolsT('关联模型')" :aria-label="toolsT('关联模型')" @click="attachReference"><i class="fa fa-link" aria-hidden="true"></i></button></div>
          <h3>{{ toolsT('评论') }}</h3>
          <ul class="plain-list"><li v-for="item in rows(task.comments)" :key="text(item.id)" class="comment"><strong>{{ item.author }}</strong><p>{{ item.body }}</p></li></ul>
          <label>{{ toolsT('评论作者') }}<input v-model="author" :aria-label="toolsT('评论作者')" /></label>
          <label>{{ toolsT('评论内容') }}<textarea v-model="comment" :aria-label="toolsT('评论内容')" rows="3"></textarea></label>
          <button type="button" :disabled="!comment.trim() || !author.trim()" @click="postComment"><i class="fa fa-comment-o" aria-hidden="true"></i> {{ toolsT('添加评论') }}</button>
        </div>
      </div>
    </template>

    <template v-else-if="pluginId === 'ibizappviewcreator'">
      <div class="form-grid">
        <label>{{ toolsT('实体名称') }}<input :value="entity.name" :aria-label="toolsT('实体名称')" @change="commit(() => updateViewWizard(modelValue, 'entity', { name: eventValue($event) }))" /></label>
        <label>{{ toolsT('实体代码名') }}<input :value="entity.codeName" :aria-label="toolsT('实体代码名')" @change="commit(() => updateViewWizard(modelValue, 'entity', { codeName: eventValue($event) }))" /></label>
        <label>{{ toolsT('视图标题') }}<input :value="view.caption" :aria-label="toolsT('视图标题')" @change="commit(() => updateViewWizard(modelValue, 'view', { caption: eventValue($event) }))" /></label>
        <label>{{ toolsT('视图代码名') }}<input :value="view.codeName" :aria-label="toolsT('视图代码名')" @change="commit(() => updateViewWizard(modelValue, 'view', { codeName: eventValue($event) }))" /></label>
      </div>
      <div class="mode-options" role="group" :aria-label="toolsT('视图类型')">
        <label v-for="kind in viewKinds" :key="kind.value"><input type="radio" name="local-view-kind" :value="kind.value" :checked="view.kind === kind.value" @change="commit(() => updateViewWizard(modelValue, 'view', { kind: kind.value }))" />{{ kind.label }}</label>
      </div>
      <div class="table-scroll">
        <table :aria-label="toolsT('实体字段')"><thead><tr><th>{{ toolsT('使用') }}</th><th>{{ toolsT('名称') }}</th><th>{{ toolsT('代码名') }}</th><th>{{ toolsT('类型') }}</th><th>{{ toolsT('主键') }}</th><th>{{ toolsT('必填') }}</th><th>{{ toolsT('操作') }}</th></tr></thead>
          <tbody><tr v-for="field in fields" :key="text(field.id)">
            <td><input type="checkbox" :aria-label="toolsT('选择字段 {name}', { name: field.name })" :checked="strings(view.fieldIds).includes(text(field.id))" @change="toggleField(text(field.id), eventChecked($event))" /></td>
            <td><input :value="field.name" :aria-label="toolsT('字段名称 {id}', { id: field.id })" @change="commit(() => updateWizardField(modelValue, text(field.id), { name: eventValue($event) }))" /></td>
            <td><input :value="field.codeName" :aria-label="toolsT('字段代码名 {id}', { id: field.id })" @change="commit(() => updateWizardField(modelValue, text(field.id), { codeName: eventValue($event) }))" /></td>
            <td><select :value="field.type" :aria-label="toolsT('字段类型 {id}', { id: field.id })" @change="commit(() => updateWizardField(modelValue, text(field.id), { type: eventValue($event) }))"><option v-for="type in fieldTypes" :key="type.value" :value="type.value">{{ type.label }}</option></select></td>
            <td><input type="checkbox" :checked="field.primaryKey === true" :aria-label="toolsT('主键 {id}', { id: field.id })" @change="commit(() => updateWizardField(modelValue, text(field.id), { primaryKey: eventChecked($event), required: eventChecked($event) || field.required === true }))" /></td>
            <td><input type="checkbox" :checked="field.required === true" :aria-label="toolsT('必填 {id}', { id: field.id })" @change="commit(() => updateWizardField(modelValue, text(field.id), { required: eventChecked($event) }))" /></td>
            <td><button type="button" class="icon-button danger" :title="toolsT('删除字段 {id}', { id: field.id })" :aria-label="toolsT('删除字段 {id}', { id: field.id })" @click="commit(() => removeWizardField(modelValue, text(field.id)))"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
          </tr></tbody>
        </table>
      </div>
      <h3>{{ toolsT('视图预览') }}</h3>
      <div class="view-preview" data-testid="generated-view">
        <h4>{{ view.caption }}</h4>
        <div v-if="view.kind === 'edit'" class="form-grid">
          <label v-for="field in fields.filter(item => strings(view.fieldIds).includes(text(item.id)))" :key="text(field.id)">{{ field.name }}{{ field.required ? ' *' : '' }}
            <input :type="field.type === 'boolean' ? 'checkbox' : field.type === 'datetime' ? 'datetime-local' : field.type === 'integer' || field.type === 'decimal' ? 'number' : 'text'" :aria-label="toolsT('预览 {name}', { name: field.name })" />
          </label>
        </div>
        <div v-else class="preview-head"><span v-for="field in fields.filter(item => strings(view.fieldIds).includes(text(item.id)))" :key="text(field.id)">{{ field.name }}</span></div>
      </div>
      <details><summary>{{ toolsT('生成的 PS 视图模型') }}</summary><pre data-testid="generated-model">{{ stringify(generated) }}</pre></details>
    </template>

    <template v-else-if="pluginId === 'modelperspectivetool'">
      <div class="tool-row">
        <JsonImport :label="toolsT('导入结构化模型 JSON')" :value="object(modelValue.model)" :validate="value => operationIssues(() => sectionValue('model', value))" @import="replaceSection('model', $event)" />
        <label class="search-field"><i class="fa fa-search" aria-hidden="true"></i><input v-model="search" type="search" :aria-label="toolsT('搜索模型')" :placeholder="toolsT('搜索名称、路径或值')" /></label>
      </div>
      <div class="tool-stats"><span>{{ toolsT('{count} 个节点', { count: inspection.nodes.length }) }}</span><span>{{ toolsT('{count} 个引用', { count: inspection.referenceCount }) }}</span><span>{{ toolsT('{count} 个问题', { count: inspection.issues.length }) }}</span></div>
      <div class="tool-columns model-columns">
        <div class="model-tree" :aria-label="toolsT('模型层级')">
          <p v-if="!visibleNodes.length" class="empty">{{ toolsT('无匹配节点') }}</p>
          <div v-for="node in visibleNodes" :key="node.path" class="tree-row" :style="{ paddingLeft: `${Math.min(node.depth, 8) * 12}px` }">
            <button v-if="node.type === 'object' || node.type === 'array'" type="button" class="icon-button" :title="toolsT(collapsed.includes(node.path) ? '展开' : '折叠')" :aria-label="toolsT(collapsed.includes(node.path) ? '展开 {name}' : '折叠 {name}', { name: node.label })" :aria-expanded="!collapsed.includes(node.path)" @click="toggleNode(node.path)"><i :class="collapsed.includes(node.path) ? 'fa fa-caret-right' : 'fa fa-caret-down'" aria-hidden="true"></i></button>
            <span v-else class="tree-spacer"></span>
            <button type="button" class="tree-node" :aria-pressed="selectedPath === node.path" @click="selectedPath = node.path"><span>{{ node.label }}</span><small>{{ toolsT(nodeTypes[node.type]) }}</small></button>
          </div>
        </div>
        <div class="detail"><h3>{{ selectedNode?.label ?? toolsT('节点详情') }}</h3><code>{{ selectedNode?.path || '#' }}</code><pre>{{ stringify(selectedNode?.value) }}</pre></div>
      </div>
      <h3>{{ toolsT('引用与一致性诊断') }}</h3>
      <p v-if="!inspection.issues.length" class="tool-notice">{{ toolsT('未发现导入模型内的引用或标识问题') }}</p>
      <ul class="plain-list"><li v-for="(issue, index) in inspection.issues" :key="index"><button type="button" class="diagnostic" @click="selectedPath = issue.path">{{ issue.path }}: {{ issueText(issue) }}</button></li></ul>
    </template>

    <template v-else-if="pluginId === 'ibizmodelingadvanced'">
      <div class="form-grid">
        <label>{{ toolsT('系统名称') }}<input :value="settings.systemName" :aria-label="toolsT('系统名称')" @change="commit(() => updateSettings(modelValue, { systemName: eventValue($event) }))" /></label>
        <label>{{ toolsT('语言') }}<select :value="settings.locale" :aria-label="toolsT('语言')" @change="commit(() => updateSettings(modelValue, { locale: eventValue($event) }))"><option value="zh-CN">{{ toolsT('简体中文') }}</option><option value="en-US">{{ toolsT('英语') }}</option></select></label>
        <label>{{ toolsT('默认分页大小') }}<input type="number" min="1" max="500" step="1" :value="settings.pageSize" :aria-label="toolsT('默认分页大小')" @change="commit(() => updateSettings(modelValue, { pageSize: Number(eventValue($event)) }))" /></label>
      </div>
      <div class="mode-options">
        <label><input type="checkbox" :checked="settings.strictReferences === true" @change="commit(() => updateSettings(modelValue, { strictReferences: eventChecked($event) }))" />{{ toolsT('严格引用检查') }}</label>
        <label><input type="checkbox" :checked="settings.readOnly === true" @change="commit(() => updateSettings(modelValue, { readOnly: eventChecked($event) }))" />{{ toolsT('只读模型') }}</label>
      </div>
      <ul v-if="unsupportedSettings.length" class="plain-list"><li v-for="key in unsupportedSettings" :key="key" class="tool-row"><code>{{ key }}</code><button type="button" @click="action(() => emit('update:modelValue', removeUnsupportedSetting(modelValue, key)))"><i class="fa fa-trash-o" aria-hidden="true"></i> {{ toolsT('删除非白名单设置') }}</button></li></ul>
      <JsonImport v-if="!settings.readOnly" :label="toolsT('导入待检查模型 JSON')" :value="object(modelValue.model)" :validate="value => operationIssues(() => sectionValue('model', value))" @import="replaceSection('model', $event)" />
      <h3>{{ toolsT('模型一致性报告') }}</h3>
      <div v-if="report" data-testid="consistency-report">
        <div class="tool-stats"><strong :class="report.valid ? 'tool-notice' : 'tool-error'">{{ toolsT(report.valid ? '检查通过' : '检查未通过') }}</strong><span>{{ toolsT('{count} 个节点', { count: report.nodeCount }) }}</span><span>{{ toolsT('{count} 个引用', { count: report.referenceCount }) }}</span></div>
        <ul class="plain-list"><li v-for="(issue, index) in report.issues" :key="index" class="tool-error">{{ issue.path }}: {{ issueText(issue) }}</li><li v-for="(issue, index) in report.warnings" :key="`warning-${index}`" class="tool-warning">{{ issue.path }}: {{ issueText(issue) }}</li></ul>
      </div>
    </template>

    <template v-else-if="pluginId === 'modeling-materials'">
      <div class="tool-row">
        <JsonImport :label="toolsT('导入素材 JSON')" :value="importMaterialText()" :validate="value => operationIssues(() => importMaterial(modelValue, JSON.stringify(value)))" @import="importMaterialEnvelope" />
        <JsonImport :label="toolsT('导入目标模型 JSON')" :value="object(modelValue.targetModel)" :validate="value => operationIssues(() => sectionValue('targetModel', value))" @import="replaceSection('targetModel', $event)" />
      </div>
      <div class="tool-columns">
        <div><h3>{{ toolsT('本地素材') }} <span>{{ materials.length }}</span></h3>
          <label class="search-field"><i class="fa fa-search" aria-hidden="true"></i><input v-model="materialQuery" type="search" :aria-label="toolsT('搜索素材')" :placeholder="toolsT('搜索素材名称、分类或标签')" /></label>
          <select v-model="materialKind" :aria-label="toolsT('筛选素材分类')"><option value="">{{ toolsT('所有分类') }}</option><option v-for="kind in materialKinds" :key="kind" :value="kind">{{ kind }}</option></select>
          <p v-if="!materials.length" class="empty">{{ toolsT('暂无素材') }}</p>
          <p v-else-if="!visibleMaterials.length" class="empty">{{ toolsT('无匹配素材') }}</p>
          <ul class="select-list"><li v-for="item in visibleMaterials" :key="text(item.id)"><button type="button" :aria-pressed="material?.id === item.id" @click="selectedMaterial = text(item.id)"><i class="fa fa-cube" aria-hidden="true"></i><span>{{ item.name }}</span><small>{{ item.kind }}</small></button></li></ul>
        </div>
        <div v-if="material" class="detail">
          <div class="tool-row"><h3>{{ material.id }}</h3><button type="button" class="icon-button danger" :title="toolsT('删除素材')" :aria-label="toolsT('删除素材')" @click="commit(() => deleteMaterial(modelValue, text(material!.id)))"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div>
          <label>{{ toolsT('素材名称') }}<input :value="material.name" :aria-label="toolsT('素材名称')" @change="editMaterial({ name: eventValue($event) })" /></label>
          <label>{{ toolsT('分类') }}<input :value="material.kind" :aria-label="toolsT('素材分类')" @change="editMaterial({ kind: eventValue($event) })" /></label>
          <label>{{ toolsT('标签') }}<input :value="strings(material.tags).join(', ')" :aria-label="toolsT('素材标签')" @change="editMaterial({ tags: eventValue($event).split(/[,，]/).map(tag => tag.trim()).filter(Boolean) })" /></label>
          <JsonImport :label="toolsT('编辑素材模型 JSON')" :value="object(material.model)" :validate="value => operationIssues(() => updateMaterial(modelValue, text(material!.id), { model: value }))" @import="editMaterial({ model: $event })" />
          <label class="inline-check"><input v-model="overwrite" type="checkbox" />{{ toolsT('覆盖冲突值') }}</label>
          <div class="tool-row"><button type="button" :disabled="issues.length > 0" @click="previewSelectedMaterial"><i class="fa fa-search" aria-hidden="true"></i> {{ toolsT('预览应用') }}</button><button type="button" :disabled="issues.length > 0" @click="action(() => exported = exportMaterial(modelValue, text(material!.id)))"><i class="fa fa-download" aria-hidden="true"></i> {{ toolsT('导出素材') }}</button></div>
        </div>
      </div>
      <div v-if="materialPreview" class="tool-band">
        <h3>{{ toolsT('素材应用预览') }}</h3><p>{{ toolsT(materialPreview.unchanged ? '目标未变化' : '目标存在变更') }} · {{ toolsT('{count} 个冲突', { count: materialPreview.conflicts.length }) }}</p>
        <ul class="plain-list"><li v-for="issue in materialPreview.conflicts" :key="issue.path" class="tool-warning">{{ issue.path }}: {{ issueText(issue) }}</li></ul>
        <pre>{{ stringify(materialPreview.result) }}</pre>
        <label class="inline-check"><input v-model="confirmed" type="checkbox" />{{ toolsT('确认应用素材') }}</label>
        <button type="button" :disabled="!confirmed || materialPreview.unchanged || (materialPreview.conflicts.length > 0 && !overwrite)" @click="applySelectedMaterial"><i class="fa fa-check" aria-hidden="true"></i> {{ toolsT('应用素材') }}</button>
      </div>
      <div v-if="exported" class="tool-band"><h3>{{ toolsT('素材导出') }}</h3><button type="button" @click="downloadExport"><i class="fa fa-download" aria-hidden="true"></i> {{ toolsT('下载 JSON') }}</button><pre>{{ exported }}</pre></div>
      <details><summary>{{ toolsT('目标模型') }}</summary><pre>{{ stringify(modelValue.targetModel) }}</pre></details>
    </template>

    <template v-else-if="pluginId === 'modeling-sync'">
      <div class="tool-row">
        <JsonImport :label="toolsT('导入基线模型 JSON')" :value="object(modelValue.base)" :validate="value => operationIssues(() => sectionValue('base', value))" @import="replaceSection('base', $event)" />
        <JsonImport :label="toolsT('导入当前模型 JSON')" :value="object(modelValue.target)" :validate="value => operationIssues(() => sectionValue('target', value))" @import="replaceSection('target', $event)" />
        <JsonImport :label="toolsT('导入传入模型 JSON')" :value="object(modelValue.incoming)" :validate="value => operationIssues(() => sectionValue('incoming', value))" @import="replaceSection('incoming', $event)" />
        <button type="button" :disabled="issues.length > 0" @click="createSyncPreview"><i class="fa fa-exchange" aria-hidden="true"></i> {{ toolsT('比较模型') }}</button>
      </div>
      <template v-if="syncPreview">
        <div class="tool-stats"><span>{{ toolsT('{count} 个差异项', { count: syncPreview.changes.length }) }}</span><span>{{ toolsT('{count} 个冲突', { count: syncPreview.conflictCount }) }}</span><span>{{ toolsT('{count} 个未变更项', { count: syncPreview.unchangedCount }) }}</span></div>
        <p v-if="!syncHasChanges" class="tool-notice">{{ toolsT(!syncPreview.changes.length ? '三个模型一致，无需同步' : '无待应用变更') }}</p>
        <div class="table-scroll"><table :aria-label="toolsT('同步差异')" data-testid="sync-diff"><thead><tr><th>{{ toolsT('路径') }}</th><th>{{ toolsT('操作') }}</th><th>{{ toolsT('状态') }}</th><th>{{ toolsT('基线') }}</th><th>{{ toolsT('当前') }}</th><th>{{ toolsT('传入') }}</th><th>{{ toolsT('冲突决策') }}</th></tr></thead><tbody>
          <tr v-for="change in syncPreview.changes" :key="change.path">
            <td><code>{{ change.path || '#' }}</code></td><td>{{ toolsT(syncKind[change.kind]) }}</td><td :class="change.status === 'conflict' ? 'tool-error' : ''">{{ toolsT(syncStatus[change.status]) }}</td>
            <td><pre>{{ change.baseExists ? stringify(change.base) : toolsT('不存在') }}</pre></td><td><pre>{{ change.targetExists ? stringify(change.target) : toolsT('不存在') }}</pre></td><td><pre>{{ change.incomingExists ? stringify(change.incoming) : toolsT('不存在') }}</pre></td>
            <td><select v-if="change.status === 'conflict'" :value="resolutions[change.path] ?? ''" :aria-label="toolsT('冲突决策 {path}', { path: change.path })" @change="resolveConflict(change.path, $event)"><option value="">{{ toolsT('未决策') }}</option><option value="local">{{ toolsT('保留当前') }}</option><option value="incoming">{{ toolsT('采用传入') }}</option></select><span v-else>{{ toolsT('无冲突') }}</span></td>
          </tr>
        </tbody></table></div>
        <label class="inline-check"><input v-model="confirmed" type="checkbox" />{{ toolsT('确认应用上述变更（含删除）') }}</label>
        <button type="button" :disabled="!confirmed || !syncHasChanges || syncPreview.changes.some(change => change.status === 'conflict' && !resolutions[change.path])" @click="commit(() => applySyncContent(modelValue, syncPreview!, { confirm: confirmed, resolutions }))"><i class="fa fa-check" aria-hidden="true"></i> {{ toolsT('应用同步') }}</button>
      </template>
      <details><summary>{{ toolsT('当前目标模型') }}</summary><pre>{{ stringify(modelValue.target) }}</pre></details>
    </template>

    <template v-else-if="pluginId === 'ibizdbschemaimporter'">
      <div class="tool-row"><h3>{{ toolsT('关系模式 JSON') }}</h3><JsonImport :label="toolsT('导入关系模式 JSON')" :value="schema" :validate="value => operationIssues(() => sectionValue('schema', value))" @import="replaceSection('schema', $event)" /><button type="button" :disabled="issues.length > 0" @click="previewSchema"><i class="fa fa-search" aria-hidden="true"></i> {{ toolsT('预览 PS 实体') }}</button></div>
      <p v-if="!schemaTables.length" class="empty">{{ toolsT('暂无数据表') }}</p>
      <div v-for="table in schemaTables" :key="text(table.name)" class="tool-band">
        <h3><i class="fa fa-table" aria-hidden="true"></i> {{ table.label ?? table.name }} <code>{{ table.name }}</code></h3>
        <div class="table-scroll"><table :aria-label="toolsT('数据表 {name}', { name: table.name })"><thead><tr><th>{{ toolsT('字段') }}</th><th>{{ toolsT('类型') }}</th><th>{{ toolsT('长度 / 精度') }}</th><th>{{ toolsT('主键') }}</th><th>{{ toolsT('可空') }}</th></tr></thead><tbody><tr v-for="column in rows(table.columns)" :key="text(column.name)"><td>{{ column.name }}</td><td>{{ column.type }}</td><td>{{ column.length ?? column.precision ?? '' }}{{ column.scale !== undefined ? ` / ${column.scale}` : '' }}</td><td>{{ toolsT(strings(table.primaryKey).includes(text(column.name)) ? '是' : '否') }}</td><td>{{ toolsT(column.nullable === false || strings(table.primaryKey).includes(text(column.name)) ? '否' : '是') }}</td></tr></tbody></table></div>
        <ul class="plain-list"><li v-for="fk in rows(table.foreignKeys)" :key="text(fk.name)"><i class="fa fa-link" aria-hidden="true"></i> {{ fk.name }}: {{ stringify(fk.columns) }} → {{ object(fk.references).table }} {{ stringify(object(fk.references).columns) }}</li></ul>
      </div>
      <div v-if="schemaPreview" class="tool-band" data-testid="schema-preview">
        <h3>{{ toolsT('PS 实体映射预览') }}</h3><div class="tool-stats"><span>{{ toolsT('{count} 个实体', { count: schemaPreview.tableCount }) }}</span><span>{{ toolsT('{count} 个字段', { count: schemaPreview.fieldCount }) }}</span><span>{{ toolsT('{count} 个关系', { count: schemaPreview.relationCount }) }}</span></div>
        <ul class="plain-list"><li v-for="(issue, index) in schemaPreview.issues" :key="index" class="tool-error">{{ issue.path }}: {{ issueText(issue) }}</li></ul>
        <template v-if="schemaPreview.merge">
          <p>{{ toolsT(schemaPreview.merge.unchanged ? '目标未变化' : '目标存在变更') }} · {{ toolsT('{count} 个冲突', { count: schemaPreview.merge.conflicts.length }) }}</p>
          <ul class="plain-list"><li v-for="issue in schemaPreview.merge.conflicts" :key="issue.path" class="tool-warning">{{ issue.path }}: {{ toolsT('已有模型存在不同值，请在增量同步工具中处理') }}</li></ul>
        </template>
        <pre>{{ stringify(schemaPreview.model) }}</pre>
        <label class="inline-check"><input v-model="confirmed" type="checkbox" />{{ toolsT('确认生成上述 PS 模型') }}</label>
        <button type="button" :disabled="!confirmed || schemaPreview.issues.length > 0 || schemaPreview.merge?.unchanged || (schemaPreview.merge?.conflicts.length ?? 0) > 0" @click="commit(() => applySchemaImport(modelValue, schemaPreview!, confirmed))"><i class="fa fa-check" aria-hidden="true"></i> {{ toolsT('应用导入') }}</button>
      </div>
      <details><summary>{{ toolsT('已生成模型') }}</summary><pre data-testid="generated-model">{{ stringify(generated) }}</pre></details>
    </template>
  </section>
</template>

<style scoped>
.local-tools { color: #25312e; background: #fff; padding: 20px; min-width: 0; font-size: 14px; letter-spacing: 0; }
.local-tools :deep(*) { box-sizing: border-box; letter-spacing: 0; }
.local-tools h2 { font-size: 19px; line-height: 1.4; margin: 0; overflow-wrap: anywhere; }
.local-tools h3 { font-size: 15px; margin: 18px 0 12px; line-height: 1.5; overflow-wrap: anywhere; }
.local-tools h4 { font-size: 14px; margin: 0 0 16px; }
.local-tools h3 span, .local-tools small { color: #63716c; font-weight: 400; }
.local-tools :deep(button) { color: #263b34; background: #f7f9f8; border: 1px solid #ced8d3; border-radius: 4px; min-height: 34px; padding: 6px 10px; font: inherit; line-height: 1.4; cursor: pointer; overflow-wrap: anywhere; }
.local-tools :deep(button:hover:not(:disabled)) { background: #e6f2eb; border-color: #84ad98; }
.local-tools :deep(button:disabled) { cursor: not-allowed; opacity: .5; }
.local-tools :deep(button:focus-visible), .local-tools :deep(input:focus-visible), .local-tools :deep(select:focus-visible), .local-tools :deep(textarea:focus-visible) { outline: 2px solid #258263; outline-offset: 2px; }
.local-tools :deep(button i) { margin-right: 5px; }
.local-tools .icon-button { width: 34px; height: 34px; min-width: 34px; flex: 0 0 34px; padding: 6px; }
.local-tools .icon-button i { margin: 0; }
.tool-header, .tool-row { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; min-width: 0; }
.tool-header { justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid #dce3df; margin-bottom: 16px; }
.tool-row h3 { flex: 1; margin: 10px 0; }
.tool-row > input { flex: 1; min-width: 160px; }
.local-tools :deep(label) { display: flex; flex-direction: column; gap: 6px; min-width: 0; line-height: 1.5; margin: 10px 0; overflow-wrap: anywhere; }
.local-tools :deep(input:not([type=checkbox]):not([type=radio])), .local-tools :deep(select), .local-tools :deep(textarea) { width: 100%; min-width: 0; max-width: 100%; min-height: 34px; padding: 6px 8px; border: 1px solid #c9d4ce; border-radius: 4px; background: #fff; color: #263b34; font: inherit; }
.local-tools :deep(textarea) { resize: vertical; line-height: 1.5; }
.local-tools input[type=checkbox], .local-tools input[type=radio] { width: 16px; height: 16px; margin: 0; flex: 0 0 16px; accent-color: #258263; }
.local-tools .inline-check, .mode-options label, .local-tools .search-field { flex-direction: row; align-items: center; gap: 8px; }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 18px; }
.mode-options { display: flex; flex-wrap: wrap; gap: 8px 24px; margin: 8px 0 16px; }
.tool-columns { display: grid; grid-template-columns: minmax(190px, 1fr) minmax(0, 2fr); gap: 24px; margin-top: 16px; }
.tool-columns > * { min-width: 0; }
.detail { border-left: 1px solid #dce3df; padding-left: 24px; }
.select-list, .plain-list { list-style: none; padding: 0; margin: 0; }
.select-list li { border-bottom: 1px solid #e0e6e2; }
.select-list button { width: 100%; display: flex; align-items: center; gap: 8px; border: 0; border-radius: 0; text-align: left; background: transparent; padding: 12px 8px; }
.select-list button span { flex: 1; overflow-wrap: anywhere; }
.select-list button[aria-pressed=true], .tree-node[aria-pressed=true] { background: #e6f2eb; color: #176746; }
.plain-list li { padding: 6px 0; overflow-wrap: anywhere; }
.comment { border-bottom: 1px solid #e2e7e4; }
.comment p { white-space: pre-wrap; margin: 6px 0; }
.local-tools pre { font-size: 12px; line-height: 1.6; padding: 12px; background: #f4f6f5; white-space: pre-wrap; overflow-wrap: anywhere; max-height: 380px; overflow: auto; max-width: 100%; }
.local-tools code { font-size: 12px; overflow-wrap: anywhere; }
.tool-stats { display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0; }
.tool-error { color: #a42c3a; white-space: pre-wrap; overflow-wrap: anywhere; }
.tool-notice { color: #216b4e; overflow-wrap: anywhere; }
.tool-warning { color: #805511; overflow-wrap: anywhere; }
.local-tools .danger { color: #a42c3a; }
.empty { color: #6d7772; padding: 18px 0; }
.table-scroll { width: 100%; overflow-x: auto; margin: 14px 0; }
.local-tools table { border-collapse: collapse; width: 100%; font-size: 13px; text-align: left; }
.local-tools th { background: #f0f4f1; color: #40574c; font-weight: 600; }
.local-tools th, .local-tools td { padding: 10px; border-bottom: 1px solid #dce3df; overflow-wrap: anywhere; vertical-align: top; min-width: 60px; }
.local-tools td input:not([type=checkbox]), .local-tools td select { min-width: 100px; }
.local-tools td pre { min-width: 100px; max-width: 260px; max-height: 160px; margin: 0; padding: 4px; }
.view-preview { border: 1px solid #ced8d3; border-radius: 4px; padding: 16px; margin-bottom: 18px; }
.preview-head { display: flex; gap: 12px; flex-wrap: wrap; border-bottom: 1px solid #ced8d3; padding: 12px 0; }
.preview-head span { flex: 1; min-width: 100px; overflow-wrap: anywhere; }
.tool-band { border-top: 1px solid #dce3df; margin-top: 20px; padding-top: 4px; }
.model-tree { max-height: 540px; overflow: auto; }
.tree-row { display: flex; align-items: center; min-height: 34px; }
.tree-spacer { width: 34px; flex: 0 0 34px; }
.local-tools .tree-node { border: 0; display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; text-align: left; background: transparent; }
.tree-node span { overflow-wrap: anywhere; flex: 1; }
.tree-node small { flex-shrink: 0; }
.local-tools .diagnostic { border: 0; background: transparent; text-align: left; color: #a42c3a; }
.local-tools :deep(.json-import-input) { border-left: 3px solid #a5c6b2; margin: 12px 0; padding: 0 14px 12px; }
.local-tools :deep(.json-import) { min-width: 0; max-width: 100%; }
.tool-row :deep(.json-import:has(.json-import-input)) { flex-basis: 100%; }
.local-tools details { margin: 18px 0; }
.local-tools summary { cursor: pointer; padding: 8px 0; color: #365c49; }
@media (max-width: 720px) {
  .local-tools { padding: 14px; }
  .tool-columns, .form-grid { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .detail { border-left: 0; border-top: 1px solid #dce3df; padding: 8px 0 0; }
  .model-tree { max-height: 320px; }
  .tool-header { align-items: flex-start; }
  .tool-header h2 { flex-basis: 100%; }
}
</style>
