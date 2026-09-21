import { ICommandBase, IPortalMessage } from '../../../../interface';
import { MessageBase } from '../../base/message-base';
/**
 * @description 指令消息基类控制器
 * @export
 * @class CommandBase
 * @extends {MessageBase}
 * @implements {ICommandBase}
 */
export declare class CommandBase extends MessageBase implements ICommandBase {
    /**
     * @description 发送指令消息
     * @param {IData} data
     * @param {IPortalMessage['subtype']} subtype
     * @param {string} [triggerKey]
     * @memberof CommandBase
     */
    sendCommand(data: IData, subtype: IPortalMessage['subtype'], triggerKey?: string): void;
}
//# sourceMappingURL=command-base.d.ts.map