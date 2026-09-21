import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体数据选择视图能力
 * @export
 * @interface IApiPickupViewCall
 * @extends {IApiViewCall}
 */
export interface IApiPickupViewCall extends IApiViewCall {
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiPickupViewCall
   */
  Cancel: {
    args: undefined;
  };
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiPickupViewCall
   */
  Ok: {
    args: undefined;
  };
}
