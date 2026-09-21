import { CommandBase } from '../command-base/command-base';
/**
 * 更新指令消息
 *
 * @author chitanda
 * @date 2023-09-05 17:09:54
 * @export
 * @class CommandUpdate
 * @extends {CommandBase}
 */
export class CommandUpdate extends CommandBase {
    /**
     * 发送更新的数据
     *
     * @author tony001
     * @date 2024-03-26 20:03:28
     * @param {IAppDataEntity} data 实体数据
     * @param {IMsgMetaData} meta 元数据
     */
    send(data, meta) {
        this.sendCommand(data, 'OBJECTUPDATED', meta === null || meta === void 0 ? void 0 : meta.triggerKey);
    }
}
