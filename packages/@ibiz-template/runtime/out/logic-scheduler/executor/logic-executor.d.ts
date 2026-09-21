import type { ISchedulerLogic, IUILogicParams, LogicType } from '../../interface';
import { LogicScheduler } from '../scheduler/logic-scheduler';
/**
 * 逻辑执行器实例
 * @author lxm
 * @date 2023-06-25 06:07:24
 * @export
 * @class LogicExecutor
 */
export declare class LogicExecutor {
    protected logic: ISchedulerLogic;
    protected scheduler: LogicScheduler;
    /**
     * 执行逻辑类型
     * @author lxm
     * @date 2023-06-25 07:32:04
     */
    type: LogicType;
    /**
     * @author lxm
     * @date 2023-06-25 07:32:57
     * @param {ISchedulerLogic} logic 逻辑
     */
    constructor(logic: ISchedulerLogic, scheduler: LogicScheduler);
    /**
     * 执行逻辑
     * @author lxm
     * @date 2023-06-26 02:55:40
     * @param {IUILogicParams} _executeParams 执行参数
     * @return {*}  {*}
     */
    execute(_executeParams: IUILogicParams): any;
    /**
     * 销毁方法
     * @author lxm
     * @date 2023-07-17 11:48:54
     */
    destroy(): void;
}
//# sourceMappingURL=logic-executor.d.ts.map