'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class PanelItemRenderController extends runtime.PanelItemController {
  /**
   * 获取面板绘制器自定义html
   *
   * @author zk
   * @date 2024-01-15 01:01:11
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
      return runtime.ScriptFactory.execScriptFn(
        { data: data || {} },
        controlRender.layoutPanelModel,
        { singleRowReturn: true, isAsync: false }
      );
    }
  }
}

exports.PanelItemRenderController = PanelItemRenderController;
