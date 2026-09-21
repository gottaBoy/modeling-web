import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ISysPFPlugin
 */
export interface ISysPFPlugin extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 插件代码
   * @type {string}
   * 来源  getPluginCode
   */
  pluginCode?: string;

  /**
   * 插件模型
   * @type {IModel}
   * 来源  getPluginModel
   */
  pluginModel?: IModel;

  /**
   * 插件动态参数
   * @type {IModel}
   * 来源  getPluginParams
   */
  pluginParams?: IModel;

  /**
   * 插件标记
   * @type {string}
   * 来源  getPluginTag
   */
  pluginTag?: string;

  /**
   * 应用插件类型
   * @description 值模式 [云平台应用框架插件类型] {AC_ITEM：自填列表项绘制插件、 CHART_RENDER：图表绘制插件、 CHART_AXISRENDER：图表坐标轴绘制插件、 CHART_SERIESRENDER：图表序列绘制插件、 CHART_CSRENDER：图表坐标系组件绘制插件、 CUSTOM：自定义部件绘制插件、 DATAVIEW_ITEM：数据视图项绘制插件、 DATAVIEW_RENDER：数据视图绘制插件、 EDITFORM_RENDER：编辑表单绘制插件、 EDITOR_CUSTOMSTYLE：编辑器自定义绘制插件、 FORM_USERCONTROL：表单自定义控件绘制插件、 GRID_COLRENDER：数据表格列绘制插件、 GRID_RENDER：数据表格绘制插件、 LIST_ITEMRENDER：列表项绘制插件、 LIST_RENDER：列表绘制插件、 PORTLET_CUSTOM：自定义门户部件绘制插件、 PORTLET_TITLEBAR：门户部件标题栏绘制插件、 SEARCHFORM_RENDER：搜索表单绘制插件、 TOOLBAR_ITEM：工具栏项绘制插件、 TOOLBAR_RENDER：工具栏绘制插件、 TREEEXPBAR_RENDER：树导航栏绘制插件、 TREE_RENDER：树视图绘制插件、 UIENGINE：界面引擎、 UILOGICNODE：界面逻辑节点、 VIEW_CUSTOM：实体视图绘制插件、 DEMETHOD：应用实体方法插件、 APPUTIL：应用功能插件、 APPCOUNTER：应用计数器插件、 DEDATAIMPORT：应用实体数据导入、 DEDATAEXPORT：应用实体数据导出、 DEFVALUERULE：应用实体属性值规则、 APPVALUERULE：应用值规则、 SEARCHBAR_ITEM：搜索栏项绘制插件、 SEARCHBAR_RENDER：搜索栏绘制插件、 WIZARDPANEL_RENDER：向导面板绘制插件、 DEUIACTION：应用实体界面行为、 CALENDAR_ITEM：日历部件项绘制插件、 CALENDAR_RENDER：日历部件绘制插件、 MAPVIEW_ITEM：地图部件项绘制插件、 MAPVIEW_RENDER：地图部件绘制插件、 PANEL_ITEM：面板部件成员绘制插件、 PANEL_RENDER：面板部件绘制插件、 DASHBOARD_ITEM：数据看板成员绘制插件、 DASHBOARD_RENDER：数据看板绘制插件、 APPUILOGIC：系统界面逻辑插件、 APPMENU_ITEM：应用菜单项绘制插件、 APPMENU_RENDER：应用菜单绘制插件、 TITLEBAR_RENDER：标题栏绘制插件 }
   * @type {( string | 'AC_ITEM' | 'CHART_RENDER' | 'CHART_AXISRENDER' | 'CHART_SERIESRENDER' | 'CHART_CSRENDER' | 'CUSTOM' | 'DATAVIEW_ITEM' | 'DATAVIEW_RENDER' | 'EDITFORM_RENDER' | 'EDITOR_CUSTOMSTYLE' | 'FORM_USERCONTROL' | 'GRID_COLRENDER' | 'GRID_RENDER' | 'LIST_ITEMRENDER' | 'LIST_RENDER' | 'PORTLET_CUSTOM' | 'PORTLET_TITLEBAR' | 'SEARCHFORM_RENDER' | 'TOOLBAR_ITEM' | 'TOOLBAR_RENDER' | 'TREEEXPBAR_RENDER' | 'TREE_RENDER' | 'UIENGINE' | 'UILOGICNODE' | 'VIEW_CUSTOM' | 'DEMETHOD' | 'APPUTIL' | 'APPCOUNTER' | 'DEDATAIMPORT' | 'DEDATAEXPORT' | 'DEFVALUERULE' | 'APPVALUERULE' | 'SEARCHBAR_ITEM' | 'SEARCHBAR_RENDER' | 'WIZARDPANEL_RENDER' | 'DEUIACTION' | 'CALENDAR_ITEM' | 'CALENDAR_RENDER' | 'MAPVIEW_ITEM' | 'MAPVIEW_RENDER' | 'PANEL_ITEM' | 'PANEL_RENDER' | 'DASHBOARD_ITEM' | 'DASHBOARD_RENDER' | 'APPUILOGIC' | 'APPMENU_ITEM' | 'APPMENU_RENDER' | 'TITLEBAR_RENDER')}
   * 来源  getPluginType
   */
  pluginType?:
    | string
    | 'AC_ITEM'
    | 'CHART_RENDER'
    | 'CHART_AXISRENDER'
    | 'CHART_SERIESRENDER'
    | 'CHART_CSRENDER'
    | 'CUSTOM'
    | 'DATAVIEW_ITEM'
    | 'DATAVIEW_RENDER'
    | 'EDITFORM_RENDER'
    | 'EDITOR_CUSTOMSTYLE'
    | 'FORM_USERCONTROL'
    | 'GRID_COLRENDER'
    | 'GRID_RENDER'
    | 'LIST_ITEMRENDER'
    | 'LIST_RENDER'
    | 'PORTLET_CUSTOM'
    | 'PORTLET_TITLEBAR'
    | 'SEARCHFORM_RENDER'
    | 'TOOLBAR_ITEM'
    | 'TOOLBAR_RENDER'
    | 'TREEEXPBAR_RENDER'
    | 'TREE_RENDER'
    | 'UIENGINE'
    | 'UILOGICNODE'
    | 'VIEW_CUSTOM'
    | 'DEMETHOD'
    | 'APPUTIL'
    | 'APPCOUNTER'
    | 'DEDATAIMPORT'
    | 'DEDATAEXPORT'
    | 'DEFVALUERULE'
    | 'APPVALUERULE'
    | 'SEARCHBAR_ITEM'
    | 'SEARCHBAR_RENDER'
    | 'WIZARDPANEL_RENDER'
    | 'DEUIACTION'
    | 'CALENDAR_ITEM'
    | 'CALENDAR_RENDER'
    | 'MAPVIEW_ITEM'
    | 'MAPVIEW_RENDER'
    | 'PANEL_ITEM'
    | 'PANEL_RENDER'
    | 'DASHBOARD_ITEM'
    | 'DASHBOARD_RENDER'
    | 'APPUILOGIC'
    | 'APPMENU_ITEM'
    | 'APPMENU_RENDER'
    | 'TITLEBAR_RENDER';

  /**
   * 运行时对象名称
   * @type {string}
   * 来源  getRTObjectName
   */
  rtobjectName?: string;

  /**
   * 运行时对象来源
   * @type {number}
   * @default 0
   * 来源  getRTObjectSource
   */
  rtobjectSource?: number;

  /**
   * 仅扩展界面样式
   * @type {boolean}
   * @default false
   * 来源  isExtendStyleOnly
   */
  extendStyleOnly?: boolean;

  /**
   * 全局默认替换
   * @type {boolean}
   * @default false
   * 来源  isReplaceDefault
   */
  replaceDefault?: boolean;

  /**
   * 运行时对象
   * @type {boolean}
   * @default false
   * 来源  isRuntimeObject
   */
  runtimeObject?: boolean;
}
