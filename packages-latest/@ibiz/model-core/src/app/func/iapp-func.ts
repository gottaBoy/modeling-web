import { INavigateParamContainer } from '../../control/inavigate-param-container';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 应用功能模型对象接口
 * @export
 * @interface IAppFunc
 */
export interface IAppFunc extends INavigateParamContainer {
  /**
   * 应用功能类型
   * @description 值模式 [应用功能类型] {APPVIEW：打开应用视图、 OPENHTMLPAGE：打开HTML页面、 PDTAPPFUNC：预置应用功能、 UIACTION：界面行为、 JAVASCRIPT：执行JavaScript、 SEARCH：全局搜索、 CUSTOM：自定义 }
   * @type {( string | 'APPVIEW' | 'OPENHTMLPAGE' | 'PDTAPPFUNC' | 'UIACTION' | 'JAVASCRIPT' | 'SEARCH' | 'CUSTOM')}
   * 来源  getAppFuncType
   */
  appFuncType?:
    | string
    | 'APPVIEW'
    | 'OPENHTMLPAGE'
    | 'PDTAPPFUNC'
    | 'UIACTION'
    | 'JAVASCRIPT'
    | 'SEARCH'
    | 'CUSTOM';

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 功能编号
   * @type {string}
   * 来源  getFuncSN
   */
  funcSN?: string;

  /**
   * Html地址
   * @type {string}
   * 来源  getHtmlPageUrl
   */
  htmlPageUrl?: string;

  /**
   * 脚本代码
   * @type {string}
   * 来源  getJSCode
   */
  jscode?: string;

  /**
   * 名称语言资源
   *
   * @type {ILanguageRes}
   * 来源  getNamePSLanguageRes
   */
  nameLanguageRes?: ILanguageRes;

  /**
   * 功能打开模式
   * @description 值模式 [应用功能打开方式] {INDEXVIEWTAB：应用容器分页、 INDEXVIEWPOPUP：应用容器弹出、 INDEXVIEWPOPUPMODAL：应用容器弹出（模式）、 HTMLPOPUP：独立网页弹出、 TOP：顶级页面 }
   * @type {( string | 'INDEXVIEWTAB' | 'INDEXVIEWPOPUP' | 'INDEXVIEWPOPUPMODAL' | 'HTMLPOPUP' | 'TOP')}
   * 来源  getOpenMode
   */
  openMode?:
    | string
    | 'INDEXVIEWTAB'
    | 'INDEXVIEWPOPUP'
    | 'INDEXVIEWPOPUPMODAL'
    | 'HTMLPOPUP'
    | 'TOP';

  /**
   * 打开视图参数
   * @type {IModel}
   * 来源  getOpenViewParam
   */
  openViewParam?: IModel;

  /**
   * 应用实体自填模式
   *
   * @type {string}
   * 来源  getPSAppDEACMode
   */
  appDEACModeId?: string;

  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 打开视图
   *
   * @type {string}
   * 来源  getPSAppView
   */
  appViewId?: string;

  /**
   * 预定义功能标识
   * @type {string}
   * 来源  getPSPDTAppFuncId
   */
  pdtappFuncId?: string;

  /**
   * 应用界面行为
   *
   * @type {string}
   * 来源  getPSUIAction
   */
  uiactionId?: string;

  /**
   * 预置类型
   * @type {string}
   * 来源  getPredefinedType
   */
  predefinedType?: string;

  /**
   * 预置类型参数
   * @type {string}
   * 来源  getPredefinedTypeParam
   */
  predefinedTypeParam?: string;

  /**
   * 操作提示信息
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 操作提示语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTooltipPSLanguageRes
   */
  tooltipLanguageRes?: ILanguageRes;

  /**
   * 用户数据
   * @type {string}
   * 来源  getUserData
   */
  userData?: string;

  /**
   * 用户数据2
   * @type {string}
   * 来源  getUserData2
   */
  userData2?: string;

  /**
   * 系统保留
   * @type {boolean}
   * @default false
   * 来源  isSystemReserved
   */
  systemReserved?: boolean;
}
