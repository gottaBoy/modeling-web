import {
  FormButtonController,
  FormController,
  IFormDetailContainerController,
  IFormDetailProvider,
} from '@ibiz-template/runtime';
import { IDEFormButton } from '@ibiz/model-core';

/**
 * 表单按钮适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormButtonProvider
 * @implements {EditorProvider}
 */
export class FormButtonProvider implements IFormDetailProvider {
  component: string = 'IBizFormButton';

  async createController(
    detailModel: IDEFormButton,
    form: FormController,
    parent: IFormDetailContainerController | undefined,
  ): Promise<FormButtonController> {
    const c = new FormButtonController(detailModel, form, parent);
    await c.init();
    return c;
  }
}
