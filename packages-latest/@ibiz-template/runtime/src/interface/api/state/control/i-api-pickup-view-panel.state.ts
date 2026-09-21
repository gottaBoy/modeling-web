import { IApiContext, IApiParams } from '@ibiz-template/core';
import { IApiControlState } from './i-api-control.state';

/**
 * @description 选择视图面板状态接口
 * @primary
 * @export
 * @interface IApiPickupViewPanelState
 * @extends {IApiControlState}
 */
export interface IApiPickupViewPanelState extends IApiControlState {
  /**
   * @description 单选
   * @type {boolean}
   * @default true
   * @memberof IApiPickupViewPanelState
   */
  singleSelect: boolean;

  /**
   * @description 多数据部件激活模式,值为0：无激活；值为1：单击激活；值为2：双击激活
   * @type {(number | 0 | 1 | 2)} 值模式 [应用表格数据激活模式] {0：无、 1：单击、 2：双击 }
   * @default 0
   * @memberof IApiPickupViewPanelState
   */
  mdctrlActiveMode: number | 0 | 1 | 2;

  /**
   * @description 嵌入选择视图的上下文
   * @type {IApiContext}
   * @default {}
   * @memberof IApiPickupViewPanelState
   */
  context: IApiContext;

  /**
   * @description 嵌入选择视图的视图参数
   * @type {IApiParams}
   * @default {}
   * @memberof IApiPickupViewPanelState
   */
  params: IApiParams;
}
