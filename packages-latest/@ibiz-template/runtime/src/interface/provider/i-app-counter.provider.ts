import { IAppCounter } from '@ibiz/model-core';
import { AppCounter } from '../../service';

/**
 * 计数器适配器的接口
 *
 * @author lxm
 * @date 2022-10-25 13:10:45
 * @export
 * @interface IAppCounterProvider
 */
export interface IAppCounterProvider {
  /**
   * 创建新的计数器实例
   *
   * @author lxm
   * @date 2023-08-24 12:04:25
   * @param {IAppCounter} model
   * @return {*}  {Promise<AppCounter>}
   */
  createCounter(model: IAppCounter): AppCounter;
}
