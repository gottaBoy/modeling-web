import type { ISchedulerLogic } from '../../interface';
import { LogicScheduler } from '../scheduler/logic-scheduler';
import { LogicExecutor } from './logic-executor';
/**
 * 逻辑执行工厂
 * @author lxm
 * @date 2023-06-25 06:37:54
 * @export
 * @class LogicExecutorFactory
 */
export declare class LogicExecutorFactory {
    /**
     * 构造回调方法集合
     * @author lxm
     * @date 2023-06-25 06:53:31
     */
    constructorMap: Map<string, (logic: ISchedulerLogic, scheduler: LogicScheduler) => LogicExecutor>;
    /**
     * 注册
     * @author lxm
     * @date 2023-06-25 06:54:17
     * @param {string} key 注册标识
     * @param {(logic: ISchedulerLogic, scheduler: LogicScheduler) => LogicExecutor} callback
     */
    register(key: string, callback: (logic: ISchedulerLogic, scheduler: LogicScheduler) => LogicExecutor): void;
    /**
     * 创建执行器实例
     * @author lxm
     * @date 2023-06-25 06:59:51
     * @param {ISchedulerLogic} logic
     * @return {*}
     */
    createExecutor(logic: ISchedulerLogic, scheduler: LogicScheduler): LogicExecutor;
}
//# sourceMappingURL=logic-executor-factory.d.ts.map