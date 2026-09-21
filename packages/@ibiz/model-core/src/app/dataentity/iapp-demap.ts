import { IDEMap } from '../../dataentity/datamap/idemap';

/**
 *
 * @export
 * @interface IAppDEMap
 */
export interface IAppDEMap extends IDEMap {
  /**
   * 目标应用实体
   *
   * @type {string}
   * 来源  getDstPSAppDataEntity
   */
  dstAppDataEntityId?: string;
}
