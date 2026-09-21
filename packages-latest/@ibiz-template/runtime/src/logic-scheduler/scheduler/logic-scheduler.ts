import { mergeLeft } from 'ramda';
import type {
  IUILogicParams,
  ISchedulerLogic,
  ITriggerMatchParams,
} from '../../interface';
import { LogicExecutor } from '../executor/logic-executor';
import { LogicTrigger } from '../trigger/logic-trigger';
import { TimerTrigger } from '../trigger/timer-trigger';

/**
 * 逻辑调度器实例类
 * @author lxm
 * @date 2023-06-25 03:35:46
 * @export
 * @class LogicScheduler
 */
export class LogicScheduler {
  logics: ISchedulerLogic[];

  triggers = new Map<string, LogicTrigger>();

  executors = new Map<string, LogicExecutor>();

  /**
   * 是否有视图事件触发类型逻辑
   * @author lxm
   * @date 2023-08-14 02:19:51
   * @type {boolean}
   */
  hasViewEventTrigger: boolean = false;

  /**
   * 是否有部件事件触发类型逻辑
   * @author lxm
   * @date 2023-08-14 02:19:51
   * @type {boolean}
   */
  hasControlEventTrigger: boolean = false;

  /**
   * @description 是否销毁
   * @type {boolean}
   * @memberof LogicScheduler
   */
  isDestroyed: boolean = false;

  constructor(logics: ISchedulerLogic[], scriptArgKeys: string[] = []) {
    this.logics = logics;
    logics.forEach(logic => {
      try {
        const executor = this.createExecutor(logic);
        this.executors.set(logic.id, executor);
        const trigger = this.createTrigger(logic, scriptArgKeys);
        this.triggers.set(logic.id, trigger);
        trigger.bindExecutor(executor);
      } catch (error) {
        if ((logic.logicType as string) === 'CUSTOM') {
          ibiz.log.warn((error as IData).message);
        } else {
          ibiz.log.error((error as IData).message);
        }
      }
    });
  }

  /**
   * 销毁方法
   * @author lxm
   * @date 2023-07-17 11:47:51
   */
  destroy(): void {
    this.triggers.forEach(trigger => trigger.destroy());
    this.executors.forEach(executor => executor.destroy());
    this.isDestroyed = true;
  }

  /**
   * 默认参数回调
   * @author lxm
   * @date 2023-06-25 08:25:51
   */
  defaultParamsCb?: () => IUILogicParams;

  /**
   * 获取执行参数,把默认参数和调用参数合并
   * @author lxm
   * @date 2023-06-25 08:28:34
   * @param {IData} args
   * @return {*}
   */
  getExecuteParams(executeParams: Partial<IUILogicParams>): IUILogicParams {
    let defaultParams = {};
    if (this.defaultParamsCb) {
      defaultParams = this.defaultParamsCb();
    }
    return mergeLeft(executeParams, defaultParams) as IUILogicParams;
  }

  /**
   * 创建触发器实例
   * @author lxm
   * @date 2023-06-26 02:33:35
   * @protected
   * @param {ISchedulerLogic} logic
   * @return {*}  {LogicTrigger}
   */
  protected createTrigger(
    logic: ISchedulerLogic,
    scriptArgKeys: string[] = [],
  ): LogicTrigger {
    switch (logic.triggerType) {
      case 'VIEWEVENT':
        this.hasViewEventTrigger = true;
        break;
      case 'CTRLEVENT':
        this.hasControlEventTrigger = true;
        break;
      default:
    }
    return ibiz.scheduler.triggerFactory.createTrigger(
      logic,
      this,
      scriptArgKeys,
    );
  }

  /**
   * 创建执行器实例
   * @author lxm
   * @date 2023-06-26 02:33:52
   * @protected
   * @param {ISchedulerLogic} logic
   * @return {*}  {LogicExecutor}
   */
  protected createExecutor(logic: ISchedulerLogic): LogicExecutor {
    return ibiz.scheduler.executorFactory.createExecutor(logic, this);
  }

  /**
   * 获取匹配的触发器。
   * @author lxm
   * @date 2023-06-26 02:32:24
   * @param {ITriggerMatchParams} matchParams
   * @return {*}  {LogicTrigger[]}
   */
  protected getMatchTriggers(matchParams: ITriggerMatchParams): LogicTrigger[] {
    const triggers: LogicTrigger[] = [];
    this.triggers.forEach(trigger => {
      if (trigger.match(matchParams)) {
        triggers.push(trigger);
      }
    });
    return triggers;
  }

  /**
   * 找到匹配的触发器并执行对应的执行器，并返回结果。
   * 返回undefined表示没有匹配的触发器。
   * @author lxm
   * @date 2023-06-26 02:30:24
   * @param {ITriggerMatchParams} matchParams 匹配参数
   * @param {Partial<IUILogicParams>} [executeParams={}] 执行参数
   * @return {*}  {(any[] | undefined)}
   */
  triggerAndExecute(
    matchParams: ITriggerMatchParams,
    executeParams: Partial<IUILogicParams> = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any[] | undefined {
    if (this.isDestroyed) {
      return;
    }
    const triggers = this.getMatchTriggers(matchParams);
    if (triggers.length > 0) {
      const params = this.getExecuteParams(executeParams);
      const result = triggers.map(trigger => {
        return trigger.execute(params);
      });
      return result;
    }
  }

  /**
   * 预定义项的动态逻辑
   * @author lxm
   * @date 2023-06-26 02:29:08
   * @protected
   * @param {string} itemName 子项名称
   * @param {('ITEMVISIBLE' | 'ITEMENABLE' | 'ITEMBLANK')} triggerType 预定义逻辑类型
   * @param {Partial<IUILogicParams>} executeParams 执行参数
   * @return {*}  {(boolean | undefined)}
   */
  protected triggerItemDynaLogic(
    itemName: string,
    triggerType: 'ITEMVISIBLE' | 'ITEMENABLE' | 'ITEMBLANK',
    executeParams: Partial<IUILogicParams>,
  ): boolean | undefined {
    const matchParams = { itemName, triggerType };
    const result = this.triggerAndExecute(matchParams, executeParams);
    if (result?.length) {
      return result.pop();
    }
  }

  /**
   * 预定义项显示逻辑
   * @author lxm
   * @date 2023-06-26 02:26:36
   * @param {string} itemName 子项名称
   * @param {Partial<IUILogicParams>} executeParams 执行参数
   * @return {*}  {(boolean | undefined)}
   */
  triggerItemVisible(
    itemName: string,
    executeParams: Partial<IUILogicParams>,
  ): boolean | undefined {
    return this.triggerItemDynaLogic(itemName, 'ITEMVISIBLE', executeParams);
  }

  /**
   * 预定义项启用逻辑
   * @author lxm
   * @date 2023-06-26 02:26:35
   * @param {string} itemName 子项名称
   * @param {Partial<IUILogicParams>} executeParams 执行参数
   * @return {*}  {(boolean | undefined)}
   */
  triggerItemEnable(
    itemName: string,
    executeParams: Partial<IUILogicParams>,
  ): boolean | undefined {
    return this.triggerItemDynaLogic(itemName, 'ITEMENABLE', executeParams);
  }

  /**
   * 预定义项空输入逻辑
   * @author lxm
   * @date 2023-06-26 02:26:33
   * @param {string} itemName 子项名称
   * @param {Partial<IUILogicParams>} executeParams 执行参数
   * @return {*}  {(boolean | undefined)}
   */
  triggerItemBlank(
    itemName: string,
    executeParams: Partial<IUILogicParams>,
  ): boolean | undefined {
    return this.triggerItemDynaLogic(itemName, 'ITEMBLANK', executeParams);
  }

  /**
   * 定时器触发开始启用并计时
   * @author lxm
   * @date 2023-07-17 01:49:14
   */
  startTimerTrigger(): void {
    const triggers = this.getMatchTriggers({ triggerType: 'TIMER' });
    triggers.forEach(trigger => (trigger as TimerTrigger).start());
  }

  /**
   * 执行自定义触发逻辑类型的视图逻辑
   * @author lxm
   * @date 2023-07-17 07:44:12
   * @param {string} id
   * @param {Partial<IUILogicParams>} executeParams
   * @return {*}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triggerCustom(id: string, executeParams: Partial<IUILogicParams>): any {
    const trigger = this.triggers.get(id);
    if (!trigger) {
      return -1;
    }
    const params = this.getExecuteParams(executeParams);
    return trigger.execute(params);
  }

  /**
   * 触发部件事件
   * @author lxm
   * @date 2023-06-26 02:26:33
   * @param {string} itemName 子项名称
   * @param {Partial<IUILogicParams>} executeParams 执行参数
   * @return {*}  {(boolean | undefined)}
   */
  triggerControlEvent(
    ctrlName: string,
    eventName: string,
    executeParams?: Partial<IUILogicParams>,
  ): void {
    const matchParams = {
      ctrlName,
      eventName,
      triggerType: 'CTRLEVENT',
    } as const;
    this.triggerAndExecute(matchParams, executeParams);
  }

  /**
   * @description 触发部件项事件
   * @param {string} ctrlItemName 部件项名称
   * @param {string} eventName 事件名称
   * @param {Partial<IUILogicParams>} [executeParams] 执行参数
   * @memberof LogicScheduler
   */
  async triggerControlItemEvent(
    ctrlItemName: string,
    eventName: string,
    executeParams?: Partial<IUILogicParams>,
  ): Promise<void> {
    const matchParams = {
      eventName,
      ctrlName: ctrlItemName,
      triggerType: 'CTRLEVENT',
    } as const;
    const result = this.triggerAndExecute(matchParams, executeParams);
    if (result) await Promise.all(result);
  }
}
