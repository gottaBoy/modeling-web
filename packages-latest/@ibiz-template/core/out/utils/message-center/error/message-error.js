import { createUUID } from 'qx-util';
import { MessageBase } from '../base/message-base';
/**
 * @description 错误消息控制器
 * @export
 * @class MessageError
 * @extends {MessageBase}
 * @implements {IMessageError}
 */
export class MessageError extends MessageBase {
    /**
     * @description 发送消息
     * @param {(IData | string)} data
     * @memberof MessageError
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
