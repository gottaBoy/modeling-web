import { IDELogicNode } from './idelogic-node';

/**
 *
 * 继承父接口类型值[SORTPARAM]
 * @export
 * @interface IDESortParamLogic
 */
export interface IDESortParamLogic extends IDELogicNode {
  /**
   * 目标排序属性
   * @type {string}
   * 来源  getDstFieldName
   */
  dstFieldName?: string;

  /**
   * 目标逻辑参数对象
   *
   * @type {string}
   * 来源  getDstPSDELogicParam
   */
  dstDELogicParamId?: string;

  /**
   * 目标列表排序模式
   * @description 值模式 [表格排序模式] {REMOTE：远程排序、 LOCAL：本地排序 }
   * @type {( string | 'REMOTE' | 'LOCAL')}
   * 来源  getDstSortDir
   */
  dstSortDir?: string | 'REMOTE' | 'LOCAL';
}
