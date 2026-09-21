import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';
/**
 * 列表部件事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IMDControlEvent
 */
export interface IListEvent extends IMDControlEvent {
    /**
     * 滚动到顶部
     * @memberof IListEvent
     */
    onScrollToTop: {
        event: EventBase;
        emitArgs: undefined;
    };
}
//# sourceMappingURL=i-list.event.d.ts.map