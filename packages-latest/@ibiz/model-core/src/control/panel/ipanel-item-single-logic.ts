import { IPanelItemLogic } from './ipanel-item-logic';

/**
 *
 * 继承父接口类型值[SINGLE]
 * @export
 * @interface IPanelItemSingleLogic
 */
export interface IPanelItemSingleLogic extends IPanelItemLogic {
  /**
   * 条件操作
   * @type {string}
   * 来源  getCondOp
   */
  condOp?: string;

  /**
   * 模型属性名称
   * @type {string}
   * 来源  getDstModelField
   */
  dstModelField?: string;

  /**
   * 条件值
   * @type {string}
   * 来源  getValue
   */
  value?: string;
}
