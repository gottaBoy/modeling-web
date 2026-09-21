import { IMessageCenter, IPortalMessage } from '../../interface';
import { MessageAll } from './base/message-all';
import { MessageCommand } from './command/message-command';
import { MessageConsole } from './console/message-console';
import { MessageError } from './error/message-error';

/**
 * @description 界面消息中心
 * @export
 * @class MessageCenter
 * @implements {IMessageCenter}
 */
export class MessageCenter implements IMessageCenter {
  /**
   * @description 所有消息
   * @protected
   * @type {MessageAll}
   * @memberof MessageCenter
   */
  protected all: MessageAll = new MessageAll();

  /**
   * @description 指令消息
   * @type {MessageCommand}
   * @memberof MessageCenter
   */
  readonly command: MessageCommand = new MessageCommand(this.all);

  /**
   * @description 日志消息
   * @type {MessageConsole}
   * @memberof MessageCenter
   */
  readonly console: MessageConsole = new MessageConsole(this.all);

  /**
   * @description 错误消息
   * @type {MessageError}
   * @memberof MessageCenter
   */
  readonly error: MessageError = new MessageError(this.all);

  /**
   * @description 发送消息
   * @param {IPortalMessage} msg 消息
   * @memberof MessageCenter
   */
  next(msg: IPortalMessage): void {
    // 消息分子类型，子类型发完消息后，会让父发消息
    // 所以子类型有父时，会一级一级的往上发消息。不需要在此处发全局消息
    if (msg.type === 'COMMAND') {
      this.command.next(msg);
    } else if (msg.type === 'CONSOLE') {
      this.console.next(msg);
    } else {
      this.all.next(msg);
    }
  }

  /**
   * @description 订阅消息
   * @param {(msg: IPortalMessage) => void} callback
   * @memberof MessageCenter
   */
  on(callback: (msg: IPortalMessage) => void): void {
    this.all.on(callback);
  }

  /**
   * @description 取消订阅
   * @param {(msg: IPortalMessage) => void} callback
   * @memberof MessageCenter
   */
  off(callback: (msg: IPortalMessage) => void): void {
    this.all.off(callback);
  }
}
