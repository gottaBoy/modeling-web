import { RuntimeError } from '@ibiz-template/core';
import type {
  IUILogicParams,
  ISchedulerLogic,
  ITriggerMatchParams,
  TriggerType,
} from '../../interface';
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
export class LogicTrigger {
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
  constructor(
    protected logic: ISchedulerLogic,
    protected scheduler: LogicScheduler,
    protected scriptArgKeys: string[] = [],
  ) {
    this.type = logic.triggerType;
  }

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
  bindExecutor(executor: LogicExecutor): void {
    this.executor = executor;
    if (this.executor.type === 'SCRIPT') {
      this.bindScriptExecutor(executor as ScriptExecutor);
    }
  }

  /**
   * 绑定脚本执行器
   * @author lxm
   * @date 2023-08-21 04:33:35
   * @param {ScriptExecutor} executor
   */
  bindScriptExecutor(executor: ScriptExecutor): void {
    if (!executor.initialized) {
      executor.init(this.scriptArgKeys, executeParams => executeParams, {
        isAsync: true,
        singleRowReturn: false,
      });
    }
  }

  /**
   * 匹配触发器，返回true表示该触发器满足触发条件。
   * @author lxm
   * @date 2023-06-25 07:49:00
   * @param {IData} _args
   * @return {*}  {boolean}
   */
  match(matchParams: ITriggerMatchParams): boolean {
    return matchParams.triggerType === this.type;
  }

  /**
   * 执行对应的执行器
   * @author lxm
   * @date 2023-06-26 01:45:42
   * @param {Partial<IUILogicParams>} executeParams
   * @return {*}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(executeParams: IUILogicParams): any {
    if (this.executor) {
      return this.executor.execute(executeParams);
    }
    throw new RuntimeError(
      ibiz.i18n.t('runtime.logicScheduler.trigger.noExecutorBound', {
        id: this.logic.id,
      }),
    );
  }

  /**
   * 销毁方法
   * @author lxm
   * @date 2023-07-17 11:48:54
   */
  destroy(): void {
    this.executor = undefined;
  }
}
