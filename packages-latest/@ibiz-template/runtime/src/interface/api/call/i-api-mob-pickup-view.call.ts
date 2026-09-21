import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体移动端数据选择视图能力
 * @export
 * @interface IApiMobPickupViewCall
 * @extends {IApiViewCall}
 */
export interface IApiMobPickupViewCall extends IApiViewCall {
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobPickupViewCall
   */
  Cancel: {
    args: undefined;
  };
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobPickupViewCall
   */
  Ok: {
    args: undefined;
  };
}
