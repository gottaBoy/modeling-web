/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';
import { SliderEditorController } from './slider-editor.controller';

/**
 * 滑动输入条编辑器适配器
 *
 * @export
 * @class SliderEditorProvider
 * @implements {EditorProvider}
 */
export class SliderEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizSlider';

  gridEditor: string = 'IBizSlider';

  async createController(
    editorModel: ISlider,
    parentController: IEditorContainerController,
  ): Promise<SliderEditorController> {
    const c = new SliderEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
