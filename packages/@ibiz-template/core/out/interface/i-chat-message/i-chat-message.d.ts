import { IPortalAsyncAction } from '../i-portal-async-action/i-portal-async-action';
/**
 * AI聊天消息
 *
 * @author chitanda
 * @date 2023-10-10 16:10:29
 * @export
 * @interface IChatMessage
 */
export interface IChatMessage {
    /**
     * 消息标识
     *
     * @author chitanda
     * @date 2023-09-05 15:09:43
     * @type {string}
     */
    messageid?: string;
    /**
     * 消息名称
     *
     * @author chitanda
     * @date 2023-09-05 15:09:49
     * @type {string}
     */
    messagename?: string;
    /**
     * 消息类型
     *
     * @author chitanda
     * @date 2023-10-10 16:10:21
     * @type {string}
     */
    type?: string;
    /**
     * 消息子类型
     *
     * @author chitanda
     * @date 2023-10-10 16:10:00
     * @type {string}
     */
    subtype?: string;
    /**
     * 消息角色
     *
     * @author chitanda
     * @date 2023-10-10 16:10:32
     * @type {('ASSISTANT' | 'USER' | 'SYSTEM')} 助手 | 用户 | 系统
     */
    role: 'ASSISTANT' | 'USER' | 'SYSTEM';
    /**
     * 内容摘要
     *
     * @author chitanda
     * @date 2023-09-05 15:09:23
     * @type {string}
     */
    content: string;
    /**
     * 消息数据
     *
     * @author chitanda
     * @date 2023-09-05 15:09:55
     * @type {(IPortalAsyncAction | IData | string | unknown)}
     */
    data?: IPortalAsyncAction | IData | string | unknown;
    /**
     * 消息路径
     *
     * @author chitanda
     * @date 2023-09-05 15:09:25
     * @type {string}
     */
    url?: string;
}
//# sourceMappingURL=i-chat-message.d.ts.map