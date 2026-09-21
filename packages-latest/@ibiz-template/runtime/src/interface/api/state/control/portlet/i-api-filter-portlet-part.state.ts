import { IApiData } from '@ibiz-template/core';
import { IApiPortletState } from './i-api-portlet.state';

/**
 * @description 过滤器门户部件状态
 * @export
 * @interface FilterPortletState
 * @extends {IApiPortletState}
 */
export interface IApiFilterPortletState extends IApiPortletState {
  /**
   * @description 过滤器节点
   * @type {IApiData}
   * @memberof IApiFilterPortletState
   */
  filterNode: IApiData;
}
