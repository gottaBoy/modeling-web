import { RuntimeModelError } from '@ibiz-template/core';
import { IUILogicParams } from '../../interface';
import { execUILogic } from '../../ui-logic';
import { LogicExecutor } from './logic-executor';

/**
 * 应用实体界面逻辑执行器
 * @author lxm
 * @date 2023-07-17 01:57:27
 * @export
 * @class AppDEUILogicExecutor
 * @extends {LogicExecutor}
 */
export class AppDEUILogicExecutor extends LogicExecutor {
  declare type: 'APPDEUILOGIC';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(executeParams: IUILogicParams): any {
    const { appDEUILogicId, appDataEntityId } = this.logic;
    if (!appDEUILogicId) {
      throw new RuntimeModelError(
        this.logic,
        ibiz.i18n.t('runtime.logicScheduler.executor.noConfiguredLogic'),
      );
    }
    return execUILogic(appDEUILogicId!, appDataEntityId!, executeParams);
  }
}
