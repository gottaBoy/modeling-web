import {
  FormController,
  FormTabPanelController,
  IFormDetailContainerController,
  IFormDetailProvider,
} from '@ibiz-template/runtime';
import { IDEFormTabPanel } from '@ibiz/model-core';

/**
 * 表单分页部件适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormTabPanelProvider
 * @implements {EditorProvider}
 */
export class FormTabPanelProvider implements IFormDetailProvider {
  component: string = 'IBizFormTabPanel';

  async createController(
    detailModel: IDEFormTabPanel,
    form: FormController,
    parent: IFormDetailContainerController | undefined,
  ): Promise<FormTabPanelController> {
    const c = new FormTabPanelController(detailModel, form, parent);
    await c.init();
    return c;
  }
}
