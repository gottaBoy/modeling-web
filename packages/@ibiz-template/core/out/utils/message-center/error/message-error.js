import { createUUID } from 'qx-util';
import { MessageBase } from '../base/message-base';
/**
 * 错误消息
 *
 * @author tony001
 * @date 2024-04-28 10:04:58
 * @export
 * @class MessageError
 * @extends {MessageBase}
 */
export class MessageError extends MessageBase {
    /**
     * 发送错误消息
     *
     * @author tony001
     * @date 2024-04-28 10:04:16
     * @param {(IData | string)} data
     */
    send(data) {
        const msg = {
            messageid: createUUID(),
            messagename: 'error',
            type: 'ERROR',
            data,
        };
        this.next(msg);
    }
}
