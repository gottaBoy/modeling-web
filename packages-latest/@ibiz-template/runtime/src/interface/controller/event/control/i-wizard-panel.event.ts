import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @description 向导面板事件
 * @primary
 * @export
 * @interface IWizardPanelEvent
 * @extends {IControlEvent}
 */
export interface IWizardPanelEvent extends IControlEvent {
  /**
   * @description 完成之后
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IWizardPanelEvent
   */
  onFinishSuccess: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 初始化完成
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IWizardPanelEvent
   */
  onInitialized: {
    event: EventBase;
    emitArgs: undefined;
  };
}
