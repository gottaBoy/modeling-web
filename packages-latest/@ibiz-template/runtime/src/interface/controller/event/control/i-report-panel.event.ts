import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @description 报表面板事件
 * @primary
 * @export
 * @interface IReportPanelEvent
 * @extends {IControlEvent}
 */
export interface IReportPanelEvent extends IControlEvent {
  /**
   * @description 加载之前
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IReportPanelEvent
   */
  onBeforeLoad: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 加载成功后
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IReportPanelEvent
   */
  onLoadSuccess: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 加载失败
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IReportPanelEvent
   */
  onLoadError: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 保存之前
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IReportPanelEvent
   */
  onBeforeSave: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 保存成功后
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IReportPanelEvent
   */
  onSaveSuccess: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 保存失败
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IReportPanelEvent
   */
  onSaveError: {
    event: EventBase;
    emitArgs: undefined;
  };
}
