// 站内信状态
export type InternalMessageStatus =
  | 'SENT'
  | 'RECEIVED'
  | 'READ'
  | 'NOT_SENT'
  | 'SEND_FAILED'
  | 'REPLIED'
  | 'DELETED';

// 站内信内容类型
export type InternalMessageContentType = 'TEXT' | 'HTML' | 'MARKDOWN' | 'JSON';

/**
 * @description 站内信消息
 * @export
 * @interface IInternalMessage
 */
export interface IInternalMessage {
  /**
   * @description 更新人
   * @type {string}
   * @memberof IInternalMessage
   */
  update_man: string;
  /**
   * @description 更新时间
   * @type {string}
   * @memberof IInternalMessage
   */
  update_time: string;
  /**
   * @description 创建人
   * @type {string}
   * @memberof IInternalMessage
   */
  create_man: string;
  /**
   * @description 创建时间
   * @type {string}
   * @memberof IInternalMessage
   */
  create_time: string;
  /**
   * @description 唯一标识
   * @type {string}
   * @memberof IInternalMessage
   */
  id: string;
  /**
   * @description 状态
   * @type {InternalMessageStatus}
   * @memberof IInternalMessage
   */
  status: InternalMessageStatus;

  /**
   * @description 内容类型
   * @type {InternalMessageContentType}
   * @memberof IInternalMessage
   */
  content_type: InternalMessageContentType;
  /**
   * @description 内容
   * @type {string}
   * @memberof IInternalMessage
   */
  content: string;

  /**
   * @description 系统标记
   * @type {string}
   * @memberof IInternalMessage
   */
  system_tag: string;

  /**
   * @description 所有者标记
   * @type {string}
   * @memberof IInternalMessage
   */
  owner_id: string;

  /**
   * @description 消息所有者类型
   * @type {('PERSONAL' | 'SYSTEM')}
   * @memberof IInternalMessage
   */
  owner_type: 'PERSONAL' | 'SYSTEM';

  /**
   * @description 消息类型
   * @type {string}
   * @memberof IInternalMessage
   */
  message_type: string;

  /**
   * @description 标题
   * @type {string}
   * @memberof IInternalMessage
   */
  title: string;

  /**
   * @description 接受者
   * @type {string}
   * @memberof IInternalMessage
   */
  receiver: string;

  /**
   * @description 短内容
   * @type {string}
   * @memberof IInternalMessage
   */
  short_content?: string;

  /**
   * @description 链接
   * @type {string}
   * @memberof IInternalMessage
   */
  url?: string;

  /**
   * @description 移动端链接
   * @type {string}
   * @memberof IInternalMessage
   */
  mobile_url?: string;
}
