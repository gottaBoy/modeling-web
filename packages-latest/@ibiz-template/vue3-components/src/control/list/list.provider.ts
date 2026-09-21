import { IControlProvider } from '@ibiz-template/runtime';
/**
 * 列表适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ListProvider
 * @implements {IControlProvider}
 */
export class ListProvider implements IControlProvider {
  component: string = 'IBizListControl';
}
