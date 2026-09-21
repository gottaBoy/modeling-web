import {
  FormController,
  FormItemController,
  IFormDetailContainerController,
  IFormDetailProvider,
} from '@ibiz-template/runtime';
import { IDEFormDetail } from '@ibiz/model-core';

/**
 * 表单项适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormItemProvider
 * @implements {EditorProvider}
 */
export class FormItemProvider implements IFormDetailProvider {
  component: string = 'IBizFormItem';

  async createController(
    detailModel: IDEFormDetail,
    form: FormController,
    parent: IFormDetailContainerController | undefined,
  ): Promise<FormItemController> {
    const c = new FormItemController(detailModel, form, parent);
    await c.init();
    return c;
  }
}
