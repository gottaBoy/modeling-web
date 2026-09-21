import { IAppCounter, IAppCounterRef } from '@ibiz/model-core';
import { AppCounter } from '../../utils';
/**
 * 计数器服务，用来获取计数器实例
 *
 * @author chitanda
 * @date 2022-10-26 17:10:48
 * @export
 * @class CounterService
 */
export declare class CounterService {
    /**
     * 计数器组，应用级计数器缓存，不存在重复
     *
     * @author chitanda
     * @date 2022-10-26 19:10:54
     * @protected
     * @static
     * @type {Map<string, AppCounter>}
     */
    protected static counterMap: Map<string, AppCounter>;
    /**
     * 获取计数器
     *
     * @author chitanda
     * @date 2022-10-26 19:10:18
     * @param {IAppCounter} model
     * @return {*}  {Promise<AppCounter>}
     */
    static getCounter(model: IAppCounter, context?: IContext, params?: IParams): Promise<AppCounter>;
    /**
     * 根据计数器引用获取计数器实例
     *
     * @author chitanda
     * @date 2022-10-26 20:10:20
     * @static
     * @param {IAppCounterRef} model
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<AppCounter>}
     */
    static getCounterByRef(model: IAppCounterRef, context?: IContext, params?: IParams): Promise<AppCounter>;
}
//# sourceMappingURL=counter.service.d.ts.map