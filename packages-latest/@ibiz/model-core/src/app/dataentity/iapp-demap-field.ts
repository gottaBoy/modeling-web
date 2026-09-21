import { IDEMapField } from '../../dataentity/datamap/idemap-field';

/**
 *
 * 应用实体映射属性模型对象接口
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
