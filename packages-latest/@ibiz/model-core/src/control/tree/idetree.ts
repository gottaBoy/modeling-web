import { IControlContainer } from '../icontrol-container';
import { IControlNavigatable } from '../icontrol-navigatable';
import { IMDAjaxControl } from '../imdajax-control';
import { IDETreeColumn } from './idetree-column';
import { IDETreeNode } from './idetree-node';
import { IDETreeNodeRS } from './idetree-node-rs';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 实体树视图部件模型对象接口
 * 继承父接口类型值[TREEVIEW]
 * @export
 * @interface IDETree
 */
export interface IDETree
  extends IMDAjaxControl,
    IControlContainer,
    IControlNavigatable {
  /**
   * 无值显示内容
   * @type {string}
   * 来源  getEmptyText
   */
  emptyText?: string;

  /**
   * 无值内容语言资源
   *
   * @type {ILanguageRes}
   * 来源  getEmptyTextPSLanguageRes
   */
  emptyTextLanguageRes?: ILanguageRes;

  /**
   * 固定起始列数
   * @type {number}
   * @default 0
   * 来源  getFrozenFirstColumn
   */
  frozenFirstColumn?: number;

  /**
   * 固定末尾列数
   * @type {number}
   * @default 0
   * 来源  getFrozenLastColumn
   */
  frozenLastColumn?: number;

  /**
   * 应用计数器引用
   *
   * @type {string}
   * 来源  getPSAppCounterRef
   */
  appCounterRefId?: string;

  /**
   * 树表格列集合
   *
   * @type {IDETreeColumn[]}
   * 来源  getPSDETreeColumns
   */
  detreeColumns?: IDETreeColumn[];

  /**
   * 树节点关系集合
   *
   * @type {IDETreeNodeRS[]}
   * 来源  getPSDETreeNodeRSs
   */
  detreeNodeRSs?: IDETreeNodeRS[];

  /**
   * 树节点集合
   *
   * @type {IDETreeNode[]}
   * 来源  getPSDETreeNodes
   */
  detreeNodes?: IDETreeNode[];

  /**
   * 树表格模式
   * @description 值模式 [树表格模式] {0：无、 1：常规树表格、 2：甘特图树表格 }
   * @type {( number | 0 | 1 | 2)}
   * 来源  getTreeGridMode
   */
  treeGridMode?: number | 0 | 1 | 2;

  /**
   * 树视图样式
   * @description 值模式 [树视图样式] {USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'USER' | 'USER2')}
   * 来源  getTreeStyle
   */
  treeStyle?: string | 'USER' | 'USER2';

  /**
   * 支持编辑
   * @type {boolean}
   * @default false
   * 来源  isEnableEdit
   */
  enableEdit?: boolean;

  /**
   * 支持根选择
   * @type {boolean}
   * 来源  isEnableRootSelect
   */
  enableRootSelect?: boolean;

  /**
   * 默认输出图标
   * @type {boolean}
   * 来源  isOutputIconDefault
   */
  outputIconDefault?: boolean;

  /**
   * 显示根
   * @type {boolean}
   * 来源  isRootVisible
   */
  rootVisible?: boolean;
}
