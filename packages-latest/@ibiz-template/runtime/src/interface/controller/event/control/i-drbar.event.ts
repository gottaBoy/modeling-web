import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @description 数据关系栏事件
 * @primary
 * @export
 * @interface IDRBarEvent
 * @extends {IControlEvent}
 */
export interface IDRBarEvent extends IControlEvent {
  /**
   * @description 切换分页栏
   * @type {{
   *     event: EventBase;
   *     emitArgs: IData;
   *   }}
   * @memberof IDRBarEvent
   */
  onTabChange: {
    event: EventBase;
    emitArgs: IData;
  };
}
