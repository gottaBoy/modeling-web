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
export class LogicSchedulerCenter {
  /**
   * 执行器工厂
   * @author lxm
   * @date 2023-06-25 06:41:42
   * @type {LogicExecutorFactory}
   */
  executorFactory: LogicExecutorFactory = new LogicExecutorFactory();

  /**
   * 触发器工厂
   * @author lxm
   * @date 2023-06-25 06:44:12
   * @type {LogicTriggerFactory}
   */
  triggerFactory: LogicTriggerFactory = new LogicTriggerFactory();

  /**
   * @description 创建视图逻辑调度器实例
   * @param {IAppDEViewLogic[]} logics
   * @param {string[]} [scriptArgKeys=[]]
   * @returns {*}  {ViewLogicScheduler}
   * @memberof LogicSchedulerCenter
   */
  createViewScheduler(
    logics: IAppDEViewLogic[],
    scriptArgKeys: string[] = [],
  ): ViewLogicScheduler {
    return new ViewLogicScheduler(logics, scriptArgKeys);
  }

  /**
   * @description 创建部件逻辑调度器实例
   * @param {IControlLogic[]} logics
   * @param {string[]} [scriptArgKeys=[]]
   * @returns {*}  {ControlLogicScheduler}
   * @memberof LogicSchedulerCenter
   */
  createControlScheduler(
    logics: IControlLogic[],
    scriptArgKeys: string[] = [],
  ): ControlLogicScheduler {
    return new ControlLogicScheduler(logics, scriptArgKeys);
  }
}
