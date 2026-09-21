import { IButtonBase } from '../ibutton-base';
import { IPanelItem } from './ipanel-item';
import { IUIAction } from '../../view/iuiaction';

/**
 *
 * 继承父接口类型值[BUTTON]
 * @export
 * @interface IPanelButton
 */
export interface IPanelButton extends IPanelItem, IButtonBase {
  /**
   * 按钮行为类型
   * @description 值模式 [面板按钮行为类型] {NONE：无处理、 UIACTION：界面行为、 UILOGIC：界面逻辑、 OPENVIEW：打开应用视图、 OPENDEVIEW：打开实体视图、 OPENSYSPDTVIEW：打开系统预置视图、 OPENHTMLPAGE：打开链接、 DATA_CREATEOBJECT：建立数据、 DATA_SAVECHANGES：保存变更、 DATA_CANCELCHANGES：取消变更、 DATA_REMOVEOBJECT：删除数据、 DATA_SYNCHRONIZE：同步数据、 VIEW_OKACTION：确定（视图）、 VIEW_CANCELACTION：取消（视图）、 VIEW_YESACTION：是（视图）、 VIEW_NOACTION：否（视图）、 UTIL_ADDSELECTION：添加选中数据（数据选择）、 UTIL_REMOVESELECTION：移除选中数据（数据选择）、 UTIL_ADDALL：添加全部数据（数据选择）、 UTIL_REMOVEALL：移除全部数据（数据选择）、 UTIL_PREVSTEP：上一步（向导）、 UTIL_NEXTSTEP：下一步（向导）、 UTIL_FINISH：完成（向导）、 UTIL_SEARCH：搜索（搜索栏）、 UTIL_RESET：重置（搜索栏）、 APP_LOGIN：登录操作、 APP_LOGOUT：登出操作、 CUSTOM：自定义代码 }
   * @type {( string | 'NONE' | 'UIACTION' | 'UILOGIC' | 'OPENVIEW' | 'OPENDEVIEW' | 'OPENSYSPDTVIEW' | 'OPENHTMLPAGE' | 'DATA_CREATEOBJECT' | 'DATA_SAVECHANGES' | 'DATA_CANCELCHANGES' | 'DATA_REMOVEOBJECT' | 'DATA_SYNCHRONIZE' | 'VIEW_OKACTION' | 'VIEW_CANCELACTION' | 'VIEW_YESACTION' | 'VIEW_NOACTION' | 'UTIL_ADDSELECTION' | 'UTIL_REMOVESELECTION' | 'UTIL_ADDALL' | 'UTIL_REMOVEALL' | 'UTIL_PREVSTEP' | 'UTIL_NEXTSTEP' | 'UTIL_FINISH' | 'UTIL_SEARCH' | 'UTIL_RESET' | 'APP_LOGIN' | 'APP_LOGOUT' | 'CUSTOM')}
   * 来源  getActionType
   */
  actionType?:
    | string
    | 'NONE'
    | 'UIACTION'
    | 'UILOGIC'
    | 'OPENVIEW'
    | 'OPENDEVIEW'
    | 'OPENSYSPDTVIEW'
    | 'OPENHTMLPAGE'
    | 'DATA_CREATEOBJECT'
    | 'DATA_SAVECHANGES'
    | 'DATA_CANCELCHANGES'
    | 'DATA_REMOVEOBJECT'
    | 'DATA_SYNCHRONIZE'
    | 'VIEW_OKACTION'
    | 'VIEW_CANCELACTION'
    | 'VIEW_YESACTION'
    | 'VIEW_NOACTION'
    | 'UTIL_ADDSELECTION'
    | 'UTIL_REMOVESELECTION'
    | 'UTIL_ADDALL'
    | 'UTIL_REMOVEALL'
    | 'UTIL_PREVSTEP'
    | 'UTIL_NEXTSTEP'
    | 'UTIL_FINISH'
    | 'UTIL_SEARCH'
    | 'UTIL_RESET'
    | 'APP_LOGIN'
    | 'APP_LOGOUT'
    | 'CUSTOM';

  /**
   * 动态标题绑定值项
   * @type {string}
   * 来源  getCaptionItemName
   */
  captionItemName?: string;

  /**
   * 界面行为（运行时内联）
   *
   * @type {IUIAction}
   * 来源  getInlinePSUIAction
   */
  inlineUIAction?: IUIAction;

  /**
   * 调用界面行为
   *
   * @type {string}
   * 来源  getPSUIAction
   */
  uiactionId?: string;

  /**
   * 操作提示信息
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 界面行为操作目标
   * @description 值模式 [云实体界面行为_操作数据范围] {SINGLEDATA：单项数据、 SINGLEKEY：单项数据（主键）、 MULTIDATA：多项数据、 MULTIKEY：多项数据（主键）、 NONE：无数据 }
   * @type {( string | 'SINGLEDATA' | 'SINGLEKEY' | 'MULTIDATA' | 'MULTIKEY' | 'NONE')}
   * 来源  getUIActionTarget
   */
  uiactionTarget?:
    | string
    | 'SINGLEDATA'
    | 'SINGLEKEY'
    | 'MULTIDATA'
    | 'MULTIKEY'
    | 'NONE';
}
