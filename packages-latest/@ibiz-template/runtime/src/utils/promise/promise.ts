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
export async function handleAllSettled<T>(
  values: Iterable<T | PromiseLike<T>>,
  isThrow = true,
): Promise<Awaited<T>[]> {
  const allResults = await Promise.allSettled(values);
  const successResult: Awaited<T>[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorResult: any[] = [];
  allResults.forEach(item => {
    if (item.status === 'fulfilled') {
      successResult.push(item.value);
    } else {
      errorResult.push(item.reason);
    }
  });

  // 有报错时根据是否抛出处理，抛出就抛，不抛就拿全局的异常处理弹提示。
  if (errorResult.length > 0) {
    const error = errorResult.length === 1 ? errorResult[0] : errorResult;
    if (isThrow) {
      throw error;
    } else {
      ibiz.util.error.handle(error);
    }
  }

  return successResult;
}
