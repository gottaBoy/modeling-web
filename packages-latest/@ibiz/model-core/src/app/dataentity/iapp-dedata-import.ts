import { IDEDataImport } from '../../dataentity/dataimport/idedata-import';

/**
 *
 * 应用实体数据导入模型对象接口
 * @export
 * @interface IAppDEDataImport
 */
export interface IAppDEDataImport extends IDEDataImport {
  /**
   * 建立应用实体行为
   *
   * @type {string}
   * 来源  getCreatePSAppDEAction
   */
  createAppDEActionId?: string;

  /**
   * 更新应用实体行为
   *
   * @type {string}
   * 来源  getUpdatePSAppDEAction
   */
  updateAppDEActionId?: string;
}
