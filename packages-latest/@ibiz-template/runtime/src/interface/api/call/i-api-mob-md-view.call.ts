import { IApiMDViewCall } from './i-api-md-view.call';

/**
 * @description 实体移动端多数据视图能力
 * @export
 * @interface IApiMobMDViewCall
 * @extends {IApiMDViewCall}
 */
export interface IApiMobMDViewCall extends IApiMDViewCall {
  /**
   * @description 加载更多
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobMDViewCall
   */
  LoadMore: {
    args: undefined;
  };
}
