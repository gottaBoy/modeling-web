import { StudioViewEvents } from '../../constant';
import type { ISchedulerLogic, ITriggerMatchParams } from '../../interface';
import { LogicScheduler } from '../scheduler/logic-scheduler';
import { LogicTrigger } from './logic-trigger';

/**
 * 视图事件触发器
 * @author lxm
 * @date 2023-08-14 02:12:44
 * @export
 * @class ViewEventTrigger
 * @extends {LogicTrigger}
 */
export class ViewEventTrigger extends LogicTrigger {
  declare type: 'VIEWEVENT';

  /**
   * 监听事件名称集合
   * @author lxm
   * @date 2023-07-26 05:48:30
   * @protected
   * @type {string[]}
   */
  protected listenEventNames: string[] = [];

  constructor(
    protected logic: ISchedulerLogic,
    protected scheduler: LogicScheduler,
    protected scriptArgKeys: string[] = [],
  ) {
    super(logic, scheduler, scriptArgKeys);
    const names = logic.eventNames!.split(';');
    this.listenEventNames = names.map(
      name => StudioViewEvents[name as keyof StudioViewEvents] || name,
    );
  }

  match(matchParams: ITriggerMatchParams): boolean {
    const superResult = super.match(matchParams);
    return (
      superResult && this.listenEventNames.includes(matchParams.eventName!)
    );
  }
}
