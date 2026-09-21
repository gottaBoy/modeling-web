import { IViewProvider } from '@ibiz-template/runtime';

/**
 * 实体重定向视图适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ViewProvider
 * @implements {IViewProvider}
 */
export class DeRedirectViewProvider implements IViewProvider {
  component: string = 'IBizDeRedirectView';
}
