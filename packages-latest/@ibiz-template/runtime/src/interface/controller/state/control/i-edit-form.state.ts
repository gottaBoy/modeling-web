import { IApiEditFormState } from '../../../api';
import { IFormState } from './i-form.state';

/**
 * @description 编辑表单状态
 * @export
 * @interface IEditFormState
 * @extends {IFormState}
 * @extends {IApiEditFormState}
 */
export interface IEditFormState extends IFormState, IApiEditFormState {}
