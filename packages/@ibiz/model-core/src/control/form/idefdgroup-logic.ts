import { IDEFDLogic } from './idefdlogic';

/**
 *
 * 继承父接口类型值[GROUP]
 * @export
 * @interface IDEFDGroupLogic
 */
export interface IDEFDGroupLogic extends IDEFDLogic {
  /**
   * 组逻辑
   * @type {string}
   * 来源  getGroupOP
   */
  groupOP?: string;

  /**
   * 逻辑项集合
   *
   * @type {IDEFDLogic[]}
   * 来源  getPSDEFDLogics
   */
  defdlogics?: IDEFDLogic[];

  /**
   * 逻辑取反
   * @type {boolean}
   * 来源  isNotMode
   */
  notMode?: boolean;
}
