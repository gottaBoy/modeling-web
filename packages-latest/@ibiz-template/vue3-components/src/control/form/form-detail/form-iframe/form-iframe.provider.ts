import {
  FormController,
  FormIFrameController,
  IFormDetailContainerController,
  IFormDetailProvider,
} from '@ibiz-template/runtime';
import { IDEFormIFrame } from '@ibiz/model-core';

/**
 * 表单直接嵌入视图
 *
 * @export
 * @class FormIFrameProvider
 * @implements {IFormDetailProvider}
 */
export class FormIFrameProvider implements IFormDetailProvider {
  component: string = 'IBizFormIFrame';

  async createController(
    detailModel: IDEFormIFrame,
    form: FormController,
    parent: IFormDetailContainerController | undefined,
  ): Promise<FormIFrameController> {
    const c = new FormIFrameController(detailModel, form, parent);
    await c.init();
    return c;
  }
}
