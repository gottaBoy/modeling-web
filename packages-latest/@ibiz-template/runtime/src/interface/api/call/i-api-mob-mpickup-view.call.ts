import { IApiMobPickupViewCall } from './i-api-mob-pickup-view.call';

/**
 * @description 实体移动端多数据选择视图能力
 * @export
 * @interface IApiMobMPickupViewCall
 * @extends {IApiMobPickupViewCall}
 */
export interface IApiMobMPickupViewCall extends IApiMobPickupViewCall {
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobMPickupViewCall
   */
  Cancel: {
    args: undefined;
  };
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobMPickupViewCall
   */
  Ok: {
    args: undefined;
  };
  /**
   * @description 添加全部
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobMPickupViewCall
   */
  AddAll: {
    args: undefined;
  };
  /**
   * @description 移出全部
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobMPickupViewCall
   */
  RemoveAll: {
    args: undefined;
  };
  /**
   * @description 添加选中
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobMPickupViewCall
   */
  AddSelection: {
    args: undefined;
  };
}
