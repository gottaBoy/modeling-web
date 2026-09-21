import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体报表视图能力
 * @export
 * @interface IApiReportViewCall
 * @extends {IApiViewCall}
 */
export interface IApiReportViewCall extends IApiViewCall {
  /**
   * @description 刷新视图
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiReportViewCall
   */
  Refresh: {
    args: undefined;
  };
  /**
   * @description 搜索
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiReportViewCall
   */
  Search: {
    args: undefined;
  };
  /**
   * @description 重置
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiReportViewCall
   */
  Reset: {
    args: undefined;
  };
}
