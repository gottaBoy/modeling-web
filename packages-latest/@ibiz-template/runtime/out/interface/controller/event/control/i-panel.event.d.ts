import { PartialWithObject } from '@ibiz-template/core';
import { ControlTriggerEvent, EventBase, PanelDataContainerEvent, PanelItemEvent, PresetPanelItemEvent } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * @description 面板部件事件
 * @primary
 * @export
 * @interface IPanelEvent
 * @extends {IControlEvent}
 */
export interface IPanelEvent extends IControlEvent {
    /**
     * @description 面板里的部件事件
     * @type {{
     *     event: ControlTriggerEvent;
     *     emitArgs: PartialWithObject<ControlTriggerEvent, EventBase>;
     *   }}
     * @memberof IPanelEvent
     */
    onControlEvent: {
        event: ControlTriggerEvent;
        emitArgs: PartialWithObject<ControlTriggerEvent, EventBase>;
    };
    /**
     * @description 面板里的面板成员事件
     * @type {{
     *     event: PanelItemEvent;
     *     emitArgs: PartialWithObject<PanelItemEvent, EventBase>;
     *   }}
     * @memberof IPanelEvent
     */
    onPanelItemEvent: {
        event: PanelItemEvent;
        emitArgs: PartialWithObject<PanelItemEvent, EventBase>;
    };
    /**
     * @description 面板里的预设成员事件,现有嵌入视图初始化完成（onViewCreated）
     * @type {{
     *     event: EventBase;
     *     emitArgs: PartialWithObject<PresetPanelItemEvent, EventBase>;
     *   }}
     * @memberof IPanelEvent
     */
    onPresetPanelItemEvent: {
        event: EventBase;
        emitArgs: PartialWithObject<PresetPanelItemEvent, EventBase>;
    };
    /**
     * @description 面板里的数据容器事件
     * @type {{
     *     event: PanelDataContainerEvent;
     *     emitArgs: PartialWithObject<PanelDataContainerEvent, EventBase>;
     *   }}
     * @memberof IPanelEvent
     */
    onPanelDataContainerEvent: {
        event: PanelDataContainerEvent;
        emitArgs: PartialWithObject<PanelDataContainerEvent, EventBase>;
    };
}
//# sourceMappingURL=i-panel.event.d.ts.map