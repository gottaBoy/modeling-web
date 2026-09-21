import { IDEDataImportItem } from '../../dataentity/dataimport/idedata-import-item';

/**
 *
 * 应用实体数据导入数据项模型对象接口
 * @export
 * @interface IAppDEDataImportItem
 */
export interface IAppDEDataImportItem extends IDEDataImportItem {
  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;
}
