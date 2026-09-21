import type { ISchedulerLogic, ITriggerMatchParams } from '../../interface';
import { LogicScheduler } from '../scheduler/logic-scheduler';
import { LogicTrigger } from './logic-trigger';
/**
 * 部件事件触发器
 * @author lxm
 * @date 2023-08-14 02:10:46
 * @export
 * @class ControlEventTrigger
 * @extends {LogicTrigger}
 */
export declare class ControlEventTrigger extends LogicTrigger {
    protected logic: ISchedulerLogic;
    protected scheduler: LogicScheduler;
    protected scriptArgKeys: string[];
    type: 'CTRLEVENT';
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
//# sourceMappingURL=control-event-trigger.d.ts.map