import { IAppDEUIAction } from '@ibiz/model-core';
import { IUIActionResult } from '../i-ui-action-result/i-ui-action-result';

/**
 * 界面行为处理器接口
 *
 * @author lxm
 * @date 2022-10-25 14:10:59
 * @export
 * @interface IUIActionHandler
 */
export interface IUIActionHandler {
  /**
   * 执行界面行为
   *
   * @author lxm
   * @date 2022-10-25 14:10:15
   * @param {IAppDEUIAction} action 界面行为模型
   * @param {IContext} context 上下文
   * @param {(IData[])} data 数据集合
   * @param {IParams} params 视图参数
   * @param {IData} [opts] 额外参数
   * @returns {*}  {Promise<IUIActionResult>}
   */
  exec(
    action: IAppDEUIAction,
    context: IContext,
    data: IData[],
    params: IParams,
    opts?: IData,
  ): Promise<IUIActionResult>;
}
