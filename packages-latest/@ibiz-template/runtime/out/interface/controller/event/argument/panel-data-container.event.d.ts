import { EventBase } from './base.event';
export declare enum PanelDataContainerEventName {
    /**
     * 加载成功
     */
    onLoadSuccess = "onLoadSuccess"
}
/**
 * @description 面板数据容器事件
 * @export
 * @interface PanelDataContainerEvent
 * @extends {EventBase}
 */
export interface PanelDataContainerEvent extends EventBase {
    /**
     * @description 触发的面板数据容器名称
     * @type {string}
     * @memberof PanelDataContainerEvent
     */
    panelDataContainerName: string;
    /**
     * @description 触发的面板数据容器事件的名称
     * @type {PanelDataContainerEventName}
     * @memberof PanelDataContainerEvent
     */
    panelDataContainerEventName: PanelDataContainerEventName;
}
//# sourceMappingURL=panel-data-container.event.d.ts.map