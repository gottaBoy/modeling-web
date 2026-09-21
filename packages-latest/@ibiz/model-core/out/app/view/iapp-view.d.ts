import { IAppViewEngine } from './iapp-view-engine';
import { IAppViewLogic } from './iapp-view-logic';
import { IAppViewNavContext } from './iapp-view-nav-context';
import { IAppViewNavParam } from './iapp-view-nav-param';
import { IAppViewParam } from './iapp-view-param';
import { IAppViewRef } from './iapp-view-ref';
import { IControl } from '../../control/icontrol';
import { IControlContainer } from '../../control/icontrol-container';
import { IViewLayoutPanel } from '../../control/panel/iview-layout-panel';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';
/**
 *
 * 应用视图模型基础对象接口
 * 子接口类型识别属性[viewType]
 * @export
 * @interface IAppView
 */
export interface IAppView extends IControlContainer {
    /**
     * 访问用户模式
     * @description 值模式 [视图访问用户] {0：未指定、 1：未登录用户、 2：登录用户、 3：匿名用户及登录用户、 4：登录用户且拥有指定资源能力 }
     * @type {( number | 0 | 1 | 2 | 3 | 4)}
     * 来源  getAccUserMode
     */
    accUserMode?: number | 0 | 1 | 2 | 3 | 4;
    /**
     * 访问标识
     * @type {string}
     * 来源  getAccessKey
     */
    accessKey?: string;
    /**
     * 标题语言资源
     *
     * @type {ILanguageRes}
     * 来源  getCapPSLanguageRes
     */
    capLanguageRes?: ILanguageRes;
    /**
     * 视图标题
     * @type {string}
     * 来源  getCaption
     */
    caption?: string;
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * 动态系统模式
     * @description 值模式 [动态系统模式] {0：不启用、 1：启用 }
     * @type {( number | 0 | 1)}
     * @default 0
     * 来源  getDynaSysMode
     */
    dynaSysMode?: number | 0 | 1;
    /**
     * 视图高度
     * @type {number}
     * @default 0
     * 来源  getHeight
     */
    height?: number;
    /**
     * 应用菜单方向
     * @description 值模式 [应用首页视图主菜单方向] {LEFT：左侧、 TOP：上方、 CENTER：中间、 TREEEXP：树导航、 TABEXP_TOP：分页导航（上方分页）、 TABEXP_LEFT：分页导航（左侧分页）、 TABEXP_BOTTOM：分页导航（下方分页）、 TABEXP_RIGHT：分页导航（右侧分页）、 NONE：不显示 }
     * @type {( string | 'LEFT' | 'TOP' | 'CENTER' | 'TREEEXP' | 'TABEXP_TOP' | 'TABEXP_LEFT' | 'TABEXP_BOTTOM' | 'TABEXP_RIGHT' | 'NONE')}
     * 来源  getMainMenuAlign
     */
    mainMenuAlign?: string | 'LEFT' | 'TOP' | 'CENTER' | 'TREEEXP' | 'TABEXP_TOP' | 'TABEXP_LEFT' | 'TABEXP_BOTTOM' | 'TABEXP_RIGHT' | 'NONE';
    /**
     * 默认打开模式
     * @description 值模式 [视图打开方式] {INDEXVIEWTAB：顶级容器分页、 INDEXVIEWTAB_POPUP：顶级容器分页（非模态弹出）、 INDEXVIEWTAB_POPUPMODAL：顶级容器分页（模态弹出）、 POPUP：非模态弹出、 POPUPMODAL：模态弹出、 POPUPAPP：独立程序弹出、 DRAWER_LEFT：模态左侧抽屉弹出、 DRAWER_RIGHT：模态右侧抽屉弹出、 DRAWER_TOP：模态上方抽屉弹出、 DRAWER_BOTTOM：模态下方抽屉弹出、 POPOVER：气泡卡片、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
     * @type {( string | 'INDEXVIEWTAB' | 'INDEXVIEWTAB_POPUP' | 'INDEXVIEWTAB_POPUPMODAL' | 'POPUP' | 'POPUPMODAL' | 'POPUPAPP' | 'DRAWER_LEFT' | 'DRAWER_RIGHT' | 'DRAWER_TOP' | 'DRAWER_BOTTOM' | 'POPOVER' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
     * 来源  getOpenMode
     */
    openMode?: string | 'INDEXVIEWTAB' | 'INDEXVIEWTAB_POPUP' | 'INDEXVIEWTAB_POPUPMODAL' | 'POPUP' | 'POPUPMODAL' | 'POPUPAPP' | 'DRAWER_LEFT' | 'DRAWER_RIGHT' | 'DRAWER_TOP' | 'DRAWER_BOTTOM' | 'POPOVER' | 'USER' | 'USER2' | 'USER3' | 'USER4';
    /**
     * 视图应用实体
     *
     * @type {string}
     * 来源  getPSAppDataEntity
     */
    appDataEntityId?: string;
    /**
     * 视图界面引擎集合
     *
     * @type {IAppViewEngine[]}
     * 来源  getPSAppViewEngines
     */
    appViewEngines?: IAppViewEngine[];
    /**
     * 视图逻辑集合
     *
     * @type {IAppViewLogic[]}
     * 来源  getPSAppViewLogics
     */
    appViewLogics?: IAppViewLogic[];
    /**
     * 应用视图消息组
     *
     * @type {string}
     * 来源  getPSAppViewMsgGroup
     */
    appViewMsgGroupId?: string;
    /**
     * 视图导航上下文集合
     *
     * @type {IAppViewNavContext[]}
     * 来源  getPSAppViewNavContexts
     */
    appViewNavContexts?: IAppViewNavContext[];
    /**
     * 视图导航参数集合
     *
     * @type {IAppViewNavParam[]}
     * 来源  getPSAppViewNavParams
     */
    appViewNavParams?: IAppViewNavParam[];
    /**
     * 视图参数集合
     *
     * @type {IAppViewParam[]}
     * 来源  getPSAppViewParams
     */
    appViewParams?: IAppViewParam[];
    /**
     * 视图对象引用
     *
     * @type {IAppViewRef[]}
     * 来源  getPSAppViewRefs
     */
    appViewRefs?: IAppViewRef[];
    /**
     * 根部件集合
     *
     * @type {IControl[]}
     * 来源  getPSControls
     */
    controls?: IControl[];
    /**
     * 界面样式表对象
     *
     * @type {ISysCss}
     * 来源  getPSSysCss
     */
    sysCss?: ISysCss;
    /**
     * 图标对象
     *
     * @type {ISysImage}
     * 来源  getPSSysImage
     */
    sysImage?: ISysImage;
    /**
     * 前端应用插件
     *
     * @type {string}
     * 来源  getPSSysPFPlugin
     */
    sysPFPluginId?: string;
    /**
     * 视图布局面板
     *
     * @type {IViewLayoutPanel}
     * 来源  getPSViewLayoutPanel
     */
    viewLayoutPanel?: IViewLayoutPanel;
    /**
     * 视图优先级
     * @description 值模式 [应用视图优先权] {-1：未定义、 10：一级、 20：二级、 30：三级、 40：四级、 50：五级、 60：六级、 70：七级、 80：八级、 90：九级、 100：十级 }
     * @type {( number | -1 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100)}
     * @default -1
     * 来源  getPriority
     */
    priority?: number | -1 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
    /**
     * 子标题语言资源
     *
     * @type {ILanguageRes}
     * 来源  getSubCapPSLanguageRes
     */
    subCapLanguageRes?: ILanguageRes;
    /**
     * 视图子标题
     * @type {string}
     * 来源  getSubCaption
     */
    subCaption?: string;
    /**
     * 视图抬头
     * @type {string}
     * 来源  getTitle
     */
    title?: string;
    /**
     * 抬头语言资源
     *
     * @type {ILanguageRes}
     * 来源  getTitlePSLanguageRes
     */
    titleLanguageRes?: ILanguageRes;
    /**
     * 视图样式
     * @description 值模式 [应用界面模式] {DEFAULT：默认、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4、 STYLE5：样式5、 STYLE6：样式6、 STYLE7：样式7、 STYLE8：样式8、 STYLE9：样式9、 STYLE10：样式10、 PREVIEW：预览样式 }
     * @type {( string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4' | 'STYLE5' | 'STYLE6' | 'STYLE7' | 'STYLE8' | 'STYLE9' | 'STYLE10' | 'PREVIEW')}
     * 来源  getViewStyle
     */
    viewStyle?: string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4' | 'STYLE5' | 'STYLE6' | 'STYLE7' | 'STYLE8' | 'STYLE9' | 'STYLE10' | 'PREVIEW';
    /**
     * 视图类型
     * @description 值模式 [视图类型] {APPDATAUPLOADVIEW：应用数据导入视图、 APPERRORVIEW：应用错误显示视图、 APPFILEUPLOADVIEW：应用文件上传视图、 APPFUNCPICKUPVIEW：应用功能选择视图、 APPINDEXVIEW：应用首页视图、 APPLOGINVIEW：应用登录视图、 APPLOGOUTVIEW：应用注销视图、 APPPANELVIEW：应用面板视图、 APPPICUPLOADVIEW：应用图片上传视图、 APPPORTALVIEW：应用看板视图、 APPREDIRECTVIEW：应用全局数据重定向视图、 APPSTARTVIEW：应用启动视图、 APPWELCOMEVIEW：应用欢迎视图、 APPWFADDSTEPAFTERVIEW：应用流程后加签操作视图、 APPWFADDSTEPBEFOREVIEW：应用流程前加签操作视图、 APPWFREDIRECTVIEW：应用全局流程工作重定向视图、 APPWFSENDBACKVIEW：应用流程回退操作视图、 APPWFSTEPACTORVIEW：应用流程当前处理人视图、 APPWFSTEPDATAVIEW：应用流程处理记录视图、 APPWFSTEPTRACEVIEW：应用流程跟踪视图、 APPWFSUPPLYINFOVIEW：应用流程补充信息操作视图、 APPWFTAKEADVICEVIEW：应用流程征求意见操作视图、 DECALENDAREXPVIEW：实体日历导航视图、 DECALENDARVIEW：实体日历视图、 DECALENDARVIEW9：实体日历视图（部件视图）、 DECHARTEXPVIEW：实体图表导航视图、 DECHARTVIEW：实体图表视图、 DECHARTVIEW9：实体图表视图（部件视图）、 DECUSTOMVIEW：实体自定义视图、 DEDATAVIEW：实体数据视图、 DEDATAVIEW9：实体数据视图（部件视图）、 DEDATAVIEWEXPVIEW：实体卡片视图导航视图、 DEEDITVIEW：实体编辑视图、 DEEDITVIEW2：实体编辑视图（左右关系）、 DEEDITVIEW3：实体编辑视图（分页关系）、 DEEDITVIEW4：实体编辑视图（上下关系）、 DEEDITVIEW9：实体编辑视图（部件视图）、 DEFORMPICKUPDATAVIEW：实体表单选择数据视图（部件视图）、 DEGANTTEXPVIEW：实体甘特图导航视图、 DEGANTTVIEW：实体甘特视图、 DEGANTTVIEW9：实体甘特视图（部件视图）、 DEGRIDEXPVIEW：实体表格导航视图、 DEGRIDVIEW：实体表格视图、 DEGRIDVIEW2：实体表格视图（左右关系）、 DEGRIDVIEW4：实体表格视图（上下关系）、 DEGRIDVIEW8：实体关系数据表格视图（嵌入）、 DEGRIDVIEW9：实体表格视图（部件视图）、 DEHTMLVIEW：实体HTML视图、 DEINDEXPICKUPDATAVIEW：实体索引关系选择数据视图（部件视图）、 DEINDEXVIEW：实体首页视图、 DEKANBANVIEW：实体看板视图、 DEKANBANVIEW9：实体看板视图（部件视图）、 DELISTEXPVIEW：实体列表导航视图、 DELISTVIEW：实体列表视图、 DELISTVIEW9：实体列表视图（部件视图）、 DEMAPEXPVIEW：实体地图导航视图、 DEMAPVIEW：实体地图视图、 DEMAPVIEW9：实体地图视图（部件视图）、 DEMDCUSTOMVIEW：实体多数据自定义视图、 DEMEDITVIEW9：实体多表单编辑视图（部件视图）、 DEMOBCALENDAREXPVIEW：实体移动端日历导航视图、 DEMOBCALENDARVIEW：实体移动端日历视图、 DEMOBCALENDARVIEW9：实体移动端日历视图（部件视图）、 DEMOBCHARTEXPVIEW：实体移动端图表导航视图、 DEMOBCHARTVIEW：实体移动端图表视图、 DEMOBCHARTVIEW9：实体移动端图表视图（部件视图）、 DEMOBCUSTOMVIEW：实体移动端自定义视图、 DEMOBDATAVIEW：实体移动端卡片视图、 DEMOBDATAVIEWEXPVIEW：实体移动端卡片视图导航视图、 DEMOBEDITVIEW：实体移动端编辑视图、 DEMOBEDITVIEW3：实体移动端编辑视图（分页关系）、 DEMOBEDITVIEW9：实体移动端编辑视图（部件视图）、 DEMOBFORMPICKUPMDVIEW：实体移动端表单类型选择多数据视图（部件视图）、 DEMOBGANTTEXPVIEW：实体移动端甘特图导航视图、 DEMOBGANTTVIEW：实体移动端甘特视图、 DEMOBGANTTVIEW9：实体移动端甘特视图（部件视图）、 DEMOBHTMLVIEW：实体移动端HTML视图、 DEMOBINDEXPICKUPMDVIEW：实体移动端索引类型选择多数据视图（部件视图）、 DEMOBLISTEXPVIEW：实体移动端列表导航视图、 DEMOBLISTVIEW：实体移动端列表视图、 DEMOBMAPEXPVIEW：实体移动端地图导航视图、 DEMOBMAPVIEW：实体移动端地图视图、 DEMOBMAPVIEW9：实体移动端地图视图（部件视图）、 DEMOBMDVIEW：实体移动端多数据视图、 DEMOBMDVIEW9：实体移动端多数据视图（部件视图）、 DEMOBMEDITVIEW9：实体移动端多表单编辑视图（部件视图）、 DEMOBMPICKUPVIEW：实体移动端多数据选择视图、 DEMOBOPTVIEW：实体移动端选项操作视图、 DEMOBPANELVIEW：实体移动端面板视图、 DEMOBPANELVIEW9：实体移动端面板视图（部件视图）、 DEMOBPICKUPLISTVIEW：实体移动端选择列表视图（部件视图）、 DEMOBPICKUPMDVIEW：实体移动端选择多数据视图（部件视图）、 DEMOBPICKUPTREEVIEW：实体移动端选择树视图（部件视图）、 DEMOBPICKUPVIEW：实体移动端数据选择视图、 DEMOBPORTALVIEW：实体移动端数据看板视图、 DEMOBPORTALVIEW9：实体移动端数据看板视图（部件视图）、 DEMOBREDIRECTVIEW：实体移动端数据重定向视图、 DEMOBREPORTVIEW：实体移动端报表视图、 DEMOBTABEXPVIEW：实体移动端分页导航视图、 DEMOBTABEXPVIEW9：实体移动端分页导航视图（部件视图）、 DEMOBTABSEARCHVIEW：实体移动端分页搜索视图、 DEMOBTABSEARCHVIEW9：实体移动端分页搜索视图（部件视图）、 DEMOBTREEEXPVIEW：实体移动端树导航视图、 DEMOBTREEEXPVIEW9：实体移动端树导航视图（部件视图）、 DEMOBTREEVIEW：实体移动端树视图、 DEMOBWFACTIONVIEW：实体移动端工作流操作视图、 DEMOBWFDATAREDIRECTVIEW：移动端实体全局流程数据重定向视图、 DEMOBWFDYNAACTIONVIEW：实体移动端工作流动态操作视图、 DEMOBWFDYNAEDITVIEW：实体移动端工作流动态编辑视图、 DEMOBWFDYNAEDITVIEW3：实体移动端工作流动态编辑视图（分页关系）、 DEMOBWFDYNAEXPMDVIEW：实体移动端工作流动态导航多数据视图、 DEMOBWFDYNASTARTVIEW：实体移动端工作流动态启动视图、 DEMOBWFEDITVIEW：实体移动端工作流编辑视图、 DEMOBWFEDITVIEW3：实体移动端工作流编辑视图（分页关系）、 DEMOBWFMDVIEW：实体移动端工作流多数据视图、 DEMOBWFPROXYRESULTVIEW：实体移动端工作流代理应用结果视图、 DEMOBWFPROXYSTARTVIEW：实体移动端工作流代理应用启动视图、 DEMOBWFSTARTVIEW：实体移动端工作流启动视图、 DEMOBWIZARDVIEW：实体移动端向导视图、 DEMPICKUPVIEW：实体数据多项选择视图、 DEMPICKUPVIEW2：实体多项数据选择视图（左右关系）、 DEOPTVIEW：实体选项操作视图、 DEPANELVIEW：实体面板视图、 DEPANELVIEW9：实体面板视图（部件视图）、 DEPICKUPDATAVIEW：实体选择数据视图（部件视图）、 DEPICKUPGRIDVIEW：实体选择表格视图（部件视图）、 DEPICKUPTREEVIEW：实体选择树视图（部件视图）、 DEPICKUPVIEW：实体数据选择视图、 DEPICKUPVIEW2：实体数据选择视图（左右关系）、 DEPICKUPVIEW3：实体数据选择视图（分页关系）、 DEPORTALVIEW：实体数据看板视图、 DEPORTALVIEW9：实体数据看板视图（部件视图）、 DEREDIRECTVIEW：实体数据重定向视图、 DEREPORTVIEW：实体报表视图、 DETABEXPVIEW：实体分页导航视图、 DETABEXPVIEW9：实体分页导航视图（部件视图）、 DETABSEARCHVIEW：实体分页搜索视图、 DETABSEARCHVIEW9：实体分页搜索视图（部件视图）、 DETREEEXPVIEW：实体树导航视图、 DETREEEXPVIEW2：实体树导航视图（IFrame）、 DETREEEXPVIEW3：实体树导航视图（菜单模式）、 DETREEGRIDEXVIEW：实体树表格视图（增强）、 DETREEGRIDEXVIEW9：实体树表格视图（增强）（部件视图）、 DETREEGRIDVIEW：实体树表格视图、 DETREEGRIDVIEW9：实体树表格视图（部件视图）、 DETREEVIEW：实体树视图、 DETREEVIEW9：实体树视图（部件视图）、 DEWFACTIONVIEW：实体工作流操作视图、 DEWFDATAREDIRECTVIEW：实体全局流程数据重定向视图、 DEWFDYNAACTIONVIEW：实体工作流动态操作视图、 DEWFDYNAEDITVIEW：实体工作流动态编辑视图、 DEWFDYNAEDITVIEW3：实体工作流动态视图（分页关系）、 DEWFDYNAEXPGRIDVIEW：实体工作流动态导航表格视图、 DEWFDYNASTARTVIEW：实体工作流动态启动视图、 DEWFEDITPROXYDATAVIEW：实体工作流编辑代理数据视图、 DEWFEDITVIEW：实体工作流编辑视图、 DEWFEDITVIEW2：实体工作流编辑视图（左右关系）、 DEWFEDITVIEW3：实体工作流视图（分页关系）、 DEWFEDITVIEW9：实体工作流视图（嵌入视图）、 DEWFEXPVIEW：实体工作流导航视图、 DEWFGRIDVIEW：实体工作流表格视图、 DEWFPROXYDATAVIEW：实体工作流代理数据视图、 DEWFPROXYRESULTVIEW：实体工作流代理应用结果视图、 DEWFPROXYSTARTVIEW：实体工作流代理应用启动视图、 DEWFSTARTVIEW：实体工作流启动视图、 DEWIZARDVIEW：实体向导视图、 DESUBAPPREFVIEW：实体子应用引用视图 }
     * @type {( string | 'APPDATAUPLOADVIEW' | 'APPERRORVIEW' | 'APPFILEUPLOADVIEW' | 'APPFUNCPICKUPVIEW' | 'APPINDEXVIEW' | 'APPLOGINVIEW' | 'APPLOGOUTVIEW' | 'APPPANELVIEW' | 'APPPICUPLOADVIEW' | 'APPPORTALVIEW' | 'APPREDIRECTVIEW' | 'APPSTARTVIEW' | 'APPWELCOMEVIEW' | 'APPWFADDSTEPAFTERVIEW' | 'APPWFADDSTEPBEFOREVIEW' | 'APPWFREDIRECTVIEW' | 'APPWFSENDBACKVIEW' | 'APPWFSTEPACTORVIEW' | 'APPWFSTEPDATAVIEW' | 'APPWFSTEPTRACEVIEW' | 'APPWFSUPPLYINFOVIEW' | 'APPWFTAKEADVICEVIEW' | 'DECALENDAREXPVIEW' | 'DECALENDARVIEW' | 'DECALENDARVIEW9' | 'DECHARTEXPVIEW' | 'DECHARTVIEW' | 'DECHARTVIEW9' | 'DECUSTOMVIEW' | 'DEDATAVIEW' | 'DEDATAVIEW9' | 'DEDATAVIEWEXPVIEW' | 'DEEDITVIEW' | 'DEEDITVIEW2' | 'DEEDITVIEW3' | 'DEEDITVIEW4' | 'DEEDITVIEW9' | 'DEFORMPICKUPDATAVIEW' | 'DEGANTTEXPVIEW' | 'DEGANTTVIEW' | 'DEGANTTVIEW9' | 'DEGRIDEXPVIEW' | 'DEGRIDVIEW' | 'DEGRIDVIEW2' | 'DEGRIDVIEW4' | 'DEGRIDVIEW8' | 'DEGRIDVIEW9' | 'DEHTMLVIEW' | 'DEINDEXPICKUPDATAVIEW' | 'DEINDEXVIEW' | 'DEKANBANVIEW' | 'DEKANBANVIEW9' | 'DELISTEXPVIEW' | 'DELISTVIEW' | 'DELISTVIEW9' | 'DEMAPEXPVIEW' | 'DEMAPVIEW' | 'DEMAPVIEW9' | 'DEMDCUSTOMVIEW' | 'DEMEDITVIEW9' | 'DEMOBCALENDAREXPVIEW' | 'DEMOBCALENDARVIEW' | 'DEMOBCALENDARVIEW9' | 'DEMOBCHARTEXPVIEW' | 'DEMOBCHARTVIEW' | 'DEMOBCHARTVIEW9' | 'DEMOBCUSTOMVIEW' | 'DEMOBDATAVIEW' | 'DEMOBDATAVIEWEXPVIEW' | 'DEMOBEDITVIEW' | 'DEMOBEDITVIEW3' | 'DEMOBEDITVIEW9' | 'DEMOBFORMPICKUPMDVIEW' | 'DEMOBGANTTEXPVIEW' | 'DEMOBGANTTVIEW' | 'DEMOBGANTTVIEW9' | 'DEMOBHTMLVIEW' | 'DEMOBINDEXPICKUPMDVIEW' | 'DEMOBLISTEXPVIEW' | 'DEMOBLISTVIEW' | 'DEMOBMAPEXPVIEW' | 'DEMOBMAPVIEW' | 'DEMOBMAPVIEW9' | 'DEMOBMDVIEW' | 'DEMOBMDVIEW9' | 'DEMOBMEDITVIEW9' | 'DEMOBMPICKUPVIEW' | 'DEMOBOPTVIEW' | 'DEMOBPANELVIEW' | 'DEMOBPANELVIEW9' | 'DEMOBPICKUPLISTVIEW' | 'DEMOBPICKUPMDVIEW' | 'DEMOBPICKUPTREEVIEW' | 'DEMOBPICKUPVIEW' | 'DEMOBPORTALVIEW' | 'DEMOBPORTALVIEW9' | 'DEMOBREDIRECTVIEW' | 'DEMOBREPORTVIEW' | 'DEMOBTABEXPVIEW' | 'DEMOBTABEXPVIEW9' | 'DEMOBTABSEARCHVIEW' | 'DEMOBTABSEARCHVIEW9' | 'DEMOBTREEEXPVIEW' | 'DEMOBTREEEXPVIEW9' | 'DEMOBTREEVIEW' | 'DEMOBWFACTIONVIEW' | 'DEMOBWFDATAREDIRECTVIEW' | 'DEMOBWFDYNAACTIONVIEW' | 'DEMOBWFDYNAEDITVIEW' | 'DEMOBWFDYNAEDITVIEW3' | 'DEMOBWFDYNAEXPMDVIEW' | 'DEMOBWFDYNASTARTVIEW' | 'DEMOBWFEDITVIEW' | 'DEMOBWFEDITVIEW3' | 'DEMOBWFMDVIEW' | 'DEMOBWFPROXYRESULTVIEW' | 'DEMOBWFPROXYSTARTVIEW' | 'DEMOBWFSTARTVIEW' | 'DEMOBWIZARDVIEW' | 'DEMPICKUPVIEW' | 'DEMPICKUPVIEW2' | 'DEOPTVIEW' | 'DEPANELVIEW' | 'DEPANELVIEW9' | 'DEPICKUPDATAVIEW' | 'DEPICKUPGRIDVIEW' | 'DEPICKUPTREEVIEW' | 'DEPICKUPVIEW' | 'DEPICKUPVIEW2' | 'DEPICKUPVIEW3' | 'DEPORTALVIEW' | 'DEPORTALVIEW9' | 'DEREDIRECTVIEW' | 'DEREPORTVIEW' | 'DETABEXPVIEW' | 'DETABEXPVIEW9' | 'DETABSEARCHVIEW' | 'DETABSEARCHVIEW9' | 'DETREEEXPVIEW' | 'DETREEEXPVIEW2' | 'DETREEEXPVIEW3' | 'DETREEGRIDEXVIEW' | 'DETREEGRIDEXVIEW9' | 'DETREEGRIDVIEW' | 'DETREEGRIDVIEW9' | 'DETREEVIEW' | 'DETREEVIEW9' | 'DEWFACTIONVIEW' | 'DEWFDATAREDIRECTVIEW' | 'DEWFDYNAACTIONVIEW' | 'DEWFDYNAEDITVIEW' | 'DEWFDYNAEDITVIEW3' | 'DEWFDYNAEXPGRIDVIEW' | 'DEWFDYNASTARTVIEW' | 'DEWFEDITPROXYDATAVIEW' | 'DEWFEDITVIEW' | 'DEWFEDITVIEW2' | 'DEWFEDITVIEW3' | 'DEWFEDITVIEW9' | 'DEWFEXPVIEW' | 'DEWFGRIDVIEW' | 'DEWFPROXYDATAVIEW' | 'DEWFPROXYRESULTVIEW' | 'DEWFPROXYSTARTVIEW' | 'DEWFSTARTVIEW' | 'DEWIZARDVIEW' | 'DESUBAPPREFVIEW')}
     * 来源  getViewType
     */
    viewType?: string | 'APPDATAUPLOADVIEW' | 'APPERRORVIEW' | 'APPFILEUPLOADVIEW' | 'APPFUNCPICKUPVIEW' | 'APPINDEXVIEW' | 'APPLOGINVIEW' | 'APPLOGOUTVIEW' | 'APPPANELVIEW' | 'APPPICUPLOADVIEW' | 'APPPORTALVIEW' | 'APPREDIRECTVIEW' | 'APPSTARTVIEW' | 'APPWELCOMEVIEW' | 'APPWFADDSTEPAFTERVIEW' | 'APPWFADDSTEPBEFOREVIEW' | 'APPWFREDIRECTVIEW' | 'APPWFSENDBACKVIEW' | 'APPWFSTEPACTORVIEW' | 'APPWFSTEPDATAVIEW' | 'APPWFSTEPTRACEVIEW' | 'APPWFSUPPLYINFOVIEW' | 'APPWFTAKEADVICEVIEW' | 'DECALENDAREXPVIEW' | 'DECALENDARVIEW' | 'DECALENDARVIEW9' | 'DECHARTEXPVIEW' | 'DECHARTVIEW' | 'DECHARTVIEW9' | 'DECUSTOMVIEW' | 'DEDATAVIEW' | 'DEDATAVIEW9' | 'DEDATAVIEWEXPVIEW' | 'DEEDITVIEW' | 'DEEDITVIEW2' | 'DEEDITVIEW3' | 'DEEDITVIEW4' | 'DEEDITVIEW9' | 'DEFORMPICKUPDATAVIEW' | 'DEGANTTEXPVIEW' | 'DEGANTTVIEW' | 'DEGANTTVIEW9' | 'DEGRIDEXPVIEW' | 'DEGRIDVIEW' | 'DEGRIDVIEW2' | 'DEGRIDVIEW4' | 'DEGRIDVIEW8' | 'DEGRIDVIEW9' | 'DEHTMLVIEW' | 'DEINDEXPICKUPDATAVIEW' | 'DEINDEXVIEW' | 'DEKANBANVIEW' | 'DEKANBANVIEW9' | 'DELISTEXPVIEW' | 'DELISTVIEW' | 'DELISTVIEW9' | 'DEMAPEXPVIEW' | 'DEMAPVIEW' | 'DEMAPVIEW9' | 'DEMDCUSTOMVIEW' | 'DEMEDITVIEW9' | 'DEMOBCALENDAREXPVIEW' | 'DEMOBCALENDARVIEW' | 'DEMOBCALENDARVIEW9' | 'DEMOBCHARTEXPVIEW' | 'DEMOBCHARTVIEW' | 'DEMOBCHARTVIEW9' | 'DEMOBCUSTOMVIEW' | 'DEMOBDATAVIEW' | 'DEMOBDATAVIEWEXPVIEW' | 'DEMOBEDITVIEW' | 'DEMOBEDITVIEW3' | 'DEMOBEDITVIEW9' | 'DEMOBFORMPICKUPMDVIEW' | 'DEMOBGANTTEXPVIEW' | 'DEMOBGANTTVIEW' | 'DEMOBGANTTVIEW9' | 'DEMOBHTMLVIEW' | 'DEMOBINDEXPICKUPMDVIEW' | 'DEMOBLISTEXPVIEW' | 'DEMOBLISTVIEW' | 'DEMOBMAPEXPVIEW' | 'DEMOBMAPVIEW' | 'DEMOBMAPVIEW9' | 'DEMOBMDVIEW' | 'DEMOBMDVIEW9' | 'DEMOBMEDITVIEW9' | 'DEMOBMPICKUPVIEW' | 'DEMOBOPTVIEW' | 'DEMOBPANELVIEW' | 'DEMOBPANELVIEW9' | 'DEMOBPICKUPLISTVIEW' | 'DEMOBPICKUPMDVIEW' | 'DEMOBPICKUPTREEVIEW' | 'DEMOBPICKUPVIEW' | 'DEMOBPORTALVIEW' | 'DEMOBPORTALVIEW9' | 'DEMOBREDIRECTVIEW' | 'DEMOBREPORTVIEW' | 'DEMOBTABEXPVIEW' | 'DEMOBTABEXPVIEW9' | 'DEMOBTABSEARCHVIEW' | 'DEMOBTABSEARCHVIEW9' | 'DEMOBTREEEXPVIEW' | 'DEMOBTREEEXPVIEW9' | 'DEMOBTREEVIEW' | 'DEMOBWFACTIONVIEW' | 'DEMOBWFDATAREDIRECTVIEW' | 'DEMOBWFDYNAACTIONVIEW' | 'DEMOBWFDYNAEDITVIEW' | 'DEMOBWFDYNAEDITVIEW3' | 'DEMOBWFDYNAEXPMDVIEW' | 'DEMOBWFDYNASTARTVIEW' | 'DEMOBWFEDITVIEW' | 'DEMOBWFEDITVIEW3' | 'DEMOBWFMDVIEW' | 'DEMOBWFPROXYRESULTVIEW' | 'DEMOBWFPROXYSTARTVIEW' | 'DEMOBWFSTARTVIEW' | 'DEMOBWIZARDVIEW' | 'DEMPICKUPVIEW' | 'DEMPICKUPVIEW2' | 'DEOPTVIEW' | 'DEPANELVIEW' | 'DEPANELVIEW9' | 'DEPICKUPDATAVIEW' | 'DEPICKUPGRIDVIEW' | 'DEPICKUPTREEVIEW' | 'DEPICKUPVIEW' | 'DEPICKUPVIEW2' | 'DEPICKUPVIEW3' | 'DEPORTALVIEW' | 'DEPORTALVIEW9' | 'DEREDIRECTVIEW' | 'DEREPORTVIEW' | 'DETABEXPVIEW' | 'DETABEXPVIEW9' | 'DETABSEARCHVIEW' | 'DETABSEARCHVIEW9' | 'DETREEEXPVIEW' | 'DETREEEXPVIEW2' | 'DETREEEXPVIEW3' | 'DETREEGRIDEXVIEW' | 'DETREEGRIDEXVIEW9' | 'DETREEGRIDVIEW' | 'DETREEGRIDVIEW9' | 'DETREEVIEW' | 'DETREEVIEW9' | 'DEWFACTIONVIEW' | 'DEWFDATAREDIRECTVIEW' | 'DEWFDYNAACTIONVIEW' | 'DEWFDYNAEDITVIEW' | 'DEWFDYNAEDITVIEW3' | 'DEWFDYNAEXPGRIDVIEW' | 'DEWFDYNASTARTVIEW' | 'DEWFEDITPROXYDATAVIEW' | 'DEWFEDITVIEW' | 'DEWFEDITVIEW2' | 'DEWFEDITVIEW3' | 'DEWFEDITVIEW9' | 'DEWFEXPVIEW' | 'DEWFGRIDVIEW' | 'DEWFPROXYDATAVIEW' | 'DEWFPROXYRESULTVIEW' | 'DEWFPROXYSTARTVIEW' | 'DEWFSTARTVIEW' | 'DEWIZARDVIEW' | 'DESUBAPPREFVIEW';
    /**
     * 视图宽度
     * @type {number}
     * @default 0
     * 来源  getWidth
     */
    width?: number;
    /**
     * 启用数据权限
     * @type {boolean}
     * 来源  isEnableDP
     */
    enableDP?: boolean;
    /**
     * 支持工作流
     * @type {boolean}
     * @default false
     * 来源  isEnableWF
     */
    enableWF?: boolean;
    /**
     * 数据选择视图
     * @type {boolean}
     * @default false
     * 来源  isPickupMode
     */
    pickupMode?: boolean;
    /**
     * 重定向视图
     * @type {boolean}
     * @default false
     * 来源  isRedirectView
     */
    redirectView?: boolean;
    /**
     * 显示标题栏
     * @type {boolean}
     * @default true
     * 来源  isShowCaptionBar
     */
    showCaptionBar?: boolean;
}
