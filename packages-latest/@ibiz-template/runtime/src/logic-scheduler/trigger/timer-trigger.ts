import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { LogicTrigger } from './logic-trigger';
import { ScriptExecutor } from '../executor/script-executor';

/**
 * 定时器触发
 * @author lxm
 * @date 2023-07-17 12:53:35
 * @export
 * @class TimerTrigger
 * @extends {LogicTrigger}
 */
export class TimerTrigger extends LogicTrigger {
  declare type: 'TIMER';

  protected timer: number | null = null;

  start(): void {
    if (!this.logic.timer) {
      throw new RuntimeModelError(
        this.logic,
        ibiz.i18n.t('runtime.logicScheduler.trigger.timerLacks'),
      );
    }
    this.timer = setInterval(() => {
      if (!this.scheduler.defaultParamsCb) {
        throw new RuntimeError(
          ibiz.i18n.t('runtime.logicScheduler.trigger.parameterCallback'),
        );
      }
      const params = this.scheduler.defaultParamsCb();
      this.executor!.execute(params);
    }, this.logic.timer) as unknown as number;
  }

  /**
   * @description 绑定脚本执行器
   * @param {ScriptExecutor} executor
   * @memberof TimerTrigger
   */
  bindScriptExecutor(executor: ScriptExecutor): void {
    if (!executor.initialized) {
      executor.init([], executeParams => executeParams, {
        isAsync: true,
        singleRowReturn: false,
      });
    }
  }

  destroy(): void {
    super.destroy();
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
