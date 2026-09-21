import { IDEContextMenu } from '@ibiz/model-core';
import {
  IContextMenuState,
  IContextMenuEvent,
  IContextMenuController,
} from '../../../interface';
import { ToolbarController } from '../toolbar/toolbar.controller';

/**
 * 上下文菜单控制器
 * @author lxm
 * @date 2023-03-28 06:44:26
 * @export
 * @class ContextMenuController
 * @extends {ControlController<ToolbarModel>}
 */
export class ContextMenuController
  extends ToolbarController<
    IDEContextMenu,
    IContextMenuState,
    IContextMenuEvent
  >
  implements IContextMenuController {}
