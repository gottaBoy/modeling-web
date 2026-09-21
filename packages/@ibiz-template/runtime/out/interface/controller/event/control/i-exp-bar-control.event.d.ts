import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, NavViewChangeEvent } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 *
 *
 * @author zk
 * @date 2023-05-29 01:05:12
 * @export
 * @interface IExpBarControlEvent
 * @extends {IControlEvent}
 */
export interface IExpBarControlEvent extends IControlEvent {
    /**
     * 导航视图变更事件
     * @author lxm
     * @date 2023-08-09 07:19:00
     */
    onNavViewChange: {
        event: NavViewChangeEvent;
        emitArgs: PartialWithObject<NavViewChangeEvent, EventBase>;
    };
}
//# sourceMappingURL=i-exp-bar-control.event.d.ts.map