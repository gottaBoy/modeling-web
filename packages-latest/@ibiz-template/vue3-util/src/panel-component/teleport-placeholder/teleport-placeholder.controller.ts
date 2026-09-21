import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController, PanelItemState } from '@ibiz-template/runtime';
import { TeleportPlaceholderState } from './teleport-placeholder.state';

/** 传送占位控制器
 * @description
 * @export
 * @class TeleportPlaceholderController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export class TeleportPlaceholderController extends PanelItemController<IPanelRawItem> {
  /**
   * @description 传送占位状态
   * @exposedoc
   * @type {TeleportPlaceholderState}
   * @memberof TeleportPlaceholderController
   */
  declare state: TeleportPlaceholderState;

  /**
   * @description 创建传送占位状态对象
   * @protected
   * @return {*}  {PanelItemState}
   */
  protected createState(): PanelItemState {
    return new TeleportPlaceholderState(this.parent?.state);
  }

  /**
   * @description 初始化
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof TeleportPlaceholderController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    const viewCodeName = this.panel.view.model.codeName;
    let teleportTag = `${viewCodeName?.toLowerCase()}-${this.model.id}`;
    const paramTag = this.model.rawItem?.rawItemParams?.find(
      item => item.key === 'TeleportTag',
    );
    if (paramTag && paramTag.value) {
      teleportTag = paramTag.value;
    }
    ibiz.log.debug(
      ibiz.i18n.t('vue3Util.panelComponent.placeholderIdentifier', {
        viewCodeName,
        id: this.model.id,
      }),
      teleportTag,
    );
    this.state.teleportTag = teleportTag;
  }
}
