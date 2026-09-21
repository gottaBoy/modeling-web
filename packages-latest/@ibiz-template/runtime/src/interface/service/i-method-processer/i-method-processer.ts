import { IMethodProcessState } from './i-method-process-state';

/**
 * @description 数据服务方法执行状态处理器
 * @export
 * @interface IDeMethodProcesser
 */
export interface IDeMethodProcesser {
  /**
   * @description 增强执行中方法
   * @param {string} key
   * @param {Method} method
   * @memberof DeMethodProcesser
   */
  increment(key: string, method: IData): void;

  /**
   * @description 减少执行中方法
   * @param {string} key
   * @memberof IDeMethodProcesser
   */
  decrement(key: string): void;

  /**
   * @description 订阅选中变更
   * @param {(data: IMethodProcessState) => void} cb
   * @memberof IDeMethodProcesser
   */
  on(cb: (data: IMethodProcessState) => void): void;

  /**
   * @description 取消选中订阅
   * @param {(data: IMethodProcessState) => void} cb 一定要确定，传进来要取消订阅的方法和订阅时方法在内存中指向的是同一个
   * @memberof IDeMethodProcesser
   */
  off(cb: (data: IMethodProcessState) => void): void;

  /**
   * @description 销毁
   * @memberof IDeMethodProcesser
   */
  destroy(): void;
}
