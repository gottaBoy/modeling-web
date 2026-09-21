import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';

/**
 * @description 多编辑视图面板部件事件
 * @primary
 * @export
 * @interface IMEditViewPanelEvent
 * @extends {IMDControlEvent}
 */
export interface IMEditViewPanelEvent extends IMDControlEvent {
  /**
   * @description 添加事件
   * @type {{
   *     event: EventBase;
   *     emitArgs: IData;
   *   }}
   * @memberof IMEditViewPanelEvent
   */
  onAddSuccess: {
    event: EventBase;
    emitArgs: IData;
  };

  /**
   * @description 切换标签页
   * @type {{
   *     event: EventBase;
   *     emitArgs: IData;
   *   }}
   * @memberof IMEditViewPanelEvent
   */
  onTabChange: {
    event: EventBase;
    emitArgs: IData;
  };
}
