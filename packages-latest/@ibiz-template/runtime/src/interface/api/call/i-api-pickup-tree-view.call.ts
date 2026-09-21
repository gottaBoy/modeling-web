import { IApiTreeViewCall } from './i-api-tree-view.call';

/**
 * @description 实体选择树视图（部件视图）能力
 * @export
 * @interface IApiPickupTreeViewCall
 * @extends {IApiTreeViewCall}
 */
export interface IApiPickupTreeViewCall extends IApiTreeViewCall {
  /**
   * @description 获取所有数据（多数据专用，获取全部数据）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiPickupTreeViewCall
   */
  GetAllData: {
    args: undefined;
  };
}
