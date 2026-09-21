import { ICommandMarkOpenData, IMarkOpenData } from '../../../../interface';
import { CommandBase } from '../command-base/command-base';
/**
 * @description 协同指令消息控制器
 * @export
 * @class CommandMarkOpenData
 * @extends {CommandBase}
 * @implements {ICommandMarkOpenData}
 */
export declare class CommandMarkOpenData extends CommandBase implements ICommandMarkOpenData {
    /**
     * @description 发送消息
     * @param {IMarkOpenData} data
     * @memberof CommandMarkOpenData
     */
    send(data: IMarkOpenData): void;
}
//# sourceMappingURL=command-mark-open-data.d.ts.map