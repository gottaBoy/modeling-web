import { IPortalMessage } from '../../interface';
import { MessageAll } from './base/message-all';
import { MessageCommand } from './command/message-command';
import { MessageConsole } from './console/message-console';
import { MessageError } from './error/message-error';
/**
 * 界面消息中心
 *
 * @author chitanda
 * @date 2023-09-05 15:09:14
 * @export
 * @class MessageCenter
 */
export declare class MessageCenter {
    /**
     * 所有消息
     *
     * @author chitanda
     * @date 2023-09-05 16:09:12
     * @type {MessageAll}
     */
    protected all: MessageAll;
    /**
     * 指令消息
     *
     * @author chitanda
     * @date 2023-09-05 16:09:28
     * @type {MessageCommand}
     */
    readonly command: MessageCommand;
    /**
     * 日志消息
     *
     * @author chitanda
     * @date 2023-09-05 16:09:48
     * @type {MessageConsole}
     */
    readonly console: MessageConsole;
    /**
     * 错误消息
     *
     * @author tony001
     * @date 2024-04-28 10:04:25
     * @type {MessageError}
     */
    readonly error: MessageError;
    /**
     * 发送消息
     *
     * @author chitanda
     * @date 2023-09-05 15:09:49
     * @param {IPortalMessage} msg
     */
    next(msg: IPortalMessage): void;
    /**
     * 订阅消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:32
     * @param {(msg: IPortalMessage) => void} callback
     */
    on(callback: (msg: IPortalMessage) => void): void;
    /**
     * 取消订阅
     *
     * @author chitanda
     * @date 2023-09-05 17:09:38
     * @param {(msg: IPortalMessage) => void} callback
     */
    off(callback: (msg: IPortalMessage) => void): void;
}
//# sourceMappingURL=message-center.d.ts.map