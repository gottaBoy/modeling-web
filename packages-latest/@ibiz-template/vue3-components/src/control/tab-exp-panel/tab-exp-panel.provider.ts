import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 分页导航面板
 *
 * @export
 * @class TabExpPanelProvider
 * @implements {IControlProvider}
 */
export class TabExpPanelProvider implements IControlProvider {
  component: string = 'IBizTabExpPanelControl';
}
