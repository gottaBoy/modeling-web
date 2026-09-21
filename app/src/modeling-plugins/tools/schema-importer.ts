import type { PluginContent, ValidationIssue } from '../types';
import {
  assertValid, checked, cloneJson, equalJson, identifier, modelIdIssues, own, recordAt, recordsAt, validateWith,
} from './safe';
import { previewMaterial, sameMaterialPreview } from './materials';
import type { MaterialPreview } from './materials';

const databaseTypes = new Map<string, { stdDataType: number; family: string }>([
  ...['varchar', 'char', 'text', 'uuid'].map(type => [type, { stdDataType: 25, family: 'string' }] as const),
  ...['integer', 'int', 'smallint'].map(type => [type, { stdDataType: 9, family: 'integer' }] as const),
  ['bigint', { stdDataType: 6, family: 'integer' }],
  ...['decimal', 'numeric', 'float', 'double'].map(type => [type, { stdDataType: 6, family: 'number' }] as const),
  ...['boolean', 'bool'].map(type => [type, { stdDataType: 9, family: 'boolean' }] as const),
  ...['date', 'datetime', 'timestamp'].map(type => [type, { stdDataType: 5, family: 'datetime' }] as const),
  ['json', { stdDataType: 21, family: 'json' }],
]);
export const schemaTypeNames = [...databaseTypes.keys()];

export function mapDatabaseType(type: string): { stdDataType: number; family: string } {
  const mapping = typeof type === 'string' ? databaseTypes.get(type.toLowerCase()) : undefined;
  assertValid(!mapping ? [{ path: '/type', message: '不支持的字段类型，请使用结构化基础类型' }] : []);
  return { ...mapping! };
}

export function validateRelationalSchema(schema: PluginContent): ValidationIssue[] {
  return validateWith(schema, (value, issues) => {
    if (!identifier(value.name)) issues.push({ path: '/name', message: '模式名称必须是合法代码名' });
    const tables = recordsAt(value.tables, '/tables');
    const tableMap = new Map<string, PluginContent>();
    function names(items: PluginContent[], path: string): void {
      const seen = new Set<string>();
      items.forEach((item, index) => {
        if (!identifier(item.name)) issues.push({ path: `${path}/${index}/name`, message: '名称必须是合法且安全的代码名' });
        else {
          const name = item.name.toLowerCase();
          if (seen.has(name)) issues.push({ path: `${path}/${index}/name`, message: '名称重复（不区分大小写）' });
          seen.add(name);
        }
      });
    }
    function keyColumns(value: unknown, columns: PluginContent[], path: string): value is string[] {
      const valid = Array.isArray(value) && value.length > 0 &&
        value.every(name => typeof name === 'string' && columns.some(column => column.name === name)) &&
        new Set(value).size === value.length;
      if (!valid) issues.push({ path, message: '键必须引用存在且不重复的字段，不能为空' });
      return valid;
    }
    names(tables, '/tables');
    tables.forEach(table => {
      if (typeof table.name === 'string') tableMap.set(table.name, table);
    });
    tables.forEach((table, index) => {
      const path = `/tables/${index}`;
      const columns = recordsAt(table.columns, `${path}/columns`);
      if (!columns.length) issues.push({ path: `${path}/columns`, message: '表至少需要一个字段' });
      names(columns, `${path}/columns`);
      const validPk = keyColumns(table.primaryKey, columns, `${path}/primaryKey`);
      columns.forEach((column, columnIndex) => {
        const columnPath = `${path}/columns/${columnIndex}`;
        const mapping = typeof column.type === 'string' ? databaseTypes.get(column.type.toLowerCase()) : undefined;
        if (!mapping) issues.push({ path: `${columnPath}/type`, message: '未知类型；不接受 SQL 类型表达式' });
        if (column.nullable !== undefined && typeof column.nullable !== 'boolean') issues.push({ path: `${columnPath}/nullable`, message: '可空性必须是布尔值' });
        if (validPk && (table.primaryKey as string[]).includes(String(column.name)) && column.nullable === true) issues.push({ path: columnPath, message: '主键字段不能可空' });
        ['length', 'precision', 'scale'].forEach(key => {
          if (column[key] !== undefined && (!Number.isSafeInteger(column[key]) || Number(column[key]) < (key === 'scale' ? 0 : 1))) {
            issues.push({ path: `${columnPath}/${key}`, message: '长度、精度必须是正整数，小数位数必须是非负整数' });
          }
        });
        if (column.scale !== undefined && (column.precision === undefined || Number(column.scale) > Number(column.precision))) {
          issues.push({ path: columnPath, message: '小数位数不能超过精度且必须提供精度' });
        }
        if (column.length !== undefined && mapping?.family !== 'string') issues.push({ path: `${columnPath}/length`, message: '长度仅适用于文本类型' });
        if ((column.precision !== undefined || column.scale !== undefined) && mapping?.family !== 'number') issues.push({ path: columnPath, message: '精度仅适用于数值类型' });
        if (own(column, 'default') && mapping) {
          const defaultValue = column.default;
          const nullable = column.nullable !== false && !(validPk && (table.primaryKey as string[]).includes(String(column.name)));
          const valid = defaultValue === null ? nullable
            : mapping.family === 'integer' ? Number.isSafeInteger(defaultValue)
              : mapping.family === 'number' ? typeof defaultValue === 'number'
                : mapping.family === 'boolean' ? typeof defaultValue === 'boolean'
                  : mapping.family === 'json' || typeof defaultValue === 'string';
          if (!valid) issues.push({ path: `${columnPath}/default`, message: '默认值与类型或非空约束不一致' });
        }
      });
      if (table.uniqueKeys !== undefined) {
        if (!Array.isArray(table.uniqueKeys)) issues.push({ path: `${path}/uniqueKeys`, message: '唯一键必须是字段名数组的数组' });
        else table.uniqueKeys.forEach((key, keyIndex) => keyColumns(key, columns, `${path}/uniqueKeys/${keyIndex}`));
      }
      const foreignKeys = recordsAt(table.foreignKeys ?? [], `${path}/foreignKeys`);
      names(foreignKeys, `${path}/foreignKeys`);
      foreignKeys.forEach((fk, fkIndex) => {
        const fkPath = `${path}/foreignKeys/${fkIndex}`;
        const localValid = keyColumns(fk.columns, columns, `${fkPath}/columns`);
        const reference = recordAt(fk.references, `${fkPath}/references`);
        const target = tableMap.get(String(reference.table));
        if (!target) {
          issues.push({ path: `${fkPath}/references/table`, message: '外键目标表不存在' });
          return;
        }
        const targetColumns = recordsAt(target.columns, `${fkPath}/references/columns`);
        const remoteValid = keyColumns(reference.columns, targetColumns, `${fkPath}/references/columns`);
        if (!localValid || !remoteValid) return;
        const localNames = fk.columns as string[];
        const remoteNames = reference.columns as string[];
        if (localNames.length !== remoteNames.length) issues.push({ path: fkPath, message: '外键两端字段数量必须一致' });
        const candidateKeys = [target.primaryKey, ...(Array.isArray(target.uniqueKeys) ? target.uniqueKeys : [])];
        if (!candidateKeys.some(key => equalJson(key, remoteNames))) issues.push({ path: fkPath, message: '外键必须按顺序引用完整主键或唯一键' });
        localNames.forEach((name, mappingIndex) => {
          const local = columns.find(column => column.name === name)!;
          const remote = targetColumns.find(column => column.name === remoteNames[mappingIndex]);
          if (!remote) return;
          const localType = databaseTypes.get(String(local.type).toLowerCase());
          const remoteType = databaseTypes.get(String(remote.type).toLowerCase());
          if (localType && remoteType && localType.family !== remoteType.family) issues.push({ path: fkPath, message: '外键两端字段类型不兼容' });
        });
      });
    });
  });
}

export interface SchemaPreview {
  source: PluginContent;
  model: PluginContent;
  issues: ValidationIssue[];
  tableCount: number;
  fieldCount: number;
  relationCount: number;
  merge?: MaterialPreview;
}

export function previewSchemaImport(schema: PluginContent, targetModel?: PluginContent): SchemaPreview {
  const issues = [
    ...validateRelationalSchema(schema),
    ...(targetModel === undefined ? [] : modelIdIssues(targetModel)
      .map(issue => ({ ...issue, path: `/generatedModel${issue.path}` }))),
  ];
  if (issues.length) return { source: {}, model: {}, issues, tableCount: 0, fieldCount: 0, relationCount: 0 };
  const source = cloneJson(schema);
  const tables = source.tables as PluginContent[];
  const entityId = (table: string): string => `${source.name}.${table.toLowerCase()}`;
  const fieldId = (table: string, column: string): string => `${entityId(table)}.${column.toLowerCase()}`;
  let fieldCount = 0;
  let relationCount = 0;
  const entities = tables.map(table => {
    const columns = table.columns as PluginContent[];
    fieldCount += columns.length;
    const relations = (table.foreignKeys ?? []) as PluginContent[];
    relationCount += relations.length;
    return {
      id: entityId(String(table.name)), name: String(table.name).toUpperCase(),
      codeName: String(table.name).toLowerCase(), logicName: table.label ?? table.name,
      sourceTable: cloneJson(table), primaryKey: cloneJson(table.primaryKey),
      getPSDEFields: columns.map(column => ({
        id: fieldId(String(table.name), String(column.name)), name: String(column.name).toUpperCase(),
        codeName: String(column.name).toLowerCase(), logicName: column.label ?? column.name,
        stdDataType: mapDatabaseType(String(column.type)).stdDataType,
        dataType: String(column.type).toLowerCase(),
        pkey: (table.primaryKey as string[]).includes(String(column.name)),
        allowEmpty: column.nullable !== false && !(table.primaryKey as string[]).includes(String(column.name)),
        ...(column.length !== undefined ? { stringLength: column.length } : {}),
        ...(column.precision !== undefined ? { precision: column.precision } : {}),
        ...(column.scale !== undefined ? { scale: column.scale } : {}),
        ...(own(column, 'default') ? { defaultValue: cloneJson(column.default) } : {}),
        sourceColumn: cloneJson(column),
      })),
      getPSDERs: relations.map(fk => {
        const reference = fk.references as PluginContent;
        return {
          id: `${entityId(String(table.name))}.${fk.name}`, name: fk.name, derType: 'DER1N',
          getMajorPSDataEntity: { modelref: true, id: entityId(String(reference.table)) },
          getMinorPSDataEntity: { modelref: true, id: entityId(String(table.name)) },
          fieldMappings: (fk.columns as string[]).map((column, index) => ({
            getMinorPSDEField: { modelref: true, id: fieldId(String(table.name), column) },
            getMajorPSDEField: { modelref: true, id: fieldId(String(reference.table), (reference.columns as string[])[index]) },
          })),
          sourceForeignKey: cloneJson(fk),
        };
      }),
    };
  });
  const model = { sourceSchema: cloneJson(source), getPSDataEntities: entities };
  return {
    source, model, issues: [], tableCount: tables.length, fieldCount, relationCount,
    ...(targetModel === undefined ? {} : { merge: previewMaterial(targetModel, model) }),
  };
}

export function validateSchemaImporter(content: PluginContent): ValidationIssue[] {
  return validateWith(content, (value, issues) => {
    const schema = recordAt(value.schema, '/schema');
    issues.push(...modelIdIssues(recordAt(value.generatedModel, '/generatedModel'))
      .map(issue => ({ ...issue, path: `/generatedModel${issue.path}` })));
    issues.push(...validateRelationalSchema(schema).map(issue => ({ ...issue, path: `/schema${issue.path}` })));
  });
}

export function createSchemaImporter(): PluginContent {
  return { schema: { name: 'local', tables: [] }, generatedModel: {} };
}

export function addSchemaTable(content: PluginContent): PluginContent {
  const value = checked(content, validateSchemaImporter);
  const schema = recordAt(value.schema, '/schema');
  const tables = recordsAt(schema.tables, '/schema/tables');
  let number = 1;
  while (tables.some(table => String(table.name).toLowerCase() === `table_${number}`)) number += 1;
  tables.push({
    name: `table_${number}`, label: `数据表 ${number}`,
    columns: [{ name: 'id', type: 'varchar', length: 100, nullable: false }],
    primaryKey: ['id'], foreignKeys: [],
  });
  return value;
}

export function applySchemaImport(content: PluginContent, preview: SchemaPreview, confirm: boolean): PluginContent {
  const value = checked(content, validateSchemaImporter);
  const reviewed = cloneJson(preview);
  const current = previewSchemaImport(value.schema as PluginContent, reviewed.merge ? value.generatedModel as PluginContent : undefined);
  assertValid(confirm !== true ? [{ path: '', message: '需要明确确认应用导入' }] : []);
  const { merge: reviewedMerge, ...reviewedSource } = reviewed;
  const { merge: currentMerge, ...currentSource } = current;
  assertValid(!equalJson(reviewedSource, currentSource) ||
    (currentMerge && (!reviewedMerge || !sameMaterialPreview(currentMerge, reviewedMerge)))
    ? [{ path: '', message: '模式预览已过期或被修改' }] : []);
  assertValid(current.issues);
  // Existing imported content is merged without dropping extension properties.
  // A changed schema requires a reviewed three-way sync instead of implicit overwrite.
  const merged = currentMerge ?? previewMaterial(value.generatedModel as PluginContent, current.model);
  assertValid(merged.conflicts.map(issue => ({ path: issue.path, message: '已有模型存在不同值，请在增量同步工具中处理' })));
  value.generatedModel = merged.result;
  return value;
}
