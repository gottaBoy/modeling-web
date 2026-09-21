import { IDEUILogicNode } from './ideuilogic-node';

/**
 *
 * 继承父接口类型值[MSGBOX]
 * @export
 * @interface IDEUIMsgBoxLogic
 */
export interface IDEUIMsgBoxLogic extends IDEUILogicNode {
  /**
   * 按钮集类型
   * @description 值模式 [消息框按钮类型] {YESNO：是、否、 YESNOCANCEL：是、否、取消、 OK：确定、 OKCANCEL：确定、取消 }
   * @type {( string | 'YESNO' | 'YESNOCANCEL' | 'OK' | 'OKCANCEL')}
   * 来源  getButtonsType
   */
  buttonsType?: string | 'YESNO' | 'YESNOCANCEL' | 'OK' | 'OKCANCEL';

  /**
   * 消息内容
   * @type {string}
   * 来源  getMessage
   */
  message?: string;

  /**
   * 消息框参数对象
   *
   * @type {string}
   * 来源  getMsgBoxParam
   */
  msgBoxParamId?: string;

  /**
   * 消息框类型
   * @description 值模式 [消息框类型] {INFO：常规、 QUESTION：询问、 WARNING：警告、 ERROR：错误、 PROMPT：提示输入 }
   * @type {( string | 'INFO' | 'QUESTION' | 'WARNING' | 'ERROR' | 'PROMPT')}
   * 来源  getMsgBoxType
   */
  msgBoxType?: string | 'INFO' | 'QUESTION' | 'WARNING' | 'ERROR' | 'PROMPT';

  /**
   * 显示模式
   * @description 值模式 [消息框显示模式] {CENTER：居中 }
   * @type {( string | 'CENTER')}
   * 来源  getShowMode
   */
  showMode?: string | 'CENTER';

  /**
   * 消息抬头
   * @type {string}
   * 来源  getTitle
   */
  title?: string;
}
