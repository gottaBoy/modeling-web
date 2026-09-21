import { IDELogicLinkCond } from './idelogic-link-cond';
import { IDELogicLinkSingleCondBase } from './idelogic-link-single-cond-base';

/**
 *
 * 继承父接口类型值[SINGLE]
 * @export
 * @interface IDELogicLinkSingleCond
 */
export interface IDELogicLinkSingleCond
  extends IDELogicLinkCond,
    IDELogicLinkSingleCondBase {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstLogicParam
   */
  dstLogicParamId?: string;
}
