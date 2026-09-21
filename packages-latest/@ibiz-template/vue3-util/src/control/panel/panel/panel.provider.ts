import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 面板部件适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ViewLayoutPanelProvider
 * @implements {IControlProvider}
 */
export class PanelProvider implements IControlProvider {
  component: string = 'IBizPanelControl';
}
