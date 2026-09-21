import { PanelItemState } from '@ibiz-template/runtime';

/**
 * @description 面板属性状态
 * @export
 * @class PanelFieldState
 * @extends {PanelItemState}
 */
export class PanelFieldState extends PanelItemState {
  /**
   * @exposedoc
   * @description 错误信息
   * @type {(string | null)}
   * @memberof PanelFieldState
   */
  error: string | null = null;
}
