import { QXEvent } from 'qx-util';
import { AsyncActionController } from './async-action.controller';
import { InternalMessageController } from './internal-message.controller';
import { AddInChangedController } from './add-in-changed.controller';
export class NoticeController {
    constructor() {
        this.evt = new QXEvent();
        this.total = 0;
        this.asyncAction = new AsyncActionController();
        this.internalMessage = new InternalMessageController();
        this.addInChanged = new AddInChangedController();
    }
    async init() {
        this.internalMessage.evt.on('unreadCountChange', () => {
            this.total = this.internalMessage.unreadCount;
            this.evt.emit('totalChange', this.total);
        });
        await this.internalMessage.init();
        await this.asyncAction.init();
        await this.addInChanged.init();
    }
}
