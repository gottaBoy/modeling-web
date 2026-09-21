import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { LogicTrigger } from './logic-trigger';
/**
 * 定时器触发
 * @author lxm
 * @date 2023-07-17 12:53:35
 * @export
 * @class TimerTrigger
 * @extends {LogicTrigger}
 */
export class TimerTrigger extends LogicTrigger {
    constructor() {
        super(...arguments);
        this.timer = null;
    }
    start() {
        if (!this.logic.timer) {
            throw new RuntimeModelError(this.logic, ibiz.i18n.t('runtime.logicScheduler.trigger.timerLacks'));
        }
        this.timer = setInterval(() => {
            if (!this.scheduler.defaultParamsCb) {
                throw new RuntimeError(ibiz.i18n.t('runtime.logicScheduler.trigger.parameterCallback'));
            }
            const params = this.scheduler.defaultParamsCb();
            this.executor.execute(params);
        }, this.logic.timer);
    }
    /**
     * @description 绑定脚本执行器
     * @param {ScriptExecutor} executor
     * @memberof TimerTrigger
     */
    bindScriptExecutor(executor) {
        if (!executor.initialized) {
            executor.init([], executeParams => executeParams, {
                isAsync: true,
                singleRowReturn: false,
            });
        }
    }
    destroy() {
        super.destroy();
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
