import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 搜索栏适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class SearchBarProvider
 * @implements {IControlProvider}
 */
export class SearchBarProvider implements IControlProvider {
  component: string = 'IBizSearchBarControl';
}
