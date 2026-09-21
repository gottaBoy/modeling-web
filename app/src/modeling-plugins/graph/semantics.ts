import type { PluginContent, ValidationIssue } from '../types';
import { edgesOf, isRecord, nodesOf, records } from './model';
import { topologicalOrder, validateGraph } from './validation';
import { graphT as t } from './messages';

export type CompileResult<T> = { ok: true; value: T; issues: [] } | { ok: false; issues: ValidationIssue[] };
export interface QueryPlan {
  from: string;
  select: string[];
  distinct: boolean;
  filters: PluginContent[];
  orderBy: { field: string; direction: string }[];
  limit: number;
  sql: string;
  parameters: unknown[];
}

const quote = (identifier: string) => identifier.split('.').map(part => `"${part}"`).join('.');
const own = (object: object, key: string) => Object.prototype.hasOwnProperty.call(object, key);

export function fieldValue(record: PluginContent, path: string): unknown {
  let value: unknown = record;
  for (const part of path.split('.')) {
    if (['__proto__', 'prototype', 'constructor'].includes(part) || !isRecord(value) || !own(value, part)) return undefined;
    value = value[part];
  }
  return value;
}

export function evaluatePredicate(properties: PluginContent, record: PluginContent): boolean {
  const actual = fieldValue(record, String(properties.field));
  const expected = properties.value;
  if (properties.operator === 'isNull') return actual === null || actual === undefined;
  if (properties.operator === 'notNull') return actual !== null && actual !== undefined;
  // Missing values and type mismatches never silently satisfy a comparison.
  if (actual === undefined || actual === null || typeof actual !== properties.valueType || typeof expected !== properties.valueType) return false;
  switch (properties.operator) {
    case 'eq': return actual === expected;
    case 'ne': return actual !== expected;
    case 'contains': return typeof actual === 'string' && typeof expected === 'string' && actual.includes(expected);
    case 'gt': return typeof actual === 'number' && typeof expected === 'number' && actual > expected;
    case 'gte': return typeof actual === 'number' && typeof expected === 'number' && actual >= expected;
    case 'lt': return typeof actual === 'number' && typeof expected === 'number' && actual < expected;
    case 'lte': return typeof actual === 'number' && typeof expected === 'number' && actual <= expected;
    default: return false;
  }
}

export function compileQuery(content: PluginContent): CompileResult<QueryPlan> {
  const issues = validateGraph('dataquerydesign', content);
  if (issues.length) return { ok: false, issues };
  const nodes = nodesOf(content);
  const ordered = topologicalOrder(nodes, edgesOf(content)).map(id => nodes.find(node => node.id === id)!);
  const table = ordered.find(node => node.kind === 'table')!;
  const select = ordered.find(node => node.kind === 'select')!.properties;
  const filters = ordered.filter(node => node.kind === 'filter').map(node => ({ ...node.properties }));
  const orderBy = ordered.filter(node => node.kind === 'sort').map(node => ({ field: String(node.properties.field), direction: String(node.properties.direction) }));
  const parameters: unknown[] = [];
  const bind = (value: unknown) => { parameters.push(value); return `$${parameters.length}`; };
  const sqlOperators: Record<string, string> = { eq: '=', ne: '<>', gt: '>', gte: '>=', lt: '<', lte: '<=' };
  const where = filters.map(filter => {
    const field = quote(String(filter.field));
    if (filter.operator === 'isNull') return `${field} IS NULL`;
    if (filter.operator === 'notNull') return `${field} IS NOT NULL`;
    if (filter.operator === 'contains') {
      // Escape LIKE wildcards independently from parameter binding.
      const value = String(filter.value).replace(/[!%_]/g, char => `!${char}`);
      return `${field} LIKE ${bind(`%${value}%`)} ESCAPE '!'`;
    }
    return `${field} ${sqlOperators[String(filter.operator)]} ${bind(filter.value)}`;
  });
  const sql = [
    `SELECT ${select.distinct ? 'DISTINCT ' : ''}${(select.columns as string[]).map(quote).join(', ')}`,
    `FROM ${quote(String(table.properties.tableName))}`,
    ...(where.length ? [`WHERE ${where.join(' AND ')}`] : []),
    ...(orderBy.length ? [`ORDER BY ${orderBy.map(order => `${quote(order.field)} ${order.direction.toUpperCase()}`).join(', ')}`] : []),
    `LIMIT ${bind(select.limit)};`,
  ].join('\n');
  return { ok: true, issues: [], value: {
    from: String(table.properties.tableName), select: [...select.columns as string[]],
    distinct: Boolean(select.distinct), filters, orderBy, limit: Number(select.limit), sql, parameters,
  } };
}

export interface RuleResult {
  passed: boolean;
  root: string;
  results: { id: string; label: string; passed: boolean; message: string }[];
}

export function evaluateRules(content: PluginContent, sample: PluginContent): CompileResult<RuleResult> {
  const issues = validateGraph('valueruledesign', content);
  if (!isRecord(sample)) issues.push({ path: 'sample', message: t('规则输入必须为对象') });
  if (issues.length) return { ok: false, issues };
  const nodes = nodesOf(content);
  const edges = edgesOf(content);
  const order = topologicalOrder(nodes, edges);
  const results = new Map<string, boolean>();
  [...order].reverse().forEach(id => {
    const node = nodes.find(value => value.id === id)!;
    const children = edges.filter(edge => edge.source === id).map(edge => results.get(edge.target) === true);
    const passed = node.kind === 'predicate' ? evaluatePredicate(node.properties, sample)
      : node.kind === 'all' ? children.every(Boolean)
        : node.kind === 'any' ? children.some(Boolean) : !children[0];
    results.set(id, passed);
  });
  return { ok: true, issues: [], value: {
    root: order[0], passed: results.get(order[0]) === true,
    results: nodes.map(node => ({
      id: node.id, label: node.label, passed: results.get(node.id) === true,
      message: results.get(node.id) ? '' : String(node.properties.message ?? t('条件未满足')),
    })),
  } };
}

export interface DataflowResult {
  steps: PluginContent[];
  outputs: { nodeId: string; dataset: string; writeMode: string; rows: PluginContent[] }[];
}

export function runDataflow(content: PluginContent): CompileResult<DataflowResult> {
  const issues = validateGraph('dataflowdesign', content);
  if (issues.length) return { ok: false, issues };
  const nodes = nodesOf(content);
  const edges = edgesOf(content);
  const rowsByNode = new Map<string, PluginContent[]>();
  const steps: PluginContent[] = [];
  const outputs: DataflowResult['outputs'] = [];
  const executionIssues: ValidationIssue[] = [];
  for (const id of topologicalOrder(nodes, edges)) {
    const node = nodes.find(value => value.id === id)!;
    const p = node.properties;
    const incoming = edges.find(edge => edge.target === id);
    let rows = (incoming ? rowsByNode.get(incoming.source) ?? [] : []).map(row => ({ ...row }));
    if (node.kind === 'source') rows = records(p.records).map(row => ({ ...row }));
    if (node.kind === 'filter') rows = rows.filter(row => evaluatePredicate(p, row));
    if (node.kind === 'transform') {
      rows = rows.map((row, rowIndex) => {
        if (p.operation === 'set') return { ...row, [String(p.targetField)]: p.value };
        if (p.operation === 'pick') {
          const fields = p.fields as string[];
          const missing = fields.find(field => !own(row, field));
          if (missing) executionIssues.push({ path: `${id}.rows[${rowIndex}].${missing}`, message: t('保留字段在输入数据中不存在') });
          return Object.fromEntries(fields.filter(field => own(row, field)).map(field => [field, row[field]]));
        }
        const source = String(p.sourceField);
        const target = String(p.targetField);
        if (!own(row, source) || own(row, target)) {
          executionIssues.push({ path: `${id}.rows[${rowIndex}]`, message: t('重命名的原字段不存在，或目标字段已存在') });
          return row;
        }
        const result = { ...row, [target]: row[source] };
        delete result[source];
        return result;
      });
    }
    rowsByNode.set(id, rows);
    steps.push({ id, kind: node.kind, configuration: { ...p }, input: incoming?.source ?? null, rowCount: rows.length });
    if (node.kind === 'sink') outputs.push({ nodeId: id, dataset: String(p.dataset), writeMode: String(p.writeMode), rows });
  }
  return executionIssues.length ? { ok: false, issues: executionIssues } : { ok: true, issues: [], value: { steps, outputs } };
}

export function compileER(content: PluginContent): CompileResult<PluginContent> {
  const issues = validateGraph('erdesign', content);
  if (issues.length) return { ok: false, issues };
  const nodes = nodesOf(content);
  const edges = edgesOf(content);
  const tables = nodes.map(node => ({ id: node.id, name: node.properties.tableName, columns: records(node.properties.columns).map(column => ({ ...column })) }));
  const relations = edges.map(edge => ({
    ...edge.properties, id: edge.id, source: edge.source, target: edge.target,
  }));
  const ddl = tables.map(table => `CREATE TABLE ${quote(String(table.name))} (\n${table.columns.map(column =>
    `  ${quote(String(column.name))} ${column.type === 'VARCHAR' ? 'VARCHAR(255)' : column.type}${column.nullable ? '' : ' NOT NULL'}${column.primary ? ' PRIMARY KEY' : ''}`,
  ).join(',\n')}\n);`);
  edges.forEach(edge => {
    const reverse = edge.properties.cardinality === 'many-to-one';
    const source = nodes.find(node => node.id === edge.source)!;
    const target = nodes.find(node => node.id === edge.target)!;
    const owner = reverse ? source : target;
    const reference = reverse ? target : source;
    const foreignKey = String(reverse ? edge.properties.sourceField : edge.properties.targetField);
    const primaryKey = String(reverse ? edge.properties.targetField : edge.properties.sourceField);
    ddl.push(`ALTER TABLE ${quote(String(owner.properties.tableName))} ADD FOREIGN KEY (${quote(foreignKey)}) REFERENCES ${quote(String(reference.properties.tableName))} (${quote(primaryKey)});`);
    if (edge.properties.cardinality === 'one-to-one') ddl.push(`ALTER TABLE ${quote(String(owner.properties.tableName))} ADD UNIQUE (${quote(foreignKey)});`);
  });
  return { ok: true, issues: [], value: { tables, relations, ddl: ddl.join('\n\n') } };
}

export function semanticPreview(pluginId: string, content: PluginContent): CompileResult<unknown> {
  if (pluginId === 'dataquerydesign') return compileQuery(content);
  if (pluginId === 'valueruledesign') return evaluateRules(content, isRecord(content.sample) ? content.sample : {});
  if (pluginId === 'dataflowdesign') return runDataflow(content);
  if (pluginId === 'erdesign') return compileER(content);
  const issues = validateGraph(pluginId, content);
  if (issues.length) return { ok: false, issues };
  const nodes = nodesOf(content);
  const edges = edgesOf(content);
  return { ok: true, issues: [], value: {
    kind: pluginId === 'workflowdesign' ? 'workflow-plan' : 'logic-plan',
    entry: nodes.find(node => node.kind === 'start')?.id,
    exits: nodes.filter(node => node.kind === 'end').map(node => node.id),
    steps: nodes.map(node => ({
      id: node.id, label: node.label, operation: node.kind, configuration: { ...node.properties },
      next: edges.filter(edge => edge.source === node.id).map(edge => ({
        target: edge.target,
        ...(edge.properties.branch !== undefined ? { when: edge.properties.branch === 'true' } : {}),
      })),
    })),
  } };
}
