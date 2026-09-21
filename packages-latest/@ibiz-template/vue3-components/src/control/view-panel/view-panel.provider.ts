import { IControlProvider } from '@ibiz-template/runtime';

/**
 * @description 视图面板适配器
 * @export
 * @class ViewPanelProvider
 * @implements {IControlProvider}
 */
export class ViewPanelProvider implements IControlProvider {
  component: string = 'IBizViewPanelControl';
}
