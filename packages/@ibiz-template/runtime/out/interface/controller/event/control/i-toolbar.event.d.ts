import { PartialWithObject } from '@ibiz-template/core';
import { EventBase } from '../argument';
import { ToolbarClickEvent } from '../argument/toolbar-click.event';
import { IControlEvent } from './i-control.event';
/**
 * 工具栏事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:14
 * @export
 * @interface IToolbarEvent
 */
export interface IToolbarEvent extends IControlEvent {
    /**
     * 工具栏点击事件
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {EventBase} event
     * @return {*}  {Promise<void>}
     */
    onClick: {
        event: ToolbarClickEvent;
        emitArgs: PartialWithObject<ToolbarClickEvent, EventBase>;
    };
}
//# sourceMappingURL=i-toolbar.event.d.ts.map