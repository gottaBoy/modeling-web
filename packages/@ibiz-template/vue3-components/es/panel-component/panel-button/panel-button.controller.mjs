import { PanelItemController, UIActionButtonState, UIActionUtil } from '@ibiz-template/runtime';
import { PanelButtonState } from './panel-button.state.mjs';

"use strict";
class PanelButtonController extends PanelItemController {
  createState() {
    var _a;
    return new PanelButtonState((_a = this.parent) == null ? void 0 : _a.state);
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
   * @param {IPanelButton} model
   * @param {PanelController} panel
   * @param {PanelItemController} [parent]
   * @memberof PanelButtonController
   */
  constructor(model, panel, parent) {
    super(model, panel, parent);
    this.state.uiActionState = this.createUIActionState();
  }
  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonController
   */
  async onInit() {
    await super.onInit();
    this.updateButtonState();
  }
  /**
   * 创建界面行为状态对象
   *
   * @protected
   * @return {*}  {PanelButtonState}
   * @memberof PanelButtonController
   */
  createUIActionState() {
    const { uiactionId, name } = this.model;
    return new UIActionButtonState(
      name,
      this.panel.context.srfappid,
      uiactionId
    );
  }
  /**
   * 面板数据变更通知(由面板控制器调用)
   *
   * @param {string[]} names
   * @memberof PanelButtonController
   */
  async dataChangeNotify(names) {
    await this.updateButtonState();
    super.dataChangeNotify(names);
  }
  /**
   * 面板状态变更通知
   *
   * @param {PanelNotifyState} _state
   * @memberof PanelButtonController
   */
  async panelStateNotify(_state) {
    await this.updateButtonState();
    super.panelStateNotify(_state);
  }
  /**
   * 更新按钮权限状态
   *
   * @memberof PanelButtonController
   */
  async updateButtonState() {
    await this.state.uiActionState.update(
      this.panel.context,
      this.data,
      this.panel.model.appDataEntityId
    );
  }
  /**
   * 行为点击
   * - 在行为参数中传递panelDataParent(面板项数据父容器标识)
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonController
   */
  async onActionClick(event) {
    const { uiactionId, actionType } = this.model;
    if (actionType === "NONE") {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    await UIActionUtil.execAndResolved(
      uiactionId,
      {
        context: this.panel.context,
        params: {
          panelDataParent: this.dataParent.model.id,
          ...this.panel.params
        },
        data: [this.data],
        view: this.panel.view,
        event,
        noWaitRoute: true
      },
      this.model.appId
    );
  }
  calcItemVisible(data) {
    if (this.state.uiActionState.visible === false) {
      this.state.visible = false;
      return;
    }
    super.calcItemVisible(data);
  }
  calcItemDisabled(data) {
    if (this.state.uiActionState.disabled === true) {
      this.state.disabled = true;
      return;
    }
    super.calcItemDisabled(data);
  }
}

export { PanelButtonController };
