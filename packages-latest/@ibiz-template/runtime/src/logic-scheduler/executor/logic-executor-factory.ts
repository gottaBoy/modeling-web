import { ModelError } from '@ibiz-template/core';
import type { ISchedulerLogic } from '../../interface';
import { LogicScheduler } from '../scheduler/logic-scheduler';
import { LogicExecutor } from './logic-executor';

/**
 * 逻辑执行工厂
 * @author lxm
 * @date 2023-06-25 06:37:54
 * @export
 * @class LogicExecutorFactory
 */
export class LogicExecutorFactory {
  /**
   * 构造回调方法集合
   * @author lxm
   * @date 2023-06-25 06:53:31
   */
  constructorMap = new Map<
    string,
    (logic: ISchedulerLogic, scheduler: LogicScheduler) => LogicExecutor
  >();

  /**
   * 注册
   * @author lxm
   * @date 2023-06-25 06:54:17
   * @param {string} key 注册标识
   * @param {(logic: ISchedulerLogic, scheduler: LogicScheduler) => LogicExecutor} callback
   */
  register(
    key: string,
    callback: (
      logic: ISchedulerLogic,
      scheduler: LogicScheduler,
    ) => LogicExecutor,
  ): void {
    this.constructorMap.set(key, callback);
  }

  /**
   * 创建执行器实例
   * @author lxm
   * @date 2023-06-25 06:59:51
   * @param {ISchedulerLogic} logic
   * @return {*}
   */
  createExecutor(
    logic: ISchedulerLogic,
    scheduler: LogicScheduler,
  ): LogicExecutor {
    const constructor = this.constructorMap.get(logic.logicType);
    if (!constructor) {
      throw new ModelError(
        logic,
        ibiz.i18n.t('runtime.logicScheduler.executor.logicType', {
          logicType: logic.logicType,
        }),
      );
    }
    return constructor(logic, scheduler);
  }
}
