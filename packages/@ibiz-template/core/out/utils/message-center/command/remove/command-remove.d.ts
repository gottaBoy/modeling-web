import { IAppDataEntity, IMsgMetaData } from '../../interface';
import { CommandBase } from '../command-base/command-base';
/**
 * 删除指令消息
 *
 * @author chitanda
 * @date 2023-09-05 17:09:03
 * @export
 * @class CommandRemove
 * @extends {CommandBase}
 */
export declare class CommandRemove extends CommandBase {
    /**
     * 发送删除的数据
     *
     * @author tony001
     * @date 2024-03-26 20:03:05
     * @param {IAppDataEntity} data 实体数据
     * @param {IMsgMetaData} meta 元数据
     */
    send(data: IAppDataEntity, meta?: IMsgMetaData): void;
}
//# sourceMappingURL=command-remove.d.ts.map