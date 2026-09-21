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
export class CommandInternalMessage extends CommandBase {
    /**
     * 发送 站内信 指令消息
     *
     * @author chitanda
     * @date 2023-10-23 17:10:46
     * @param {IPortalInternalMessage} data
     */
    send(data) {
        this.sendCommand(data, 'INTERNALMESSAGE');
    }
}
