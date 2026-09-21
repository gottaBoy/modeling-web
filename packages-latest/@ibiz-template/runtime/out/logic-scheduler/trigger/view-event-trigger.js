import { StudioViewEvents } from '../../constant';
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
    constructor(logic, scheduler, scriptArgKeys = []) {
        super(logic, scheduler, scriptArgKeys);
        this.logic = logic;
        this.scheduler = scheduler;
        this.scriptArgKeys = scriptArgKeys;
        /**
         * 监听事件名称集合
         * @author lxm
         * @date 2023-07-26 05:48:30
         * @protected
         * @type {string[]}
         */
        this.listenEventNames = [];
        const names = logic.eventNames.split(';');
        this.listenEventNames = names.map(name => StudioViewEvents[name] || name);
    }
    match(matchParams) {
        const superResult = super.match(matchParams);
        return (superResult && this.listenEventNames.includes(matchParams.eventName));
    }
}
