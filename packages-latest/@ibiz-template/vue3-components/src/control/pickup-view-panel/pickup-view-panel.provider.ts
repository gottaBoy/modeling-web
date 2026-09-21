import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 选择视图面板适配器
 *
 * @export
 * @class PickupViewPanelProvider
 * @implements {IControlProvider}
 */
export class PickupViewPanelProvider implements IControlProvider {
  component: string = 'IBizPickupViewPanelControl';
}
