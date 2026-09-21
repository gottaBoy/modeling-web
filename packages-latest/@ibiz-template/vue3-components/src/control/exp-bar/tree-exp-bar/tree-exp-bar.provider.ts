import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 树导航栏适配器
 *
 * @export
 * @class TreeExpBarProvider
 * @implements {IControlProvider}
 */
export class TreeExpBarProvider implements IControlProvider {
  component: string = 'IBizTreeExpBarControl';
}
