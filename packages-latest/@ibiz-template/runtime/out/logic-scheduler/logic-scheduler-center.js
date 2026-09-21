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
export class LogicSchedulerCenter {
    constructor() {
        /**
         * 执行器工厂
         * @author lxm
         * @date 2023-06-25 06:41:42
         * @type {LogicExecutorFactory}
         */
        this.executorFactory = new LogicExecutorFactory();
        /**
         * 触发器工厂
         * @author lxm
         * @date 2023-06-25 06:44:12
         * @type {LogicTriggerFactory}
         */
        this.triggerFactory = new LogicTriggerFactory();
    }
    /**
     * @description 创建视图逻辑调度器实例
     * @param {IAppDEViewLogic[]} logics
     * @param {string[]} [scriptArgKeys=[]]
     * @returns {*}  {ViewLogicScheduler}
     * @memberof LogicSchedulerCenter
     */
    createViewScheduler(logics, scriptArgKeys = []) {
        return new ViewLogicScheduler(logics, scriptArgKeys);
    }
    /**
     * @description 创建部件逻辑调度器实例
     * @param {IControlLogic[]} logics
     * @param {string[]} [scriptArgKeys=[]]
     * @returns {*}  {ControlLogicScheduler}
     * @memberof LogicSchedulerCenter
     */
    createControlScheduler(logics, scriptArgKeys = []) {
        return new ControlLogicScheduler(logics, scriptArgKeys);
    }
}
