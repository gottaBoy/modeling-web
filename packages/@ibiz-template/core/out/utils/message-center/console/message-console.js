import { createUUID } from 'qx-util';
import { MessageBase } from '../base/message-base';
/**
 * 日志消息
 *
 * @author chitanda
 * @date 2023-09-05 16:09:33
 * @export
 * @class MessageConsole
 * @extends {MessageBase}
 */
export class MessageConsole extends MessageBase {
    /**
     * 发送日志消息
     *
     * @author chitanda
     * @date 2023-09-05 16:09:25
     * @param {(IData | string)} data
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
