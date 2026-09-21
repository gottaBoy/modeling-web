import { IPortalAsyncAction } from '../i-portal-async-action/i-portal-async-action';
/**
 * 消息数据
 *
 * @author chitanda
 * @date 2023-09-05 15:09:02
 * @export
 * @interface IPortalMessage
 */
export interface IPortalMessage {
    /**
     * 消息标识
     *
     * @author chitanda
     * @date 2023-09-05 15:09:43
     * @type {string}
     */
    messageid: string;
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
     * @date 2023-09-05 15:09:09
     * @type {('CONSOLE' | 'COMMAND')} 日志消息 | 命令 | 错误消息
     */
    type: 'CONSOLE' | 'COMMAND' | 'ERROR';
    /**
     * 消息子类型
     *
     * @type {('MARKOPENDATA'
     *     | 'ASYNCACTION'
     *     | 'INTERNALMESSAGE'
     *     | 'OBJECTUPDATED'
     *     | 'OBJECTREMOVED'
     *     | 'OBJECTCREATED'
     *     | 'ADDINCHANGED')} 标注打开数据 | 异步作业 | 站内信 | 数据更新 | 数据删除 | 数据创建 | 添加更改
     * @memberof IPortalMessage
     */
    subtype?: 'MARKOPENDATA' | 'ASYNCACTION' | 'INTERNALMESSAGE' | 'OBJECTUPDATED' | 'OBJECTREMOVED' | 'OBJECTCREATED' | 'ADDINCHANGED';
    /**
     * 内容摘要
     *
     * @author chitanda
     * @date 2023-09-05 15:09:23
     * @type {string}
     */
    content?: string;
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
    /**
     * 移动端消息路径
     *
     * @author chitanda
     * @date 2024-02-27 18:02:03
     * @type {string}
     */
    mobileurl?: string;
    /**
     * 触发源的key
     *
     * @author tony001
     * @date 2024-03-26 20:03:32
     * @type {string}
     */
    triggerKey?: string;
}
//# sourceMappingURL=i-portal-message.d.ts.map