import { IHttpResponse, IInternalMessage } from '@ibiz-template/core';

/**
 * 站内信消息服务
 *
 * @author lxm
 * @date 2024-01-23 02:12:01
 * @export
 * @interface IInternalMessageService
 */
export interface IInternalMessageService {
  /**
   * 获取站内信的集合
   * @author lxm
   * @date 2023-11-15 10:55:25
   * @param {IParams} [params={}]
   * @return {*}  {Promise<IHttpResponse<IInternalMessage[]>>}
   */
  fetch(params?: IParams): Promise<IHttpResponse<IInternalMessage[]>>;

  /**
   * 获取单条站内信
   * @author lxm
   * @date 2023-11-15 10:57:08
   * @param {string} actionID
   * @return {*}  {Promise<IHttpResponse<IInternalMessage[]>>}
   */
  get(actionID: string): Promise<IHttpResponse<IInternalMessage>>;

  /**
   * 设置已读
   * @author lxm
   * @date 2024-02-04 03:59:52
   * @param {string} messageId
   * @return {*}  {Promise<void>}
   */
  markRead(messageId: string): Promise<void>;

  /**
   * 获取未读数据的总条数
   * @author lxm
   * @date 2024-02-04 09:35:06
   * @return {*}  {Promise<number>}
   */
  getUnreadNum(): Promise<number>;
}
