import { IAppDataEntity, IMsgMetaData } from '../../interface';
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
export declare class CommandCreate extends CommandBase {
    /**
     * 发送新建数据
     *
     * @author tony001
     * @date 2024-03-26 20:03:30
     * @param {IAppDataEntity} data 实体数据
     * @param {IMsgMetaData} meta 元数据
     */
    send(data: IAppDataEntity, meta?: IMsgMetaData): void;
}
//# sourceMappingURL=command-create.d.ts.map