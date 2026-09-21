import { RuntimeError } from '../../error';
/**
 * @description 计数插销工具类
 * @export
 * @class CountLatch
 */
export class CountLatch {
    constructor() {
        this.promise = null;
        this.resolve = null;
        /**
         * @description 计数，当前等待的异步逻辑个数
         * @type {number}
         * @memberof CountLatch
         */
        this.count = 0;
    }
    /**
     * @description 开启promise
     * @private
     * @memberof CountLatch
     */
    startPromise() {
        this.promise = new Promise(resolve => {
            this.resolve = resolve;
        });
    }
    /**
     * @description 结束promise
     * @private
     * @memberof CountLatch
     */
    endPromise() {
        if (this.resolve) {
            this.resolve();
            this.resolve = null;
            this.promise = null;
        }
    }
    /**
     * @description 上锁，计数加一，第一次计数，开启异步
     * @memberof CountLatch
     */
    lock() {
        this.count += 1;
        if (!this.promise) {
            this.startPromise();
        }
    }
    /**
     * @description 解锁，计数减一，归零时结束异步
     * @memberof CountLatch
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
     * @description 等待，计数归零异步结束
     * @returns {*}  {Promise<void>}
     * @memberof CountLatch
     */
    async await() {
        if (this.promise) {
            await this.promise;
        }
    }
}
