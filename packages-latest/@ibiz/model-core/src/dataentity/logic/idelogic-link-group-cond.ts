import { IDELogicLinkCond } from './idelogic-link-cond';
import { IDELogicLinkGroupCondBase } from './idelogic-link-group-cond-base';

/**
 *
 * 继承父接口类型值[GROUP]
 * @export
 * @interface IDELogicLinkGroupCond
 */
export interface IDELogicLinkGroupCond
  extends IDELogicLinkCond,
    IDELogicLinkGroupCondBase {
  /**
   * 子条件集合
   *
   * @type {IDELogicLinkCond[]}
   * 来源  getPSDELogicLinkConds
   */
  conds?: IDELogicLinkCond[];
}
