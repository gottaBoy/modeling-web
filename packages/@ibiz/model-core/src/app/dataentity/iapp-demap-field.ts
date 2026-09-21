import { IDEMapField } from '../../dataentity/datamap/idemap-field';

/**
 *
 * @export
 * @interface IAppDEMapField
 */
export interface IAppDEMapField extends IDEMapField {
  /**
   * 目标应用实体属性
   *
   * @type {string}
   * 来源  getDstPSAppDEField
   */
  dstAppDEFieldId?: string;

  /**
   * 源应用实体属性
   *
   * @type {string}
   * 来源  getSrcPSAppDEField
   */
  srcAppDEFieldId?: string;
}
