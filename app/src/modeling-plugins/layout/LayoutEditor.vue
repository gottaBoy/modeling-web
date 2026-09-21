<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { PluginContent } from '../types';
import { locale } from '../i18n';
import type { LayoutContent, LayoutItem } from './schema';
import { cloneValue, getLayoutSchema, readableContent } from './schema';
import { addLayoutItem, changeItemType, moveLayoutItem, removeLayoutItem, updateLayoutItem, updateLayoutSettings } from './operations';
import { hierarchyRows } from './preview';
import { validateLayout } from './validation';
import { layoutT } from './messages';
import DatasetEditor from './DatasetEditor.vue';
import LayoutPreview from './LayoutPreview.vue';
import PropertyFields from './PropertyFields.vue';
import './layout.css';

const props = defineProps<{ pluginId: string; modelValue: PluginContent }>();
const emit = defineEmits<{ 'update:modelValue': [content: PluginContent] }>();
const schema = computed(() => getLayoutSchema(props.pluginId));
const content = computed(() => schema.value ? readableContent(schema.value.id, props.modelValue) : undefined);
const selectedId = ref('');
const tab = ref<'preview' | 'data'>('preview');
const inspector = ref<'item' | 'settings'>('item');
const issues = computed(() => schema.value ? validateLayout(schema.value.id, props.modelValue) : []);
const selected = computed(() => content.value?.items.find(item => item.id === selectedId.value));
const palette = computed(() => schema.value?.palette.find(entry => entry.type === selected.value?.type));
const rows = computed(() => content.value ? hierarchyRows(content.value.items) : []);

watch(() => props.pluginId, () => {
  selectedId.value = '';
  inspector.value = 'item';
  tab.value = 'preview';
});
watch(() => content.value?.items, items => {
  if (!items?.some(item => item.id === selectedId.value)) selectedId.value = items?.[0]?.id || '';
}, { immediate: true });

function publish(value: LayoutContent) {
  emit('update:modelValue', cloneValue(value));
}
function choose(id: string) {
  selectedId.value = id;
  inspector.value = 'item';
}
function add(type?: string) {
  if (!content.value || !schema.value) return;
  const parentId = selected.value && schema.value.parentTypes?.includes(selected.value.type)
    ? selected.value.id : String(selected.value?.parentId || '');
  const next = addLayoutItem(schema.value.id, content.value, type, parentId);
  if (next === content.value) return;
  publish(next);
  choose(next.items[next.items.length - 1].id);
}
function canAdd(type: string) {
  return content.value && schema.value ? addLayoutItem(schema.value.id, content.value, type) !== content.value : false;
}
function remove(id: string) {
  if (!content.value) return;
  const index = content.value.items.findIndex(item => item.id === id);
  const next = removeLayoutItem(content.value, id);
  publish(next);
  choose(next.items[Math.min(index, next.items.length - 1)]?.id || '');
}
function move(id: string, direction: -1 | 1) {
  if (content.value) publish(moveLayoutItem(content.value, id, direction));
}
function canMove(item: LayoutItem, direction: -1 | 1) {
  return content.value ? moveLayoutItem(content.value, item.id, direction) !== content.value : false;
}
function patchItem(patch: Record<string, unknown>) {
  if (content.value && selected.value) publish(updateLayoutItem(content.value, selected.value.id, patch));
}
function changeType(event: Event) {
  if (content.value && selected.value) publish(changeItemType(content.value, selected.value.id, (event.target as HTMLSelectElement).value));
}
</script>

<template>
  <div class="layout-editor" data-testid="plugin-editor" :data-plugin-id="pluginId" :lang="locale">
    <template v-if="schema && content">
      <header class="layout-editor-header">
        <div class="layout-editor-label"><i :class="['fa', `fa-${schema.icon}`]" aria-hidden="true" /><strong>{{ content.title }}</strong><span class="layout-muted">{{ layoutT('{count} 个{item}', { count: content.items.length, item: schema.itemLabel }) }}</span></div>
        <div class="layout-inline-tools">
          <div class="layout-tabs" role="tablist" :aria-label="layoutT('布局工作区')">
            <button type="button" role="tab" :aria-selected="tab === 'preview'" @click="tab = 'preview'"><i class="fa fa-desktop" aria-hidden="true" />{{ layoutT('预览') }}</button>
            <button v-if="schema.dataEnabled" type="button" role="tab" :aria-selected="tab === 'data'" @click="tab = 'data'"><i class="fa fa-database" aria-hidden="true" />{{ layoutT('数据') }}</button>
          </div>
          <span class="layout-validation-count" :class="{ 'has-issues': issues.length }" role="status" data-testid="layout-validation">
            <i :class="['fa', issues.length ? 'fa-exclamation-circle' : 'fa-check-circle']" aria-hidden="true" />{{ issues.length ? layoutT('{count} 项错误', { count: issues.length }) : layoutT('校验通过') }}
          </span>
        </div>
      </header>
      <div class="layout-workspace">
        <aside class="layout-components" :aria-label="layoutT('组件编排')">
          <div class="layout-section-heading">
            <h2>{{ schema.itemLabel }}</h2>
            <button type="button" class="layout-icon-button is-primary" data-testid="add-item" :title="layoutT('添加{item}', { item: schema.itemLabel })" :aria-label="layoutT('添加{item}', { item: schema.itemLabel })"
              :disabled="!canAdd(schema.palette[0].type)" @click="add()"><i class="fa fa-plus" aria-hidden="true" /></button>
          </div>
          <div class="layout-palette" :aria-label="layoutT('组件库')">
            <button v-for="entry in schema.palette" :key="entry.type" type="button" :data-palette-type="entry.type"
              :disabled="!canAdd(entry.type)" :title="layoutT('添加{item}', { item: entry.label })" @click="add(entry.type)"><i :class="['fa', `fa-${entry.icon}`]" aria-hidden="true" /><span>{{ entry.label }}</span></button>
          </div>
          <ol class="layout-item-list" :aria-label="layoutT('组件列表')">
            <li v-for="entry in rows" :key="entry.item.id" :class="{ 'is-selected': selectedId === entry.item.id }" :data-item-id="entry.item.id">
              <button type="button" class="layout-item-select" :style="{ paddingLeft: `${Math.min(entry.depth, 6) * 10 + 8}px` }" :title="entry.item.label" :aria-pressed="selectedId === entry.item.id" @click="choose(entry.item.id)">
                <i :class="['fa', `fa-${schema.palette.find(item => item.type === entry.item.type)?.icon || 'square-o'}`]" aria-hidden="true" /><span>{{ entry.item.label }}</span>
              </button>
              <div class="layout-item-actions">
                <button type="button" class="layout-icon-button" :title="layoutT('上移')" :aria-label="layoutT('上移{item}', { item: entry.item.label })" :disabled="!canMove(entry.item, -1)" @click="move(entry.item.id, -1)"><i class="fa fa-arrow-up" aria-hidden="true" /></button>
                <button type="button" class="layout-icon-button" :title="layoutT('下移')" :aria-label="layoutT('下移{item}', { item: entry.item.label })" :disabled="!canMove(entry.item, 1)" @click="move(entry.item.id, 1)"><i class="fa fa-arrow-down" aria-hidden="true" /></button>
                <button type="button" class="layout-icon-button" :title="layoutT('删除')" :aria-label="layoutT('删除{item}', { item: entry.item.label })" @click="remove(entry.item.id)"><i class="fa fa-trash-o" aria-hidden="true" /></button>
              </div>
            </li>
          </ol>
          <p v-if="!rows.length" class="layout-empty">{{ layoutT('暂无组件') }}</p>
        </aside>

        <main class="layout-canvas">
          <LayoutPreview v-if="tab === 'preview'" :content="content" :selected-id="selectedId" @select="choose" />
          <DatasetEditor v-else :content="content" @change="publish" />
        </main>

        <aside class="layout-inspector" :aria-label="layoutT('属性面板')">
          <div class="layout-tabs" role="tablist" :aria-label="layoutT('属性类型')">
            <button type="button" role="tab" :aria-selected="inspector === 'item'" @click="inspector = 'item'">{{ layoutT('组件属性') }}</button>
            <button type="button" role="tab" :aria-selected="inspector === 'settings'" @click="inspector = 'settings'">{{ layoutT('整体设置') }}</button>
          </div>
          <template v-if="inspector === 'item' && selected">
            <div class="layout-selected-heading"><code>{{ selected.id }}</code></div>
            <label class="layout-type-field"><span>{{ layoutT('组件类型') }}</span>
              <select :value="selected.type" data-testid="property-type" @change="changeType">
                <option v-for="entry in schema.palette" :key="entry.type" :value="entry.type" :disabled="entry.type !== selected.type && !canAdd(entry.type)">{{ entry.label }}</option>
              </select>
            </label>
            <PropertyFields v-if="palette" :fields="palette.properties" :values="selected" :content="content" :selected="selected" @change="patchItem" />
          </template>
          <template v-else-if="inspector === 'settings'">
            <label class="layout-type-field"><span>{{ layoutT('标题') }}</span><input :value="content.title" data-testid="property-title" @change="publish({ ...content, title: ($event.target as HTMLInputElement).value })"></label>
            <PropertyFields :fields="schema.settings" :values="content.settings" :content="content" @change="publish(updateLayoutSettings(content, $event))" />
          </template>
          <p v-else class="layout-empty">{{ layoutT('未选择组件') }}</p>
          <ul v-if="issues.length" class="layout-issues" :aria-label="layoutT('布局校验错误')">
            <li v-for="(issue, index) in issues.slice(0, 20)" :key="index"><code>{{ issue.path }}</code><span>{{ issue.message }}</span></li>
          </ul>
        </aside>
      </div>
    </template>
    <p v-else class="layout-empty" role="alert">{{ layoutT('不支持的布局插件：{id}', { id: pluginId }) }}</p>
  </div>
</template>
