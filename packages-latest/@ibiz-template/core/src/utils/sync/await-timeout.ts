/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @description 设置延迟wait毫米后执行fun方法，返回fun的返回值。用法：传入等待时间，函数和参数 返回fun的返回值
 * @example
 * ```
 * awaitTimeout(100, () => 'Hello, World!'); // => 'Hello, World!'
 * awaitTimeout(100, (name: string) => `Hello, ${name}!`, ['John']); // => 'Hello, John!'
 * ```
 * @export
 * @template T
 * @param {number} wait
 * @param {T} fun
 * @param {any[]} params
 * @returns {*}  {Promise<ReturnType<T>>}
 */
export async function awaitTimeout<T extends (...args: any) => any>(
  wait: number,
  fun?: T,
  params?: any[],
): Promise<ReturnType<T> | undefined> {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, wait);
  });
  if (fun) {
    return fun(...(params || []));
  }
}
