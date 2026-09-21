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
export class MessageCenter {
    constructor() {
        /**
         * 所有消息
         *
         * @author chitanda
         * @date 2023-09-05 16:09:12
         * @type {MessageAll}
         */
        this.all = new MessageAll();
        /**
         * 指令消息
         *
         * @author chitanda
         * @date 2023-09-05 16:09:28
         * @type {MessageCommand}
         */
        this.command = new MessageCommand(this.all);
        /**
         * 日志消息
         *
         * @author chitanda
         * @date 2023-09-05 16:09:48
         * @type {MessageConsole}
         */
        this.console = new MessageConsole(this.all);
        /**
         * 错误消息
         *
         * @author tony001
         * @date 2024-04-28 10:04:25
         * @type {MessageError}
         */
        this.error = new MessageError(this.all);
    }
    /**
     * 发送消息
     *
     * @author chitanda
     * @date 2023-09-05 15:09:49
     * @param {IPortalMessage} msg
     */
    next(msg) {
        // 消息分子类型，子类型发完消息后，会让父发消息
        // 所以子类型有父时，会一级一级的往上发消息。不需要在此处发全局消息
        if (msg.type === 'COMMAND') {
            this.command.next(msg);
        }
        else if (msg.type === 'CONSOLE') {
            this.console.next(msg);
        }
        else {
            this.all.next(msg);
        }
    }
    /**
     * 订阅消息
     *
     * @author chitanda
     * @date 2023-09-05 17:09:32
     * @param {(msg: IPortalMessage) => void} callback
     */
    on(callback) {
        this.all.on(callback);
    }
    /**
     * 取消订阅
     *
     * @author chitanda
     * @date 2023-09-05 17:09:38
     * @param {(msg: IPortalMessage) => void} callback
     */
    off(callback) {
        this.all.off(callback);
    }
}
