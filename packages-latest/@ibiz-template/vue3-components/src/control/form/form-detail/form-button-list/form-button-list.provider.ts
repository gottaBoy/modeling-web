import {
  FormController,
  IFormDetailProvider,
  FormButtonListController,
  IFormDetailContainerController,
} from '@ibiz-template/runtime';
import { IDEFormButtonList } from '@ibiz/model-core';

/**
 * 表单按钮组适配器
 *
 * @export
 * @class FormButtonListProvider
 * @implements {IFormDetailProvider}
 */
export class FormButtonListProvider implements IFormDetailProvider {
  component: string = 'IBizFormButtonList';

  async createController(
    detailModel: IDEFormButtonList,
    form: FormController,
    parent: IFormDetailContainerController | undefined,
  ): Promise<FormButtonListController> {
    const c = new FormButtonListController(detailModel, form, parent);
    await c.init();
    return c;
  }
}
