import { IApiExpBarControlState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 导航栏状态接口
 * @export
 * @interface IExpBarControlState
 * @extends {IControlState}
 * @extends {IApiExpBarControlState}
 */
export interface IExpBarControlState
  extends IControlState,
    IApiExpBarControlState {}
