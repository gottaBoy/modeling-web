import { INavigateParamContainer } from '../inavigate-param-container';
import { ITextEditor } from './itext-editor';

/**
 *
 * 继承父接口类型值[MARKDOWN,MOBMARKDOWN]
 * @export
 * @interface IMarkdown
 */
export interface IMarkdown extends ITextEditor, INavigateParamContainer {
  /**
   * 功能模式[MODE]{EDIT|PREVIEW|SUBFIELD|PREVIEWONLY}
   * @type {string}
   * 来源  getMode
   */
  mode?: string;

  /**
   * 应用实体自填模式对象
   *
   * @type {string}
   * 来源  getPSAppDEACMode
   */
  appDEACModeId?: string;

  /**
   * 应用实体结果集对象
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 选择视图
   *
   * @type {string}
   * 来源  getPickupPSAppView
   */
  pickupAppViewId?: string;

  /**
   * 支持自动填充[AC]
   * @type {boolean}
   * @default false
   * 来源  isEnableAC
   */
  enableAC?: boolean;

  /**
   * 支持选择视图[PICKUPVIEW]
   * @type {boolean}
   * @default false
   * 来源  isEnablePickupView
   */
  enablePickupView?: boolean;
}
