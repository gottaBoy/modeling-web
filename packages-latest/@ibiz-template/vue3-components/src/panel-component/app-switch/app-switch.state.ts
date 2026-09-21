import { IApiMicroApp, PanelItemState } from '@ibiz-template/runtime';

/**
 * @description  应用切换器状态
 * @export
 * @class AppSwitchState
 * @extends {PanelItemState}
 */
export class AppSwitchState extends PanelItemState {
  /**
   * @description 激活微应用标识
   * @exposedoc
   * @type {string}
   * @memberof AppSwitchState
   */
  activeMicroAppId: string = '';

  /**
   * @description 微应用列表数据
   * @exposedoc
   * @type {IApiMicroApp[]}
   * @memberof AppSwitchState
   */
  items: IApiMicroApp[] = [];
}
