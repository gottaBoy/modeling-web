import { QXEvent } from 'qx-util';
import { Method } from '../../service';
import { IDeMethodProcesser, IMethodProcessState } from '../../../interface';

/**
 * @description 数据服务方法执行状态处理器
 * @export
 * @class DeMethodProcesser
 */
export class DeMethodProcesser implements IDeMethodProcesser {
  /**
   * @description 执行中方法数据
   * @protected
   * @type {Map<string, Method>} Map<执行标识，执行方法>
   * @memberof DeMethodProcesser
   */
  protected data: Map<string, Method> = new Map();

  /**
   * Creates an instance of DeMethodProcesser.
   * @param {string} srfSessionId
   * @memberof DeMethodProcesser
   */
  constructor(protected srfSessionId: string) {}

  /**
   * @description 事件对象
   * @protected
   * @memberof DeMethodProcesser
   */
  protected evt: QXEvent<{
    change: (data: IMethodProcessState) => void;
  }> = new QXEvent();

  /**
   * @description 增加执行中方法
   * @param {string} key
   * @param {Method} method
   * @memberof DeMethodProcesser
   */
  increment(key: string, method: Method): void {
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
  decrement(key: string): void {
    this.data.delete(key);
    this.evt.emit('change', { srfsessionid: this.srfSessionId, type: 'AFTER' });
  }

  /**
   * @description 订阅选中变更
   * @param {(data: IMethodProcessState) => void} cb 执行回调
   * @returns {*}  {void}
   * @memberof DeMethodProcesser
   */
  on(cb: (data: IMethodProcessState) => void): void {
    return this.evt.on('change', cb);
  }

  /**
   * @description 取消选中订阅
   * @param {(data: IMethodProcessState) => void} cb 一定要确定，传进来要取消订阅的方法和订阅时方法在内存中指向的是同一个
   * @memberof DeMethodProcesser
   */
  off(cb: (data: IMethodProcessState) => void): void {
    this.evt.off('change', cb);
  }

  /**
   * @description 销毁
   * @memberof DeMethodProcesser
   */
  destroy(): void {
    this.evt.reset();
  }
}
