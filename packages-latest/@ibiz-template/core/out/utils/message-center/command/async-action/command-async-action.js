import { CommandBase } from '../command-base/command-base';
/**
 * @description 异步作业指令消息控制器
 * @export
 * @class CommandAsyncAction
 * @extends {CommandBase}
 * @implements {ICommandAsyncAction}
 */
export class CommandAsyncAction extends CommandBase {
    /**
     * @description 发送消息
     * @param {IPortalAsyncAction} data
     * @memberof CommandAsyncAction
     */
    send(data) {
        this.sendCommand(data, 'ASYNCACTION');
    }
}
