import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 列表导航栏适配器
 *
 * @author zk
 * @date 2023-05-29 02:05:26
 * @export
 * @class ListExpBarProvider
 * @implements {IControlProvider}
 */
export class ListExpBarProvider implements IControlProvider {
  component: string = 'IBizListExpBarControl';
}
