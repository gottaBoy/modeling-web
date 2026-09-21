import { IDEContextMenu } from '@ibiz/model-core';
import { IApiToolbarController } from './i-api-toolbar.controller';
import { IApiContextMenuState } from '../../state';

/**
 * 上下文菜单
 * @description 用于提供与当前操作场景相关的快捷命令集合，常用于树节点操作。
 * @primary
 * @export
 * @interface IContextMenuController
 * @extends {IApiToolbarController<T, S>}
 * @template T
 * @template S
 */
export interface IApiContextMenuController<
  T extends IDEContextMenu = IDEContextMenu,
  S extends IApiContextMenuState = IApiContextMenuState,
> extends IApiToolbarController<T, S> {}
