import { PartialWithObject } from '@ibiz-template/core';
import { NavViewChangeEvent, EventBase, TabChangeEvent } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @description 分页导航面板
 * @primary
 * @export
 * @interface ITabExpPanelEvent
 * @extends {IControlEvent}
 */
export interface ITabExpPanelEvent extends IControlEvent {
  /**
   * @description 导航视图变更事件
   * @type {{
   *     event: NavViewChangeEvent;
   *     emitArgs: PartialWithObject<NavViewChangeEvent, EventBase>;
   *   }}
   * @memberof ITabExpPanelEvent
   */
  onNavViewChange: {
    event: NavViewChangeEvent;
    emitArgs: PartialWithObject<NavViewChangeEvent, EventBase>;
  };

  /**
   * @description Tab分页变化
   * @type {{
   *     event: TabChangeEvent;
   *     emitArgs: PartialWithObject<TabChangeEvent, EventBase>;
   *   }}
   * @memberof ITabExpPanelEvent
   */
  onTabChange: {
    event: TabChangeEvent;
    emitArgs: PartialWithObject<TabChangeEvent, EventBase>;
  };
}
