import { IPortalAsyncAction } from '@ibiz-template/core';
import { INoticeUtil } from '@ibiz-template/runtime';
export declare class NoticeUtil implements INoticeUtil {
    doingNotice?: {
        info: IData;
        close: () => void;
    };
    showAsyncAction(asyncAction: IPortalAsyncAction): Promise<void>;
    showDoingNotice(info: {
        num: number;
    }): void;
    closeDoingNotice(): void;
    showAddInChangedNotice(msg: IData): void;
}
