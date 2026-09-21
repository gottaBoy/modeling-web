import { PartialWithObject } from '@ibiz-template/core';
import { NavViewChangeEvent, EventBase, TabChangeEvent } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 分页导航面板
 *
 * @export
 * @interface ITabExpPanelEvent
 * @extends {IControlEvent}
 */
export interface ITabExpPanelEvent extends IControlEvent {
    /**
     * 导航视图变更事件
     * @author lxm
     * @date 2023-08-09 07:19:00
     */
    onNavViewChange: {
        event: NavViewChangeEvent;
        emitArgs: PartialWithObject<NavViewChangeEvent, EventBase>;
    };
    /**
     * Tab分页变化
     *
     * @author tony001
     * @date 2024-04-14 00:04:49
     * @type {{
     *     event: TabChangeEvent;
     *     emitArgs: { data: IData[] };
     *   }}
     */
    onTabChange: {
        event: TabChangeEvent;
        emitArgs: PartialWithObject<TabChangeEvent, EventBase>;
    };
}
//# sourceMappingURL=i-tab-exp-panel.event.d.ts.map