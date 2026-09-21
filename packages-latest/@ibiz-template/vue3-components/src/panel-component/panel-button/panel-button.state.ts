import { PanelItemState, UIActionButtonState } from '@ibiz-template/runtime';

/**
 * 面板按钮状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:27
 * @export
 * @class PanelButtonState
 * @extends {PanelItemState}
 */
export class PanelButtonState extends PanelItemState {
  /**
   * @exposedoc
   * @description 是否加载中
   * @type {boolean}
   * @memberof PanelButtonState
   */
  loading: boolean = false;

  /**
   * @description 界面行为状态
   * @type {UIActionButtonState}
   * @memberof PanelButtonState
   */
  uiActionState!: UIActionButtonState;
}
