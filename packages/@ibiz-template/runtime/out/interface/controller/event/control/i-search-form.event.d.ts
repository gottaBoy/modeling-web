import { EventBase } from '../argument';
import { IFormEvent } from './i-form.event';
/**
 * 搜索表单事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface ISearchFormEvent
 */
export interface ISearchFormEvent extends IFormEvent {
    onSearch: {
        event: EventBase;
        emitArgs: undefined;
    };
}
//# sourceMappingURL=i-search-form.event.d.ts.map