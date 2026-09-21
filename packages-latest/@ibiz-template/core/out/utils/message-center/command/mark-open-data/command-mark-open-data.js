import { CommandBase } from '../command-base/command-base';
/**
 * @description 协同指令消息控制器
 * @export
 * @class CommandMarkOpenData
 * @extends {CommandBase}
 * @implements {ICommandMarkOpenData}
 */
export class CommandMarkOpenData extends CommandBase {
    /**
     * @description 发送消息
     * @param {IMarkOpenData} data
     * @memberof CommandMarkOpenData
     */
    send(data) {
        this.sendCommand(data, 'MARKOPENDATA');
    }
}
