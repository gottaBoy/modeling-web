import { IControlProvider } from '@ibiz-template/runtime';
/**
 * 表格适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class GridProvider
 * @implements {IControlProvider}
 */
export class TreeGridProvider implements IControlProvider {
  component: string = 'IBizTreeGridControl';
}
