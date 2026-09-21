import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[SORTPARAM]
 * @export
 * @interface IDEUISortParamLogic
 */
export interface IDEUISortParamLogic extends IDEUILogicNode {
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
   * 来源  getDstPSDEUILogicParam
   */
  dstDEUILogicParamId?: string;

  /**
   * 目标列表排序模式
   * @description 值模式 [表格排序模式] {REMOTE：远程排序、 LOCAL：本地排序 }
   * @type {( string | 'REMOTE' | 'LOCAL')}
   * 来源  getDstSortDir
   */
  dstSortDir?: string | 'REMOTE' | 'LOCAL';
}
