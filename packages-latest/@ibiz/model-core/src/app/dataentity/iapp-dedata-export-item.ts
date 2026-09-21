import { IDEDataExportItem } from '../../dataentity/dataexport/idedata-export-item';

/**
 *
 * 应用实体数据导出数据项模型对象接口
 * @export
 * @interface IAppDEDataExportItem
 */
export interface IAppDEDataExportItem extends IDEDataExportItem {
  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;
}
