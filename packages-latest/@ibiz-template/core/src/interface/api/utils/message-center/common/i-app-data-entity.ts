import { IApiData } from '../../../global-param';

/**
 * @description 应用实体数据对象
 * @export
 * @interface IAppDataEntity
 * @extends {IApiData}
 */
export interface IAppDataEntity extends IApiData {
  /**
   * @description 应用实体数据对象标识
   * @type {string}
   * @memberof IAppDataEntity
   */
  srfdecodename: string;
}
