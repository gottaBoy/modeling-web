import { ILanguageRes } from '../res/ilanguage-res';
import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ISysMsgTempl
 */
export interface ISysMsgTempl extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 内容
   * @type {string}
   * 来源  getContent
   */
  content?: string;

  /**
   * 内容多语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getContentPSLanguageRes
   */
  contentLanguageRes?: ILanguageRes;

  /**
   * 内容类型
   * @description 值模式 [系统消息模板内容类型] {TEXT：纯文本、 HTML：HTML网页、 MARKDOWN：Markdown、 JSON：JSON、 PROPERTIES：Properties、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
   * @type {( string | 'TEXT' | 'HTML' | 'MARKDOWN' | 'JSON' | 'PROPERTIES' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
   * 来源  getContentType
   */
  contentType?:
    | string
    | 'TEXT'
    | 'HTML'
    | 'MARKDOWN'
    | 'JSON'
    | 'PROPERTIES'
    | 'USER'
    | 'USER2'
    | 'USER3'
    | 'USER4';

  /**
   * 钉钉内容
   * @type {string}
   * 来源  getDDContent
   */
  ddcontent?: string;

  /**
   * 钉钉内容多语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getDDPSLanguageRes
   */
  ddlanguageRes?: ILanguageRes;

  /**
   * 即时消息内容
   * @type {string}
   * 来源  getIMContent
   */
  imcontent?: string;

  /**
   * 即时消息多语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getIMPSLanguageRes
   */
  imlanguageRes?: ILanguageRes;

  /**
   * 移动端任务操作路径
   * @type {string}
   * 来源  getMobTaskUrl
   */
  mobTaskUrl?: string;

  /**
   * 短消息内容
   * @type {string}
   * 来源  getSMSContent
   */
  smscontent?: string;

  /**
   * 短消息多语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getSMSPSLanguageRes
   */
  smslanguageRes?: ILanguageRes;

  /**
   * 标题多语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getSubPSLanguageRes
   */
  subLanguageRes?: ILanguageRes;

  /**
   * 标题
   * @type {string}
   * 来源  getSubject
   */
  subject?: string;

  /**
   * 任务操作路径
   * @type {string}
   * 来源  getTaskUrl
   */
  taskUrl?: string;

  /**
   * 微信内容
   * @type {string}
   * 来源  getWXContent
   */
  wxcontent?: string;

  /**
   * 微信内容多语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getWXPSLanguageRes
   */
  wxlanguageRes?: ILanguageRes;

  /**
   * 邮件群组发送
   * @type {boolean}
   * 来源  isMailGroupSend
   */
  mailGroupSend?: boolean;
}
