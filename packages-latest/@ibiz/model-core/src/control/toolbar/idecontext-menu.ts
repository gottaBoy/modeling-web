import { IContextMenu } from '../menu/icontext-menu';
import { IDEToolbar } from './idetoolbar';

/**
 *
 * 实体上下文菜单部件模型对象接口
 * 继承父接口类型值[CONTEXTMENU]
 * @export
 * @interface IDEContextMenu
 */
export interface IDEContextMenu extends IDEToolbar, IContextMenu {}
