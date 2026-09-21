import type { PluginContent, ValidationIssue } from '../types';
import { toolsT } from './messages';
import {
  assertValid, checked, cloneJson, identifier, mergeById, modelIdIssues, nonempty,
  recordAt, recordsAt, uniqueIds, validateWith,
} from './safe';

export const fieldTypes = [
  { value: 'string', get label() { return toolsT('文本'); }, stdDataType: 25 },
  { value: 'integer', get label() { return toolsT('整数'); }, stdDataType: 9 },
  { value: 'decimal', get label() { return toolsT('小数'); }, stdDataType: 6 },
  { value: 'boolean', get label() { return toolsT('布尔'); }, stdDataType: 9 },
  { value: 'datetime', get label() { return toolsT('日期时间'); }, stdDataType: 5 },
];
export const viewKinds = [
  { value: 'grid', get label() { return toolsT('表格视图'); }, viewType: 'DEGRIDVIEW', controlType: 'GRID' },
  { value: 'edit', get label() { return toolsT('编辑视图'); }, viewType: 'DEEDITVIEW', controlType: 'FORM' },
  { value: 'list', get label() { return toolsT('列表视图'); }, viewType: 'DELISTVIEW', controlType: 'LIST' },
];

export function validateViewWizard(content: PluginContent): ValidationIssue[] {
  return validateWith(content, (value, issues) => {
    const entity = recordAt(value.entity, '/entity');
    const view = recordAt(value.view, '/view');
    issues.push(...modelIdIssues(recordAt(value.generatedModel, '/generatedModel'))
      .map(issue => ({ ...issue, path: `/generatedModel${issue.path}` })));
    const fields = recordsAt(entity.fields, '/entity/fields');
    if (!identifier(entity.id) || !identifier(entity.codeName) || !nonempty(entity.name)) {
      issues.push({ path: '/entity', message: '实体需要合法标识、代码名和名称' });
    }
    uniqueIds(fields, '/entity/fields');
    uniqueIds(fields, '/entity/fields', 'codeName');
    if (!fields.length) issues.push({ path: '/entity/fields', message: '至少需要一个字段' });
    const codeNames = new Set<string>();
    fields.forEach((field, index) => {
      const path = `/entity/fields/${index}`;
      if (!identifier(field.id)) issues.push({ path: `${path}/id`, message: '字段标识必须是合法代码名' });
      if (!identifier(field.codeName) || !nonempty(field.name)) issues.push({ path, message: '字段需要合法代码名和名称' });
      if (typeof field.codeName === 'string') {
        const codeName = field.codeName.toLowerCase();
        if (codeNames.has(codeName)) issues.push({ path: `${path}/codeName`, message: '字段代码名重复（不区分大小写）' });
        codeNames.add(codeName);
      }
      if (!fieldTypes.some(type => type.value === field.type)) issues.push({ path: `${path}/type`, message: '未知字段类型' });
      if (typeof field.required !== 'boolean' || typeof field.primaryKey !== 'boolean') {
        issues.push({ path, message: '必填和主键必须是布尔值' });
      }
      if (field.primaryKey === true && field.required !== true) issues.push({ path, message: '主键字段必须必填' });
    });
    if (!fields.some(field => field.primaryKey === true)) issues.push({ path: '/entity/fields', message: '至少需要一个主键字段' });
    if (!identifier(view.codeName) || !nonempty(view.caption)) issues.push({ path: '/view', message: '视图需要合法代码名和标题' });
    if (!viewKinds.some(kind => kind.value === view.kind)) issues.push({ path: '/view/kind', message: '未知视图类型' });
    if (!Array.isArray(view.fieldIds) || !view.fieldIds.length ||
      view.fieldIds.some(id => !fields.some(field => field.id === id)) ||
      new Set(view.fieldIds).size !== view.fieldIds.length) {
      issues.push({ path: '/view/fieldIds', message: '请选择至少一个存在且不重复的字段' });
    }
  });
}

export function generateViewModel(content: PluginContent): PluginContent {
  const value = checked(content, validateViewWizard);
  const entity = recordAt(value.entity, '/entity');
  const view = recordAt(value.view, '/view');
  const fields = recordsAt(entity.fields, '/entity/fields');
  const model = recordAt(value.generatedModel, '/generatedModel');
  const oldEntities = model.getPSDataEntities === undefined ? [] : recordsAt(model.getPSDataEntities, '/generatedModel/getPSDataEntities');
  const oldEntity = oldEntities.find(item => item.id === entity.id) ?? {};
  const generatedFields = fields.map(field => ({
    ...cloneJson(field),
    id: `${entity.id}.${field.id}`,
    name: String(field.codeName).toUpperCase(),
    logicName: field.name,
    stdDataType: fieldTypes.find(type => type.value === field.type)!.stdDataType,
    pkey: field.primaryKey,
    allowEmpty: !field.required,
  }));
  const psEntity = {
    ...oldEntity, id: entity.id, name: entity.codeName, codeName: entity.codeName,
    logicName: entity.name, sourceEntity: cloneJson(entity),
    getPSDEFields: mergeById(oldEntity.getPSDEFields, generatedFields),
  };
  const psViewId = `${entity.id}.${view.codeName}`;
  const oldViews = model.getPSAppViews === undefined ? [] : recordsAt(model.getPSAppViews, '/generatedModel/getPSAppViews');
  const oldView = oldViews.find(item => item.id === psViewId) ?? {};
  const controls = oldView.getPSControls === undefined ? [] : recordsAt(oldView.getPSControls, '/generatedModel/getPSControls');
  const kind = viewKinds.find(item => item.value === view.kind)!;
  const controlId = `${psViewId}.control`;
  const oldControl = controls.find(item => item.id === controlId) ?? {};
  const selected = (view.fieldIds as string[]).map(id => fields.find(field => field.id === id)!);
  const itemKey = view.kind === 'grid' ? 'getPSDEGridColumns' : view.kind === 'edit' ? 'getPSDEFormItems' : 'getPSDEListItems';
  const previousItems = oldControl[itemKey] === undefined ? [] : recordsAt(oldControl[itemKey], `/generatedModel/${itemKey}`);
  const items = selected.map(field => {
    const id = `${controlId}.${field.id}`;
    return {
      ...previousItems.find(item => item.id === id),
      id, name: field.codeName, caption: field.name,
      getPSDEField: { modelref: true, id: `${entity.id}.${field.id}` },
      ...(view.kind === 'edit' ? { allowEmpty: !field.required, editorType: field.type === 'boolean' ? 'SWITCH' : field.type === 'datetime' ? 'DATEPICKER' : field.type === 'string' ? 'TEXTBOX' : 'NUMBER' } : {}),
    };
  });
  // Only the selected wizard-owned items are replaced. Unrelated imported items remain.
  const ownedIds = new Set(fields.map(field => `${controlId}.${field.id}`));
  const retained = previousItems.filter(item => !ownedIds.has(String(item.id)));
  const control = {
    ...oldControl, id: controlId, name: view.kind === 'edit' ? 'form' : view.kind,
    codeName: view.kind === 'edit' ? 'form' : view.kind, controlType: kind.controlType,
    [itemKey]: [...items, ...retained],
  };
  const psView = {
    ...oldView, id: psViewId, name: view.codeName, codeName: view.codeName,
    caption: view.caption, viewType: kind.viewType, sourceView: cloneJson(view),
    getPSDataEntity: { modelref: true, id: entity.id },
    getPSControls: mergeById(controls, [control]),
  };
  return {
    ...model,
    getPSDataEntities: mergeById(oldEntities, [psEntity]),
    getPSAppViews: mergeById(oldViews, [psView]),
  };
}

export function createViewWizard(): PluginContent {
  const value: PluginContent = {
    entity: { id: 'entity_1', name: '业务实体', codeName: 'entity_1', fields: [
      { id: 'id', name: '标识', codeName: 'id', type: 'string', primaryKey: true, required: true },
    ] },
    view: { codeName: 'entity_1_grid', caption: '业务实体列表', kind: 'grid', fieldIds: ['id'] },
    generatedModel: {},
  };
  value.generatedModel = generateViewModel(value);
  return value;
}

export function updateViewWizard(content: PluginContent, section: 'entity' | 'view', patch: PluginContent): PluginContent {
  const value = checked(content, validateViewWizard);
  assertValid(!['entity', 'view'].includes(section) ? [{ path: '', message: '未知向导配置' }] : []);
  value[section] = { ...recordAt(value[section], `/${section}`), ...cloneJson(patch) };
  value.generatedModel = generateViewModel(value);
  return value;
}

export function addWizardField(content: PluginContent): PluginContent {
  const value = checked(content, validateViewWizard);
  const entity = recordAt(value.entity, '/entity');
  const view = recordAt(value.view, '/view');
  const fields = recordsAt(entity.fields, '/entity/fields');
  let number = 1;
  while (fields.some(field => field.id === `field_${number}` ||
    String(field.codeName).toLowerCase() === `field_${number}`)) number += 1;
  const id = `field_${number}`;
  fields.push({ id, codeName: id, name: `字段 ${fields.length + 1}`, type: 'string', primaryKey: false, required: false });
  view.fieldIds = [...view.fieldIds as string[], id];
  value.generatedModel = generateViewModel(value);
  return value;
}

export function updateWizardField(content: PluginContent, id: string, patch: PluginContent): PluginContent {
  const value = checked(content, validateViewWizard);
  const fields = recordsAt(recordAt(value.entity, '/entity').fields, '/entity/fields');
  const index = fields.findIndex(field => field.id === id);
  const safePatch = cloneJson(patch);
  assertValid(index < 0 || (safePatch.id !== undefined && safePatch.id !== id)
    ? [{ path: '/entity/fields', message: '字段不存在或尝试修改字段标识' }] : []);
  fields[index] = { ...fields[index], ...safePatch };
  value.generatedModel = generateViewModel(value);
  return value;
}

export function removeWizardField(content: PluginContent, id: string): PluginContent {
  const value = checked(content, validateViewWizard);
  const entity = recordAt(value.entity, '/entity');
  const view = recordAt(value.view, '/view');
  const fields = recordsAt(entity.fields, '/entity/fields');
  assertValid(!fields.some(field => field.id === id)
    ? [{ path: '/entity/fields', message: '字段不存在或尝试修改字段标识' }] : []);
  entity.fields = fields.filter(field => field.id !== id);
  view.fieldIds = (view.fieldIds as string[]).filter(fieldId => fieldId !== id);
  assertValid(validateViewWizard(value));

  // Remove only this wizard's field and control items; imported extension data stays intact.
  const model = recordAt(value.generatedModel, '/generatedModel');
  const generatedEntity = recordsAt(model.getPSDataEntities ?? [], '/generatedModel/getPSDataEntities')
    .find(item => item.id === entity.id);
  if (generatedEntity?.getPSDEFields !== undefined) {
    generatedEntity.getPSDEFields = recordsAt(generatedEntity.getPSDEFields, '/generatedModel/getPSDEFields')
      .filter(field => field.id !== `${entity.id}.${id}`);
  }
  const viewId = `${entity.id}.${view.codeName}`;
  const generatedView = recordsAt(model.getPSAppViews ?? [], '/generatedModel/getPSAppViews')
    .find(item => item.id === viewId);
  if (generatedView?.getPSControls !== undefined) {
    const controlId = `${viewId}.control`;
    const control = recordsAt(generatedView.getPSControls, '/generatedModel/getPSControls')
      .find(item => item.id === controlId);
    if (control) {
      for (const key of ['getPSDEGridColumns', 'getPSDEFormItems', 'getPSDEListItems']) {
        if (control[key] !== undefined) {
          control[key] = recordsAt(control[key], `/generatedModel/${key}`)
            .filter(item => item.id !== `${controlId}.${id}`);
        }
      }
    }
  }
  value.generatedModel = generateViewModel(value);
  return value;
}
