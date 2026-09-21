import { IViewProvider } from '@ibiz-template/runtime';

/**
 * 视图适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ViewProvider
 * @implements {IViewProvider}
 */
export class ViewProvider implements IViewProvider {
  component: string = 'IBizView';
}
