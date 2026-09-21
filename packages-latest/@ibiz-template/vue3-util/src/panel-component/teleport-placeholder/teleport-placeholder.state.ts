import { PanelItemState } from '@ibiz-template/runtime';

/**
 * @description 传送占位状态
 * @export
 * @class TeleportPlaceholderState
 * @extends {PanelItemState}
 */
export class TeleportPlaceholderState extends PanelItemState {
  /**
   * @description 嵌入视图中的部件可依据该参数找到传送占位面板项进行位置替换，参数默认格式为 “当前视图标识-需传送部件标识”；也可通过面板项参数（TeleportTag）来指定
   * @exposedoc
   * @type {string}
   * @memberof TeleportPlaceholderState
   */
  teleportTag: string = '';
}
