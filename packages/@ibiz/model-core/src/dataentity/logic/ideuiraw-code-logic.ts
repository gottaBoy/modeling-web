import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[RAWJSCODE]
 * @export
 * @interface IDEUIRawCodeLogic
 */
export interface IDEUIRawCodeLogic extends IDEUILogicNode {
  /**
   * 直接代码
   * @type {string}
   * 来源  getCode
   */
  code?: string;
}
