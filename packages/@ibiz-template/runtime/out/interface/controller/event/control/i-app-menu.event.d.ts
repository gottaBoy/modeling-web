import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 应用菜单事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IAppMenuEvent
 */
export interface IAppMenuEvent extends IControlEvent {
    /**
     * 菜单点击事件
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {EventBase} event
     * @return {*}  {Promise<void>}
     */
    onClick: {
        event: EventBase;
        emitArgs: {
            eventArg: string;
            event?: MouseEvent;
        };
    };
}
//# sourceMappingURL=i-app-menu.event.d.ts.map