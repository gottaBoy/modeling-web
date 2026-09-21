import { EventBase } from './base.event';

/**
 * 登录视图事件
 *
 * @export
 * @interface LoginViewEvent
 * @extends {EventBase}
 */
export interface LoginViewEvent extends EventBase {
  /**
   * 是否登录成功
   *
   * @type {boolean}
   * @memberof LoginViewEvent
   */
  ok: boolean;

  /**
   * 面板数据容器标识
   *
   * @type {string}
   * @memberof LoginViewEvent
   */
  panelDataParent?: string;
}
