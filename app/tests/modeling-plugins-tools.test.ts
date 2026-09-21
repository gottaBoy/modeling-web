import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import { computed, createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { compileTemplate, parse } from 'vue/compiler-sfc';
import ToolsEditor from '../src/modeling-plugins/tools/ToolsEditor.vue';
import JsonImport from '../src/modeling-plugins/tools/JsonImport.vue';
import { locale, setLocale } from '../src/modeling-plugins/i18n';
import type { PluginContent } from '../src/modeling-plugins/types';
import {
  toolDefinitions, createCollaboration, addTask, updateTask, deleteTask, addTaskComment, filterTasks, taskStatuses,
  createViewWizard, addWizardField, updateWizardField, removeWizardField, updateViewWizard, generateViewModel, fieldTypes, viewKinds,
  createPerspective, inspectModel, importPerspective, addPerspectiveEntity,
  createAdvanced, updateSettings, importAdvancedModel, removeUnsupportedSetting, consistencyReport, settingDefinitions,
  createMaterials, addMaterial, updateMaterial, deleteMaterial, filterMaterials, exportMaterial, importMaterial, previewMaterial, applyMaterial,
  createSync, addSyncChange, previewSync, applySync, applySyncContent,
  createSchemaImporter, addSchemaTable, validateRelationalSchema, mapDatabaseType, previewSchemaImport, applySchemaImport,
} from '../src/modeling-plugins/tools/definitions';
import { cloneJson, parseModelJson, recordAt, recordsAt, ToolValidationError } from '../src/modeling-plugins/tools/safe';
import { englishMessages, issueText, toolsT } from '../src/modeling-plugins/tools/messages';

beforeEach(() => setLocale('zh-CN'));
afterEach(() => setLocale('zh-CN'));

const ids = [
  'plm4modeling', 'ibizappviewcreator', 'modelperspectivetool', 'ibizmodelingadvanced',
  'modeling-materials', 'modeling-sync', 'ibizdbschemaimporter',
];
const definition = (id: string) => toolDefinitions.find(item => item.id === id)!;
const object = (value: unknown) => recordAt(value, '');
const list = (value: unknown) => recordsAt(value, '');
const storedLabels = { id: 'user_model_id', name: '任务标题', caption: '状态', label: '名称', locale: 'en-US' };

function edit(content: PluginContent, operation: (copy: PluginContent) => void): PluginContent {
  const copy = cloneJson(content);
  operation(copy);
  return copy;
}

function populated(id: string): PluginContent {
  const initial = { ...definition(id).create(), extension: cloneJson(storedLabels) };
  switch (id) {
    case 'plm4modeling': return addTask(initial, { title: '任务标题', assignee: 'User', modelRefs: ['#/getPSDataEntities'] });
    case 'ibizappviewcreator': return addWizardField(initial);
    case 'modelperspectivetool': return addPerspectiveEntity(initial);
    case 'ibizmodelingadvanced': return updateSettings(initial, { systemName: '系统名称', pageSize: 42 });
    case 'modeling-materials': return addMaterial(initial, { name: '素材名称', kind: '分类', tags: ['状态'] });
    case 'modeling-sync': return addSyncChange(initial);
    case 'ibizdbschemaimporter': return addSchemaTable(initial);
    default: throw new Error(id);
  }
}

function invalid(id: string): PluginContent {
  return edit(populated(id), value => {
    switch (id) {
      case 'plm4modeling': list(value.tasks)[0].modelRefs = 42; break;
      case 'ibizappviewcreator': object(value.view).fieldIds = 42; break;
      case 'modelperspectivetool': value.query = []; break;
      case 'ibizmodelingadvanced': object(value.settings).pageSize = 0; break;
      case 'modeling-materials': list(value.materials)[0].tags = {}; break;
      case 'modeling-sync': value.incoming = []; break;
      case 'ibizdbschemaimporter': list(object(value.schema).tables)[0].primaryKey = 42; break;
    }
  });
}

function rejectedWithoutMutation(content: PluginContent, operation: () => unknown): void {
  const before = JSON.stringify(content);
  expect(operation).toThrow(ToolValidationError);
  expect(JSON.stringify(content)).toBe(before);
}

describe('seven local tool contracts and reactive bilingual presentation', () => {
  it('imports backend validators and switches locale without browser globals', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    expect(toolDefinitions.map(item => item.id)).toEqual(ids);
    setLocale('en_US');
    expect(locale.value).toBe('en');
    for (const tool of toolDefinitions) {
      expect(tool.validate(tool.create())).toEqual([]);
      expect(tool.validate(null as unknown as PluginContent)[0].message).toContain('JSON object');
    }
  });

  it.each(ids)('%s preserves defaults, IDs, labels and extension data across language switches', id => {
    const tool = definition(id);
    const initial = tool.create();
    const value = populated(id);
    const before = JSON.stringify(value);
    const title = computed(() => tool.title);
    const capabilities = computed(() => tool.capabilities);
    const errors = computed(() => tool.validate(invalid(id)));
    const chineseTitle = title.value;
    const chineseCapabilities = [...capabilities.value];
    const chineseError = errors.value[0].message;
    expect(tool.validate(value)).toEqual([]);
    setLocale('en');
    expect(title.value).not.toBe(chineseTitle);
    expect(capabilities.value).not.toEqual(chineseCapabilities);
    expect(errors.value[0].message).not.toBe(chineseError);
    expect(errors.value.every(issue => !/\p{Script=Han}/u.test(issue.message))).toBe(true);
    expect(tool.create()).toEqual(initial);
    expect(tool.validate(value)).toEqual([]);
    expect(JSON.stringify(value)).toBe(before);
    expect(value.extension).toEqual(storedLabels);
    setLocale('zh-CN');
    expect(title.value).toBe(chineseTitle);
    expect(errors.value[0].message).toBe(chineseError);
    expect(JSON.stringify(value)).toBe(before);
  });

  it.each(ids)('%s rejects malformed JSON values and accessors without invoking them', id => {
    const tool = definition(id);
    setLocale('en');
    for (const value of [null, [], {}, { ...tool.create(), extra: Infinity }, JSON.parse('{"__proto__":{}}')]) {
      expect(tool.validate(value as PluginContent).length).toBeGreaterThan(0);
    }
    let accessed = false;
    const value = Object.defineProperty(tool.create(), 'unsafe', {
      enumerable: true, get() { accessed = true; return 'side effect'; },
    });
    expect(tool.validate(value)[0].message).toContain('Accessors');
    expect(accessed).toBe(false);
  });

  it('updates static option getters and previously raised errors without translating user parameters', () => {
    const options = computed(() => [taskStatuses[0].label, fieldTypes[0].label, viewKinds[0].label, settingDefinitions[0].label]);
    expect(options.value).toEqual(['待处理', '文本', '表格视图', '系统名称']);
    let error: ToolValidationError;
    try { parseModelJson('{'); } catch (reason) { error = reason as ToolValidationError; }
    const message = computed(() => error!.message);
    expect(message.value).toContain('JSON 格式错误');
    const captured = inspectModel({ refs: [{ $ref: '#/任务标题' }] }).issues[0];
    setLocale('en');
    expect(options.value).toEqual(['To do', 'Text', 'Grid view', 'System name']);
    expect(message.value).toContain('Invalid JSON syntax');
    expect(issueText(captured)).toBe('Reference does not exist: #/任务标题');
    expect(toolsT('选择字段 {name}', { name: '任务标题' })).toBe('Include field 任务标题');
    expect(taskStatuses.map(item => item.value)).toEqual(['todo', 'doing', 'blocked', 'done']);
  });

  it.each(ids)('%s renders valid and invalid drafts in both languages without DOM or model writes', async id => {
    const value = populated(id);
    const before = JSON.stringify(value);
    const updates: PluginContent[] = [];
    for (const language of ['zh-CN', 'en', 'zh-CN']) {
      setLocale(language);
      const html = await renderToString(createSSRApp({
        render: () => h(ToolsEditor, { pluginId: id, modelValue: value, 'onUpdate:modelValue': next => updates.push(next) }),
      }));
      expect(html).toContain(definition(id).title);
      expect(html).toContain(`data-plugin-id="${id}"`);
      const invalidHtml = await renderToString(createSSRApp({ render: () => h(ToolsEditor, { pluginId: id, modelValue: invalid(id) }) }));
      expect(invalidHtml).toContain(`aria-label="${toolsT('模型校验')}"`);
      expect(invalidHtml).toContain('disabled');
    }
    expect(updates).toEqual([]);
    expect(JSON.stringify(value)).toBe(before);
  });

  it('uses real English mappings and has no untranslated static template text or attributes', async () => {
    for (const [key, message] of Object.entries(englishMessages)) {
      expect(message, key).not.toBe(key);
      expect(message, key).not.toMatch(/\p{Script=Han}/u);
      expect([...message.matchAll(/\{\w+\}/g)].map(match => match[0]).sort(), key)
        .toEqual([...key.matchAll(/\{\w+\}/g)].map(match => match[0]).sort());
    }
    for (const filename of ['ToolsEditor.vue', 'JsonImport.vue']) {
      const source = await readFile(new URL(`../src/modeling-plugins/tools/${filename}`, import.meta.url), 'utf8');
      const template = parse(source).descriptor.template!;
      const compiled = compileTemplate({ source: template.content, filename, id: 'tools-test', compilerOptions: { expressionPlugins: ['typescript'] } });
      expect(compiled.errors).toEqual([]);
      function walk(node: { type: number; content?: unknown; props?: { type: number; value?: { content: string } }[]; children?: unknown[] }): void {
        if (node.type === 2) expect(node.content, filename).not.toMatch(/\p{Script=Han}/u);
        for (const prop of node.props ?? []) {
          if (prop.type === 6 && prop.value) expect(prop.value.content, filename).not.toMatch(/\p{Script=Han}/u);
        }
        for (const child of node.children ?? []) if (child && typeof child === 'object') walk(child as Parameters<typeof walk>[0]);
      }
      walk(template.ast!);
    }
    setLocale('en');
    expect(await renderToString(createSSRApp({ render: () => h(JsonImport, { label: toolsT('导入素材 JSON'), value: {} }) })))
      .toContain('Import material JSON');
  });
});

describe('plm4modeling: local tasks, filtering, comments and model references', () => {
  it('supports local task CRUD and filters by status, assignee and comments without data changes', () => {
    const initial = createCollaboration();
    let value = addTask(initial, { title: 'Design review', assignee: 'Alice' });
    value = addTask(value, { title: '模型检查', assignee: 'Bob', status: 'blocked' });
    value = addTaskComment(value, 'task_2', '评审者', 'Needs QA');
    value = updateTask(value, 'task_1', { status: 'done', modelRefs: ['#/getPSDataEntities'] });
    const before = JSON.stringify(value);
    for (const language of ['zh-CN', 'en']) {
      setLocale(language);
      expect(filterTasks(value, ' alice ', 'done').map(task => task.id)).toEqual(['task_1']);
      expect(filterTasks(value, 'qa', 'blocked').map(task => task.id)).toEqual(['task_2']);
      expect(filterTasks(value, 'not found')).toEqual([]);
    }
    expect(JSON.stringify(value)).toBe(before);
    expect(initial.tasks).toEqual([]);
    expect(list(deleteTask(value, 'task_1').tasks).map(task => task.id)).toEqual(['task_2']);
  });

  it('rejects bad status, empty comments, missing/duplicate/unsafe references and changed task IDs', () => {
    const value = addTask(createCollaboration());
    for (const patch of [{ title: '' }, { id: 'renamed' }, { status: 'remote-done' },
      { modelRefs: ['#/missing'] }, { modelRefs: ['#/__proto__'] }, { modelRefs: ['#', '#'] }]) {
      rejectedWithoutMutation(value, () => updateTask(value, 'task_1', patch));
    }
    rejectedWithoutMutation(value, () => addTaskComment(value, 'task_1', '', 'body'));
    rejectedWithoutMutation(value, () => deleteTask(value, 'missing'));
    rejectedWithoutMutation(value, () => filterTasks(value, '', 'remote-done'));
  });
});

describe('ibizappviewcreator: generated views and safe field edits', () => {
  it.each(['grid', 'edit', 'list'])('generates %s controls and preserves imported metadata on field removal', kind => {
    let value = addWizardField(createViewWizard());
    value = updateViewWizard(value, 'view', { kind });
    const model = object(value.generatedModel);
    const entity = list(model.getPSDataEntities)[0];
    const control = list(list(model.getPSAppViews)[0].getPSControls)[0];
    const itemKey = kind === 'grid' ? 'getPSDEGridColumns' : kind === 'edit' ? 'getPSDEFormItems' : 'getPSDEListItems';
    entity.extension = cloneJson(storedLabels);
    list(entity.getPSDEFields).push({ id: 'external.field', name: 'External', custom: true });
    list(control[itemKey]).push({ id: 'external.item', caption: 'Imported', custom: true });
    control.extension = 'keep';
    const before = JSON.stringify(value);
    const result = removeWizardField(value, 'field_1');
    const generated = object(result.generatedModel);
    const generatedEntity = list(generated.getPSDataEntities)[0];
    const generatedControl = list(list(generated.getPSAppViews)[0].getPSControls)[0];
    expect(list(generatedEntity.getPSDEFields).map(field => field.id)).toEqual(['entity_1.id', 'external.field']);
    expect(list(generatedControl[itemKey]).map(item => item.id)).toEqual(['entity_1.entity_1_grid.control.id', 'external.item']);
    expect(generatedEntity.extension).toEqual(storedLabels);
    expect(generatedControl.extension).toBe('keep');
    expect(JSON.stringify(value)).toBe(before);
    expect(inspectModel(generateViewModel(result)).issues).toEqual([]);
  });

  it('rejects losing the only key/selected field, case-colliding code names and duplicate generated IDs', () => {
    const initial = createViewWizard();
    rejectedWithoutMutation(initial, () => removeWizardField(initial, 'id'));
    const value = addWizardField(initial);
    for (const operation of [
      () => updateWizardField(value, 'field_1', { codeName: 'ID' }),
      () => updateWizardField(value, 'id', { required: false }),
      () => updateViewWizard(value, 'view', { fieldIds: [] }),
      () => updateWizardField(value, 'field_1', { type: 'unknown' }),
      () => removeWizardField(value, 'missing'),
    ]) rejectedWithoutMutation(value, operation);
    const duplicate = edit(value, copy => {
      const entities = list(object(copy.generatedModel).getPSDataEntities);
      entities.push(cloneJson(entities[0]));
    });
    rejectedWithoutMutation(duplicate, () => generateViewModel(duplicate));
  });

  it('allocates a field ID distinct from both existing IDs and normalized code names', () => {
    let value = addWizardField(createViewWizard());
    value = updateWizardField(value, 'field_1', { codeName: 'FIELD_2' });
    expect(list(object(addWizardField(value).entity).fields).map(field => field.id)).toEqual(['id', 'field_1', 'field_3']);
  });
});

describe('modelperspectivetool: structured import, search and reference diagnostics', () => {
  it('imports and filters structured data by label/path/value while retaining user text and escaped pointers', () => {
    const initial = createPerspective();
    const model = parseModelJson('{"a/b":{"~key":{"id":"field_1","caption":"任务标题","value":"FindMe"}},"ref":{"$ref":"#/a~1b/~0key"}}');
    const value = importPerspective(initial, model);
    for (const query of ['任务标题', 'A~1B', 'findme']) {
      expect(inspectModel(object(value.model), query).matches.length).toBeGreaterThan(0);
    }
    expect(inspectModel(object(value.model), 'missing').matches).toEqual([]);
    expect(inspectModel(object(value.model)).issues).toEqual([]);
    setLocale('en');
    expect(inspectModel(object(value.model), '任务标题').matches[0].label).toBe('任务标题');
    expect(value.model).toEqual(model);
    expect(initial.model).toEqual({ getPSDataEntities: [] });
  });

  it('rejects unsafe imports and invalid query types, and diagnoses missing, duplicate and ambiguous references', () => {
    const value = createPerspective();
    for (const text of ['{', '[]', '{"bad":1e400}', '{"nested":{"constructor":{}}}']) {
      rejectedWithoutMutation(value, () => importPerspective(value, parseModelJson(text)));
    }
    expect(inspectModel({}, 5 as unknown as string).issues).toHaveLength(1);
    const inspection = inspectModel({
      entities: [{ id: 'duplicate' }, { id: 'duplicate' }],
      refs: [{ modelref: true, id: 'duplicate' }, { $ref: '#/missing' }, { $ref: '#/__proto__' }],
    });
    expect(inspection.referenceCount).toBe(3);
    expect(inspection.referenceIssues).toHaveLength(3);
    expect(inspection.issues).toHaveLength(4);
    expect(inspectModel({ target: { id: 'one' }, refs: [{ $ref: '#/target', id: 'one' }, { $ref: '#/target', id: 'one' }] }).issues).toEqual([]);
  });

  it('keeps generator source snapshots searchable without hiding real nested declarations or user sourceEntity keys', () => {
    const generated = generateViewModel(createViewWizard());
    const before = JSON.stringify(generated);
    const inspection = inspectModel(generated, 'sourceEntity');
    expect(inspection.issues).toEqual([]);
    expect(inspection.matches.some(node => node.path === '/getPSDataEntities/0/sourceEntity')).toBe(true);
    expect(JSON.stringify(generated)).toBe(before);
    const nested = edit(generated, copy => {
      const entity = list(copy.getPSDataEntities)[0];
      entity.nestedEntity = { id: 'entity_1', caption: 'Real nested declaration' };
      entity.reference = { modelref: true, id: 'entity_1' };
    });
    const ambiguous = inspectModel(nested).referenceIssues;
    expect(ambiguous.map(issue => issue.path)).toEqual([
      '/getPSDataEntities/0/reference', '/getPSAppViews/0/getPSDataEntity',
    ]);
    expect(ambiguous.every(issue => issue.message.includes('引用不唯一'))).toBe(true);
    expect(inspectModel({ sourceEntity: { id: 'real' }, reference: { modelref: true, id: 'real' } }).issues).toEqual([]);
  });
});

describe('ibizmodelingadvanced: settings whitelist, readonly and consistency checks', () => {
  it('enforces read-only structured import and explicit unsupported-setting removal', () => {
    const initial = createAdvanced();
    const value = importAdvancedModel(initial, { name: '模型', extension: storedLabels });
    const readonly = updateSettings(value, { readOnly: true });
    rejectedWithoutMutation(readonly, () => importAdvancedModel(readonly, { name: 'Replacement' }));
    expect(importAdvancedModel(updateSettings(readonly, { readOnly: false }), { name: 'Replacement' }).model).toEqual({ name: 'Replacement' });
    rejectedWithoutMutation(value, () => updateSettings(value, { unknown: true }));
    for (const pageSize of [0, 501, 1.5, '20']) rejectedWithoutMutation(value, () => updateSettings(value, { pageSize }));
    rejectedWithoutMutation(value, () => removeUnsupportedSetting(value, 'pageSize'));
    const unsupported = edit(value, copy => { object(copy.settings).custom = 'keep until removed'; });
    expect(object(removeUnsupportedSetting(unsupported, 'custom').settings).custom).toBeUndefined();
    expect(object(unsupported.settings).custom).toBe('keep until removed');
  });

  it.each(['zh-CN', 'en'])('keeps strict-reference errors separate from structural errors in %s', language => {
    setLocale(language);
    const brokenReference = importAdvancedModel(createAdvanced(), { ref: { $ref: '#/missing' } });
    expect(consistencyReport(brokenReference)).toMatchObject({ valid: false, warnings: [], referenceCount: 1 });
    const relaxed = updateSettings(brokenReference, { strictReferences: false });
    expect(consistencyReport(relaxed)).toMatchObject({ valid: true, issues: [], referenceCount: 1 });
    expect(consistencyReport(relaxed).warnings).toHaveLength(1);
    const duplicate = importAdvancedModel(relaxed, { entities: [{ id: 'same' }, { id: 'same' }] });
    expect(consistencyReport(duplicate).valid).toBe(false);
    expect(consistencyReport(duplicate).issues).toHaveLength(1);
  });
});

describe('modeling-materials: filtering, import/export and reviewed application', () => {
  it('round-trips complete material data and filters by name, category and tags', () => {
    const material = { id: 'reusable', name: '实体素材', kind: 'Entity', tags: ['Review'], model: { extension: storedLabels }, custom: { preserve: true } };
    const value = addMaterial(createMaterials(), material);
    const exported = exportMaterial(value, 'reusable');
    expect(list(importMaterial(createMaterials(), exported).materials)[0]).toEqual(material);
    expect(filterMaterials(value, 'review', 'Entity')).toHaveLength(1);
    expect(filterMaterials(value, '实体素材')).toHaveLength(1);
    expect(filterMaterials(value, '', 'Other')).toEqual([]);
    expect(filterMaterials(value, 'missing')).toEqual([]);
    setLocale('en');
    expect(exportMaterial(value, 'reusable')).toBe(exported);
    expect(list(deleteMaterial(value, 'reusable').materials)).toEqual([]);
    rejectedWithoutMutation(value, () => importMaterial(value, exported));
    rejectedWithoutMutation(value, () => filterMaterials(value, [] as unknown as string));
  });

  it('rejects incomplete envelopes, duplicate IDs and changed material IDs without losing the draft', () => {
    const value = addMaterial(createMaterials());
    for (const envelope of [
      { format: 'wrong', version: 1, material: {} },
      { format: 'ibiz-local-material', version: 2, material: {} },
      { format: 'ibiz-local-material', version: 1, material: {} },
      { format: 'ibiz-local-material', version: 1, material: { id: 'new', name: 'Name', kind: 'Kind', model: {} } },
      { ...JSON.parse(exportMaterial(value, 'material_1')), extra: true },
    ]) rejectedWithoutMutation(value, () => importMaterial(value, JSON.stringify(envelope)));
    rejectedWithoutMutation(value, () => updateMaterial(value, 'material_1', { id: 'new' }));
    const duplicates = { entities: [{ id: 'same' }, { id: 'same' }] };
    for (const [target, source] of [[{}, duplicates], [duplicates, {}], [duplicates, duplicates]]) {
      expect(() => previewMaterial(target, source)).toThrow(ToolValidationError);
    }
  });

  it('requires confirmation and explicit overwrite, accepts a language switch, and rejects stale/tampered previews', () => {
    const target = { entities: [{ id: 'one', name: 'Current', custom: 'keep' }], extension: storedLabels };
    const source = { entities: [{ id: 'one', name: 'Incoming' }, { id: 'two', name: 'Added' }] };
    const value = addMaterial({ ...createMaterials(), targetModel: target }, { model: source });
    const before = JSON.stringify(value);
    const blocked = previewMaterial(target, source);
    expect(blocked.conflicts).toHaveLength(1);
    rejectedWithoutMutation(value, () => applyMaterial(value, 'material_1', { confirm: true, preview: blocked }));
    const preview = previewMaterial(target, source, true);
    rejectedWithoutMutation(value, () => applyMaterial(value, 'material_1', { confirm: false, overwrite: true, preview }));
    setLocale('en');
    expect(issueText(preview.conflicts[0])).toContain('explicit overwrite');
    const applied = applyMaterial(value, 'material_1', { confirm: true, overwrite: true, preview });
    expect(applied.targetModel).toEqual({ entities: [{ id: 'one', name: 'Incoming', custom: 'keep' }, { id: 'two', name: 'Added' }], extension: storedLabels });
    expect(JSON.stringify(value)).toBe(before);
    expect(previewMaterial(object(applied.targetModel), source).unchanged).toBe(true);
    rejectedWithoutMutation(value, () => applyMaterial(value, 'material_1', { confirm: true, overwrite: true, preview: { ...preview, result: {} } }));
    rejectedWithoutMutation(value, () => applyMaterial(value, 'material_1', { confirm: true, overwrite: 'yes' as unknown as boolean, preview }));
    const changed = updateMaterial(value, 'material_1', { model: { changed: true } });
    rejectedWithoutMutation(changed, () => applyMaterial(changed, 'material_1', { confirm: true, overwrite: true, preview }));
    const changedTarget = { ...value, targetModel: { changed: true } };
    rejectedWithoutMutation(changedTarget, () => applyMaterial(changedTarget, 'material_1', { confirm: true, overwrite: true, preview }));
  });
});

describe('modeling-sync: three-way conflicts and immutable explicit application', () => {
  it('merges additions/deletions, keeps local edits and treats conflicting arrays atomically', () => {
    const base = { ready: 1, removed: 1, conflict: 1, local: 1, rows: [{ id: 'one', name: 'Base' }], 'a/b': { '~key': 1 } };
    const target = { ...base, conflict: 2, local: 2, rows: [{ id: 'one', name: 'Local' }] };
    const incoming = { ready: 2, conflict: 3, local: 1, rows: [{ id: 'one', name: 'Incoming' }], added: null, 'a/b': { '~key': 2 } };
    const value = { ...createSync(), base, target, incoming, extension: storedLabels };
    const preview = previewSync(base, target, incoming);
    expect(preview.conflictCount).toBe(2);
    expect(preview.changes.find(change => change.path === '/rows')).toMatchObject({ status: 'conflict', kind: 'replace' });
    expect(preview.changes.find(change => change.path === '/local')?.status).toBe('local-only');
    expect(preview.changes.some(change => change.path === '/a~1b/~0key')).toBe(true);
    const resolutions = { '/conflict': 'local' as const, '/rows': 'incoming' as const };
    setLocale('en');
    const applied = applySyncContent(value, preview, { confirm: true, resolutions });
    expect(applied.target).toEqual({ ready: 2, conflict: 2, local: 2, rows: incoming.rows, added: null, 'a/b': { '~key': 2 } });
    expect(applied.base).toEqual(base);
    expect(applied.incoming).toEqual(incoming);
    expect(applied.extension).toEqual(storedLabels);
    expect(value.target).toEqual(target);
    const nextPreview = previewSync(base, object(applied.target), incoming);
    expect(nextPreview.changes.some(change => change.status === 'ready')).toBe(false);
    // Keeping current does not silently advance the user-supplied baseline or remember a decision for a new preview.
    expect(nextPreview.changes.filter(change => change.status === 'conflict').map(change => change.path)).toEqual(['/conflict']);
  });

  it('requires each conflict decision and confirmation and rejects invalid/stale/tampered inputs', () => {
    const value = { base: { value: 1 }, target: { value: 2 }, incoming: { value: 3 } };
    const preview = previewSync(value.base, value.target, value.incoming);
    for (const options of [
      { confirm: false, resolutions: { '/value': 'incoming' } },
      { confirm: true },
      { confirm: true, resolutions: { '/unknown': 'incoming' } },
      { confirm: true, resolutions: { '/value': 'unknown' } },
    ]) rejectedWithoutMutation(value, () => applySyncContent(value, preview, options as Parameters<typeof applySync>[2]));
    expect(applySync(value.target, preview, { confirm: true, resolutions: { '/value': 'local' } })).toEqual(value.target);
    for (const key of ['base', 'target', 'incoming']) {
      const changed = { ...value, [key]: { value: 9 } };
      rejectedWithoutMutation(changed, () => applySyncContent(changed, preview, { confirm: true, resolutions: { '/value': 'incoming' } }));
    }
    rejectedWithoutMutation(value, () => applySyncContent(value, { ...preview, changes: [] }, { confirm: true }));
    expect(previewSync({}, {}, {})).toMatchObject({ changes: [], conflictCount: 0 });
  });

  it('distinguishes deletion from null and conflicts on delete-versus-local-edit', () => {
    const preview = previewSync({ field: null }, { field: 'local' }, {});
    expect(preview.changes[0]).toMatchObject({ status: 'conflict', kind: 'remove', baseExists: true, base: null, incomingExists: false });
    expect(applySync({ field: 'local' }, preview, { confirm: true, resolutions: { '/field': 'incoming' } })).toEqual({});
  });
});

function relationalSchema(): PluginContent {
  return {
    name: 'local',
    tables: [
      { name: 'Parent', label: '任务标题', columns: [{ name: 'id', type: 'integer', nullable: false }], primaryKey: ['id'], foreignKeys: [] },
      {
        name: 'Child', label: '状态',
        columns: [{ name: 'id', type: 'integer', nullable: false }, { name: 'parent_id', type: 'int', nullable: false }, { name: 'amount', type: 'decimal', precision: 8, scale: 2, default: 0 }],
        primaryKey: ['id'],
        foreignKeys: [{ name: 'parent', columns: ['parent_id'], references: { table: 'Parent', columns: ['id'] } }],
      },
    ],
  };
}

describe('ibizdbschemaimporter: validated schema mapping and duplicate imports', () => {
  it('maps primary/foreign keys, retains source labels, and re-imports identically without duplicate entities', () => {
    const schema = relationalSchema();
    const initial = { ...createSchemaImporter(), schema, generatedModel: { extension: storedLabels } };
    const preview = previewSchemaImport(schema, object(initial.generatedModel));
    expect(preview).toMatchObject({ tableCount: 2, fieldCount: 4, relationCount: 1, issues: [] });
    expect(preview.merge?.conflicts).toEqual([]);
    rejectedWithoutMutation(initial, () => applySchemaImport(initial, preview, false));
    setLocale('en');
    const value = applySchemaImport(initial, preview, true);
    const model = object(value.generatedModel);
    expect(list(model.getPSDataEntities).map(entity => entity.id)).toEqual(['local.parent', 'local.child']);
    expect(list(model.getPSDataEntities).map(entity => entity.logicName)).toEqual(['任务标题', '状态']);
    expect(model.extension).toEqual(storedLabels);
    expect(inspectModel(model).issues).toEqual([]);
    const repeated = previewSchemaImport(schema, model);
    expect(repeated.merge?.unchanged).toBe(true);
    expect(applySchemaImport(value, repeated, true)).toEqual(value);
    expect(applySchemaImport(value, previewSchemaImport(schema), true)).toEqual(value);
    expect(initial.generatedModel).toEqual({ extension: storedLabels });
  });

  it('surfaces changed-schema conflicts in preview, pins the reviewed target, and refuses duplicate target IDs', () => {
    const schema = relationalSchema();
    const value = applySchemaImport({ schema, generatedModel: {} }, previewSchemaImport(schema, {}), true);
    const changed = edit(value, copy => { list(object(copy.schema).tables)[0].label = 'Changed'; });
    const preview = previewSchemaImport(object(changed.schema), object(changed.generatedModel));
    expect(preview.merge!.conflicts.length).toBeGreaterThan(0);
    rejectedWithoutMutation(changed, () => applySchemaImport(changed, preview, true));
    const originalPreview = previewSchemaImport(schema, object(value.generatedModel));
    const changedTarget = edit(value, copy => { object(copy.generatedModel).extra = true; });
    rejectedWithoutMutation(changedTarget, () => applySchemaImport(changedTarget, originalPreview, true));
    rejectedWithoutMutation(changed, () => applySchemaImport(changed, originalPreview, true));
    rejectedWithoutMutation(value, () => applySchemaImport(value, { ...originalPreview, model: {} }, true));
    const duplicate = edit(value, copy => {
      const entities = list(object(copy.generatedModel).getPSDataEntities);
      entities.push(cloneJson(entities[0]));
    });
    expect(previewSchemaImport(schema, object(duplicate.generatedModel)).issues.length).toBeGreaterThan(0);
    rejectedWithoutMutation(duplicate, () => applySchemaImport(duplicate, originalPreview, true));
  });

  it.each([
    (schema: PluginContent) => { list(schema.tables).push({ ...cloneJson(list(schema.tables)[0]), name: 'parent' }); },
    (schema: PluginContent) => { list(list(schema.tables)[0].columns).push({ name: 'ID', type: 'int' }); },
    (schema: PluginContent) => { list(list(schema.tables)[0].columns)[0].nullable = true; },
    (schema: PluginContent) => { list(list(schema.tables)[0].columns)[0].type = 'varchar(255)'; },
    (schema: PluginContent) => { list(list(schema.tables)[0].columns)[0].default = 'invalid'; },
    (schema: PluginContent) => { list(list(schema.tables)[0].columns)[0].length = 10; },
    (schema: PluginContent) => { list(list(schema.tables)[1].columns)[2].scale = 9; },
    (schema: PluginContent) => { object(list(list(schema.tables)[1].foreignKeys)[0].references).table = 'Missing'; },
    (schema: PluginContent) => { list(list(schema.tables)[1].columns)[1].type = 'varchar'; },
    (schema: PluginContent) => { list(schema.tables)[0].primaryKey = []; },
  ])('rejects invalid schema case %# without partial generated output', operation => {
    const schema = edit(relationalSchema(), operation);
    setLocale('en');
    const preview = previewSchemaImport(schema);
    expect(validateRelationalSchema(schema).length).toBeGreaterThan(0);
    expect(preview.model).toEqual({});
    expect(preview.issues.every(issue => !/\p{Script=Han}/u.test(issue.message))).toBe(true);
    rejectedWithoutMutation(schema, () => applySchemaImport({ schema, generatedModel: {} }, preview, true));
  });

  it('maps structured type names and rejects SQL expressions', () => {
    expect(mapDatabaseType('VARCHAR')).toEqual({ stdDataType: 25, family: 'string' });
    expect(mapDatabaseType('int')).toEqual({ stdDataType: 9, family: 'integer' });
    expect(() => mapDatabaseType('decimal(8,2)')).toThrow(ToolValidationError);
  });
});
