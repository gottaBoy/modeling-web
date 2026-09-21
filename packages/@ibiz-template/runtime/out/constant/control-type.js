/* eslint-disable no-shadow */
/**
 * 部件类型
 *
 * @author chitanda
 * @date 2022-07-24 16:07:57
 * @export
 * @class ControlType
 */
export var ControlType;
(function (ControlType) {
    /**
     * 应用菜单
     */
    ControlType["APP_MENU"] = "APPMENU";
    /**
     * 数据表格
     */
    ControlType["GRID"] = "GRID";
    /**
     * 编辑表单
     */
    ControlType["FORM"] = "FORM";
    /**
     * 搜索表单
     */
    ControlType["SEARCHFORM"] = "SEARCHFORM";
    /**
     * 工具栏
     */
    ControlType["TOOLBAR"] = "TOOLBAR";
    /**
     * 数据关系栏
     */
    ControlType["DRBAR"] = "DRBAR";
    /**
     * 单视图面板
     */
    ControlType["VIEWPANEL"] = "VIEWPANEL";
    /**
     * 选择视图面板
     */
    ControlType["PICKUP_VIEW_PANEL"] = "PICKUPVIEWPANEL";
    /**
     * 数据视图
     */
    ControlType["DATAVIEW"] = "DATAVIEW";
    /**
     * 数据树表格
     */
    ControlType["TREEGRID"] = "TREEGRID";
    /**
     * 流程导航栏
     */
    ControlType["WF_EXPBAR"] = "WFEXPBAR";
    /**
     * 树视图
     */
    ControlType["TREEVIEW"] = "TREEVIEW";
    /**
     * 树视图导航栏
     */
    ControlType["TREE_EXP_BAR"] = "TREEEXPBAR";
    /**
     * 分页视图面板
     */
    ControlType["TAB_VIEWPANEL"] = "TABVIEWPANEL";
    /**
     * 数据关系分页部件
     */
    ControlType["DRTAB"] = "DRTAB";
    /**
     * 数据图表
     */
    ControlType["CHART"] = "CHART";
    /**
     * 报表面板
     */
    ControlType["REPORT_PANEL"] = "REPORTPANEL";
    /**
     * 列表
     */
    ControlType["LIST"] = "LIST";
    /**
     * 移动端多数据视图
     */
    ControlType["MOB_MDCTRL"] = "MOBMDCTRL";
    /**
     * 多编辑视图面板
     */
    ControlType["MULTI_EDIT_VIEWPANEL"] = "MULTIEDITVIEWPANEL";
    /**
     * 向导面板
     */
    ControlType["WIZARD_PANEL"] = "WIZARDPANEL";
    /**
     * 更新面板
     */
    ControlType["UPDATE_PANEL"] = "UPDATEPANEL";
    /**
     * 搜索栏
     */
    ControlType["SEARCHBAR"] = "SEARCHBAR";
    /**
     * 数据看板
     */
    ControlType["DASHBOARD"] = "DASHBOARD";
    /**
     * 日历部件
     */
    ControlType["CALENDAR"] = "CALENDAR";
    /**
     * 面板部件
     */
    ControlType["PANEL"] = "PANEL";
    /**
     * 视图布局面板部件
     */
    ControlType["VIEW_LAYOUT_PANEL"] = "VIEWLAYOUTPANEL";
    /**
     * 地图部件
     */
    ControlType["MAP"] = "MAP";
    /**
     * 甘特部件
     */
    ControlType["GANTT"] = "GANTT";
    /**
     * 树表格（增强）
     */
    ControlType["TREE_GRIDEX"] = "TREEGRIDEX";
    /**
     * 看板
     */
    ControlType["KANBAN"] = "KANBAN";
    /**
     * 日历视图导航栏
     */
    ControlType["CALENDAR_EXPBAR"] = "CALENDAREXPBAR";
    /**
     * 图表视图导航栏
     */
    ControlType["CHART_EXPBAR"] = "CHARTEXPBAR";
    /**
     * 卡片视图导航栏
     */
    ControlType["DATA_VIEW_EXPBAR"] = "DATAVIEWEXPBAR";
    /**
     * 甘特视图导航栏
     */
    ControlType["GANTT_EXPBAR"] = "GANTTEXPBAR";
    /**
     * 表格视图导航栏
     */
    ControlType["GRID_EXPBAR"] = "GRIDEXPBAR";
    /**
     * 列表视图导航栏
     */
    ControlType["LIST_EXPBAR"] = "LISTEXPBAR";
    /**
     * 地图视图导航栏
     */
    ControlType["MAP_EXPBAR"] = "MAPEXPBAR";
    /**
     * 状态向导面板
     */
    ControlType["STATE_WIZARD_PANEL"] = "STATEWIZARDPANEL";
    /**
     * 分页导航面板
     */
    ControlType["TAB_EXP_PANEL"] = "TABEXPPANEL";
    /**
     * 自定义部件
     */
    ControlType["CUSTOM"] = "CUSTOM";
    /**
     * 标题栏
     */
    ControlType["CAPTIONBAR"] = "CAPTIONBAR";
    /**
     * 上下文菜单
     */
    ControlType["CONTEXT_MENU"] = "CONTEXTMENU";
})(ControlType || (ControlType = {}));
/**
 * 多数据部件类型集合
 *
 * @export
 */
export const MDControlTypes = [
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
