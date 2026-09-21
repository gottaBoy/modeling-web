import { IDEDataExport } from '../../dataentity/dataexport/idedata-export';

/**
 *
 * 应用实体数据导出模型对象接口
 * @export
 * @interface IAppDEDataExport
 */
export interface IAppDEDataExport extends IDEDataExport {
  /**
   * 应用实体数据集合
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;
}
