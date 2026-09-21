import type { IUILogicParams, ISchedulerLogic, ITriggerMatchParams, TriggerType } from '../../interface';
import { LogicExecutor } from '../executor/logic-executor';
import { ScriptExecutor } from '../executor/script-executor';
import { LogicScheduler } from '../scheduler/logic-scheduler';
/**
 * 逻辑触发器
 * @author lxm
 * @date 2023-06-25 06:09:22
 * @export
 * @class LogicTrigger
 */
export declare class LogicTrigger {
    protected logic: ISchedulerLogic;
    protected scheduler: LogicScheduler;
    /**
     *
     * @author lxm
     * @date 2023-06-25 07:32:04
     */
    type: TriggerType;
    /**
     * @author lxm
     * @date 2023-06-25 07:32:57
     * @param {ISchedulerLogic} logic 逻辑
     */
    constructor(logic: ISchedulerLogic, scheduler: LogicScheduler);
    /**
     * 执行器
     * @author lxm
     * @date 2023-06-25 07:25:05
     * @type {LogicExecutor}
     */
    executor?: LogicExecutor;
    /**
     * 绑定执行器
     * @author lxm
     * @date 2023-06-25 07:25:13
     * @param {LogicExecutor} executor
     */
    bindExecutor(executor: LogicExecutor): void;
    /**
     * 绑定脚本执行器
     * @author lxm
     * @date 2023-08-21 04:33:35
     * @param {ScriptExecutor} executor
     */
    bindScriptExecutor(executor: ScriptExecutor): void;
    /**
     * 匹配触发器，返回true表示该触发器满足触发条件。
     * @author lxm
     * @date 2023-06-25 07:49:00
     * @param {IData} _args
     * @return {*}  {boolean}
     */
    match(matchParams: ITriggerMatchParams): boolean;
    /**
     * 执行对应的执行器
     * @author lxm
     * @date 2023-06-26 01:45:42
     * @param {Partial<IUILogicParams>} executeParams
     * @return {*}
     */
    execute(executeParams: IUILogicParams): any;
    /**
     * 销毁方法
     * @author lxm
     * @date 2023-07-17 11:48:54
     */
    destroy(): void;
}
//# sourceMappingURL=logic-trigger.d.ts.map