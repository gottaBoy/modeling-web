import { IAjaxEditor } from '../iajax-editor';
import { INavigateParamContainer } from '../inavigate-param-container';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 继承父接口类型值[AC,AC_FS,AC_NOBUTTON,AC_FS_NOBUTTON]
 * @export
 * @interface IAutoComplete
 */
export interface IAutoComplete extends IAjaxEditor, INavigateParamContainer {
  /**
   * 触发自填最小字符数[ACMINCHARS]
   * @type {number}
   * @default 0
   * 来源  getACMinChars
   */
  acminChars?: number;

  /**
   * 附加上下文Json字符串
   * @type {string}
   * 来源  getContextJOString
   */
  contextJOString?: string;

  /**
   * 项参数对象
   * @type {IModel}
   * 来源  getItemParamJO
   */
  itemParamJO?: IModel;

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
   * 相关界面行为组
   *
   * @type {IUIActionGroup}
   * 来源  getPSUIActionGroup
   */
  uiactionGroup?: IUIActionGroup;

  /**
   * 附加参数Json字符串
   * @type {string}
   * 来源  getParamJOString
   */
  paramJOString?: string;

  /**
   * 支持自动填充
   * @type {boolean}
   * 来源  isEnableAC
   */
  enableAC?: boolean;

  /**
   * 必须为选择数据[FORCESELECTION]
   * @type {boolean}
   * 来源  isForceSelection
   */
  forceSelection?: boolean;

  /**
   * 显示下拉按钮[TRIGGER]
   * @type {boolean}
   * 来源  isShowTrigger
   */
  showTrigger?: boolean;
}
