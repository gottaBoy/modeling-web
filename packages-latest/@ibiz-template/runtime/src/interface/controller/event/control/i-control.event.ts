/* eslint-disable @typescript-eslint/no-empty-interface */

import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, UIActionEvent } from '../argument';
import { IComponentEvent } from '../common/i-component.event';

/**
 * @primary
 * @description 部件通用事件
 * @export
 * @interface IControlEvent
 * @extends {IComponentEvent}
 */
export interface IControlEvent extends IComponentEvent {
  /**
   * 界面行为执行
   * @description 界面行为执行
   * @type {{
   *     event: UIActionEvent;
   *     emitArgs: PartialWithObject<UIActionEvent, EventBase>;
   *   }}
   * @memberof IControlEvent
   */
  onUIAction: {
    event: UIActionEvent;
    emitArgs: PartialWithObject<UIActionEvent, EventBase>;
  };

  /**
   * 刷新成功
   * @description 刷新成功
   * @type {{
   *     event: EventBase;
   *     emitArgs: { data: IData[] };
   *   }}
   * @memberof IControlEvent
   */
  onRefreshSuccess: {
    event: EventBase;
    emitArgs: { data: IData[] };
  };
}
