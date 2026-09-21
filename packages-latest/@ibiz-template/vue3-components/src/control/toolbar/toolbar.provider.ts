import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 工具栏部件适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ToolbarProvider
 * @implements {IControlProvider}
 */
export class ToolbarProvider implements IControlProvider {
  component: string = 'IBizToolbarControl';
}
