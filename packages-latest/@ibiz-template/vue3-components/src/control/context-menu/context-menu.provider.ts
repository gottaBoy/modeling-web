import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 上下文菜单部件适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ContextMenuProvider
 * @implements {IControlProvider}
 */
export class ContextMenuProvider implements IControlProvider {
  component: string = 'IBizContextMenuControl';
}
