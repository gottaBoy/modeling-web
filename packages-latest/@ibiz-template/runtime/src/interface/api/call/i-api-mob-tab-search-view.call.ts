import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体移动端分页搜索视图能力
 * @export
 * @interface IApiMobTabSearchViewCall
 * @extends {IApiViewCall}
 */
export interface IApiMobTabSearchViewCall extends IApiViewCall {
  /**
   * @description 搜索
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobTabSearchViewCall
   */
  Search: {
    args: undefined;
  };
  /**
   * @description 重置
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobTabSearchViewCall
   */
  Reset: {
    args: undefined;
  };
  /**
   * @description 刷新视图
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobTabSearchViewCall
   */
  Refresh: {
    args: undefined;
  };
}
