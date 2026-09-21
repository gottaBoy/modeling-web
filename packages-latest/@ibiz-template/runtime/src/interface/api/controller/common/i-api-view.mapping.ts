import {
  IApiAppDataUploadViewController,
  IApiCalendarExpViewController,
  IApiCalendarViewController,
  IApiChartExpViewController,
  IApiChartViewController,
  IApiCustomViewController,
  IApiDEIndexViewController,
  IApiDataViewController,
  IApiDataViewExpViewController,
  IApiEditView2Controller,
  IApiEditView3Controller,
  IApiEditView4Controller,
  IApiEditViewController,
  IApiFormPickupDataViewController,
  IApiGanttViewController,
  IApiGridExpViewController,
  IApiGridViewController,
  IApiIndexViewController,
  IApiKanbanViewController,
  IApiListExpViewController,
  IApiListViewController,
  IApiLoginViewController,
  IApiMDCustomViewController,
  IApiMEditView9Controller,
  IApiMPickupView2Controller,
  IApiMPickupViewController,
  IApiMapViewController,
  IApiMobCalendarViewController,
  IApiMobChartViewController,
  IApiMobCustomViewController,
  IApiMobDataViewController,
  IApiMobEditView3Controller,
  IApiMobEditViewController,
  IApiMobMDViewController,
  IApiMobMPickupViewController,
  IApiMobOptViewController,
  IApiMobPickupMDViewController,
  IApiMobPickupTreeViewController,
  IApiMobPickupViewController,
  IApiMobTabExpViewController,
  IApiMobTabSearchViewController,
  IApiMobTreeExpViewController,
  IApiMobTreeViewController,
  IApiMobWFDynaActionViewController,
  IApiMobWFDynaEditView3Controller,
  IApiMobWFDynaEditViewController,
  IApiMobWFDynaStartViewController,
  IApiMobWizardViewController,
  IApiOptViewController,
  IApiPanelViewController,
  IApiPickupDataViewController,
  IApiPickupGridViewController,
  IApiPickupTreeViewController,
  IApiPickupView2Controller,
  IApiPickupViewController,
  IApiPortalViewController,
  IApiReportViewController,
  IApiSubAppRefViewController,
  IApiTabExpViewController,
  IApiTabSearchViewController,
  IApiTreeExpViewController,
  IApiTreeGridExViewController,
  IApiTreeGridViewController,
  IApiTreeViewController,
  IApiWFDynaActionViewController,
  IApiWFDynaEditView3Controller,
  IApiWFDynaEditViewController,
  IApiWFDynaStartViewController,
  IApiWFStepDataViewController,
  IApiWFStepTraceViewController,
  IApiWizardViewController,
} from '../view';

/**
 * @description 视图类型映射
 * @export
 * @interface IApiViewMapping
 */
export interface IApiViewMapping {
  /**
   * @description  应用数据导入视图
   * @type {IApiAppDataUploadViewController}
   * @memberof IApiViewMapping
   */
  APPDATAUPLOADVIEW: IApiAppDataUploadViewController;
  /**
   * @description  实体日历导航视图
   * @type {IApiCalendarExpViewController}
   * @memberof IApiViewMapping
   */
  DECALENDAREXPVIEW: IApiCalendarExpViewController;
  /**
   * @description  实体日历视图
   * @type {IApiCalendarViewController}
   * @memberof IApiViewMapping
   */
  DECALENDARVIEW: IApiCalendarViewController;
  /**
   * @description  实体图表导航视图
   * @type {IApiChartExpViewController}
   * @memberof IApiViewMapping
   */
  DECHARTEXPVIEW: IApiChartExpViewController;
  /**
   * @description  实体图表视图
   * @type {IApiChartViewController}
   * @memberof IApiViewMapping
   */
  DECHARTVIEW: IApiChartViewController;
  /**
   * @description  实体自定义视图
   * @type {IApiCustomViewController}
   * @memberof IApiViewMapping
   */
  DECUSTOMVIEW: IApiCustomViewController;
  /**
   * @description 实体卡片视图导航视图
   * @type {IApiDataViewExpViewController}
   * @memberof IApiViewMapping
   */
  DEDATAVIEWEXPVIEW: IApiDataViewExpViewController;
  /**
   * @description 实体数据视图
   * @type {IApiDataViewController}
   * @memberof IApiViewMapping
   */
  DEDATAVIEW: IApiDataViewController;
  /**
   * @description 实体首页视图
   * @type {IApiDEIndexViewController}
   * @memberof IApiViewMapping
   */
  DEINDEXVIEW: IApiDEIndexViewController;
  /**
   * @description 实体编辑视图
   * @type {IApiEditViewController}
   * @memberof IApiViewMapping
   */
  DEEDITVIEW: IApiEditViewController;
  /**
   * @description 实体编辑视图（左右关系）
   * @type {IApiEditView2Controller}
   * @memberof IApiViewMapping
   */
  DEEDITVIEW2: IApiEditView2Controller;
  /**
   * @description 实体编辑视图（分页关系）
   * @type {IApiEditView3Controller}
   * @memberof IApiViewMapping
   */
  DEEDITVIEW3: IApiEditView3Controller;
  /**
   * @description 实体编辑视图（上下关系）
   * @type {IApiEditView4Controller}
   * @memberof IApiViewMapping
   */
  DEEDITVIEW4: IApiEditView4Controller;
  /**
   * @description  实体表单选择数据视图（部件视图）
   * @type {IApiFormPickupDataViewController}
   * @memberof IApiViewMapping
   */
  DEFORMPICKUPDATAVIEW: IApiFormPickupDataViewController;
  /**
   * @description 实体甘特视图
   * @type {IApiGanttViewController}
   * @memberof IApiViewMapping
   */
  DEGANTTVIEW: IApiGanttViewController;
  /**
   * @description 实体表格导航视图
   * @type {IApiGridExpViewController}
   * @memberof IApiViewMapping
   */
  DEGRIDEXPVIEW: IApiGridExpViewController;
  /**
   * @description  实体表格视图
   * @type {IApiGridViewController}
   * @memberof IApiViewMapping
   */
  DEGRIDVIEW: IApiGridViewController;
  /**
   * @description 应用首页视图
   * @type {IApiIndexViewController}
   * @memberof IApiViewMapping
   */
  APPINDEXVIEW: IApiIndexViewController;
  /**
   * @description 实体看板视图
   * @type {IApiKanbanViewController}
   * @memberof IApiViewMapping
   */
  DEKANBANVIEW: IApiKanbanViewController;
  /**
   * @description 实体列表导航视图
   * @type {IApiListExpViewController}
   * @memberof IApiViewMapping
   */
  DELISTEXPVIEW: IApiListExpViewController;
  /**
   * @description 实体列表视图
   * @type {IApiListViewController}
   * @memberof IApiViewMapping
   */
  DELISTVIEW: IApiListViewController;
  /**
   * @description 应用登录视图
   * @type {IApiLoginViewController}
   * @memberof IApiViewMapping
   */
  APPLOGINVIEW: IApiLoginViewController;
  /**
   * @description 实体地图视图
   * @type {IApiMapViewController}
   * @memberof IApiViewMapping
   */
  DEMAPVIEW: IApiMapViewController;
  /**
   * @description  实体多表单编辑视图（部件视图）
   * @type {IApiMEditView9Controller}
   * @memberof IApiViewMapping
   */
  DEMEDITVIEW9: IApiMEditView9Controller;
  /**
   * @description 实体数据多项选择视图
   * @type {IApiMPickupViewController}
   * @memberof IApiViewMapping
   */
  DEMPICKUPVIEW: IApiMPickupViewController;
  /**
   * @description 实体多项数据选择视图（左右关系）
   * @type {IApiMPickupView2Controller}
   * @memberof IApiViewMapping
   */
  DEMPICKUPVIEW2: IApiMPickupView2Controller;
  /**
   * @description 实体选项操作视图
   * @type {IApiOptViewController}
   * @memberof IApiViewMapping
   */
  DEOPTVIEW: IApiOptViewController;
  /**
   * @description 实体面板视图
   * @type {IApiPanelViewController}
   * @memberof IApiViewMapping
   */
  DEPANELVIEW: IApiPanelViewController;
  /**
   * @description 实体选择数据视图（部件视图）
   * @type {IApiPickupDataViewController}
   * @memberof IApiViewMapping
   */
  DEPICKUPDATAVIEW: IApiPickupDataViewController;
  /**
   * @description 实体选择表格视图（部件视图）
   * @type {IApiPickupGridViewController}
   * @memberof IApiViewMapping
   */
  DEPICKUPGRIDVIEW: IApiPickupGridViewController;
  /**
   * @description 实体选择树视图（部件视图）
   * @type {IApiPickupTreeViewController}
   * @memberof IApiViewMapping
   */
  DEPICKUPTREEVIEW: IApiPickupTreeViewController;
  /**
   * @description 实体数据选择视图
   * @type {IApiPickupViewController}
   * @memberof IApiViewMapping
   */
  DEPICKUPVIEW: IApiPickupViewController;
  /**
   * @description 实体数据选择视图（左右关系）
   * @type {IApiPickupView2Controller}
   * @memberof IApiViewMapping
   */
  DEPICKUPVIEW2: IApiPickupView2Controller;
  /**
   * @description 实体数据看板视图
   * @type {IApiPortalViewController}
   * @memberof IApiViewMapping
   */
  DEPORTALVIEW: IApiPortalViewController;
  /**
   * @description 实体报表视图
   * @type {IApiReportViewController}
   * @memberof IApiViewMapping
   */
  DEREPORTVIEW: IApiReportViewController;
  /**
   * @description 实体子应用引用视图
   * @type {IApiSubAppRefViewController}
   * @memberof IApiViewMapping
   */
  DESUBAPPREFVIEW: IApiSubAppRefViewController;
  /**
   * @description 实体分页导航视图
   * @type {IApiTabExpViewController}
   * @memberof IApiViewMapping
   */
  DETABEXPVIEW: IApiTabExpViewController;
  /**
   * @description 实体分页搜索视图
   * @type {IApiTabSearchViewController}
   * @memberof IApiViewMapping
   */
  DETABSEARCHVIEW: IApiTabSearchViewController;
  /**
   * @description 实体树导航视图
   * @type {IApiTreeExpViewController}
   * @memberof IApiViewMapping
   */
  DETREEEXPVIEW: IApiTreeExpViewController;
  /**
   * @description 实体树表格视图（增强）
   * @type {IApiTreeGridExViewController}
   * @memberof IApiViewMapping
   */
  DETREEGRIDEXVIEW: IApiTreeGridExViewController;
  /**
   * @description 实体树表格视图
   * @type {IApiTreeGridViewController}
   * @memberof IApiViewMapping
   */
  DETREEGRIDVIEW: IApiTreeGridViewController;
  /**
   * @description 实体树视图
   * @type {IApiTreeViewController}
   * @memberof IApiViewMapping
   */
  DETREEVIEW: IApiTreeViewController;
  /**
   * @description 实体工作流动态操作视图
   * @type {IApiWFDynaActionViewController}
   * @memberof IApiViewMapping
   */
  DEWFDYNAACTIONVIEW: IApiWFDynaActionViewController;
  /**
   * @description 实体工作流动态编辑视图
   * @type {IApiWFDynaEditViewController}
   * @memberof IApiViewMapping
   */
  DEWFDYNAEDITVIEW: IApiWFDynaEditViewController;
  /**
   * @description 实体工作流动态视图（分页关系）
   * @type {IApiWFDynaEditView3Controller}
   * @memberof IApiViewMapping
   */
  DEWFDYNAEDITVIEW3: IApiWFDynaEditView3Controller;
  /**
   * @description 实体工作流动态启动视图
   * @type {IApiWFDynaStartViewController}
   * @memberof IApiViewMapping
   */
  DEWFDYNASTARTVIEW: IApiWFDynaStartViewController;
  /**
   * @description 应用流程处理记录视图
   * @type {IApiWFStepDataViewController}
   * @memberof IApiViewMapping
   */
  APPWFSTEPDATAVIEW: IApiWFStepDataViewController;
  /**
   * @description 实体向导视图
   * @type {IApiWizardViewController}
   * @memberof IApiViewMapping
   */
  DEWIZARDVIEW: IApiWizardViewController;
  /**
   * @description 实体移动端日历视图
   * @type {IApiMobCalendarViewController}
   * @memberof IApiViewMapping
   */
  DEMOBCALENDARVIEW: IApiMobCalendarViewController;
  /**
   * @description 实体移动端图表视图
   * @type {IApiMobChartViewController}
   * @memberof IApiViewMapping
   */
  DEMOBCHARTVIEW: IApiMobChartViewController;
  /**
   * @description 实体移动端自定义视图
   * @type {IApiMobCustomViewController}
   * @memberof IApiViewMapping
   */
  DEMOBCUSTOMVIEW: IApiMobCustomViewController;
  /**
   * @description 实体移动端卡片视图
   * @type {IApiMobDataViewController}
   * @memberof IApiViewMapping
   */
  DEMOBDATAVIEW: IApiMobDataViewController;
  /**
   * @description 实体移动端编辑视图
   * @type {IApiMobEditViewController}
   * @memberof IApiViewMapping
   */
  DEMOBEDITVIEW: IApiMobEditViewController;
  /**
   * @description 实体移动端编辑视图（分页关系）
   * @type {IApiMobEditView3Controller}
   * @memberof IApiViewMapping
   */
  DEMOBEDITVIEW3: IApiMobEditView3Controller;
  /**
   * @description 实体移动端多数据视图
   * @type {IApiMobMDViewController}
   * @memberof IApiViewMapping
   */
  DEMOBMDVIEW: IApiMobMDViewController;
  /**
   * @description 实体移动端多数据选择视图
   * @type {IApiMobMPickupViewController}
   * @memberof IApiViewMapping
   */
  DEMOBMPICKUPVIEW: IApiMobMPickupViewController;
  /**
   * @description 实体移动端选项操作视图
   * @type {IApiMobOptViewController}
   * @memberof IApiViewMapping
   */
  DEMOBOPTVIEW: IApiMobOptViewController;
  /**
   * @description 实体移动端选择多数据视图（部件视图）
   * @type {IApiMobPickupMDViewController}
   * @memberof IApiViewMapping
   */
  DEMOBPICKUPMDVIEW: IApiMobPickupMDViewController;
  /**
   * @description  实体移动端选择树视图（部件视图）
   * @type {IApiMobPickupTreeViewController}
   * @memberof IApiViewMapping
   */
  DEMOBPICKUPTREEVIEW: IApiMobPickupTreeViewController;
  /**
   * @description 实体移动端数据选择视图
   * @type {IApiMobPickupViewController}
   * @memberof IApiViewMapping
   */
  DEMOBPICKUPVIEW: IApiMobPickupViewController;
  /**
   * @description 实体移动端分页导航视图
   * @type {IApiMobTabExpViewController}
   * @memberof IApiViewMapping
   */
  DEMOBTABEXPVIEW: IApiMobTabExpViewController;
  /**
   * @description 实体移动端分页搜索视图
   * @type {IApiMobTabSearchViewController}
   * @memberof IApiViewMapping
   */
  DEMOBTABSEARCHVIEW: IApiMobTabSearchViewController;
  /**
   * @description 实体移动端树导航视图
   * @type {IApiMobTreeExpViewController}
   * @memberof IApiViewMapping
   */
  DEMOBTREEEXPVIEW: IApiMobTreeExpViewController;
  /**
   * @description 实体移动端树视图
   * @type {IApiMobTreeViewController}
   * @memberof IApiViewMapping
   */
  DEMOBTREEVIEW: IApiMobTreeViewController;
  /**
   * @description 实体移动端工作流动态操作视图
   * @type {IApiMobWFDynaActionViewController}
   * @memberof IApiViewMapping
   */
  DEMOBWFDYNAACTIONVIEW: IApiMobWFDynaActionViewController;
  /**
   * @description 实体移动端工作流动态编辑视图
   * @type {IApiMobWFDynaEditViewController}
   * @memberof IApiViewMapping
   */
  DEMOBWFDYNAEDITVIEW: IApiMobWFDynaEditViewController;
  /**
   * @description 实体移动端工作流动态编辑视图（分页关系）
   * @type {IApiMobWFDynaEditView3Controller}
   * @memberof IApiViewMapping
   */
  DEMOBWFDYNAEDITVIEW3: IApiMobWFDynaEditView3Controller;
  /**
   * @description 实体移动端工作流动态启动视图
   * @type {IApiMobWFDynaStartViewController}
   * @memberof IApiViewMapping
   */
  DEMOBWFDYNASTARTVIEW: IApiMobWFDynaStartViewController;
  /**
   * @description 实体移动端向导视图
   * @type {IApiMobWizardViewController}
   * @memberof IApiViewMapping
   */
  DEMOBWIZARDVIEW: IApiMobWizardViewController;
  /**
   * @description 应用流程跟踪视图
   * @type {IApiWFStepTraceViewController}
   * @memberof IApiViewMapping
   */
  APPWFSTEPTRACEVIEW: IApiWFStepTraceViewController;

  /**
   * @description 实体多数据自定义视图
   * @type {IApiMDCustomViewController}
   * @memberof IApiViewMapping
   */
  DEMDCUSTOMVIEW: IApiMDCustomViewController;
}
