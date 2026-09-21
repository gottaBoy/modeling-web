import { IModelObject } from '../imodel-object';

/**
 *
 * 界面行为组成员模型基础对象接口
 * @export
 * @interface IUIActionGroupDetail
 */
export interface IUIActionGroupDetail extends IModelObject {
  /**
   * 行为级别
   * @description 值模式 [界面行为行为级别] {50：不常用、 100：一般操作、 200：常用操作、 250：关键操作 }
   * @type {( number | 50 | 100 | 200 | 250)}
   * @default 100
   * 来源  getActionLevel
   */
  actionLevel?: number | 50 | 100 | 200 | 250;

  /**
   * 按钮样式
   * @description 值模式 [按钮样式] {DEFAULT：默认、 INVERSE：反向、 PRIMARY：主要、 INFO：信息、 SUCCESS：成功、 WARNING：警告、 DANGER：危险、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
   * @type {( string | 'DEFAULT' | 'INVERSE' | 'PRIMARY' | 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
   * @default DEFAULT
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
   * 成员标记
   * @type {string}
   * 来源  getDetailTag
   */
  detailTag?: string;

  /**
   * 成员标记2
   * @type {string}
   * 来源  getDetailTag2
   */
  detailTag2?: string;

  /**
   * 启用判断脚本代码
   * @type {string}
   * 来源  getEnableScriptCode
   */
  enableScriptCode?: string;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 界面行为对象
   *
   * @type {string}
   * 来源  getPSUIAction
   */
  uiactionId?: string;

  /**
   * 提示信息
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 界面行为附加参数
   * @type {IModel}
   * 来源  getUIActionParamJO
   */
  uiactionParamJO?: IModel;

  /**
   * 可见判断脚本代码
   * @type {string}
   * 来源  getVisibleScriptCode
   */
  visibleScriptCode?: string;

  /**
   * 添加分隔栏
   * @type {boolean}
   * 来源  isAddSeparator
   */
  addSeparator?: boolean;

  /**
   * 显示标题
   * @type {boolean}
   * 来源  isShowCaption
   */
  showCaption?: boolean;

  /**
   * 显示图标
   * @type {boolean}
   * 来源  isShowIcon
   */
  showIcon?: boolean;
}
