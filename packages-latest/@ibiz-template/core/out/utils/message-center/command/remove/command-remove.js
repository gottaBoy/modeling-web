import { CommandBase } from '../command-base/command-base';
/**
 * @description 删除指令消息控制器
 * @export
 * @class CommandRemove
 * @extends {CommandBase}
 * @implements {ICommandRemove}
 */
export class CommandRemove extends CommandBase {
    /**
     * @description 发送消息
     * @param {IAppDataEntity} data 实体数据
     * @param {IMsgMetaData} [meta] 元数据
     * @memberof CommandRemove
     */
    send(data, meta) {
        this.sendCommand(data, 'OBJECTREMOVED', meta === null || meta === void 0 ? void 0 : meta.triggerKey);
    }
}
