import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, LoginViewEvent } from '../argument';
import { IViewEvent } from './i-view.event';

/**
 * 应用登录视图事件
 *
 * @export
 * @interface IAppLoginViewEvent
 * @extends {IViewEvent}
 */
export interface IAppLoginViewEvent extends IViewEvent {
  /**
   * 登录之后
   *
   * @type {{
   *     event: LoginViewEvent;
   *     emitArgs: PartialWithObject<LoginViewEvent, EventBase>;
   *   }}
   * @memberof IAppLoginViewEvent
   */
  onAfterLogin: {
    event: LoginViewEvent;
    emitArgs: PartialWithObject<LoginViewEvent, EventBase>;
  };
}
