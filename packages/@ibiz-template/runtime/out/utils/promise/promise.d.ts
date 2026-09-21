/**
 * 异步等待所有promise完成后才会结束异步
 * 只返回成功的promise的返回值集合
 * - 如果isThrow为true，有异常时抛出异常
 * - 如果isThrow为false，有异常时用全局异常处理弹提示，逻辑不会中断
 * @author lxm
 * @date 2023-09-26 06:57:33
 * @export
 * @template T
 * @param {(Iterable<T | PromiseLike<T>>)} values
 * @param {boolean} [isThrow=true]
 * @return {*}  {Promise<Awaited<T>[]>}
 */
export declare function handleAllSettled<T>(values: Iterable<T | PromiseLike<T>>, isThrow?: boolean): Promise<Awaited<T>[]>;
//# sourceMappingURL=promise.d.ts.map