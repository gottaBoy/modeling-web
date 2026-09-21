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
    constructor(logics) {
        logics.forEach(logic => {
            // 视图逻辑的触发类型logicTrigger统一成triggerType
            logic.triggerType = logic.logicTrigger;
        });
        super(logics);
    }
    /**
     * 触发视图事件
     * @author lxm
     * @date 2023-06-26 02:26:33
     * @param {string} itemName 子项名称
     * @param {Partial<IUILogicParams>} executeParams 执行参数
     * @return {*}  {(boolean | undefined)}
     */
    triggerViewEvent(event) {
        const matchParams = {
            eventName: event.eventName,
            triggerType: 'VIEWEVENT',
        };
        this.triggerAndExecute(matchParams, event);
    }
}
