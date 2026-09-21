import { PanelItemController } from '@ibiz-template/runtime';
import { TeleportPlaceholderState } from './teleport-placeholder.state.mjs';

"use strict";
class TeleportPlaceholderController extends PanelItemController {
  /**
   * @description 创建传送占位状态对象
   * @protected
   * @return {*}  {PanelItemState}
   */
  createState() {
    var _a;
    return new TeleportPlaceholderState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 初始化
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof TeleportPlaceholderController
   */
  async onInit() {
    var _a, _b;
    await super.onInit();
    const viewCodeName = this.panel.view.model.codeName;
    let teleportTag = "".concat(viewCodeName == null ? void 0 : viewCodeName.toLowerCase(), "-").concat(this.model.id);
    const paramTag = (_b = (_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams) == null ? void 0 : _b.find(
      (item) => item.key === "TeleportTag"
    );
    if (paramTag && paramTag.value) {
      teleportTag = paramTag.value;
    }
    ibiz.log.debug(
      ibiz.i18n.t("vue3Util.panelComponent.placeholderIdentifier", {
        viewCodeName,
        id: this.model.id
      }),
      teleportTag
    );
    this.state.teleportTag = teleportTag;
  }
}

export { TeleportPlaceholderController };
