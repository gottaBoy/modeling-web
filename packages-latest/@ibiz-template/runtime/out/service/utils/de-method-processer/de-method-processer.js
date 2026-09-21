import { QXEvent } from 'qx-util';
/**
 * @description 数据服务方法执行状态处理器
 * @export
 * @class DeMethodProcesser
 */
export class DeMethodProcesser {
    /**
     * Creates an instance of DeMethodProcesser.
     * @param {string} srfSessionId
     * @memberof DeMethodProcesser
     */
    constructor(srfSessionId) {
        this.srfSessionId = srfSessionId;
        /**
         * @description 执行中方法数据
         * @protected
         * @type {Map<string, Method>} Map<执行标识，执行方法>
         * @memberof DeMethodProcesser
         */
        this.data = new Map();
        /**
         * @description 事件对象
         * @protected
         * @memberof DeMethodProcesser
         */
        this.evt = new QXEvent();
    }
    /**
     * @description 增加执行中方法
     * @param {string} key
     * @param {Method} method
     * @memberof DeMethodProcesser
     */
    increment(key, method) {
        this.data.set(key, method);
        this.evt.emit('change', {
            srfsessionid: this.srfSessionId,
            type: 'BEFORE',
        });
    }
    /**
     * @description 减少执行中方法
     * @param {string} key
     * @memberof DeMethodProcesser
     */
    decrement(key) {
        this.data.delete(key);
        this.evt.emit('change', { srfsessionid: this.srfSessionId, type: 'AFTER' });
    }
    /**
     * @description 订阅选中变更
     * @param {(data: IMethodProcessState) => void} cb 执行回调
     * @returns {*}  {void}
     * @memberof DeMethodProcesser
     */
    on(cb) {
        return this.evt.on('change', cb);
    }
    /**
     * @description 取消选中订阅
     * @param {(data: IMethodProcessState) => void} cb 一定要确定，传进来要取消订阅的方法和订阅时方法在内存中指向的是同一个
     * @memberof DeMethodProcesser
     */
    off(cb) {
        this.evt.off('change', cb);
    }
    /**
     * @description 销毁
     * @memberof DeMethodProcesser
     */
    destroy() {
        this.evt.reset();
    }
}
