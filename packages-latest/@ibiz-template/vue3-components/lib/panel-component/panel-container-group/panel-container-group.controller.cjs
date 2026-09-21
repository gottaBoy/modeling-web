'use strict';

var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var panelContainerGroup_state = require('./panel-container-group.state.cjs');

"use strict";
class PanelContainerGroupController extends runtime.PanelContainerController {
  createState() {
    var _a;
    return new panelContainerGroup_state.PanelContainerGroupState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 禁用关闭
   * @exposedoc
   * @readonly
   * @type {boolean}
   */
  get disableClose() {
    const { titleBarCloseMode: mode } = this.model;
    return mode === 0 || mode === void 0;
  }
  /**
   * @description 是否默认展开分组
   * @exposedoc
   * @readonly
   */
  get defaultExpansion() {
    const { titleBarCloseMode: mode } = this.model;
    return this.disableClose || mode === 1;
  }
  async onInit() {
    await super.onInit();
    if (this.model.uiactionGroup) {
      await runtime.calcUIActionGroup(
        this.model.uiactionGroup,
        this.panel.context,
        this.panel.params
      );
    }
    await this.initActionStates();
  }
  /**
   * @description 初始化标题右侧界面行为按钮的状态
   * @returns {*}  {Promise<void>}
   * @memberof PanelContainerGroupController
   */
  async initActionStates() {
    var _a;
    const { uiactionGroup } = this.model;
    if (!((_a = uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) == null ? void 0 : _a.length))
      return;
    const containerState = new runtime.ButtonContainerState();
    const actions = runtime.getAllUIActionItems(uiactionGroup.uiactionGroupDetails);
    actions.forEach((detail) => {
      const actionid = detail.uiactionId;
      if (actionid) {
        const buttonState = new runtime.UIActionButtonState(
          detail.id,
          this.panel.context.srfappid,
          actionid,
          detail
        );
        containerState.addState(detail.id, buttonState);
      }
    });
    await containerState.update(this.panel.context, this.data);
    this.state.actionGroupState = containerState;
  }
  /**
   * @description 触发界面行为
   * @param {IUIActionGroupDetail} detail
   * @param {MouseEvent} event
   * @param {IParams} [args]
   * @returns {*}  {Promise<void>}
   * @memberof PanelContainerGroupController
   */
  async onActionClick(detail, event, args) {
    const actionId = detail.uiactionId;
    const tempParams = ramda.clone(this.panel.params);
    if (args) {
      Object.assign(tempParams, args);
    }
    await runtime.UIActionUtil.execAndResolved(
      actionId,
      {
        context: this.panel.context,
        params: tempParams,
        data: [this.data],
        view: this.panel.view,
        ctrl: this.panel,
        event
      },
      detail.appId
    );
  }
}

exports.PanelContainerGroupController = PanelContainerGroupController;
