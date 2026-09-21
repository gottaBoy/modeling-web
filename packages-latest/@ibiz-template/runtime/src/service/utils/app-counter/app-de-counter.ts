import { RuntimeModelError } from '@ibiz-template/core';
import { Application } from '../../../application';
import { AppCounter } from './app-counter';

/**
 * 应用实体计数器
 *
 * @author chitanda
 * @date 2022-10-26 18:10:51
 * @export
 * @class AppCounter
 */
export class AppDECounter extends AppCounter {
  protected app!: Application;

  protected appDataEntityId!: string;

  protected action!: string;

  /**
   * 计数器初始化
   *
   * @author chitanda
   * @date 2022-10-26 19:10:24
   * @param {IContext} [context]
   * @param {IParams} [params]
   */
  async init(context?: IContext, params?: IParams): Promise<void> {
    this.appDataEntityId = this.model.appDataEntityId!;
    const action = this.model.getAppDEActionId;
    if (!action) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.service.noFoundCounterBehavior'),
      );
    }
    this.action = action;
    await super.init(context, params);
  }

  /**
   * 加载计数器
   *
   * @author chitanda
   * @date 2022-10-26 19:10:38
   * @protected
   * @return {*}  {Promise<IData>}
   */
  protected async load(): Promise<IData> {
    const tempContent = this.context.deepClone();
    const app = ibiz.hub.getApp(tempContent.srfappid);
    const res = await app.deService.exec(
      this.appDataEntityId!,
      this.action,
      tempContent,
      this.params,
    );
    if (res.ok) {
      this.data = res.data;
      this.evt.emit('change', this.data);
    }
    return this.data;
  }
}
