import { IRedrawData } from '../../../common';
import { EventBase } from './base.event';

/**
 * 重绘事件
 *
 * @export
 * @interface RedrawEvent
 * @extends {EventBase}
 */
export interface RedrawViewEvent extends EventBase {
  /**
   * 重绘数据
   *
   * @type {IRedrawData}
   * @memberof RedrawEvent
   */
  redrawData: IRedrawData;
}
