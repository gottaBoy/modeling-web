import { h, resolveComponent } from 'vue';

"use strict";
class RenderUtil {
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
  renderViewShell(viewId, model, context, params, options = {}) {
    const props = {
      viewId,
      modelData: model,
      context,
      params,
      ...options
    };
    return h(resolveComponent("IBizViewShell"), props);
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
  renderCtrlShell(model, context, params, options = {}) {
    const props = {
      modelData: model,
      context,
      params,
      ...options
    };
    return h(resolveComponent("IBizControlShell"), props);
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
  renderComponent(name, options) {
    return h(resolveComponent(name), options);
  }
}

export { RenderUtil };
