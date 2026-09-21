import { ILayoutPanel } from '../../control/panel/ilayout-panel';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 子接口类型识别属性[dynamicMode]
 * @export
 * @interface IAppViewMsg
 */
export interface IAppViewMsg extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 启用判断操作标识
   * @type {string}
   * 来源  getDataAccessAction
   */
  dataAccessAction?: string;

  /**
   * 动态模式
   * @description 值模式 [视图消息动态模式] {0：静态内容、 1：实体数据集 }
   * @type {( number | 0 | 1)}
   * @default 0
   * 来源  getDynamicMode
   */
  dynamicMode?: number | 0 | 1;

  /**
   * 视图消息启用模式
   * @description 值模式 [视图消息启用模式] {ALL：全部启用、 DEOPPRIV：实体操作标识、 DELOGIC：实体逻辑、 SCRIPT：脚本 }
   * @type {( string | 'ALL' | 'DEOPPRIV' | 'DELOGIC' | 'SCRIPT')}
   * @default ALL
   * 来源  getEnableMode
   */
  enableMode?: string | 'ALL' | 'DEOPPRIV' | 'DELOGIC' | 'SCRIPT';

  /**
   * 显示消息
   * @type {string}
   * 来源  getMessage
   */
  message?: string;

  /**
   * 消息类型
   * @description 值模式 [视图消息类型] {INFO：常规信息、 WARN：警告信息、 ERROR：错误信息、 CUSTOM：自定义信息 }
   * @type {( string | 'INFO' | 'WARN' | 'ERROR' | 'CUSTOM')}
   * 来源  getMessageType
   */
  messageType?: string | 'INFO' | 'WARN' | 'ERROR' | 'CUSTOM';

  /**
   * 启用判断实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 应用消息模板
   *
   * @type {string}
   * 来源  getPSAppMsgTempl
   */
  appMsgTemplId?: string;

  /**
   * 布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getPSLayoutPanel
   */
  layoutPanel?: ILayoutPanel;

  /**
   * 系统界面样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 系统图片
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 显示位置
   * @description 值模式 [视图消息位置] {TOP：视图上方、 BOTTOM：视图下方、 BODY：视图内容区、 POPUP：弹出、 CUSTOM：自定义 }
   * @type {( string | 'TOP' | 'BOTTOM' | 'BODY' | 'POPUP' | 'CUSTOM')}
   * 来源  getPosition
   */
  position?: string | 'TOP' | 'BOTTOM' | 'BODY' | 'POPUP' | 'CUSTOM';

  /**
   * 消息删除模式
   * @description 值模式 [视图消息删除模式] {0：无关闭、 1：默认关闭、 2：本次关闭 }
   * @type {( number | 0 | 1 | 2)}
   * 来源  getRemoveMode
   */
  removeMode?: number | 0 | 1 | 2;

  /**
   * 启用判断实体逻辑
   *
   * @type {string}
   * 来源  getTestPSAppDELogic
   */
  testAppDELogicId?: string;

  /**
   * 启用判断操作标识
   *
   * @type {string}
   * 来源  getTestPSDEOPPriv
   */
  testDEOPPrivId?: string;

  /**
   * 启用判断脚本
   * @type {string}
   * 来源  getTestScriptCode
   */
  testScriptCode?: string;

  /**
   * 抬头
   * @type {string}
   * 来源  getTitle
   */
  title?: string;

  /**
   * 抬头语言资源标记
   * @type {string}
   * 来源  getTitleLanResTag
   */
  titleLanResTag?: string;

  /**
   * 抬头语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getTitlePSLanguageRes
   */
  titleLanguageRes?: ILanguageRes;

  /**
   * 支持关闭
   * @type {boolean}
   * 来源  isEnableRemove
   */
  enableRemove?: boolean;
}
