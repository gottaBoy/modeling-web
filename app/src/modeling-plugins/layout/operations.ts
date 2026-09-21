import type { LayoutContent, LayoutItem, LayoutPluginId, DataType, PropertySchema, PropertyOption } from './schema';
import { cloneValue, layoutSchemas, propertyDefaults, seriesColors } from './schema';
import { layoutT } from './messages';
import { validDate } from './validation';

export function nextKey(keys: string[], prefix: string): string {
  const used = new Set(keys);
  let index = 1;
  while (used.has(`${prefix}_${index}`)) index += 1;
  return `${prefix}_${index}`;
}

export function descendants(items: LayoutItem[], id: string): Set<string> {
  const result = new Set<string>([id]);
  let changed = true;
  while (changed) {
    changed = false;
    items.forEach(item => {
      if (typeof item.parentId === 'string' && result.has(item.parentId) && !result.has(item.id)) {
        result.add(item.id);
        changed = true;
      }
    });
  }
  return result;
}

export function propertyOptions(
  property: PropertySchema,
  content: LayoutContent,
  selected?: LayoutItem,
): PropertyOption[] {
  if (property.source === 'parents') {
    const excluded = selected ? descendants(content.items, selected.id) : new Set<string>();
    const parentTypes = layoutSchemas[content.kind].parentTypes || [];
    return [{ value: '', label: layoutT('根级') }, ...content.items
      .filter(item => parentTypes.includes(item.type) && !excluded.has(item.id))
      .map(item => ({ value: item.id, label: item.label }))];
  }
  if (property.source === 'fields' || property.source === 'numericFields' || property.source === 'dateFields') {
    return content.data.columns
      .filter(column => property.source !== 'numericFields' || column.type === 'number')
      .filter(column => property.source !== 'dateFields' || column.type === 'date')
      .filter(column => content.kind !== 'bireportdesign' || selected?.type !== 'group'
        || !content.items.some(item => item.type === 'group' && item.id !== selected.id && item.field === column.key))
      .map(column => ({ value: column.key, label: `${column.label} (${column.key})` }));
  }
  return property.options || [];
}

export function addLayoutItem(
  id: LayoutPluginId,
  content: LayoutContent,
  type = layoutSchemas[id].palette[0].type,
  parentId = '',
): LayoutContent {
  const palette = layoutSchemas[id].palette.find(entry => entry.type === type);
  if (!palette) return content;
  const item: LayoutItem = {
    ...propertyDefaults(palette.properties),
    id: nextKey(content.items.map(entry => entry.id), type),
    type, label: `${palette.label} ${content.items.filter(entry => entry.type === type).length + 1}`,
  };
  for (const property of palette.properties) {
    if (property.source && property.source !== 'parents') {
      const options = propertyOptions(property, content, item);
      if (!options.length) return content;
      const unused = options.find(entry => !content.items.some(existing => existing[property.key] === entry.value));
      item[property.key] = (unused || options[0]).value;
    }
  }
  if ('name' in item) item.name = nextKey(content.items.map(entry => String(entry.name)), 'field');
  if ('value' in item) item.value = nextKey(content.items.map(entry => String(entry.value)), 'record');
  if ('color' in item) item.color = seriesColors[content.items.length % seriesColors.length];
  if ('parentId' in item && content.items.some(entry => entry.id === parentId
    && layoutSchemas[id].parentTypes?.includes(entry.type))) item.parentId = parentId;
  return { ...content, items: [...content.items, item] };
}

export function updateLayoutItem(content: LayoutContent, id: string, patch: Record<string, unknown>): LayoutContent {
  return {
    ...content,
    items: content.items.map(item => item.id === id ? { ...item, ...cloneValue(patch), id: item.id } : item),
  };
}

export function changeItemType(content: LayoutContent, id: string, type: string): LayoutContent {
  const previous = content.items.find(item => item.id === id);
  if (!previous || previous.type === type) return content;
  const withoutPrevious = { ...content, items: content.items.filter(entry => entry.id !== id) };
  const added = addLayoutItem(content.kind, withoutPrevious, type, String(previous.parentId || ''));
  if (added === withoutPrevious) return content;
  const item: LayoutItem = { ...previous, ...added.items[added.items.length - 1], id, label: previous.label };
  const schema = layoutSchemas[content.kind];
  const properties = schema.palette.find(entry => entry.type === type)!.properties;
  const previousProperties = schema.palette.find(entry => entry.type === previous.type)?.properties || [];
  // Keep compatible user settings and bindings; use defaults only for new controls.
  for (const property of properties) {
    if (!previousProperties.some(entry => entry.key === property.key && entry.control === property.control)) continue;
    const value = previous[property.key];
    if (property.control === 'select' && !propertyOptions(property, content, previous).some(entry => entry.value === value)) continue;
    if (property.key === 'defaultValue') {
      if (type === 'select' && Array.isArray(item.options) && value !== '' && !item.options.includes(value)) continue;
      if (type === 'date' && value !== '' && !validDate(value)) continue;
    }
    if (value !== undefined) item[property.key] = cloneValue(value);
  }
  const canParent = schema.parentTypes?.includes(type);
  return {
    ...content,
    items: content.items.map(entry => {
      if (entry.id === id) return item;
      if (!canParent && entry.parentId === id) return { ...entry, parentId: previous.parentId || '' };
      return entry;
    }),
  };
}

export function removeLayoutItem(content: LayoutContent, id: string): LayoutContent {
  const removed = content.items.find(item => item.id === id);
  if (!removed) return content;
  return {
    ...content,
    items: content.items.filter(item => item.id !== id)
      .map(item => item.parentId === id ? { ...item, parentId: removed.parentId || '' } : item),
  };
}

export function moveLayoutItem(content: LayoutContent, id: string, direction: -1 | 1): LayoutContent {
  const index = content.items.findIndex(item => item.id === id);
  if (index < 0) return content;
  const siblings = content.items.map((item, position) => ({ item, position }))
    .filter(entry => (entry.item.parentId || '') === (content.items[index].parentId || ''));
  const siblingIndex = siblings.findIndex(entry => entry.position === index);
  const target = siblings[siblingIndex + direction]?.position;
  if (target === undefined) return content;
  const items = [...content.items];
  [items[index], items[target]] = [items[target], items[index]];
  return { ...content, items };
}

export function updateLayoutSettings(content: LayoutContent, patch: Record<string, unknown>): LayoutContent {
  return { ...content, settings: { ...content.settings, ...cloneValue(patch) } };
}

export function dataColumnReferences(content: LayoutContent, key: string): string[] {
  const schema = layoutSchemas[content.kind];
  const references: string[] = [];
  const matches = (property: PropertySchema) => Boolean(property.source && property.source !== 'parents');
  schema.settings.filter(matches).forEach(property => {
    if (content.settings[property.key] === key) references.push(`settings.${property.key}`);
  });
  content.items.forEach((item, index) => {
    schema.palette.find(entry => entry.type === item.type)?.properties.filter(matches).forEach(property => {
      if (item[property.key] === key) references.push(`items[${index}].${property.key}`);
    });
  });
  return references;
}

export function defaultCell(type: DataType, index: number): unknown {
  if (type === 'number') return (index + 1) * 100;
  if (type === 'boolean') return false;
  if (type === 'date') return '2026-09-01';
  return layoutT('记录 {index}', { index: index + 1 });
}

export function addDataRow(content: LayoutContent): LayoutContent {
  const row = Object.fromEntries(content.data.columns.map(column => [
    column.key, defaultCell(column.type, content.data.rows.length),
  ]));
  return { ...content, data: { ...content.data, rows: [...content.data.rows, row] } };
}

export function updateDataCell(content: LayoutContent, index: number, key: string, value: unknown): LayoutContent {
  if (!content.data.columns.some(column => column.key === key)) return content;
  return {
    ...content,
    data: { ...content.data, rows: content.data.rows.map((row, position) => position === index ? { ...row, [key]: cloneValue(value) } : row) },
  };
}

export function removeDataRow(content: LayoutContent, index: number): LayoutContent {
  return { ...content, data: { ...content.data, rows: content.data.rows.filter((_, position) => position !== index) } };
}

export function moveDataRow(content: LayoutContent, index: number, direction: -1 | 1): LayoutContent {
  const target = index + direction;
  if (index < 0 || target < 0 || index >= content.data.rows.length || target >= content.data.rows.length) return content;
  const rows = [...content.data.rows];
  [rows[index], rows[target]] = [rows[target], rows[index]];
  return { ...content, data: { ...content.data, rows } };
}

export function addDataColumn(content: LayoutContent, type: DataType): LayoutContent {
  const key = nextKey(content.data.columns.map(column => column.key), 'field');
  const names = { text: '文本', number: '数值', date: '日期', boolean: '布尔值' };
  return {
    ...content,
    data: {
      ...content.data,
      columns: [...content.data.columns, { key, label: `${layoutT(names[type])} ${content.data.columns.length + 1}`, type }],
      rows: content.data.rows.map((row, index) => ({ ...row, [key]: defaultCell(type, index) })),
    },
  };
}

export function renameDataColumn(content: LayoutContent, key: string, label: string): LayoutContent {
  return {
    ...content, data: { ...content.data, columns: content.data.columns.map(column => column.key === key ? { ...column, label } : column) },
  };
}

export function removeDataColumn(content: LayoutContent, key: string): LayoutContent {
  if (dataColumnReferences(content, key).length) return content;
  return {
    ...content,
    data: {
      ...content.data,
      columns: content.data.columns.filter(column => column.key !== key),
      rows: content.data.rows.map(row => Object.fromEntries(Object.entries(row).filter(([field]) => field !== key))),
    },
  };
}
