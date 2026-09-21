import { IAppDEViewLogic, IControlLogic } from '@ibiz/model-core';
import { LogicExecutorFactory } from './executor/logic-executor-factory';
import { ControlLogicScheduler } from './scheduler/control-logic-scheduler';
import { ViewLogicScheduler } from './scheduler/view-logic-scheduler';
import { LogicTriggerFactory } from './trigger/logic-trigger-factory';
/**
 * 调度器中心
 * @author lxm
 * @date 2023-06-25 03:30:21
 * @export
 * @class LogicSchedulerFactory
 */
export declare class LogicSchedulerCenter {
    /**
     * 执行器工厂
     * @author lxm
     * @date 2023-06-25 06:41:42
     * @type {LogicExecutorFactory}
     */
    executorFactory: LogicExecutorFactory;
    /**
     * 触发器工厂
     * @author lxm
     * @date 2023-06-25 06:44:12
     * @type {LogicTriggerFactory}
     */
    triggerFactory: LogicTriggerFactory;
    /**
     * 创建视图逻辑调度器实例
     * @author lxm
     * @date 2023-06-25 03:41:43
     * @param {IAppDEViewLogic} logics
     * @return {*}  {ViewLogicScheduler}
     */
    createViewScheduler(logics: IAppDEViewLogic[]): ViewLogicScheduler;
    /**
     * 创建部件逻辑调度器实例
     * @author lxm
     * @date 2023-06-25 03:48:30
     * @param {IControlLogic} logics
     * @return {*}  {ControlLogicScheduler}
     */
    createControlScheduler(logics: IControlLogic[]): ControlLogicScheduler;
}
//# sourceMappingURL=logic-scheduler-center.d.ts.map