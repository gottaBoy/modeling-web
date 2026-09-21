import { IApiData } from '../../../global-param';
import { IPortalAsyncAction } from './i-portal-async-action';

/**
 * @description 消息数据
 * @export
 * @interface IPortalMessage
 */
export interface IPortalMessage {
  /**
   * @description 消息标识
   * @type {string}
   * @memberof IPortalMessage
   */
  messageid: string;
  /**
   * @description 消息名称
   * @type {string}
   * @memberof IPortalMessage
   */
  messagename?: string;

  /**
   * @description 消息类型, 日志消息 | 命令 | 错误消息
   * @type {('CONSOLE' | 'COMMAND' | 'ERROR')} 日志消息 | 命令 | 错误消息
   * @memberof IPortalMessage
   */
  type: 'CONSOLE' | 'COMMAND' | 'ERROR';

  /**
   * @description 消息子类型, 标注打开数据 | 异步作业 | 站内信 | 数据更新 | 数据删除 | 数据创建 | 添加更改
   * @type {('MARKOPENDATA'
   *     | 'ASYNCACTION'
   *     | 'INTERNALMESSAGE'
   *     | 'OBJECTUPDATED'
   *     | 'OBJECTREMOVED'
   *     | 'OBJECTCREATED'
   *     | 'ADDINCHANGED')} 标注打开数据 | 异步作业 | 站内信 | 数据更新 | 数据删除 | 数据创建 | 添加更改
   * @memberof IPortalMessage
   */
  subtype?:
    | 'MARKOPENDATA'
    | 'ASYNCACTION'
    | 'INTERNALMESSAGE'
    | 'OBJECTUPDATED'
    | 'OBJECTREMOVED'
    | 'OBJECTCREATED'
    | 'ADDINCHANGED';

  /**
   * @description 内容摘要
   * @type {string}
   * @memberof IPortalMessage
   */
  content?: string;

  /**
   * @description 消息数据
   * @type {(IPortalAsyncAction | IApiData | string | unknown)}
   * @memberof IPortalMessage
   */
  data?: IPortalAsyncAction | IApiData | string | unknown;

  /**
   * @description 消息路径
   * @type {string}
   * @memberof IPortalMessage
   */
  url?: string;

  /**
   * @description 移动端消息路径
   * @type {string}
   * @memberof IPortalMessage
   */
  mobileurl?: string;

  /**
   * @description 触发源的key，随机字符串，作为接收方判断是否相同环境触发，相同环境则不做处理，可不传
   * @type {string}
   * @memberof IPortalMessage
   */
  triggerKey?: string;
}
