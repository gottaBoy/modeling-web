import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[COPYPARAM]
 * @export
 * @interface IDECopyParamLogic
 */
export interface IDECopyParamLogic extends IDELogicNode {
  /**
   * 拷贝属性集合
   *
   * 来源 getCopyFields
   */
  copyFields?: string[];

  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 源逻辑参数对象
   *
   * @type {string}
   * 来源  getSrcPSDELogicParam
   */
  srcDELogicParamId?: string;

  /**
   * 仅拷贝不存在属性
   * @type {boolean}
   * @default false
   * 来源  isCopyIfNotExists
   */
  copyIfNotExists?: boolean;
}
