import { IMessageConsole } from '../../../interface';
import { MessageBase } from '../base/message-base';
/**
 * @description 日志消息控制器
 * @export
 * @class MessageConsole
 * @extends {MessageBase}
 * @implements {IMessageConsole}
 */
export declare class MessageConsole extends MessageBase implements IMessageConsole {
    /**
     * @description 发送消息
     * @param {(IData | string)} data
     * @memberof MessageConsole
     */
    send(data: IData | string): void;
}
//# sourceMappingURL=message-console.d.ts.map