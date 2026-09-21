import { IApiPickupViewPanelState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 选择视图面板状态接口
 * @export
 * @interface IPickupViewPanelState
 * @extends {IControlState}
 * @extends {IApiPickupViewPanelState}
 */
export interface IPickupViewPanelState
  extends IControlState,
    IApiPickupViewPanelState {}
