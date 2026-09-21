import { IDELogicLinkSingleCondBase } from './idelogic-link-single-cond-base';
import { IDEUILogicLinkCond } from './ideuilogic-link-cond';

/**
 *
 * 继承父接口类型值[SINGLE]
 * @export
 * @interface IDEUILogicLinkSingleCond
 */
export interface IDEUILogicLinkSingleCond
  extends IDEUILogicLinkCond,
    IDELogicLinkSingleCondBase {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstLogicParam
   */
  dstLogicParamId?: string;
}
