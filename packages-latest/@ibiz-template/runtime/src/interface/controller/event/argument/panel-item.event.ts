import { EventBase } from './base.event';

/* eslint-disable no-shadow */
export enum PanelItemEventName {
  /**
   * 点击
   */
  CLICK = 'onClick',
  /**
   * 聚焦
   */
  FOCUS = 'onFocus',
  /**
   * 失焦
   */
  BLUR = 'onBlur',
  /**
   * 值变更
   */
  CHANGE = 'onChange',
  /**
   * 回车
   */
  ENTER = 'onEnter',
}

/**
 * 面板成员事件
 * @author lxm
 * @date 2023-08-09 10:52:48
 * @export
 * @interface PanelItemEvent
 * @extends {EventBase}
 */
export interface PanelItemEvent extends EventBase {
  /**
   * 触发的面板成员名称
   * @author lxm
   * @date 2023-03-26 02:02:16
   * @type {string}
   */
  panelItemName: string;

  /**
   * 触发的面板成员事件的名称
   * @author lxm
   * @date 2023-07-26 11:00:37
   * @type {string}
   */
  panelItemEventName: PanelItemEventName;
}
