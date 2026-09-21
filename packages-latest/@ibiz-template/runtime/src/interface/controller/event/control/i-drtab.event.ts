import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @description 数据分页事件
 * @primary
 * @export
 * @interface IDRTabEvent
 * @extends {IControlEvent}
 */
export interface IDRTabEvent extends IControlEvent {
  /**
   * @description 切换标签页
   * @type {{
   *     event: EventBase;
   *     emitArgs: IData;
   *   }}
   * @memberof IDRTabEvent
   */
  onTabChange: {
    event: EventBase;
    emitArgs: IData;
  };
}
