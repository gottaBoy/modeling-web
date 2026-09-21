import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 向导面板事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IWizardPanelEvent
 */
export interface IWizardPanelEvent extends IControlEvent {
    /**
     * 完成之后
     *
     * @author lxm
     * @date 2023-02-16 06:17:17
     * @memberof IWizardPanelEvent
     */
    onFinishSuccess: {
        event: EventBase;
        emitArgs: undefined;
    };
}
//# sourceMappingURL=i-wizard-panel.event.d.ts.map