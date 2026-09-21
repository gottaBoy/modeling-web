import { IApiViewState } from './i-api-view.state';

/**
 * @description 实体多数据自定义视图UI状态
 * @export
 * @interface IApiMDCustomViewState
 * @extends {IApiViewState}
 */
export interface IApiMDCustomViewState extends IApiViewState {
  /**
   * @description 当前激活部件名称
   * @type {string}
   * @memberof IApiMDCustomViewState
   */
  xdatacontrolname: string;
}
