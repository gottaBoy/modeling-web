import { IApiViewCall } from './i-api-view.call';

/**
 * @description 应用门户视图能力
 * @export
 * @interface IApiPortalViewCall
 * @extends {IApiViewCall}
 */
export interface IApiPortalViewCall extends IApiViewCall {
  /**
   * @description 刷新视图
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiPortalViewCall
   */
  Refresh: {
    args: undefined;
  };
}
