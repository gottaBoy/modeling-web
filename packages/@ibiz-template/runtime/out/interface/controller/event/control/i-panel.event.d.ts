import { PartialWithObject } from '@ibiz-template/core';
import { ControlTriggerEvent, EventBase, PanelItemEvent, PresetPanelItemEvent } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 面板部件事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IPanelEvent
 */
export interface IPanelEvent extends IControlEvent {
    /**
     * 面板里的部件事件监听
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {EventBase} event
     * @return {*}  {Promise<void>}
     */
    onControlEvent: {
        event: ControlTriggerEvent;
        emitArgs: PartialWithObject<ControlTriggerEvent, EventBase>;
    };
    /**
     * 面板里的面板成员事件监听
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {EventBase} event
     * @return {*}  {Promise<void>}
     */
    onPanelItemEvent: {
        event: PanelItemEvent;
        emitArgs: PartialWithObject<PanelItemEvent, EventBase>;
    };
    /**
     * 面板里的预设成员事件监听
     *
     * @author tony001
     * @date 2024-08-30 15:08:27
     * @type {{
     *     event: EventBase;
     *     emitArgs: PartialWithObject<PresetPanelItemEvent, EventBase>;
     *   }}
     */
    onPresetPanelItemEvent: {
        event: EventBase;
        emitArgs: PartialWithObject<PresetPanelItemEvent, EventBase>;
    };
}
//# sourceMappingURL=i-panel.event.d.ts.map