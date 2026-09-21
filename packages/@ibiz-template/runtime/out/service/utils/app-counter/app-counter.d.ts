import { IPortalMessage } from '@ibiz-template/core';
import { IAppCounter } from '@ibiz/model-core';
import { QXEvent } from 'qx-util';
import { Application } from '../../../application';
/**
 * 应用计数器基类
 *
 * @author chitanda
 * @date 2022-10-26 18:10:51
 * @export
 * @class AppCounter
 */
export declare class AppCounter {
    model: IAppCounter;
    protected app: Application;
    protected intervalTimer: unknown;
    protected destroyed: boolean;
    /**
     * 计数器是否已经销毁
     *
     * @author chitanda
     * @date 2022-10-26 20:10:55
     * @protected
     * @type {boolean}
     */
    get isDestroyed(): boolean;
    protected context: IContext;
    protected params: IParams;
    protected evt: QXEvent<{
        change: (data: IData) => void;
    }>;
    /**
     * 计数器数据
     *
     * @author chitanda
     * @date 2022-10-26 19:10:08
     * @protected
     * @type {IData}
     */
    protected data: IData;
    /**
     * Creates an instance of AppCounter.
     *
     * @author chitanda
     * @date 2022-10-26 20:10:55
     * @param {IAppCounter} model 应用计数器模型
     */
    constructor(model: IAppCounter);
    /**
     * 计数器初始化
     *
     * @author chitanda
     * @date 2022-10-26 19:10:24
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    init(context?: IContext, params?: IParams): Promise<void>;
    /**
     * 接受计数器实体数据变更，刷新计数器
     *
     * @author chitanda
     * @date 2024-03-07 14:03:00
     * @protected
     * @param {IPortalMessage} msg
     */
    protected countChange(msg: IPortalMessage): void;
    /**
     * 设置上下文以及查询参数
     *
     * @author chitanda
     * @date 2022-10-26 19:10:58
     * @protected
     * @param {IContext} [context]
     * @param {IParams} [params]
     */
    protected setParams(context?: IContext, params?: IParams): void;
    /**
     * 计数器定时刷新
     *
     * @author chitanda
     * @date 2022-10-26 18:10:13
     * @protected
     */
    protected interval(): void;
    /**
     * 销毁定时器自动刷新
     *
     * @author chitanda
     * @date 2022-10-26 18:10:31
     * @protected
     */
    protected destroyInterval(): void;
    /**
     * 加载计数器
     *
     * @author chitanda
     * @date 2022-10-26 19:10:38
     * @protected
     * @return {*}  {Promise<IData>}
     */
    protected load(): Promise<IData>;
    /**
     * 计数器刷新
     *
     * @author chitanda
     * @date 2022-10-26 19:10:46
     * @param {IContext} [context]
     * @param {IParams} [params]
     * @return {*}  {Promise<IData>}
     */
    refresh(context?: IContext, params?: IParams): Promise<IData>;
    /**
     * 计数器数据变更事件监听
     *
     * @author chitanda
     * @date 2022-10-26 20:10:13
     * @param {(data: IData) => void} fn
     * @param {boolean} [immediate=true] 当有计时器数据时，立即触发一次回调
     */
    onChange(fn: (data: IData) => void, immediate?: boolean): void;
    /**
     * 取消计数器数据变更监听
     *
     * @author chitanda
     * @date 2022-10-26 20:10:13
     * @param {(data: IData) => void} fn
     */
    offChange(fn: (data: IData) => void): void;
    /**
     * 根据计数器标识，获取计数器数值
     *
     * @author chitanda
     * @date 2022-10-26 20:10:08
     * @param {string} tag
     * @return {*}  {number}
     */
    getCounter(tag: string): number;
    /**
     * 销毁计数器
     *
     * @author chitanda
     * @date 2022-10-26 18:10:31
     */
    destroy(): void;
}
//# sourceMappingURL=app-counter.d.ts.map