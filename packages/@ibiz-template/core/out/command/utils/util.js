// eslint-disable-next-line @typescript-eslint/ban-types
export function once(fn) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    let didCall = false;
    let result;
    return function () {
        if (didCall) {
            return result;
        }
        didCall = true;
        result = fn.apply(_this, arguments);
        return result;
    };
}
export function toDisposable(fn) {
    const self = {
        dispose: once(() => {
            fn();
        }),
    };
    return self;
}
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
export function debounce(func, wait, immediate) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        if (immediate) {
            const callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if (callNow) {
                func.apply(this, args);
            }
        }
        else {
            timer = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        }
    };
}
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
export function throttle(fn, wait) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}
