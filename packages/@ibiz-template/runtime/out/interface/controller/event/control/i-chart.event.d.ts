import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';
/**
 * 图表部件事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IMDControlEvent
 */
export interface IChartEvent extends IMDControlEvent {
    /**
     * 更新之前
     *
     * @author lxm
     */
    onBeforeUpdate: {
        event: EventBase;
        emitArgs: undefined;
    };
}
//# sourceMappingURL=i-chart.event.d.ts.map