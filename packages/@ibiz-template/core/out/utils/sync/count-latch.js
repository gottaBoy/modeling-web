import { RuntimeError } from '../../error';
/**
 * 计数插销工具类
 *
 * @author lxm
 * @date 2022-11-24 19:11:49
 * @export
 * @class CountLatch
 */
export class CountLatch {
    constructor() {
        this.promise = null;
        this.resolve = null;
        /**
         * 计数，当前等待的异步逻辑个数
         *
         * @author lxm
         * @date 2022-11-24 19:11:59
         * @type {number}
         */
        this.count = 0;
    }
    /**
     * 开启promise
     *
     * @author lxm
     * @date 2022-11-24 19:11:32
     * @private
     */
    startPromise() {
        this.promise = new Promise(resolve => {
            this.resolve = resolve;
        });
    }
    /**
     * 结束promise
     *
     * @author lxm
     * @date 2022-11-24 19:11:44
     * @private
     */
    endPromise() {
        if (this.resolve) {
            this.resolve();
            this.resolve = null;
            this.promise = null;
        }
    }
    /**
     * 上锁，计数加一
     * 第一次计数，开启异步
     *
     * @author lxm
     * @date 2022-11-24 19:11:27
     */
    lock() {
        this.count += 1;
        if (!this.promise) {
            this.startPromise();
        }
    }
    /**
     * 解锁，计数减一
     * 归零时结束异步
     *
     * @author lxm
     * @date 2022-11-24 19:11:47
     */
    unlock() {
        if (this.count < 1) {
            throw new RuntimeError(ibiz.i18n.t('core.utils.notMatchLockUnlock'));
        }
        this.count -= 1;
        if (this.count === 0) {
            this.endPromise();
        }
    }
    /**
     * 等待，计数归零异步结束
     *
     * @author lxm
     * @date 2022-11-24 19:11:20
     */
    async await() {
        if (this.promise) {
            await this.promise;
        }
    }
}
