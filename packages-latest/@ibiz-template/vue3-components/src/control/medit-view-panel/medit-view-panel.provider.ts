import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 多编辑视图面板适配器
 *
 * @export
 * @class MEditViewPanelProvider
 * @implements {IControlProvider}
 */
export class MEditViewPanelProvider implements IControlProvider {
  component: string = 'IBizMEditViewPanelControl';
}
