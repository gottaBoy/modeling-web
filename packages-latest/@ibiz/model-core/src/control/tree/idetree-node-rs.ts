import { INavigateParamContainer } from '../inavigate-param-container';
import { IDETreeNodeRSParam } from './idetree-node-rsparam';
import { IDER1N } from '../../dataentity/der/ider1-n';

/**
 *
 * 实体树节点关系模型对象接口
 * @export
 * @interface IDETreeNodeRS
 */
export interface IDETreeNodeRS extends INavigateParamContainer {
  /**
   * 下级节点对象
   *
   * @type {string}
   * 来源  getChildPSDETreeNode
   */
  childDETreeNodeId?: string;

  /**
   * 关系导航参数集合
   *
   * @type {IDETreeNodeRSParam[]}
   * 来源  getPSDETreeNodeRSParams
   */
  detreeNodeRSParams?: IDETreeNodeRSParam[];

  /**
   * 父值过滤项
   * @type {string}
   * 来源  getParentFilter
   */
  parentFilter?: string;

  /**
   * 父关系连接属性
   *
   * @type {string}
   * 来源  getParentPSAppDEField
   */
  parentAppDEFieldId?: string;

  /**
   * 父值关系
   *
   * @type {IDER1N}
   * 来源  getParentPSDER1N
   */
  parentDER1N?: IDER1N;

  /**
   * 上级节点对象
   *
   * @type {string}
   * 来源  getParentPSDETreeNode
   */
  parentDETreeNodeId?: string;

  /**
   * 父值级别
   * @description 值模式 [树节点关系父节点层级] {1：上一级、 2：上两级、 3：上三级 }
   * @type {( number | 1 | 2 | 3)}
   * 来源  getParentValueLevel
   */
  parentValueLevel?: number | 1 | 2 | 3;

  /**
   * 搜索模式
   * @description 值模式 [树节点关系搜索模式] {1：有搜索时启用、 2：无搜索时启用、 3：全部启用 }
   * @type {( number | 1 | 2 | 3)}
   * 来源  getSearchMode
   */
  searchMode?: number | 1 | 2 | 3;
}
