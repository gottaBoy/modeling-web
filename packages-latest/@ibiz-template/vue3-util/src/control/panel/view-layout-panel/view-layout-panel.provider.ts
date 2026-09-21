import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 视图布局面板部件适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ViewLayoutPanelProvider
 * @implements {IControlProvider}
 */
export class ViewLayoutPanelProvider implements IControlProvider {
  component: string = 'IBizViewLayoutPanelControl';
}
