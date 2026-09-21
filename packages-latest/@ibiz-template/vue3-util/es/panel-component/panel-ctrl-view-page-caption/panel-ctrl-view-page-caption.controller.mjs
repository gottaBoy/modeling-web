import { PanelItemController } from '@ibiz-template/runtime';

"use strict";
class PanelCtrlViewPageCaptionController extends PanelItemController {
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof PanelCtrlViewPageCaptionController
   */
  async onInit() {
    await super.onInit();
    this.state.caption = this.panel.view.model.caption || "";
    this.panel.view.evt.on(
      "onViewInfoChange",
      ({ caption: _caption, dataInfo }) => {
        this.state.caption = "".concat(this.panel.view.model.caption).concat(dataInfo ? "-".concat(dataInfo) : "");
      }
    );
  }
}

export { PanelCtrlViewPageCaptionController };
