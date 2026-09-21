import { IAppViewLogic } from '../../app/view/iapp-view-logic';

/**
 *
 * 面板逻辑模型对象接口
 * @export
 * @interface IPanelLogic
 */
export interface IPanelLogic extends IAppViewLogic {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 事件参数
   * @type {string}
   * 来源  getEventArg
   */
  eventArg?: string;

  /**
   * 事件参数2
   * @type {string}
   * 来源  getEventArg2
   */
  eventArg2?: string;

  /**
   * 事件名称
   * @type {string}
   * 来源  getEventNames
   */
  eventNames?: string;

  /**
   * 逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;

  /**
   * 逻辑触发
   * @description 值模式 [系统面板逻辑类型] {TIMER：定时器触发、 PANELEVENT：面板事件触发、 CTRLEVENT：部件事件触发、 ITEMVISIBLE：项显示逻辑、 ITEMENABLE：项启用逻辑、 ITEMBLANK：项空输入逻辑、 ITEMDYNACLASS：项动态样式表、 RENDER：绘制器、 ATTRIBUTE：注入属性、 CUSTOM：自定义、 VUE_DIRECTIVE：VUE指令 }
   * @type {( string | 'TIMER' | 'PANELEVENT' | 'CTRLEVENT' | 'ITEMVISIBLE' | 'ITEMENABLE' | 'ITEMBLANK' | 'ITEMDYNACLASS' | 'RENDER' | 'ATTRIBUTE' | 'CUSTOM' | 'VUE_DIRECTIVE')}
   * 来源  getLogicTrigger
   */
  logicTrigger?:
    | string
    | 'TIMER'
    | 'PANELEVENT'
    | 'CTRLEVENT'
    | 'ITEMVISIBLE'
    | 'ITEMENABLE'
    | 'ITEMBLANK'
    | 'ITEMDYNACLASS'
    | 'RENDER'
    | 'ATTRIBUTE'
    | 'CUSTOM'
    | 'VUE_DIRECTIVE';

  /**
   * 触发逻辑类型
   * @description 值模式 [部件逻辑目标类型] {APPDEUILOGIC：应用实体界面逻辑、 APPDEUIACTION：应用实体界面行为、 APPUILOGIC：应用预置界面逻辑、 APPVIEWLOGIC：视图逻辑、 APPVIEWENGINE：视图引擎、 PFPLUGIN：前端扩展插件、 SCRIPT：脚本代码、 DEUILOGIC：实体界面逻辑（兼容）、 DEUIACTION：实体界面行为（兼容）、 SYSVIEWLOGIC：系统预置界面逻辑（兼容） }
   * @type {( string | 'APPDEUILOGIC' | 'APPDEUIACTION' | 'APPUILOGIC' | 'APPVIEWLOGIC' | 'APPVIEWENGINE' | 'PFPLUGIN' | 'SCRIPT' | 'DEUILOGIC' | 'DEUIACTION' | 'SYSVIEWLOGIC')}
   * 来源  getLogicType
   */
  logicType?:
    | string
    | 'APPDEUILOGIC'
    | 'APPDEUIACTION'
    | 'APPUILOGIC'
    | 'APPVIEWLOGIC'
    | 'APPVIEWENGINE'
    | 'PFPLUGIN'
    | 'SCRIPT'
    | 'DEUILOGIC'
    | 'DEUIACTION'
    | 'SYSVIEWLOGIC';

  /**
   * 应用实体界面逻辑
   *
   * @type {string}
   * 来源  getPSAppDEUILogic
   */
  appDEUILogicId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 应用预置界面逻辑
   *
   * @type {string}
   * 来源  getPSAppUILogic
   */
  appUILogicId?: string;

  /**
   * 定时间隔（ms）
   * @type {number}
   * @default 0
   * 来源  getTimer
   */
  timer?: number;
}
