import { IMDControl2 } from '../imdcontrol2';
import { IDEListDataItem } from './idelist-data-item';
import { IDEListItem } from './idelist-item';
import { IList } from './ilist';
import { ISysCss } from '../../res/isys-css';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 实体列表部件模型对象接口
 * 继承父接口类型值[LIST]
 * @export
 * @interface IDEList
 */
export interface IDEList extends IList, IMDControl2 {
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
   * 分组默认界面样式
   *
   * @type {ISysCss}
   * 来源  getGroupPSSysCss
   */
  groupSysCss?: ISysCss;

  /**
   * 分组绘制插件
   *
   * @type {string}
   * 来源  getGroupPSSysPFPlugin
   */
  groupSysPFPluginId?: string;

  /**
   * 分组界面行为组
   *
   * @type {IUIActionGroup}
   * 来源  getGroupPSUIActionGroup
   */
  groupUIActionGroup?: IUIActionGroup;

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
   * 默认排序方向
   * @description 值模式 [字段排序方向] {ASC：升序、 DESC：降序 }
   * @type {( string | 'ASC' | 'DESC')}
   * 来源  getMinorSortDir
   */
  minorSortDir?: string | 'ASC' | 'DESC';

  /**
   * 默认排序应用实体属性
   *
   * @type {string}
   * 来源  getMinorSortPSAppDEField
   */
  minorSortAppDEFieldId?: string;

  /**
   * 移动端列表样式
   * @description 值模式 [移动端多项数据控件样式] {ICONVIEW：图标视图、 LISTVIEW：列表视图、 SWIPERVIEW：图片滑动视图、 LISTVIEW2：列表视图（无刷新）、 LISTVIEW3：列表视图（无滑动）、 LISTVIEW4：列表视图（无背景）、 EXTVIEW1：扩展视图1、 EXTVIEW2：扩展视图2、 EXTVIEW3：扩展视图3、 EXTVIEW4：扩展视图4、 EXTVIEW5：扩展视图5 }
   * @type {( string | 'ICONVIEW' | 'LISTVIEW' | 'SWIPERVIEW' | 'LISTVIEW2' | 'LISTVIEW3' | 'LISTVIEW4' | 'EXTVIEW1' | 'EXTVIEW2' | 'EXTVIEW3' | 'EXTVIEW4' | 'EXTVIEW5')}
   * 来源  getMobListStyle
   */
  mobListStyle?:
    | string
    | 'ICONVIEW'
    | 'LISTVIEW'
    | 'SWIPERVIEW'
    | 'LISTVIEW2'
    | 'LISTVIEW3'
    | 'LISTVIEW4'
    | 'EXTVIEW1'
    | 'EXTVIEW2'
    | 'EXTVIEW3'
    | 'EXTVIEW4'
    | 'EXTVIEW5';

  /**
   * 排序值应用实体属性
   *
   * @type {string}
   * 来源  getOrderValuePSAppDEField
   */
  orderValueAppDEFieldId?: string;

  /**
   * 列表数据项集合
   *
   * @type {IDEListDataItem[]}
   * 来源  getPSDEListDataItems
   */
  delistDataItems?: IDEListDataItem[];

  /**
   * 列表项集合
   *
   * @type {IDEListItem[]}
   * 来源  getPSDEListItems
   */
  delistItems?: IDEListItem[];

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
   * 泳道应用实体属性
   *
   * @type {string}
   * 来源  getSwimlanePSAppDEField
   */
  swimlaneAppDEFieldId?: string;

  /**
   * 泳道代码表
   *
   * @type {string}
   * 来源  getSwimlanePSCodeList
   */
  swimlaneCodeListId?: string;

  /**
   * 启用分组
   * @type {boolean}
   * 来源  isEnableGroup
   */
  enableGroup?: boolean;

  /**
   * 支持分页栏
   * @type {boolean}
   * @default false
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
   * 支持行分组调整
   * @type {boolean}
   * 来源  isEnableRowEditGroup
   */
  enableRowEditGroup?: boolean;

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
   * 默认禁用排序
   * @type {boolean}
   * 来源  isNoSort
   */
  noSort?: boolean;

  /**
   * 显示头部
   * @type {boolean}
   * 来源  isShowHeader
   */
  showHeader?: boolean;

  /**
   * 单项选择
   * @type {boolean}
   * 来源  isSingleSelect
   */
  singleSelect?: boolean;
}
