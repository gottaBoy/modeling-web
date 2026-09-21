import { IDELogicLinkGroupCondBase } from './idelogic-link-group-cond-base';
import { IDEUILogicLinkCond } from './ideuilogic-link-cond';

/**
 *
 * 继承父接口类型值[GROUP]
 * @export
 * @interface IDEUILogicLinkGroupCond
 */
export interface IDEUILogicLinkGroupCond
  extends IDEUILogicLinkCond,
    IDELogicLinkGroupCondBase {
  /**
   * 子条件集合
   *
   * @type {IDEUILogicLinkCond[]}
   * 来源  getPSDEUILogicLinkConds
   */
  deuilogicLinkConds?: IDEUILogicLinkCond[];
}
