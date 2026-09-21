import { ModelError } from '@ibiz-template/core';
/**
 * 逻辑触发器工厂
 * @author lxm
 * @date 2023-06-25 06:37:54
 * @export
 * @class LogicTriggerFactory
 */
export class LogicTriggerFactory {
    constructor() {
        /**
         * 构造回调方法集合
         * @author lxm
         * @date 2023-06-25 06:53:31
         */
        this.constructorMap = new Map();
    }
    /**
     * 注册
     * @author lxm
     * @date 2023-06-25 06:54:17
     * @param {string} key 注册标识
     * @param {(logic: ISchedulerLogic, scheduler: LogicScheduler) => LogicTrigger} callback
     */
    register(key, callback) {
        this.constructorMap.set(key, callback);
    }
    /**
     * 创建触发器实例
     * @author lxm
     * @date 2023-06-25 06:56:32
     * @param {ISchedulerLogic} logic
     * @return {*}
     */
    createTrigger(logic, scheduler, scriptArgKeys = []) {
        const constructor = this.constructorMap.get(logic.triggerType);
        if (!constructor) {
            throw new ModelError(logic, ibiz.i18n.t('runtime.logicScheduler.trigger.noSupportedType', {
                triggerType: logic.triggerType,
            }));
        }
        return constructor(logic, scheduler, scriptArgKeys);
    }
}
