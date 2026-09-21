import { IApiTabExpViewCall } from './i-api-tab-exp-view.call';

/**
 * @description 实体分页搜索视图能力
 * @export
 * @interface IApiTabSearchViewCall
 * @extends {IApiTabExpViewCall}
 */
export interface IApiTabSearchViewCall extends IApiTabExpViewCall {
  /**
   * @description 搜索
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiTabSearchViewCall
   */
  Search: {
    args: undefined;
  };
  /**
   * @description 重置
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiTabSearchViewCall
   */
  Reset: {
    args: undefined;
  };
  /**
   * @description 刷新视图
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiTabSearchViewCall
   */
  Refresh: {
    args: undefined;
  };
}
