import { IControlProvider } from '@ibiz-template/runtime';

/**
 * @description 虚拟表格适配器
 * @export
 * @class VirtualizedTableProvider
 * @implements {IControlProvider}
 */
export class VirtualizedTableProvider implements IControlProvider {
  component: string = 'IBizVirtualizedTableControl';
}
