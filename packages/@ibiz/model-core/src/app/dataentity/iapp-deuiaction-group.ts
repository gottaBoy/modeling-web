import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
 * @export
 * @interface IAppDEUIActionGroup
 */
export interface IAppDEUIActionGroup extends IDEUIActionGroup {
  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 唯一标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;
}
