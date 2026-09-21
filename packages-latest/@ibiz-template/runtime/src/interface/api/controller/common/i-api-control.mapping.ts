import {
  IApiCalendarController,
  IApiCalendarExpBarController,
  IApiCaptionBarController,
  IApiChartController,
  IApiChartExpBarController,
  IApiContextMenuController,
  IApiDRBarController,
  IApiDRTabController,
  IApiDashboardController,
  IApiDataViewControlController,
  IApiEditFormController,
  IApiGanttController,
  IApiGridController,
  IApiKanbanController,
  IApiListController,
  IApiMEditViewPanelController,
  IApiMapController,
  IApiMenuController,
  IApiMobMDCtrlController,
  IApiPanelController,
  IApiPickupViewPanelController,
  IApiReportPanelController,
  IApiSearchBarController,
  IApiSearchFormController,
  IApiTabExpPanelController,
  IApiToolbarController,
  IApiTreeController,
  IApiTreeGridController,
  IApiTreeGridEXController,
  IApiViewLayoutPanelController,
  IApiWizardPanelController,
} from '../control';

/**
 * @description 部件类型映射
 * @export
 * @interface IApiControlMapping
 */
export interface IApiControlMapping {
  /**
   * @description 应用菜单
   * @type {IApiMenuController}
   * @memberof IApiControlMapping
   */
  APPMENU: IApiMenuController;
  /**
   * @description 日历视图导航栏
   * @type {IApiCalendarExpBarController}
   * @memberof IApiControlMapping
   */
  CALENDAREXPBAR: IApiCalendarExpBarController;
  /**
   * @description 日历部件
   * @type {IApiCalendarController}
   * @memberof IApiControlMapping
   */
  CALENDAR: IApiCalendarController;
  /**
   * @description 标题栏
   * @type {IApiCaptionBarController}
   * @memberof IApiControlMapping
   */
  CAPTIONBAR: IApiCaptionBarController;
  /**
   * @description 图表视图导航栏
   * @type {IApiChartExpBarController}
   * @memberof IApiControlMapping
   */
  CHARTEXPBAR: IApiChartExpBarController;
  /**
   * @description 数据图表
   * @type {IApiChartController}
   * @memberof IApiControlMapping
   */
  CHART: IApiChartController;
  /**
   * @description 上下文菜单
   * @type {IApiContextMenuController}
   * @memberof IApiControlMapping
   */
  CONTEXTMENU: IApiContextMenuController;
  /**
   * @description 数据看板
   * @type {IApiDashboardController}
   * @memberof IApiControlMapping
   */
  DASHBOARD: IApiDashboardController;
  /**
   * @description 数据视图
   * @type {IApiDataViewControlController}
   * @memberof IApiControlMapping
   */
  DATAVIEW: IApiDataViewControlController;
  /**
   * @description 数据关系栏
   * @type {IApiDRBarController}
   * @memberof IApiControlMapping
   */
  DRBAR: IApiDRBarController;
  /**
   * @description 数据关系分页部件
   * @type {IApiDRTabController}
   * @memberof IApiControlMapping
   */
  DRTAB: IApiDRTabController;
  /**
   * @description 编辑表单
   * @type {IApiEditFormController}
   * @memberof IApiControlMapping
   */
  FORM: IApiEditFormController;
  /**
   * @description 甘特部件
   * @type {IApiGanttController}
   * @memberof IApiControlMapping
   */
  GANTT: IApiGanttController;
  /**
   * @description 数据表格
   * @type {IApiGridController}
   * @memberof IApiControlMapping
   */
  GRID: IApiGridController;
  /**
   * @description 看板
   * @type {IApiKanbanController}
   * @memberof IApiControlMapping
   */
  KANBAN: IApiKanbanController;
  /**
   * @description 列表
   * @type {IApiListController}
   * @memberof IApiControlMapping
   */
  LIST: IApiListController;
  /**
   * @description 地图部件
   * @type {IApiMapController}
   * @memberof IApiControlMapping
   */
  MAP: IApiMapController;
  /**
   * @description 多编辑视图面板
   * @type {IApiMEditViewPanelController}
   * @memberof IApiControlMapping
   */
  MULTIEDITVIEWPANEL: IApiMEditViewPanelController;
  /**
   * @description 移动端多数据视图
   * @type {IApiMobMDCtrlController}
   * @memberof IApiControlMapping
   */
  MOBMDCTRL: IApiMobMDCtrlController;
  /**
   * @description 面板部件
   * @type {IApiPanelController}
   * @memberof IApiControlMapping
   */
  PANEL: IApiPanelController;
  /**
   * @description 选择视图面板
   * @type {IApiPickupViewPanelController}
   * @memberof IApiControlMapping
   */
  PICKUPVIEWPANEL: IApiPickupViewPanelController;
  /**
   * @description 报表面板
   * @type {IApiReportPanelController}
   * @memberof IApiControlMapping
   */
  REPORTPANEL: IApiReportPanelController;
  /**
   * @description 搜索栏
   * @type {IApiSearchBarController}
   * @memberof IApiControlMapping
   */
  SEARCHBAR: IApiSearchBarController;
  /**
   * @description 搜索表单
   * @type {IApiSearchFormController}
   * @memberof IApiControlMapping
   */
  SEARCHFORM: IApiSearchFormController;
  /**
   * @description 分页导航面板
   * @type {IApiTabExpPanelController}
   * @memberof IApiControlMapping
   */
  TABEXPPANEL: IApiTabExpPanelController;
  /**
   * @description 工具栏
   * @type {IApiToolbarController}
   * @memberof IApiControlMapping
   */
  TOOLBAR: IApiToolbarController;
  /**
   * @description 树表格（增强）
   * @type {IApiTreeGridEXController}
   * @memberof IApiControlMapping
   */
  TREEGRIDEX: IApiTreeGridEXController;
  /**
   * @description 数据树表格
   * @type {IApiTreeGridController}
   * @memberof IApiControlMapping
   */
  TREEGRID: IApiTreeGridController;
  /**
   * @description 树视图
   * @type {IApiTreeController}
   * @memberof IApiControlMapping
   */
  TREEVIEW: IApiTreeController;
  /**
   * @description 视图布局面板部件
   * @type {IApiViewLayoutPanelController}
   * @memberof IApiControlMapping
   */
  VIEWLAYOUTPANEL: IApiViewLayoutPanelController;
  /**
   * @description 向导面板
   * @type {IApiWizardPanelController}
   * @memberof IApiControlMapping
   */
  WIZARDPANEL: IApiWizardPanelController;
}
