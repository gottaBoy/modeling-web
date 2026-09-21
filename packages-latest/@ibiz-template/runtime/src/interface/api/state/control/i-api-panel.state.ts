import { IApiData } from '@ibiz-template/core';
import { IApiControlState } from './i-api-control.state';
/**
 * @description 面板UI状态接口
 * @primary
 * @export
 * @interface IApiPanelState
 * @extends {IApiControlState}
 */
export interface IApiPanelState extends IApiControlState {
  /**
   * @description 面板数据
   * @type {IApiData}
   * @default {}
   * @memberof IApiPanelState
   */
  data: IApiData;
}
