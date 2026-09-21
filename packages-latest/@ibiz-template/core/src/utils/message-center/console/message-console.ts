import { createUUID } from 'qx-util';
import { IMessageConsole, IPortalMessage } from '../../../interface';
import { MessageBase } from '../base/message-base';

/**
 * @description 日志消息控制器
 * @export
 * @class MessageConsole
 * @extends {MessageBase}
 * @implements {IMessageConsole}
 */
export class MessageConsole extends MessageBase implements IMessageConsole {
  /**
   * @description 发送消息
   * @param {(IData | string)} data
   * @memberof MessageConsole
   */
  send(data: IData | string): void {
    const msg: IPortalMessage = {
      messageid: createUUID(),
      messagename: 'console',
      type: 'CONSOLE',
      data,
    };
    this.next(msg);
  }
}
