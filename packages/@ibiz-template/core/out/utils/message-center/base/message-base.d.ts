import { QXEvent } from 'qx-util';
import { IPortalMessage } from '../../../interface';
/**
 * 消息事件
 *
 * @author chitanda
 * @date 2023-09-05 16:09:17
 * @interface MessageCenterEvent
 */
interface MessageCenterEvent {
    all: (msg: IPortalMessage) => void;
}
/**
 * 消息基类，各个类型消息继承此类
 *
 * @author chitanda
 * @date 2023-09-05 16:09:41
 * @export
 * @class MessageBase
 */
export declare abstract class MessageBase {
    protected parent?: MessageBase | undefined;
    /**
     * 事件
     *
     * @author chitanda
     * @date 2023-09-05 16:09:58
     * @protected
     * @type {QXEvent<MessageCenterEvent>}
     */
    protected evt: QXEvent<MessageCenterEvent>;
    constructor(parent?: MessageBase | undefined);
    /**
     * 推送标准结构消息
     *
     * @author chitanda
     * @date 2023-09-05 16:09:40
     * @param {IPortalMessage} msg
     */
    next(msg: IPortalMessage): void;
    /**
     * 私有方法，专门向父级推送消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:08
     * @protected
     * @param {IPortalMessage} msg
     */
    protected nextParent(msg: IPortalMessage): void;
    /**
     * 订阅消息
     *
     * @author chitanda
     * @date 2023-09-05 15:09:21
     * @param {(msg: IPortalMessage) => void} evt
     */
    on(cb: (msg: IPortalMessage) => void): void;
    /**
     * 取消订阅
     *
     * @author chitanda
     * @date 2023-09-05 15:09:50
     * @param {(msg: IPortalMessage) => void} cb
     */
    off(cb: (msg: IPortalMessage) => void): void;
}
export {};
//# sourceMappingURL=message-base.d.ts.map