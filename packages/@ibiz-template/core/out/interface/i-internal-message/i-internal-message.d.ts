export type InternalMessageStatus = 'SENT' | 'RECEIVED' | 'READ' | 'NOT_SENT' | 'SEND_FAILED' | 'REPLIED' | 'DELETED';
export type InternalMessageContentType = 'TEXT' | 'HTML' | 'MARKDOWN' | 'JSON';
/**
 * 站内信
 * @author lxm
 * @date 2024-01-23 01:50:09
 * @export
 * @interface IInternalMessage
 */
export interface IInternalMessage {
    /**
     * 更新人
     * @author lxm
     * @date 2024-01-23 01:53:09
     * @type {string}
     */
    update_man: string;
    /**
     * 更新时间
     * @author lxm
     * @date 2024-01-23 01:53:08
     * @type {string}
     */
    update_time: string;
    /**
     * 创建人
     * @author lxm
     * @date 2024-01-23 01:53:06
     * @type {string}
     */
    create_man: string;
    /**
     * 创建时间
     * @author lxm
     * @date 2024-01-23 01:53:04
     * @type {string}
     */
    create_time: string;
    /**
     * 唯一标识
     * @author lxm
     * @date 2024-01-23 01:52:58
     * @type {string}
     */
    id: string;
    /**
     * 状态
     * @author lxm
     * @date 2024-01-23 01:57:58
     * @type {InternalMessageStatus}
     */
    status: InternalMessageStatus;
    /**
     * 内容类型
     * @author lxm
     * @date 2024-01-23 01:57:52
     * @type {InternalMessageContentType}
     */
    content_type: InternalMessageContentType;
    /**
     * 内容
     * @author lxm
     * @date 2024-01-23 03:32:23
     * @type {string}
     */
    content: string;
    /**
     * 系统标记
     * @author lxm
     * @date 2024-01-23 01:58:27
     * @type {string}
     */
    system_tag: string;
    /**
     * 所有者标记
     * @author lxm
     * @date 2024-01-23 01:58:45
     * @type {string}
     */
    owner_id: string;
    /**
     * 消息所有者类型
     * @author lxm
     * @date 2024-01-23 01:52:39
     * @type {('PERSONAL' | 'SYSTEM')}
     */
    owner_type: 'PERSONAL' | 'SYSTEM';
    /**
     * 消息类型
     * @author lxm
     * @date 2024-01-23 01:59:34
     * @type {string}
     */
    message_type: string;
    /**
     * 标题
     * @author lxm
     * @date 2024-01-23 01:59:52
     * @type {string}
     */
    title: string;
    /**
     * 接受者
     * @author lxm
     * @date 2024-01-23 02:00:04
     * @type {string}
     */
    receiver: string;
    /**
     * 短内容
     * @author lxm
     * @date 2024-01-23 02:00:22
     * @type {string}
     */
    short_content?: string;
    /**
     * 链接
     * @author lxm
     * @date 2024-02-02 10:55:35
     * @type {string}
     */
    url?: string;
    /**
     * 移动端链接
     * @author lxm
     * @date 2024-02-02 10:55:35
     * @type {string}
     */
    mobile_url?: string;
}
//# sourceMappingURL=i-internal-message.d.ts.map