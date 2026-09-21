import { IViewProvider } from '@ibiz-template/runtime';

/**
 * 应用门户视图,实体数据看板视图适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ViewProvider
 * @implements {IViewProvider}
 */
export class PortalViewProvider implements IViewProvider {
  component: string = 'IBizPortalView';
}
