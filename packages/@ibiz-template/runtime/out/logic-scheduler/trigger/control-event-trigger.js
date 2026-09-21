import { StudioControlEvents } from '../../constant';
import { LogicTrigger } from './logic-trigger';
/**
 * 部件事件触发器
 * @author lxm
 * @date 2023-08-14 02:10:46
 * @export
 * @class ControlEventTrigger
 * @extends {LogicTrigger}
 */
export class ControlEventTrigger extends LogicTrigger {
    constructor(logic, scheduler) {
        super(logic, scheduler);
        this.logic = logic;
        this.scheduler = scheduler;
        /**
         * 监听事件名称集合
         * @author lxm
         * @date 2023-07-26 05:48:30
         * @protected
         * @type {string[]}
         */
        this.listenEventNames = [];
        const names = logic.eventNames.split(';');
        this.listenEventNames = names.map(name => StudioControlEvents[name] || name);
    }
    match(matchParams) {
        const superResult = super.match(matchParams);
        return (superResult &&
            // 忽略大小写匹配
            matchParams.ctrlName.toLowerCase() ===
                this.logic.ctrlName.toLowerCase() &&
            this.listenEventNames.includes(matchParams.eventName));
    }
}
