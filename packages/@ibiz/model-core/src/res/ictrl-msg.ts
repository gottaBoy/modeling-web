import { ICtrlMsgItem } from './ictrl-msg-item';
import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ICtrlMsg
 */
export interface ICtrlMsg extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 消息配置
   * @type {string}
   * 来源  getMsgModel
   */
  msgModel?: string;

  /**
   * 部件消息项集合
   *
   * @type {ICtrlMsgItem[]}
   * 来源  getPSCtrlMsgItems
   */
  ctrlMsgItems?: ICtrlMsgItem[];
}
