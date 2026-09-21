/* eslint-disable @typescript-eslint/no-unused-vars */
import { RuntimeModelError } from '@ibiz-template/core';
import { IAppCounter, IAppCounterRef } from '@ibiz/model-core';
import { getAppCounterProvider } from '../../../register';
import { AppCounter } from '../../utils';

/**
 * 计数器服务，用来获取计数器实例
 *
 * @author chitanda
 * @date 2022-10-26 17:10:48
 * @export
 * @class CounterService
 */
export class CounterService {
  /**
   * 计数器组，应用级计数器缓存，不存在重复
   *
   * @author chitanda
   * @date 2022-10-26 19:10:54
   * @protected
   * @static
   * @type {Map<string, AppCounter>}
   */
  protected static counterMap: Map<string, AppCounter> = new Map();

  /**
   * 获取计数器
   *
   * @author chitanda
   * @date 2022-10-26 19:10:18
   * @param {IAppCounter} model
   * @return {*}  {Promise<AppCounter>}
   */
  static async getCounter(
    model: IAppCounter,
    context?: IContext,
    params?: IParams,
  ): Promise<AppCounter> {
    let id = model.id!;
    // 可由外部传入自定义标识，应用同时存在子关系的A\B单数据页面，计数器对象应该不一样
    if (params && params.srfcustomtag) {
      id = params.srfcustomtag;
      if (context) {
        id = `${context.srfsessionid}@${id}`;
      }
    }
    if (this.counterMap.has(id)) {
      const counter = this.counterMap.get(id)!;
      if (counter.isDestroyed === false) {
        return counter;
      }
      this.counterMap.delete(id);
    }
    const provider = await getAppCounterProvider(model);
    const counter = provider.createCounter(model);
    await counter.init(context, params);
    this.counterMap.set(id, counter);
    return counter;
  }

  /**
   * 根据计数器引用获取计数器实例
   *
   * @author chitanda
   * @date 2022-10-26 20:10:20
   * @static
   * @param {IAppCounterRef} model
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {Promise<AppCounter>}
   */
  static async getCounterByRef(
    model: IAppCounterRef,
    context?: IContext,
    params?: IParams,
  ): Promise<AppCounter> {
    const { appCounter } = model;
    if (!appCounter) {
      throw new RuntimeModelError(
        model,
        ibiz.i18n.t('runtime.service.noConfiguredCounters'),
      );
    }
    return this.getCounter(appCounter, context, params);
  }
}
