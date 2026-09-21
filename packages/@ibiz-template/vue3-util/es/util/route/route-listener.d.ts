import { RouteLocationNormalizedLoaded } from 'vue-router';
type ChangeCallback = () => void;
/**
 * 监听路由变更，提供下一次变更执行的一次性回调。
 *
 * @export
 * @class RouteListener
 */
export declare class RouteListener {
    /**
     * 回调集合
     *
     * @memberof RouteListener
     */
    private callbacks;
    /**
     * 计时器集合
     *
     * @private
     * @type {any[]}
     * @memberof RouteListener
     */
    private timers;
    /**
     * 等待路由响应时间
     *
     * @private
     * @type {number}
     * @memberof RouteListener
     */
    private wait;
    constructor(route: RouteLocationNormalizedLoaded, wait?: number);
    /**
     * 下一次路由变更后执行回调，只执行一次
     *
     * @param {ChangeCallback} callback
     * @memberof RouteListener
     */
    nextChange(callback: ChangeCallback): void;
}
export {};
//# sourceMappingURL=route-listener.d.ts.map