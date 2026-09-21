import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @description 应用菜单事件
 * @primary
 * @export
 * @interface IAppMenuEvent
 * @extends {IControlEvent}
 */
export interface IAppMenuEvent extends IControlEvent {
  /**
   * @description 菜单点击事件
   * @type {{
   *     event: EventBase;
   *     emitArgs: { eventArg: string; event?: MouseEvent };
   *   }}
   * @memberof IAppMenuEvent
   */
  onClick: {
    event: EventBase;
    emitArgs: { eventArg: string; event?: MouseEvent };
  };
}
