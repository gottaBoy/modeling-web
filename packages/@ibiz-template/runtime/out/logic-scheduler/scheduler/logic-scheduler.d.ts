import type { IUILogicParams, ISchedulerLogic, ITriggerMatchParams } from '../../interface';
import { LogicExecutor } from '../executor/logic-executor';
import { LogicTrigger } from '../trigger/logic-trigger';
/**
 * 逻辑调度器实例类
 * @author lxm
 * @date 2023-06-25 03:35:46
 * @export
 * @class LogicScheduler
 */
export declare class LogicScheduler {
    logics: ISchedulerLogic[];
    triggers: Map<string, LogicTrigger>;
    executors: Map<string, LogicExecutor>;
    /**
     * 是否有视图事件触发类型逻辑
     * @author lxm
     * @date 2023-08-14 02:19:51
     * @type {boolean}
     */
    hasViewEventTrigger: boolean;
    /**
     * 是否有部件事件触发类型逻辑
     * @author lxm
     * @date 2023-08-14 02:19:51
     * @type {boolean}
     */
    hasControlEventTrigger: boolean;
    constructor(logics: ISchedulerLogic[]);
    /**
     * 销毁方法
     * @author lxm
     * @date 2023-07-17 11:47:51
     */
    destroy(): void;
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
    getExecuteParams(executeParams: Partial<IUILogicParams>): IUILogicParams;
    /**
     * 创建触发器实例
     * @author lxm
     * @date 2023-06-26 02:33:35
     * @protected
     * @param {ISchedulerLogic} logic
     * @return {*}  {LogicTrigger}
     */
    protected createTrigger(logic: ISchedulerLogic): LogicTrigger;
    /**
     * 创建执行器实例
     * @author lxm
     * @date 2023-06-26 02:33:52
     * @protected
     * @param {ISchedulerLogic} logic
     * @return {*}  {LogicExecutor}
     */
    protected createExecutor(logic: ISchedulerLogic): LogicExecutor;
    /**
     * 获取匹配的触发器。
     * @author lxm
     * @date 2023-06-26 02:32:24
     * @param {ITriggerMatchParams} matchParams
     * @return {*}  {LogicTrigger[]}
     */
    protected getMatchTriggers(matchParams: ITriggerMatchParams): LogicTrigger[];
    /**
     * 找到匹配的触发器并执行对应的执行器，并返回结果。
     * 返回undefined表示没有匹配的触发器。
     * @author lxm
     * @date 2023-06-26 02:30:24
     * @param {ITriggerMatchParams} matchParams 匹配参数
     * @param {Partial<IUILogicParams>} [executeParams={}] 执行参数
     * @return {*}  {(any[] | undefined)}
     */
    triggerAndExecute(matchParams: ITriggerMatchParams, executeParams?: Partial<IUILogicParams>): any[] | undefined;
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
    protected triggerItemDynaLogic(itemName: string, triggerType: 'ITEMVISIBLE' | 'ITEMENABLE' | 'ITEMBLANK', executeParams: Partial<IUILogicParams>): boolean | undefined;
    /**
     * 预定义项显示逻辑
     * @author lxm
     * @date 2023-06-26 02:26:36
     * @param {string} itemName 子项名称
     * @param {Partial<IUILogicParams>} executeParams 执行参数
     * @return {*}  {(boolean | undefined)}
     */
    triggerItemVisible(itemName: string, executeParams: Partial<IUILogicParams>): boolean | undefined;
    /**
     * 预定义项启用逻辑
     * @author lxm
     * @date 2023-06-26 02:26:35
     * @param {string} itemName 子项名称
     * @param {Partial<IUILogicParams>} executeParams 执行参数
     * @return {*}  {(boolean | undefined)}
     */
    triggerItemEnable(itemName: string, executeParams: Partial<IUILogicParams>): boolean | undefined;
    /**
     * 预定义项空输入逻辑
     * @author lxm
     * @date 2023-06-26 02:26:33
     * @param {string} itemName 子项名称
     * @param {Partial<IUILogicParams>} executeParams 执行参数
     * @return {*}  {(boolean | undefined)}
     */
    triggerItemBlank(itemName: string, executeParams: Partial<IUILogicParams>): boolean | undefined;
    /**
     * 定时器触发开始启用并计时
     * @author lxm
     * @date 2023-07-17 01:49:14
     */
    startTimerTrigger(): void;
    /**
     * 执行自定义触发逻辑类型的视图逻辑
     * @author lxm
     * @date 2023-07-17 07:44:12
     * @param {string} id
     * @param {Partial<IUILogicParams>} executeParams
     * @return {*}
     */
    triggerCustom(id: string, executeParams: Partial<IUILogicParams>): any;
    /**
     * 触发部件事件
     * @author lxm
     * @date 2023-06-26 02:26:33
     * @param {string} itemName 子项名称
     * @param {Partial<IUILogicParams>} executeParams 执行参数
     * @return {*}  {(boolean | undefined)}
     */
    triggerControlEvent(ctrlName: string, eventName: string, executeParams?: Partial<IUILogicParams>): void;
}
//# sourceMappingURL=logic-scheduler.d.ts.map