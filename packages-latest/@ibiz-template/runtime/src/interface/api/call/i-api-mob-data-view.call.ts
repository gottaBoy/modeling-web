import { IApiMDViewCall } from './i-api-md-view.call';

/**
 * @description 实体移动端卡片视图能力
 * @export
 * @interface IApiMobDataViewCall
 * @extends {IApiMDViewCall}
 */
export interface IApiMobDataViewCall extends IApiMDViewCall {
  /**
   * @description 加载更多
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobDataViewCall
   */
  LoadMore: {
    args: undefined;
  };
}
