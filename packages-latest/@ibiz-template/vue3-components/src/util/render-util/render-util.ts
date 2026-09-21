import { IRenderUtil } from '@ibiz-template/runtime';
import { IAppView, IControl } from '@ibiz/model-core';
import { h, resolveComponent } from 'vue';

/**
 * 绘制工具类（包含逻辑中绘制视图、绘制部件等功能）
 *
 * @description 此实现类挂载在 ibiz.render
 * @author tony001
 * @date 2024-05-08 16:05:07
 * @export
 * @class RenderUtil
 * @implements {IRenderUtil}
 */
export class RenderUtil implements IRenderUtil {
  /**
   * 绘制视图
   *
   * @author tony001
   * @date 2024-05-08 16:05:56
   * @param {string} viewId
   * @param {IAppView} model
   * @param {IContext} context
   * @param {IParams} params
   * @param {IData} [options]
   * @return {*}  {IObject}
   */
  renderViewShell(
    viewId: string,
    model: IAppView,
    context: IContext,
    params: IParams,
    options: IData = {},
  ): IObject {
    const props = {
      viewId,
      modelData: model,
      context,
      params,
      ...options,
    };
    return h(resolveComponent('IBizViewShell') as string, props);
  }

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
    options: IData = {},
  ): IObject {
    const props = {
      modelData: model,
      context,
      params,
      ...options,
    };
    return h(resolveComponent('IBizControlShell') as string, props);
  }

  /**
   * 绘制组件
   *
   * @author tony001
   * @date 2024-05-08 16:05:08
   * @param {string} name
   * @param {IData} options
   * @return {*}  {IObject}
   */
  renderComponent(name: string, options: IData): IObject {
    return h(resolveComponent(name) as string, options);
  }
}
