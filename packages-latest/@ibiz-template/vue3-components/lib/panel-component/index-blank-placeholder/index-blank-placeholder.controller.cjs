'use strict';

var runtime = require('@ibiz-template/runtime');
var indexBlankPlaceholder_state = require('./index-blank-placeholder.state.cjs');

"use strict";
class IndexBlankPlaceholderController extends runtime.PanelItemController {
  createState() {
    var _a;
    return new indexBlankPlaceholder_state.IndexBlankPlaceholderState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 当前视图路由层级
   * @exposedoc
   * @readonly
   * @type {(number | undefined)}
   * @memberof IndexBlankPlaceholderController
   */
  get routeDepth() {
    return this.panel.view.modal.routeDepth;
  }
  /**
   * @description 应用菜单
   * @exposedoc
   * @readonly
   * @type {(AppMenuController | undefined)}
   * @memberof IndexBlankPlaceholderController
   */
  get appmenu() {
    return this.panel.getController("appmenu");
  }
  /**
   * @description 首页导航栏
   * @exposedoc
   * @readonly
   * @type {(NavPosIndexController | undefined)}
   * @memberof IndexBlankPlaceholderController
   */
  get navPos() {
    return this.panel.panelItems.nav_pos_index;
  }
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof IndexBlankPlaceholderController
   */
  async onInit() {
    await super.onInit();
    this.state.keepAlive = true;
    this.state.visible = false;
    this.panel.evt.on("onMounted", async () => {
      var _a;
      if (this.navPos)
        this.navPos.state.keepAlive = true;
      const appViewId = (_a = this.appmenu) == null ? void 0 : _a.getDefaultOpenView();
      if (appViewId) {
        const appView = await ibiz.hub.config.view.get(appViewId);
        const { openMode = "INDEXVIEWTAB" } = appView;
        this.state.visible = !openMode.startsWith("INDEXVIEWTAB");
      }
    });
  }
  /**
   * @description 设置显示状态
   * @exposedoc
   * @param {boolean} state
   * @memberof IndexBlankPlaceholderController
   */
  setVisible(state) {
    this.state.visible = state;
    if (this.navPos)
      this.navPos.state.visible = !state;
  }
}

exports.IndexBlankPlaceholderController = IndexBlankPlaceholderController;
