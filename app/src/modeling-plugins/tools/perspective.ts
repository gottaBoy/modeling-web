import type { PluginContent, ValidationIssue } from '../types';
import { localizeIssue, toolIssue, toolsT } from './messages';
import {
  assertValid, checked, cloneJson, contentIssues, isRecord, nonempty,
  pointerKey, recordAt, resolvePointer, validateWith,
} from './safe';

export interface ModelNode {
  path: string;
  parentPath: string | null;
  depth: number;
  label: string;
  type: string;
  value: unknown;
}

export interface ModelInspection {
  nodes: ModelNode[];
  matches: ModelNode[];
  issues: ValidationIssue[];
  referenceIssues: ValidationIssue[];
  referenceCount: number;
}

export function inspectModel(model: PluginContent, query = ''): ModelInspection {
  const safeIssues = contentIssues(model);
  if (typeof query !== 'string') safeIssues.push(toolIssue('/query', '搜索条件必须是文本'));
  if (safeIssues.length) return { nodes: [], matches: [], issues: safeIssues, referenceIssues: [], referenceCount: 0 };
  const nodes: ModelNode[] = [];
  const issues: ValidationIssue[] = [];
  const ids = new Map<string, ModelNode[]>();
  const paths = new Map<string, ModelNode[]>();
  const references: ModelNode[] = [];
  function isSourceSnapshot(parent: PluginContent, key: string): boolean {
    const source = parent[key];
    if (!isRecord(source)) return false;
    switch (key) {
      case 'sourceEntity': return Array.isArray(parent.getPSDEFields) && source.id === parent.id && Array.isArray(source.fields);
      case 'sourceView': return Array.isArray(parent.getPSControls) && nonempty(parent.viewType) && nonempty(source.codeName);
      case 'sourceSchema': return Array.isArray(parent.getPSDataEntities) && Array.isArray(source.tables);
      case 'sourceTable': return Array.isArray(parent.getPSDEFields) && Array.isArray(source.columns);
      case 'sourceColumn': return typeof parent.stdDataType === 'number' && nonempty(source.type);
      case 'sourceForeignKey': return nonempty(parent.derType) && Array.isArray(parent.fieldMappings) && isRecord(source.references);
      default: return false;
    }
  }
  function index(map: Map<string, ModelNode[]>, key: unknown, node: ModelNode): void {
    if (nonempty(key)) map.set(key, [...(map.get(key) ?? []), node]);
  }
  function walk(value: unknown, path: string, parentPath: string | null, depth: number, key: string, declarations = true): void {
    const label = isRecord(value)
      ? String(value.caption ?? value.logicName ?? value.name ?? value.codeName ?? value.id ?? key)
      : key;
    const node = { path, parentPath, depth, label, type: value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value, value };
    nodes.push(node);
    if (isRecord(value)) {
      if (declarations && (value.modelref === true || typeof value.$ref === 'string')) references.push(node);
      else if (declarations) {
        index(ids, value.id, node);
        index(paths, value.dynaModelFilePath ?? value.filePath ?? value.path, node);
      }
      // Generator provenance is searchable data, not another live model declaration.
      Object.entries(value).forEach(([childKey, child]) =>
        walk(child, `${path}/${pointerKey(childKey)}`, path, depth + 1, childKey, declarations && !isSourceSnapshot(value, childKey)));
    } else if (Array.isArray(value)) {
      const seen = new Set<string>();
      value.forEach((child, childIndex) => {
        if (declarations && isRecord(child) && child.modelref !== true && typeof child.$ref !== 'string') {
          const id = child.id ?? child.codeName;
          if (nonempty(id)) {
            if (seen.has(id)) issues.push(toolIssue(`${path}/${childIndex}`, '同级模型标识重复：{id}', { id }));
            seen.add(id);
          }
        }
        walk(child, `${path}/${childIndex}`, path, depth + 1, String(childIndex), declarations);
      });
    }
  }
  walk(model, '', null, 0, toolsT('模型'));
  const referenceStart = issues.length;
  references.forEach(node => {
    const value = node.value as PluginContent;
    const ref = value.$ref ?? value.path ?? value.id;
    if (!nonempty(ref)) {
      issues.push({ path: node.path, message: '模型引用缺少 $ref、path 或 id' });
      return;
    }
    if (typeof value.$ref === 'string' || ref.startsWith('#') || ref.startsWith('/')) {
      try {
        if (!resolvePointer(model, ref).found) issues.push(toolIssue(node.path, '引用不存在：{ref}', { ref }));
      } catch {
        issues.push(toolIssue(node.path, '无效或不安全的引用：{ref}', { ref }));
      }
      return;
    }
    let candidates = (value.path ? paths : ids).get(ref) ?? [];
    if (!value.path && candidates.length > 1) {
      let scope = node.parentPath ?? '';
      while (scope) {
        const scoped = candidates.filter(candidate => candidate.path === scope || candidate.path.startsWith(`${scope}/`));
        if (scoped.length) {
          candidates = scoped;
          break;
        }
        scope = scope.slice(0, scope.lastIndexOf('/'));
      }
    }
    if (!candidates.length) issues.push(toolIssue(node.path, '导入模型内未找到引用：{ref}', { ref }));
    else if (candidates.length > 1) issues.push(toolIssue(node.path, '引用不唯一：{ref}', { ref }));
  });
  const needle = query.trim().toLocaleLowerCase();
  const matches = needle ? nodes.filter(node =>
    `${node.path} ${node.label} ${isRecord(node.value) || Array.isArray(node.value) ? '' : String(node.value)}`
      .toLocaleLowerCase().includes(needle)) : nodes;
  const localized = issues.map(localizeIssue);
  return { nodes, matches, issues: localized, referenceIssues: localized.slice(referenceStart), referenceCount: references.length };
}

export function validatePerspective(content: PluginContent): ValidationIssue[] {
  return validateWith(content, value => {
    recordAt(value.model, '/model');
    if (typeof value.query !== 'string') {
      assertValid([{ path: '/query', message: '搜索条件必须是文本' }]);
    }
  });
}

export function createPerspective(): PluginContent {
  return { model: { getPSDataEntities: [] }, query: '' };
}

export function importPerspective(content: PluginContent, model: PluginContent): PluginContent {
  assertValid(contentIssues(model));
  return checked({ ...checked(content, validatePerspective), model: cloneJson(model) }, validatePerspective);
}

export function addPerspectiveEntity(content: PluginContent): PluginContent {
  const value = checked(content, validatePerspective);
  const model = recordAt(value.model, '/model');
  const existing = model.getPSDataEntities;
  if (existing !== undefined && !Array.isArray(existing)) {
    assertValid([{ path: '/model/getPSDataEntities', message: '实体集合必须是数组' }]);
  }
  const entities = (existing ?? []) as unknown[];
  let number = 1;
  while (entities.some(item => isRecord(item) && item.id === `entity_${number}`)) number += 1;
  model.getPSDataEntities = [...entities, { id: `entity_${number}`, name: `实体 ${number}`, getPSDEFields: [] }];
  return value;
}
