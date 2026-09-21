import { IAppUILogic } from '@ibiz/model-core';

export type TriggerType =
  | 'TIMER'
  | 'CTRLEVENT'
  | 'ITEMVISIBLE'
  | 'ITEMENABLE'
  | 'ITEMBLANK'
  | 'ATTRIBUTE'
  | 'CUSTOM'
  | 'VUE_DIRECTIVE'
  | 'VIEWEVENT';

export type LogicType =
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

export interface ISchedulerLogic {
  /**
   * 应用标识
   *
   * @author chitanda
   * @date 2023-12-07 14:12:23
   * @type {string}
   */
  appId: string;

  /**
   * 触发器类型
   * @author lxm
   * @date 2023-06-25 06:19:21
   */
  triggerType: TriggerType;

  /**
   * 逻辑执行类型
   * @author lxm
   * @date 2023-06-25 06:23:53
   * @type {LogicType}
   */
  logicType: LogicType;

  /**
   * 唯一标识
   * @author lxm
   * @date 2023-06-25 07:13:40
   * @type {string}
   */
  id: string;

  /**
   * 子项名称
   * @type {string}
   */
  itemName?: string;

  /**
   * 脚本代码
   * @type {string}
   */
  scriptCode?: string;

  /**
   * 定时间隔（ms）
   * @author lxm
   * @date 2023-07-17 01:32:15
   * @type {number}
   */
  timer?: number;

  /**
   * 应用实体界面逻辑对象
   * @type {string}
   */
  appDEUILogicId?: string;

  /**
   * 应用实体对象
   * @type {string}
   */
  appDataEntityId?: string;

  /**
   * 内建应用逻辑
   * @type {IAppUILogic}
   */
  builtinAppUILogic?: IAppUILogic;

  /**
   * 事件名称
   * @type {string}
   */
  eventNames?: string;

  /**
   * 事件参数
   * @type {string}
   */
  eventArg?: string;

  /**
   * 事件参数2
   * @type {string}
   */
  eventArg2?: string;

  /**
   * 部件名称
   * @type {string}
   */
  ctrlName?: string;

  /**
   * 触发应用实体界面行为
   *
   * @type {string}
   * 来源  getPSAppDEUIAction
   */
  appDEUIActionId?: string;
}
