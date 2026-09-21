import { IControlAction } from '../icontrol-action';
import { IControlContainer } from '../icontrol-container';
import { IControlNavigatable } from '../icontrol-navigatable';
import { IMDAjaxControl } from '../imdajax-control';
import { IMDControl2 } from '../imdcontrol2';
import { IDEDataViewDataItem } from './idedata-view-data-item';
import { IDEDataViewItem } from './idedata-view-item';
import { ILayoutPanel } from '../panel/ilayout-panel';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { IUIActionGroup } from '../../view/iuiaction-group';

/**
 *
 * 实体卡片视图部件模型对象接口
 * 继承父接口类型值[DATAVIEW]
 * @export
 * @interface IDEDataView
 */
export interface IDEDataView
  extends IMDAjaxControl,
    IControlContainer,
    IControlNavigatable,
    IMDControl2 {
  /**
   * 卡片栅格布局大型列宽
   * @type {number}
   * @default -1
   * 来源  getCardColLG
   */
  cardColLG?: number;

  /**
   * 卡片栅格布局中型列宽
   * @type {number}
   * @default -1
   * 来源  getCardColMD
   */
  cardColMD?: number;

  /**
   * 卡片栅格布局小型列宽
   * @type {number}
   * @default -1
   * 来源  getCardColSM
   */
  cardColSM?: number;

  /**
   * 卡片栅格布局超小列宽
   * @type {number}
   * @default -1
   * 来源  getCardColXS
   */
  cardColXS?: number;

  /**
   * 卡片高度
   * @type {number}
   * @default 0
   * 来源  getCardHeight
   */
  cardHeight?: number;

  /**
   * 卡片宽度
   * @type {number}
   * @default 0
   * 来源  getCardWidth
   */
  cardWidth?: number;

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
   * 分组栅格布局大型列宽
   * @type {number}
   * @default -1
   * 来源  getGroupColLG
   */
  groupColLG?: number;

  /**
   * 分组栅格布局中型列宽
   * @type {number}
   * @default -1
   * 来源  getGroupColMD
   */
  groupColMD?: number;

  /**
   * 分组栅格布局小型列宽
   * @type {number}
   * @default -1
   * 来源  getGroupColSM
   */
  groupColSM?: number;

  /**
   * 分组栅格布局超小列宽
   * @type {number}
   * @default -1
   * 来源  getGroupColXS
   */
  groupColXS?: number;

  /**
   * 分组高度
   * @type {number}
   * @default 0
   * 来源  getGroupHeight
   */
  groupHeight?: number;

  /**
   * 分组布局
   * @description 值模式 [多数据部件分组方向] {ROW：从左往右、 COLUMN：从上往下 }
   * @type {( string | 'ROW' | 'COLUMN')}
   * 来源  getGroupLayout
   */
  groupLayout?: string | 'ROW' | 'COLUMN';

  /**
   * 分组模式
   * @description 值模式 [多数据部件分组模式] {NONE：无分组、 AUTO：自动分组、 CODELIST：分组代码表 }
   * @type {( string | 'NONE' | 'AUTO' | 'CODELIST')}
   * 来源  getGroupMode
   */
  groupMode?: string | 'NONE' | 'AUTO' | 'CODELIST';

  /**
   * 分组移动数据行为
   *
   * @type {IControlAction}
   * 来源  getGroupMovePSControlAction
   */
  groupMoveControlAction?: IControlAction;

  /**
   * 分组应用实体属性
   *
   * @type {string}
   * 来源  getGroupPSAppDEField
   */
  groupAppDEFieldId?: string;

  /**
   * 分组应用实体对象
   *
   * @type {string}
   * 来源  getGroupPSAppDataEntity
   */
  groupAppDataEntityId?: string;

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
   * 分组宽度
   * @type {number}
   * @default 0
   * 来源  getGroupWidth
   */
  groupWidth?: number;

  /**
   * 项布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getItemPSLayoutPanel
   */
  itemLayoutPanel?: ILayoutPanel;

  /**
   * 项默认界面样式
   *
   * @type {ISysCss}
   * 来源  getItemPSSysCss
   */
  itemSysCss?: ISysCss;

  /**
   * 项绘制插件
   *
   * @type {string}
   * 来源  getItemPSSysPFPlugin
   */
  itemSysPFPluginId?: string;

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
   * 排序值应用实体属性
   *
   * @type {string}
   * 来源  getOrderValuePSAppDEField
   */
  orderValueAppDEFieldId?: string;

  /**
   * 数据项集合
   *
   * @type {IDEDataViewDataItem[]}
   * 来源  getPSDEDataViewDataItems
   */
  dedataViewDataItems?: IDEDataViewDataItem[];

  /**
   * 卡片视图项集合
   *
   * @type {IDEDataViewItem[]}
   * 来源  getPSDEDataViewItems
   */
  dedataViewItems?: IDEDataViewItem[];

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
   * 附加实体默认数据项
   * @type {boolean}
   * 来源  isAppendDEItems
   */
  appendDEItems?: boolean;

  /**
   * 支持卡片编辑
   * @type {boolean}
   * 来源  isEnableCardEdit
   */
  enableCardEdit?: boolean;

  /**
   * 支持卡片分组调整
   * @type {boolean}
   * 来源  isEnableCardEditGroup
   */
  enableCardEditGroup?: boolean;

  /**
   * 支持卡片次序调整
   * @type {boolean}
   * 来源  isEnableCardEditOrder
   */
  enableCardEditOrder?: boolean;

  /**
   * 支持卡片新建
   * @type {boolean}
   * 来源  isEnableCardNew
   */
  enableCardNew?: boolean;

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
