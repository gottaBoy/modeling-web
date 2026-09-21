import { INavigateParamContainer } from '../control/inavigate-param-container';
import { ILanguageRes } from '../res/ilanguage-res';
import { ISysImage } from '../res/isys-image';

/**
 *
 * 界面行为模型基础对象接口
 * @export
 * @interface IUIAction
 */
export interface IUIAction extends INavigateParamContainer {
  /**
   * 行为级别
   * @description 值模式 [界面行为行为级别] {50：不常用、 100：一般操作、 200：常用操作、 250：关键操作 }
   * @type {( number | 50 | 100 | 200 | 250)}
   * @default 100
   * 来源  getActionLevel
   */
  actionLevel?: number | 50 | 100 | 200 | 250;

  /**
   * 行为操作目标
   * @description 值模式 [界面行为操作目标] {SINGLEDATA：单项数据、 SINGLEKEY：单项数据（主键）、 MULTIDATA：多项数据、 MULTIKEY：多项数据（主键）、 NONE：无数据 }
   * @type {( string | 'SINGLEDATA' | 'SINGLEKEY' | 'MULTIDATA' | 'MULTIKEY' | 'NONE')}
   * 来源  getActionTarget
   */
  actionTarget?:
    | string
    | 'SINGLEDATA'
    | 'SINGLEKEY'
    | 'MULTIDATA'
    | 'MULTIKEY'
    | 'NONE';

  /**
   * 按钮样式
   * @description 值模式 [按钮样式] {DEFAULT：默认、 INVERSE：反向、 PRIMARY：主要、 INFO：信息、 SUCCESS：成功、 WARNING：警告、 DANGER：危险、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
   * @type {( string | 'DEFAULT' | 'INVERSE' | 'PRIMARY' | 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
   * 来源  getButtonStyle
   */
  buttonStyle?:
    | string
    | 'DEFAULT'
    | 'INVERSE'
    | 'PRIMARY'
    | 'INFO'
    | 'SUCCESS'
    | 'WARNING'
    | 'DANGER'
    | 'STYLE2'
    | 'STYLE3'
    | 'STYLE4';

  /**
   * 确认信息语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCMPSLanguageRes
   */
  cmlanguageRes?: ILanguageRes;

  /**
   * 标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCapPSLanguageRes
   */
  capLanguageRes?: ILanguageRes;

  /**
   * 标题
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
   * 操作确认信息
   * @type {string}
   * 来源  getConfirmMsg
   */
  confirmMsg?: string;

  /**
   * 计数项标识
   * @type {string}
   * 来源  getCounterId
   */
  counterId?: string;

  /**
   * 数据访问权限
   * @type {string}
   * 来源  getDataAccessAction
   */
  dataAccessAction?: string;

  /**
   * 弹窗关闭结果
   * @description 值模式 [界面行为对话框结果] {OK：确定、 CANCEL：取消、 YES：是、 NO：否 }
   * @type {( string | 'OK' | 'CANCEL' | 'YES' | 'NO')}
   * 来源  getDialogResult
   */
  dialogResult?: string | 'OK' | 'CANCEL' | 'YES' | 'NO';

  /**
   * 前端应用视图
   *
   * @type {string}
   * 来源  getFrontPSAppView
   */
  frontAppViewId?: string;

  /**
   * 前台处理类型
   * @description 值模式 [界面行为前台处理类型] {WIZARD：打开视图或向导（模态）、 TOP：打开顶级视图、 PRINT：打开打印视图、 DATAIMP：打开数据导入视图、 DATAEXP：打开数据导出视图、 CHAT：打开聊天界面、 OPENHTMLPAGE：打开HTML页面、 EDITFORM：打开编辑表单、 QUICKEDIT：打开快捷编辑、 OTHER：用户自定义 }
   * @type {( string | 'WIZARD' | 'TOP' | 'PRINT' | 'DATAIMP' | 'DATAEXP' | 'CHAT' | 'OPENHTMLPAGE' | 'EDITFORM' | 'QUICKEDIT' | 'OTHER')}
   * 来源  getFrontProcessType
   */
  frontProcessType?:
    | string
    | 'WIZARD'
    | 'TOP'
    | 'PRINT'
    | 'DATAIMP'
    | 'DATAEXP'
    | 'CHAT'
    | 'OPENHTMLPAGE'
    | 'EDITFORM'
    | 'QUICKEDIT'
    | 'OTHER';

  /**
   * 完全代码标识
   * @type {string}
   * 来源  getFullCodeName
   */
  fullCodeName?: string;

  /**
   * Html页面路径
   * @type {string}
   * 来源  getHtmlPageUrl
   */
  htmlPageUrl?: string;

  /**
   * 下一步界面行为
   *
   * @type {string}
   * 来源  getNextPSUIAction
   */
  nextId?: string;

  /**
   * 界面行为图标对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 参数项名称
   * @type {string}
   * 来源  getParamItem
   */
  paramItem?: string;

  /**
   * 预置行为类型
   * @type {string}
   * 来源  getPredefinedType
   */
  predefinedType?: string;

  /**
   * 刷新引用视图模式
   * @description 值模式 [界面行为重新加载数据模式] {0：无、 1：引用视图或树节点、 2：引用树节点父节点、 3：引用树节点根节点 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * @default 0
   * 来源  getRefreshMode
   */
  refreshMode?: number | 0 | 1 | 2 | 3;

  /**
   * 成功信息语言资源
   *
   * @type {ILanguageRes}
   * 来源  getSMPSLanguageRes
   */
  smlanguageRes?: ILanguageRes;

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 操作成功提示信息
   * @type {string}
   * 来源  getSuccessMsg
   */
  successMsg?: string;

  /**
   * 文本项名称
   * @type {string}
   * 来源  getTextItem
   */
  textItem?: string;

  /**
   * 操作超时时长（毫秒）
   * @type {number}
   * 来源  getTimeout
   */
  timeout?: number;

  /**
   * 操作提示信息
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 操作提示语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTooltipPSLanguageRes
   */
  tooltipLanguageRes?: ILanguageRes;

  /**
   * 界面行为模式
   * @description 值模式 [界面行为类型] {SYS：系统预定义、 FRONT：前台调用、 BACKEND：后台调用、 WFFRONT：工作流前台调用、 WFBACKEND：工作流后台调用、 CUSTOM：自定义代码 }
   * @type {( string | 'SYS' | 'FRONT' | 'BACKEND' | 'WFFRONT' | 'WFBACKEND' | 'CUSTOM')}
   * 来源  getUIActionMode
   */
  uiactionMode?:
    | string
    | 'SYS'
    | 'FRONT'
    | 'BACKEND'
    | 'WFFRONT'
    | 'WFBACKEND'
    | 'CUSTOM';

  /**
   * 界面行为参数对象
   * @type {IModel}
   * 来源  getUIActionParamJO
   */
  uiactionParamJO?: IModel;

  /**
   * 界面行为标记
   * @type {string}
   * 来源  getUIActionTag
   */
  uiactionTag?: string;

  /**
   * 界面行为类型
   * @type {string}
   * 来源  getUIActionType
   */
  uiactionType?: string;

  /**
   * 界面逻辑附加类型
   * @description 值模式 [界面行为界面逻辑附加类型] {REPLACE：替换执行、 AFTER：执行之后 }
   * @type {( string | 'REPLACE' | 'AFTER')}
   * 来源  getUILogicAttachMode
   */
  uilogicAttachMode?: string | 'REPLACE' | 'AFTER';

  /**
   * 界面逻辑类型
   * @type {string}
   * 来源  getUILogicType
   */
  uilogicType?: string;

  /**
   * 值项名称
   * @type {string}
   * 来源  getValueItem
   */
  valueItem?: string;

  /**
   * 操作后关闭编辑视图
   * @type {boolean}
   * @default false
   * 来源  isCloseEditView
   */
  closeEditView?: boolean;

  /**
   * 启用用户操作确认
   * @type {boolean}
   * @default false
   * 来源  isEnableConfirm
   */
  enableConfirm?: boolean;

  /**
   * 启用按钮点击切换模式
   * @type {boolean}
   * 来源  isEnableToggleMode
   */
  enableToggleMode?: boolean;

  /**
   * 行为组
   * @type {boolean}
   * @default false
   * 来源  isGroup
   */
  group?: boolean;

  /**
   * 操作后刷新当前界面
   * @type {boolean}
   * @default false
   * 来源  isReloadData
   */
  reloadData?: boolean;

  /**
   * 显示处理提示
   * @type {boolean}
   * @default true
   * 来源  isShowBusyIndicator
   */
  showBusyIndicator?: boolean;
}
