import { QXEvent } from 'qx-util';
import { INoticeController, INoticeEvent } from '../../interface';
import { AsyncActionController } from './async-action.controller';
import { InternalMessageController } from './internal-message.controller';
import { AddInChangedController } from './add-in-changed.controller';

export class NoticeController implements INoticeController {
  readonly evt: QXEvent<INoticeEvent> = new QXEvent();

  total = 0;

  asyncAction = new AsyncActionController();

  internalMessage = new InternalMessageController();

  addInChanged = new AddInChangedController();

  async init(): Promise<void> {
    this.internalMessage.evt.on('unreadCountChange', () => {
      this.total = this.internalMessage.unreadCount;
      this.evt.emit('totalChange', this.total);
    });

    await this.internalMessage.init();
    await this.asyncAction.init();
    await this.addInChanged.init();
  }
}
