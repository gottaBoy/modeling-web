import { PanelItemState } from '@ibiz-template/runtime';
import { IAppMenuItem } from '@ibiz/model-core';
/**
 * @description 扩展菜单状态基类
 * @export
 * @class ExtendMenuBase
 * @extends {PanelItemState}
 */
export class ExtendMenuBase extends PanelItemState {
  /**
   * @description 所有菜单项
   * @type {IAppMenuItem[]}
   * @memberof ExtendMenuBase
   */
  items: IAppMenuItem[] = [];

  /**
   * @description 菜单项状态
   * @type {{ [p: string]: { visible: boolean; permitted: boolean } }}
   * @memberof ExtendMenuBase
   */
  menuItemsState: { [p: string]: { visible: boolean; permitted: boolean } } =
    {};
}
