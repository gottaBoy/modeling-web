import { IApiMDViewCall } from './i-api-md-view.call';

/**
 * @description 实体移动端选择多数据视图（部件视图）能力
 * @export
 * @interface IApiMobPickupMDViewCall
 * @extends {IApiMDViewCall}
 */
export interface IApiMobPickupMDViewCall extends IApiMDViewCall {
  /**
   * @description 获取所有数据（多数据专用，获取全部数据）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobPickupMDViewCall
   */
  GetAllData: {
    args: undefined;
  };
}
