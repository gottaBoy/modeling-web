import { IDEACModeDataItem } from '../../dataentity/ac/ideacmode-data-item';

/**
 *
 * 应用实体自动填充数据项模型对象接口
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
