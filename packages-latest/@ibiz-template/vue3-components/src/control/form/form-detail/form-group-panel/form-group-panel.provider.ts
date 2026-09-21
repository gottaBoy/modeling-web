import {
  FormController,
  FormGroupPanelController,
  IFormDetailContainerController,
  IFormDetailProvider,
} from '@ibiz-template/runtime';
import { IDEFormGroupPanel } from '@ibiz/model-core';

/**
 * 表单分组面板适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormGroupPanelProvider
 * @implements {EditorProvider}
 */
export class FormGroupPanelProvider implements IFormDetailProvider {
  component: string = 'IBizFormGroupPanel';

  async createController(
    detailModel: IDEFormGroupPanel,
    form: FormController,
    parent: IFormDetailContainerController | undefined,
  ): Promise<FormGroupPanelController> {
    const c = new FormGroupPanelController(detailModel, form, parent);
    await c.init();
    return c;
  }
}
