import { IMessageError } from '../../../interface';
import { MessageBase } from '../base/message-base';
/**
 * @description 错误消息控制器
 * @export
 * @class MessageError
 * @extends {MessageBase}
 * @implements {IMessageError}
 */
export declare class MessageError extends MessageBase implements IMessageError {
    /**
     * @description 发送消息
     * @param {(IData | string)} data
     * @memberof MessageError
     */
    send(data: IData | string): void;
}
//# sourceMappingURL=message-error.d.ts.map