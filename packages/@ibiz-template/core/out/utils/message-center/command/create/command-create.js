import { CommandBase } from '../command-base/command-base';
/**
 * 创建指令消息
 *
 * @author chitanda
 * @date 2023-09-05 17:09:57
 * @export
 * @class CommandCreate
 * @extends {CommandBase}
 */
export class CommandCreate extends CommandBase {
    /**
     * 发送新建数据
     *
     * @author tony001
     * @date 2024-03-26 20:03:30
     * @param {IAppDataEntity} data 实体数据
     * @param {IMsgMetaData} meta 元数据
     */
    send(data, meta) {
        this.sendCommand(data, 'OBJECTCREATED', meta === null || meta === void 0 ? void 0 : meta.triggerKey);
    }
}
