import { IApiPanelState } from '../../../api';
import { IControlState } from './i-control.state';
/**
 * @description 面板UI状态接口
 * @export
 * @interface IPanelState
 * @extends {IControlState}
 * @extends {IApiPanelState}
 */
export interface IPanelState extends IControlState, IApiPanelState {}
