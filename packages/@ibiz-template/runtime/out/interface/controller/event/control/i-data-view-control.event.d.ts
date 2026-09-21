import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';
/**
 * 数据视图（卡片）部件事件
 *
 * @export
 * @interface IMDControlEvent
 */
export interface IDataViewControlEvent extends IMDControlEvent {
    /**
     * 滚动到顶部
     * @memberof IDataViewControlEvent
     */
    onScrollToTop: {
        event: EventBase;
        emitArgs: undefined;
    };
}
//# sourceMappingURL=i-data-view-control.event.d.ts.map