import { createUUID } from 'qx-util';
import { ICommandBase, IPortalMessage } from '../../../../interface';
import { MessageBase } from '../../base/message-base';

/**
 * @description 指令消息基类控制器
 * @export
 * @class CommandBase
 * @extends {MessageBase}
 * @implements {ICommandBase}
 */
export class CommandBase extends MessageBase implements ICommandBase {
  /**
   * @description 发送指令消息
   * @param {IData} data
   * @param {IPortalMessage['subtype']} subtype
   * @param {string} [triggerKey]
   * @memberof CommandBase
   */
  sendCommand(
    data: IData,
    subtype: IPortalMessage['subtype'],
    triggerKey?: string,
  ): void {
    const msg: IPortalMessage = {
      messageid: createUUID(),
      messagename: 'command',
      type: 'COMMAND',
      subtype,
      triggerKey,
      data,
    };
    this.next(msg);
  }
}
