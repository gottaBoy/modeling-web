import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @primary
 * @description 数据看板部件事件
 * @export
 * @interface IDashboardEvent
 * @extends {IControlEvent}
 */
export interface IDashboardEvent extends IControlEvent {
  /**
   * @description 配置信息改变
   * @type {{
   *     event: EventBase;
   *     emitArgs: {
   *       name: string;
   *       config: IData;
   *     };
   *   }}
   * @memberof IDashboardEvent
   */
  onConfigChange: {
    event: EventBase;
    emitArgs: {
      name: string;
      config: IData;
    };
  };

  /**
   * @description 重置门户配置
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IDashboardEvent
   */
  onResetPortlet: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 保存门户配置
   * @type {{
   *     event: EventBase;
   *     emitArgs: IData;
   *   }}
   * @memberof IDashboardEvent
   */
  onSavePortlet: {
    event: EventBase;
    emitArgs: IData;
  };

  /**
   * @description 门户部件项模型重置
   * @type {{
   *     event: EventBase;
   *     emitArgs: {
   *       name: string;
   *     };
   *   }}
   * @memberof IDashboardEvent
   */
  onItemModelReset: {
    event: EventBase;
    emitArgs: {
      name: string;
    };
  };

  /**
   * @description 初始化门户部件
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IDashboardEvent
   */
  onInitPortlets: {
    event: EventBase;
    emitArgs: undefined;
  };
}
