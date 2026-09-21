import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, UIActionEvent } from '../argument';
import { IComponentEvent } from '../common/i-component.event';
/**
 * 部件通用事件
 *
 * @author lxm
 * @date 2022-09-13 10:09:28
 * @export
 * @interface IControlEvent
 */
export interface IControlEvent extends IComponentEvent {
    /**
     * 界面行为执行事件
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {UIActionEvent} event
     * @return {*}  {Promise<void>}
     */
    onUIAction: {
        event: UIActionEvent;
        emitArgs: PartialWithObject<UIActionEvent, EventBase>;
    };
    /**
     * 刷新成功事件
     *
     * @author tony001
     * @date 2025-01-09 17:01:14
     * @type {{
     *     event: EventBase;
     *     emitArgs: { data: IData[] };
     *   }}
     */
    onRefreshSuccess: {
        event: EventBase;
        emitArgs: {
            data: IData[];
        };
    };
}
//# sourceMappingURL=i-control.event.d.ts.map