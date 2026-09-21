import {
  IButtonContainerState,
  PanelContainerState,
} from '@ibiz-template/runtime';

/**
 * @description 面板分组容器状态
 * @export
 * @class PanelContainerGroupState
 * @extends {PanelContainerState}
 */
export class PanelContainerGroupState extends PanelContainerState {
  /**
   * 界面行为组状态
   *
   * @type {(IButtonContainerState | null)}
   * @memberof PanelContainerGroupState
   */
  actionGroupState: IButtonContainerState | null = null;
}
