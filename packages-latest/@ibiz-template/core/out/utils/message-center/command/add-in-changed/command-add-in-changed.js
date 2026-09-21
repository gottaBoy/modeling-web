import { CommandBase } from '../command-base/command-base';
/**
 * @description 添加变更指令消息控制器
 * @export
 * @class CommandAddInChanged
 * @extends {CommandBase}
 * @implements {ICommandAddInChanged}
 */
export class CommandAddInChanged extends CommandBase {
    /**
     * @description 发送消息
     * @param {IAddInChanged} data
     * @memberof CommandAddInChanged
     */
    send(data) {
        this.sendCommand(data, 'ADDINCHANGED');
    }
}
