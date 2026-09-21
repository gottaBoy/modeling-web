import { IAppDEViewLogic } from '@ibiz/model-core';
import type { EventBase, ISchedulerLogic } from '../../interface';
import { LogicScheduler } from './logic-scheduler';

/**
 * 视图逻辑调度器实例类
 * @author lxm
 * @date 2023-06-25 03:36:32
 * @export
 * @class ViewLogicScheduler
 * @extends {LogicScheduler}
 */
export class ViewLogicScheduler extends LogicScheduler {
  constructor(logics: IAppDEViewLogic[], scriptArgKeys: string[] = []) {
    logics.forEach(logic => {
      // 视图逻辑的触发类型logicTrigger统一成triggerType
      (logic as IData).triggerType = logic.logicTrigger!;
    });
    super(logics as IData[] as ISchedulerLogic[], scriptArgKeys);
  }

  /**
   * 触发视图事件
   * @author lxm
   * @date 2023-06-26 02:26:33
   * @param {EventBase} event 事件对象
   * @return {*}  {Promise<void>}
   */
  async triggerViewEvent(event: EventBase): Promise<void> {
    const matchParams = {
      eventName: event.eventName,
      triggerType: 'VIEWEVENT',
    } as const;
    const result = this.triggerAndExecute(matchParams, event);
    if (result?.length) {
      await Promise.all(result);
    }
  }
}
