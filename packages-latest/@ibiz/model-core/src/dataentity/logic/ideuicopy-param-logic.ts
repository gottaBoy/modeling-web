import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[COPYPARAM]
 * @export
 * @interface IDEUICopyParamLogic
 */
export interface IDEUICopyParamLogic extends IDEUILogicNode {
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
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;

  /**
   * 源逻辑参数对象
   *
   * @type {string}
   * 来源  getSrcPSDEUILogicParam
   */
  srcDEUILogicParamId?: string;

  /**
   * 仅拷贝不存在属性
   * @type {boolean}
   * @default false
   * 来源  isCopyIfNotExists
   */
  copyIfNotExists?: boolean;
}
