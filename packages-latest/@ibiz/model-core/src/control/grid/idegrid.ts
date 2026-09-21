import { IControlAction } from '../icontrol-action';
import { IControlContainer } from '../icontrol-container';
import { IControlNavigatable } from '../icontrol-navigatable';
import { IMDAjaxControl } from '../imdajax-control';
import { IMDControl2 } from '../imdcontrol2';
import { IDEGridColumn } from './idegrid-column';
import { IDEGridDataItem } from './idegrid-data-item';
import { IDEGridEditItem } from './idegrid-edit-item';
import { IDEGridEditItemUpdate } from './idegrid-edit-item-update';
import { IDEGridEditItemVR } from './idegrid-edit-item-vr';
import { ILayoutPanel } from '../panel/ilayout-panel';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 实体表格部件模型对象接口
 * 继承父接口类型值[GRID]
 * @export
 * @interface IDEGrid
 */
export interface IDEGrid
  extends IMDAjaxControl,
    IControlContainer,
    IControlNavigatable,
    IMDControl2 {
  /**
   * 表格聚合模式
   * @description 值模式 [表格聚合模式] {NONE：无聚合、 PAGE：当前页本地、 ALL：全部远程 }
   * @type {( string | 'NONE' | 'PAGE' | 'ALL')}
   * 来源  getAggMode
   */
  aggMode?: string | 'NONE' | 'PAGE' | 'ALL';

  /**
   * 聚合服务应用实体数据集
   *
   * @type {string}
   * 来源  getAggPSAppDEDataSet
   */
  aggAppDEDataSetId?: string;

  /**
   * 聚合服务应用实体对象
   *
   * @type {string}
   * 来源  getAggPSAppDataEntity
   */
  aggAppDataEntityId?: string;

  /**
   * 聚合数据布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getAggPSLayoutPanel
   */
  aggLayoutPanel?: ILayoutPanel;

  /**
   * 列过滤器模式
   * @description 值模式 [实体表格链接模式] {0：不启用、 1：启用、 2：启用（自动判断） }
   * @type {( number | 0 | 1 | 2)}
   * 来源  getColumnEnableFilter
   */
  columnEnableFilter?: number | 0 | 1 | 2;

  /**
   * 列链接模式
   * @description 值模式 [实体表格链接模式] {0：不启用、 1：启用、 2：启用（自动判断） }
   * @type {( number | 0 | 1 | 2)}
   * 来源  getColumnEnableLink
   */
  columnEnableLink?: number | 0 | 1 | 2;

  /**
   * 建立数据行为
   *
   * @type {IControlAction}
   * 来源  getCreatePSControlAction
   */
  createControlAction?: IControlAction;

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
   * 获取草稿数据行为（拷贝）
   *
   * @type {IControlAction}
   * 来源  getGetDraftFromPSControlAction
   */
  getDraftFromControlAction?: IControlAction;

  /**
   * 获取草稿数据行为
   *
   * @type {IControlAction}
   * 来源  getGetDraftPSControlAction
   */
  getDraftControlAction?: IControlAction;

  /**
   * 获取数据行为
   *
   * @type {IControlAction}
   * 来源  getGetPSControlAction
   */
  getControlAction?: IControlAction;

  /**
   * 表格样式
   * @description 值模式 [云实体表格样式] {TREEGRID：树表格、 GROUPGRID：分组表格、 AUTOGRID：自动表格、 LIST：单列无头表格（列表）、 LIST_SORT：单列无头表格（列表），支持排序、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'TREEGRID' | 'GROUPGRID' | 'AUTOGRID' | 'LIST' | 'LIST_SORT' | 'USER' | 'USER2')}
   * 来源  getGridStyle
   */
  gridStyle?:
    | string
    | 'TREEGRID'
    | 'GROUPGRID'
    | 'AUTOGRID'
    | 'LIST'
    | 'LIST_SORT'
    | 'USER'
    | 'USER2';

  /**
   * 分组模式
   * @description 值模式 [多数据部件分组模式] {NONE：无分组、 AUTO：自动分组、 CODELIST：分组代码表 }
   * @type {( string | 'NONE' | 'AUTO' | 'CODELIST')}
   * 来源  getGroupMode
   */
  groupMode?: string | 'NONE' | 'AUTO' | 'CODELIST';

  /**
   * 分组应用实体属性
   *
   * @type {string}
   * 来源  getGroupPSAppDEField
   */
  groupAppDEFieldId?: string;

  /**
   * 分组代码表
   *
   * @type {string}
   * 来源  getGroupPSCodeList
   */
  groupCodeListId?: string;

  /**
   * 分组样式
   * @description 值模式 [部件分组样式] {DEFAULT：默认样式、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
   * @type {( string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
   * @default DEFAULT
   * 来源  getGroupStyle
   */
  groupStyle?: string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4';

  /**
   * 分组应用实体属性
   *
   * @type {string}
   * 来源  getGroupTextPSAppDEField
   */
  groupTextAppDEFieldId?: string;

  /**
   * 附加排序方向
   * @description 值模式 [字段排序方向] {ASC：升序、 DESC：降序 }
   * @type {( string | 'ASC' | 'DESC')}
   * 来源  getMinorSortDir
   */
  minorSortDir?: string | 'ASC' | 'DESC';

  /**
   * 附加排序应用实体属性
   *
   * @type {string}
   * 来源  getMinorSortPSAppDEField
   */
  minorSortAppDEFieldId?: string;

  /**
   * 排序值应用实体属性
   *
   * @type {string}
   * 来源  getOrderValuePSAppDEField
   */
  orderValueAppDEFieldId?: string;

  /**
   * 表格列集合
   *
   * @type {IDEGridColumn[]}
   * 来源  getPSDEGridColumns
   */
  degridColumns?: IDEGridColumn[];

  /**
   * 表格数据项集合
   *
   * @type {IDEGridDataItem[]}
   * 来源  getPSDEGridDataItems
   */
  degridDataItems?: IDEGridDataItem[];

  /**
   * 表格编辑项更新集合
   *
   * @type {IDEGridEditItemUpdate[]}
   * 来源  getPSDEGridEditItemUpdates
   */
  degridEditItemUpdates?: IDEGridEditItemUpdate[];

  /**
   * 表格编辑项值规则集合
   *
   * @type {IDEGridEditItemVR[]}
   * 来源  getPSDEGridEditItemVRs
   */
  degridEditItemVRs?: IDEGridEditItemVR[];

  /**
   * 表格编辑项集合
   *
   * @type {IDEGridEditItem[]}
   * 来源  getPSDEGridEditItems
   */
  degridEditItems?: IDEGridEditItem[];

  /**
   * 分页模式
   * @description 值模式 [数据分页模式] {0：不分页、 1：分页栏、 2：滚动加载、 3：加载更多 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * @default 0
   * 来源  getPagingMode
   */
  pagingMode?: number | 0 | 1 | 2 | 3;

  /**
   * 分页大小
   * @type {number}
   * 来源  getPagingSize
   */
  pagingSize?: number;

  /**
   * 删除数据行为
   *
   * @type {IControlAction}
   * 来源  getRemovePSControlAction
   */
  removeControlAction?: IControlAction;

  /**
   * 排序模式
   * @description 值模式 [表格排序模式] {REMOTE：远程排序、 LOCAL：本地排序 }
   * @type {( string | 'REMOTE' | 'LOCAL')}
   * 来源  getSortMode
   */
  sortMode?: string | 'REMOTE' | 'LOCAL';

  /**
   * 更新数据行为
   *
   * @type {IControlAction}
   * 来源  getUpdatePSControlAction
   */
  updateControlAction?: IControlAction;

  /**
   * 启用列过滤器
   * @type {boolean}
   * 来源  isEnableColFilter
   */
  enableColFilter?: boolean;

  /**
   * 支持表格定制
   * @type {boolean}
   * 来源  isEnableCustomized
   */
  enableCustomized?: boolean;

  /**
   * 启用分组
   * @type {boolean}
   * 来源  isEnableGroup
   */
  enableGroup?: boolean;

  /**
   * 支持分页栏
   * @type {boolean}
   * 来源  isEnablePagingBar
   */
  enablePagingBar?: boolean;

  /**
   * 支持行编辑
   * @type {boolean}
   * 来源  isEnableRowEdit
   */
  enableRowEdit?: boolean;

  /**
   * 支持行编辑仅提交变化值
   * @type {boolean}
   * @default false
   * 来源  isEnableRowEditChangedOnly
   */
  enableRowEditChangedOnly?: boolean;

  /**
   * 支持行次序调整
   * @type {boolean}
   * 来源  isEnableRowEditOrder
   */
  enableRowEditOrder?: boolean;

  /**
   * 支持行新建
   * @type {boolean}
   * 来源  isEnableRowNew
   */
  enableRowNew?: boolean;

  /**
   * 适应屏幕宽度
   * @type {boolean}
   * 来源  isForceFit
   */
  forceFit?: boolean;

  /**
   * 隐藏表格头部
   * @type {boolean}
   * 来源  isHideHeader
   */
  hideHeader?: boolean;

  /**
   * 默认禁用排序
   * @type {boolean}
   * 来源  isNoSort
   */
  noSort?: boolean;

  /**
   * 单项选择
   * @type {boolean}
   * 来源  isSingleSelect
   */
  singleSelect?: boolean;
}
