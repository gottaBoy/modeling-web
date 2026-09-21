import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体选项操作视图能力
 * @export
 * @interface IApiOptViewCall
 * @extends {IApiViewCall}
 */
export interface IApiOptViewCall extends IApiViewCall {
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiOptViewCall
   */
  Cancel: {
    args: undefined;
  };
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiOptViewCall
   */
  Ok: {
    args: undefined;
  };
  /**
   * @description 视图加载（特指初始化加载）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiOptViewCall
   */
  Load: {
    args: undefined;
  };
  /**
   * @description 校验数据（编辑视图才用）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiOptViewCall
   */
  Validate: {
    args: undefined;
  };
  /**
   * @description 刷新视图
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiOptViewCall
   */
  Refresh: {
    args: undefined;
  };
}
