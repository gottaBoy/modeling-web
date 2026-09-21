import catalog from './catalog.json';
import { createTranslator } from './i18n';

export const messages = {
  'iBiz 建模': 'iBiz Modeling',
  '本地工作区': 'Local workspace',
  '{count} 个插件': '{count} plugins',
  '建模平台': 'Modeling platform',
  '语言': 'Language',
  '插件导航': 'Plugin navigation',
  '搜索插件': 'Search plugins',
  '逻辑与数据': 'Logic and data',
  '界面与部件': 'Views and controls',
  '建模扩展': 'Modeling tools',
  '处理中': 'Processing',
  '未保存': 'Unsaved',
  '已保存': 'Saved',
  '新模型': 'New model',
  '文档操作': 'Document actions',
  '新建模型': 'New model',
  '已保存文档': 'Saved documents',
  '模型名称': 'Model name',
  '撤销': 'Undo',
  '重做': 'Redo',
  '校验模型': 'Validate model',
  '保存模型': 'Save model',
  '保存': 'Save',
  '重新载入': 'Reload',
  '导入模型': 'Import model',
  '导出模型': 'Export model',
  '删除文档': 'Delete document',
  '模型视图': 'Model views',
  '设计': 'Design',
  '模型': 'Model',
  '版本 {revision}': 'Revision {revision}',
  '模型校验': 'Model validation',
  '模型校验通过': 'Model is valid',
  '本地重实现': 'Local implementation',
  '文件存储': 'File storage',
  '原平台集成：未验收': 'Upstream integration: unverified',
  '当前模型尚未保存，确定放弃修改？': 'Discard unsaved changes to this model?',
  '模型校验未通过，未执行保存': 'Model validation failed. Nothing was saved.',
  '已保存 · 版本 {revision}': 'Saved · Revision {revision}',
  '删除“{title}”？此操作不可撤销。': 'Delete "{title}"? This cannot be undone.',
  '文档已删除': 'Document deleted',
  '模型文件超过 2 MiB': 'The model file exceeds 2 MiB.',
  '模型文件版本、名称或插件类型不匹配': 'The model version, name, or plugin type does not match.',
  '模型文件不是有效的 JSON': 'The model file is not valid JSON.',
  '副本': 'Copy',
  '已导入副本，尚未保存': 'Copy imported, not yet saved',
  '模型内容必须为 JSON 对象': 'Model content must be a JSON object.',
  '模型结构不符合插件契约': 'The model structure does not match the plugin contract.',
  '此工作区 API 仅允许本机访问': 'This workspace API only allows local access.',
  '不允许跨站访问本地工作区': 'Cross-site access to the local workspace is not allowed.',
  '请求必须为 application/json': 'The request must use application/json.',
  '无效的 JSON 请求': 'Invalid JSON request.',
  '请求的资源不存在': 'The requested resource does not exist.',
  '删除需要当前文档版本': 'Deleting a document requires its current revision.',
  '不支持此请求方法': 'This request method is not supported.',
  '无效的文档标识': 'Invalid document identifier.',
  '存储目录不能是符号链接': 'The storage directory cannot be a symbolic link.',
  '插件不存在': 'The plugin does not exist.',
  '模型文件大小或类型无效': 'The model file size or type is invalid.',
  '模型文件契约无效': 'Invalid model document contract.',
  '模型文件不能是符号链接': 'The model file cannot be a symbolic link.',
  '文档正在写入；遗留锁需人工核对后清理': 'The document is being written. Stale locks require manual review.',
  '服务器已有新版本，请重新载入后合并；当前修改仍保留': 'A newer revision exists. Reload and merge your changes; your current edits are retained.',
  '读取或写入本地模型失败，当前修改未保存': 'The local model could not be read or written. Your changes have not been saved.',
  '模型包含不安全的属性': 'The model contains unsafe properties.',
  '模型嵌套过深': 'The model exceeds the maximum nesting depth.',
  '模型必须包含可序列化的 JSON 数据': 'The model must contain serializable JSON data.',
  '模型文件不能存储凭证': 'Credentials cannot be stored in model files.',
  '模型不能包含无限或无效数值': 'Model numbers must be finite and valid.',
} as const;

export const t = createTranslator(messages);

const titles: Record<string, string> = {
  logicdesign: 'Logic Designer',
  plm4modeling: 'PLM Collaboration',
  ibizappviewcreator: 'View Creation Wizard',
  modelperspectivetool: 'Model Inspector',
  ibizmodelingadvanced: 'System Maintenance',
  'modeling-materials': 'Model Materials',
  'modeling-sync': 'Model Synchronization',
  formdesign: 'Form Designer',
  workflowdesign: 'Workflow Designer',
  erdesign: 'ER Designer',
  griddesign: 'Grid Designer',
  toolbardesign: 'Toolbar Designer',
  dataquerydesign: 'Data Query Designer',
  menudesign: 'Menu Designer',
  treeviewdesign: 'Tree Designer',
  dataflowdesign: 'Dataflow Designer',
  viewdesign: 'View Designer',
  mddesign: 'Multi-Data Control Designer',
  dashboarddesign: 'Dashboard Designer',
  valueruledesign: 'Value Rule Designer',
  chartdesign: 'Chart Designer',
  bireportdesign: 'BI Report Designer',
  ibizdbschemaimporter: 'Database Schema Importer',
};
const titleMessages = Object.fromEntries(catalog.map(entry => [entry.title, titles[entry.id]]));
const translateTitle = createTranslator(titleMessages);

export function pluginTitle(id: string): string {
  const entry = catalog.find(item => item.id === id);
  return entry ? translateTitle(entry.title) : id;
}

export const errorKeys: Record<string, keyof typeof messages> = {
  loopback_only: '此工作区 API 仅允许本机访问',
  cross_origin: '不允许跨站访问本地工作区',
  json_required: '请求必须为 application/json',
  invalid_json: '无效的 JSON 请求',
  too_large: '模型文件超过 2 MiB',
  not_found: '请求的资源不存在',
  revision_required: '删除需要当前文档版本',
  invalid_revision: '删除需要当前文档版本',
  method_not_allowed: '不支持此请求方法',
  invalid_identifier: '无效的文档标识',
  unsafe_directory: '存储目录不能是符号链接',
  unknown_plugin: '插件不存在',
  invalid_file: '模型文件大小或类型无效',
  invalid_document: '模型文件契约无效',
  unsafe_file: '模型文件不能是符号链接',
  locked: '文档正在写入；遗留锁需人工核对后清理',
  validation_failed: '模型校验未通过，未执行保存',
  revision_conflict: '服务器已有新版本，请重新载入后合并；当前修改仍保留',
  storage_error: '读取或写入本地模型失败，当前修改未保存',
  unsafe_key: '模型包含不安全的属性',
  too_deep: '模型嵌套过深',
  invalid_value: '模型必须包含可序列化的 JSON 数据',
  secret_field: '模型文件不能存储凭证',
  invalid_number: '模型不能包含无限或无效数值',
};

export class WorkspaceError extends Error {
  constructor(public key: keyof typeof messages) {
    super(key);
  }
}

export function errorText(reason: unknown): string {
  if (reason instanceof WorkspaceError) return t(reason.key);
  return reason instanceof Error ? reason.message : String(reason ?? '');
}
