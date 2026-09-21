import { IApiDataViewCall } from './i-api-data-view.call';

/**
 * @description 实体选择数据视图（部件视图）能力
 * @export
 * @interface IApiPickupDataViewCall
 * @extends {IApiDataViewCall}
 */
export interface IApiPickupDataViewCall extends IApiDataViewCall {
  /**
   * @description 获取所有数据（多数据专用，获取全部数据）
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiPickupDataViewCall
   */
  GetAllData: {
    args: undefined;
  };
}
