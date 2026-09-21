/* eslint-disable no-shadow */
/**
 * 部件类型
 *
 * @author chitanda
 * @date 2022-07-24 16:07:57
 * @export
 * @class ControlType
 */
export enum ControlType {
  /**
   * 应用菜单
   */
  APP_MENU = 'APPMENU',
  /**
   * 数据表格
   */
  GRID = 'GRID',
  /**
   * 编辑表单
   */
  FORM = 'FORM',
  /**
   * 搜索表单
   */
  SEARCHFORM = 'SEARCHFORM',
  /**
   * 工具栏
   */
  TOOLBAR = 'TOOLBAR',

  /**
   * 数据关系栏
   */
  DRBAR = 'DRBAR',

  /**
   * 单视图面板
   */
  VIEWPANEL = 'VIEWPANEL',

  /**
   * 选择视图面板
   */
  PICKUP_VIEW_PANEL = 'PICKUPVIEWPANEL',

  /**
   * 数据视图
   */
  DATAVIEW = 'DATAVIEW',

  /**
   * 数据树表格
   */
  TREEGRID = 'TREEGRID',

  /**
   * 流程导航栏
   */
  WF_EXPBAR = 'WFEXPBAR',

  /**
   * 树视图
   */
  TREEVIEW = 'TREEVIEW',

  /**
   * 树视图导航栏
   */
  TREE_EXP_BAR = 'TREEEXPBAR',

  /**
   * 分页视图面板
   */
  TAB_VIEWPANEL = 'TABVIEWPANEL',

  /**
   * 数据关系分页部件
   */
  DRTAB = 'DRTAB',

  /**
   * 数据图表
   */
  CHART = 'CHART',

  /**
   * 报表面板
   */
  REPORT_PANEL = 'REPORTPANEL',

  /**
   * 列表
   */
  LIST = 'LIST',

  /**
   * 移动端多数据视图
   */
  MOB_MDCTRL = 'MOBMDCTRL',

  /**
   * 多编辑视图面板
   */
  MULTI_EDIT_VIEWPANEL = 'MULTIEDITVIEWPANEL',

  /**
   * 向导面板
   */
  WIZARD_PANEL = 'WIZARDPANEL',

  /**
   * 更新面板
   */
  UPDATE_PANEL = 'UPDATEPANEL',

  /**
   * 搜索栏
   */
  SEARCHBAR = 'SEARCHBAR',

  /**
   * 数据看板
   */
  DASHBOARD = 'DASHBOARD',

  /**
   * 日历部件
   */
  CALENDAR = 'CALENDAR',

  /**
   * 面板部件
   */
  PANEL = 'PANEL',

  /**
   * 视图布局面板部件
   */
  VIEW_LAYOUT_PANEL = 'VIEWLAYOUTPANEL',

  /**
   * 地图部件
   */
  MAP = 'MAP',

  /**
   * 甘特部件
   */
  GANTT = 'GANTT',

  /**
   * 树表格（增强）
   */
  TREE_GRIDEX = 'TREEGRIDEX',

  /**
   * 看板
   */
  KANBAN = 'KANBAN',

  /**
   * 日历视图导航栏
   */
  CALENDAR_EXPBAR = 'CALENDAREXPBAR',

  /**
   * 图表视图导航栏
   */
  CHART_EXPBAR = 'CHARTEXPBAR',

  /**
   * 卡片视图导航栏
   */
  DATA_VIEW_EXPBAR = 'DATAVIEWEXPBAR',

  /**
   * 甘特视图导航栏
   */
  GANTT_EXPBAR = 'GANTTEXPBAR',

  /**
   * 表格视图导航栏
   */
  GRID_EXPBAR = 'GRIDEXPBAR',

  /**
   * 列表视图导航栏
   */
  LIST_EXPBAR = 'LISTEXPBAR',

  /**
   * 地图视图导航栏
   */
  MAP_EXPBAR = 'MAPEXPBAR',

  /**
   * 状态向导面板
   */
  STATE_WIZARD_PANEL = 'STATEWIZARDPANEL',

  /**
   * 分页导航面板
   */
  TAB_EXP_PANEL = 'TABEXPPANEL',

  /**
   * 自定义部件
   */
  CUSTOM = 'CUSTOM',

  /**
   * 标题栏
   */
  CAPTIONBAR = 'CAPTIONBAR',

  /**
   * 上下文菜单
   */
  CONTEXT_MENU = 'CONTEXTMENU',
}

/**
 * 多数据部件类型集合
 *
 * @export
 */
export const MDControlTypes: string[] = [
  ControlType.CALENDAR,
  ControlType.CHART,
  ControlType.DATAVIEW,
  ControlType.GANTT,
  ControlType.GRID,
  ControlType.KANBAN,
  ControlType.LIST,
  ControlType.MAP,
  ControlType.MOB_MDCTRL,
  ControlType.MULTI_EDIT_VIEWPANEL,
  ControlType.TREEGRID,
  ControlType.TREEVIEW,
  ControlType.TREE_GRIDEX,
];
