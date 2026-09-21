import { CommandBase } from '../command-base/command-base';
/**
 * @description 创建指令消息控制器
 * @export
 * @class CommandCreate
 * @extends {CommandBase}
 * @implements {ICommandCreate}
 */
export class CommandCreate extends CommandBase {
    /**
     * @description 发送消息
     * @param {IAppDataEntity} data
     * @param {IMsgMetaData} [meta]
     * @memberof CommandCreate
     */
    send(data, meta) {
        this.sendCommand(data, 'OBJECTCREATED', meta === null || meta === void 0 ? void 0 : meta.triggerKey);
    }
}
