import type { ISchedulerLogic, ITriggerMatchParams } from '../../interface';
import { LogicScheduler } from '../scheduler/logic-scheduler';
import { LogicTrigger } from './logic-trigger';
/**
 * 视图事件触发器
 * @author lxm
 * @date 2023-08-14 02:12:44
 * @export
 * @class ViewEventTrigger
 * @extends {LogicTrigger}
 */
export declare class ViewEventTrigger extends LogicTrigger {
    protected logic: ISchedulerLogic;
    protected scheduler: LogicScheduler;
    protected scriptArgKeys: string[];
    type: 'VIEWEVENT';
    /**
     * 监听事件名称集合
     * @author lxm
     * @date 2023-07-26 05:48:30
     * @protected
     * @type {string[]}
     */
    protected listenEventNames: string[];
    constructor(logic: ISchedulerLogic, scheduler: LogicScheduler, scriptArgKeys?: string[]);
    match(matchParams: ITriggerMatchParams): boolean;
}
//# sourceMappingURL=view-event-trigger.d.ts.map