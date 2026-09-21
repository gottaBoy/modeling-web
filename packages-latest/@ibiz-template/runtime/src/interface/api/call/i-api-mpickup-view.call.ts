import { IApiPickupViewCall } from './i-api-pickup-view.call';

/**
 * @description 实体数据多项选择视图能力
 * @export
 * @interface IApiMPickupViewCall
 * @extends {IApiPickupViewCall}
 */
export interface IApiMPickupViewCall extends IApiPickupViewCall {
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMPickupViewCall
   */
  Cancel: {
    args: undefined;
  };
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMPickupViewCall
   */
  Ok: {
    args: undefined;
  };
  /**
   * @description 添加选中
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMPickupViewCall
   */
  AddSelection: {
    args: undefined;
  };
  /**
   * @description 添加全部
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMPickupViewCall
   */
  AddAll: {
    args: undefined;
  };
  /**
   * @description 移出全部
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMPickupViewCall
   */
  RemoveAll: {
    args: undefined;
  };
  /**
   * @description 移出选中
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMPickupViewCall
   */
  RemoveSelection: {
    args: undefined;
  };
}
