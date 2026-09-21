import { QXEvent } from 'qx-util';
import {
  IMessageBase,
  IMessageCenterEvent,
  IPortalMessage,
} from '../../../interface';

/**
 * @description 消息基类控制器，各个类型消息继承此类
 * @export
 * @abstract
 * @class MessageBase
 * @implements {IMessageBase}
 */
export abstract class MessageBase implements IMessageBase {
  /**
   * @description 事件对象
   * @protected
   * @type {QXEvent<IMessageCenterEvent>}
   * @memberof MessageBase
   */
  protected evt: QXEvent<IMessageCenterEvent> = new QXEvent(1000);

  /**
   * Creates an instance of MessageBase.
   * @param {MessageBase} [parent]
   * @memberof MessageBase
   */
  constructor(protected parent?: MessageBase) {}

  /**
   * @description 推送标准结构消息
   * @param {IPortalMessage} msg
   * @memberof MessageBase
   */
  next(msg: IPortalMessage): void {
    this.evt.emit('all', msg);
    if (this.parent) {
      this.nextParent(msg);
    }
  }

  /**
   * @description 向父级推送消息（私有方法）
   * @protected
   * @param {IPortalMessage} msg
   * @memberof MessageBase
   */
  protected nextParent(msg: IPortalMessage): void {
    if (this.parent) {
      this.parent.evt.emit('all', msg);
      this.parent.nextParent(msg);
    }
  }

  /**
   * @description 订阅消息
   * @param {(msg: IPortalMessage) => void} cb
   * @memberof MessageBase
   */
  on(cb: (msg: IPortalMessage) => void): void {
    this.evt.on('all', cb);
  }

  /**
   * @description 取消订阅消息
   * @param {(msg: IPortalMessage) => void} cb
   * @memberof MessageBase
   */
  off(cb: (msg: IPortalMessage) => void): void {
    this.evt.off('all', cb);
  }
}
