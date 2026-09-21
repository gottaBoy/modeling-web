import { ModelError } from '@ibiz-template/core';
import type { ISchedulerLogic } from '../../interface';
import { LogicScheduler } from '../scheduler/logic-scheduler';
import { LogicTrigger } from './logic-trigger';

/**
 * 逻辑触发器工厂
 * @author lxm
 * @date 2023-06-25 06:37:54
 * @export
 * @class LogicTriggerFactory
 */
export class LogicTriggerFactory {
  /**
   * 构造回调方法集合
   * @author lxm
   * @date 2023-06-25 06:53:31
   */
  constructorMap = new Map<
    string,
    (
      logic: ISchedulerLogic,
      scheduler: LogicScheduler,
      scriptArgKeys?: string[],
    ) => LogicTrigger
  >();

  /**
   * 注册
   * @author lxm
   * @date 2023-06-25 06:54:17
   * @param {string} key 注册标识
   * @param {(logic: ISchedulerLogic, scheduler: LogicScheduler) => LogicTrigger} callback
   */
  register(
    key: string,
    callback: (
      logic: ISchedulerLogic,
      scheduler: LogicScheduler,
      scriptArgKeys?: string[],
    ) => LogicTrigger,
  ): void {
    this.constructorMap.set(key, callback);
  }

  /**
   * 创建触发器实例
   * @author lxm
   * @date 2023-06-25 06:56:32
   * @param {ISchedulerLogic} logic
   * @return {*}
   */
  createTrigger(
    logic: ISchedulerLogic,
    scheduler: LogicScheduler,
    scriptArgKeys: string[] = [],
  ): LogicTrigger {
    const constructor = this.constructorMap.get(logic.triggerType);
    if (!constructor) {
      throw new ModelError(
        logic,
        ibiz.i18n.t('runtime.logicScheduler.trigger.noSupportedType', {
          triggerType: logic.triggerType,
        }),
      );
    }
    return constructor(logic, scheduler, scriptArgKeys);
  }
}
