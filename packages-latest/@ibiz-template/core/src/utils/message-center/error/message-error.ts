import { createUUID } from 'qx-util';
import { IMessageError, IPortalMessage } from '../../../interface';
import { MessageBase } from '../base/message-base';

/**
 * @description 错误消息控制器
 * @export
 * @class MessageError
 * @extends {MessageBase}
 * @implements {IMessageError}
 */
export class MessageError extends MessageBase implements IMessageError {
  /**
   * @description 发送消息
   * @param {(IData | string)} data
   * @memberof MessageError
   */
  send(data: IData | string): void {
    const msg: IPortalMessage = {
      messageid: createUUID(),
      messagename: 'error',
      type: 'ERROR',
      data,
    };
    this.next(msg);
  }
}
