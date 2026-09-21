import type { ValidationIssue } from '../types';
import type { LayoutContent, LayoutPluginId, PropertySchema, DataColumn } from './schema';
import { isRecord, layoutSchemas } from './schema';
import { layoutT } from './messages';

export function validIdentifier(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z_][A-Za-z0-9_-]*$/.test(value)
    && !['__proto__', 'constructor', 'prototype'].includes(value);
}

export function validDate(value: unknown): boolean {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validLocalRoute(value: unknown): boolean {
  if (typeof value !== 'string' || !/^\/(?!\/)[A-Za-z0-9_/?=&%#.\-]*$/.test(value)) return false;
  try {
    const path = decodeURIComponent(value.split(/[?#]/, 1)[0]);
    return /^\/(?!\/)/.test(path) && !/[\s\\]/.test(path) && !/(?:^|\/)\.\.(?:\/|$)/.test(path);
  } catch {
    return false;
  }
}

export function validateLayout(id: LayoutPluginId, content: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const add = (path: string, message: string, params = {}) => { issues.push({ path, message: layoutT(message, params) }); };
  const schema = layoutSchemas[id];
  if (!isRecord(content)) return [{ path: '', message: layoutT('内容必须是对象') }];
  if (content.kind !== id) add('kind', '设计器类型必须为 {id}', { id });
  if (typeof content.title !== 'string' || !content.title.trim()) add('title', '名称不能为空');
  const settings = isRecord(content.settings) ? content.settings : {};
  if (!isRecord(content.settings)) add('settings', '设置必须是对象');
  const items = Array.isArray(content.items) ? content.items : [];
  if (!Array.isArray(content.items)) add('items', '组件必须是数组');
  const data = isRecord(content.data) ? content.data : {};
  if (!isRecord(content.data)) add('data', '数据集必须是对象');
  const columns = Array.isArray(data.columns) ? data.columns : [];
  const rows = Array.isArray(data.rows) ? data.rows : [];
  if (!Array.isArray(data.columns)) add('data.columns', '数据列必须是数组');
  if (!Array.isArray(data.rows)) add('data.rows', '数据行必须是数组');
  const columnMap = new Map<string, DataColumn>();
  columns.forEach((column, index) => {
    const path = `data.columns[${index}]`;
    if (!isRecord(column)) { add(path, '数据列必须是对象'); return; }
    if (!validIdentifier(column.key) || String(column.key).includes('-')) add(`${path}.key`, '字段标识格式无效');
    if (typeof column.key === 'string') {
      if (columnMap.has(column.key)) add(`${path}.key`, '字段标识重复');
      columnMap.set(column.key, column as unknown as DataColumn);
    }
    if (typeof column.label !== 'string' || !column.label.trim()) add(`${path}.label`, '字段名称不能为空');
    if (!['text', 'number', 'date', 'boolean'].includes(String(column.type))) add(`${path}.type`, '不支持的数据类型');
  });
  rows.forEach((row, index) => {
    const path = `data.rows[${index}]`;
    if (!isRecord(row)) { add(path, '数据行必须是对象'); return; }
    Object.keys(row).forEach(key => {
      if (!columnMap.has(key)) add(`${path}.${key}`, '引用了不存在的数据列');
    });
    columnMap.forEach(column => {
      const value = row[column.key];
      if (!Object.prototype.hasOwnProperty.call(row, column.key)) { add(`${path}.${column.key}`, '缺少字段值'); return; }
      if (value === null) return;
      if (column.type === 'number' && (typeof value !== 'number' || !Number.isFinite(value))) add(`${path}.${column.key}`, '必须是有限数值或空值');
      if (column.type === 'boolean' && typeof value !== 'boolean') add(`${path}.${column.key}`, '必须是布尔值或空值');
      if (column.type === 'text' && typeof value !== 'string') add(`${path}.${column.key}`, '必须是文本或空值');
      if (column.type === 'date' && !validDate(value)) add(`${path}.${column.key}`, '日期必须是有效的 YYYY-MM-DD');
    });
  });

  const validateProperties = (properties: PropertySchema[], target: Record<string, unknown>, path: string) => {
    properties.forEach(property => {
      const value = target[property.key];
      const at = `${path}.${property.key}`;
      if (value === undefined || value === null) { add(at, '缺少属性值'); return; }
      if (property.control === 'text') {
        if (typeof value !== 'string' || (property.required && !value.trim())) add(at, '必须是有效文本');
      } else if (property.control === 'number') {
        if (typeof value !== 'number' || !Number.isFinite(value)
          || (property.integer && !Number.isInteger(value))
          || (property.min !== undefined && value < property.min)
          || (property.max !== undefined && value > property.max)) add(at,
          property.integer ? '数值必须在 {min} 至 {max} 之间且为整数' : '数值必须在 {min} 至 {max} 之间',
          { min: property.min, max: property.max });
      } else if (property.control === 'boolean') {
        if (typeof value !== 'boolean') add(at, '必须是布尔值');
      } else if (property.control === 'color') {
        if (typeof value !== 'string' || !/^#[0-9a-f]{6}$/i.test(value)) add(at, '颜色必须是六位十六进制色值');
      } else if (property.control === 'options') {
        if (!Array.isArray(value) || !value.length || value.some(entry => typeof entry !== 'string' || !entry.trim())
          || new Set(value).size !== value.length) add(at, '至少需要一个非空且不重复的选项');
      } else if (property.control === 'select') {
        if (typeof value !== 'string') { add(at, '选项必须是字符串'); return; }
        if (property.options && !property.options.some(entry => entry.value === value)) add(at, '不支持的选项');
        if (property.source === 'fields' || property.source === 'numericFields' || property.source === 'dateFields') {
          const column = columnMap.get(value);
          if (!column) add(at, '引用了不存在的数据字段');
          else if (property.source === 'numericFields' && column.type !== 'number') add(at, '必须引用数值字段');
          else if (property.source === 'dateFields' && column.type !== 'date') add(at, '必须引用日期字段');
        }
      }
    });
  };
  validateProperties(schema.settings, settings, 'settings');
  const itemMap = new Map<string, Record<string, unknown>>();
  const names = new Set<string>();
  const groupFields = new Set<string>();
  items.forEach((item, index) => {
    const path = `items[${index}]`;
    if (!isRecord(item)) { add(path, '组件必须是对象'); return; }
    if (!validIdentifier(item.id)) add(`${path}.id`, '组件标识格式无效');
    if (typeof item.id === 'string') {
      if (itemMap.has(item.id)) add(`${path}.id`, '组件标识重复');
      itemMap.set(item.id, item);
    }
    const palette = schema.palette.find(entry => entry.type === item.type);
    if (!palette) { add(`${path}.type`, '不支持的组件类型'); return; }
    validateProperties(palette.properties, item, path);
    if (id === 'formdesign') {
      if (!validIdentifier(item.name)) add(`${path}.name`, '字段标识格式无效');
      if (names.has(String(item.name))) add(`${path}.name`, '表单字段标识重复');
      names.add(String(item.name));
      if (item.type === 'select' && Array.isArray(item.options) && item.defaultValue !== '' && !item.options.includes(item.defaultValue)) add(`${path}.defaultValue`, '默认值不在选项中');
      if (item.type === 'date' && item.defaultValue !== '' && !validDate(item.defaultValue)) add(`${path}.defaultValue`, '默认日期无效');
      if (item.type === 'number') {
        if (Number(item.min) > Number(item.max)) add(`${path}.max`, '最大值不能小于最小值');
        if (Number(item.defaultValue) < Number(item.min) || Number(item.defaultValue) > Number(item.max)) add(`${path}.defaultValue`, '默认值必须在数值范围内');
      }
    }
    if (id === 'griddesign' && item.type === 'date' && columnMap.get(String(item.field))?.type !== 'date') add(`${path}.field`, '日期列必须引用日期字段');
    if (id === 'menudesign' && item.type === 'item') {
      if (!validLocalRoute(item.route)) add(`${path}.route`, '路由必须是本地绝对路径');
    }
    if (id === 'treeviewdesign' && item.type === 'node') {
      if (names.has(String(item.value))) add(`${path}.value`, '节点值重复');
      names.add(String(item.value));
    }
    if (id === 'bireportdesign' && item.type === 'group') {
      if (groupFields.has(String(item.field))) add(`${path}.field`, '分组字段重复');
      groupFields.add(String(item.field));
    }
  });
  if (schema.parentTypes) {
    items.forEach((item, index) => {
      if (!isRecord(item) || item.parentId === '') return;
      const path = `items[${index}].parentId`;
      const parent = itemMap.get(String(item.parentId));
      if (!parent) { add(path, '父级不存在'); return; }
      if (!schema.parentTypes!.includes(String(parent.type))) add(path, '父级必须是容器或目录');
      const seen = new Set<unknown>([item.id]);
      let cursor: Record<string, unknown> | undefined = parent;
      while (cursor) {
        if (seen.has(cursor.id)) { add(path, '父级引用形成循环'); break; }
        seen.add(cursor.id);
        cursor = itemMap.get(String(cursor.parentId));
      }
    });
  }
  return issues;
}

export function validateFormValues(content: LayoutContent, values: Record<string, unknown>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  content.items.forEach(item => {
    if (item.disabled === true) return;
    const value = values[item.id];
    const add = (message: string, params = {}) => issues.push({
      path: item.id, message: layoutT(message, { label: item.label, ...params }),
    });
    const empty = value === undefined || value === null || value === ''
      || (typeof value === 'string' && !value.trim()) || (item.type === 'checkbox' && value !== true);
    if (empty) {
      if (item.required === true) add('{label}：必填');
      return;
    }
    if (item.type === 'number') {
      if (typeof value !== 'number' || !Number.isFinite(value)) add('{label}：必须是有效数值');
      else if ((typeof item.min === 'number' && value < item.min) || (typeof item.max === 'number' && value > item.max)) {
        add('{label}：数值必须在 {min} 至 {max} 之间', { min: item.min, max: item.max });
      }
    }
    if (item.type === 'date' && !validDate(value)) add('{label}：日期无效');
    if (item.type === 'select' && (!Array.isArray(item.options) || !item.options.includes(value))) add('{label}：不支持的选项');
  });
  return issues;
}
