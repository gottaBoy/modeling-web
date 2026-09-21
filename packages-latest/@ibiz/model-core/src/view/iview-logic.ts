import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface IViewLogic
 */
export interface IViewLogic extends IModelObject {
  /**
   * 逻辑类型
   * @type {string}
   * 来源  getLogicType
   */
  logicType?: string;

  /**
   * 视图逻辑样式
   * @type {string}
   * 来源  getViewLogicStyle
   */
  viewLogicStyle?: string;

  /**
   * 视图逻辑类型
   * @type {string}
   * 来源  getViewLogicType
   */
  viewLogicType?: string;
}
