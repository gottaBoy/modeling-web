import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { SearchFormButtonsController } from './searchform-buttons.controller';

/**
 * 搜索表单按钮适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class SearchFormButtonsProvider
 * @implements {EditorProvider}
 */
export class SearchFormButtonsProvider implements IPanelItemProvider {
  component: string = 'IBizSearchFormButtons';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new SearchFormButtonsController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
