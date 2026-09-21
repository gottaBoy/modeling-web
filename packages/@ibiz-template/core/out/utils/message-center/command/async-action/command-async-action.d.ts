import { IPortalAsyncAction } from '../../../../interface';
import { CommandBase } from '../command-base/command-base';
/**
 * 异步作业指令消息
 *
 * @author chitanda
 * @date 2023-10-23 17:10:28
 * @export
 * @class CommandAsyncAction
 * @extends {CommandBase}
 */
export declare class CommandAsyncAction extends CommandBase {
    /**
     * 发送 异步作业 指令消息
     *
     * @author chitanda
     * @date 2023-10-23 17:10:46
     * @param {IPortalAsyncAction} data
     */
    send(data: IPortalAsyncAction): void;
}
//# sourceMappingURL=command-async-action.d.ts.map