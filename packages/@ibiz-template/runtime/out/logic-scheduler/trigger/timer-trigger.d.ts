import { LogicTrigger } from './logic-trigger';
/**
 * 定时器触发
 * @author lxm
 * @date 2023-07-17 12:53:35
 * @export
 * @class TimerTrigger
 * @extends {LogicTrigger}
 */
export declare class TimerTrigger extends LogicTrigger {
    type: 'TIMER';
    protected timer: number | null;
    start(): void;
    destroy(): void;
}
//# sourceMappingURL=timer-trigger.d.ts.map