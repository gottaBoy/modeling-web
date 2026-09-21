import { EventBase } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 数据看板部件事件
 *
 * @author lxm
 * @date 2022-09-10 16:09:58
 * @export
 * @interface IDashboardEvent
 * @extends {IControlEvent}
 */
export interface IDashboardEvent extends IControlEvent {
    /**
     * 配置信息改变
     *
     * @author zzq
     */
    onConfigChange: {
        event: EventBase;
        emitArgs: {
            name: string;
            config: IData;
        };
    };
    /**
     * 重置门户配置
     *
     * @author zzq
     */
    onResetPortlet: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 保存门户配置
     *
     * @author zzq
     */
    onSavePortlet: {
        event: EventBase;
        emitArgs: IData;
    };
    /**
     * @description 初始化门户部件
     * @type {{
     *     event: EventBase;
     *     emitArgs: undefined;
     *   }}
     * @memberof IDashboardEvent
     */
    onInitPortlets: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 门户部件项模型重置
     *
     * @author tony001
     * @date 2024-07-23 20:07:18
     * @type {{
     *     event: EventBase;
     *     emitArgs: {
     *       name: string;
     *       model: IModel;
     *     };
     *   }}
     */
    onItemModelReset: {
        event: EventBase;
        emitArgs: {
            name: string;
        };
    };
}
//# sourceMappingURL=i-dashboard.event.d.ts.map