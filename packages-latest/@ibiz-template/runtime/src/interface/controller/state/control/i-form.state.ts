import { IApiFormState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 表单状态
 * @export
 * @interface IFormState
 * @extends {IControlState}
 * @extends {IApiFormState}
 */
export interface IFormState extends IControlState, IApiFormState {}
