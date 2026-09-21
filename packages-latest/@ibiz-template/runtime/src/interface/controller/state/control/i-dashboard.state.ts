import { IApiDashboardState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 数据看板部件状态接口
 * @export
 * @interface IDashboardState
 * @extends {IControlState}
 * @extends {IApiDashboardState}
 */
export interface IDashboardState extends IControlState, IApiDashboardState {}
