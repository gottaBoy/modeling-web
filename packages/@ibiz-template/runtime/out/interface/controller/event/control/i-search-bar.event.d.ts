import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 搜索栏事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:14
 * @export
 * @interface ISearchBarEvent
 */
export interface ISearchBarEvent extends IControlEvent {
    /**
     * 抛出搜索事件
     * @return {*}
     */
    onSearch: {
        event: EventBase;
        emitArgs: undefined;
    };
}
//# sourceMappingURL=i-search-bar.event.d.ts.map