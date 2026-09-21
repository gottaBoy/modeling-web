import type { PluginContent, ValidationIssue } from '../types';
import { toolIssue } from './messages';
import {
  assertValid, checked, cloneJson, equalJson, isRecord, modelIdIssues, nextId,
  nonempty, own, parseModelJson, pointerKey, recordAt, recordsAt, uniqueIds, validateWith,
} from './safe';

export function validateMaterials(content: PluginContent): ValidationIssue[] {
  return validateWith(content, (value, issues) => {
    issues.push(...modelIdIssues(recordAt(value.targetModel, '/targetModel'))
      .map(issue => ({ ...issue, path: `/targetModel${issue.path}` })));
    const materials = recordsAt(value.materials, '/materials');
    uniqueIds(materials, '/materials');
    materials.forEach((material, index) => {
      const path = `/materials/${index}`;
      if (!nonempty(material.name) || !nonempty(material.kind)) issues.push({ path, message: '素材名称和分类不能为空' });
      if (!Array.isArray(material.tags) || material.tags.some(tag => !nonempty(tag))) issues.push({ path: `${path}/tags`, message: '标签必须是非空文本数组' });
      issues.push(...modelIdIssues(recordAt(material.model, `${path}/model`))
        .map(issue => ({ ...issue, path: `${path}/model${issue.path}` })));
    });
  });
}

export function createMaterials(): PluginContent {
  return { materials: [], targetModel: {} };
}

export function filterMaterials(content: PluginContent, query = '', kind = ''): PluginContent[] {
  const value = checked(content, validateMaterials);
  assertValid(typeof query !== 'string' || typeof kind !== 'string'
    ? [{ path: '/filter', message: '素材筛选条件必须是文本' }] : []);
  const needle = query.trim().toLocaleLowerCase();
  return recordsAt(value.materials, '/materials').filter(material =>
    (!kind || material.kind === kind) &&
    [material.id, material.name, material.kind, ...material.tags as string[]]
      .join(' ').toLocaleLowerCase().includes(needle));
}

export function addMaterial(content: PluginContent, input: PluginContent = {}): PluginContent {
  const value = checked(content, validateMaterials);
  const materials = recordsAt(value.materials, '/materials');
  const id = nextId(materials, 'material');
  materials.push({
    id, name: `模型素材 ${materials.length + 1}`, kind: '实体', tags: [],
    model: { getPSDataEntities: [{ id: `${id}_entity`, name: '复用实体', getPSDEFields: [] }] },
    ...cloneJson(input),
  });
  return checked(value, validateMaterials);
}

export function updateMaterial(content: PluginContent, id: string, patch: PluginContent): PluginContent {
  const value = checked(content, validateMaterials);
  const materials = recordsAt(value.materials, '/materials');
  const index = materials.findIndex(material => material.id === id);
  const safePatch = cloneJson(patch);
  assertValid(index < 0 || (safePatch.id !== undefined && safePatch.id !== id)
    ? [{ path: '/materials', message: '素材不存在或尝试修改素材标识' }] : []);
  materials[index] = { ...materials[index], ...safePatch };
  return checked(value, validateMaterials);
}

export function deleteMaterial(content: PluginContent, id: string): PluginContent {
  const value = checked(content, validateMaterials);
  const materials = recordsAt(value.materials, '/materials');
  assertValid(!materials.some(material => material.id === id) ? [{ path: '/materials', message: '素材不存在' }] : []);
  value.materials = materials.filter(material => material.id !== id);
  return value;
}

export function exportMaterial(content: PluginContent, id: string): string {
  const value = checked(content, validateMaterials);
  const material = recordsAt(value.materials, '/materials').find(item => item.id === id);
  assertValid(!material ? [{ path: '/materials', message: '素材不存在' }] : []);
  return JSON.stringify({ format: 'ibiz-local-material', version: 1, material }, null, 2);
}

export function importMaterial(content: PluginContent, text: string): PluginContent {
  const data = parseModelJson(text);
  assertValid(data.format !== 'ibiz-local-material' || data.version !== 1
    ? [{ path: '', message: '不支持的素材格式或版本' }] : []);
  const extraKeys = Object.keys(data).filter(key => !['format', 'version', 'material'].includes(key));
  assertValid(extraKeys.map(key => ({ path: `/${pointerKey(key)}`, message: '未知封装属性，请放入 material 内保存' })));
  const material = recordAt(data.material, '/material');
  assertValid(validateMaterials({ materials: [material], targetModel: {} })
    .map(issue => ({ ...issue, path: issue.path.replace(/^\/materials\/0(?=\/|$)/, '/material') })));
  return addMaterial(content, material);
}

export interface MaterialPreview {
  target: PluginContent;
  source: PluginContent;
  result: PluginContent;
  conflicts: ValidationIssue[];
  unchanged: boolean;
}

export function previewMaterial(target: PluginContent, source: PluginContent, overwrite = false): MaterialPreview {
  assertValid([...modelIdIssues(target), ...modelIdIssues(source)]);
  assertValid(typeof overwrite !== 'boolean' ? [{ path: '/overwrite', message: '覆盖选项必须是布尔值' }] : []);
  const conflicts: ValidationIssue[] = [];
  function merge(left: unknown, right: unknown, path: string): unknown {
    if (equalJson(left, right)) return cloneJson(left);
    if (isRecord(left) && isRecord(right)) {
      const result = cloneJson(left);
      Object.keys(right).forEach(key => {
        result[key] = own(left, key) ? merge(left[key], right[key], `${path}/${pointerKey(key)}`) : cloneJson(right[key]);
      });
      return result;
    }
    if (Array.isArray(left) && Array.isArray(right) &&
      [...left, ...right].every(item => isRecord(item) && nonempty(item.id) &&
        item.modelref !== true && typeof item.$ref !== 'string')) {
      uniqueIds(left, path);
      uniqueIds(right, path);
      const result = cloneJson(left);
      right.forEach(item => {
        const index = result.findIndex(existing => existing.id === item.id);
        if (index < 0) result.push(cloneJson(item));
        else result[index] = merge(result[index], item, `${path}/${index}`) as PluginContent;
      });
      return result;
    }
    conflicts.push(toolIssue(path, '目标值与素材不同，需要明确覆盖'));
    return cloneJson(overwrite ? right : left);
  }
  const result = merge(target, source, '') as PluginContent;
  return { target: cloneJson(target), source: cloneJson(source), result, conflicts, unchanged: equalJson(target, result) };
}

export function sameMaterialPreview(current: MaterialPreview, reviewed: MaterialPreview): boolean {
  // Translated descriptions are presentation only; all reviewed data and conflict paths must match.
  const snapshot = (preview: MaterialPreview) => {
    recordAt(preview, '/preview');
    return { ...preview, conflicts: recordsAt(preview.conflicts, '/preview/conflicts').map(issue => issue.path) };
  };
  return equalJson(snapshot(current), snapshot(reviewed));
}

export function applyMaterial(content: PluginContent, id: string, options: { confirm: boolean; overwrite?: boolean; preview: MaterialPreview }): PluginContent {
  const value = checked(content, validateMaterials);
  const safeOptions = cloneJson(options);
  assertValid(safeOptions.confirm !== true ? [{ path: '', message: '需要明确确认应用素材' }] : []);
  const material = recordsAt(value.materials, '/materials').find(item => item.id === id);
  assertValid(!material ? [{ path: '/materials', message: '素材不存在' }] : []);
  const current = previewMaterial(value.targetModel as PluginContent, material!.model as PluginContent, safeOptions.overwrite);
  assertValid(!sameMaterialPreview(current, safeOptions.preview) ? [{ path: '', message: '素材或目标已变化，请重新预览' }] : []);
  assertValid(current.conflicts.length && !safeOptions.overwrite ? current.conflicts : []);
  value.targetModel = current.result;
  return value;
}
