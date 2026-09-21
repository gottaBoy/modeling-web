import { IApiAppMenuState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 菜单状态接口
 * @export
 * @interface IAppMenuState
 * @extends {IControlState}
 * @extends {IApiAppMenuState}
 */
export interface IAppMenuState extends IControlState, IApiAppMenuState {}
