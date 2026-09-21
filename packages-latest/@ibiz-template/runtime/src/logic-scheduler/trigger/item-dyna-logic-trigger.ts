import { RuntimeError } from '@ibiz-template/core';
import type { ITriggerMatchParams, IUILogicParams } from '../../interface';
import { LogicExecutor } from '../executor/logic-executor';
import { ScriptExecutor } from '../executor/script-executor';
import { LogicTrigger } from './logic-trigger';

export class ItemDynaLogicTrigger extends LogicTrigger {
  declare type: 'ITEMVISIBLE' | 'ITEMENABLE' | 'ITEMBLANK';

  declare executor: ScriptExecutor;

  bindExecutor(executor: LogicExecutor): void {
    super.bindExecutor(executor);
    if (this.executor.type !== 'SCRIPT') {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.logicScheduler.trigger.triggerType'),
      );
    }
  }

  bindScriptExecutor(executor: ScriptExecutor): void {
    executor.init(
      ['context', 'viewparams', 'data', 'env', 'view', 'ctrl'],
      executeParams => {
        const { context, params, data, view, ctrl } = executeParams;
        return {
          context,
          params,
          data: data?.[0] || {},
          env: ibiz.env,
          view,
          ctrl,
        };
      },
      {
        singleRowReturn: true,
        isAsync: false,
      },
    );
  }

  match(matchParams: ITriggerMatchParams): boolean {
    const superResult = super.match(matchParams);
    return (
      superResult &&
      // 忽略大小写匹配
      matchParams.itemName?.toLowerCase() === this.logic.itemName?.toLowerCase()
    );
  }

  execute(executeParams: IUILogicParams): boolean {
    const result = this.executor.execute(executeParams);
    return !!result;
  }
}
