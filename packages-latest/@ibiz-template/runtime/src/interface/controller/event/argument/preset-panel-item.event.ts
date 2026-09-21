import { EventBase } from './base.event';

export interface PresetPanelItemEvent extends EventBase {
  /**
   * 触发的面板成员名称
   *
   * @author tony001
   * @date 2024-08-30 15:08:04
   * @type {string}
   */
  panelItemName: string;

  /**
   * 触发的面板成员事件的名称
   *
   * @author tony001
   * @date 2024-08-30 15:08:15
   * @type {string}
   */
  panelItemEventName: string;

  /**
   * 预设参数
   *
   * @author tony001
   * @date 2024-08-30 15:08:31
   * @type {IData}
   */
  presetParams?: IData;
}
