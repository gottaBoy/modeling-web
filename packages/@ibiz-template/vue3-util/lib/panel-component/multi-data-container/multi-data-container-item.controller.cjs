'use strict';

var runtime = require('@ibiz-template/runtime');
var multiDataContainerItm_state = require('./multi-data-container-itm.state.cjs');

"use strict";
class MultiDataContainerItemController {
  /**
   * Creates an instance of PanelItemController.
   * @author lxm
   * @date 2023-04-27 06:37:12
   * @param {T} model 面板成员模型
   * @param {PanelController} panel 面板控制器
   * @param {PanelItemController} [parent] 父容器控制器
   */
  constructor(model, panel, parent, data) {
    this.model = model;
    this.panel = panel;
    this.parent = parent;
    this.state = new multiDataContainerItm_state.MultiDataContainerItemState();
    this.isDataContainer = true;
    /**
     * 所有面板成员的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IPanelItemController }}
     */
    this.panelItems = {};
    this.state.data = data;
    const fields = runtime.getAllPanelField(this.model);
    const fieldKeys = fields.map((item) => item.id);
    data._evt.on("change", (key) => {
      if (fieldKeys.includes(key)) {
        this.childDataChangeNotify([key]);
      }
    });
  }
  get data() {
    return this.state.data;
  }
  /**
   * 值校验
   *
   * @return {*}  {Promise<boolean>}
   * @memberof MultiDataContainerItemController
   */
  async validate() {
    const values = await Promise.all(
      Object.values(this.panelItems).map((item) => item.validate())
    );
    return values.every((value) => value);
  }
  /**
   * 初始化方法
   * @author lxm
   * @date 2023-09-05 05:48:53
   * @return {*}  {Promise<void>}
   */
  async init() {
    await this.initChildrenController();
  }
  /**
   * 初始化面板成员控制器
   *
   * @author lxm
   * @date 2022-08-24 21:08:48
   * @protected
   */
  async initChildrenController(panelItems = this.model.panelItems, panel = this.panel, parent = this) {
    if (!panelItems) {
      return;
    }
    await Promise.all(
      panelItems.map(async (panelItem) => {
        var _a, _b;
        const panelItemProvider = this.parent.providers[panelItem.id];
        if (!panelItemProvider) {
          return;
        }
        const panelItemController = await panelItemProvider.createController(
          panelItem,
          panel,
          parent
        );
        this.panelItems[panelItem.id] = panelItemController;
        if (((_a = panelItem.panelItems) == null ? void 0 : _a.length) && !runtime.isDataContainer(panelItem)) {
          await this.initChildrenController(
            panelItem.panelItems,
            panel,
            panelItemController
          );
        } else if ((_b = panelItem.panelTabPages) == null ? void 0 : _b.length) {
          await this.initChildrenController(
            panelItem.panelTabPages,
            panel,
            panelItemController
          );
        }
      })
    );
  }
  async dataChangeNotify(_names) {
  }
  async childDataChangeNotify(names) {
    Object.values(this.panelItems).forEach((panelItem) => {
      panelItem.dataChangeNotify(names);
    });
  }
  async panelStateNotify(state) {
    Object.values(this.panelItems).forEach((panelItem) => {
      panelItem.panelStateNotify(state);
    });
  }
  async setDataValue(name, value) {
    if (Object.prototype.hasOwnProperty.call(this.state.data, name) && this.state.data[name] === value) {
      return;
    }
    this.state.data[name] = value;
    this.childDataChangeNotify([name]);
  }
  destroy() {
    var _a, _b;
    (_b = (_a = this.data).destroy) == null ? void 0 : _b.call(_a);
    Object.values(this.panelItems).forEach((item) => {
      item.destroy();
    });
  }
}

exports.MultiDataContainerItemController = MultiDataContainerItemController;
