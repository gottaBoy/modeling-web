import type { PluginContent, ValidationIssue } from '../types';
import { inspectModel } from './perspective';
import { toolsT } from './messages';
import {
  assertValid, checked, cloneJson, contentIssues, nonempty, own, pointerKey, recordAt, validateWith,
} from './safe';

export const settingDefinitions = [
  { key: 'systemName', get label() { return toolsT('系统名称'); }, type: 'text' },
  { key: 'locale', get label() { return toolsT('语言'); }, type: 'locale' },
  { key: 'strictReferences', get label() { return toolsT('严格引用检查'); }, type: 'boolean' },
  { key: 'pageSize', get label() { return toolsT('默认分页大小'); }, type: 'number' },
  { key: 'readOnly', get label() { return toolsT('只读模型'); }, type: 'boolean' },
] as const;

export function validateAdvanced(content: PluginContent): ValidationIssue[] {
  return validateWith(content, (value, issues) => {
    recordAt(value.model, '/model');
    const settings = recordAt(value.settings, '/settings');
    Object.keys(settings).forEach(key => {
      if (!settingDefinitions.some(definition => definition.key === key)) {
        issues.push({ path: `/settings/${pointerKey(key)}`, message: '设置不在本地白名单中' });
      }
    });
    if (!nonempty(settings.systemName)) issues.push({ path: '/settings/systemName', message: '系统名称不能为空' });
    if (!['zh-CN', 'en-US'].includes(String(settings.locale))) issues.push({ path: '/settings/locale', message: '不支持的语言' });
    if (!Number.isInteger(settings.pageSize) || Number(settings.pageSize) < 1 || Number(settings.pageSize) > 500) {
      issues.push({ path: '/settings/pageSize', message: '分页大小必须是 1 到 500 的整数' });
    }
    ['strictReferences', 'readOnly'].forEach(key => {
      if (typeof settings[key] !== 'boolean') issues.push({ path: `/settings/${key}`, message: '设置必须是布尔值' });
    });
  });
}

export function createAdvanced(): PluginContent {
  return {
    settings: { systemName: '本地建模系统', locale: 'zh-CN', strictReferences: true, pageSize: 20, readOnly: false },
    model: { getPSDataEntities: [] },
  };
}

export function updateSettings(content: PluginContent, patch: PluginContent): PluginContent {
  const value = cloneJson(content);
  const safePatch = cloneJson(patch);
  assertValid(Object.keys(safePatch).filter(key => !settingDefinitions.some(item => item.key === key))
    .map(key => ({ path: `/settings/${pointerKey(key)}`, message: '设置不在本地白名单中' })));
  value.settings = { ...recordAt(value.settings, '/settings'), ...safePatch };
  return checked(value, validateAdvanced);
}

export function removeUnsupportedSetting(content: PluginContent, key: string): PluginContent {
  const value = cloneJson(content);
  const settings = recordAt(value.settings, '/settings');
  assertValid(!own(settings, key) || settingDefinitions.some(item => item.key === key)
    ? [{ path: '/settings', message: '只能显式删除非白名单设置' }] : []);
  delete settings[key];
  return value;
}

export function importAdvancedModel(content: PluginContent, model: PluginContent): PluginContent {
  const value = checked(content, validateAdvanced);
  assertValid((value.settings as PluginContent).readOnly === true
    ? [{ path: '/model', message: '只读模型不能替换' }] : contentIssues(model));
  value.model = cloneJson(model);
  return value;
}

export function consistencyReport(content: PluginContent): {
  valid: boolean; issues: ValidationIssue[]; warnings: ValidationIssue[]; nodeCount: number; referenceCount: number;
} {
  const issues = validateAdvanced(content);
  if (issues.length) return { valid: false, issues, warnings: [], nodeCount: 0, referenceCount: 0 };
  const inspection = inspectModel(content.model as PluginContent);
  const strict = (content.settings as PluginContent).strictReferences === true;
  const referenceIssues = inspection.referenceIssues;
  const consistencyIssues = inspection.issues.filter(issue => !referenceIssues.includes(issue));
  return {
    valid: consistencyIssues.length === 0 && (!strict || referenceIssues.length === 0),
    issues: [...consistencyIssues, ...(strict ? referenceIssues : [])],
    warnings: strict ? [] : referenceIssues,
    nodeCount: inspection.nodes.length,
    referenceCount: inspection.referenceCount,
  };
}
