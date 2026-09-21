import { ILanguageRes } from './ilanguage-res';
import { IModelObject } from '../imodel-object';

/**
 *
 * 部件消息项模型对象接口
 * @export
 * @interface ICtrlMsgItem
 */
export interface ICtrlMsgItem extends IModelObject {
  /**
   * 内容
   * @type {string}
   * 来源  getContent
   */
  content?: string;

  /**
   * 内容语言资源
   *
   * @type {ILanguageRes}
   * 来源  getContentPSLanguageRes
   */
  contentLanguageRes?: ILanguageRes;

  /**
   * 显示时长（毫秒）
   * @type {number}
   * @default -1
   * 来源  getTimeout
   */
  timeout?: number;
}
