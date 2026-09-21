import { IDEMapAction } from '../../dataentity/datamap/idemap-action';

/**
 *
 * 应用实体映射行为模型对象接口
 * @export
 * @interface IAppDEMapAction
 */
export interface IAppDEMapAction extends IDEMapAction {
  /**
   * 目标应用实体行为
   *
   * @type {string}
   * 来源  getDstPSAppDEAction
   */
  dstAppDEActionId?: string;

  /**
   * 源应用实体行为
   *
   * @type {string}
   * 来源  getSrcPSAppDEAction
   */
  srcAppDEActionId?: string;
}
