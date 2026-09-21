import { IAppView, IControl } from '@ibiz/model-core';

/**
 * 绘制工具类（包含逻辑中绘制视图、绘制部件等功能）
 *
 * @author tony001
 * @date 2024-05-08 16:05:45
 * @export
 * @interface IRenderUtil
 */
export interface IRenderUtil {
  /**
   * 绘制视图
   *
   * @author tony001
   * @date 2024-05-08 16:05:57
   * @param {string} viewId
   * @param {IAppView} model
   * @param {IContext} context
   * @param {IParams} params
   * @param {IData} [options]
   */
  renderViewShell(
    viewId: string,
    model: IAppView,
    context: IContext,
    params: IParams,
    options?: IData,
  ): IObject;

  /**
   *  绘制部件
   *
   * @author tony001
   * @date 2024-05-08 16:05:02
   * @param {IControl} model
   * @param {IContext} context
   * @param {IParams} params
   * @param {IData} [options]
   */
  renderCtrlShell(
    model: IControl,
    context: IContext,
    params: IParams,
    options?: IData,
  ): IObject;

  /**
   * 绘制组件
   *
   * @author tony001
   * @date 2024-05-08 16:05:22
   * @param {string} name
   * @param {IData} options
   */
  renderComponent(name: string, options: IData): IObject;
}
