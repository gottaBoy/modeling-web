import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 报表面板事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IReportPanelEvent
 */
export interface IReportPanelEvent extends IControlEvent {
    /**
     * 加载之前
     *
     * @author lxm
     */
    onBeforeLoad: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 加载成功后
     *
     * @author lxm
     */
    onLoadSuccess: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 加载失败
     *
     * @author lxm
     */
    onLoadError: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 保存之前
     *
     * @author lxm
     */
    onBeforeSave: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 保存成功后
     *
     * @author lxm
     */
    onSaveSuccess: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 保存失败
     *
     * @author lxm
     */
    onSaveError: {
        event: EventBase;
        emitArgs: undefined;
    };
}
//# sourceMappingURL=i-report-panel.event.d.ts.map