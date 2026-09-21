import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, NavViewChangeEvent } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @description 导航栏控件事件
 * @primary
 * @export
 * @interface IExpBarControlEvent
 * @extends {IControlEvent}
 */
export interface IExpBarControlEvent extends IControlEvent {
  /**
   * @description 导航视图变更事件
   * @type {{
   *     event: NavViewChangeEvent;
   *     emitArgs: PartialWithObject<NavViewChangeEvent, EventBase>;
   *   }}
   * @memberof IExpBarControlEvent
   */
  onNavViewChange: {
    event: NavViewChangeEvent;
    emitArgs: PartialWithObject<NavViewChangeEvent, EventBase>;
  };
}
