import { EventBase } from './base.event';

export interface ViewInfoEvent extends EventBase {
  /**
   * 视图标题名称
   * @author lxm
   * @date 2023-03-26 02:02:16
   * @type {string}
   */
  caption?: string;

  /**
   * 视图抬头名称
   * @author lxm
   * @date 2023-07-26 11:00:37
   * @type {string}
   */
  title?: string;

  /**
   * 视图信息栏文本
   * @author lxm
   * @date 2023-05-10 09:05:17
   * @type {string}
   */
  dataInfo?: string;
}
