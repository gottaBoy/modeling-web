import { IDisposable } from '../interface';
export declare function once<T extends Function>(this: unknown, fn: T): T;
export declare function toDisposable(fn: () => void): IDisposable;
/**
 * 函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 *
 * @author chitanda
 * @date 2022-06-29 19:06:15
 * @export
 * @param {((...args: unknown[]) => void | Promise<void>)} func 处理函数
 * @param {number} wait 延迟执行时间（毫秒）
 * @param {boolean} [immediate] 是否立即执行
 * @return {*}  {(...args: unknown[]) => void}
 */
export declare function debounce(func: (...args: unknown[]) => void | Promise<void>, wait: number, immediate?: boolean): (...args: unknown[]) => void;
/**
 * 节流函数
 *
 * @author chitanda
 * @date 2022-06-29 20:06:38
 * @export
 * @param {((...args: unknown[]) => void | Promise<void>)} fn
 * @param {number} wait
 * @return {*}  {(...args: unknown[]) => void}
 */
export declare function throttle(fn: (...args: unknown[]) => void | Promise<void>, wait: number): (...args: unknown[]) => void;
//# sourceMappingURL=util.d.ts.map