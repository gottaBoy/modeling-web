import { CommandBase } from '../command-base/command-base';
/**
 * 添加变更指令消息
 *
 * @export
 * @class CommandAddInChanged
 * @extends {CommandBase}
 */
export class CommandAddInChanged extends CommandBase {
    /**
     * 发送 添加变更 指令消息
     *
     * @param {IAddInChanged} data
     * @memberof CommandAddInChanged
     */
    send(data) {
        this.sendCommand(data, 'ADDINCHANGED');
    }
}
