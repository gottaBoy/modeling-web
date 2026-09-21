import { PartialWithObject } from '@ibiz-template/core';
import { EventBase } from '../argument';
import { ToolbarClickEvent } from '../argument/toolbar-click.event';
import { IControlEvent } from './i-control.event';

/**
 * @description 工具栏事件
 * @primary
 * @export
 * @interface IToolbarEvent
 * @extends {IControlEvent}
 */
export interface IToolbarEvent extends IControlEvent {
  /**
   * @description 工具栏点击事件
   * @type {{
   *     event: ToolbarClickEvent;
   *     emitArgs: PartialWithObject<ToolbarClickEvent, EventBase>;
   *   }}
   * @memberof IToolbarEvent
   */
  onClick: {
    event: ToolbarClickEvent;
    emitArgs: PartialWithObject<ToolbarClickEvent, EventBase>;
  };
}
