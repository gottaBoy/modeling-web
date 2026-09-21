import type { PluginContent, ValidationIssue } from '../types';
import {
  assertValid, checked, cloneJson, contentIssues, equalJson, isRecord,
  own, pointerKey, pointerParts, recordAt, validateWith,
} from './safe';

export interface SyncChange {
  path: string;
  kind: 'add' | 'remove' | 'replace';
  status: 'ready' | 'conflict' | 'unchanged' | 'local-only';
  baseExists: boolean;
  targetExists: boolean;
  incomingExists: boolean;
  base?: unknown;
  target?: unknown;
  incoming?: unknown;
}

export interface SyncPreview {
  base: PluginContent;
  target: PluginContent;
  incoming: PluginContent;
  changes: SyncChange[];
  unchangedCount: number;
  conflictCount: number;
}

const missing = Symbol('missing');

export function previewSync(base: PluginContent, target: PluginContent, incoming: PluginContent): SyncPreview {
  assertValid([...contentIssues(base), ...contentIssues(target), ...contentIssues(incoming)]);
  const changes: SyncChange[] = [];
  let unchangedCount = 0;
  function walk(before: unknown, local: unknown, remote: unknown, path: string): void {
    if (equalJson(before, local) && equalJson(before, remote)) {
      unchangedCount += 1;
      return;
    }
    // Arrays are atomic: index-based merging could silently misattach fields or references.
    if ((isRecord(before) || before === missing) && isRecord(local) && isRecord(remote)) {
      const previous = before === missing ? {} : before as PluginContent;
      const keys = new Set([...Object.keys(previous), ...Object.keys(local), ...Object.keys(remote)]);
      [...keys].sort().forEach(key => walk(
        own(previous, key) ? previous[key] : missing,
        own(local, key) ? local[key] : missing,
        own(remote, key) ? remote[key] : missing,
        `${path}/${pointerKey(key)}`,
      ));
      return;
    }
    const status = equalJson(local, remote) ? 'unchanged'
      : equalJson(before, remote) ? 'local-only'
        : equalJson(before, local) ? 'ready' : 'conflict';
    if (status === 'unchanged') unchangedCount += 1;
    changes.push({
      path, kind: remote === missing ? 'remove' : local === missing ? 'add' : 'replace',
      status, baseExists: before !== missing, targetExists: local !== missing, incomingExists: remote !== missing,
      ...(before !== missing ? { base: cloneJson(before) } : {}),
      ...(local !== missing ? { target: cloneJson(local) } : {}),
      ...(remote !== missing ? { incoming: cloneJson(remote) } : {}),
    });
  }
  walk(base, target, incoming, '');
  return {
    base: cloneJson(base), target: cloneJson(target), incoming: cloneJson(incoming),
    changes, unchangedCount, conflictCount: changes.filter(change => change.status === 'conflict').length,
  };
}

export function applySync(
  target: PluginContent,
  preview: SyncPreview,
  options: { confirm: boolean; resolutions?: Record<string, 'incoming' | 'local'> },
): PluginContent {
  assertValid(contentIssues(target));
  const reviewed = cloneJson(preview);
  const safeOptions = cloneJson(options);
  assertValid(safeOptions.confirm !== true ? [{ path: '', message: '需要明确确认应用同步' }] : []);
  const current = previewSync(reviewed.base, target, reviewed.incoming);
  assertValid(!equalJson(current, reviewed) ? [{ path: '', message: '预览已过期或被修改，请重新预览' }] : []);
  const resolutions = safeOptions.resolutions ?? {};
  recordAt(resolutions, '/resolutions');
  const issues: ValidationIssue[] = [];
  Object.entries(resolutions).forEach(([path, resolution]) => {
    if (!current.changes.some(change => change.path === path && change.status === 'conflict') ||
      !['incoming', 'local'].includes(resolution)) {
      issues.push({ path, message: '无效冲突决策' });
    }
  });
  current.changes.filter(change => change.status === 'conflict').forEach(change => {
    if (!own(resolutions, change.path)) issues.push({ path: change.path, message: '必须逐项解决冲突' });
  });
  assertValid(issues);
  const result = cloneJson(target);
  current.changes.forEach(change => {
    if (change.status !== 'ready' && !(change.status === 'conflict' && resolutions[change.path] === 'incoming')) return;
    const parts = pointerParts(change.path);
    const key = parts.pop();
    assertValid(key === undefined ? [{ path: '', message: '不允许删除或替换模型根对象' }] : []);
    let parent = result;
    parts.forEach(part => {
      if (!own(parent, part)) parent[part] = {};
      parent = recordAt(parent[part], change.path);
    });
    if (change.incomingExists) parent[key!] = cloneJson(change.incoming);
    else delete parent[key!];
  });
  return result;
}

export function validateSync(content: PluginContent): ValidationIssue[] {
  return validateWith(content, value => {
    ['base', 'target', 'incoming'].forEach(key => recordAt(value[key], `/${key}`));
  });
}

export function createSync(): PluginContent {
  return { base: { name: '本地模型' }, target: { name: '本地模型' }, incoming: { name: '本地模型' } };
}

export function addSyncChange(content: PluginContent): PluginContent {
  const value = checked(content, validateSync);
  const incoming = recordAt(value.incoming, '/incoming');
  let number = 1;
  while (own(incoming, `entity_${number}`)) number += 1;
  incoming[`entity_${number}`] = { id: `entity_${number}`, name: `新增实体 ${number}`, getPSDEFields: [] };
  return value;
}

export function applySyncContent(content: PluginContent, preview: SyncPreview, options: Parameters<typeof applySync>[2]): PluginContent {
  const value = checked(content, validateSync);
  const reviewed = cloneJson(preview);
  assertValid(!equalJson(value.base, reviewed.base) || !equalJson(value.incoming, reviewed.incoming)
    ? [{ path: '', message: '同步输入已变化，请重新预览' }] : []);
  value.target = applySync(value.target as PluginContent, reviewed, options);
  return value;
}
