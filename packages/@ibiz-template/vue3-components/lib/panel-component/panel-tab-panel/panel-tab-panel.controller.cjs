'use strict';

var runtime = require('@ibiz-template/runtime');
var panelTabPanel_state = require('./panel-tab-panel.state.cjs');

"use strict";
class PanelTabPanelController extends runtime.PanelItemController {
  /**
   * 新建状态
   *
   * @author tony001
   * @date 2024-05-12 14:05:16
   * @protected
   * @return {*}  {PanelTabPanelState}
   */
  createState() {
    var _a;
    return new panelTabPanel_state.PanelTabPanelState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 初始化
   *
   * @author tony001
   * @date 2024-05-12 14:05:51
   * @return {*}  {Promise<void>}
   */
  async onInit() {
    var _a;
    await super.onInit();
    this.state.activeTab = ((_a = this.model.panelTabPages) == null ? void 0 : _a[0].id) || "";
  }
  /**
   * 分页点击切换处理
   *
   * @author tony001
   * @date 2024-05-12 14:05:11
   * @param {string} tabId
   */
  onTabChange(tabId) {
    this.state.activeTab = tabId;
  }
}

exports.PanelTabPanelController = PanelTabPanelController;
