import { IControlItem } from '../icontrol-item';
import { IControlMDataContainer } from '../icontrol-mdata-container';
import { IControlObjectNavigatable } from '../icontrol-object-navigatable';
import { IControlXDataContainer } from '../icontrol-xdata-container';
import { IDEContextMenu } from '../toolbar/idecontext-menu';
import { IDETreeNodeColumn } from './idetree-node-column';
import { IDETreeNodeDataItem } from './idetree-node-data-item';
import { IDETreeNodeEditItem } from './idetree-node-edit-item';
import { IDETreeNodeRV } from './idetree-node-rv';
import { IDERBase } from '../../dataentity/der/iderbase';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 实体树节点模型对象基础接口
 * 子接口类型识别属性[treeNodeType]
 * @export
 * @interface IDETreeNode
 */
export interface IDETreeNode
  extends IControlItem,
    IControlXDataContainer,
    IControlMDataContainer,
    IControlObjectNavigatable {
  /**
   * 访问用户模式
   * @description 值模式 [视图访问用户] {0：未指定、 1：未登录用户、 2：登录用户、 3：匿名用户及登录用户、 4：登录用户且拥有指定资源能力 }
   * @type {( number | 0 | 1 | 2 | 3 | 4)}
   * @default 0
   * 来源  getAccUserMode
   */
  accUserMode?: number | 0 | 1 | 2 | 3 | 4;

  /**
   * 访问标识
   * @type {string}
   * 来源  getAccessKey
   */
  accessKey?: string;

  /**
   * 计数器标识
   * @type {string}
   * 来源  getCounterId
   */
  counterId?: string;

  /**
   * 计数器模式
   * @description 值模式 [计数器显示模式] {0：默认、 1：0 值时隐藏 }
   * @type {( number | 0 | 1)}
   * 来源  getCounterMode
   */
  counterMode?: number | 0 | 1;

  /**
   * 动态样式表
   * @type {string}
   * 来源  getDynaClass
   */
  dynaClass?: string;

  /**
   * 代码模型对象
   * @type {string}
   * 来源  getModelObj
   */
  modelObj?: string;

  /**
   * 名称语言资源
   *
   * @type {ILanguageRes}
   * 来源  getNamePSLanguageRes
   */
  nameLanguageRes?: ILanguageRes;

  /**
   * 导航视图过滤项
   * @type {string}
   * 来源  getNavFilter
   */
  navFilter?: string;

  /**
   * 导航视图对象
   *
   * @type {string}
   * 来源  getNavPSAppView
   */
  navAppViewId?: string;

  /**
   * 导航关系
   *
   * @type {IDERBase}
   * 来源  getNavPSDER
   */
  navDER?: IDERBase;

  /**
   * 节点标识
   * @type {string}
   * 来源  getNodeType
   */
  nodeType?: string;

  /**
   * 应用实体对象
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 上下文菜单对象
   *
   * @type {IDEContextMenu}
   * 来源  getPSDEContextMenu
   */
  decontextMenu?: IDEContextMenu;

  /**
   * 树节点表格列集合
   *
   * @type {IDETreeNodeColumn[]}
   * 来源  getPSDETreeNodeColumns
   */
  detreeNodeColumns?: IDETreeNodeColumn[];

  /**
   * 树节点数据项集合
   *
   * @type {IDETreeNodeDataItem[]}
   * 来源  getPSDETreeNodeDataItems
   */
  detreeNodeDataItems?: IDETreeNodeDataItem[];

  /**
   * 树节点编辑项集合
   *
   * @type {IDETreeNodeEditItem[]}
   * 来源  getPSDETreeNodeEditItems
   */
  detreeNodeEditItems?: IDETreeNodeEditItem[];

  /**
   * 树节点引用视图集合
   *
   * @type {IDETreeNodeRV[]}
   * 来源  getPSDETreeNodeRVs
   */
  detreeNodeRVs?: IDETreeNodeRV[];

  /**
   * 节点界面样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 节点图标对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 前端绘制插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 图形动态样式表
   * @type {string}
   * 来源  getShapeDynaClass
   */
  shapeDynaClass?: string;

  /**
   * 图形界面样式表
   *
   * @type {ISysCss}
   * 来源  getShapePSSysCss
   */
  shapeSysCss?: ISysCss;

  /**
   * 节点类型
   * @description 值模式 [云树视图节点类型] {STATIC：静态、 DE：动态（实体）、 CODELIST：动态（代码表） }
   * @type {( string | 'STATIC' | 'DE' | 'CODELIST')}
   * 来源  getTreeNodeType
   */
  treeNodeType?: string | 'STATIC' | 'DE' | 'CODELIST';

  /**
   * 是否有子节点
   * @type {boolean}
   * 来源  hasPSDETreeNodeRSs
   */
  hasDETreeNodeRSs?: boolean;

  /**
   * 允许拖到节点
   * @type {boolean}
   * @default false
   * 来源  isAllowDrag
   */
  allowDrag?: boolean;

  /**
   * 允许拖入节点
   * @type {boolean}
   * @default false
   * 来源  isAllowDrop
   */
  allowDrop?: boolean;

  /**
   * 允许编辑节点文本
   * @type {boolean}
   * @default false
   * 来源  isAllowEditText
   */
  allowEditText?: boolean;

  /**
   * 允许节点排序
   * @type {boolean}
   * @default false
   * 来源  isAllowOrder
   */
  allowOrder?: boolean;

  /**
   * 附加父节点标识
   * @type {boolean}
   * 来源  isAppendPNodeId
   */
  appendPNodeId?: boolean;

  /**
   * 禁止选择
   * @type {boolean}
   * 来源  isDisableSelect
   */
  disableSelect?: boolean;

  /**
   * 支持选中
   * @type {boolean}
   * 来源  isEnableCheck
   */
  enableCheck?: boolean;

  /**
   * 支持快速搜索
   * @type {boolean}
   * 来源  isEnableQuickSearch
   */
  enableQuickSearch?: boolean;

  /**
   * 支持行编辑
   * @type {boolean}
   * @default false
   * 来源  isEnableRowEdit
   */
  enableRowEdit?: boolean;

  /**
   * 行编辑仅提交变化值
   * @type {boolean}
   * @default false
   * 来源  isEnableRowEditChangedOnly
   */
  enableRowEditChangedOnly?: boolean;

  /**
   * 仅展开首节点
   * @type {boolean}
   * 来源  isExpandFirstOnly
   */
  expandFirstOnly?: boolean;

  /**
   * 默认展开
   * @type {boolean}
   * 来源  isExpanded
   */
  expanded?: boolean;

  /**
   * 根节点
   * @type {boolean}
   * 来源  isRootNode
   */
  rootNode?: boolean;

  /**
   * 仅选择首节点
   * @type {boolean}
   * 来源  isSelectFirstOnly
   */
  selectFirstOnly?: boolean;

  /**
   * 默认选择
   * @type {boolean}
   * 来源  isSelected
   */
  selected?: boolean;
}
