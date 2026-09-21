import { IApiViewPanelState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 视图面板状态
 * @export
 * @interface IViewPanelState
 * @extends {IControlState}
 * @extends {IApiViewPanelState}
 */
export interface IViewPanelState extends IControlState, IApiViewPanelState {}
