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
    constructor(logics, scriptArgKeys = []) {
        logics.forEach(logic => {
            // 视图逻辑的触发类型logicTrigger统一成triggerType
            logic.triggerType = logic.logicTrigger;
        });
        super(logics, scriptArgKeys);
    }
    /**
     * 触发视图事件
     * @author lxm
     * @date 2023-06-26 02:26:33
     * @param {EventBase} event 事件对象
     * @return {*}  {Promise<void>}
     */
    async triggerViewEvent(event) {
        const matchParams = {
            eventName: event.eventName,
            triggerType: 'VIEWEVENT',
        };
        const result = this.triggerAndExecute(matchParams, event);
        if (result === null || result === void 0 ? void 0 : result.length) {
            await Promise.all(result);
        }
    }
}
