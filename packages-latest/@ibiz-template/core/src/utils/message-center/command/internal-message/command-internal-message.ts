import {
  ICommandInternalMessage,
  IInternalMessage,
} from '../../../../interface';
import { CommandBase } from '../command-base/command-base';

/**
 * @description 站内信指令消息控制器
 * @export
 * @class CommandInternalMessage
 * @extends {CommandBase}
 * @implements {ICommandInternalMessage}
 */
export class CommandInternalMessage
  extends CommandBase
  implements ICommandInternalMessage
{
  /**
   * @description 发送消息
   * @param {IInternalMessage} data
   * @memberof CommandInternalMessage
   */
  send(data: IInternalMessage): void {
    this.sendCommand(data, 'INTERNALMESSAGE');
  }
}
