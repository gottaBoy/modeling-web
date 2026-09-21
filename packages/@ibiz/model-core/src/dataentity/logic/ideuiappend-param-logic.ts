import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[APPENDPARAM]
 * @export
 * @interface IDEUIAppendParamLogic
 */
export interface IDEUIAppendParamLogic extends IDEUILogicNode {
  /**
   * 目标列表参数起始位置
   * @type {number}
   * @default -1
   * 来源  getDstIndex
   */
  dstIndex?: number;

  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;

  /**
   * 源属性名称
   * @type {string}
   * 来源  getSrcFieldName
   */
  srcFieldName?: string;

  /**
   * 源列表参数起始位置
   * @type {number}
   * @default -1
   * 来源  getSrcIndex
   */
  srcIndex?: number;

  /**
   * 源逻辑参数对象
   *
   * @type {string}
   * 来源  getSrcPSDEUILogicParam
   */
  srcDEUILogicParamId?: string;

  /**
   * 源列表参数大小
   * @type {number}
   * @default -1
   * 来源  getSrcSize
   */
  srcSize?: number;
}
