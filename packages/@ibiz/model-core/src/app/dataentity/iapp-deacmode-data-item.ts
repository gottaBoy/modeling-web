import { IDEACModeDataItem } from '../../dataentity/ac/ideacmode-data-item';

/**
 *
 * @export
 * @interface IAppDEACModeDataItem
 */
export interface IAppDEACModeDataItem extends IDEACModeDataItem {
  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;
}
