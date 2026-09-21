import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @description 选择视图面板部件事件
 * @primary
 * @export
 * @interface IPickupViewPanelEvent
 * @extends {IControlEvent}
 */
export interface IPickupViewPanelEvent extends IControlEvent {
  /**
   * @description 选中数据变更事件
   * @type {{
   *     event: EventBase;
   *     emitArgs: { data: IData[] };
   *   }}
   * @memberof IPickupViewPanelEvent
   */
  onSelectionChange: {
    event: EventBase;
    emitArgs: { data: IData[] };
  };

  /**
   * @description  激活数据变更事件
   * @type {{
   *     event: EventBase;
   *     emitArgs: { data: IData[] };
   *   }}
   * @memberof IPickupViewPanelEvent
   */
  onDataActive: {
    event: EventBase;
    emitArgs: { data: IData[] };
  };
}
