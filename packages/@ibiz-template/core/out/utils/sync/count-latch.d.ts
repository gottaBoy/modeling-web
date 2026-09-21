/**
 * 计数插销工具类
 *
 * @author lxm
 * @date 2022-11-24 19:11:49
 * @export
 * @class CountLatch
 */
export declare class CountLatch {
    private promise;
    private resolve;
    /**
     * 计数，当前等待的异步逻辑个数
     *
     * @author lxm
     * @date 2022-11-24 19:11:59
     * @type {number}
     */
    count: number;
    /**
     * 开启promise
     *
     * @author lxm
     * @date 2022-11-24 19:11:32
     * @private
     */
    private startPromise;
    /**
     * 结束promise
     *
     * @author lxm
     * @date 2022-11-24 19:11:44
     * @private
     */
    private endPromise;
    /**
     * 上锁，计数加一
     * 第一次计数，开启异步
     *
     * @author lxm
     * @date 2022-11-24 19:11:27
     */
    lock(): void;
    /**
     * 解锁，计数减一
     * 归零时结束异步
     *
     * @author lxm
     * @date 2022-11-24 19:11:47
     */
    unlock(): void;
    /**
     * 等待，计数归零异步结束
     *
     * @author lxm
     * @date 2022-11-24 19:11:20
     */
    await(): Promise<void>;
}
//# sourceMappingURL=count-latch.d.ts.map