import { IAddInChanged, ICommandAddInChanged } from '../../../../interface';
import { CommandBase } from '../command-base/command-base';
/**
 * @description 添加变更指令消息控制器
 * @export
 * @class CommandAddInChanged
 * @extends {CommandBase}
 * @implements {ICommandAddInChanged}
 */
export declare class CommandAddInChanged extends CommandBase implements ICommandAddInChanged {
    /**
     * @description 发送消息
     * @param {IAddInChanged} data
     * @memberof CommandAddInChanged
     */
    send(data: IAddInChanged): void;
}
//# sourceMappingURL=command-add-in-changed.d.ts.map