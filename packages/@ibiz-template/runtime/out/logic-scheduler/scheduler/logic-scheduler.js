import { mergeLeft } from 'ramda';
/**
 * 逻辑调度器实例类
 * @author lxm
 * @date 2023-06-25 03:35:46
 * @export
 * @class LogicScheduler
 */
export class LogicScheduler {
    constructor(logics) {
        this.triggers = new Map();
        this.executors = new Map();
        /**
         * 是否有视图事件触发类型逻辑
         * @author lxm
         * @date 2023-08-14 02:19:51
         * @type {boolean}
         */
        this.hasViewEventTrigger = false;
        /**
         * 是否有部件事件触发类型逻辑
         * @author lxm
         * @date 2023-08-14 02:19:51
         * @type {boolean}
         */
        this.hasControlEventTrigger = false;
        this.logics = logics;
        logics.forEach(logic => {
            try {
                const executor = this.createExecutor(logic);
                this.executors.set(logic.id, executor);
                const trigger = this.createTrigger(logic);
                this.triggers.set(logic.id, trigger);
                trigger.bindExecutor(executor);
            }
            catch (error) {
                if (logic.logicType === 'CUSTOM') {
                    ibiz.log.warn(error.message);
                }
                else {
                    ibiz.log.error(error.message);
                }
            }
        });
    }
    /**
     * 销毁方法
     * @author lxm
     * @date 2023-07-17 11:47:51
     */
    destroy() {
        this.triggers.forEach(trigger => trigger.destroy());
        this.executors.forEach(executor => executor.destroy());
    }
    /**
     * 获取执行参数,把默认参数和调用参数合并
     * @author lxm
     * @date 2023-06-25 08:28:34
     * @param {IData} args
     * @return {*}
     */
    getExecuteParams(executeParams) {
        let defaultParams = {};
        if (this.defaultParamsCb) {
            defaultParams = this.defaultParamsCb();
        }
        return mergeLeft(executeParams, defaultParams);
    }
    /**
     * 创建触发器实例
     * @author lxm
     * @date 2023-06-26 02:33:35
     * @protected
     * @param {ISchedulerLogic} logic
     * @return {*}  {LogicTrigger}
     */
    createTrigger(logic) {
        switch (logic.triggerType) {
            case 'VIEWEVENT':
                this.hasViewEventTrigger = true;
                break;
            case 'CTRLEVENT':
                this.hasControlEventTrigger = true;
                break;
            default:
        }
        return ibiz.scheduler.triggerFactory.createTrigger(logic, this);
    }
    /**
     * 创建执行器实例
     * @author lxm
     * @date 2023-06-26 02:33:52
     * @protected
     * @param {ISchedulerLogic} logic
     * @return {*}  {LogicExecutor}
     */
    createExecutor(logic) {
        return ibiz.scheduler.executorFactory.createExecutor(logic, this);
    }
    /**
     * 获取匹配的触发器。
     * @author lxm
     * @date 2023-06-26 02:32:24
     * @param {ITriggerMatchParams} matchParams
     * @return {*}  {LogicTrigger[]}
     */
    getMatchTriggers(matchParams) {
        const triggers = [];
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
    triggerAndExecute(matchParams, executeParams = {}) {
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
    triggerItemDynaLogic(itemName, triggerType, executeParams) {
        const matchParams = { itemName, triggerType };
        const result = this.triggerAndExecute(matchParams, executeParams);
        if (result === null || result === void 0 ? void 0 : result.length) {
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
    triggerItemVisible(itemName, executeParams) {
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
    triggerItemEnable(itemName, executeParams) {
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
    triggerItemBlank(itemName, executeParams) {
        return this.triggerItemDynaLogic(itemName, 'ITEMBLANK', executeParams);
    }
    /**
     * 定时器触发开始启用并计时
     * @author lxm
     * @date 2023-07-17 01:49:14
     */
    startTimerTrigger() {
        const triggers = this.getMatchTriggers({ triggerType: 'TIMER' });
        triggers.forEach(trigger => trigger.start());
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
    triggerCustom(id, executeParams) {
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
    triggerControlEvent(ctrlName, eventName, executeParams) {
        const matchParams = {
            ctrlName,
            eventName,
            triggerType: 'CTRLEVENT',
        };
        this.triggerAndExecute(matchParams, executeParams);
    }
}
