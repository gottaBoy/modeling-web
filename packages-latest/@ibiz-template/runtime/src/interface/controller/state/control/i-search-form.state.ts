import { IApiSearchFormState, IApiStoredFilter } from '../../../api';
import { IFormState } from './i-form.state';

/**
 * @description 存储的过滤条件项接口
 * @export
 * @interface StoredFilter
 * @extends {IApiStoredFilter}
 */
export interface StoredFilter extends IApiStoredFilter {}

/**
 * @description 搜索表单状态接口
 * @export
 * @interface ISearchFormState
 * @extends {IFormState}
 * @extends {IApiSearchFormState}
 */
export interface ISearchFormState extends IFormState, IApiSearchFormState {}
