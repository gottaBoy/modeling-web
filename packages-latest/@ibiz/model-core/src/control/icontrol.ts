import { IControlAction } from './icontrol-action';
import { IControlAttribute } from './icontrol-attribute';
import { IControlLogic } from './icontrol-logic';
import { IControlParam } from './icontrol-param';
import { IControlRender } from './icontrol-render';
import { ICtrlMsg } from '../res/ictrl-msg';
import { ISysCss } from '../res/isys-css';
import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件模型基础对象接口
 * 子接口类型识别属性[controlType]
 * @export
 * @interface IControl
 */
export interface IControl extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 部件样式
   * @type {string}
   * 来源  getControlStyle
   */
  controlStyle?: string;

  /**
   * 部件类型
   * @description 值模式 [部件类型] {TOOLBAR：工具栏、 GRID：数据表格、 FORM：编辑表单、 SEARCHFORM：搜索表单、 DRBAR：数据关系栏、 VIEWPANEL：单视图面板、 PICKUPVIEWPANEL：选择视图面板、 DATAVIEW：数据视图、 TREEGRID：数据树表格、 WFEXPBAR：流程导航栏、 TREEVIEW：树视图、 TREEEXPBAR：树视图导航栏、 TABVIEWPANEL：分页视图面板、 DRTAB：数据关系分页部件、 CHART：数据图表、 REPORTPANEL：报表面板、 LIST：列表、 MOBMDCTRL：移动端多数据视图、 MULTIEDITVIEWPANEL：多编辑视图面板、 WIZARDPANEL：向导面板、 UPDATEPANEL：更新面板、 SEARCHBAR：搜索栏、 DASHBOARD：数据看板、 CALENDAR：日历部件、 PANEL：面板部件、 MAP：地图部件、 GANTT：甘特部件、 TREEGRIDEX：树表格（增强）、 KANBAN：看板、 CALENDAREXPBAR：日历视图导航栏、 CHARTEXPBAR：图表视图导航栏、 DATAVIEWEXPBAR：卡片视图导航栏、 GANTTEXPBAR：甘特视图导航栏、 GRIDEXPBAR：表格视图导航栏、 LISTEXPBAR：列表视图导航栏、 MAPEXPBAR：地图视图导航栏、 STATEWIZARDPANEL：状态向导面板、 APPMENU：应用菜单、 TABEXPPANEL：分页导航面板、 CUSTOM：自定义部件 }
   * @type {( string | 'TOOLBAR' | 'GRID' | 'FORM' | 'SEARCHFORM' | 'DRBAR' | 'VIEWPANEL' | 'PICKUPVIEWPANEL' | 'DATAVIEW' | 'TREEGRID' | 'WFEXPBAR' | 'TREEVIEW' | 'TREEEXPBAR' | 'TABVIEWPANEL' | 'DRTAB' | 'CHART' | 'REPORTPANEL' | 'LIST' | 'MOBMDCTRL' | 'MULTIEDITVIEWPANEL' | 'WIZARDPANEL' | 'UPDATEPANEL' | 'SEARCHBAR' | 'DASHBOARD' | 'CALENDAR' | 'PANEL' | 'MAP' | 'GANTT' | 'TREEGRIDEX' | 'KANBAN' | 'CALENDAREXPBAR' | 'CHARTEXPBAR' | 'DATAVIEWEXPBAR' | 'GANTTEXPBAR' | 'GRIDEXPBAR' | 'LISTEXPBAR' | 'MAPEXPBAR' | 'STATEWIZARDPANEL' | 'APPMENU' | 'TABEXPPANEL' | 'CUSTOM')}
   * 来源  getControlType
   */
  controlType?:
    | string
    | 'TOOLBAR'
    | 'GRID'
    | 'FORM'
    | 'SEARCHFORM'
    | 'DRBAR'
    | 'VIEWPANEL'
    | 'PICKUPVIEWPANEL'
    | 'DATAVIEW'
    | 'TREEGRID'
    | 'WFEXPBAR'
    | 'TREEVIEW'
    | 'TREEEXPBAR'
    | 'TABVIEWPANEL'
    | 'DRTAB'
    | 'CHART'
    | 'REPORTPANEL'
    | 'LIST'
    | 'MOBMDCTRL'
    | 'MULTIEDITVIEWPANEL'
    | 'WIZARDPANEL'
    | 'UPDATEPANEL'
    | 'SEARCHBAR'
    | 'DASHBOARD'
    | 'CALENDAR'
    | 'PANEL'
    | 'MAP'
    | 'GANTT'
    | 'TREEGRIDEX'
    | 'KANBAN'
    | 'CALENDAREXPBAR'
    | 'CHARTEXPBAR'
    | 'DATAVIEWEXPBAR'
    | 'GANTTEXPBAR'
    | 'GRIDEXPBAR'
    | 'LISTEXPBAR'
    | 'MAPEXPBAR'
    | 'STATEWIZARDPANEL'
    | 'APPMENU'
    | 'TABEXPPANEL'
    | 'CUSTOM';

  /**
   * 动态系统模式
   * @description 值模式 [部件动态系统模式] {0：不启用、 1：启用、 2：启动（高级） }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getDynaSysMode
   */
  dynaSysMode?: number | 0 | 1 | 2;

  /**
   * 控件高度
   * @type {number}
   * @default 0.0
   * 来源  getHeight
   */
  height?: number;

  /**
   * 部件逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;

  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 部件注入属性集合
   *
   * @type {IControlAttribute[]}
   * 来源  getPSControlAttributes
   */
  controlAttributes?: IControlAttribute[];

  /**
   * 部件逻辑集合
   *
   * @type {IControlLogic[]}
   * 来源  getPSControlLogics
   */
  controlLogics?: IControlLogic[];

  /**
   * 部件参数
   *
   * @type {IControlParam}
   * 来源  getPSControlParam
   */
  controlParam?: IControlParam;

  /**
   * 部件绘制器集合
   *
   * @type {IControlRender[]}
   * 来源  getPSControlRenders
   */
  controlRenders?: IControlRender[];

  /**
   * 部件消息
   *
   * @type {ICtrlMsg}
   * 来源  getPSCtrlMsg
   */
  ctrlMsg?: ICtrlMsg;

  /**
   * 界面样式
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 部件优先级
   * @description 值模式 [部件优先权] {-1：未定义、 10：容器部件（支持合入）、 100：插件部件（用于合入） }
   * @type {( number | -1 | 10 | 100)}
   * @default -1
   * 来源  getPriority
   */
  priority?: number | -1 | 10 | 100;

  /**
   * 用户自定义行为2
   *
   * @type {IControlAction}
   * 来源  getUser2PSControlAction
   */
  user2ControlAction?: IControlAction;

  /**
   * 用户自定义行为
   *
   * @type {IControlAction}
   * 来源  getUserPSControlAction
   */
  userControlAction?: IControlAction;

  /**
   * 控件宽度
   * @type {number}
   * @default 0.0
   * 来源  getWidth
   */
  width?: number;
}
