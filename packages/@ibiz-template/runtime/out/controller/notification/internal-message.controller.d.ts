import { IInternalMessage, Namespace } from '@ibiz-template/core';
import { QXEvent } from 'qx-util';
import { IInternalMessageController, IInternalMessageEvent, IInternalMessageProvider } from '../../interface';
import { InternalMessageService } from '../../service';
export declare class InternalMessageController implements IInternalMessageController {
    readonly evt: QXEvent<IInternalMessageEvent>;
    total: number;
    unreadCount: number;
    /**
     * 当前分页
     * @author lxm
     * @date 2024-01-26 10:06:28
     * @type {number}
     */
    page: number;
    size: number;
    messages: IInternalMessage[];
    unreadOnly: boolean;
    protected service: InternalMessageService;
    ns: Namespace | null;
    provider: IInternalMessageProvider | null;
    init(): Promise<void>;
    load(): Promise<void>;
    loadMore(): Promise<void>;
    refreshUnreadCount(): Promise<void>;
    /**
     * 切换是否只读
     * @author lxm
     * @date 2024-02-04 10:21:22
     * @param {val} [boolean] 是否只读
     */
    toggleUnReadOnly(val?: boolean): void;
    protected fetch(loadMore?: boolean): Promise<void>;
    /**
     * 监听mqtt消息
     * @author lxm
     * @date 2024-01-30 01:53:44
     * @protected
     */
    protected listenMqtt(): void;
    markRead(message: IInternalMessage): Promise<void>;
    /**
     * 把所有未读消息标记为已读
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-21 15:38:25
     */
    batchMarkRead(): Promise<void>;
    /**
     * 获取完整信息
     * @author lxm
     * @date 2024-01-30 05:03:25
     * @param {string} id
     * @return {*}  {Promise<IInternalMessage>}
     */
    get(id: string): Promise<IInternalMessage>;
}
//# sourceMappingURL=internal-message.controller.d.ts.map