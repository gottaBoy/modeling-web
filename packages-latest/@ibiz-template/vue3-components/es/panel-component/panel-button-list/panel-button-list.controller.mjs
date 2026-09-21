import { PanelItemController, ButtonContainerState, calcUIActionGroup, getAllUIActionItems, UIActionButtonState, UIActionUtil } from '@ibiz-template/runtime';
import { PanelButtonListState } from './panel-button-list.state.mjs';

"use strict";
class PanelButtonListController extends PanelItemController {
  createState() {
    var _a;
    return new PanelButtonListState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 父容器数据对象数据
   * @readonly
   * @exposedoc
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
    this.state.buttonsState = new ButtonContainerState();
  }
  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonController
   */
  async onInit() {
    await super.onInit();
    await this.initUIActions();
    await this.initButtonsState();
  }
  /**
   * 初始化界面行为组
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonListController
   */
  async initUIActions() {
    const { buttonListType, uiactionGroup } = this.model;
    if (buttonListType === "UIACTIONGROUP" && uiactionGroup) {
      await calcUIActionGroup(
        uiactionGroup,
        this.panel.context,
        this.panel.params
      );
    }
  }
  /**
   * 初始化按钮组状态
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonListController
   */
  async initButtonsState() {
    const { buttonListType, uiactionGroup, panelButtons } = this.model;
    if (buttonListType === "UIACTIONGROUP") {
      if (uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) {
        const actions = getAllUIActionItems(uiactionGroup.uiactionGroupDetails);
        actions.forEach((detail) => {
          if (detail.uiactionId) {
            const buttonState = new UIActionButtonState(
              detail.id,
              detail.appId,
              detail.uiactionId,
              detail
            );
            this.state.buttonsState.addState(detail.id, buttonState);
          }
        });
      }
    } else {
      panelButtons == null ? void 0 : panelButtons.forEach((button) => {
        if (button.uiactionId) {
          const buttonState = new UIActionButtonState(
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
   * 通过项标识获取项模型
   *
   * @private
   * @param {string} id
   * @return {*}  {(IPanelButton | IUIActionGroupDetail | undefined)}
   * @memberof PanelButtonListController
   */
  getModelById(id) {
    const { buttonListType, uiactionGroup, panelButtons } = this.model;
    if (buttonListType === "UIACTIONGROUP") {
      const actions = getAllUIActionItems(uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails);
      return actions.find((detail) => detail.id === id);
    }
    return panelButtons == null ? void 0 : panelButtons.find((button) => button.id === id);
  }
  /**
   * @description 处理按钮点击
   * @exposedoc
   * @param {string} id
   * @param {MouseEvent} [event]
   * @return {*}  {Promise<void>}
   * @memberof PanelButtonListController
   */
  async handleClick(id, event) {
    const action = this.getModelById(id);
    if (!(action == null ? void 0 : action.uiactionId))
      return;
    await UIActionUtil.execAndResolved(
      action.uiactionId,
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
      action.appId || this.model.appId
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

export { PanelButtonListController };
