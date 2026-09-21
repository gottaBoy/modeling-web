import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[RAWSFCODE]
 * @export
 * @interface IDERawCodeLogic
 */
export interface IDERawCodeLogic extends IDELogicNode {
  /**
   * 直接代码
   * @type {string}
   * 来源  getCode
   */
  code?: string;

  /**
   * 代码类型
   * @type {string}
   * 来源  getCodeType
   */
  codeType?: string;

  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 返回值绑定逻辑参数对象
   *
   * @type {string}
   * 来源  getRetPSDELogicParam
   */
  retDELogicParamId?: string;
}
