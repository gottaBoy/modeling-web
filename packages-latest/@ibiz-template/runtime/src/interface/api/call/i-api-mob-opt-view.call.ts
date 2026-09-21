import { IApiMobEditViewCall } from './i-api-mob-edit-view.call';

/**
 * @description 实体移动端选项操作视图能力
 * @export
 * @interface IApiMobOptViewCall
 * @extends {IApiMobEditViewCall}
 */
export interface IApiMobOptViewCall extends IApiMobEditViewCall {
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobOptViewCall
   */
  Cancel: {
    args: undefined;
  };
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobOptViewCall
   */
  Ok: {
    args: undefined;
  };
  /**
   * @description 视图加载（特指初始化加载）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobOptViewCall
   */
  Load: {
    args: undefined;
  };
  /**
   * @description 校验数据（编辑视图才用）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobOptViewCall
   */
  Validate: {
    args: undefined;
  };
}
