import { IDEFDLogic } from './idefdlogic';

/**
 *
 * 继承父接口类型值[SINGLE]
 * @export
 * @interface IDEFDSingleLogic
 */
export interface IDEFDSingleLogic extends IDEFDLogic {
  /**
   * 条件操作
   * @type {string}
   * 来源  getCondOP
   */
  condOP?: string;

  /**
   * 表单项名称
   * @type {string}
   * 来源  getDEFDName
   */
  defdname?: string;

  /**
   * 条件值
   * @type {string}
   * 来源  getValue
   */
  value?: string;
}
