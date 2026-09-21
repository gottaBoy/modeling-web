import { createUUID } from 'qx-util';
import { MessageBase } from '../base/message-base';
/**
 * @description 日志消息控制器
 * @export
 * @class MessageConsole
 * @extends {MessageBase}
 * @implements {IMessageConsole}
 */
export class MessageConsole extends MessageBase {
    /**
     * @description 发送消息
     * @param {(IData | string)} data
     * @memberof MessageConsole
     */
    send(data) {
        const msg = {
            messageid: createUUID(),
            messagename: 'console',
            type: 'CONSOLE',
            data,
        };
        this.next(msg);
    }
}
