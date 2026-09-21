/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-underscore-dangle */
import { IDisposable } from '../../interface';

/**
 * @description 创建一个只能执行一次的包装函数
 * @export
 * @template T 函数类型
 * @param {unknown} this 函数执行上下文
 * @param {T} fn 需要包装的原始函数
 * @returns {*}  {T} 包装后的函数，只会执行一次原始函数
 */
export function once<T extends Function>(this: unknown, fn: T): T {
  const _this = this;
  let didCall = false;
  let result: unknown;

  return function () {
    if (didCall) {
      return result;
    }

    didCall = true;
    result = fn.apply(_this, arguments);

    return result;
  } as unknown as T;
}

/**
 * @description 将普通函数转换为一次性可销毁对象
 * @export
 * @param {() => void} fn 需要转换的函数
 * @returns {*}  {IDisposable} 可销毁对象
 */
export function toDisposable(fn: () => void): IDisposable {
  const self = {
    dispose: once(() => {
      fn();
    }),
  };
  return self;
}

/**
 * @description 函数防抖
 * @export
 * @param {((...args: unknown[]) => void | Promise<void>)} func 要执行的函数
 * @param {number} wait 延迟时间（毫秒）
 * @param {boolean} [immediate] 是否立即执行
 * @returns {*}  {(...args: unknown[]) => void} 包装后的防抖函数
 */
export function debounce(
  func: (...args: unknown[]) => void | Promise<void>,
  wait: number,
  immediate?: boolean,
): (...args: unknown[]) => void {
  let timer: unknown;

  return function (this: unknown, ...args: unknown[]): void {
    if (timer) {
      clearTimeout(timer as number);
    }
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        func.apply(this, args);
      }
    } else {
      timer = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  };
}

/**
 * @description 节流函数，限制函数在指定时间间隔内只能执行一次
 * @export
 * @param {((...args: unknown[]) => void | Promise<void>)} fn 要执行的函数
 * @param {number} wait 节流时间间隔（毫秒）
 * @returns {*}  {(...args: unknown[]) => void} 包装后的节流函数
 */
export function throttle(
  fn: (...args: unknown[]) => void | Promise<void>,
  wait: number,
): (...args: unknown[]) => void {
  let timer: unknown = null;
  return function (this: unknown, ...args: unknown[]): void {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}
