/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IFileUploader } from '@ibiz/model-core';
import { CarouselEditorController } from './carousel-editor.controller';

/**
 * 轮播图适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class CarouselEditorProvider
 * @implements {EditorProvider}
 */
export class CarouselEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizCarousel';

  gridEditor: string = 'IBizCarousel';

  async createController(
    editorModel: IFileUploader,
    parentController: IEditorContainerController,
  ): Promise<CarouselEditorController> {
    const c = new CarouselEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
