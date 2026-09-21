import { IAppDEViewLogic } from '@ibiz/model-core';
import type { EventBase } from '../../interface';
import { LogicScheduler } from './logic-scheduler';
/**
 * 视图逻辑调度器实例类
 * @author lxm
 * @date 2023-06-25 03:36:32
 * @export
 * @class ViewLogicScheduler
 * @extends {LogicScheduler}
 */
export declare class ViewLogicScheduler extends LogicScheduler {
    constructor(logics: IAppDEViewLogic[], scriptArgKeys?: string[]);
    /**
     * 触发视图事件
     * @author lxm
     * @date 2023-06-26 02:26:33
     * @param {EventBase} event 事件对象
     * @return {*}  {Promise<void>}
     */
    triggerViewEvent(event: EventBase): Promise<void>;
}
//# sourceMappingURL=view-logic-scheduler.d.ts.map