import { PanelItemController, ScriptFactory } from '@ibiz-template/runtime';

"use strict";
class PanelItemRenderController extends PanelItemController {
  /**
   * @description 获取面板绘制器自定义html
   * @exposedoc
   * @export
   * @param {IControlRender[]} controlRenders
   * @return {*}  {(string | undefined)}
   */
  getPanelItemCustomHtml(controlRenders, data) {
    if (controlRenders.length === 0) {
      return void 0;
    }
    const controlRender = controlRenders[0];
    if (controlRender.layoutPanelModel) {
      let scriptCode = controlRender.layoutPanelModel;
      if (!scriptCode.includes("return")) {
        scriptCode = "return (".concat(scriptCode, ")");
      }
      return ScriptFactory.execScriptFn({ data: data || {} }, scriptCode, {
        isAsync: false
      });
    }
  }
}

export { PanelItemRenderController };
