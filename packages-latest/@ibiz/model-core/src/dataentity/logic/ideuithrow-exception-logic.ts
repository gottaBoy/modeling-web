import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[THROWEXCEPTION]
 * @export
 * @interface IDEUIThrowExceptionLogic
 */
export interface IDEUIThrowExceptionLogic extends IDEUILogicNode {
  /**
   * 错误代码
   * @type {number}
   * 来源  getErrorCode
   */
  errorCode?: number;

  /**
   * 错误信息
   * @type {string}
   * 来源  getErrorInfo
   */
  errorInfo?: string;

  /**
   * 异常对象
   * @type {string}
   * 来源  getExceptionObj
   */
  exceptionObj?: string;

  /**
   * 异常参数对象
   *
   * @type {string}
   * 来源  getExceptionParam
   */
  exceptionParamId?: string;
}
