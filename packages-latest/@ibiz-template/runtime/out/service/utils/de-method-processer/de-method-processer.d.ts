import { QXEvent } from 'qx-util';
import { Method } from '../../service';
import { IDeMethodProcesser, IMethodProcessState } from '../../../interface';
/**
 * @description 数据服务方法执行状态处理器
 * @export
 * @class DeMethodProcesser
 */
export declare class DeMethodProcesser implements IDeMethodProcesser {
    protected srfSessionId: string;
    /**
     * @description 执行中方法数据
     * @protected
     * @type {Map<string, Method>} Map<执行标识，执行方法>
     * @memberof DeMethodProcesser
     */
    protected data: Map<string, Method>;
    /**
     * Creates an instance of DeMethodProcesser.
     * @param {string} srfSessionId
     * @memberof DeMethodProcesser
     */
    constructor(srfSessionId: string);
    /**
     * @description 事件对象
     * @protected
     * @memberof DeMethodProcesser
     */
    protected evt: QXEvent<{
        change: (data: IMethodProcessState) => void;
    }>;
    /**
     * @description 增加执行中方法
     * @param {string} key
     * @param {Method} method
     * @memberof DeMethodProcesser
     */
    increment(key: string, method: Method): void;
    /**
     * @description 减少执行中方法
     * @param {string} key
     * @memberof DeMethodProcesser
     */
    decrement(key: string): void;
    /**
     * @description 订阅选中变更
     * @param {(data: IMethodProcessState) => void} cb 执行回调
     * @returns {*}  {void}
     * @memberof DeMethodProcesser
     */
    on(cb: (data: IMethodProcessState) => void): void;
    /**
     * @description 取消选中订阅
     * @param {(data: IMethodProcessState) => void} cb 一定要确定，传进来要取消订阅的方法和订阅时方法在内存中指向的是同一个
     * @memberof DeMethodProcesser
     */
    off(cb: (data: IMethodProcessState) => void): void;
    /**
     * @description 销毁
     * @memberof DeMethodProcesser
     */
    destroy(): void;
}
//# sourceMappingURL=de-method-processer.d.ts.map