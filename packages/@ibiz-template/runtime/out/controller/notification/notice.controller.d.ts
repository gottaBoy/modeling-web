import { QXEvent } from 'qx-util';
import { INoticeController, INoticeEvent } from '../../interface';
import { AsyncActionController } from './async-action.controller';
import { InternalMessageController } from './internal-message.controller';
import { AddInChangedController } from './add-in-changed.controller';
export declare class NoticeController implements INoticeController {
    readonly evt: QXEvent<INoticeEvent>;
    total: number;
    asyncAction: AsyncActionController;
    internalMessage: InternalMessageController;
    addInChanged: AddInChangedController;
    init(): Promise<void>;
}
//# sourceMappingURL=notice.controller.d.ts.map