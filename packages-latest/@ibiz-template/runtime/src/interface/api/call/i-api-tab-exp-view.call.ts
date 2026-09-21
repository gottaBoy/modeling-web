import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体分页导航视图能力
 * @export
 * @interface IApiTabExpViewCall
 * @extends {IApiViewCall}
 */
export interface IApiTabExpViewCall extends IApiViewCall {
  /**
   * @description 刷新视图
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiTabExpViewCall
   */
  Refresh: {
    args: undefined;
  };
}
