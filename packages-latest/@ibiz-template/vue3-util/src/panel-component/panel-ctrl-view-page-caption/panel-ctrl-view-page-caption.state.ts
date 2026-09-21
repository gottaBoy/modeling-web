import { PanelItemState } from '@ibiz-template/runtime';

/**
 * @description 视图标题状态
 * @export
 * @class viewPageCaptionState
 * @extends {PanelItemState}
 */
export class viewPageCaptionState extends PanelItemState {
  /**
   * @description 标题
   * @exposedoc
   * @type {string}
   * @memberof viewPageCaptionState
   */
  caption: string = '';
}
