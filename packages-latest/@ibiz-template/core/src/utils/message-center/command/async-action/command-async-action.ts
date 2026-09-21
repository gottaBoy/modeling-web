import { ICommandAsyncAction, IPortalAsyncAction } from '../../../../interface';
import { CommandBase } from '../command-base/command-base';

/**
 * @description 异步作业指令消息控制器
 * @export
 * @class CommandAsyncAction
 * @extends {CommandBase}
 * @implements {ICommandAsyncAction}
 */
export class CommandAsyncAction
  extends CommandBase
  implements ICommandAsyncAction
{
  /**
   * @description 发送消息
   * @param {IPortalAsyncAction} data
   * @memberof CommandAsyncAction
   */
  send(data: IPortalAsyncAction): void {
    this.sendCommand(data, 'ASYNCACTION');
  }
}
