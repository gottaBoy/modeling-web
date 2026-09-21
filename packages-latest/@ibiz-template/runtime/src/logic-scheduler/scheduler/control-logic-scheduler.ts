import { IControlLogic } from '@ibiz/model-core';
import type { ISchedulerLogic } from '../../interface';
import { LogicScheduler } from './logic-scheduler';

/**
 * 部件逻辑调度器实例类
 * @author lxm
 * @date 2023-06-25 03:36:32
 * @export
 * @class ViewLogicScheduler
 * @extends {LogicScheduler}
 */
export class ControlLogicScheduler extends LogicScheduler {
  constructor(logics: IControlLogic[], scriptArgKeys: string[] = []) {
    // 部件逻辑把APPVIEWENGINE排除掉。
    const filterLogics = logics.filter(
      item => item.triggerType !== 'APPVIEWENGINE',
    );
    filterLogics.forEach(logic => {
      // 部件事件的部件名称在itemName上，当itemName没有时说明是部件自身触发此时名称在logicTag上，统一写到ctrlName,与视图逻辑保持一致。
      if (logic.triggerType === 'CTRLEVENT') {
        (logic as IData).ctrlName = logic.itemName || logic.logicTag;
      }
    });
    super(filterLogics as ISchedulerLogic[], scriptArgKeys);
  }
}
