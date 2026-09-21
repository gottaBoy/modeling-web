import { IApiGlobalAppMenuConfig } from './i-api-global-app-menu-config';
import { IApiGlobalCodeListConfig } from './i-api-global-codelist-config';
import { IApiGlobalCommonConfig } from './i-api-global-common-config';
import { IApiGlobalFormConfig } from './i-api-global-form-config';
import { IApiGlobalGridConfig } from './i-api-global-grid-config';
import { IApiGlobalKanbanConfig } from './i-api-global-kanban-config';
import { IApiGlobalPickerEditorConfig } from './i-api-global-picker-editor-config';
import { IApiGlobalUploadEditorConfig } from './i-api-global-upload-editor-config';
import { IApiGlobalSearchFormConfig } from './i-api-global-search-form-config';
import { IApiGlobalTreeConfig } from './i-api-global-tree-config';
import { IApiGlobalViewConfig } from './i-api-global-view-config';
import { IApiGlobalFlowDrtabConfig } from './i-api-global-flow-drtab-config';
import { IApiGlobalWaterMarkConfig } from './i-api-global-water-mark-config';
import { IApiGlobalMobConfig } from './i-api-global-mob-config';
import { IApiGlobalImgCompressConfig } from './i-api-global-img-compress-config';

/**
 * 全局配置
 * @description 全局配置参数，应用将依据这些参数进行调整和适配。
 * @export
 * @interface IApiGlobalConfig
 */
export interface IApiGlobalConfig {
  /**
   * @description 应用主题类型，用于控制整体 UI 风格
   * @type {('light' | 'dark' | 'blue')} (亮色|暗色|蓝色)
   * @default light
   * @platform web
   * @platform mob
   * @memberof IApiGlobalConfig
   */
  theme?: 'light' | 'dark' | 'blue';

  /**
   * @description 全局视图相关配置（如信息栏、权限、加载行为等）
   * @type {IApiGlobalViewConfig}
   * @memberof IApiGlobalConfig
   */
  view: IApiGlobalViewConfig;

  /**
   * @description 全局表格组件配置（编辑模式、保存策略等）
   * @type {IApiGlobalGridConfig}
   * @memberof IApiGlobalConfig
   */
  grid: IApiGlobalGridConfig;

  /**
   * @description 全局菜单配置（回显逻辑、默认状态等）
   * @type {IApiGlobalAppMenuConfig}
   * @memberof IApiGlobalConfig
   */
  appMenu: IApiGlobalAppMenuConfig;

  /**
   * @description 全局代码表配置
   * @type {IApiGlobalCodeListConfig}
   * @memberof IApiGlobalConfig
   */
  codeList: IApiGlobalCodeListConfig;

  /**
   * @description 全局表单配置（校验、UI 展示、缓存策略等）
   * @type {IApiGlobalFormConfig}
   * @memberof IApiGlobalConfig
   */
  form: IApiGlobalFormConfig;

  /**
   * @description 全局看板配置
   * @type {IApiGlobalKanbanConfig}
   * @memberof IApiGlobalConfig
   */
  kanban: IApiGlobalKanbanConfig;

  /**
   * @description 全局下拉选择类编辑器配置
   * @type {IApiGlobalPickerEditorConfig}
   * @memberof IApiGlobalConfig
   */
  pickerEditor: IApiGlobalPickerEditorConfig;

  /**
   * @description 全局上传类编辑器配置
   * @type {IApiGlobalUploadEditorConfig}
   * @memberof IApiGlobalConfig
   */
  uploadEditor: IApiGlobalUploadEditorConfig;

  /**
   * @description 全局搜索表单配置
   * @type {IApiGlobalSearchFormConfig}
   * @memberof IApiGlobalConfig
   */
  searchform: IApiGlobalSearchFormConfig;

  /**
   * @description 全局树部件配置
   * @type {IApiGlobalTreeConfig}
   * @memberof IApiGlobalConfig
   */
  tree: IApiGlobalTreeConfig;

  /**
   * @description 全局通用行为配置（弹框、占位文本等）
   * @type {IApiGlobalCommonConfig}
   * @memberof IApiGlobalConfig
   */
  common: IApiGlobalCommonConfig;

  /**
   * @description 多数据部件默认排序规则，格式：字段名,排序方向（示例：id,asc）
   * @type {string}
   * @platform web
   * @platform mob
   * @memberof IApiGlobalConfig
   */
  mdctrldefaultsort: string;

  /**
   * @description 多数据部件刷新模式：是否使用缓存数据
   * @type {('nocache' | 'cache')}（无缓存模式 | 缓存模式）
   * @default cache
   * @platform web
   * @memberof IApiGlobalConfig
   */
  mdctrlrefreshmode: 'nocache' | 'cache';

  /**
   * @description 下拉选择类组件默认排序方向（如：asc / desc）
   * @type {string}
   * @platform web
   * @memberof IApiGlobalConfig
   */
  pickerdefaultsort: string;

  /**
   * @description 提示框内容渲染模式（无 / Markdown / HTML）
   * @type {('none' | 'md' | 'html)} (文本模式 | markdown模式 | html模式)
   * @default md
   * @platform web
   * @memberof IApiGlobalConfig
   */
  tooltiprendermode: 'none' | 'md' | 'html';

  /**
   * @description 代码编辑器主题
   * @type {('light' | 'dark')}
   * @platform web
   * @memberof IApiGlobalConfig
   */
  codeEditorTheme?: 'light' | 'dark';

  /**
   * @description 数据关系分页（drtab）全局配置
   * @type {IApiGlobalFlowDrtabConfig}
   * @memberof IApiGlobalConfig
   */
  drtab: IApiGlobalFlowDrtabConfig;

  /**
   * @description 应用水印配置
   * @type {IApiGlobalWaterMarkConfig}
   * @memberof IApiGlobalConfig
   */
  watermark: IApiGlobalWaterMarkConfig;

  /**
   * @description 移动端相关配置
   * @type {IApiGlobalMobConfig}
   * @memberof IApiGlobalConfig
   */
  mob: IApiGlobalMobConfig;

  /**
   * @description 图片压缩处理配置
   * @type {IApiGlobalImgCompressConfig}
   * @memberof IApiGlobalConfig
   */
  imgCompressConfig: IApiGlobalImgCompressConfig;
}
