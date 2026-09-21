import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[STARTWF]
 * @export
 * @interface IDEStartWFLogic
 */
export interface IDEStartWFLogic extends IDELogicNode {
  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 可选逻辑参数对象
   *
   * @type {string}
   * 来源  getOptPSDELogicParam
   */
  optDELogicParamId?: string;

  /**
   * 应用工作流对象
   *
   * @type {string}
   * 来源  getPSAppWF
   */
  appWFId?: string;

  /**
   * 返回值绑定逻辑参数对象
   *
   * @type {string}
   * 来源  getRetPSDELogicParam
   */
  retDELogicParamId?: string;
}
