<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import { getPlugin, plugins, validateContent } from './registry';
import type { PluginContent, PluginDocument } from './types';
import { jsonSafetyProblem, MAX_DOCUMENT_BYTES } from './document-safety';
import { locale, setLocale } from './i18n';
import { errorKeys, errorText, messages, pluginTitle, t, WorkspaceError } from './messages';

const editors = {
  graph: defineAsyncComponent(() => import('./graph/GraphEditor.vue')),
  layout: defineAsyncComponent(() => import('./layout/LayoutEditor.vue')),
  tool: defineAsyncComponent(() => import('./tools/ToolsEditor.vue')),
};
const familyNames = { graph: '逻辑与数据', layout: '界面与部件', tool: '建模扩展' } as const;
const filter = ref('');
const pluginId = ref('logicdesign');
const plugin = computed(() => getPlugin(pluginId.value));
const document = shallowRef<PluginDocument>();
const savedDocument = shallowRef<PluginDocument>();
const summaries = ref<Omit<PluginDocument, 'content'>[]>([]);
const savedSnapshot = ref('');
const history = ref<string[]>([]);
const future = ref<string[]>([]);
const busy = ref(false);
const message = ref<{ key: keyof typeof messages; params?: Record<string, unknown> }>();
const error = shallowRef<unknown>();
const view = ref<'editor' | 'model'>('editor');
const validationVisible = ref(false);
const importInput = ref<HTMLInputElement>();
let navigationSequence = 0;

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const snapshot = () => JSON.stringify({ title: document.value?.title, content: document.value?.content });
const dirty = computed(() => !!document.value && snapshot() !== savedSnapshot.value);
const issues = computed(() => document.value ? validateContent(pluginId.value, document.value.content) : []);
const filtered = computed(() => plugins.filter(item =>
  `${pluginTitle(item.id)} ${item.title} ${item.id}`.toLowerCase().includes(filter.value.toLowerCase())));
const modelText = computed(() => JSON.stringify(document.value, null, 2));
const base = (id = pluginId.value) => `/api/modeling-plugins/${encodeURIComponent(id)}/documents`;

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const body = await response.json();
  if (!response.ok) {
    if (errorKeys[body.error]) throw new WorkspaceError(errorKeys[body.error]);
    throw new Error(body.message || `HTTP ${response.status}`);
  }
  return body as T;
}

function fresh(): PluginDocument {
  return {
    schemaVersion: 1, id: crypto.randomUUID(), pluginId: pluginId.value,
    title: `${pluginTitle(pluginId.value)} - ${t('新模型')}`, revision: 0, updatedAt: '',
    content: plugin.value.create(),
  };
}

function accept(value: PluginDocument): void {
  document.value = clone(value);
  savedDocument.value = value.revision > 0 ? clone(value) : undefined;
  savedSnapshot.value = snapshot();
  history.value = [];
  future.value = [];
  error.value = undefined;
  message.value = undefined;
  validationVisible.value = false;
}

function change(content: PluginContent, title = document.value!.title): void {
  if (!document.value || busy.value) return;
  const previous = snapshot();
  const next = JSON.stringify({ title, content });
  if (next === previous) return;
  history.value = [...history.value.slice(-49), previous];
  future.value = [];
  document.value = { ...document.value, title, content: clone(content) };
  message.value = undefined;
}

function undo(): void {
  if (!document.value || !history.value.length) return;
  const previous = history.value.at(-1)!;
  future.value = [...future.value, snapshot()];
  history.value = history.value.slice(0, -1);
  document.value = { ...document.value, ...JSON.parse(previous) };
}

function redo(): void {
  if (!document.value || !future.value.length) return;
  const next = future.value.at(-1)!;
  history.value = [...history.value, snapshot()];
  future.value = future.value.slice(0, -1);
  document.value = { ...document.value, ...JSON.parse(next) };
}

function canDiscard(): boolean {
  return !dirty.value || window.confirm(t('当前模型尚未保存，确定放弃修改？'));
}

function address(): void {
  const suffix = document.value?.revision ? `?document=${encodeURIComponent(document.value.id)}` : '';
  window.history.replaceState(null, '', `#/${pluginId.value}${suffix}`);
}

async function activate(id: string, selected?: string, force = false): Promise<void> {
  if (busy.value || (!force && !canDiscard())) return;
  const sequence = ++navigationSequence;
  try {
    getPlugin(id);
    busy.value = true;
    const list = await request<Omit<PluginDocument, 'content'>[]>(base(id));
    const record = selected ? await request<PluginDocument>(`${base(id)}/${encodeURIComponent(selected)}`) : undefined;
    if (sequence !== navigationSequence) return;
    pluginId.value = id;
    summaries.value = list;
    accept(record || fresh());
    view.value = 'editor';
    address();
  } catch (reason) {
    error.value = reason;
  } finally {
    if (sequence === navigationSequence) busy.value = false;
  }
}

async function save(): Promise<void> {
  if (!document.value || busy.value) return;
  validationVisible.value = true;
  if (issues.value.length) {
    error.value = new WorkspaceError('模型校验未通过，未执行保存');
    return;
  }
  busy.value = true;
  error.value = undefined;
  try {
    const saved = await request<PluginDocument>(`${base()}/${document.value.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(document.value),
    });
    accept(saved);
    message.value = { key: '已保存 · 版本 {revision}', params: { revision: saved.revision } };
    summaries.value = await request(base());
    address();
  } catch (reason) {
    error.value = reason;
  } finally {
    busy.value = false;
  }
}

async function reload(): Promise<void> {
  if (document.value?.revision) await activate(pluginId.value, document.value.id);
}

function newDocument(): void {
  if (busy.value || !canDiscard()) return;
  accept(fresh());
  address();
}

async function remove(): Promise<void> {
  if (!document.value?.revision || busy.value ||
    !window.confirm(t('删除“{title}”？此操作不可撤销。', { title: document.value.title }))) return;
  busy.value = true;
  error.value = undefined;
  try {
    if (!savedDocument.value) throw new WorkspaceError('删除需要当前文档版本');
    const hash = await crypto.subtle.digest('SHA-256',
      new TextEncoder().encode(JSON.stringify(savedDocument.value)));
    const digest = Array.from(new Uint8Array(hash), value => value.toString(16).padStart(2, '0')).join('');
    await request(`${base()}/${document.value.id}`, {
      method: 'DELETE',
      headers: { 'If-Match': `"${document.value.revision}"`, 'X-Document-SHA256': digest },
    });
    summaries.value = await request(base());
    accept(fresh());
    message.value = { key: '文档已删除' };
    address();
  } catch (reason) {
    error.value = reason;
  } finally {
    busy.value = false;
  }
}

function exportDocument(): void {
  if (!document.value) return;
  const blob = new Blob([`${modelText.value}\n`], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement('a');
  anchor.href = url;
  anchor.download = `${pluginId.value}-${document.value.id}.json`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function importDocument(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (busy.value) { input.value = ''; return; }
  busy.value = true;
  try {
    if (file.size > MAX_DOCUMENT_BYTES) throw new WorkspaceError('模型文件超过 2 MiB');
    let parsed: PluginDocument;
    try {
      parsed = JSON.parse(await file.text()) as PluginDocument;
    } catch {
      throw new WorkspaceError('模型文件不是有效的 JSON');
    }
    const unsafe = jsonSafetyProblem(parsed);
    if (unsafe) {
      if (errorKeys[unsafe.code]) throw new WorkspaceError(errorKeys[unsafe.code]);
      throw new Error(unsafe.message);
    }
    if (parsed.schemaVersion !== 1 || parsed.pluginId !== pluginId.value ||
      typeof parsed.title !== 'string' || !parsed.title.trim() || parsed.title.length > 200) {
      throw new WorkspaceError('模型文件版本、名称或插件类型不匹配');
    }
    const invalid = validateContent(pluginId.value, parsed.content);
    if (invalid.length) throw new Error(invalid.map(issue => `${issue.path}: ${issue.message}`).join('; '));
    if (!canDiscard()) return;
    const suffix = ` ${t('副本')}`;
    accept({ ...fresh(), title: `${parsed.title.slice(0, 200 - suffix.length)}${suffix}`, content: clone(parsed.content) });
    savedSnapshot.value = '';
    address();
    message.value = { key: '已导入副本，尚未保存' };
  } catch (reason) {
    error.value = reason;
  } finally {
    input.value = '';
    busy.value = false;
  }
}

function hashChange(): void {
  const [id, query] = window.location.hash.slice(2).split('?');
  const selected = new URLSearchParams(query).get('document') || undefined;
  void activate(id || 'logicdesign', selected, !document.value).then(address);
}

function beforeUnload(event: BeforeUnloadEvent): void {
  if (dirty.value) { event.preventDefault(); event.returnValue = ''; }
}

onMounted(() => {
  hashChange();
  window.addEventListener('hashchange', hashChange);
  window.addEventListener('beforeunload', beforeUnload);
});
onBeforeUnmount(() => {
  window.removeEventListener('hashchange', hashChange);
  window.removeEventListener('beforeunload', beforeUnload);
});
</script>

<template>
  <div class="mp-workbench" :aria-busy="busy">
    <header class="mp-header">
      <span class="mp-brand"><i class="fa fa-cubes" aria-hidden="true"></i> {{ t('iBiz 建模') }}</span>
      <span class="mp-environment">{{ t('本地工作区') }}</span>
      <span class="mp-count">{{ t('{count} 个插件', { count: plugins.length }) }}</span>
      <select class="mp-language" data-testid="language-select" :aria-label="t('语言')" :value="locale" :disabled="busy" @change="setLocale(($event.target as HTMLSelectElement).value)">
        <option value="zh-CN">简体中文</option>
        <option value="en">English</option>
      </select>
      <a href="http://127.0.0.1:32003/modeldesign/" target="_blank" rel="noopener">{{ t('建模平台') }} <i class="fa fa-external-link" aria-hidden="true"></i></a>
    </header>
    <aside class="mp-navigation" :aria-label="t('插件导航')">
      <label class="mp-search">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input v-model="filter" :aria-label="t('搜索插件')" :placeholder="t('搜索插件')" />
      </label>
      <nav>
        <section v-for="(label, family) in familyNames" :key="family">
          <h2>{{ t(label) }}</h2>
          <button
            v-for="item in filtered.filter(entry => entry.family === family)"
            :key="item.id"
            class="mp-nav-item"
            :class="{ active: pluginId === item.id }"
            :aria-current="pluginId === item.id ? 'page' : undefined"
            :data-plugin-id="item.id"
            :disabled="busy"
            @click="activate(item.id)"
          >{{ pluginTitle(item.id) }}</button>
        </section>
      </nav>
    </aside>
    <main class="mp-main">
      <div class="mp-heading">
        <h1>{{ pluginTitle(pluginId) }}</h1>
        <span class="mp-status" data-testid="document-status">{{ t(busy ? '处理中' : dirty ? '未保存' : document?.revision ? '已保存' : '新模型') }}</span>
      </div>
      <div v-if="error" class="mp-error" role="alert">{{ errorText(error) }}</div>
      <div v-if="message" class="mp-notice" role="status">{{ t(message.key, message.params) }}</div>
      <div class="mp-toolbar" role="toolbar" :aria-label="t('文档操作')">
        <button :aria-label="t('新建模型')" :title="t('新建模型')" :disabled="busy" @click="newDocument"><i class="fa fa-plus" aria-hidden="true"></i></button>
        <select
          :aria-label="t('已保存文档')"
          :value="document?.revision ? document.id : ''"
          :disabled="busy"
          @change="activate(pluginId, ($event.target as HTMLSelectElement).value || undefined)"
        >
          <option value="">{{ t('新模型') }}</option>
          <option v-for="entry in summaries" :key="entry.id" :value="entry.id">{{ entry.title }}</option>
        </select>
        <input v-if="document" class="mp-document-title" :aria-label="t('模型名称')" maxlength="200" :value="document.title" :disabled="busy" @input="change(document.content, ($event.target as HTMLInputElement).value)" />
        <button :aria-label="t('撤销')" :title="t('撤销')" :disabled="!history.length || busy" @click="undo"><i class="fa fa-undo" aria-hidden="true"></i></button>
        <button :aria-label="t('重做')" :title="t('重做')" :disabled="!future.length || busy" @click="redo"><i class="fa fa-repeat" aria-hidden="true"></i></button>
        <button :aria-label="t('校验模型')" :title="t('校验模型')" :disabled="busy" @click="validationVisible = !validationVisible"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button>
        <button class="mp-primary" :aria-label="t('保存模型')" :title="t('保存模型')" :disabled="busy || !document" @click="save"><i class="fa fa-save" aria-hidden="true"></i><span>{{ t('保存') }}</span></button>
        <button :aria-label="t('重新载入')" :title="t('重新载入')" :disabled="busy || !document?.revision" @click="reload"><i class="fa fa-refresh" aria-hidden="true"></i></button>
        <button :aria-label="t('导入模型')" :title="t('导入模型')" :disabled="busy" @click="importInput?.click()"><i class="fa fa-upload" aria-hidden="true"></i></button>
        <button :aria-label="t('导出模型')" :title="t('导出模型')" :disabled="busy || !document" @click="exportDocument"><i class="fa fa-download" aria-hidden="true"></i></button>
        <button :aria-label="t('删除文档')" :title="t('删除文档')" :disabled="busy || !document?.revision" @click="remove"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        <input ref="importInput" data-testid="model-import" type="file" accept=".json,application/json" hidden @change="importDocument" />
      </div>
      <div class="mp-tabs" role="tablist" :aria-label="t('模型视图')">
        <button role="tab" data-testid="design-tab" :aria-selected="view === 'editor'" @click="view = 'editor'">{{ t('设计') }}</button>
        <button role="tab" data-testid="model-tab" :aria-selected="view === 'model'" @click="view = 'model'">{{ t('模型') }}</button>
        <span v-if="document?.revision" class="mp-revision">{{ t('版本 {revision}', { revision: document.revision }) }}</span>
      </div>
      <section v-if="validationVisible" class="mp-validation" :aria-label="t('模型校验')">
        <span v-if="!issues.length">{{ t('模型校验通过') }}</span>
        <ul v-else><li v-for="(issue, index) in issues" :key="index">{{ issue.path }}: {{ issue.message }}</li></ul>
      </section>
      <div v-if="document" class="mp-content" :class="{ 'mp-disabled': busy }">
        <component
          :is="editors[plugin.family]"
          v-if="view === 'editor'"
          :key="`${pluginId}:${document.id}`"
          :plugin-id="pluginId"
          :model-value="document.content"
          @update:model-value="change"
        />
        <pre v-else class="mp-model" data-testid="document-json">{{ modelText }}</pre>
      </div>
    </main>
    <footer class="mp-footer">
      <span>{{ t('本地重实现') }}</span>
      <span>{{ t('文件存储') }}</span>
      <span>{{ t('原平台集成：未验收') }}</span>
    </footer>
  </div>
</template>
