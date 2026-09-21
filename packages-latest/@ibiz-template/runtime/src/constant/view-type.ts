/* eslint-disable no-shadow */
/**
 * 视图类型
 *
 * @author lxm
 * @date 2022-08-22 14:08:59
 * @export
 * @enum {number}
 */
export enum ViewType {
  /**
   * 应用首页视图
   */
  APP_INDEX_VIEW = 'APPINDEXVIEW',

  /**
   * 实体表格视图
   */
  DE_GRID_VIEW = 'DEGRIDVIEW',

  /**
   * 实体编辑视图
   */
  DE_EDIT_VIEW = 'DEEDITVIEW',

  /**
   * 应用数据导入视图
   */
  APP_DATA_UPLOAD_VIEW = 'APPDATAUPLOADVIEW',

  /**
   * 应用错误显示视图
   */
  APP_ERROR_VIEW = 'APPERRORVIEW',

  /**
   * 应用文件上传视图
   */
  APP_FILE_UPLOAD_VIEW = 'APPFILEUPLOADVIEW',

  /**
   * 应用功能选择视图
   */
  APP_FUN_PICKUP_VIEW = 'APPFUNCPICKUPVIEW',

  /**
   * 应用登录视图
   */
  APP_LOGIN_VIEW = 'APPLOGINVIEW',

  /**
   * 应用注销视图
   */
  APP_LOGOUT_VIEW = 'APPLOGOUTVIEW',

  /**
   * 应用面板视图
   */
  APP_PANEL_VIEW = 'APPPANELVIEW',

  /**
   * 应用图片上传视图
   */
  APP_PIC_UPLOAD_VIEW = 'APPPICUPLOADVIEW',

  /**
   * 应用看板视图
   */
  APP_PORTAL_VIEW = 'APPPORTALVIEW',

  /**
   * 应用全局数据重定向视图
   */
  APP_REDIRECT_VIEW = 'APPREDIRECTVIEW',

  /**
   * 应用启动视图
   */
  APP_START_VIEW = 'APPSTARTVIEW',

  /**
   * 应用欢迎视图
   */
  APP_WELCOME_VIEW = 'APPWELCOMEVIEW',

  /**
   * 应用流程后加签操作视图
   */
  APP_WF_ADD_STEP_AFTER_VIEW = 'APPWFADDSTEPAFTERVIEW',

  /**
   * 应用流程前加签操作视图
   */
  APP_WF_ADD_STEP_BEFORE_VIEW = 'APPWFADDSTEPBEFOREVIEW',

  /**
   * 应用全局流程工作重定向视图
   */
  APP_WF_REDIRECT_VIEW = 'APPWFREDIRECTVIEW',

  /**
   * 应用流程回退操作视图
   */
  APP_WF_SENDBAC_VIEW = 'APPWFSENDBACKVIEW',

  /**
   * 应用流程当前处理人视图
   */
  APP_WF_STEP_ACTOR_VIEW = 'APPWFSTEPACTORVIEW',

  /**
   * 应用流程处理记录视图
   */
  APP_WF_STEP_DATA_VIEW = 'APPWFSTEPDATAVIEW',

  /**
   * 应用流程跟踪视图
   */
  APP_WF_STEP_TRACE_VIEW = 'APPWFSTEPTRACEVIEW',

  /**
   * 应用流程补充信息操作视图
   */
  APP_WF_SUPPLY_INFO_VIEW = 'APPWFSUPPLYINFOVIEW',

  /**
   * 应用流程征求意见操作视图
   */
  APP_WF_TAKE_ADVICE_VIEW = 'APPWFTAKEADVICEVIEW',

  /**
   * 实体日历导航视图
   */
  DE_CALENDAR_EXP_VIEW = 'DECALENDAREXPVIEW',

  /**
   * 实体日历视图
   */
  DE_CALENDAR_VIEW = 'DECALENDARVIEW',

  /**
   * 实体图表导航视图
   */
  DE_CHART_EXP_VIEW = 'DECHARTEXPVIEW',

  /**
   * 实体图表视图
   */
  DE_CHART_VIEW = 'DECHARTVIEW',

  /**
   * 实体图表视图（部件视图）
   */
  DE_CHART_VIEW9 = 'DECHARTVIEW9',

  /**
   * 实体自定义视图
   */
  DE_CUSTOM_VIEW = 'DECUSTOMVIEW',

  /**
   * 实体数据视图
   */
  DE_DATA_VIEW = 'DEDATAVIEW',

  /**
   * 实体数据视图（部件视图）
   */
  DE_DATA_VIEW9 = 'DEDATAVIEW9',

  /**
   * 实体卡片视图导航视图
   */
  DE_DATAVIEW_EXP_VIEW = 'DEDATAVIEWEXPVIEW',

  /**
   * 实体编辑视图（左右关系）
   */
  DE_EDIT_VIEW2 = 'DEEDITVIEW2',

  /**
   * 实体编辑视图（分页关系）
   */
  DE_EDIT_VIEW3 = 'DEEDITVIEW3',

  /**
   * 实体编辑视图（上下关系）
   */
  DE_EDIT_VIEW4 = 'DEEDITVIEW4',

  /**
   * 实体编辑视图（部件视图）
   */
  DE_EDIT_VIEW9 = 'DEEDITVIEW9',

  /**
   * 实体表单选择数据视图（部件视图）
   */
  DE_FORM_PICKUP_DATA_VIEW = 'DEFORMPICKUPDATAVIEW',

  /**
   * 实体甘特图导航视图
   */
  DE_GANTT_EXP_VIEW = 'DEGANTTEXPVIEW',

  /**
   * 实体甘特视图
   */
  DE_GANTT_VIEW = 'DEGANTTVIEW',

  /**
   * 实体甘特视图（部件视图）
   */
  DE_GANTT_VIEW9 = 'DEGANTTVIEW9',

  /**
   * 实体表格导航视图
   */
  DE_GRID_EXP_VIEW = 'DEGRIDEXPVIEW',

  /**
   * 实体表格视图（左右关系）
   */
  DE_GRID_VIEW2 = 'DEGRIDVIEW2',

  /**
   * 实体表格视图（上下关系）
   */
  DE_GRID_VIEW4 = 'DEGRIDVIEW4',

  /**
   * 实体关系数据表格视图（嵌入）
   */
  DE_GRID_VIEW8 = 'DEGRIDVIEW8',

  /**
   * 实体表格视图（部件视图）
   */
  DE_GRID_VIEW9 = 'DEGRIDVIEW9',

  /**
   * 实体HTML视图
   */
  DE_HTML_VIEW = 'DEHTMLVIEW',

  /**
   * 实体索引关系选择数据视图（部件视图）
   */
  DE_INDEX_PICKUP_DATA_VIEW = 'DEINDEXPICKUPDATAVIEW',

  /**
   * 实体首页视图
   */
  DE_INDEX_VIEW = 'DEINDEXVIEW',

  /**
   * 实体看板视图
   */
  DE_KANBAN_VIEW = 'DEKANBANVIEW',

  /**
   * 实体看板视图（部件视图）
   */
  DE_KANBAN_VIEW9 = 'DEKANBANVIEW9',

  /**
   * 实体列表导航视图
   */
  DE_LIST_EXP_VIEW = 'DELISTEXPVIEW',

  /**
   * 实体列表视图
   */
  DE_LIST_VIEW = 'DELISTVIEW',

  /**
   * 实体列表视图（部件视图）
   */
  DE_LIST_VIEW9 = 'DELISTVIEW9',

  /**
   * 实体地图导航视图
   */
  DE_MAP_EXP_VIEW = 'DEMAPEXPVIEW',

  /**
   * 实体地图视图
   */
  DE_MAP_VIEW = 'DEMAPVIEW',

  /**
   * 实体地图视图（部件视图）
   */
  DE_MAP_VIEW9 = 'DEMAPVIEW9',

  /**
   * 实体多数据自定义视图
   */
  DE_MD_CUSTOM_VIEW = 'DEMDCUSTOMVIEW',

  /**
   * 实体多表单编辑视图（部件视图）
   */
  DE_MEDITVIEW9 = 'DEMEDITVIEW9',

  /**
   * 实体移动端日历导航视图
   */
  DE_MOB_CALENDAR_EXP_VIEW = 'DEMOBCALENDAREXPVIEW',

  /**
   * 实体移动端日历视图
   */
  DE_MOB_CALENDAR_VIEW = 'DEMOBCALENDARVIEW',

  /**
   * 实体移动端日历视图（部件视图）
   */
  DE_MOB_CALENDAR_VIEW9 = 'DEMOBCALENDARVIEW9',

  /**
   * 实体移动端图表导航视图
   */
  DE_MOB_CHART_EXP_VIEW = 'DEMOBCHARTEXPVIEW',

  /**
   * 实体移动端图表视图
   */
  DE_MO_BCHART_VIEW = 'DEMOBCHARTVIEW',

  /**
   * 实体移动端图表视图（部件视图）
   */
  D_EMOB_CHART_VIEW9 = 'DEMOBCHARTVIEW9',

  /**
   * 实体移动端自定义视图
   */
  DE_MOB_CUSTOM_VIEW = 'DEMOBCUSTOMVIEW',

  /**
   * 实体移动端卡片视图
   */
  DE_MOB_DATA_VIEW = 'DEMOBDATAVIEW',

  /**
   * 实体移动端卡片视图导航视图
   */
  DE_MOB_DATA_VIEW_EXP_VIEW = 'DEMOBDATAVIEWEXPVIEW',

  /**
   * 实体移动端编辑视图
   */
  DE_MOB_EDIT_VIEW = 'DEMOBEDITVIEW',

  /**
   * 实体移动端编辑视图（分页关系）
   */
  DE_MOB_EDIT_VIEW3 = 'DEMOBEDITVIEW3',

  /**
   * 实体移动端编辑视图（部件视图）
   */
  DE_MOB_EDITVIEW9 = 'DEMOBEDITVIEW9',

  /**
   * 实体移动端表单类型选择多数据视图（部件视图）
   */
  DE_MOB_FORM_PICKUP_MDVIEW = 'DEMOBFORMPICKUPMDVIEW',

  /**
   * 实体移动端甘特图导航视图
   */
  DE_MOB_GANTT_EXP_VIEW = 'DEMOBGANTTEXPVIEW',

  /**
   * 实体移动端甘特视图
   */
  DE_MOB_GANTT_VIEW = 'DEMOBGANTTVIEW',

  /**
   * 实体移动端甘特视图（部件视图）
   */
  DE_MOB_GANTT_VIEW9 = 'DEMOBGANTTVIEW9',

  /**
   * 实体移动端HTML视图
   */
  DE_MOB_HTML_VIEW = 'DEMOBHTMLVIEW',

  /**
   * 实体移动端索引类型选择多数据视图（部件视图）
   */
  DE_MOB_INDEX_PICKUP_MDVIEW = 'DEMOBINDEXPICKUPMDVIEW',

  /**
   * 实体移动端列表导航视图
   */
  DE_MOB_LIST_EXP_VIEW = 'DEMOBLISTEXPVIEW',

  /**
   * 实体移动端列表视图
   */
  DE_MOB_LIST_VIEW = 'DEMOBLISTVIEW',

  /**
   * 实体移动端地图视图
   */
  DE_MOB_MAP_VIEW = 'DEMOBMAPVIEW',

  /**
   * 实体移动端地图视图（部件视图）
   */
  DE_MOB_MAP_VIEW9 = 'DEMOBMAPVIEW9',

  /**
   * 实体移动端多数据视图
   */
  DE_MOB_MDVIEW = 'DEMOBMDVIEW',

  /**
   * 实体移动端多数据视图（部件视图）
   */
  DE_MOB_MDVIEW9 = 'DEMOBMDVIEW9',

  /**
   * 实体移动端多表单编辑视图（部件视图）
   */
  DE_MOB_MEDIT_VIEW9 = 'DEMOBMEDITVIEW9',

  /**
   * 实体移动端多数据选择视图
   */
  DE_MOB_MPICKUP_VIEW = 'DEMOBMPICKUPVIEW',

  /**
   * 实体移动端选项操作视图
   */
  DE_MOB_OPT_VIEW = 'DEMOBOPTVIEW',

  /**
   * 实体移动端面板视图
   */
  DE_MOB_PANEL_VIEW = 'DEMOBPANELVIEW',

  /**
   * 实体移动端面板视图（部件视图）
   */
  DE_MOB_PANEL_VIEW9 = 'DEMOBPANELVIEW9',

  /**
   * 实体移动端选择列表视图（部件视图）
   */
  DE_MOB_PICKUP_LIST_VIEW = 'DEMOBPICKUPLISTVIEW',

  /**
   * 实体移动端选择多数据视图（部件视图）
   */
  DE_MOB_PICKUP_MDVIEW = 'DEMOBPICKUPMDVIEW',

  /**
   * 实体移动端选择树视图（部件视图）
   */
  DE_MOB_PICKUP_TREE_VIEW = 'DEMOBPICKUPTREEVIEW',

  /**
   * 实体移动端数据选择视图
   */
  DE_MOB_PICKUP_VIEW = 'DEMOBPICKUPVIEW',

  /**
   * 实体移动端数据看板视图
   */
  DE_MOB_PORTAL_VIEW = 'DEMOBPORTALVIEW',

  /**
   * 实体移动端数据看板视图（部件视图）
   */
  DE_MOB_PORTAL_VIEW9 = 'DEMOBPORTALVIEW9',

  /**
   * 实体移动端数据重定向视图
   */
  DE_MOB_REDIRECT_VIEW = 'DEMOBREDIRECTVIEW',

  /**
   * 实体移动端报表视图
   */
  DE_MOB_REPORT_VIEW = 'DEMOBREPORTVIEW',

  /**
   * 实体移动端分页导航视图
   */
  DE_MOB_TAB_EXP_VIEW = 'DEMOBTABEXPVIEW',

  /**
   * 实体移动端分页导航视图（部件视图）
   */
  DE_MOB_TAB_EXP_VIEW9 = 'DEMOBTABEXPVIEW9',

  /**
   * 实体移动端分页搜索视图
   */
  DE_MOB_TAB_SEARCH_VIEW = 'DEMOBTABSEARCHVIEW',

  /**
   * 实体移动端分页搜索视图（部件视图）
   */
  DE_MOB_TAB_SEARCH_VIEW9 = 'DEMOBTABSEARCHVIEW9',

  /**
   * 实体移动端树导航视图
   */
  DE_MOB_TREE_EXP_VIEW = 'DEMOBTREEEXPVIEW',

  /**
   * 实体移动端树导航视图（部件视图）
   */
  DEMOBTREEEXPVIEW9 = 'DEMOBTREEEXPVIEW9',

  /**
   * 实体移动端树视图
   */
  DE_MOB_TREE_VIEW = 'DEMOBTREEVIEW',

  /**
   * 实体移动端工作流操作视图
   */
  DE_MOB_WFACTION_VIEW = 'DEMOBWFACTIONVIEW',

  /**
   * 移动端实体全局流程数据重定向视图
   */
  DE_MOB_WF_DATA_REDIRECT_VIEW = 'DEMOBWFDATAREDIRECTVIEW',

  /**
   * 实体移动端工作流动态操作视图
   */
  DE_MOB_WF_DYNAACTIO_NVIEW = 'DEMOBWFDYNAACTIONVIEW',

  /**
   * 实体移动端工作流动态编辑视图
   */
  DE_MOB_WFDYNA_EDIT_VIEW = 'DEMOBWFDYNAEDITVIEW',

  /**
   * 实体移动端工作流动态编辑视图（分页关系）
   */
  DE_MOB_WF_DYNA_EDIT_VIEW3 = 'DEMOBWFDYNAEDITVIEW3',

  /**
   * 实体移动端工作流动态导航多数据视图
   */
  DE_MOB_WF_DYNA_EXP_MDVIEW = 'DEMOBWFDYNAEXPMDVIEW',

  /**
   * 实体移动端工作流动态启动视图
   */
  DE_MO_BWF_DYNA_START_VIEW = 'DEMOBWFDYNASTARTVIEW',

  /**
   * 实体移动端工作流编辑视图
   */
  DE_MOB_WF_EDIT_VIEW = 'DEMOBWFEDITVIEW',

  /**
   * 实体移动端工作流编辑视图（分页关系）
   */
  DE_MOB_WF_EDIT_VIEW3 = 'DEMOBWFEDITVIEW3',

  /**
   * 实体移动端工作流多数据视图
   */
  DE_MOB_WF_MDVIEW = 'DEMOBWFMDVIEW',

  /**
   * 实体移动端工作流代理应用结果视图
   */
  DE_MOB_WF_PROXY_RESULT_VIEW = 'DEMOBWFPROXYRESULTVIEW',

  /**
   * 实体移动端工作流代理应用启动视图
   */
  DE_MOB_WF_PROXY_START_VIEW = 'DEMOBWFPROXYSTARTVIEW',

  /**
   * 实体移动端工作流启动视图
   */
  DE_MOB_WF_START_VIEW = 'DEMOBWFSTARTVIEW',

  /**
   * 实体移动端向导视图
   */
  DE_MOB_WIZARD_VIEW = 'DEMOBWIZARDVIEW',

  /**
   * 实体数据多项选择视图
   */
  DE_MPICKUP_VIEW = 'DEMPICKUPVIEW',

  /**
   * 实体多项数据选择视图（左右关系）
   */
  DE_MPICKUP_VIEW2 = 'DEMPICKUPVIEW2',

  /**
   * 实体选项操作视图
   */
  DE_OPT_VIEW = 'DEOPTVIEW',

  /**
   * 实体面板视图
   */
  DE_PANEL_VIEW = 'DEPANELVIEW',

  /**
   * 实体面板视图（部件视图）
   */
  DE_PANEL_VIEW9 = 'DEPANELVIEW9',

  /**
   * 实体选择数据视图（部件视图）
   */
  DE_PICKUP_DATA_VIEW = 'DEPICKUPDATAVIEW',

  /**
   * 实体选择表格视图（部件视图）
   */
  DE_PICKUP_GRID_VIEW = 'DEPICKUPGRIDVIEW',

  /**
   * 实体选择树视图（部件视图）
   */
  DE_PICKUP_TREE_VIEW = 'DEPICKUPTREEVIEW',

  /**
   * 实体数据选择视图
   */
  DE_PICKUP_VIEW = 'DEPICKUPVIEW',

  /**
   * 实体数据选择视图（左右关系）
   */
  DE_PICKUP_VIEW2 = 'DEPICKUPVIEW2',

  /**
   * 实体数据选择视图（分页关系）
   */
  DE_PICK_UP_VIEW3 = 'DEPICKUPVIEW3',

  /**
   * 实体数据看板视图
   */
  DE_PORTAL_VIEW = 'DEPORTALVIEW',

  /**
   * 实体数据看板视图（部件视图）
   */
  DE_PORTAL_VIEW9 = 'DEPORTALVIEW9',

  /**
   * 实体数据重定向视图
   */
  DE_REDIRECT_VIEW = 'DEREDIRECTVIEW',

  /**
   * 实体报表视图
   */
  DE_REPORT_VIEW = 'DEREPORTVIEW',

  /**
   * 实体分页导航视图
   */
  DE_TAB_EXP_VIEW = 'DETABEXPVIEW',

  /**
   * 实体分页导航视图（部件视图）
   */
  DE_TAB_EXP_VIEW9 = 'DETABEXPVIEW9',

  /**
   * 实体分页搜索视图
   */
  DE_TAB_SEARCH_VIEW = 'DETABSEARCHVIEW',

  /**
   * 实体分页搜索视图（部件视图）
   */
  DE_TAB_SEARCH_VIEW9 = 'DETABSEARCHVIEW9',

  /**
   * 实体树导航视图
   */
  DE_TREE_EXP_VIEW = 'DETREEEXPVIEW',

  /**
   * 实体树导航视图（IFrame）
   */
  DE_TREE_EXP_VIEW2 = 'DETREEEXPVIEW2',

  /**
   * 实体树导航视图（菜单模式）
   */
  DE_TREE_EXP_VIEW3 = 'DETREEEXPVIEW3',

  /**
   * 实体树表格视图（增强）
   */
  DE_TREE_GRID_EXVIEW = 'DETREEGRIDEXVIEW',

  /**
   * 实体树表格视图（增强）（部件视图）
   */
  DE_TREE_GRID_EXVIEW9 = 'DETREEGRIDEXVIEW9',

  /**
   * 实体树表格视图
   */
  DE_TREE_GRID_VIEW = 'DETREEGRIDVIEW',

  /**
   * 实体树表格视图（部件视图）
   */
  DE_TREE_GRID_VIEW9 = 'DETREEGRIDVIEW9',

  /**
   * 实体树视图
   */
  DE_TREE_VIEW = 'DETREEVIEW',

  /**
   * 实体树视图（部件视图）
   */
  DE_TREE_VIEW9 = 'DETREEVIEW9',

  /**
   * 实体工作流操作视图
   */
  DE_WF_ACTION_VIEW = 'DEWFACTIONVIEW',

  /**
   * 实体全局流程数据重定向视图
   */
  DE_WF_DATA_REDIRECT_VIEW = 'DEWFDATAREDIRECTVIEW',

  /**
   * 实体工作流动态操作视图
   */
  DE_WF_DYNA_ACTION_VIEW = 'DEWFDYNAACTIONVIEW',

  /**
   * 实体工作流动态编辑视图
   */
  DE_WF_DYNA_EDIT_VIEW = 'DEWFDYNAEDITVIEW',

  /**
   * 实体工作流动态视图（分页关系）
   */
  DE_WF_DYNA_EDIT_VIEW3 = 'DEWFDYNAEDITVIEW3',

  /**
   * 实体工作流动态导航表格视图
   */
  DE_WF_DYNA_EXP_GRID_VIEW = 'DEWFDYNAEXPGRIDVIEW',

  /**
   * 实体工作流动态启动视图
   */
  DE_WF_DYNA_START_VIEW = 'DEWFDYNASTARTVIEW',

  /**
   * 实体工作流编辑代理数据视图
   */
  DE_WF_EDIT_PROXY_DATA_VIEW = 'DEWFEDITPROXYDATAVIEW',

  /**
   * 实体工作流编辑视图
   */
  DE_WF_EDIT_VIEW = 'DEWFEDITVIEW',

  /**
   * 实体工作流编辑视图（左右关系）
   */
  DE_WF_EDIT_VIEW2 = 'DEWFEDITVIEW2',

  /**
   * 实体工作流视图（分页关系）
   */
  DE_WF_EDIT_VIEW3 = 'DEWFEDITVIEW3',

  /**
   * 实体工作流视图（嵌入视图）
   */
  DE_WF_EDIT_VIEW9 = 'DEWFEDITVIEW9',

  /**
   * 实体工作流导航视图
   */
  DE_WF_EXP_VIEW = 'DEWFEXPVIEW',

  /**
   * 实体工作流表格视图
   */
  DE_WF_GRID_VIEW = 'DEWFGRIDVIEW',

  /**
   * 实体工作流代理数据视图
   */
  DE_WF_PROXY_DATA_VIEW = 'DEWFPROXYDATAVIEW',

  /**
   * 实体工作流代理应用结果视图
   */
  DE_WF_PROXY_RESULT_VIEW = 'DEWFPROXYRESULTVIEW',

  /**
   * 实体工作流代理应用启动视图
   */
  DE_WF_PROXY_START_VIEW = 'DEWFPROXYSTARTVIEW',

  /**
   * 实体工作流启动视图
   */
  DE_WF_START_VIEW = 'DEWFSTARTVIEW',

  /**
   * 实体向导视图
   */
  DE_WIZARD_VIEW = 'DEWIZARDVIEW',

  /**
   * 实体向导视图
   */
  DE_SUB_APP_REF_VIEW = 'DESUBAPPREFVIEW',
}
