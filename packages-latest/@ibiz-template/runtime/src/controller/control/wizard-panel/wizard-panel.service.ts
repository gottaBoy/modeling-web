import { IHttpResponse } from '@ibiz-template/core';
import { IDEWizardPanel } from '@ibiz/model-core';
import { ControlService } from '../../../service';

/**
 * 向导面板服务
 *
 * @author lxm
 * @date 2023-02-16 04:11:13
 * @export
 * @class WizardPanelService
 * @extends {ControlService<T>}
 * @template T
 */
export class WizardPanelService<
  T extends IDEWizardPanel = IDEWizardPanel,
> extends ControlService<T> {
  /**
   * 执行向导初始化
   * 服务调用之前确认是否有初始化实体行为
   *
   * @author lxm
   * @date 2022-08-31 17:08:41
   * @param {IContext} context 上下文
   * @param {IParams} [params={}] 视图参数
   * @returns {*}  {Promise<IHttpResponse>}
   */
  async initialize(
    context: IContext,
    data?: IData,
    params?: IParams,
  ): Promise<IHttpResponse<IData>> {
    const initAction = this.model.initControlAction?.appDEMethodId;
    let res = await this.exec(initAction!, context, data, params);
    res = this.handleResponse(res);
    return res as IHttpResponse<IData>;
  }

  /**
   * 执行向导完成
   *
   * @author lxm
   * @date 2022-08-31 17:08:41
   * @param {IContext} context 上下文
   * @param {IParams} [params={}] 视图参数
   * @returns {*}  {Promise<IHttpResponse>}
   */
  async finish(
    context: IContext,
    data: IData = {},
    params: IParams = {},
  ): Promise<IHttpResponse<IData>> {
    const finishAction = this.model.finishControlAction?.appDEMethodId;
    let res = await this.exec(finishAction!, context, data, params);
    res = this.handleResponse(res);
    return res as IHttpResponse<IData>;
  }
}
