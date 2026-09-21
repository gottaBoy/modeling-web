/**
 * @description 创建一个只能执行一次的包装函数
 * @export
 * @template T 函数类型
 * @param {unknown} this 函数执行上下文
 * @param {T} fn 需要包装的原始函数
 * @returns {*}  {T} 包装后的函数，只会执行一次原始函数
 */
export function once(fn) {
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
/**
 * @description 将普通函数转换为一次性可销毁对象
 * @export
 * @param {() => void} fn 需要转换的函数
 * @returns {*}  {IDisposable} 可销毁对象
 */
export function toDisposable(fn) {
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
 * @description 节流函数，限制函数在指定时间间隔内只能执行一次
 * @export
 * @param {((...args: unknown[]) => void | Promise<void>)} fn 要执行的函数
 * @param {number} wait 节流时间间隔（毫秒）
 * @returns {*}  {(...args: unknown[]) => void} 包装后的节流函数
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
