import { IDEContextMenu } from '@ibiz/model-core';
import { IContextMenuEvent } from '../../event';
import { IContextMenuState } from '../../state';
import { IToolbarController } from './i-toolbar.controller';
import { IApiContextMenuController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 上下文菜单接口
 * @export
 * @interface IContextMenuController
 * @extends {IToolbarController<IDEContextMenu, IContextMenuState, IContextMenuEvent>}
 * @extends {IApiContextMenuController<IDEContextMenu, IContextMenuState>}
 */
export interface IContextMenuController
  extends IToolbarController<
      IDEContextMenu,
      IContextMenuState,
      IContextMenuEvent
    >,
    IApiContextMenuController<IDEContextMenu, IContextMenuState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IContextMenuController
   */
  view: IViewController;
}
