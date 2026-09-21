import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 选择视图面板部件事件
 *
 * @export
 * @interface IPickupViewPanelEvent
 * @extends {IControlEvent}
 */
export interface IPickupViewPanelEvent extends IControlEvent {
    /**
     * 选中数据变更事件
     *
     * @type {{
     *         event: EventBase;
     *         emitArgs: { data: IData[] };
     *     }}
     * @memberof IPickupViewPanelEvent
     */
    onSelectionChange: {
        event: EventBase;
        emitArgs: {
            data: IData[];
        };
    };
    /**
     * 激活数据变更事件
     *
     * @author zk
     * @date 2023-05-26 11:05:52
     * @type {{
     *         event: EventBase;
     *         emitArgs: { data: IData[] };
     *     }}
     * @memberof IPickupViewPanelEvent
     */
    onDataActive: {
        event: EventBase;
        emitArgs: {
            data: IData[];
        };
    };
}
//# sourceMappingURL=i-pickup-view-panel.event.d.ts.map