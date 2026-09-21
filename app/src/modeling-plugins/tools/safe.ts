import type { PluginContent, ValidationIssue } from '../types';
import { issueText, localizeIssue, toolIssue, toolsT } from './messages';
import type { ToolsMessageKey } from './messages';

export const dangerousKeys = new Set(['__proto__', 'prototype', 'constructor']);
export const own = (value: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(value, key);
export const isRecord = (value: unknown): value is PluginContent =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
export const pointerKey = (key: string): string =>
  key.replace(/~/g, '~0').replace(/\//g, '~1');

export class ToolValidationError extends Error {
  issues: ValidationIssue[];

  constructor(issues: ValidationIssue[]) {
    super();
    this.name = 'ToolValidationError';
    this.issues = issues.map(localizeIssue);
    Object.defineProperty(this, 'message', {
      configurable: true,
      get: () => this.issues.map(issue => `${issue.path || '/'}: ${issueText(issue)}`).join('\n'),
    });
  }
}

export function toolErrorText(reason: unknown, fallback: ToolsMessageKey = '操作失败'): string {
  if (reason instanceof ToolValidationError) return reason.message;
  return reason instanceof Error ? `${toolsT(fallback)}: ${reason.message}` : toolsT(fallback);
}

export function jsonIssues(value: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ancestors = new Set<object>();
  let count = 0;
  function walk(item: unknown, path: string, depth: number): void {
    count += 1;
    if (count > 100000 || depth > 100) {
      if (!issues.some(issue => issue.message === '模型超过安全遍历限制')) {
        issues.push({ path, message: '模型超过安全遍历限制' });
      }
      return;
    }
    if (item === null || typeof item === 'string' || typeof item === 'boolean') return;
    if (typeof item === 'number' && Number.isFinite(item)) return;
    if (typeof item !== 'object') {
      issues.push({ path, message: '只接受可无损保存的 JSON 值' });
      return;
    }
    const prototype = Object.getPrototypeOf(item);
    if (
      Array.isArray(item)
        ? prototype !== Array.prototype
        : prototype !== Object.prototype && prototype !== null
    ) {
      issues.push({ path, message: '只接受普通 JSON 对象或数组' });
      return;
    }
    if (ancestors.has(item)) {
      issues.push({ path, message: '不接受循环引用' });
      return;
    }
    ancestors.add(item);
    const keys = Reflect.ownKeys(item);
    if (Array.isArray(item) && keys.length !== item.length + 1) {
      issues.push({ path, message: '不接受稀疏数组或数组扩展属性' });
    }
    for (const key of keys) {
      if (Array.isArray(item) && key === 'length') continue;
      if (typeof key !== 'string') {
        issues.push({ path, message: '不接受 Symbol 属性' });
        continue;
      }
      const childPath = `${path}/${pointerKey(key)}`;
      if (dangerousKeys.has(key)) {
        issues.push({ path: childPath, message: '禁止危险属性名' });
        continue;
      }
      const descriptor = Object.getOwnPropertyDescriptor(item, key)!;
      if (!own(descriptor, 'value') || !descriptor.enumerable) {
        issues.push({ path: childPath, message: '不接受访问器或不可枚举属性' });
        continue;
      }
      if (Array.isArray(item) && !/^(0|[1-9]\d*)$/.test(key)) {
        issues.push({ path: childPath, message: '不接受数组扩展属性' });
        continue;
      }
      walk(descriptor.value, childPath, depth + 1);
      if (count > 100000) break;
    }
    ancestors.delete(item);
  }
  walk(value, '', 0);
  return issues.map(localizeIssue);
}

export function assertValid(issues: ValidationIssue[]): void {
  if (issues.length) throw new ToolValidationError(issues);
}

export function cloneJson<T>(value: T): T {
  assertValid(jsonIssues(value));
  return JSON.parse(JSON.stringify(value)) as T;
}

export function contentIssues(content: unknown): ValidationIssue[] {
  const issues = jsonIssues(content);
  if (!isRecord(content)) issues.push({ path: '', message: '模型必须是 JSON 对象' });
  return issues.map(localizeIssue);
}

export function modelIdIssues(model: PluginContent): ValidationIssue[] {
  const issues = contentIssues(model);
  if (issues.length) return issues;
  function walk(value: unknown, path: string): void {
    if (Array.isArray(value)) {
      const seen = new Set<string>();
      value.forEach((item, index) => {
        const childPath = `${path}/${index}`;
        if (isRecord(item) && item.modelref !== true && typeof item.$ref !== 'string' && nonempty(item.id)) {
          if (seen.has(item.id)) issues.push(toolIssue(childPath, '同级模型标识重复：{id}', { id: item.id }));
          seen.add(item.id);
        }
        walk(item, childPath);
      });
    } else if (isRecord(value)) {
      Object.entries(value).forEach(([key, item]) => walk(item, `${path}/${pointerKey(key)}`));
    }
  }
  walk(model, '');
  return issues;
}

export function parseModelJson(text: string): PluginContent {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new ToolValidationError([{ path: '', message: 'JSON 格式错误' }]);
  }
  assertValid(contentIssues(value));
  return cloneJson(value as PluginContent);
}

export function recordAt(value: unknown, path: string): PluginContent {
  if (!isRecord(value)) {
    throw new ToolValidationError([{ path, message: '必须是对象' }]);
  }
  return value;
}

export function recordsAt(value: unknown, path: string): PluginContent[] {
  if (!Array.isArray(value) || value.some(item => !isRecord(item))) {
    throw new ToolValidationError([{ path, message: '必须是对象数组' }]);
  }
  return value;
}

export function checked<T extends PluginContent>(
  value: T,
  validate: (content: PluginContent) => ValidationIssue[],
): T {
  assertValid(validate(value));
  return cloneJson(value);
}

export function validateWith(
  content: unknown,
  check: (value: PluginContent, issues: ValidationIssue[]) => void,
): ValidationIssue[] {
  const issues = contentIssues(content);
  if (issues.length) return issues;
  try {
    check(content as PluginContent, issues);
  } catch (error) {
    if (error instanceof ToolValidationError) issues.push(...error.issues);
    else throw error;
  }
  return issues.map(localizeIssue);
}

export function nonempty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function identifier(value: unknown): value is string {
  return nonempty(value) && /^[A-Za-z_][A-Za-z0-9_]*$/.test(value) &&
    !dangerousKeys.has(value);
}

export function uniqueIds(items: PluginContent[], path: string, key = 'id'): void {
  const seen = new Set<string>();
  const issues: ValidationIssue[] = [];
  items.forEach((item, index) => {
    const value = item[key];
    if (!nonempty(value) || dangerousKeys.has(value)) {
      issues.push({ path: `${path}/${index}/${key}`, message: '标识不能为空或使用危险名称' });
    } else if (seen.has(value)) {
      issues.push({ path: `${path}/${index}/${key}`, message: '标识重复' });
    } else seen.add(value);
  });
  assertValid(issues);
}

export function nextId(items: PluginContent[], prefix: string): string {
  const ids = new Set(items.map(item => item.id));
  let number = 1;
  while (ids.has(`${prefix}_${number}`)) number += 1;
  return `${prefix}_${number}`;
}

export function equalJson(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left) && Array.isArray(right) &&
      left.length === right.length && left.every((item, index) => equalJson(item, right[index]));
  }
  if (!isRecord(left) || !isRecord(right)) return false;
  const keys = Object.keys(left);
  return keys.length === Object.keys(right).length &&
    keys.every(key => own(right, key) && equalJson(left[key], right[key]));
}

export function pointerParts(pointer: string): string[] {
  const value = pointer.startsWith('#') ? pointer.slice(1) : pointer;
  if (value === '') return [];
  if (!value.startsWith('/') || /~(?![01])/u.test(value)) {
    throw new ToolValidationError([{ path: pointer, message: '引用必须是 JSON Pointer' }]);
  }
  const parts = value.slice(1).split('/').map(part => part.replace(/~1/g, '/').replace(/~0/g, '~'));
  if (parts.some(part => dangerousKeys.has(part))) {
    throw new ToolValidationError([{ path: pointer, message: '引用包含危险属性名' }]);
  }
  return parts;
}

export function resolvePointer(model: unknown, pointer: string): { found: boolean; value?: unknown } {
  let current = model;
  for (const part of pointerParts(pointer)) {
    if ((!isRecord(current) && !Array.isArray(current)) || !own(current, part)) return { found: false };
    if (Array.isArray(current) && !/^(0|[1-9]\d*)$/.test(part)) return { found: false };
    current = (current as PluginContent)[part];
  }
  return { found: true, value: current };
}

export function mergeById(existing: unknown, generated: PluginContent[]): PluginContent[] {
  uniqueIds(generated, '/generatedModel');
  if (existing === undefined) return cloneJson(generated);
  const items = recordsAt(existing, '/generatedModel');
  uniqueIds(items, '/generatedModel');
  const result = cloneJson(items);
  generated.forEach(item => {
    const index = result.findIndex(old => old.id === item.id);
    if (index < 0) result.push(cloneJson(item));
    else result[index] = { ...result[index], ...cloneJson(item) };
  });
  return result;
}
