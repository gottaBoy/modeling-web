import { IApiContextMenuState } from '../../../api';
import { IButtonContainerState } from '../../common';
import { IToolbarState } from './i-toolbar.state';

/**
 * @description 上下文菜单UI状态接口
 * @export
 * @interface IContextMenuState
 * @extends {IToolbarState}
 * @extends {IApiContextMenuState}
 */
export interface IContextMenuState extends IToolbarState, IApiContextMenuState {
  /**
   * @description 工具栏按钮状态
   * @type {IButtonContainerState}
   * @memberof IContextMenuState
   */
  buttonsState: IButtonContainerState;
}
