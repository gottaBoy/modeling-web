import { IInternalMessage } from '../../../../interface';
import { CommandBase } from '../command-base/command-base';
/**
 * 站内信指令消息
 *
 * @author lxm
 * @date 2024-01-30 11:38:38
 * @export
 * @class CommandInternalMessage
 * @extends {CommandBase}
 */
export declare class CommandInternalMessage extends CommandBase {
    /**
     * 发送 站内信 指令消息
     *
     * @author chitanda
     * @date 2023-10-23 17:10:46
     * @param {IPortalInternalMessage} data
     */
    send(data: IInternalMessage): void;
}
//# sourceMappingURL=command-internal-message.d.ts.map