import { IApiControlState } from '../../../api';
import { IControllerState } from '../common/i-controller.state';

/**
 * @description 部件状态
 * @export
 * @interface IControlState
 * @extends {IControllerState}
 */
export interface IControlState extends IControllerState, IApiControlState {}
