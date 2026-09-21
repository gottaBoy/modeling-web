import { IApiData } from '@ibiz-template/core';
import { IApiFormState } from './i-api-form.state';

/**
 * @description 存储的过滤条件项接口
 * @export
 * @interface IApiStoredFilter
 */
export interface IApiStoredFilter {
  /**
   * @description 标题
   * @type {string}
   * @memberof IApiStoredFilter
   */
  name: string;

  /**
   * @description 搜索条件的数据
   * @type {IApiData}
   * @memberof IApiStoredFilter
   */
  data: IApiData;
}

/**
 * @description 搜索表单状态接口
 * @primary
 * @export
 * @interface IApiSearchFormState
 * @extends {IApiFormState}
 */
export interface IApiSearchFormState extends IApiFormState {
  /**
   * @description 是否启用存储过滤条件
   * @type {boolean}
   * @default true
   * @memberof IApiSearchFormState
   */
  enableStoredFilters: boolean;
  /**
   * @description 存储的过滤条件集合
   * @type {IApiStoredFilter[]}
   * @default []
   * @memberof IApiSearchFormState
   */
  storedFilters: IApiStoredFilter[];
}
