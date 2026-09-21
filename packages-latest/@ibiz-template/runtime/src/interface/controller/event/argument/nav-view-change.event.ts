import { INavViewMsg } from '../../common';
import { EventBase } from './base.event';

/**
 * 导航视图变更事件
 * @author lxm
 * @date 2023-08-09 10:52:48
 * @export
 * @interface NavViewChangeEvent
 * @extends {EventBase}
 */
export interface NavViewChangeEvent extends EventBase {
  /**
   * 导航视图信息
   * @author lxm
   * @date 2023-08-09 07:35:50
   * @type {INavViewMsg}
   */
  navViewMsg: INavViewMsg;
}
