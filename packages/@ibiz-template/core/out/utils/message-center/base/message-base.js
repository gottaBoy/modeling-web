import { QXEvent } from 'qx-util';
/**
 * 消息基类，各个类型消息继承此类
 *
 * @author chitanda
 * @date 2023-09-05 16:09:41
 * @export
 * @class MessageBase
 */
export class MessageBase {
    constructor(parent) {
        this.parent = parent;
        /**
         * 事件
         *
         * @author chitanda
         * @date 2023-09-05 16:09:58
         * @protected
         * @type {QXEvent<MessageCenterEvent>}
         */
        this.evt = new QXEvent(1000);
    }
    /**
     * 推送标准结构消息
     *
     * @author chitanda
     * @date 2023-09-05 16:09:40
     * @param {IPortalMessage} msg
     */
    next(msg) {
        this.evt.emit('all', msg);
        if (this.parent) {
            this.nextParent(msg);
        }
    }
    /**
     * 私有方法，专门向父级推送消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:08
     * @protected
     * @param {IPortalMessage} msg
     */
    nextParent(msg) {
        if (this.parent) {
            this.parent.evt.emit('all', msg);
            this.parent.nextParent(msg);
        }
    }
    /**
     * 订阅消息
     *
     * @author chitanda
     * @date 2023-09-05 15:09:21
     * @param {(msg: IPortalMessage) => void} evt
     */
    on(cb) {
        this.evt.on('all', cb);
    }
    /**
     * 取消订阅
     *
     * @author chitanda
     * @date 2023-09-05 15:09:50
     * @param {(msg: IPortalMessage) => void} cb
     */
    off(cb) {
        this.evt.off('all', cb);
    }
}
