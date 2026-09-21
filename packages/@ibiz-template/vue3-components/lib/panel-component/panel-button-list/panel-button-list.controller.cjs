'use strict';

var runtime = require('@ibiz-template/runtime');
var panelButtonList_state = require('./panel-button-list.state.cjs');

"use strict";
class PanelButtonListController extends runtime.PanelItemController {
  createState() {
    var _a;
    return new panelButtonList_state.PanelButtonListState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 父容器数据对象数据
   * @author lxm
   * @date 2023-07-15 01:33:58
   * @readonly
   * @type {IData}
   */
  get data() {
    return this.dataParent.data;
  }
  /**
   * Creates an instance of PanelButtonController.
   * @param {IPanelButtonList} model
   * @param {PanelController} panel
   * @param {PanelItemController} [parent]
   * @memberof PanelButtonController
   */
  constructor(model, panel, parent) {
    super(model, panel, parent);
    this.state.buttonsState = new runtime.ButtonContainerState();
  }
  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonController
   */
  async onInit() {
    await super.onInit();
    await this.initButtonsState();
  }
  /**
   * 初始化按钮组状态
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonListController
   */
  async initButtonsState() {
    var _a;
    const { buttonListType, uiactionGroup, panelButtons } = this.model;
    if (buttonListType === "UIACTIONGROUP") {
      (_a = uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) == null ? void 0 : _a.forEach((detail) => {
        if (detail.uiactionId) {
          const buttonState = new runtime.UIActionButtonState(
            detail.id,
            this.model.appId,
            detail.uiactionId,
            detail
          );
          this.state.buttonsState.addState(detail.id, buttonState);
        }
      });
    } else {
      panelButtons == null ? void 0 : panelButtons.forEach((button) => {
        if (button.uiactionId) {
          const buttonState = new runtime.UIActionButtonState(
            button.id,
            this.model.appId,
            button.uiactionId
          );
          this.state.buttonsState.addState(button.id, buttonState);
        }
      });
    }
    await this.state.buttonsState.init();
  }
  /**
   * 面板数据变更通知(由面板控制器调用)
   *
   * @param {string[]} names
   * @memberof PanelButtonController
   */
  async dataChangeNotify(names) {
    await this.state.buttonsState.update(
      this.panel.context,
      this.data,
      this.panel.model.appDataEntityId
    );
    super.dataChangeNotify(names);
  }
  /**
   * 面板状态变更通知
   *
   * @param {PanelNotifyState} _state
   * @memberof PanelButtonController
   */
  async panelStateNotify(_state) {
    await this.state.buttonsState.update(
      this.panel.context,
      this.data,
      this.panel.model.appDataEntityId
    );
    super.panelStateNotify(_state);
  }
  /**
   * 执行界面行为
   *
   * @param {string} actionId
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonListController
   */
  async doUIAction(actionId, event) {
    await runtime.UIActionUtil.execAndResolved(
      actionId,
      {
        context: this.panel.context,
        params: {
          panelDataParent: this.dataParent.model.id,
          ...this.panel.params
        },
        event,
        data: [this.data],
        view: this.panel.view,
        ctrl: this.panel,
        noWaitRoute: true
      },
      this.model.appId
    );
  }
  calcItemVisible(data) {
    if (!this.state.buttonsState.visible) {
      this.state.visible = false;
      return;
    }
    super.calcItemVisible(data);
  }
  calcItemDisabled(data) {
    if (this.state.buttonsState.disabled) {
      this.state.disabled = true;
      return;
    }
    super.calcItemDisabled(data);
  }
}

exports.PanelButtonListController = PanelButtonListController;
