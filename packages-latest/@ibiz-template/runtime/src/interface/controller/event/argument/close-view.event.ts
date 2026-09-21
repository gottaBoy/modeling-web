import { EventBase } from './base.event';

/**
 * 关闭视图事件
 * @author lxm
 * @date 2023-03-26 02:07:11
 * @export
 * @interface CloseViewEvent
 * @extends {EventBase}
 */
export interface CloseViewEvent extends EventBase {
  /**
   * 关闭模态窗时是否操作成功
   *
   * @author chitanda
   * @date 2022-08-17 18:08:40
   * @type {boolean}
   */
  ok: boolean;
}
