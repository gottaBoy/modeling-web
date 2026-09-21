/**
 * @description 计数插销工具类
 * @export
 * @class CountLatch
 */
export declare class CountLatch {
    private promise;
    private resolve;
    /**
     * @description 计数，当前等待的异步逻辑个数
     * @type {number}
     * @memberof CountLatch
     */
    count: number;
    /**
     * @description 开启promise
     * @private
     * @memberof CountLatch
     */
    private startPromise;
    /**
     * @description 结束promise
     * @private
     * @memberof CountLatch
     */
    private endPromise;
    /**
     * @description 上锁，计数加一，第一次计数，开启异步
     * @memberof CountLatch
     */
    lock(): void;
    /**
     * @description 解锁，计数减一，归零时结束异步
     * @memberof CountLatch
     */
    unlock(): void;
    /**
     * @description 等待，计数归零异步结束
     * @returns {*}  {Promise<void>}
     * @memberof CountLatch
     */
    await(): Promise<void>;
}
//# sourceMappingURL=count-latch.d.ts.map