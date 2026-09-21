import { IModelObject } from '../imodel-object';

/**
 *
 * 应用逻辑模型对象接口
 * @export
 * @interface IApplicationLogic
 */
export interface IApplicationLogic extends IModelObject {
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
   * 逻辑标记
   * @type {string}
   * 来源  getLogicTag
   */
  logicTag?: string;

  /**
   * 触发逻辑类型
   * @type {string}
   * 来源  getLogicType
   */
  logicType?: string;

  /**
   * 触发逻辑所在应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 触发应用预置界面逻辑
   *
   * @type {string}
   * 来源  getPSAppUILogic
   */
  appUILogicId?: string;

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 定时间隔（ms）
   * @type {number}
   * @default 0
   * 来源  getTimer
   */
  timer?: number;

  /**
   * 触发器类型
   * @description 值模式 [界面逻辑触发类型] {TIMER：定时器触发、 CTRLEVENT：部件事件触发、 VIEWEVENT：视图事件触发、 APPEVENT：应用事件触发、 ITEMVISIBLE：项显示逻辑、 ITEMENABLE：项启用逻辑、 ITEMBLANK：项空输入逻辑、 ITEMDYNACLASS：项动态样式表、 RENDER：绘制器、 ATTRIBUTE：注入属性、 CUSTOM：自定义、 VUE_DIRECTIVE：VUE指令 }
   * @type {( string | 'TIMER' | 'CTRLEVENT' | 'VIEWEVENT' | 'APPEVENT' | 'ITEMVISIBLE' | 'ITEMENABLE' | 'ITEMBLANK' | 'ITEMDYNACLASS' | 'RENDER' | 'ATTRIBUTE' | 'CUSTOM' | 'VUE_DIRECTIVE')}
   * @default APPEVENT
   * 来源  getTriggerType
   */
  triggerType?:
    | string
    | 'TIMER'
    | 'CTRLEVENT'
    | 'VIEWEVENT'
    | 'APPEVENT'
    | 'ITEMVISIBLE'
    | 'ITEMENABLE'
    | 'ITEMBLANK'
    | 'ITEMDYNACLASS'
    | 'RENDER'
    | 'ATTRIBUTE'
    | 'CUSTOM'
    | 'VUE_DIRECTIVE';
}
