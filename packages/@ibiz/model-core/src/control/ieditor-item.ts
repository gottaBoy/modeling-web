import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface IEditorItem
 */
export interface IEditorItem extends IModelObject {
  /**
   * 应用实体自填模式对象
   *
   * @type {string}
   * 来源  getPSAppDEACMode
   */
  appDEACModeId?: string;

  /**
   * 应用实体结果集对象
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;
}
