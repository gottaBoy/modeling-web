import { IDEContextMenu } from '@ibiz/model-core';
import { IContextMenuEvent } from '../../event';
import { IContextMenuState } from '../../state';
import { IToolbarController } from './i-toolbar.controller';
/**
 * 上下文菜单接口
 * @author lxm
 * @date 2023-08-21 10:43:51
 * @export
 * @interface IContextMenuController
 * @extends {IToolbarController<IDEContextMenu, IContextMenuState, IContextMenuEvent>}
 */
export interface IContextMenuController extends IToolbarController<IDEContextMenu, IContextMenuState, IContextMenuEvent> {
}
//# sourceMappingURL=i-context-menu.controller.d.ts.map