import { IMessageCenter, IPortalMessage } from '../../interface';
import { MessageAll } from './base/message-all';
import { MessageCommand } from './command/message-command';
import { MessageConsole } from './console/message-console';
import { MessageError } from './error/message-error';
/**
 * @description 界面消息中心
 * @export
 * @class MessageCenter
 * @implements {IMessageCenter}
 */
export declare class MessageCenter implements IMessageCenter {
    /**
     * @description 所有消息
     * @protected
     * @type {MessageAll}
     * @memberof MessageCenter
     */
    protected all: MessageAll;
    /**
     * @description 指令消息
     * @type {MessageCommand}
     * @memberof MessageCenter
     */
    readonly command: MessageCommand;
    /**
     * @description 日志消息
     * @type {MessageConsole}
     * @memberof MessageCenter
     */
    readonly console: MessageConsole;
    /**
     * @description 错误消息
     * @type {MessageError}
     * @memberof MessageCenter
     */
    readonly error: MessageError;
    /**
     * @description 发送消息
     * @param {IPortalMessage} msg 消息
     * @memberof MessageCenter
     */
    next(msg: IPortalMessage): void;
    /**
     * @description 订阅消息
     * @param {(msg: IPortalMessage) => void} callback
     * @memberof MessageCenter
     */
    on(callback: (msg: IPortalMessage) => void): void;
    /**
     * @description 取消订阅
     * @param {(msg: IPortalMessage) => void} callback
     * @memberof MessageCenter
     */
    off(callback: (msg: IPortalMessage) => void): void;
}
//# sourceMappingURL=message-center.d.ts.map