import { IApiGridViewCall } from './i-api-grid-view.call';

/**
 * @description 实体选择表格视图（部件视图）能力
 * @export
 * @interface IApiPickupGridViewCall
 * @extends {IApiGridViewCall}
 */
export interface IApiPickupGridViewCall extends IApiGridViewCall {
  /**
   * @description 获取所有数据（多数据专用，获取全部数据）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiPickupGridViewCall
   */
  GetAllData: {
    args: undefined;
  };
}
